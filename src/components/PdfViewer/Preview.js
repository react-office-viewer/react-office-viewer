import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from './Viewer.js';
import Toolbar from './Toolbar.js';
import styles from './viewer.less';
// import * as PDFJS from 'pdfjs-dist/build/pdf';
//import * as PDFJS from 'pdfjs-dist/build';
//const PDFJS = require('../../assets/js/pdfjs')
import img from "./images/loading-icon.gif"

//console.log('xxx', PDFJS)
// if (!PDFJS.GlobalWorkerOptions.workerSrc) {
//     // 此处的 pdf work 文件放置到了 根目录/public/js/pdfjs 下  ../../assets/js/pdfjs/pdf.worker.js
//     PDFJS.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js';
// }

const MAX_SCALE = 4;
const MIN_SCALE = 0.5;
const SCALE_STEP = 0.1;
const FILE_LIMIT = 1024 * 1024 * 50;
const DEFAULT_SIZE = 1.2;
function Preview(props) {
    const {
        locale = 'zh'
    } = props;
    const [file, setFile] = useState('');
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [showLoading, setShowLoading] = useState(true);
    const [fail, setFail] = useState(false);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const pageWrapperRef = useRef(null);
    const toolbarRef = useRef(null);
    //const pageRef = useRef(page);
    const [pageScaleMap, setPageScaleMap] = useState({
        pageWidthScale: 1,
        pageHeightScale: 1,
        pageWidth: 0,
        pageHeight: 0
    });
    // useEffect(() => {
    //     if (location.pathname.includes('preview')) {
    //         let arr = location.search.split('=');
    //         let docId = arr[1];
    //         setFile(`http://10.1.81.196:8080/amproductAPI/api/uploadDoc/getContentById?docId=${docId}`)
    //     }
    // }, [location.search]);
    let arr = location.search.split('=');
    let docId = arr[1];
    const { pdfDocument, pdfPage, viewport } = usePdf({
        file: file || `http://10.1.81.196:8080/amproductAPI/api/uploadDoc/getContentById?docId=21052`,
        page,
        scale,
        rotate,
        canvasRef,
        pageWrapperRef,
        //workerSrc: location.origin + '/js/pdf.worker.js',
        cMapPacked: true,
        cMapUrl: location.origin + '/cmap/',
        onPageLoadSuccess,
        onPageRenderSuccess,
        onDocumentLoadFail
    });
    // useEffect(() => {
    //     pageRef.current = page;
    // }, [page])
    useEffect(() => {
        setShowLoading(true);
        handleLayout();
    }, [pageScaleMap, scale])

    useEffect(() => {
        //旋转之后需要更新页面比例数据
        refreshScaleMap(pdfPage, rotate);
    }, [rotate])

    function onPageLoadSuccess(pdfPage) {
        //初始化页面比例数据
        refreshScaleMap(pdfPage);
    }
    function onPageRenderSuccess(pdfPage) {
        setShowLoading(false);
        console.log('success render', pdfPage)
    }
    function onDocumentLoadFail(info) {
        console.log('document fail')
    }
    function getObjectUrl(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
            // basic
            url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        } else if (window.URL != undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        }
        return url;
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
    const refreshScaleMap = (pdfPage, rotate) => {
        if (!pdfPage) return;
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
        console.log('pp', pageWidthScale);
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
        console.log('ss', scale, pageWidthScale, isCenter)
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
    const uploadFile = file => {
        setShowLoading(true);
        setPage(1);
        setRotate(0);
        if (toolbarRef.current) {
            toolbarRef.current.initZoomStatus();
        }
        setFile(getObjectUrl(file));
    }
    const showError = e => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <>
                    <Toolbar
                        ref={toolbarRef}
                        locale={locale}
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
                        showError={showError}
                        uploadFile={uploadFile}
                    ></Toolbar>
                    {pdfDocument && <div className={styles.viewerContainer} style={{ height: document.body.offsetHeight - 30 + 'px' }} ref={containerRef}>
                        <div className={styles.whitePage} style={{ display: showLoading ? 'block' : 'none' }}>
                            <div className='loading'><img src={img} /></div>
                        </div>
                        <article className={styles.page} ref={pageWrapperRef}>
                            <div className={styles.canvasWrapper}>
                                <canvas ref={canvasRef}></canvas>
                            </div>
                        </article>
                    </div>
                    }
                </>
            </div>
        </div>

    )
}

export default Preview;