<template>
  <header class="custom-header">
    <div class="header-title">杏园一舍603男生寝室</div>
    <div class="header-actions">
      <van-icon name="replay" color="#fff" size="20" @click="$emit('refresh')" />
      <van-icon name="plus" color="#fff" size="20" @click="$emit('add')" />
    </div>
  </header>
</template>

<script setup>
// 无props，标题固定
</script>

<style scoped>
.custom-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 16px;
    background-color: rgb(75, 77, 227);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
}

.header-actions {
    display: flex;
    gap: 20px;
}

.header-actions .van-icon {
    cursor: pointer;
}

</style>