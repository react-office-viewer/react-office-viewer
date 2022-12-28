# read me
```
npm install react-office-viewer

```
```
import Viewer, { XlsxViewer, PdfViewer } from "react-office-viewermm"
```
### Viewer组件目前可以自动识别pdf，xlsx/xls格式的文件
### XlsxViewer, PdfViewer组件单独引用，可以分别识别xlsx/xls, pdf格式的文件
```
//用法一
<Viewer file="http://xxxx" fileName="test.pdf" locale="en" />
<PdfViewer file="http://xxxx" fileName="test.pdf" locale="en" />
<XlsxViewer file="http://xxxx" fileName="test.xls" locale="en" />

//用法二
<PdfViewer file="blob:http://xxxx" fileName="test.pdf" locale="zh" />

//用法三
<Viewer file={file} />
<PdfViewer file={pdfFile} />
<XlsxViewer file={xlsxFile} />

<input type='file' onChange={this.onFlieChange} />

const onFlieChange = e => {
    let inputFileObj = e.target.files[0];
    if (inputFileObj !== undefined) {
      this.setState({ file: inputFileObj });
    }
}
```
