<!-- 
  大号日历组件
-->
<template>
  <div class="xui-calender-container" v-loading="loading">
    <div class="xui-calender-head">
      <span class="xui-head-tab" v-for="item in weekArr" :key="item">
        {{ item }}
      </span>
    </div>
    <div class="xui-calender-body">
      <!-- 用3个数组来分别渲染日历(前月, 当月, 下月) -->
      <calender-item
        v-for="(item, index) in prevMonth"
        extralClass="prev-month"
        :key="item.day + Math.random()"
        :item="item"
        :index="index"
        @openDetailProject="handleGetDetail"
      />
      <calender-item
        v-for="(item, index) in currentMonth"
        extralClass=""
        :key="item.day + Math.random()"
        :item="item"
        :index="index"
        @openDetailProject="handleGetDetail"
      />
      <calender-item
        v-for="(item, index) in nextMonth"
        extralClass="next-month"
        :key="item.day + Math.random()"
        :item="item"
        :index="index"
        @openDetailProject="handleGetDetail"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import calenderItem from "./calenderItem.vue";

export default {
  name: "calender",
  data() {
    return {
      isShowDetailProject: false,
      weekArr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      prevMonth: [],
      currentMonth: [],
      nextMonth: [],
      id: "",
      loading: false
    };
  },
  props: ["currentDate", "currentList", "isGetCalData"],
  watch: {
    isGetCalData() {
      if (this.isGetCalData) {
        this.renderCalender();
      }
      this.$parent.isGetCalData = false;
    }
  },
  methods: {
    async renderCalender() {
      // 后端返回有项目的数据, 我来进行匹配, 需要传开始日期和结束日期
      let dateObj = this.getStartAndEnd(this.currentDate);
      // get date
      let r = {};
      try {
        this.loading = true;
        r = await this.getProject(dateObj);
        this.loading = false;
        if (r.code != 0) {
          this.$message.error(r.msg);
          return;
        }
      } catch (error) {
        console.log(error);
      }
      // render calender
      this.calcDate(r.data, dateObj);
    },
    handleFold(item, type, bool) {
      this.lastMonthObj[item.day] = bool;
    },
    handleGetDetail(item) {
      this.isShowDetailProject = true;
      this.id = item.id;
    },
    zeroFill(e) {
      return e < 10 ? "0" + e : e;
    },
    getStartAndEnd(currentTime) {
      let d = new Date(currentTime);
      let yyyy = d.getFullYear();
      let mm = this.zeroFill(d.getMonth() + 1);
      let dd = this.zeroFill(d.getDate());
      let start = d.getDay();
      // 获取当月数量
      let total = new Date(yyyy, mm, 0).getDate();

      // 前一个月份的长度
      let inx = mm - 1 <= 0 ? -1 : mm - 2;
      let prev = d.setMonth(inx);
      let pDate = new Date(prev);
      // 获取上一个月的数量
      let prevTotal = new Date(
        pDate.getFullYear(),
        pDate.getMonth() + 1,
        0
      ).getDate();
      let pYyyy = this.zeroFill(pDate.getFullYear());
      let pMm = this.zeroFill(pDate.getMonth() + 1);
      let pDd = this.zeroFill(prevTotal - start + 1);

      // 给后端传开始, 结束日期, 调接口展示日历数据
      let startTime = "";
      if (start == 0) {
        startTime = `${yyyy}-${mm}-${dd}`;
      } else {
        startTime = `${pYyyy}-${pMm}-${pDd}`;
      }
      let next = d.setMonth(mm - 0 + 1);
      let nDate = new Date(next);
      let nYyyy = nDate.getFullYear();
      let nMm = this.zeroFill(nDate.getMonth());
      let endTime = `${nYyyy}-${nMm}-${this.zeroFill(42 - start - total)}`;
      return {
        startTime,
        currentTime,
        endTime,
        prevTotal,
        start,
        total
      };
    },
    calcDate(res, dateObj) {
      // 准备渲染数据了
      const {
        startTime,
        currentTime,
        endTime,
        prevTotal,
        start,
        total
      } = dateObj;
      // 需要注意的是某个月的开始日期可能是第一个, 也就是上个月没有数据
      this.prevMonth = this.genrateCurrent(prevTotal, startTime, res, start);
      this.currentMonth = this.genrateCurrent(total, currentTime, res);
      this.nextMonth = this.genrateCurrent(42 - start - total, endTime, res);
    },
    getFullDate(date) {
      let d = new Date(date);
      let yyyy = d.getFullYear();
      let mm = this.zeroFill(d.getMonth() + 1);
      let dd = this.zeroFill(d.getDate());
      return +new Date(`${yyyy}-${mm}-${dd}`);
    },
    genrateCurrent(total, date, res, start) {
      /*
      total-需要展示多少个格子(日历)
      date-当前日期
      res-所有项目列表
      start-主要是为了解决上一个只展示末尾数据
      */
      let yyyy = new Date(date).getFullYear();
      let mm = this.zeroFill(new Date(date).getMonth() + 1);
      let currentArr = [];
      for (let i = 1; i <= total; i++) {
        let nStmp = +new Date(`${yyyy}-${mm}-${this.zeroFill(i)}`);
        let l = res.filter(item => {
          return this.getFullDate(item.latestOnlineTime) === nStmp;
        });
        // 当前月份的数据, 包含日期和项目
        currentArr.push({
          day: i,
          projectList: l && l.length ? l : []
        });
      }
      return start > 0
        ? currentArr.splice(-start)
        : start === 0
        ? []
        : currentArr;
    },
    async getProject(obj) {
      const { startTime, endTime } = obj;
      const params = {
        startTime,
        endTime,
        projectIds: JSON.stringify(this.currentList),
        type: ""
      };
      return this.$post("/iterations/v2/query", { params });
    }
  },
  components: {
    calenderItem
  }
};
</script>

<style lang="less" scoped>
.xui-calender-container {
  max-width: 1684px;
  min-height: 600px;
  border: 1px solid #e3e7e2;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 1px 1px 4px #ccc;
}
.xui-calender-head {
  display: flex;
  .xui-head-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 60px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #3c5559;
    text-align: center;
  }
}
.xui-calender-body {
  font-size: 0;
}
</style>
