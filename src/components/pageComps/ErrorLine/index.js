import React from 'react';
import styles from '../style.less';
export default function ErrorLine(props) {

    const { showError = false, errorInfo, onShowError } = props;
    return (
        <div className={styles.errorLine} style={{ display: showError ? 'flex' : 'none' }}>
            <em>{t('invalidFile')} {errorInfo}</em>
            <button onClick={() => onShowError(false)}>{t("close")}</button>
        </div>
    )
}
