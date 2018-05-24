<template>
  <div class="my-nav">
        <nav class="nav-bar nav-search"  v-if="kinds==='search'">
            <div class="nav-left">
                <form action="#">
                    <input type="search" autocomplete="off" placeholder="请输入关键词" @input="hasMessage" v-model="message">
                </form>
                <i class="icon-small icon-search"></i>
                <i class="icon-small icon-clear" v-show="isclose" @click="clear"></i>
            </div>
            <div class="nav-right">
                <i class="icon-small icon-category"></i>
            </div>
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
    props: ['kinds'],
    data () {
        return {
           isclose: false,
           message: ''
        }
    },
    methods: {
        hasMessage() {
            return this.message === '' ? this.isclose = false : this.isclose = true;
        },
        clear() {
           this.message = '';
           this.isclose = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-bar{
   width: 100%;
   position: fixed;
   top: 0;
   left: 0;
   height: 44px;
   background: #fff;
}
.nav-search {
   padding: 0 10px;
   box-sizing: border-box;
   display: flex;
   flex-flow: row nowrap;
   .nav-left {
       flex: 9;
       padding: 7px 0;
       position: relative;
       z-index: 998;
       input {
           width: 100%;
           padding: 0 10px 0 30px;
           font-size: 14px;
       }
       @at-root .icon-small{
           display: inline-block;
           background: url(../assets/imgs/small-icon.png) no-repeat;
           background-size:  100px auto;
       }
       .icon-search {
           width: 20px;
           height: 20px;
           position: absolute;
           top: 12px;
           left: 5px;
           background-position: 0 0;
           z-index: 999;
       }
       .icon-clear {
           background-position: -40px 0;
           width: 20px;
           height: 20px;
           position: absolute;
           top: 12px;
           right: 10px;
           z-index: 999;
       }
   }
   .nav-right {
       flex:1;
       .icon-category {
           background-position: -20px 0;
           width: 20px;
           height: 20px;
           position: absolute;
           top: 12px;
           right: 10px;
           z-index: 999;
       }
   }
}
</style>
