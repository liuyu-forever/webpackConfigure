import '../css/index.css';


function sum(num1, num2) {
  return num1 + num2;
}

console.log(sum(100, 200));

if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
         navigator.serviceWorker.register('/service-worker.js').then(()=>{
              console.log('注册serviceWorker成功！')
         }).catch(()=>{
             console.log('注册serviceWorker失败！')
         })
    })
}
