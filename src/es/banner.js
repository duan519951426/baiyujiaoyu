/**
 * 网站首页轮播图
 */

((_window)=>{
    const [image, choice] = [
        document.getElementById("banner-image"),
        document.getElementById("banner-choice")
    ];
    const data = _window._config.banner;
    const maxIndex = data.length - 1;
    const classname = "thisIndex",
        time = 300,
        unit = "%",
        ci = 4000;
    let index = 0,
        li,
        set,
        animated = false;

    /* 初始化节点 */
    const initImage = ()=>{
        let txt = "";
        const m = maxIndex + 2,
            w = 100 / m;

        data.map(function(obj, index){
            txt += `<a href="${obj.href}" style="width: ${w + unit};background-image: url('${obj.image}')"></a>`;
        });
        txt += `<a href="${data[0].href}" style="width: ${w + unit};background-image: url('${data[0].image}')"></a>`;

        image.style.cssText = `width: ${m}00${unit};left: 0;`;
        image.innerHTML = txt;
    };
    const initChoice = ()=>{
        let txt = "";

        for(let i = 0; i <= maxIndex; i++){
            txt += `<li class="${i === 0 ? classname : ""}" data-index="${i}"></li>`;
        }

        choice.innerHTML = txt;
        li = choice.getElementsByTagName("li");
    };

    /* 动画 */
    const master = ()=>{
        animated = true;
        li[index].className = "";
        let callback = null,
            target;
        if(index >= maxIndex){
            index = 0;
            target = -100 * (maxIndex + 1);
            callback = ()=>{
                image.style.left = 0;
            };
        }else{
            index++;
            target = -100 * index;
        }
        li[index].className = classname;
        _window._shim.animate(image, "left", target, time, unit, ()=>{
            if(callback){
                callback();
            }
            animated = false;
            set = setTimeout(master, ci);
        });
    };

    /* 点击事件 */
    function ck(event){
        const e = event.target || event.srcElement;
        const i = e.getAttribute("data-index");
        if(i != index && animated === false && e.tagName == "LI"){
            clearTimeout(set);
            li[index].className = "";
            const x = Math.abs(index - i);
            index = i;
            li[index].className = classname;
            _window._shim.animate(image, "left", -100 * index, time, unit, ()=>{
                animated = false;
                set = setTimeout(master, ci);
            });
        }
    }

    /* 初始化 */
    const init = ()=>{
        initImage();
        initChoice();
        if(maxIndex != 0){
            set = setTimeout(master, ci);
        }
        _window._shim.on(choice, "click", ck);
    };
    init();
})(window);