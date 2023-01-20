import React from 'react';
import styles from '../style.less';
import downloadImg from "../../../assets/images/toolbarButton-download.svg"
export default function TitleWithDownload(props) {

    const { fileName, handleDownload, disabled = false, backgroundColor = '#1e8e3edb', zoom, onZoom } = props;
    return (
        <div className={styles.title} style={{ backgroundColor: backgroundColor }}>
            <span>{fileName}</span>
            {
                zoom && (
                    <div style={{ display: 'flex' }}>
                        <button className={`${styles["toolbarButton"]} ${styles["zoomOut"]}`} onClick={() => onZoom('out')}></button>
                        <div className={styles["splitToolbarButtonSeparator"]}></div>
                        <button className={`${styles["toolbarButton"]} ${styles["zoomIn"]}`} onClick={() => onZoom('in')}></button>
                    </div>
                )
            }
            <button className={styles["download"]} title={t("download")} onClick={handleDownload} disabled={disabled}><img src={downloadImg} /></button>
        </div>
    )
}
