<template>
    <div class="home">
       <my-nav kinds="search"></my-nav>
       <div class="swiper-container">
           <div class="swiper-wrapper">
               <div class="swiper-slide">
                   <img src="" alt="">
               </div>
           </div>
       </div>
       我是首页
       <my-footer title="home"></my-footer>
    </div>
</template>

<script>
import MyFooter from '@/components/MyFooter';
import MyNav from '@/components/MyNav';

export default {
   name: 'home',
   components: { MyFooter, MyNav }
}
</script>

<style>
@import '../assets/css/base.css';
</style>
