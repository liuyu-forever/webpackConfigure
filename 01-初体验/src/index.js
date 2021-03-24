/*
   1. 开发环境
   webpack ./src/index.js  -o  ./build/dist.js --mode=development

   2. 生成环境
   webpack ./src/index.js  -o  ./build/dist.js --mode=production

   3.直观认知
   1） webpack默认只能处理js/json资源， 不能去处理css/img/font/...其它资源
   2） 生产环境比开发环境多了代码压缩

*/


// 1. 引入json文件
import data from './data'

// 2. 引入css文件
import "./index.css";

let sum = (num1, num2)=>{
    return num1 + num2;
};

console.log(sum(100, 200));
console.log(data);