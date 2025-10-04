<template>
    <el-card class="card-latest-event">
        <div slot="header" class="clearfix">
            <span><van-icon name="clock" /> <b>最近事件</b></span>
            <el-button style="float: right;" type="text">查看详情</el-button>
        </div>


        <div class="card-latest-event-item">
            <van-image 
            round 
            width="3em" 
            height="3em" 
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" 
            fit="cover"
          >
           
          </van-image>

          <div class="content-wrapper">
            <div class="card-latest-event-item-content">
                <div>事件名称</div>
                <div>事件描述</div>
            </div>

            <div class="card-latest-event-item-time">
                <div>09-25</div>
                <div>17:44</div>
            </div>
          </div>

        </div>




        <div class="card-latest-event-item">
            <van-image 
            round 
            width="3em" 
            height="3em" 
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" 
            fit="cover"
          >
            
          </van-image>

          <div class="content-wrapper">
            <div class="card-latest-event-item-content">
                <div>事件名称</div>
                <div>事件描述</div>
            </div>

            <div class="card-latest-event-item-time">
                <div>09-25</div>
                <div>17:44</div>
            </div>
          </div>

        </div>


    </el-card>

</template>


<style>

.content-wrapper {
  padding-left: 8px;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.card-latest-event-item {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  /* background-color: aqua; */
  margin-bottom: 8px;
}
.card-latest-event-item:last-child {
  margin-bottom: 0;
}

.card-latest-event {
    width: 90%;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>