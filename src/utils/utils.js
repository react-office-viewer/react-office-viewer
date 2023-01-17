export const ALL_FILE_TYPES = ['xlsx', 'docx', 'pptx', 'pdf', 'xls', 'doc', 'ppt', 'file2003', 'file2007', 'other']; //所有可能出现的文件类型 判断结果
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
/**
 * 
 * @param {*} blobUrl 
 * @param {*} fileName 
 * @param {*} ext 文件后缀名
 */
export function _download(blobUrl, fileName, ext = 'xls') {
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
/**
 * 
 * @param {*} arr  ArrayBuffer 
 */
export function getFileTypeFromArrayBuffer(arrayBuffer) {
    const formatMap = {
        'pdf': ['25', '50', '44', '46'],
        'file2003': ['d0', 'cf', '11', 'e0'],
        'file2007': ['50', '4b', '03', '04', '14', '00', '06', '00'],
    }
    //区分xlsx,pptx,docx三种格式的buffer码。通过每个文件末尾的关键词检索判断
    const format2007Map = {
        xlsx: ['77', '6f', '72', '6b', '73', '68', '65', '65', '74', '73', '2f'],// 转换成ascii码的含义是 worksheets/
        docx: ['77', '6f', '72', '64', '2f'],// 转换成ascii码的含义是 word/
        pptx: ['70', '70', '74', '2f'],// 转换成ascii码的含义是 ppt/
    }
    //区分xls,ppt,doc三种格式的buffer码，xls从文件开头判断，其他两种从文件末尾判断
    let pptFormatList = ['50', '6f', '77', '65', '72', '50', '6f', '69', '6e', '74', '20', '44', '6f', '63', '75', '6d', '65', '6e', '74'];// 转换成ascii码的含义是 PowerPoint Document
    const format2003Map = {
        xls: ['6f', '66', '66', '69', '63', '65', '3a', '65', '78', '63', '65', '6c'],// 转换成ascii码的含义是 office:excel
        doc: ['4d', '69', '63', '72', '6f', '73', '6f', '66', '74', '20', '57', '6f', '72', '64'],// 转换成ascii码的含义是 Microsoft Word
        ppt: pptFormatList.join(',00,').split(',')
    }
    let arr = new Uint8Array(arrayBuffer);
    let arr_8 = arr.slice(0, 8);
    //将数据转化成16进制，与各个格式模数对比
    //第一次匹配，只匹配arrayBuffer前八位数，得到大范围的模糊类型
    let str_8 = Array.prototype.map
        .call(arr_8, (x) => ('00' + x.toString(16)).slice(-2)).join('');
    //console.log('str8', str_8)
    let result = '';
    //第一次匹配
    for (let type in formatMap) {
        let target = formatMap[type].join('');
        if (~str_8.indexOf(target)) {
            result = type;
            break;
        }
    }
    if (!result) {
        //未匹配，有可能是xls文件
        result = 'file2003';
    }
    if (result == 'pdf') {
        return result;
    }
    if (result == 'file2007') {
        //默认是xlsx,pptx,docx三种格式中的一种，进行第二次匹配.如果未匹配到，结果仍然是file2007
        let arr_500 = arr.slice(-500);
        let arr_500_16 = Array.prototype.map
            .call(arr_500, (x) => ('00' + x.toString(16)).slice(-2));
        for (let type in format2007Map) {
            let target = format2007Map[type];
            if (isListContains(target, arr_500_16)) {
                result = type;
                break;
            }
        }
        return result;
    }
    if (result == 'file2003') {
        let arr_start = arr.slice(50, 150);
        let arr_start_16 = Array.prototype.map
            .call(arr_start, (x) => ('00' + x.toString(16)).slice(-2));
        let arr_end = arr.slice(-550, -440);
        let arr_end_16 = Array.prototype.map
            .call(arr_end, (x) => ('00' + x.toString(16)).slice(-2));
        for (let type in format2003Map) {
            let target = format2003Map[type];
            if (type == 'xls') {
                //通过前50-150位置判断是否是xls
                if (~(arr_start_16.join('').indexOf(target.join('')))) {
                    result = type;
                    break
                }
            } else {
                //通过倒数440-550位置判断是否是doc/ppt
                if (~(arr_end_16.join('').indexOf(target.join('')))) {
                    result = type;
                    break
                }
            }
        }
        return result;
    }
    //未匹配成功
    return 'other';
}
export function getFileTypeFromFileName(fileName) {
    let ext = fileName.split('.').pop().toLowerCase();
    if (ALL_FILE_TYPES.includes(ext)) {
        return ext
    }
    return 'other'
}
export function getFileTypeFromUploadType(type) {
    const formatMap = {
        'application/pdf': 'pdf',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
    }
    return formatMap[type] || 'other';
}
//arr数组是否包含target数组
function isListContains(target, arr) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] == target[0]) {
            let temp = arr.slice(i, i + target.length);
            if (temp.join() === target.join()) {
                return true
            }
        }
        i++;
    }
}