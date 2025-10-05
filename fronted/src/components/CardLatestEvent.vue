<template>
  <el-card class="card-latest-event">
    <div slot="header" class="card-header">
      <span><van-icon name="clock" /> <b>最近事件</b></span>
      <div class="detail-btn" type="text">查看详情</div>
    </div>

    <div class="event-item" v-for="event_item in event_data">
      <van-image
        round
        width="2.5em"
        height="2.5em"
        fit="cover"
        :src="
          event_item.eventAvatar ||
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
        "
      />

      <div class="event-content">
        <div class="event-main">
          <div class="event-title">{{ event_item.eventTitle || "暂无标题" }}</div>
          <div class="event-desc">{{ event_item.eventDescription || "暂无描述" }}</div>
        </div>

        <div class="event-time">
          <div class="event-date">{{ event_item.eventDate || "01-01" }}</div>
          <div class="event-clock">{{ event_item.eventTime || "00:00" }}</div>
        </div>
      </div>
    </div>

    <!-- 没有事件 -->
    <div class="event-blank" v-if="event_data.length === 0">暂无事件~</div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const base_url = "http://127.0.0.1:8080";
const event_data = ref([]);

onMounted(() => {
  axios.get(base_url + "/api/event/recent").then((res) => {
    event_data.value = res.data;
    // 切割evnetTime为date跟time
    event_data.value.forEach((item) => {
      [item.eventDate, item.eventTime] = item.eventTime.split("/");
    });
  });
});
</script>

<style scoped>
/* 卡片容器 */
.card-latest-event {
  width: 90%;
}

/* 卡片头部 */
.card-header {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-btn {
  font-size: small;
  color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 事件项容器 */
.event-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.event-blank {
  font-size: small;
  color: rgb(160, 121, 116);
}

.event-item:last-child {
  margin-bottom: 0;
}

/* 事件内容区域 */
.event-content {
  padding-left: 8px;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

/* 事件主要内容 */
.event-main {
}

.event-title {
  font-size: medium;
}

.event-desc {
  font-size: smaller;
  color: rgb(160, 121, 116);
}

/* 事件时间 */
.event-time {
}

.event-date {
  font-size: medium;
  text-align: right;
}

.event-title,
.event-desc {
  width: 160px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.event-clock {
  text-align: right;
  font-size: smaller;
  color: rgb(160, 121, 116);
}
</style>
