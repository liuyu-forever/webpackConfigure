
/*import add from './other';

console.log('-----入口文件被加载了！！！');
document.getElementById('btn').onclick = function () {
  console.log(add(100, 200));
};*/

// 懒加载
/*console.log('-----入口文件被加载了！！！');
document.getElementById('btn').onclick = function () {
    import('./other.js').then((res)=>{
        console.log(res.default(100, 200));
    }).catch(()=>{

    })
};*/

// 预加载
console.log('-----入口文件被加载了！！！');
document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName: 'other', webpackPrefetch: true */'./other.js').then((res)=>{
        console.log(res.default(100, 200));
    }).catch(()=>{

    })
};
