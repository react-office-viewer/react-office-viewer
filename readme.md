# read me
```
npm install react-office-viewer

```
```
import { PdfViewer } from 'react-office-viewer';
//用法一
<PdfViewer file="http://xxxx" fileName="test.pdf" locale="en" />
//用法二
<PdfViewer file="blob:http://xxxx" fileName="test.pdf" locale="zh" />
//用法三
<PdfViewer file={pdfFile} />
<input type='file' onChange={this.onFlieChange} />

const onFlieChange = e => {
    let inputFileObj = e.target.files[0];
    if (inputFileObj !== undefined) {
      this.setState({ pdfFile: inputFileObj });
    }
}
```
