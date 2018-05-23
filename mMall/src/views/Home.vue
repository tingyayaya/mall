<template>
    <div class="home">
       我是首页
       <my-footer title="home"></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/MyFooter';

export default {
   name: 'home',
   components: { MyFooter }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
