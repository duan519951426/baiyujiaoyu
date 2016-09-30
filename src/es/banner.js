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
        speed = 2,
        unit = "%";
    let index = 0;

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
    };

    /* 初始化 */
    const init = ()=>{
        initImage();
        initChoice();
    };
    init();
})(window);