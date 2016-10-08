/**
 * 典型案例
 * left: 0, 309, 618
 * transform: scale(1.2)
 */

((_window)=>{
    const box = document.getElementById("dianxinganli-box");
    const [btnLeft, btnRight] = [
        document.getElementById("dianxinganli-btn-left"),
        document.getElementById("dianxinganli-btn-right")
    ];
    const data = _window._config.anli;
    const maxLength = data.length - 1,
        time = 120;
    let index = 0,
        animated = false,
        a = null;

    /* transform */
    const transform = n => `-ms-transform: scale(${n});-webkit-transform: scale(${n});transform: scale(${n});`;

    /* animate */
    // 提取数字
    const number = number => Number(number.match(/-?\d+(\.\d+)?/g)[0]);
    const animate = (element, target, time)=>{
        const start = number(element.style.transform);
        const speed = (target - start) / time * 10;
        const absspeed = Math.abs(speed);
        const ani = ()=>{
            const t = number(element.style.transform);
            const m = t + speed;
            if(Math.abs(target - t) > absspeed){
                element.style.transform = `scale(${m})`;
                element.style.cssText += `-ms-transform: scale(${m});-webkit-transform: scale(${m});`;
                _window._shim.requestAnimationFrame(ani);
            }else{
                element.style.transform = `scale(${target})`;
                element.style.cssText += `-ms-transform: scale(${target});-webkit-transform: scale(${target});`;
            }
        };
        _window._shim.requestAnimationFrame(ani);
    };

    /* 按钮点击 */
    // 左（+）
    function leftCk(event){
        if(animated === false){
            animated = true;
            if(maxLength > 2){
                _window._shim.animate(a[3], "left", 618, time, "px");
                _window._shim.animate(a[0], "left", 309, time, "px");
            }else{
                _window._shim.animate(a[0], "left", 618, time, "px");
            }
            a[1].style.zIndex = 0;
            a[2].style.zIndex = 2;
            animate(a[1], 1, time);
            animate(a[2], 1.4, time);
            _window._shim.animate(a[1], "left", 0, time, "px");
            _window._shim.animate(a[2], "left", 309, time, "px", ()=>{
                box.appendChild(a[0]);
                animated = false;
            });
        }
    }
    // 右（-）
    function rightCk(event){
        if(animated === false){
            animated = true;
            if(maxLength > 2){
                _window._shim.animate(a[maxLength], "left", 0, time, "px");
                _window._shim.animate(a[2], "left", 309, time, "px");
            }else{
                _window._shim.animate(a[2], "left", 0, time, "px");
            }

            a[1].style.zIndex = 0;
            a[0].style.zIndex = 2;
            animate(a[1], 1, time);
            animate(a[0], 1.4, time);
            _window._shim.animate(a[1], "left", 618, time, "px");
            _window._shim.animate(a[0], "left", 309, time, "px", ()=>{
                box.insertBefore(a[maxLength], a[0]);
                animated = false;
            });
        }
    }

    /* 初始化节点 */
    const initDom = ()=>{
        let txt = "";

        for(let i = 0; i <= maxLength; i++){
            if(i === 0){
                txt += `<a href="${data[i].href}" style="z-index: 2;left: 309px;${transform(1.4)}"><img src="${data[i].image}"><p>${data[i].text}</p></a>`;
            }else if(i === 1){
                txt += `<a href="${data[i].href}" style="z-index: 0;left: 618px;${transform(1)}"><img src="${data[i].image}"><p>${data[i].text}</p></a>`;
            }else if(i === maxLength){
                txt += `<a href="${data[i].href}" style="z-index: 0;left: 0;${transform(1)}"><img src="${data[i].image}"><p>${data[i].text}</p></a>`;
            }else{
                txt += `<a href="${data[i].href}" style="z-index: 0;left: 309px;${transform(1)}"><img src="${data[i].image}"><p>${data[i].text}</p></a>`;
            }
        }

        box.innerHTML = txt;
        a = box.getElementsByTagName("a");
        box.insertBefore(a[maxLength], a[0]);
    };

    /* 初始化 */
    const init = ()=>{
        initDom();
        _window._shim.on(btnLeft, "click", leftCk);
        _window._shim.on(btnRight, "click", rightCk);
    };
    init();
})(window);