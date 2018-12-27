<template>
    <div class="monitoring-info">
        <div>
          <x-header class="page-header" :left-options="{showBack:false}" :showBack=false>
            <span class="header-span">监控信息</span>
          </x-header>
            <div>
                <aui-tab v-model="monInfoIndex" :line-width="3" :scroll-threshold="3" custom-bar-width="80%"
                         active-color="#00AAFF">
                    <aui-tab-item selected @item-click="clickTabItem" class="tab-span">排队监控</aui-tab-item>
                    <aui-tab-item @item-click="clickTabItem" class="tab-span">柜面监控</aui-tab-item>
                    <aui-tab-item @item-click="clickTabItem" class="tab-span">设备监控</aui-tab-item>
                </aui-tab>
                <aui-swiper v-model="monInfoIndex" class="swiper-height" :show-dots="false">
                    <aui-swiper-item>
                        <div v-if="this.monInfoIndex==0">
                           <queue-monitoring></queue-monitoring>
                        </div>
                    </aui-swiper-item>
                    <aui-swiper-item>
                        <div v-if="this.monInfoIndex==1"><counter-monitoring></counter-monitoring></div>

                    </aui-swiper-item>
                    <aui-swiper-item>
                        <div v-if="this.monInfoIndex==2"><device-monitoring></device-monitoring></div>
                    </aui-swiper-item>
                </aui-swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import queueMonitoring from "@/modules/queue-monitoring/queueMonitoring.vue"
    import counterMonitoring from "@/modules/counter-monitoring/counterMonitoring.vue"
    import deviceMonitoring from "@/modules/device-monitor/deviceMonitor.vue"
    export default {
        name: "monitoring-info",
        components: {
            queueMonitoring,
            counterMonitoring,
            deviceMonitoring
        },

        data() {
            return {
                monInfoIndex: 0,     //  tab
            };
        },
        watch: {
            monInfoIndex(){
                if (this.monInfoIndex == 0) {
                    console.log("排队监控")
                } else if (this.monInfoIndex == 1) {
                    console.log("柜面监控")
                } else {
                    console.log("设备监控")
                }
            }
        },
        methods: {
            clickTabItem(index) {
                this.monInfoIndex = index;
                console.log(this.monInfoIndex)
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../static/public-style/theme-blue.less";

    .tab-span {
        color: @theme-color;
        font-size: 16px;
    }

    .swiper-height {
        height: 700px;
        /deep/ .aui-swiper {
            height: 100% !important;
            .aui-swiper-item {
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
            }
        }
    }

</style>
