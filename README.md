# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Clone

````
git clone https://github.com/id1945/download-csv-shift-jis.git
npm install
npm start
````

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

## Link
[https://giai-ma.blogspot.com/2018/02/javascript-download-csv-shift-jis.html](https://giai-ma.blogspot.com/2018/02/javascript-download-csv-shift-jis.html)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
