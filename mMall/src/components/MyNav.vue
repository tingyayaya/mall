<template>
  <div class="my-nav">
        <nav class="nav-bar nav-search"  v-if="kinds==='search'">
            <div class="nav-left"></div>
            <div class="nav-right"></div>
        </nav>

        <nav class="nav-bar nav-logo" v-else-if="kinds === 'logo'">
            <div>

            </div>
        </nav>
  </div>
</template>

<script>
export default {
    name: 'my-nav',
    props: ['kinds']
}
</script>

<style lang="scss" scoped>
.nav-bar{
   width: 100%;
   position: fixed;
   top: 0;
   left: 0;
   height: 44px;
   background: #e9f3c9;
}
.nav-search {
   padding: 0 10px;
   box-sizing: border-box;
   display: flex;
   flex-flow: row nowrap;
   .nav-left {
       flex: 1;
   }
   .nav-right {
       width: 80px;
   }
}
</style>
