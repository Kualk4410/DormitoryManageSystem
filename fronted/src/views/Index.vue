<template>
    hello index

    <h1>token = {{ token }}</h1>
    <div>
        <p>name = {{ userInfo.name }}</p>
        <p>studentid = {{ userInfo.studentid }}</p>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router' // 引入路由钩子
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
  
    const store = useUserStore()

    const { token, userInfo } = storeToRefs(store)


</script>