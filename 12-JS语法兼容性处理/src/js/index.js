// 全局引入
// import '@babel/polyfill'

let sum = (num1, num2)=>{
    return num1 + num2;
};

console.log(sum(100, 200));


new Promise((resolve, reject)=>{
    resolve('撩课学院');
}).then((res)=>{
    console.log(res)
}).catch((error)=>{

});