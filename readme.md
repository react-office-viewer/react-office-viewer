# react-office-viewer:    pdf, xls, xlsx, docx
# Features
1. Temporary support 'pdf,xls,xlsx,docx'.For more types, please pay attention to the following updates.      
2. Automatically identify file types of 'pdf,xls,xlsx,doc,docx,ppt,pptx' according to file arraybuffer. File suffix or file name is better but not necessary. Further more, it can avoid wrong judgment by the falsy changes of file suffix.   
能自动识别文件类型，传递文件名称不是必须的（但最好传递），可以避免后缀名错误修改导致的错误类型判断。   
3. PDF viewer has a full functional toolbar with common functions of pagination,zoom,rotate,print,thumbview,etc.      
其中pdf 预览组件有功能健全的toolbar，实现了翻页、缩放、旋转、打印、缩略图等常用功能。
4. The inner prompt language supports both Chinese and English, you can choose it by passing a param.(Default Chinese)   
组件内置的提示语言支持中英双语，你可以通过传递参数来选择。（默认中文）  
5. Implemented based on react 16.8.  

# Usage
```
npm install react-office-viewer

```
```
import Viewer from "react-office-viewer"

//If you only want to preview a certain format, you can import them individually.
import { SheetViewer, PdfViewer, DocxViewer } from "react-office-viewer"
```

## Params 
```
// Pass a url that can get the file stream. 
<Viewer file="http://xxxx"/>   

// Or, pass a File Object.
<Viewer file={ fileObject }/>

<input type='file' onChange={this.getFileObject} />
getFileObject = e => {
  this.setState({ fileObject: e.target.files[0] });
}


//other optional params:
let params = {
  fileName,  //PropTypes.string
  locale: 'en', // PropTypes.oneOf(['zh','en'])
  width, //PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height, //PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timeout: 10000, //PropTypes.number. Timeout limit of url request, only works on sheet/docx previewer.
}

<Viewer file="http://xxxx" {...params} />

```

# Dependencies
handsontable,  
mammoth,   
xlsx, 
pdfjs-dist       
