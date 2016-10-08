/**
 * 百度地图接口
 */

(()=>{
    // 设置相关信息
    const config = {
        point: {
            x: 123.415579,
            y: 41.865785
        },
        level: 19,
        city: "沈阳"
    };

    // 初始化百度地图
    const map = new BMap.Map("baidumaps");
    const point = new BMap.Point(config.point.x, config.point.y);
    map.centerAndZoom(point, config.level);

    // 控件
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity(config.city);
    map.enableScrollWheelZoom(true);

    // 地图显示
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
    marker.disableDragging();
})();
