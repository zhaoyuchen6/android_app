<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth" class="full-header" >

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <div class="full-calendar-body">
      <div class="weeks">
        <strong class="week" v-for="dayIndex in 7" :key="dayIndex">{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div class="dates" ref="dates">
        <!-- day -->
        <div class="dates-bg">
          <day-card :week="week" :week-end="weekEnd" v-for="(week,index) in currentDates" :key="index"></day-card>
        </div>

        <!-- absolute so we can make dynamic td -->
        <div class="dates-events">
          <div class="events-week" v-for="(week,index) in currentDates" :key="index">
            <div class="events-day" v-for="(day,index) in week" :key="index" track-by="$index"
                 :class="{'today': day.isToday, 'not-cur-month': !day.isCurMonth}"
                 @click.stop="selectThisDay(day, $event)">
              <!--@click="dayClick(day.date, $event)" -->
              <p class="day-number">{{day.monthDay}}</p>
              <div class="event-box" >
                <event-card :event="event" :date="day.date" :firstDay="firstDay" v-for="(event,index) in day.events" :key="index" v-show="event.cellIndex <= eventLimit" >
                  <template slot-scope="p">
                    <slot name="fc-event-card" :event="p.event"></slot>
                  </template>
                </event-card>
                <p v-if="day.events.length > eventLimit"
                   class="more-link" >
                  + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
                </p>
              </div>
            </div>
          </div>
        </div>
        <slot name="body-card">

        </slot>

      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  // import langSets from './dataMap/langSets'
  import moment from 'moment';
  import _ from 'lodash';
  import dateFunc from './components/dateFunc'
  import EventCard from './components/eventCard.vue';
  import DayCard from './components/dayCard.vue';
  import MyDialog from '../../../components/my-dialog'
  import Header from './components/header'
//  import { TransferDomDirective as TransferDom} from 'aui'

  export default {
    name:"full-Calendar",
    props : {
      events : { // events will be displayed on calendar
        type : Array,
        default: function () {
          return []
        }
      },
      locale : {
        type : String,
        default : 'zh'
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val);
          return res >= 0 && res <= 6
        },
        default : 0
      },
      weekEnd: {
        type: Array,
        default: function () {
          return []
        }
      },
      daysExtend: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    components : {
      'day-card': DayCard,
      'event-card': EventCard,
      'fc-header' : Header,
      'MyDialog': MyDialog,
    },
    mounted () {
      this.emitChangeMonth(this.currentMonth);
      console.log("this.currentMonth",this.currentMonth);
    },
    data () {
      return {
        currentMonth : moment().startOf('month'),
        isLismit : true,
        eventLimit : 3,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        show : false,
        data: "",
        cardList :{}
      }
    },
    computed: {
      currentDates () {
        return this.getCalendar()
      }
    },
    methods : {
      emitChangeMonth (firstDayOfMonth) {
        this.currentMonth = firstDayOfMonth;
        let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
        let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);
        this.$emit('changeMonth', start, end, firstDayOfMonth)
      },
      moreTitle (date) {
        if (!date) return '';
        return moment(date).format('ll');
      },
      getCalendar () {
        // calculate 2d-array of each month
        let monthViewStartDate = dateFunc.getMonthViewStartDate(this.currentMonth, this.firstDay);
        let calendar = [];

        for(let perWeek = 0 ; perWeek < 5 ; perWeek++) {
          let week = [];

          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            let cssClass;
            const extend = _.find(this.daysExtend, day => monthViewStartDate.isSame(day.date, 'day'));
            if (extend) {
             cssClass = extend.cssClass;
            }
            week.push({
              monthDay : monthViewStartDate.date(),
              isToday : monthViewStartDate.isSame(moment(), 'day'),
              isCurMonth : monthViewStartDate.isSame(this.currentMonth, 'month'),
              weekDay : perDay,
              date : moment(monthViewStartDate),
              events : this.slotEvents(monthViewStartDate),
              cssClass: cssClass,
            });
            monthViewStartDate.add(1, 'day');
          }
          calendar.push(week);
        }

        return calendar;
      },
      slotEvents (date) {

        // find all events start from this date
        let cellIndexArr = [];
        let thisDayEvents = this.events.filter(day => {
          let st = moment(day.start);
          let ed = moment(day.end ? day.end : st);

          return date.isBetween(st, ed, null, '[]');
        });

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1;
          if (!b.cellIndex) return -1;
          return a.cellIndex - b.cellIndex
        });

        // mark cellIndex and place holder
        for (let i = 0;i < thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1);
          thisDayEvents[i].isShow = true;
          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue;
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : date.format(),
            end : date.format(),
            isShow : false
          })
        }

        return thisDayEvents
      },
      selectThisDay (day, jsEvent) {
        this.selectDay = day;
        this.morePos = this.computePos(event.target);
        this.morePos.top -= 100;
        let events = day.events.filter(item =>{
          return item.isShow == true
        });
        this.$emit('moreClick', day.date, events, jsEvent)
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect();
        let pageRect = this.$refs.dates.getBoundingClientRect();
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
//        console.log('dayClick',day, jsEvent);
        //wangzhe
        this.showMore = true;
        this.data = day._d.toLocaleDateString();
        this.$emit('dayClick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        console.log('eventClick',event,jsEvent);
        if (!event.isShow) return;
        jsEvent.stopPropagation();
        let pos = this.computePos(jsEvent.target);
        this.$emit('eventClick', event, jsEvent, pos);
      },
    },
    filters: {
      localeWeekDay (weekday, firstDay, locale) {
        firstDay = parseInt(firstDay);
        const localMoment = moment().locale(locale);
        return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
      }
    },
    deactivated(){
      this.showMore = false;
    },
  }

</script>
<style lang="less">
  @r:12.8;
  .comp-full-calendar {
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding:0  19.2px;
    background: #fff;
    max-width: 1152.0px;
    margin: 0 auto;
    ul,
    p {
      margin: 0;
      padding: 0;
    }
    .full-header{
      height:38.4px;
      margin-top: -12.8px;
      font-size: 19.2px;
    }
  }
  .card-box{
    width: 100%;
    height: 100%;
    /*box-shadow: 5px 5px 5px #C7C7C7;*/
    background-color: #fff;
    overflow-y: auto;
    .more-header{
      height: 32.0px;
      line-height: 32.0px;
      font-size: 15.36px;
      padding: 0 5%;
      background-color: rgba(181,156,107,.1);
      .more_title{
        line-height: 32.0px;
        font-size: 15.36px;
        text-align: center;
        font-weight: 800;
      }
      .close{
        float: right;
        font-size: 19.2px;
      }
    }
    .more-body{
      overflow-y: scroll;
      max-height: 320.0px;
      .body-item{
        height: 32.0px;
        line-height: 32.0px;
        font-size: 15.36px;
        border-bottom: 1px dotted #e5e5e5;
      }
    }
  }
  .full-calendar-body {
    .weeks {
      display: flex;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      border-left: 1px solid #e0e0e0;
      .week {
        flex: 1;
        text-align: center;
        border-right: 1px solid #e0e0e0;
      }
    }
    .dates {
      position: relative;
      .dates-events {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        .events-week {
          display: flex;
          height: 128px;
          .events-day {
            cursor: pointer;
            flex: 1;
            min-height: 128px;
            height: 128px;
            overflow: hidden;
            text-overflow: ellipsis;
            .day-number {
              text-align: right;
              padding: 0.38.4px;
              opacity: 0;
            }
            &.not-cur-month {
              .day-number {
                color: rgba(0, 0, 0, .24);
              }
            }
            .event-box {
              .event-item {
                cursor: pointer;
                font-size: 12.8px;
                background-color: #C7E6FD;
                margin-bottom: 2/@r+rem;
                color: rgba(0, 0, 0, .87);
                padding:2.56px 0;
                height: 15.36px;
                line-height: 19.2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &.is-start {
                  margin-left: 0.38.4px; // border-top-left-radius: 0.38.4px;
                  // border-bottom-left-radius: 0.38.4px;
                }
                &.is-end {
                  margin-right: 0.38.4px; // border-top-right-radius:0.38.4px;
                  // border-bottom-right-radius:0.38.4px;
                }
                &.is-opacity {
                  opacity: 0;
                }
              }
              .more-link {
                cursor: pointer; // text-align: right;
                padding-left: 7.68px;
                padding-right: 1.92px;
                color: rgba(0, 0, 0, .38);
                font-size: 1.12.8px;
              }
            }
          }
        }
      }
      .more-events {
        position: absolute;
        width: 153.6px;
        z-index: 2;
        border: 1px solid #eee;
        box-shadow: 0 2px 6/@r+rem rgba(0, 0, 0, .15);
        .more-header {
          background-color: #eee;
          padding: 5.12px;
          display: flex;
          align-items: center;
          font-size: 1.12.8px;
          .title {
            flex: 1;
          }
          .close {
            margin-right: 2/@r+rem;
            cursor: pointer;
            font-size: 1.38.4px;
          }
        }
        .more-body {
          height: 119.2px;
          overflow: hidden;
          .body-list {
            height: 11.38.4px;
            padding: 5/@r+rem;
            overflow: auto;
            background-color: #fff;
            .body-item {
              cursor: pointer;
              font-size: 12.8px;
              background-color: #C7E6FD;
              margin-bottom: 2/@r+rem;
              color: rgba(0, 0, 0, .87);
              padding: 0 0 0 4/@r+rem;
              height: 17.92px;
              line-height: 17.92px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>

