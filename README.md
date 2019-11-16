# array-switch
Branch and switch the array!
```js
var line5 = new Switchable(["Gwangnaru", "Cheonho", "Gangdong", "Gil-dong", "Gubeundari"]);
line5.stick(2, ["Dunchon-dong", "Olympic Park", "Bangi"]);
console.log(line5.data); 
// ['Gwangnaru','Cheonho','Gangdong','Gil-dong','Gubeundari' ]
line5.switch(1);
console.log(line5.data); 
// ['Gwangnaru','Cheonho','Gangdong','Dunchon-dong','Olympic Park','Bangi']
```
## Installation
### NPM
```bash
npm install array-switch
```
```js
const array-switch = require("array-switch");
```
### CDN
```html
<script src="https://unpkg.com/browse/array-switch/dist/array-switch.umd.js"></script>
```
## How To Use
```js

```
