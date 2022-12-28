export async function _getBlobUrl(url, pdfDocument) {
    if (url.indexOf("blob:") == 0) {
        return url;
    }
    let unit8ArrayData = await pdfDocument.getData();
    let blob = new Blob([unit8ArrayData], { type: 'application/pdf' })
    return _getObjectUrl(blob);
}
export function _getBlobUrlFromBuffer(arrayBuffer, fileType) {
    let type = 'application/vnd.ms-excel';
    if (fileType === 'xlsx_docx') {
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    let blob = new Blob([arrayBuffer], { type })
    return _getObjectUrl(blob);
}
export function _getObjectUrl(file) {
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

export function _download(blobUrl, fileName) {
    var a = document.createElement('a');
    let _fileName = fileName || (new Date().toLocaleDateString() + '.xls');
    if (a.click) {
        a.href = blobUrl;
        a.target = '_parent';
        if ('download' in a) {
            a.download = _fileName;
        }
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    } else {
        if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
            var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
            blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
        }
        window.open(blobUrl, '_parent');
    }
}
//判断文件类型
/**
 * 
 * @param {*} arr  ArrayBuffer 
 */
export function getFileTypeFromArrayBuffer(arrayBuffer) {
    const formatMap = {
        'pdf': ['25', '50', '44', '46'],
        'xls_doc': ['d0', 'cf', '11', 'e0'],
        'xlsx_docx': ['50', '4b', '03', '04', '14', '00', '06', '00'],
    }
    let arr = new Uint8Array(arrayBuffer);
    arr = arr.slice(0, 8);
    //将数据转化成16进制，与各个格式模数对比
    let newList = Array.prototype.map
        .call(arr, (x) => ('00' + x.toString(16)).slice(-2));
    let str = newList.join('');
    let result = 'xlsx_docx';
    for (let type in formatMap) {
        let target = formatMap[type].join('');
        if (str === target || str.indexOf(target) > -1) {
            result = type;
            break;
        }
    }
    return result;
}
export function getFileTypeFromFileName(fileName) {
    let ext = fileName.split('.').pop().toLowerCase();
    if (ext == 'xlsx') {
        return 'xlsx_docx'
    }
    if (ext == 'xls') {
        return 'xls_doc'
    }
    if (ext == 'pdf') {
        return 'pdf';
    }
}
export function getFileType(type) {
    const formatMap = {
        'application/pdf': 'pdf',
        'application/vnd.ms-excel': 'xls_doc',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx_docx',
    }
    return formatMap[type];
}