import { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { TextLayerBuilder, EventBus } from 'pdfjs-dist/web/pdf_viewer';
import styles from './viewer.less';
// import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
// import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';

function isFunction(value) {
    return typeof value === 'function';
}
const eventBus = new EventBus();

export const usePdf = ({
    canvasRef,
    pageWrapperRef,
    file,
    onDocumentLoadSuccess,
    onDocumentLoadFail,
    onPageLoadSuccess,
    onPageLoadFail,
    onPageRenderSuccess,
    onPageRenderFail,
    scale = 1.5,
    rotate = 0,
    page = 1,
    cMapUrl,
    cMapPacked,
    workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`,
    withCredentials = true,
}) => {
    //console.log('viewer.js运行')
    const [pdfDocument, setPdfDocument] = useState();
    const [pdfPage, setPdfPage] = useState();
    const renderTask = useRef(null);
    const scaleRef = useRef(scale);
    const pdfPageRef = useRef(pdfPage);
    const onDocumentLoadSuccessRef = useRef(onDocumentLoadSuccess);
    const onDocumentLoadFailRef = useRef(onDocumentLoadFail);
    const onPageLoadSuccessRef = useRef(onPageLoadSuccess);
    const onPageLoadFailRef = useRef(onPageLoadFail);
    const onPageRenderSuccessRef = useRef(onPageRenderSuccess);
    const onPageRenderFailRef = useRef(onPageRenderFail);
    // assign callbacks to refs to avoid redrawing
    useEffect(() => {
        onDocumentLoadSuccessRef.current = onDocumentLoadSuccess;
    }, [onDocumentLoadSuccess]);

    useEffect(() => {
        onDocumentLoadFailRef.current = onDocumentLoadFail;
    }, [onDocumentLoadFail]);

    useEffect(() => {
        onPageLoadSuccessRef.current = onPageLoadSuccess;
    }, [onPageLoadSuccess]);

    useEffect(() => {
        onPageLoadFailRef.current = onPageLoadFail;
    }, [onPageLoadFail]);

    useEffect(() => {
        onPageRenderSuccessRef.current = onPageRenderSuccess;
    }, [onPageRenderSuccess]);

    useEffect(() => {
        onPageRenderFailRef.current = onPageRenderFail;
    }, [onPageRenderFail]);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    }, [workerSrc]);
    useEffect(() => {
        scaleRef.current = scale;
    }, [scale])
    useEffect(() => {
        pdfPageRef.current = pdfPage;
    }, [pdfPage])
    useEffect(() => {
        if (!file) return;
        const config = { withCredentials };
        if (isFunction(file)) {
            config.url = file();
        }
        else {
            config.url = file;
        }
        if (cMapUrl) {
            config.cMapUrl = cMapUrl;
            config.cMapPacked = cMapPacked;
        }
        pdfjs.getDocument(config).promise.then(
            loadedPdfDocument => {
                setPdfDocument(loadedPdfDocument);

                if (isFunction(onDocumentLoadSuccessRef.current)) {
                    onDocumentLoadSuccessRef.current(loadedPdfDocument);
                }
            },
            (info) => {
                if (isFunction(onDocumentLoadFailRef.current)) {
                    onDocumentLoadFailRef.current(info);
                }
            }
        );
    }, [file, withCredentials, cMapUrl, cMapPacked]);
    useEffect(() => {
        if (pdfDocument) {
            pdfDocument.getPage(page).then(
                loadedPdfPage => {
                    setPdfPage(loadedPdfPage);
                    if (isFunction(onPageLoadSuccessRef.current)) {
                        onPageLoadSuccessRef.current(loadedPdfPage)
                    }
                },
                (e) => {
                    console.log('onPageLoadFail', e)
                    if (isFunction(onPageLoadFailRef.current)) {
                        onPageLoadFailRef.current();
                    }
                }
            );
        }
    }, [canvasRef, pageWrapperRef, pdfDocument, page])
    useEffect(() => {
        const drawPDF = (page) => {
            // Because this page's rotation option overwrites pdf default rotation value,
            // calculating page rotation option value from pdf default and this component prop rotate.
            const rotation = rotate === 0 ? page.rotate : page.rotate + rotate;
            const dpRatio = 1.00071 || window.devicePixelRatio;
            const adjustedScale = scaleRef.current * dpRatio;
            const viewport = page.getViewport({ scale: adjustedScale, rotation });
            const canvasEl = canvasRef.current;
            if (!canvasEl) {
                return;
            }
            const canvasContext = canvasEl.getContext('2d');
            if (!canvasContext) {
                return;
            }
            let pageWrapper = pageWrapperRef.current;
            pageWrapper.style.width = `${viewport.width / dpRatio}px`;
            pageWrapper.style.height = `${viewport.height / dpRatio}px`;
            canvasEl.style.width = `${viewport.width / dpRatio}px`;
            canvasEl.style.height = `${viewport.height / dpRatio}px`;
            const resolution = 2; //增加图像清晰度
            canvasEl.height = resolution * viewport.height;
            canvasEl.width = resolution * viewport.width;

            // if previous render isn't done yet, we cancel it
            if (renderTask.current) {
                renderTask.current.cancel();
                return;
            }
            renderTask.current = page.render({
                canvasContext,
                viewport,
                transform: [resolution, 0, 0, resolution, 0, 0],
            });

            return renderTask.current.promise.then(
                () => {
                    renderTask.current = null;

                    if (isFunction(onPageRenderSuccessRef.current)) {
                        onPageRenderSuccessRef.current(page);
                    }
                    // return page.streamTextContent({
                    //     includeMarkedContent: false,
                    // })
                    return page.getTextContent();
                },
                (reason) => {
                    renderTask.current = null;
                    if (reason && reason.name === 'RenderingCancelledException') {
                        drawPDF(pdfPageRef.current);
                    } else if (isFunction(onPageRenderFailRef.current)) {
                        onPageRenderFailRef.current();
                    }
                }
            ).then(textContent => {
                createTextlayer(pageWrapper, textContent, page, viewport, canvasEl.style.width, canvasEl.style.height);
            });
        };

        if (pdfPage) {
            drawPDF(pdfPage);
        }
    }, [pdfPage, scale, rotate]);

    const createTextlayer = (wrapper, text, page, viewport, width, height) => {
        // console.log('tt', text);
        if (text) {
            let oldDiv = document.getElementById('pdf_viewer_textLayer');
            const textLayerDiv = document.createElement('div');
            textLayerDiv.setAttribute('id', 'pdf_viewer_textLayer');
            textLayerDiv.setAttribute('style', `width:${width};height:${height};word-break:keep-all`);
            textLayerDiv.setAttribute('class', styles.textLayer);
            if (oldDiv) {
                wrapper.replaceChild(textLayerDiv, oldDiv)
            } else {
                wrapper.appendChild(textLayerDiv);
            }

            let textLayer = new TextLayerBuilder({
                textLayerDiv,
                eventBus,
                pageIndex: page.pageIndex,
                viewport
            })
            //textLayer.setTextContentStream(text);
            textLayer.setTextContent(text);
            textLayer.render();
        }
    }
    return { pdfDocument, pdfPage };
};