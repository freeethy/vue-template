<!-- 
  大号日历组件-组件小模块
-->
<template>
  <div class="xui-calender-item" :class="[extralClass]">
    <span
      class="xui-calender-number"
      :class="{ isGray: item.projectList && item.projectList.length }"
      >{{ item.day || item }}</span
    >
    <!-- 下面是和项目相关 -->
    <div
      class="xui-project-box thin-scrollbar "
      v-if="item && item.projectList"
      :class="[
        {
          multi: item.projectList && item.projectList.length > 1,
          twice: item.projectList && item.projectList.length > 1,
          toTop: day > 27
        },
        `color-${index}`
      ]"
    >
      <div
        class="xui-project-item"
        v-for="ele in item.projectList"
        @click="handleDetail(ele)"
        :key="ele.id"
        :class="COLOR_OBJECT[ele.project.showColor]"
      >
        <div class="xui-project-head">
          <span class="xui-project-title" :title="ele.project.title">
            <span class="xui-project-icon">
              <img alt="项目logo" :src="ele.project.logoUrl" />
            </span>
            {{ ele.project.title }}
          </span>
          <span
            class="xui-dot"
            :class="[ele.isDelay ? 'xui-red' : 'xui-green']"
          ></span>
        </div>
        <div
          class="xui-item-body"
          :class="{
            oneLine: ele.featureDescList.length === 1,
            twoLine: ele.featureDescList.length > 2
          }"
        >
          <span
            v-for="(child, index) in ele.featureDescList"
            :key="child + Math.random()"
            :title="child"
          >
            <!-- 溺水三千, 只取2个 -->
            <template v-if="index <= 1"> {{ index + 1 }}.{{ child }} </template>
          </span>
        </div>
        <div class="xui-item-footer">
          <span class="item-file" @click.stop="handleJump(ele.tapdUrl)">
            <svg-icon icon-class="project-file" size="14"></svg-icon>
          </span>
          <span class="item-user">
            <svg-icon
              :icon-class="
                `project-people-${COLOR_OBJECT[ele.project.showColor]}`
              "
              size="16"
            />
          </span>
          <span>{{ ele.creatorName }}</span>
        </div>
      </div>
    </div>
    <span class="more" v-if="item.projectList && item.projectList.length > 2">
      +{{ item.projectList && item.projectList.length - 2 }}
    </span>
  </div>
</template>

<script type="text/javascript">
import { COLOR_OBJECT } from "@/constants/index";

export default {
  name: "calenderItem",
  data() {
    return {
      COLOR_OBJECT
    };
  },
  props: {
    item: {
      default() {
        return {
          projectList: []
        };
      }
    },
    index: {
      default() {
        return 0;
      }
    },
    extralClass: {},
    day: {
      default() {
        return 1;
      }
    }
  },
  methods: {
    handleDetail(item) {
      this.$emit("openDetailProject", item);
    },
    handleJump(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="less" scoped>
.xui-calender-item {
  position: relative;
  width: calc(100% / 7);
  display: inline-flex;
  height: 117px;
  padding: 6px;
  color: #5d8555;
  font-size: 14px;
  box-sizing: border-box;
  border-top: 1px solid #e3e7e2;
  border-right: 1px solid #e3e7e2;
  .more {
    position: absolute;
    right: 7px;
    bottom: 7px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #abc270;
    letter-spacing: 0;
    line-height: 18px;
  }
  &:nth-child(7n) {
    border-right: none;
  }
  &.prev-month,
  &.next-month {
    color: #d9dcde;
  }
  .xui-calender-number {
    position: absolute;
    left: 18px;
    bottom: 8px;
    &.isGray {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(188, 193, 202, 1);
      line-height: 20px;
    }
  }
  &:hover {
    .xui-project-box {
      &.multi {
        height: auto;
        max-height: 200px;
        overflow: auto;
        // border-bottom: 1px #E3E7E2 solid;
        width: 100%;
        padding: 7px;
        box-sizing: border-box;
        background: #fff;
        z-index: 99;
      }
      &.onlyT {
        border-bottom: none;
      }
    }
  }
  .xui-project-box {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 7px;
    box-sizing: border-box;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    .xui-project-item {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 6px;
      box-sizing: border-box;
      border-radius: 2px 10px 10px 2px;
      border-radius: 2px 10px 10px 2px;
      box-shadow: 1px 1px 1px #d3d3d3;
      cursor: pointer;
      &.color-1 {
        background: rgba(255, 204, 38, 0.2);
        // box-shadow: -1px 1px 2px rgba(255, 204, 38, 1);
        .xui-project-head {
          color: #d6980b;
        }
        &::before {
          background: #ffcc26;
        }
      }
      &.color-2 {
        background: rgba(133, 196, 255, 0.2);
        // box-shadow: -1px 1px 2px rgba(133, 196, 255, 1);
        .xui-project-head {
          color: #6e9bc4;
        }
        .xui-item-body {
          span {
            color: #83b9ea;
          }
        }
        .xui-item-footer {
          span {
            color: #6e9bc4;
          }
        }
        &::before {
          background: #85c4ff;
        }
      }
      &.color-3 {
        background: rgba(170, 181, 255, 0.2);
        // box-shadow: -1px 1px 2px rgba(170, 181, 255, 1);
        .xui-project-head {
          color: #7c84ba;
        }
        .xui-item-body {
          span {
            color: #7c84ba;
          }
        }
        .xui-item-footer {
          span {
            color: #7c84ba;
          }
        }
        &::before {
          background: #aab5ff;
        }
      }
      &::before {
        content: "";
        width: 4px;
        height: 100%;
        position: absolute;
        left: 0;
        border-radius: 2px;
      }
      .xui-project-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-left: 15px;
        margin-bottom: 2px;
        height: 34px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #d6980b;
        letter-spacing: 0;
        line-height: 18px;
        .xui-project-title {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .xui-project-icon {
            display: inline-flex;
            align-items: center;
            width: 18px;
            height: 18px;
            margin-right: 6px;
            vertical-align: middle;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        .xui-dot {
          position: relative;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          &.xui-green {
            background: rgba(133, 207, 38, 0.2);
            &::before {
              background: #85cf26;
            }
          }
          &.xui-red {
            background: rgba(255, 128, 128, 0.2);
            &::before {
              background: #ff8080;
            }
          }
          &::before {
            content: "";
            position: absolute;
            left: calc(50% - 4px);
            top: calc(50% - 4px);
            width: 8px;
            height: 8px;
            background: #85cf26;
            border-radius: 50%;
          }
        }
      }
      .xui-item-body {
        height: 36px;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 18px;
          display: inline-block;
          width: 100%;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #edc248;
          letter-spacing: 0;
          line-height: 18px;
          padding-left: 15px;
          overflow: hidden;
          box-sizing: border-box;
        }
        &.oneLine {
          text-align: left;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        &.twoLine {
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .xui-item-footer {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #d6980b;
        letter-spacing: 0;
        line-height: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 11px;
        .item-file {
          margin-right: 8px;
        }
        .item-user {
          margin-right: 4px;
        }
      }
    }
    &.twice {
      &.toTop {
        top: auto;
        bottom: 2px;
      }
      .xui-project-item {
        height: 36px;
        margin-bottom: 4px;
        border-radius: 2px;
        overflow: hidden;
        transition: 0.3s ease-out;
        &:hover {
          height: 105px;
          transition: 0.4s ease-out;
          transform: translate(0);
        }
      }
    }
    &.multi {
      height: 87px;
      overflow: hidden;
    }
  }
}

@media screen and (max-width: 1500px) {
  .xui-calender-item {
    .xui-project-box {
      .xui-project-item {
        .xui-project-head {
          padding-left: 4px;
          .xui-project-title {
            display: inline-block;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .xui-project-icon {
              display: inline-flex;
              margin-right: 4px;
              vertical-align: middle;
            }
          }
        }
        .xui-item-body {
          span {
            padding-left: 4px;
          }
        }
        .xui-item-footer {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
