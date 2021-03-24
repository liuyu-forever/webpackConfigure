
import "./../css/index.css"

import logRouter from './router'
logRouter();

console.log('入口文件被加载了！');

// js代码支持HMR
if(module.hot){
    // module.hot 为 true , 开启了热更新功能
    module.hot.accept('./router.js', function (res) {
        console.log(res);
        logRouter();
    });

}