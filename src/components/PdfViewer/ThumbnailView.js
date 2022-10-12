import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './viewer.less';
const THUMBNAIL_WIDTH = 98; // px

export default forwardRef((props, ref) => {
    const {
        pdfDocument,
        onPageSearch,
        page
    } = props
    const sidebarRef = useRef();
    const viewportRef = useRef();
    const selectedPageRef = useRef();
    useImperativeHandle(ref, () => {
        //将ref绑定在该方法上用于父组件调用
        return {
            handleScrollView
        };
    }, [])
    useEffect(() => {
        if (pdfDocument) {
            //循环遍历每一页pdf
            let numPages = pdfDocument.numPages;
            let pagePromiseArr = [], documentPromiseArr = [];
            for (let i = 1; i <= numPages; i++) {
                documentPromiseArr.push(pdfDocument.getPage(i));
            }
            Promise.all(documentPromiseArr).then(pdfPages => {
                pdfPages.forEach(page => {
                    pagePromiseArr.push(getRenderTask(page))
                })
                serialDrawPage(pagePromiseArr);
            }).catch(err => {
                // if (isFunction(onPageLoadFailRef.current)) {
                //     onPageLoadFailRef.current(err);
                // }
            })
        }
        return () => {
            resetThumbnail();
        }
    }, [pdfDocument])

    const getRenderTask = (page) => {
        let adjustScale = 1;

        if (!viewportRef.current) {
            let viewport = page.getViewport({ scale: 1, rotation: 0 });
            let { width, height } = viewport;
            //let pageRatio = width / height;
            let canvasWidth = THUMBNAIL_WIDTH;
            //let canvasHeight = canvasWidth / pageRatio;
            adjustScale = canvasWidth / width;
            viewport = page.getViewport({ scale: adjustScale, rotation: 0 });
            viewportRef.current = viewport;

        }
        let { width: pageWidth, height: pageHeight } = viewportRef.current;
        //console.log('vvv2', viewportRef.current);
        const canvasEl = document.createElement('canvas');
        const canvasContext = canvasEl.getContext('2d');
        canvasEl.style.width = `${pageWidth}px`;
        canvasEl.style.height = `${pageHeight}px`;
        canvasEl.height = pageHeight;
        canvasEl.width = pageWidth;

        // if previous render isn't done yet, we cancel it
        return {
            renderTask: page.render({
                canvasContext,
                viewport: viewportRef.current,
            }).promise,
            pageInfo: {
                page,
                canvasEl,
            }
        }
    };
    // 串行执行Promise，保证页码按顺序返回
    const serialDrawPage = (renderTasks) => {
        const maxCount = renderTasks.length;
        let count = 0;
        function next(task) {
            if (count >= maxCount) return;
            task.renderTask.then(res => {
                let viewer = sidebarRef.current;
                let { canvasEl } = task.pageInfo;
                if (!viewer) return;
                const img = document.createElement('img');
                if (canvasEl.toBlob) {
                    canvasEl.toBlob(blob => {
                        //img.src = URL.createObjectURL(blob);
                        img.src = canvasEl.toDataURL();
                    })
                } else {
                    img.src = canvasEl.toDataURL();
                }
                let pageDiv = document.getElementById(`page=${count + 1}`);
                if (!pageDiv) {
                    //新加载的页面
                    let className = 'thumbnail';
                    pageDiv = document.createElement('div');
                    pageDiv.setAttribute('id', `page=${count + 1}`);
                    if (count == 0) {
                        if (!selectedPageRef.current) {
                            //第一页默认设置成选中状态
                            selectedPageRef.current = pageDiv
                            className = 'thumbnail selected';
                        }
                    }
                    pageDiv.setAttribute('class', className);
                    viewer.appendChild(pageDiv);

                    pageDiv.appendChild(img);
                } else {
                    //已存在，则替换
                    let canvasImgDom = pageDiv.children[0];
                    if (canvasImgDom) {
                        pageDiv.replaceChild(img, canvasImgDom);
                    }
                }
                count++;
                next(renderTasks[count]);
            })
        }
        next(renderTasks[count])
    };
    const handleChangePage = (e) => {
        let pageDiv = e.target.parentNode;
        if (!pageDiv.id.includes('page=')) return;
        let className = pageDiv.getAttribute('class');
        if (className && className.includes('selected')) return;

        pageDiv.setAttribute('class', 'thumbnail selected');
        if (selectedPageRef.current) {
            selectedPageRef.current.setAttribute('class', 'thumbnail');
        }
        selectedPageRef.current = pageDiv;
        let pageNo = pageDiv.id.split('=')[1];
        if (pageNo * 1 > 0) {
            onPageSearch(pageNo * 1);
        }
        //console.log('ee', e.target.parentNode.id)
    }
    const handleScrollView = (numPages, page) => {
        //将scroll移动到页码对应位置
        if (viewportRef.current?.height) {
            if (numPages * viewportRef.current?.height > sidebarRef.current.clientHeight) {
                sidebarRef.current.scrollTo(0, (page - 1) * viewportRef.current?.height)
            }
        }
        //改变当前聚焦页样式
        let pageDiv = sidebarRef.current.children[page - 1];
        if (pageDiv) {
            pageDiv.setAttribute('class', 'thumbnail selected');
            if (selectedPageRef.current) {
                selectedPageRef.current.setAttribute('class', 'thumbnail');
            }
            selectedPageRef.current = pageDiv;
        }
    }
    const resetThumbnail = () => {
        selectedPageRef.current = null;
        viewportRef.current = null;
        sidebarRef.current.innerHTML = "";
    }
    return (
        <div className={styles["sidebarContent"]} style={{ height: document.body.offsetHeight - 62 + 'px' }}>
            <div className={styles["thumbnailView"]} ref={sidebarRef} onClick={handleChangePage}>
            </div>
        </div>
    )
})