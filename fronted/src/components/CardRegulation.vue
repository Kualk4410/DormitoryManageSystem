<template>
    <el-card class="card-regulation">
        <div slot="header" class="clearfix">
            <span><van-icon name="description" /> <b>寝室公约</b></span>
            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
        </div>

        
        <div v-for="o in 4" :key="o" class="card-item-regulation">
            <van-icon name="passed" color="rgb(26, 184, 131)" />  {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<style>

.card-regulation {
  width: 90%;
}

.card-item-regulation {
  font-size: 14px;
  margin-bottom: 8px;
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