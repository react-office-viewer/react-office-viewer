import React from 'react';
import styles from '../style.less';
import loadingImg from "../../../assets/images/loading-icon.gif"
export default function Loading(props) {
    const { showLoading = false } = props;
    return (
        <div className={styles.loadingPage} style={{ display: showLoading ? 'block' : 'none' }} >
            <div className={styles.loading}><img src={loadingImg} /></div>
        </div>
    )
}
