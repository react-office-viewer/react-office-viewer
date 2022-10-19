import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import ThumbnailView from './ThumbnailView'
import printView from './printView';
import styles from './viewer.less';
export default forwardRef((props, ref) => {
    const {
        pdfDocument,
        pdfPage,
        onShowError,
        onZoomSearch,
        onPageSearch,
        onRotateChange,
        onDownloadFile,
        onUploadFile,
        onShowLoading,
        pageOut, //从父组件传入，一定是在范围之内的生效页码
        scaleOut,//从父组件传入，一定是数字类型
        SCALE_STEP,
        MAX_SCALE,
        MIN_SCALE,
        FILE_LIMIT,
    } = props;
    const [pageNo, setPageNo] = useState(1); //本组件维护，可能是不合法的页码
    const [scale, setScale] = useState('page-actual');//本组件维护，可能是string类型
    const [customValue, setCustomValue] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState('');
    const [showDownload, setShowDownload] = useState(true);
    const sidebarOpenRef = useRef(sidebarOpen);
    const inputRef = useRef();
    const pageRef = useRef(pageNo);
    const pageOutRef = useRef(pageOut);
    const inputFileRef = useRef();
    const thumbRef = useRef();
    const printFrameRef = useRef();
    const sidebarContainerRef = useRef();
    useImperativeHandle(ref, () => {
        //将ref绑定在该方法上用于父组件调用
        return {
            initZoomStatus
        };
    }, [])
    useEffect(() => {
        addEvent(window, 'keydown', handleKeyEnter);
        let sidebarContainer = sidebarContainerRef.current;
        addEvent(sidebarContainer, 'transitionend', removeClass);
        return () => {
            removeEvent(window, 'keydown', handleKeyEnter);
            removeEvent(sidebarContainer, 'transitionend', removeClass);
        }

    }, [pdfDocument])
    useEffect(() => {
        pageOutRef.current = pageOut; //固定pageOut值
        setPageNo(pageOut);
    }, [pageOut])
    useEffect(() => {
        pageRef.current = pageNo; //保证用当前最新的pageNo值
    }, [pageNo])
    useEffect(() => {
        sidebarOpenRef.current = sidebarOpen;
    }, [sidebarOpen])

    function addEvent(obj, type, callback) {
        if (obj.addEventListener) {
            // W3C内核
            obj.addEventListener(type, callback, false);
        } else {
            // IE内核
            obj.attachEvent('on' + type, callback);
        }
    }
    function removeEvent(obj, type, callback) {
        if (obj.removeEventListener) {
            // W3C内核
            obj.removeEventListener(type, callback);
        } else {
            // IE内核
            obj.detachEvent('on' + type, callback);
        }
    }
    function handleKeyEnter(e) {
        if (e.keyCode === 13) {
            if (inputRef.current == document.activeElement) {
                onPageBlur();
            }
        }
    }
    function removeClass(e) {
        if (!sidebarOpenRef.current.includes(styles["sidebarOpen"])) {
            setSidebarOpen("")
        }
    }
    const onPageChange = e => {
        setPageNo(e.target.value);
    }
    const _onPageSearch = page => {
        thumbRef.current.handleScrollView(pdfDocument.numPages, page);
        onPageSearch(page);
    }
    const onPagePrev = e => {
        if (pageNo === 1) return;
        _onPageSearch(pageNo - 1);
    }
    const onPageNext = e => {
        if (pageNo == pdfDocument.numPages) {
            return;
        }
        _onPageSearch(pageNo * 1 + 1);
    }
    const onPageBlur = () => {
        let newPageNo = pageRef.current;
        if (!newPageNo || newPageNo * 1 < 1 || newPageNo * 1 > pdfDocument.numPages) {
            setPageNo(pageOutRef.current);
            return;
        };
        _onPageSearch(newPageNo * 1);
    }
    const initZoomStatus = () => {
        setScale('page-actual');
        onZoomSearch('page-actual');
    }
    const onZoomChange = e => {
        setScale(e.target.value);
        onZoomSearch(e.target.value);
    }
    const onZoomIn = e => {
        let newValue = Math.round((scaleOut + SCALE_STEP) * 100) + '%';
        setScale('customValue');
        setCustomValue(newValue);
        onZoomSearch(scaleOut + SCALE_STEP);
    }
    const onZoomOut = e => {
        let newValue = Math.round((scaleOut - SCALE_STEP) * 100) + '%';
        setScale('customValue');
        setCustomValue(newValue);
        onZoomSearch(scaleOut - SCALE_STEP);
    }
    const onRotateClock = e => {
        onRotateChange(true);
    }
    const onRotateAntiClock = e => {
        onRotateChange(false);
    }
    const handleInputFileChange = e => {
        let files = inputFileRef.current.files;
        if (files.length > 0) {
            if (files[0].type !== 'application/pdf') {
                onShowError(true, t('formatInfo'));
                return;
            }
            if (files[0].size > FILE_LIMIT) {
                onShowError(true, t('sizeInfo'));
                return;
            }
            onUploadFile(files[0]);
            setShowDownload(false);
        }
        //console.log('file', inputFileRef.current.files)
    }
    const onShowSidebar = () => {
        if (sidebarOpen.includes('sidebarOpen')) {
            //关闭侧栏
            setSidebarOpen(styles['sidebarMoving']);
        } else {
            //打开侧栏
            setSidebarOpen(`${styles['sidebarOpen']} ${styles['sidebarMoving']}`);
        }
    }
    const onPrint = () => {
        let iframe = printFrameRef.current;
        let doc = iframe.contentWindow.document;
        let printContainer = iframe.contentWindow.document.body;
        printContainer.innerHTML = '';
        let style = doc.head.getElementsByTagName('style')[0];
        if (!style) {
            style = document.createElement('style')
            style.textContent = `.printedPage{width:100%;height:100%;
                page-break-after:always;
                page-break-inside:avoid;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .printedPage img{
                max-width: 100%;
                max-height: 100%;
                direction: ltr;
                display: block;
            }
            `
            doc.head.append(style);
        }
        iframe.contentWindow.focus();
        onShowLoading(true);
        printView(pdfDocument, printContainer).then(res => {
            onShowLoading(false);
            iframe.contentWindow.print();
        });
    }
    const onDownload = () => {
        onDownloadFile();
    }
    return (
        <div className={`${styles["outerContainer"]} ${sidebarOpen}`}>
            <div className={styles["toolbarContainer"]}>
                <div className={styles["toolbarViewer"]}>
                    <div className={styles["toolbarViewerLeft"]}>
                        <button className={`${styles["toolbarButton"]} ${styles["sidebarToggle"]}`} title={t("sidebarToggle")} onClick={onShowSidebar}>
                        </button>
                        <div className={styles["toolbarButtonSpacer"]}></div>
                        {/* <button id="viewFind" className="toolbarButton" title="Find in Document" tabindex="12" data-l10n-id="findbar">
                            <span data-l10n-id="findbar_label">Find</span>
                        </button> */}
                        <div className={`${styles["splitToolbarButton"]} ${styles["hiddenSmallView"]}`}>
                            <button className={`${styles["toolbarButton"]} ${styles["previous"]}`} title={t("previous")} onClick={onPagePrev} disabled={pageNo == 1}>
                            </button>
                            <div className={styles["splitToolbarButtonSeparator"]}></div>
                            <button className={`${styles["toolbarButton"]} ${styles["next"]}`} title={t('next')} onClick={onPageNext} disabled={!pdfDocument || pageNo >= pdfDocument.numPages}>
                            </button>
                        </div>
                        <div className={styles['pagination']}>
                            <input ref={inputRef} type="number" className={`${styles["toolbarField"]} ${styles["pageNumber"]}`} title={t("pageNumber")} value={pageNo} min="1" autocomplete="off" onChange={onPageChange} onBlur={onPageBlur} disabled={!pdfDocument} />
                            <span className={`${styles["numPages"]} ${styles["toolbarLabel"]}`} >/{pdfDocument?.numPages || 0}</span>
                        </div>

                    </div>
                    <div className={styles["toolbarViewerRight"]}>
                        <button className={`${styles["toolbarButton"]} ${styles["openFile"]}`} title={t("openFile")} onChange={handleInputFileChange} >
                            <input type="file" style={{ opacity: 0, width: '100%' }} ref={inputFileRef} />
                        </button>

                        <button className={`${styles["toolbarButton"]} ${styles["print"]}`} title={t("print")} onClick={onPrint}>
                        </button>
                        {
                            showDownload && <button className={`${styles["toolbarButton"]} ${styles["download"]}`} title={t("download")} onClick={onDownload}>
                            </button>
                        }
                        <div className={styles["splitToolbarButton"]}>
                            <button className={`${styles["toolbarButton"]} ${styles["pageRotateCw"]}`} title={t("pageRotateCw")} onClick={onRotateClock}>
                            </button>
                            <div className={styles["splitToolbarButtonSeparator"]}></div>
                            <button className={`${styles["toolbarButton"]} ${styles["pageRotateCcw"]}`} title={t("pageRotateCcw")} onClick={onRotateAntiClock}>
                            </button>
                        </div>
                    </div>
                    <div className={styles["toolbarViewerMiddle"]}>
                        <div className={styles["splitToolbarButton"]}>
                            <button className={`${styles["toolbarButton"]} ${styles["zoomOut"]}`} title={t("zoomOut")} onClick={onZoomOut} disabled={scaleOut === MIN_SCALE}>
                            </button>
                            <div className="splitToolbarButtonSeparator"></div>
                            <button className={`${styles["toolbarButton"]} ${styles["zoomIn"]}`} title={t("zoomIn")} onClick={onZoomIn} disabled={scaleOut === MAX_SCALE}>
                            </button>
                        </div>
                        <span className={`${styles["scaleSelectContainer"]} ${styles["dropdownToolbarButton"]}`}>
                            <select title={t("scaleSelect")} onChange={onZoomChange} value={scale}>
                                <option title="" value="auto" >{t('pageAutoOption')}</option>
                                <option title="" value="page-actual" >{t('pageActualOption')}</option>
                                <option title="" value="page-fit" >{t('pageFitOption')}</option>
                                <option title="" value="page-width" >{t('pageWidthOption')}</option>
                                <option title="" value='customValue' disabled hidden="true">{customValue}</option>
                                <option title="" value="0.5" >50%</option>
                                <option title="" value="0.75" >75%</option>
                                <option title="" value="1" >100%</option>
                                <option title="" value="1.25" >125%</option>
                                <option title="" value="1.5" >150%</option>
                                <option title="" value="2" >200%</option>
                                <option title="" value="3" >300%</option>
                                <option title="" value="4" >400%</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className={`${styles["loadingBar"]} ${styles["hidden"]}`} >
                    <div className={styles["progress"]}>
                        <div className={styles["glimmer"]}>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["sidebarContainer"]} ref={sidebarContainerRef}>
                <div className={styles["toolbarSidebar"]}>
                    <div className={styles["toolbarSidebarLeft"]}>
                        <div className={`${styles["sidebarViewButtons"]} ${styles["splitToolbarButton"]} ${styles["toggled"]}`} role="radiogroup">
                            <button className={`${styles["viewThumbnail"]} ${styles["toolbarButton"]} ${styles["toggled"]}`} title={t("viewThumbnail")} >
                            </button>
                        </div>
                    </div>
                </div>
                <ThumbnailView ref={thumbRef} pdfDocument={pdfDocument} onPageSearch={onPageSearch} page={pageOut} />
                <div className={styles["sidebarResizer"]}></div>
            </div>
            <iframe
                className={styles["print-iframe"]}
                ref={printFrameRef}
                frameborder="0">
            </iframe>
        </div>
    )
})
