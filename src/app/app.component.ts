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
