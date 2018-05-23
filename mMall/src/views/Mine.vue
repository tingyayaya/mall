<template>
    <div class="mine">
       我是个人中心
       <my-footer title="mine"></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/MyFooter';

export default {
   name: 'mine',
   components: { MyFooter }
}
</script>

<style>
@import '../assets/css/base.css';
</style>
