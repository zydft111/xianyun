<template>
  <div class="hotel-map">
    <div class="hotel-crumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏目 -->
    <el-row class="search-form" type="flex">
      <el-input class="input-left" placeholder="切换城市"></el-input>
      <el-input placeholder="入住日期" prefix-icon="el-icon-date" class="input-datal"></el-input>
      <span>-</span>
       <el-input placeholder="离店日期" class="input-datar" ></el-input>
      <el-input suffix-icon="el-icon-user" v-model="input6" placeholder="人数未定" class="input-number"></el-input>
      <el-button type="primary" class="button">查看价格</el-button>
    </el-row>
    <!-- 地图展示 -->
    <div class="mapdetail">
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=af3c296d4ff1de2b7946a3d6b8804f3a&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    window.onLoad = function() {
      //加载地图的容器
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        resizeEnable: true
      });

      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          // 创建一个 Marker 实例：
          var marker = new AMap.Marker({
            position: new AMap.LngLat(data.position.lng, data.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: data.formattedAddress
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
        }

        function onError(data) {
          // 定位出错
        }
      });
    };
  }
};
</script>

<style lang="less" scoped>
/deep/.input-datal {
   border-right: none;
   margin-right: -10px;
}
/deep/.input-datal {
   border-left: none;
}
.button {
    height: 40px;
    margin-top: 10px;
    margin-right: 100px;
    line-height: 17px;
}
.hotel-map {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
#container {
  width: 500px;
  height: 500px;
}
.search-form {
  height: 60px;
  line-height: 60px;
  margin: 10px 0;
  input {
    outline: none;
  }
}

.input-left {
  margin-right: 10px;
}
.input-number {
  margin-left: 5px;
  margin-right: 10px;
}
</style>