// 全局引入
// import '@babel/polyfill'
const sum = function sum(num1, num2) {
  return num1 + num2;
};

// eslint-disable-next-line
console.log(sum(100, 200));
new Promise(((resolve, reject) => {
  const a = 10;
  const
    b = 20;
  if (b > a) {
    resolve('撩课学院');
  } else {
    reject(new Error('我就是一个错误！'));
  }
})).then((res) => {
  // eslint-disable-next-line
    console.log(res);
}).catch((error) => {
  // eslint-disable-next-line
    console.log(error);
});
