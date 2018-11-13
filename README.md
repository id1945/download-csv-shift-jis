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
