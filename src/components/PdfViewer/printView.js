import { _getObjectUrl } from "../../service/api";
export default (pdfDocument, container) => {
    return new Promise(resolve => {
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
        const getRenderTask = (page) => {
            // let adjustScale = 1;
            let viewport = page.getViewport({ scale: 1, rotation: 0 });
            let { width, height } = viewport;
            const canvasEl = document.createElement('canvas');
            const canvasContext = canvasEl.getContext('2d');
            canvasEl.style.width = `${width}px`;
            canvasEl.style.height = `${height}px`;
            const resolution = 2;
            canvasEl.height = resolution * viewport.height;
            canvasEl.width = resolution * viewport.width;

            // if previous render isn't done yet, we cancel it
            return {
                renderTask: page.render({
                    canvasContext,
                    viewport,
                    intent: 'print',
                    transform: [resolution, 0, 0, resolution, 0, 0],
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
            let loadCount = 0;
            let count = 0;
            function next(task) {
                if (count >= maxCount) {
                    // resolve();
                    return;
                };
                task.renderTask.then(res => {
                    let viewer = container;
                    let { canvasEl } = task.pageInfo;
                    if (!viewer) return;
                    const img = document.createElement('img');
                    if (canvasEl.toBlob) {
                        canvasEl.toBlob(blob => {
                            img.src = _getObjectUrl(blob);
                        })
                    } else {
                        img.src = canvasEl.toDataURL();
                    }
                    let pageDiv = document.createElement('div');
                    pageDiv.setAttribute('class', 'printedPage');
                    pageDiv.appendChild(img);
                    viewer.appendChild(pageDiv);
                    count++;
                    img.onload = () => {
                        loadCount++;
                        if (loadCount == maxCount) {
                            resolve();
                        }
                    }
                    // if (count == maxCount) {
                    //     img.onload = () => {
                    //         resolve();
                    //     }
                    // }
                    next(renderTasks[count]);
                })
            }
            next(renderTasks[count])
        };
    })
}