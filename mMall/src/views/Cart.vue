<template>
    <div class="cart">
       我是购物车页面
       <my-footer title="cart"></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/MyFooter';

export default {
    name: 'cart',
    components: { MyFooter }
}
</script>

<style>
@import '../assets/css/base.css';
</style>
