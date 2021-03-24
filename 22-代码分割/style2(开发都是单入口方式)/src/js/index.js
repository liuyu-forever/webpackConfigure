import $ from 'jquery';


/*
import other from './other';
import router from './router';
// 自有的模块
other(100, 299);
router(100, 90);
*/

// 三方模块
console.log($);

import(/* webpackChunkName: 'other'*/'./other.js').then((res)=>{
    console.log('文件加载成功！');
    console.log(res);
}).catch((error)=>{
    console.log('文件加载失败！');
});

import(/* webpackChunkName: 'router'*/'./router.js').then((res)=>{
    console.log('文件加载成功！');
    console.log(res);
}).catch((error)=>{
    console.log('文件加载失败！');
});


