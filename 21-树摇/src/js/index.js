import "./../css/index.css"

import add from './other.js';
add(100, 200);

// 副作用代码
import a from './a.js';


console.log('入口文件被加载了++++++++！');


function sum(num1, num2) {
    return num1 + num2;
}

console.log(sum(100, 200));

