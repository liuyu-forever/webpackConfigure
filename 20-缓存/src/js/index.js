import "./../css/index.css"

import add from './other';
add(100, 200);


import a from './a';
a(100, 200);

console.log('入口文件被加载了++++++++！');


function sum(num1, num2) {
    return num1 + num2;
}

console.log(sum(100, 200));

