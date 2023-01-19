import React from 'react';
import styles from '../style.less';
import downloadImg from "../../../assets/images/toolbarButton-download.svg"
export default function TitleWithDownload(props) {

    const { fileName, handleDownload, disabled = false, backgroundColor = '#1e8e3edb' } = props;
    return (
        <div className={styles.title} style={{ backgroundColor: backgroundColor }}>
            <span>{fileName}</span>
            <button className={styles["download"]} title={t("download")} onClick={handleDownload} disabled={disabled}><img src={downloadImg} /></button>
        </div>
    )
}
