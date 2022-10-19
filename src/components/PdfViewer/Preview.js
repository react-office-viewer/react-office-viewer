import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from './Viewer.js';
import Toolbar from './Toolbar.js';
import styles from './viewer.less';

import img from "./images/loading-icon.gif"
import { _download, _getObjectUrl, _getBlobUrl } from "../../service/api";
// if (!PDFJS.GlobalWorkerOptions.workerSrc) {
//     // 此处的 pdf work 文件放置到了 根目录/public/js/pdfjs 下  ../../assets/js/pdfjs/pdf.worker.js
//     PDFJS.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js';
// }

const MAX_SCALE = 4;
const MIN_SCALE = 0.5;
const SCALE_STEP = 0.1;
const FILE_LIMIT = 1024 * 1024 * 50;
const DEFAULT_SIZE = 1;
function Preview(props) {
    const {
        file: outFile,
        fileName: outFileName,
    } = props;
    const [file, setFile] = useState('');
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [fileName, setFileName] = useState('document.pdf');
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorInfo, setErrorInfo] = useState('');
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const pageWrapperRef = useRef(null);
    const toolbarRef = useRef(null);
    const [pageScaleMap, setPageScaleMap] = useState({
        pageWidthScale: 1,
        pageHeightScale: 1,
        pageWidth: 0,
        pageHeight: 0
    });
    useEffect(() => {
        let fileUrl = "";
        if (outFile) {
            if (outFile instanceof File) {
                fileUrl = _getObjectUrl(outFile);
                setFileName(outFile.name);
            } else if (typeof outFile === 'string') {
                fileUrl = outFile;
            }
            setFile(fileUrl || outFile);
        }
    }, [outFile])
    useEffect(() => {
        if (outFileName) {
            setFileName(outFileName);
        }
    }, [outFileName])
    const { pdfDocument, pdfPage } = usePdf({
        file: file,
        page,
        scale,
        rotate,
        canvasRef,
        pageWrapperRef,
        //workerSrc: location.origin + '/js/pdf.worker.js',
        cMapPacked: true,
        cMapUrl: location.origin + '/cmap/',
        // onPageLoadSuccess,
        onPageRenderSuccess,
        onDocumentLoadFail,
        onDocumentLoadSuccess
    });

    useEffect(() => {
        setShowLoading(true);
        handleLayout();
    }, [pageScaleMap, scale])

    useEffect(() => {
        //旋转之后需要更新页面比例数据
        refreshScaleMap(pdfPage, rotate);
    }, [rotate])
    function onDocumentLoadSuccess(pdfDocument) {
        pdfDocument.getPage(1).then(pdfPage => {
            //初始化页面比例数据
            refreshScaleMap(pdfPage);
        })
    }
    function onDocumentLoadFail(info) {
        console.log('document fail', info)
        setShowLoading(false);
        onShowError(true, info.message);
    }
    function onPageRenderSuccess(pdfPage) {
        setShowLoading(false);
        //console.log('success render', pdfPage)
    }

    const onPageSearch = value => {
        setPage(value);
    }
    const onZoomSearch = value => {
        const { pageWidthScale, pageHeightScale, pageWidth, pageHeight } = pageScaleMap;
        let scale = parseFloat(value);
        if (scale > 0) {
        } else {
            // if (!pdfPage) {
            //     return;
            // }
            switch (value) {
                case 'page-actual':
                    scale = DEFAULT_SIZE;
                    break;
                case 'page-fit':
                    scale = Math.min(pageWidthScale, pageHeightScale);
                    break;
                case 'page-width':
                    scale = pageWidthScale;
                    break;
                case 'auto':
                    let isLandscape = pageWidth > pageHeight;
                    let horizontalScale = isLandscape ? Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
                    scale = Math.min(MAX_SCALE, horizontalScale);
                    break;
                default:
                    console.error('PDFViewer._setScale: "' + value + '" is an unknown zoom value.');
                    return;
            }
        }
        setScale(scale);
    }
    const onRotateChange = isClock => {
        if (isClock) {
            setRotate(rotate + 90);
        } else {
            setRotate(rotate - 90);
        }
    }
    //更新初始比例数据
    const refreshScaleMap = (pdfPage, rotate = 0) => {
        if (!pdfPage) return;
        if (!containerRef.current) return;
        let pageView = pdfPage._pageInfo.view;
        let pageWidth = pageView[2];
        let pageHeight = pageView[3];
        let rotation = rotate % 360;
        if (rotation == 90 || rotation == 270) {
            pageWidth = pageView[3];
            pageHeight = pageView[2];
        }
        let container = containerRef.current;
        let pageWidthScale = Math.round(container.clientWidth / pageWidth * 10) / 10;
        let pageHeightScale = Math.round(container.clientHeight / pageHeight * 10) / 10;
        setPageScaleMap({
            pageWidthScale,
            pageHeightScale,
            pageWidth,
            pageHeight
        })
    }
    //根据页面比例大小调整居中或居左
    const handleLayout = () => {
        const { pageWidthScale } = pageScaleMap;
        if (!containerRef.current) return;
        let isCenter = window.getComputedStyle(containerRef.current, null)['align-items'];
        //console.log('ss', scale, pageWidthScale, isCenter)
        if (scale >= pageWidthScale) {
            if (isCenter === 'center') {
                containerRef.current.style['align-items'] = 'flex-start';
            }
        } else {
            if (isCenter !== 'center') {
                containerRef.current.style['align-items'] = 'center';
            }
        }
    }
    const onUploadFile = file => {
        setShowLoading(true);
        setPage(1);
        setRotate(0);
        if (toolbarRef.current) {
            toolbarRef.current.initZoomStatus();
        }
        setFile(_getObjectUrl(file));
    }
    const onDownloadFile = async () => {
        setShowLoading(true);
        let fileUrl = await _getBlobUrl(file, pdfDocument);
        _download(fileUrl, fileName);
        setShowLoading(false);
    }
    const onShowError = (status, info) => {
        setShowError(status);
        setErrorInfo(info);
    }
    return (
        <div className={styles.container}>
            <div className={styles.loadingPage} style={{ display: showLoading ? 'block' : 'none' }} >
                <div className={styles.loading}><img src={img} /></div>
            </div>
            <div className={styles.wrapper}>
                <>
                    <Toolbar
                        ref={toolbarRef}
                        pdfDocument={pdfDocument}
                        pdfPage={pdfPage}
                        onPageSearch={onPageSearch}
                        onZoomSearch={onZoomSearch}
                        onRotateChange={onRotateChange}
                        pageOut={page}
                        scaleOut={scale}
                        MAX_SCALE={MAX_SCALE}
                        MIN_SCALE={MIN_SCALE}
                        SCALE_STEP={SCALE_STEP}
                        FILE_LIMIT={FILE_LIMIT}
                        onShowError={onShowError}
                        onUploadFile={onUploadFile}
                        onDownloadFile={onDownloadFile}
                        onShowLoading={setShowLoading}
                    ></Toolbar>
                    <div className={styles.errorLine} style={{ display: showError ? 'flex' : 'none' }}>
                        <em>{t('invalidFile')} {errorInfo}</em>
                        <button onClick={() => onShowError(false, '')}>{t("close")}</button>
                    </div>
                    <div className={styles.viewerContainer} style={{ height: document.body.offsetHeight - 30 + 'px' }} ref={containerRef}>
                        {pdfDocument &&
                            <article className={styles.page} ref={pageWrapperRef}>
                                <div className={styles.canvasWrapper}>
                                    <canvas ref={canvasRef}></canvas>
                                </div>
                            </article>
                        }
                    </div>
                </>
            </div>
        </div>

    )
}

export default Preview;