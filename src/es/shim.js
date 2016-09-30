/**
 * 兼容函数
 */

((_window)=>{
    const shim = {};

    // 监听事件
    shim.on = (()=>{
        if(document.addEventListener){
            return function(e, t, f, s = false){
                e.addEventListener(t, f, s);
            };
        }else{
            return function(e, t, f){
                e.attachEvent(`on${t}`, f);
            };
        }
    })();

    // 移除监听事件
    shim.off = (()=>{
        if(document.addEventListener){
            return function(e, t, f){
                e.removeEventListener(t, f);
            };
        }else{
            return function(e, t, f){
                e.detachEvent(`on${t}`, f);
            };
        }
    })();

    // 动画
    shim.requestAnimationFrame = (()=>{
        return _window.requestAnimationFrame ? _window.requestAnimationFrame : (fun)=>{
            return setTimeout(fun, 100);
        };
    })();

    // 移除定时器
    shim.cancelAnimationFrame = (()=>{
        return _window.cancelAnimationFrame ? _window.cancelAnimationFrame : (v)=>{
            clearTimeout(v);
        };
    })();

    // 动画
    shim.animate = (element, target, type, speed, unit, callback)=>{
        const start = element.style[type];
    };

    _window._shim = shim;
})(window);
