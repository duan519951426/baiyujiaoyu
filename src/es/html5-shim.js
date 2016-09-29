/**
 * ie7、ie8兼容html5新标签
 */
(()=>{
    let e = ["article", "aside", "audio", "canvas", "datalist", "details", "dialog", "eventsource", "figure", "figcaption",
            "footer", "header", "hgroup", "mark", "menu", "meter", "nav", "output", "progress", "section", "time", "video"],
        i = e.length;
    while(i--){
        document.createElement(e[i]);
    }
    document.write("<style> article, aside, dialog, footer, header, section, nav, figure, figcaption, menu {display:block} </style>");
})();