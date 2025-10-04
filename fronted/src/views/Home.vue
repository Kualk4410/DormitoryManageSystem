<template>
  <div class="page"> 
    <router-view />
    <my-header></my-header>

    <div class="body-wrapper">

      <regulation />


    </div>
    
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
    import MyHeader from '@/components/MyHeader.vue';
    import TabBar from '@/components/TabBar.vue';
    import Regulation from '@/components/Regulation.vue';

</script>

<style>

@import url("@/assets/styles/base.css");

.body-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

</style>