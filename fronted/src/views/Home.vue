<template>
  <div class="page"> 
    <router-view />
    <my-header></my-header>

    <div class="body-wrapper">

      <card-regulation />
      <card-latest-event />

    </div>
    
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
    import MyHeader from '@/components/MyHeader.vue';
    import TabBar from '@/components/TabBar.vue';
    import CardRegulation from '@/components/CardRegulation.vue';
    import CardLatestEvent from '@/components/CardLatestEvent.vue';

</script>

<style>

@import url("@/assets/styles/base.css");

.body-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 16px;
}

</style>