import mammoth from 'mammoth';
import React, { useEffect, useState, useRef } from 'react';
import styles from "./style.less";
import { Loading, TitleWithDownload, ErrorLine } from '../pageComps';
import { getFileTypeFromUploadType, _getBlobUrlFromBuffer, _download } from '../../utils/utils';
export default function DocxViewer(props) {
    const { file, fileName: outFileName, width, height } = props;
    const [docHtmlStr, setDocHtmlStr] = useState('');
    const [fileName, setFileName] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(t('formatInfoDocx'));
    const [scale, setScale] = useState(1);
    const [fileArrayBuffer, setFileArrayBuffer] = useState(); //ArrayBuffer类型的文件
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        if (outFileName) {
            setFileName(outFileName)
        }
    }, [outFileName])
    useEffect(() => {
        if (file) {
            setShowLoading(true);
            if (typeof file === 'string') {
                try {
                    var req = new XMLHttpRequest();
                    req.open("GET", file);
                    req.responseType = "arraybuffer";//arraybuffer blob
                    req.onload = function (e) {
                        setFileArrayBuffer(req.response);
                        loadContent(req.response);
                    };
                    req.send();
                } catch (e) {
                    console.log('error', e);
                    setShowError(true);
                    setShowLoading(false);
                }

            } else if (file instanceof File) {
                let fName = file.name;
                let fileType = getFileTypeFromUploadType(file.type);
                if (fileType !== 'docx') {
                    onShowError(true);
                    setShowLoading(false);
                    return;
                }
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = e => {
                    setFileName(fName);
                    let data = e.target.result;
                    setFileArrayBuffer(data);
                    loadContent(data);
                }
            } else {
                onShowError(true);
                setShowLoading(false);
            }
        }
    }, [file])
    const loadContent = async (arrayBuffer) => {
        setShowLoading(true);
        try {
            var data = new Uint8Array(arrayBuffer);
            let { value } = await mammoth.convertToHtml({ arrayBuffer: data }, {
                includeDefaultStyleMap: true,
            });
            let div = document.createElement('div');
            div.innerHTML = value;
            //处理所有的a标签，使其在新标签页打开
            let domList = div.getElementsByTagName('a');
            Array.from(domList).forEach(item => {
                item.setAttribute('target', '_blank')
            })
            setDocHtmlStr(div.innerHTML);
        } catch (e) {
            console.log('error', e);
            setShowError(true);
        } finally {
            setShowLoading(false);
        }
    }
    const handleDownload = () => {
        let fileUrl = _getBlobUrlFromBuffer(fileArrayBuffer, 'docx');
        _download(fileUrl, fileName, 'docx');
    }
    const onShowError = (status) => {
        setShowError(status);
    }
    const onZoom = direc => {
        if (direc == 'in') {
            //放大
            if (scale >= 1) return;
            let _scale = scale + 0.1;
            //console.log(_scale);
            setScale(_scale.toFixed(1) * 1);
        } else {
            if (scale <= 0.3) return;
            let _scale = scale - 0.1;
            //console.log(_scale);
            setScale(_scale.toFixed(1) * 1)
        }
    }
    return <div className={styles['pg-viewer-wrapper']} style={{ width: width || '100%', height: height || document.body.offsetHeight - 45 + 'px' }}>
        <Loading showLoading={showLoading} />
        <ErrorLine errorInfo={errorInfo} showError={showError} onShowError={onShowError} />
        <TitleWithDownload backgroundColor='rgba(35,100,155,0.9)' handleDownload={handleDownload} fileName={fileName} disabled={!fileArrayBuffer} onZoom={onZoom} zoom={true} />
        <div
            className={styles['document-container']}
            style={{
                width: scale * 100 + '%',
                height: '85%',
                overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: docHtmlStr }}
        >
            {/* {docHtmlStr} */}
        </div>
    </div>
}