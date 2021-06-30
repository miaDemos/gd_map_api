<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-06-24 11:40:14
 * @LastEditors: 王敏
 * @LastEditTime: 2021-06-30 17:17:24
-->
<template>
  <div class="demo">
    <div id="myMap" />
    <aside class="handlebar">
      <a-button
        type="danger"
        @click="handleClear"
      >
        清除画布
      </a-button>
      <p class="h3">
        点标1
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleDrawMarker(1)"
          >
            新增图标
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([markers1])"
          >
            删除图标
          </a-button>
        </li>
      </ul>
      <p class="h3">
        点标2(点击清除指定点)
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleDrawMarker(2)"
          >
            新增图标
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([markers2])"
          >
            删除图标
          </a-button>
        </li>
      </ul>
      <p class="h3">
        线1(常规画线)
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleDrawLine(1)"
          >
            新增线
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([lines1])"
          >
            删除线
          </a-button>
        </li>
      </ul>
      <p class="h3">
        线2(轨迹)
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleDrawLine(2)"
          >
            新增轨迹
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleLine(1)"
          >
            开始动画
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleLine(2)"
          >
            暂停动画
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleLine(3)"
          >
            继续动画
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleLine(4)"
          >
            停止动画
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([lines1,lines2,car])"
          >
            删除轨迹
          </a-button>
        </li>
      </ul>
      <p class="h3">
        多边形+文字+弹框
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleDrawPolygon(1)"
          >
            新增多边形+弹框
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleDrawPolygon(2)"
          >
            新增文字
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([polygons,texts,winInfo])"
          >
            删除
          </a-button>
        </li>
      </ul>
      <p class="h3">
        海量点
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleMassMarks(1)"
          >
            新增海量点
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="remove_fun([massMarks])"
          >
            删除海量点
          </a-button>
        </li>
      </ul>
      <p class="h3">
        海量点2
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleMassMarks(2)"
          >
            新增海量点
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="hadleDelMassMarks2"
          >
            删除海量点
          </a-button>
        </li>
      </ul>
      <p class="h3">
        海量线
      </p>
      <ul class="list">
        <li>
          <a-button
            type="primary"
            @click="handleMassLines"
          >
            新增海量线
          </a-button>
        </li>
        <li>
          <a-button
            type="primary"
            @click="handleDelMassLines"
          >
            删除海量线
          </a-button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import {d_markers,d_markers2,d_markers3,d_line1,d_polygons1} from './js/demo'
import pop_demo1 from '@/components/pop/pop_demo1'
import  Vue from 'vue'
export default {
  data (){
    return {
      map: null,
      mapZoom: 15,
      mapCenter: [120.029155,30.240715],

      markers1:null,//点标
      markers2:null,//点标
      lines1:null,//线
      lines2:null,//线
      path:null,//小车运动轨迹
      car:null,//车车
      polygons:null,//多边形
      texts:null,//名字框
      winInfo:null,//弹框
      massMarks:null,//海量点
      massMarks2:null,//海量点
      massLines:null,//海量线

    };
  },
  mounted(){
    this.initMap()
  },
  methods:{
    //初始化地图
    initMap(){
      var map = new AMap.Map("myMap", {
        resizeEnable: true,
        zoom: this.mapZoom,
        zoomEnable: true,
        center: this.mapCenter
      });
      map.on("click", (e) => {
        console.log(e);
      });
      this.map=map;
    },
    /**
     * 清除画布
     */
    handleClear(){
      this.map.clearMap();
    },
    remove_fun(params=[]){
      params.forEach(v=>{
        if(v){
          this.map.remove(v);
          v=null;
        }
      })
      
    },
    /**
     * 点标
     */
    handleDrawMarker(type){
      switch (type){
        case 1:
          this.drawMakers1(d_markers)
          break;
        case 2:
          this.drawMakers2(d_markers2)
          break;
      }
    },
    drawIcon(image){
      return new AMap.Icon({
          // 图标尺寸
          imageSize: new AMap.Size(40, 62),
          size: new AMap.Size(40, 62),
          // 图标的取图地址
          image,
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(0, 0),
        });
    },
    //画点标数组
    drawMakers1(arr){
      if(this.markers1) this.remove_fun([this.markers1])
      let markers=[];
      arr.forEach(v=>{
        var iconMarker = new AMap.Marker({
          icon: this.drawIcon(require("./img/icon1.png")),
          position: v.coor,
          offset: new AMap.Pixel(-20, -31),
        });
        //可对该图标增加点击事件
        AMap.event.addListener(iconMarker, "click", async () => {
          console.log('哎呀，我被点了',v)
        })
        markers.push(iconMarker);
      })
      this.map.add(markers)
      this.markers1=markers;
    },
    drawMakers2(arr){
      this.map.clearMap();
      let markers2=[];
      arr.forEach((v,i)=>{
        let marker = new AMap.Marker({
            map: this.map,
            icon: this.drawIcon(require("./img/icon2.png")),
            position: v.coor,
        });
        AMap.event.addListener(marker, "click", async () => {
          this.markers2[i].setMap(null)
        })
        markers2.push(marker)
      })
      this.markers2=markers2;
    },
    /**
     * 线
     */
    handleDrawLine(type){
      switch (type){
        case 1:
          this.drawLine1(d_line1)
          break;
        case 2:
          this.drawLine2(d_line1[0])
          break;
      }
    },
    handleLine(type){
      if(!this.car) return;
      switch(type){
        case 1:
          this.car.moveAlong(this.path, 500);
          break;
        case 2:
          this.car.pauseMove();
          break;
        case 3:
          this.car.resumeMove();
          break;
        case 4:
          this.car.stopMove();
          break;
      }
    },
    drawLine1(arr){
      this.map.clearMap();
      let lines=[];
      arr.forEach(v=>{
        var polyline = new AMap.Polyline({
          path:v.path,
          strokeColor: "#2489e9",
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 50,
          bubble: true,
        })
        //为线增加点击事件
        AMap.event.addListener(polyline, "click", async () => {
          console.log('我是线点击',v.name);
        })
        lines.push(polyline);
      })
      this.lines1=lines;
      this.map.add(lines);
    },
    drawLine2(obj){
      let map=this.map;
      map.clearMap();
      let  car = new AMap.Marker({
          map,
          position: obj.path[0],
          icon: "https://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13),
          autoRotation: true,
          angle:-90,
      });
      // 绘制轨迹
      var lines1 = new AMap.Polyline({
          map,
          path: obj.path,
          showDir:true,
          strokeColor: "blue",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
      });
      var lines2 = new AMap.Polyline({
          map,
          strokeColor: "red",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
      }); 
      this.path=obj.path
      this.car=car;
      this.lines1=lines1
      this.lines2=lines2
      car.on('moving', function (e) {
        lines2.setPath(e.passedPath);
      });
    },
    /**
     * 多边形
     */
    handleDrawPolygon(type){
      switch(type){
        case 1:
          this.drawPolygons(d_polygons1)
          break;
        case 2:
          this.drawTexts(d_polygons1);
          break;
      }
    },
    drawPolygons(arr){
      if(this.polygons) this.remove_fun([this.polygons])
      let map=this.map
      map.clearMap();
      let polygons=[];
      arr.forEach(v=>{
        var polygon = new AMap.Polygon({
          path: v.path,//设置多边形边界路径
          strokeColor: v.color, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 2,    //线宽
          fillColor: v.color, //填充色
          fillOpacity: 0.1//填充透明度
        });
        polygons.push(polygon);
        //点击多边形调用弹框===》代码在这哈
        AMap.event.addListener(polygon, 'click', ()=>{
          if(this.winInfo)  map.remove(this.winInfo);
          let  myWinInfo=this.openInfoWin(v);
          map.add(myWinInfo);
          this.winInfo=myWinInfo;
        });
      })
      map.add(polygons)
      this.polygons=polygons;

    },
    drawTexts(arr){
      if(this.texts) this.remove_fun([this.texts])
      let texts=[]
      arr.forEach(v=>{
        let text = new AMap.Text({
          text:v.name,
          anchor:'center', // 设置文本标记锚点
          cursor:'pointer',
          angle:10,
          style:{
              'text-align': 'center',
              'background-color': 'transparent',
              'border':'none',
              'font-size': '12px',
              'color': v.color,
              'transform':'rotate(-10deg)'
          },
          position: v.center
        })
        texts.push(text);
      })
      this.map.add(texts)
      this.texts=texts;
    },
    openInfoWin(val){
      let that=this;
      var MyComponent = Vue.extend(pop_demo1)
      var component = new MyComponent({
        propsData: {
          text: val.name,
          close(msg){
            console.log('lllll',msg);
            that.remove_fun([that.winInfo]);
          },
        },
      }).$mount();
      var markerInfoWindow = new AMap.Marker({
        position: val.center,
        anchor: "bottom-center",
        content: component.$el,
      });
      return markerInfoWindow;
    },
    /** 
     * 海量点
    */
    handleMassMarks(type){
      switch(type){
        case 1:
          this.drawMassMarks1(d_markers3)
          break;
        case 2:
          var data = this.createPoints(this.map.getCenter(), 5000);
          this.drawMassMarks2(data)
          break;
      }
    },
    drawMassMarks1(arr){
      if(this.massMarks) this.remove_fun([this.massMarks])
      let map=this.map;
      let style = [
        {
          url: require("./img/icon1.png"),
          anchor: new AMap.Pixel(20, 31),
          size: new AMap.Size(40, 62),
        }, 
        {
          url: require("./img/icon2.png"),
          anchor: new AMap.Pixel(20, 31),
          size: new AMap.Size(40, 62),
        }, 
        {
          url: require("./img/icon3.png"),
          anchor: new AMap.Pixel(20, 31),
          size: new AMap.Size(40, 62),
        }
      ];
      let massMarks = new AMap.MassMarks(arr, {
        zIndex: 100,  // 海量点图层叠加的顺序
        zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
        style
      });
      massMarks.on('click',e=>{
        let {name}=e.data;
        console.log('海量点被点击了',name);
      })
      massMarks.setMap(map);
      this.massMarks=massMarks;
    }, 
    drawMassMarks2(data=[]){
      let map=this.map;
      if(this.massMarks2) return this.massMarks2.setData(data)
      AMapUI.loadUI(['misc/PointSimplifier'], PointSimplifier=> {
        if (!PointSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        //创建组件实例
        var pointSimplifierIns = new PointSimplifier({
            map, //关联的map
            compareDataItem: function(a, b, aIndex, bIndex) {
                //数据源中靠后的元素优先，index大的排到前面去
                return aIndex > bIndex ? -1 : 1;
            },
            getPosition: function(dataItem) {
                //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
                return dataItem.position;
            },
            getHoverTitle: function(dataItem, idx) {
                //返回数据项的Title信息，鼠标hover时显示
                return '序号: ' + idx;
            },
            renderOptions: {
                //点的样式
                pointStyle: {
                    fillStyle: 'blue' //蓝色填充
                }
            }
        });

        //随机创建一批点，仅作示意
        var data = this.createPoints(map.getCenter(), 100000);

        //设置数据源，data需要是一个数组
        pointSimplifierIns.setData(data);

        //监听事件
        // pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
        pointSimplifierIns.on('pointClick', function(e, record) {
            console.log(e.type, record);
        });
        this.massMarks2=pointSimplifierIns;
      });
    },
    //随机制造海量点
    createPoints(center, num) {
      var data = [];
      for (var i = 0, len = num; i < len; i++) {
          data.push({
              id:i+2,
              name:'我可以写名字哈'+i,
              position: [
                  center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
                  center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
              ]
          });
      }
      return data;
    },
    hadleDelMassMarks2(){
      if(this.massMarks2) this.massMarks2.setData([])
    },
    /**
     * 海量线
     */
    handleMassLines(){
      this.drawMassLines(d_line1);
    },
    drawMassLines(data){
      let map=this.map;
      if(this.massLines) return this.massLines.setData(data)
      AMapUI.load(['ui/misc/PathSimplifier'], PathSimplifier=> {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        //创建组件实例
        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: map, //所属的地图实例
            getPath: function(pathData, ) {
                //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                return pathData.path;
            },
            getHoverTitle: function(pathData, pointIndex) {
                //返回鼠标悬停时显示的信息
                if (pointIndex >= 0) {
                    //鼠标悬停在某个轨迹节点上
                    return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                }
                //鼠标悬停在节点之间的连线上
                return pathData.name + '，点数量' + pathData.path.length;
            },
            renderOptions: {
                //轨迹线的样式
                pathLineStyle: {
                    strokeStyle: 'red',
                    lineWidth: 6,
                    dirArrowStyle: true
                }
            }
        });

        //这里构建两条简单的轨迹，仅作示例
        pathSimplifierIns.setData(data);
        //创建一个巡航器
        var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
            {
                loop: true, //循环播放
                speed: 1000
            });

        navg0.start();
        this.massLines=pathSimplifierIns
      });
    },
    handleDelMassLines(){
      if(this.massLines) this.massLines.setData([])
    },

  }
}

</script>
<style lang='less' scoped src="./css/demo.less"/> 