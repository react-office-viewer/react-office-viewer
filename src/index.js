
import React, { useEffect, useState } from 'react';
import _PdfViewer from './components/PdfViewer/index'
import _XlsxViewer from './components/XlsxViewer/index'
import { getFileTypeFromArrayBuffer, getFileTypeFromFileName, getFileType } from './service/api';
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types';
import styles from "./components/XlsxViewer/style.less";
import './i8n.js';
const supportTypeList = ['xlsx_docx', 'xls_doc', 'pdf'];
function WithI18nComp(Comp) {
    return function I18n(props) {
        const { t, i18n } = useTranslation();
        const locale = props.locale;
        useEffect(() => {
            if (locale) {
                i18n.changeLanguage(locale);
                window.t = t;
            }
        }, [locale])
        window.t = t;
        return <Comp {...props} />
    }
}
function _AutoFormatViewer(props) {
    const { file: outFile, fileName, timeout } = props;
    const [file, setFile] = useState();
    const [fileType, setFileType] = useState('');
    useEffect(() => {
        setFile(outFile);
    }, [outFile])
    useEffect(() => {
        if (file) {
            if (typeof file === 'string') {
                if (fileName) {
                    let fileType = getFileTypeFromFileName(fileName);
                    setFileType(fileType);
                } else {
                    try {
                        let req = new XMLHttpRequest();
                        req.open("GET", file);
                        req.responseType = "arraybuffer";//arraybuffer blob
                        let xhrTimeOut = setTimeout(() => {
                            req.abort();
                        }, timeout)
                        req.onload = function (e) {
                            clearTimeout(xhrTimeOut);
                            let fileType = getFileTypeFromArrayBuffer(req.response.slice(0, 8));
                            setFileType(fileType);
                            //console.log('fileType', fileType)
                        };
                        req.send();
                    } catch (e) {

                    }
                }
            } else if (file instanceof File) {
                let fileType = getFileType(file.type);
                setFileType(fileType);
            }
        }
    }, [file])
    const onFlieChange = e => {
        var inputFileObj = e.target.files[0];
        setFile(inputFileObj);
    }
    return <>
        <input type='file' onChange={onFlieChange} />
        <div style={{ position: 'relative' }}>
            {
                supportTypeList.includes(fileType) ? (<>
                    {
                        fileType == 'pdf' ? <PdfViewer {...props} file={file} /> : <XlsxViewer {...props} file={file} fileType={fileType} />
                    }
                </>) : <p className={styles.errorLine} >{t('supportFileTypes')}</p>
            }
        </div>
    </>


}
_AutoFormatViewer.defaultProps = {
    timeout: 10000
}
_AutoFormatViewer.propTypes = {
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string
    })]).isRequired,
    timeout: PropTypes.number,
    fileName: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export const PdfViewer = WithI18nComp(_PdfViewer);
export const XlsxViewer = WithI18nComp(_XlsxViewer);
export default WithI18nComp(_AutoFormatViewer);


