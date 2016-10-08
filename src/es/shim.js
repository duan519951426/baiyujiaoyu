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
        if(_window.requestAnimationFrame){
            return (fun)=>{
                return requestAnimationFrame(fun);
            };
        }else{
            return (fun)=>{
                return setTimeout(fun, 100);
            };
        }
    })();

    // 移除定时器
    shim.cancelAnimationFrame = (()=>{
        if(_window.cancelAnimationFrame){
            return (v)=>{
                return cancelAnimationFrame(v);
            };
        }else{
            return (fun)=>{
                clearTimeout(v);
            };
        }
    })();

    // 动画
    shim.animate = (element, type, target, time, unit, callback)=>{
        // 提取数字
        const number = number => Number(number.match(/-?\d+(\.\d+)?/g)[0]);

        const start = number(element.style[type]);
        const speed = (target - start) / time * 10;
        const absspeed = Math.abs(speed);
        const ani = ()=>{
            const t = number(element.style[type]);
            if(Math.abs(target - t) > absspeed){
                element.style[type] = `${t + speed}${unit}`;
                shim.requestAnimationFrame(ani);
            }else{
                element.style[type] = `${target}${unit}`;
                if(callback){
                    callback();
                }
            }
        };
        shim.requestAnimationFrame(ani);
    };

    _window._shim = shim;
})(window);
