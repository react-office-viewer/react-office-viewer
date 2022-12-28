import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import styles from "./style.less"
import loadingImg from "../../assets/images/loading-icon.gif"
import downloadImg from "../../assets/images/toolbarButton-download.svg"
import { _getBlobUrlFromBuffer, _download, getFileType } from '../../service/api';
import PropTypes from 'prop-types';
export default function XlsxViewer(props) {
    const { file: outFile, fileName: outFileName, width, height, fileType, timeout } = props;
    const [data, setData] = useState({});
    const [file, setFile] = useState();
    const [fileArrayBuffer, setFileArrayBuffer] = useState(); //ArrayBuffer类型的文件
    const [fileName, setFileName] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorInfo, setErrorInfo] = useState(t('formatInfoXlsx'));
    const [activeTabKey, setActiveTabKey] = useState('');
    const [sheetNames, setSheetNames] = useState([]);
    useEffect(() => {
        setFile(outFile);
    }, [outFile])
    useEffect(() => {
        if (outFileName) {
            setFileName(outFileName)
        }
    }, [outFileName])
    useEffect(() => {
        if (file) {
            onShowError(false);
            setShowLoading(true);
            if (typeof file === 'string') {
                //console.log('file', file);
                try {
                    let req = new XMLHttpRequest();
                    req.open("GET", file);
                    req.responseType = "arraybuffer";//arraybuffer blob
                    let xhrTimeOut = setTimeout(() => {
                        req.abort();
                        onShowError(true)
                    }, timeout)
                    req.onload = function (e) {
                        clearTimeout(xhrTimeOut);
                        try {
                            setFileArrayBuffer(req.response);
                            var data = new Uint8Array(req.response);
                            var workbook = XLSX.read(data, { type: "array" });
                            loadData(workbook);
                        } catch (e) {
                            onShowError(true)
                        }

                    };
                    req.send();
                } catch (e) {
                    onShowError(true)
                }

            } else if (file instanceof File) {
                let fileType = getFileType(file.type);
                let fName = file.name;
                if ((fileType == 'xlsx_docx') || (fileType == 'xls_doc')) {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = e => {
                        setFileName(fName);
                        let data = e.target.result;
                        setFileArrayBuffer(data);
                        let workbook = XLSX.read(data, { type: "array" });
                        loadData(workbook);
                    }

                } else {
                    onShowError(true)
                }
            } else {
                onShowError(true)
            }

        } else {
        }
    }, [file])
    const onShowError = (status, info) => {
        setShowLoading(false);
        setShowError(status);
        if (info) {
            setErrorInfo(info);
        }
    }
    const loadData = (workbook) => {
        var sheetNames = workbook.SheetNames;
        if (sheetNames && sheetNames.length > 0) {
            setSheetNames(sheetNames);
            setActiveTabKey('wbSheets_0')
        }
        sheetNames.forEach(function (sheetName, idx) {
            var subDivId = 'wbSheets_' + idx;
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: "A", blankrows: false });
            setData(data => {
                return {
                    ...data,
                    [subDivId]: json
                }
            });
        });
        setShowLoading(false);
    }


    const onChangeTab = (e, subDivId) => {
        e.preventDefault();
        setActiveTabKey(subDivId);
    }
    const handleDownload = e => {
        let fileUrl = _getBlobUrlFromBuffer(fileArrayBuffer, fileType);
        _download(fileUrl, fileName);
    }
    return <div id='wbSheets_wrapper_id' className={styles["wbSheets_wrapper"]} style={{ width: width || '100%', overflow: 'hidden' }}>
        <div className={styles.loadingPage} style={{ display: showLoading ? 'block' : 'none' }} >
            <div className={styles.loading}><img src={loadingImg} /></div>
        </div>
        <div className={styles.errorLine} style={{ display: showError ? 'flex' : 'none' }}>
            <em>{t('invalidFile')} {errorInfo}</em>
            <button onClick={() => onShowError(false)}>{t("close")}</button>
        </div>
        <div className={styles.title}>
            <span>{fileName}</span>
            <button className={styles["download"]} title={t("download")} onClick={handleDownload} disabled={!fileArrayBuffer}><img src={downloadImg} /></button>
        </div>
        <HotTable
            licenseKey="non-commercial-and-evaluation"
            data={data[activeTabKey]}
            colHeaders={true}
            rowHeaders={true}
            title={fileName}
            settings={{
                columns: false,
                fixedColumnsLeft: 0,
                fixedRowsTop: 0,
                stretchH: "none",
                colWidths: 200,
                startRows: 1,
                startCols: 1,
                wordWrap: true,
                autoRowSize: true,
                autoColumnSize: true,
            }}
            width={"100%"}
            height={height || document.body.offsetHeight - 45 + 'px'}
        />
        <ul className={styles["wbSheets_clas_ul"]}>
            {
                sheetNames.map((item, index) => (
                    <li className={activeTabKey == 'wbSheets_' + index ? styles['selected'] : ''}>
                        <a href={'wbSheets_' + index} onClick={(e) => onChangeTab(e, 'wbSheets_' + index)}>{item}</a>
                    </li>
                ))
            }
        </ul>
    </div>
}
XlsxViewer.defaultProps = {
    timeout: 10000
}
XlsxViewer.propTypes = {
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string
    })]),
    timeout: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
