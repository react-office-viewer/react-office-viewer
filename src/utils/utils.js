export const ALL_FILE_TYPES = ['xlsx', 'docx', 'pptx', 'pdf', 'xls', 'doc', 'ppt', 'file2003', 'file2007', 'other']; //所有可能出现的文件类型 判断结果
const fileTypeMap = {
    'application/pdf': 'pdf',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
}
const fileTypeMapReverse = {
    'pdf': 'application/pdf',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'default': 'text/plain'
}
//pdf专用的
export async function _getBlobUrl(url, pdfDocument) {
    if (url.indexOf("blob:") == 0) {
        return url;
    }
    let unit8ArrayData = await pdfDocument.getData();
    let blob = new Blob([unit8ArrayData], { type: 'application/pdf' })
    return _getObjectUrl(blob);
}
export function _getBlobUrlFromBuffer(arrayBuffer, fileType) {
    let type = fileTypeMapReverse[fileType] || fileTypeMapReverse['default'];
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
/**
 * 
 * @param {*} blobUrl 
 * @param {*} fileName 
 * @param {*} ext 文件后缀名
 */
export function _download(blobUrl, fileName, ext = 'txt') {
    var a = document.createElement('a');
    let _fileName = fileName || (new Date().toLocaleDateString() + `.${ext}`);
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
export function getFileTypeFromFileName(fileName) {
    let ext = fileName.split('.').pop().toLowerCase();
    if (ALL_FILE_TYPES.includes(ext)) {
        return ext
    }
    return 'other'
}
//判断文件类型
export function getFileTypeFromUploadType(type) {
    return fileTypeMap[type] || 'other';
}