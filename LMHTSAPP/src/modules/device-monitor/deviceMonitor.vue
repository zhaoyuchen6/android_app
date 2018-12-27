<template>
  <div class="device-monitor">
    <div class="content">
        <p class="title">自助机</p>
        <aui-flexbox :gutter="0">
          <aui-flexbox-item v-for="(item,index) in VTMList" :key="index">
            <div class="vtm-box" @click="item.isChecked=!item.isChecked;showMore(index,item.isChecked)">
              <div class="vtmImg">
              <img :src="'static/image/deviceMonitor/card/'+item.img" class="bg-img">
              </div>
              <transition name="show">
                <img src="static/image/deviceMonitor/triangle.png" class="checked-icon" v-show="item.isChecked">
              </transition>
            </div>
          </aui-flexbox-item>
        </aui-flexbox>
      <transition name="fade">
        <div v-show="ifChecked" >
          <aui-swiper :show-dots="false"  v-model="itemActive" class="set-swiper">
            <aui-swiper-item v-for="(item,vtmIndex) in VTMList" :key="index">
              <div class="card-list">
                <div class="vtmType" v-if="vtmIndex!=1">
                  <span><i>aa</i>网络状态正常</span>
                  <span><i>aa</i>卡箱状态正常</span>
                  <span><i>aa</i>钞箱状态正常</span>
                </div>
                <div class="vtmTypee" v-if="vtmIndex==1">
                  <span><i>aa</i>钞箱状态异常</span>
                  <span><i>aa</i>钞箱状态异常</span>
                  <span><i>aa</i>钞箱状态异常</span>
                </div>
                <i class="fa fa-chevron-left set-icon-left"></i>
                <i class="fa fa-chevron-right set-icon-right"></i>
                <aui-flexbox :gutter="0">
                  <aui-flexbox-item v-for="(card,index) in cardList" :key="index">
                    <div class="card-list-box">
                      <img :src="'static/image/deviceMonitor/card/'+card.img" class="set-card">
                      <div class="card-info">
                        <p>{{card.name}}</p>
                        <p v-if="vtmIndex!=1">卡数量：<span class="card-num">{{card.num}}张</span></p>
                        <p v-if="vtmIndex==1">卡数量：<span class="card-num">0 张</span></p>
                      </div>
                    </div>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>

            </aui-swiper-item>
          </aui-swiper>
        </div>
      </transition>
      <div class="pad-box">
          <p class="title">PAD</p>
          <aui-flexbox :gutter="0">
            <aui-flexbox-item v-for="(pad,index) in padList" :key="index">
              <p class="pad-name">{{pad.padName}}</p>
              <div class="pad-style" style="background-image:url(static/image/deviceMonitor/pad.png)">
                <p class="pad-state">{{pad.isOut?"外出":"网点"}}</p>
                <p class="user">
                  <i class="fa fa-user set-icon-user"></i>{{pad.userName}}
                </p>
              </div>
            </aui-flexbox-item>
          </aui-flexbox>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "device-monitor",
        data(){
          return {
            test:0,
            VTMList:[
              { img:"vtm1.png",isChecked:false},
              { img:"vtm2.png",isChecked:false},
              { img:"vtm3.png",isChecked:false},
            ],
            cardList:[
              { name:"江南龙城卡", img:"card1.jpg",num:"15"},
              { name:"江南财缘借记卡", img:"card2.jpg",num:"20"},
              { name:"工会服务卡", img:"card3.jpg",num:"20"},
              { name:"江南社保卡", img:"card4.png",num:"10"},
            ],
            padList:[
              { isOut:true,userName:"欧阳莉莉",padName:"PAD1" },
              { isOut:false,userName:"范本本",padName:"PAD2" },
              { isOut:false,userName:"章坑坑",padName:"PAD3" },
              { isOut:false,userName:"王炸炸",padName:"PAD4" },
              { isOut:false,userName:"刘明明",padName:"PAD5" }
            ]
          }
        },
       computed: {
       /*   VTMList:{
            get(){
              return this.$store.state.VTMList;
            },
            set(newValue){
              this.$store.commit('setVTMList',newValue);
            }
          },*/
         // 是否显示card-list框
         ifChecked() {
           let list = this.VTMList;
           let result = list.some(function (val, index) {
             return val.isChecked === true;
           });
           return result;
         },
         //当前选中的VTM机编号
         itemActive:{
           get(){
             let list=this.VTMList;
             let index;
             if(this.ifChecked){
               for(var i=list.length;i--;){
                 if(list[i].isChecked===true){
                   index=i;
                 }
               }
             }else{
               index=-1
             }
             return index;
           },
           set(newValue){
            let list=this.VTMList;
            let index=newValue;
            if(index===-1){
              return
            }else{
              for(var i=list.length;i--;){
                if(i!==index){
                  list[i].isChecked=false;
                }else{
                  list[i].isChecked=true;
                }
              }
            }
           }
         }
       },
       methods:{
          //点击VTM机图标时，选中项三角唯一
          showMore(index,para){
            let list=this.VTMList;
            let key=index;
            let isChecked=para;
            list.forEach(function(val,index){
               if(isChecked&&(index!==key)){
                 list[index].isChecked=false;
               }
            });
          }
        }
    }
</script>

<style scoped lang="less">
  .device-monitor{
    height:calc(~"100% - "20px);
    overflow-y: hidden;
    font-size:22px;
    .head{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #F5F4F1;
      box-sizing: border-box;
      font-size:16px;
      .icon{
        width:26px;
        height:26px;
        vertical-align: middle;
        margin:0 10px;
      }
    }
    .content{
      height:644px;
      overflow-y: auto;
      .title{
       margin-left: 20px;
        margin-top: 10px;
        width: 80px;
        font-size:16/px;
        color: #c49a4b;
      }
      .vtm-box{
        width:163px;
        height:250px;
        position: relative;
        margin:0 auto;
        .vtmImg {
          height: 250px;
          width: 200px;
          .bg-img {
            width: 100%;
            height: 100%;
          }
        }
        .checked-icon{
          width:30px;
          height:24px;
          position:absolute;
          bottom:-23px;
          left:50%;
          transform: translateX(-50%);
        }
      }
      .set-swiper{
        /deep/.aui-swiper{
          height:260px!important;
        }
      }
      .card-list{
        margin-top:24px;
        height:260px;
        padding:20px 50px;
        box-sizing: border-box;
        background-color:#F1E3C9;
        position:relative;
        .vtmType{
          margin-top: -15px;
          height: 45px;
          width: 100%;
          border-bottom:1px solid #969084;
          span{
            font-size: 16px;
            margin-left: 15%;
            i{
              margin-right: 5px;
              height: 20px;
              width: 20px;
              background-color: #0BB20C;
              color: #0BB20C;
              border-radius:50%;

            }
          }

        }
        .vtmTypee{
          margin-top: -15px;
          height: 45px;
          width: 100%;
          border-bottom:1px solid #969084;
          span{
            font-size: 16px;
            margin-left: 15%;
            color: #ff1815;
            i{
              margin-right: 5px;
              height: 20px;
              width: 20px;
              background-color: #ff1815;
              color: #ff1815;
              border-radius:50%;

            }
          }

        }
        .set-icon{
         font-size:24px;
         color:#969084;
         top:50%;
         position: absolute;
         transform: translateY(-50%);
        }
        .set-icon-left{
          .set-icon;
          left:20px;
        }
        .set-icon-right{
          .set-icon;
          right:20px;
        }
        .set-card{
          margin-top: 10px;
          width:160px;
          height:100px;
        }
        .card-list-box{
          padding:0 15px;
          .card-info{
            font-size:16px;
            .card-num{
              color:#CA261E;
              font-size: 16px;
            }
          }
        }
      }
      .pad-box{
        margin-top:25px;
        border-top:5px solid #F5F4F1;
        padding-bottom:10px;
        color:#4C4C4C;
        .pad-style{
          width:134px;
          height:180px;
          background-size:134px 180px;
          position: relative;
          margin:0 auto;
          .pad-state{
            color: #c49a4b;
            position: absolute;
            text-align: center;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
          }
          .user{
            position: absolute;
            top: 30px;
            left:50%;
            transform: translateX(-50%);
            white-space: nowrap;
            font-size:18px;
            .set-icon-user{
              color:#4C4C4C;
              font-size:18px;
              margin-right:6px;
            }
          }
        }
        .pad-name{
          text-align: center;
          font-size:18px;
          padding:10px;
        }
      }
    }
  }
  /*动画效果*/
  //card-list动效
  .fade-enter-active{
    animation:fade-in .5s;
  }
  .fade-leave-active{
    animation:fade-out .5s;
  }
  @keyframes fade-in {
    from{
      opacity:0;
      transform:translateY(-20px);
    }
    to{
      opacity: 1;
      transform:translateY(0);
    }
  }
  @keyframes fade-out{
    from{
      opacity:1;
      transform:translateY(0);
    }
    to{
      opacity: 0;
      transform:translateY(-20px);
    }
  }
  //三角动效
  .show-enter-active, .show-leave-active {
    transition: opacity .5s;
  }
  .show-enter, .show-leave-to{
    opacity: 0;
  }

</style>
