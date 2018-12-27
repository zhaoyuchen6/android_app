<template>
    <p class="event-item" :class="cssClasses" @click="$emit('click', event, $event)">
        <span v-show="showTitle">{{ event.cusName}} {{event.cusType  | custType}} {{event.cusTypeInfo | custInfoType}}</span>
    </p>
</template>

<script>
    import moment from 'moment'

    export default {
        props: ['event', 'date', 'firstDay'],
        computed: {
            cssClasses () {
                let cssClasses = this.event.cssClass;

                if (!Array.isArray(cssClasses)) {
                    cssClasses = [cssClasses];
                } else {
                    cssClasses = Array.from(cssClasses);
                }

                if (this.start.isSame(this.date, 'day')) {
                    cssClasses.push('is-start');
                }

                if (this.end.isSame(this.date, 'day')) {
                    cssClasses.push('is-end');
                }

                if (! this.event.isShow) {
                    cssClasses.push('is-opacity');
                }

                return cssClasses.join(' ');
            },
            showTitle() {
                return (this.date.day() == this.firstDay || this.start.isSame(this.date, 'day'));
            },
            start () {
                return moment(this.event.start);
            },
            end () {
                return moment(this.event.end);
            }
        },
        filters :{
      custType: function (value) {
        let MakSta='';
        if(value=='1'){
          return '对公客户'
        }else if(value=='2'){
          return '个人客户'
        }else if(value=='3'){
          return 'VIP客户'
        }else if(value=='4'){
          return 'VIP客户'
        }
        return MakSta;
      },
      custInfoType: function (value) {
        let MakSta='';
        if(value=='1'){
          return '对公业务'
        }else if(value=='2'){
          return '个人业务'
        }else if(value=='3'){
          return '贷款业务'
        }else if(value=='4'){
          return '理财'
        }
        return MakSta;
      }
    },
    }
</script>