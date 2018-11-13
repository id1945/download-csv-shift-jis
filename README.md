# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Clone

````
git clone https://github.com/id1945/download-csv-shift-jis.git
npm install
npm start
````

```html
<button (click)="downloadFile()">Click me to download CSV</button>
```

```javascript
import { Component } from '@angular/core';
declare var require: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }

  downloadFile() {
    const content_file = 'A,"B",C\n1,"a,b,c",d\n2,E,F';

    /*npm install encoding-japanese --save*/
    const encoding = require('encoding-japanese');
    const str_array = encoding.stringToCode(content_file);
    const sjis_array = encoding.convert(str_array, "SJIS", "UNICODE");
    const uint8_array = new Uint8Array(sjis_array);

    const blob = new Blob([uint8_array], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'demo-Shift-JIS.csv');
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = "demo-Shift-JIS.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
}
```
<embed src="https://stackblitz.com/edit/download-csv-shift-jis?embed=1&file=src/app/app.component.ts&view=preview" style="width:100%; height:500px;"/>

## Link
[https://giai-ma.blogspot.com/2018/02/javascript-download-csv-shift-jis.html](https://giai-ma.blogspot.com/2018/02/javascript-download-csv-shift-jis.html)

```javascript
// ecl_array.js（26.256KB）
// https://github.com/wealandwoe/ecl_array.js
// encoding.js（221.71KB）
// https://github.com/polygonplanet/encoding.js
//
// 上記のどちらかを使う
// 比較記事：http://qiita.com/weal/items/3b3ddfb8157047119554
//
// saveAs関数 は FileSaver.js
// https://github.com/eligrey/FileSaver.js/

var saveShiftJisCSV = function(csvStr, csvFileName){
  // encoding.js
  // var str_array = Encoding.stringToCode(csvStr);
  // var sjis_array = Encoding.convert(str_array, "SJIS", "UNICODE");
  // var uint8_array = new Uint8Array(sjis_array);
  
  // ecl_array.js
  var str_array = ECL.charset.Unicode.parse(csvStr);
  var sjis_array = ECL.charset.convert_array(str_array, "SJIS");
  var uint8_array = new Uint8Array(sjis_array);
  
  var blob = new Blob([uint8_array], { type: "text/csv;" });
  saveAs(blob, csvFileName);
};

var csv = 'id,name,comment\n1,あああ,いいい\n2,ううう,えええ';
saveShiftJisCSV(csv, "test.csv");
```
