## 高德地图api调用说明

> gitlab地址：

> 参考文档：https://lbs.amap.com/api/javascript-api/reference/core

> 示例中心：https://lbs.amap.com/demo/jsapi-v2/example/map-lifecycle/map-show

#### 地图初始化

~~~js
//body全局引入
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=你的key填下哈&plugin=Map3D,AMap.ControlBar,AMap.MouseTool"></script>
//页面初始化容器
initMap(){
    var map = new AMap.Map("myMap", {
        resizeEnable: true,
        zoom: this.mapZoom,
        zoomEnable: true,
        center: this.mapCenter
    });
}
~~~

#### 清除画布

1. 全部清除(海量点、线清不掉)

   ~~~js
   handleClear(){
       this.map.clearMap();
   }
   ~~~

2. 部分清除(海量点、线清不掉)

   - 部分清除

     可用this.map.remove清除，当多个可采用如下方式(调用this.remove_fun[...,...,...])：

     ~~~js
     remove_fun(params=[]){
         params.forEach(v=>{
             if(v){
                 this.map.remove(v);
                 v=null;
             }
         })
     },
     ~~~

   - 海量点、线清除

#### 点标 

封装自定义图标

~~~js
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
}
~~~

1. 法一

   - 添加

     ~~~js
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
     ~~~

   - 清除

     ~~~js
     this.remove_fun([this.markers1])
     ~~~

2. 法二（点击清除指定点）

   - 添加

     ~~~js
     drawMakers2(arr){
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
     ~~~

#### 线

1. 法一（常规线）

   - 新增

     ~~~js
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
     ~~~

   - 清除

     ~~~js
     this.remove_fun([this.lines1])
     ~~~

2. 法二（轨迹）

   - 新增

     ~~~js
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
     }
     ~~~

   - 操作（开始、暂停、继续、停止动画）

     ~~~js
     handleLine(type){
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
     }
     ~~~
     
   - 清除

     ```html
     <a-button
               type="primary"
               @click="remove_fun([lines1,lines2,car])"
               >
         删除轨迹
     </a-button>
     ```

#### 多边形

- 新增多边形

  ```js
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
      })
      map.add(polygons)
      this.polygons=polygons;
  }
  ```

- 新增文字

  ~~~js
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
  }
  ~~~

- 清除

  ~~~js
  @click="remove_fun([polygons,texts])"
  ~~~

#### 弹框

- 弹框新建（在多边形上加弹框为例，其他的同理）

  - 封装弹框子组件

    ~~~js
    <!--
     * @Description: 
     * @Version: 2.0
     * @Autor: 王敏
     * @Date: 2021-06-29 16:50:40
     * @LastEditors: 王敏
     * @LastEditTime: 2021-06-29 19:21:19
    -->
    <template>
      <div class="bg">
        {{ text }}
        <a-button
          type="primary"
          @click="close(true)"
        >
          关闭
        </a-button>
      </div>
    </template>
    
    <script>
    export default {
      props:{
        text:{
          type:String,
          default(){return ''}
        },
        close:{
          type:Function
        }
      },
      data (){
        return {
        };
      },
      mounted(){},
      methods:{},
    }
    
    </script>
    <style lang='less' scoped>
      .bg{
        width: 200px;
        background: rgba(0,0,0,.5);
        padding:20px;
      }
    </style>
    ~~~

  - 父组件调用子组件，并通过marker挂到map上

    ~~~js
    //先引入
    import pop_demo1 from '@/components/pop/pop_demo1'
    
    //封装方法调用(eg：点击多边形调用弹框)
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
                let  myWinInfo=this.openInfoWin(v);
                if(this.winInfo)  map.remove(this.winInfo);
                map.add(myWinInfo);
                this.winInfo=myWinInfo;
            });
        })
        map.add(polygons)
        this.polygons=polygons;
    }
    
    //弹框调用封装(propsData可以传参，接收回执可以写回调的方式实现)
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
    }
    ~~~

- 弹框清除

  ~~~js
  this.remove_fun([this.winInfo]);
  ~~~

#### 海量点

- 法一：new AMap.MassMarks

  > 当需要在地图展示数量为十万以内的点并且需要较好的性能表现时，可以使用 AMap.MassMarks 类。

  > 示例:https://lbs.amap.com/demo/javascript-api/example/marker/massmarks

- - 新增

  ~~~js
  //传参格式
  let data=[
    {
      id:1,
      name:'印象城',
      lnglat:[120.049675,30.247286],//经纬度要用这个字段，别个要求的哈
      detail:'海底捞入驻啦，吼吼~',
      style: 0 ,//样式 0 1 2后面配置相应的格式（图标）
    },
    ... 
  ]    
  //调用
  drawMassMarks(arr){
      if(this.massMarks) this.remove_fun([this.massMarks])
      let map=this.map;
      // if(this.massMarks)
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
          zIndex: 555,  // 海量点图层叠加的顺序
          zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
          style
      });
      massMarks.on('click',e=>{
          let {name}=e.data;
          console.log('海量点被点击了',name);
      })
      massMarks.setMap(map);
      this.massMarks=massMarks;
  }
  ~~~

  - 删除

  ~~~js
  <a-button
  type="primary"
  @click="remove_fun([massMarks])"
  >
      删除海量点
  </a-button>
  ~~~


- 法二：PointSimplifier（模块名：`ui/misc/PointSimplifier`）

  > 注：`ui/misc/PointSimplifier`展示的时候，地图容器viewMode不能使用'3D'，因为3D会有偏转，经纬度不准确，如果用3D视图就会报错;

  >100万规模海量点，PointSimplifier目前依赖Canvas进行绘制，因此不支持IE9及以下浏览器。

  > 示例：https://lbs.amap.com/api/amap-ui/reference-amap-ui/mass-data/pointsimplifier

  > 扒文档：https://lbs.amap.com/api/amap-ui/reference-amap-ui/mass-data/pointsimplifier

  - 新增

    - 引入样式

      ~~~js
        <!-- UI组件库 1.0 -->
          <script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script>
      ~~~

    - 上代码

      ~~~js
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
      ~~~

  - 删除

    ~~~js
    if(this.massMarks2) this.massMarks2.setData([])
    ~~~

    

#### 海量线(轨迹)

> PathSimplifier目前依赖Canvas进行绘制，因此不支持IE9及以下浏览器

> 示例：https://lbs.amap.com/demo/amap-ui/demos/amap-ui-pathsimplifier/index

> 扒文档：https://lbs.amap.com/api/amap-ui/reference-amap-ui/mass-data/pathsimplifier

- 新增

  - 引入样式

    ~~~js
     <!-- UI组件库 1.0 -->
        <script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1">
    ~~~

  - 上代码

    ~~~js
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
                    getPath: function(pathData, pathIndex) {
                        //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                        return pathData.path;
                    },
                    getHoverTitle: function(pathData, pathIndex, pointIndex) {
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
    ~~~

    

- 删除

~~~JS
if(this.massLines) this.massLines.setData([])
~~~

