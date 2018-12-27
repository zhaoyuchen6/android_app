 <template>
    <div class="ambient-point">
      <!--标题栏-->
      <x-header height="8%" class="page-header" :showBack=false :left-options="{showBack:false}">
        <span>周边网点信息</span>
        <span class="icon-change header-img" slot="right"  @click="nextAction()"></span>
      </x-header>
      <div class="backTo">
        <img @click="backToIndexPage()" src="static/image/icon-fanhui黑-2.svg" v-if="!this.$store.state.showMenu">
      </div>
      <!--主体框-->
      <div class="counterMain">
        <!--地图容器-->
       <!-- <p>{{message}}</p>-->
        <div id="bank-map" v-if="mapShow"></div>
        <div class="bank-map" v-show="!mapShow"></div>
        <!--两个方格-->
        <div class="down_div">
          <!--左边方格-->
          <div class="Zdiv" v-for="(item,index) in UnitInfo" :key="index" v-bind:class="{ left_div: index == 0 }">
            <!--标题-->
            <aui-grid class="title_div">
                <div class="title_center font_div">{{item.unitname}}</div>
                <aui-grid-item class="main_border title_item">
                  <div slot="label" class="title_div_4 font_div">开柜数量：{{item.unitcounter}}</div>
                </aui-grid-item>
                <aui-grid-item class="main_border title_item">
                  <div slot="label" class="title_div_4 font_div">排队人数：{{item.queuenum}}</div>
                </aui-grid-item>
                <aui-grid-item class="main_border title_item">
                  <div slot="label" class="title_div_4">
                    <div class="title_BC theme-background-color"  >&nbsp;查看详情&nbsp;</div>
                  </div>
                </aui-grid-item>
            </aui-grid>
            <!--表格-->
            <div class="table_div">
              <aui-table class="table_vux font_div">
                <thead>
                  <tr>
                    <th>机构号</th>
                    <th>名称</th>
                    <th>电话</th>
                    <th>负责人</th>
                    <th>负责人电话</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{item.brno}}</td>
                    <td>{{item.unitname}}</td>
                    <td>{{item.cellphone}}</td>
                    <td>{{item.staf_nm}}</td>
                    <td>{{item.telephone}}</td>
                  </tr>
                </tbody>
              </aui-table>
            </div>
            <!--地址-->
            <aui-group class="main_border">
              <div class="address-box">
                <div class="box-left">
                  <div class="img-box">
                    <span class="icon-start"></span>
                  </div>
                  <div class="text-box">
                    <div  class="address-font">地址：{{item.address}}</div>
                    <div  class="address-font">(GPS坐标：43，44)</div>
                  </div>
                </div>
                <div class="box-right">
                  <div class="go-btn theme-color theme-border-color" >
                    <span class="icon-line"></span>
                    <span>我要去</span>
                  </div>
                </div>
              </div>
              <div class="bus-station">
                <p class="bus-font">附近车站：{{item.stationnearby}}</p>
              </div>
            </aui-group>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  // import monitoringJS from '../../common/api/monitoring'
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称

  import monitoringJS from '../../common/api/map-point'
  export default {
    name: 'ambient-point',
    data() {
        return {
          UnitInfo: [],
          message:'',
          map:null,
          mapShow : true,
        }
    },
    methods:{
      //返回游客主页
      backToIndexPage(){
        this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
      },

      nextAction() {
        let actionInfo = {
          nextPage: "radarMap",
          action: "next"
        };
        this.$emit("nextAction", actionInfo);
      },
      // 从后台获取消息方法
      queryDatafromAFA(){
        let vm = this;
        let submintData = {}, body = {};
        // let sessionObj = JSON.parse(sessionStorage.getItem("loginObj"));
        // if(sessionObj){
        //   body.unitid = sessionObj.branchNo;
        // }else{  // TODO  先传默认unitID  后期要实现用当前坐标计算附近的网点
        //   body.unitid = "2"
        // }
        body.unitid = "2"
        submintData.body=JSON.stringify(body);
        monitoringJS.queryBranchAround(submintData,vm, (rsp) => {
          vm.UnitInfo = rsp.UnitInfo;
        }, (err) => {
          console.log(err);
        });
      },
      // newMap(){
      //   // 创建地图对象（中心点及缩放比例等可以在初始化的时候指定）
      //   this.getBaiduLocation();//获取当前位置信息
      // },
      //获取当前位置信息
      getBaiduLocation() {
           let position='';
            // 创建地图坐标对象
            map = new BMap.Map('bank-map');
            var point = new BMap.Point(116.472736, 40.026734);
            // 创建点坐标
            map.centerAndZoom(point, 15);
            // 设置标注
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
      },

    },
    activated(){
    },
    deactivated(){

    },
    destroyed: function () {
    },
    mounted() {
      // 创建地图对象（中心点及缩放比例等可以在初始化的时候指定）
      this.getBaiduLocation()
      /*查询周边网点信息*/
      this.queryDatafromAFA();
    },
  }
</script>
<style lang="less" scoped>
  @import '../../../static/public-style/theme-blue.less';
  /*html,body{*/
    /*overflow: hidden;*/
    /*margin: 0;*/
    /*font-size: 62.5%;*/
  /*}*/
  .ambient-point{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color:#F5F4F1;
    .page-header {
      .header-img{
       color:@theme-color-font;
      }
      .header-title {
        font-size: 20px;
        font-weight: 600;
      }
      .right-font {
        font-size: 16px;
        font-weight: 600;
        vertical-align: middle;
      }
      .img_back {
        display: none;
        width: 36px;
        margin-left: 36px;
        margin-top: -6.4px;
      }
      .img_refresh {
        float: right;
        width: 36px;
        margin-right: 36px;
        margin-top: 5px;
        background-color: red;
      }
    }
      /**/
    .counterMain{
      height:92%;
      overflow-y: hidden;
      overflow-x: hidden;
      background-color: #fff;
      #bank-map {
        margin-left: 1%;
        width: 98%;
        height: 49%;
        background-color: #fff;
        border: 1px solid #dddddd;
      }
      .bank-map{
        margin-left: 1%;
        width: 98%;
        height: 49%;
        background-color: #fff;
        border: 1px solid #dddddd;
      }
       /*下div*/
      .down_div{
        width: 100%;
        height: 50%;
        background-color: #ffffff;
        .Zdiv {
          width: 49%;
          height: auto;
          display: inline-block;
          padding: 6.4px 12px 18px;
          box-sizing: border-box;
          font-size: 16px;
           /*标题*/
          .title_div {
            width: 100%;
            overflow: hidden;
            .title_center{
              text-align: center;
              padding: 6.4px;
            }
              /*字体*/
            .font_div{
              font-family: 黑体;
              color: #4c4c4c;
              font-weight: 500;
              letter-spacing: 2px !important;
              font-size: 15.36px;
            }
             .title_item{
              text-decoration:none !important;
              padding: 5px !important;
            }
            .title_div_4 {
              color: #4C4C4C;
              font-size: 12.8px;
              letter-spacing:2px;
              text-align: left !important;
            }
            .title_BC {
              font-size: 16px;
              text-align: center;
              border-radius: 2px;
              width: 124px;
              height: 30px;
              line-height: 30px;
            }
          }
          .address-box{
            border-bottom: 1px solid #ddd;
            height: 100px;
            .box-left{
              width: 65%;
              height: 80%;
              padding-top: 5%;
              float: left;
              .img-box{
                width: 10%;
                display: inline-block;
                font-size:24px;
                color:@theme-color-font;
                vertical-align: top;
              }
              .text-box{
                width: 79%;
                display: inline-block;
              }

            }
            .box-right{
              width: 24%;
              float: right;
              height: 97%;
              .go-btn{
                padding: 2px 10px;
                display: inline-block;
                width: 80%;
                margin-top: 30%;
                border-radius: 10px;
                display: inline-block;
                font-size: 18px;
                height: 28px;
                line-height: 28px;
                text-align: center;
              }
            }
            .main-start{
              width: 10%;
            }
            .icon-line{
              vertical-align: middle;
            }
            .address-font{
              letter-spacing: 2px !important;
              font-size: 16px;
            }

          }
          .bus-station{
            width: 90%;
            padding-left: 10%;
            padding-top: 15px;
            .bus-font{
              font-size: 16px;
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
  .main_border{
    /deep/.aui-cells{
      margin-top:0;
    }
  }
  /*去边框*/
  .main_border:before,.main_border:after{
    border: none !important;
    z-index: -1 !important;
  }

  /*地图*/
  .XSDFXPage{
    width: 100%;
    height: 47%;
    overflow: hidden;
    margin: 0;
  }


  .left_div{
    border-right: 1px solid #ddd;
  }





  /*表格*/
  .table_div {
    padding: 20.48px 1.51.2px 0px;
  }

  .table_vux {
    font-size: 11.52px;
    border: 1px solid #f5f4f1 !important;
  }
  table {
    /*table-layout: fixed;*/
  }
  td {
    width: 70.4px;
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // -webkit-line-clamp: 2;
  }
  .backTo{
    display: inline-block;
    float: left;
    margin-top: -38px;
    width: 34px;
    height:34px;
    box-sizing: border-box;
    padding:5px;
    margin-left: 30px;
    img{
      width:100%;
      height:100%;
    }
  }
</style>

