<template>
    <div class="my-footer">
        <footer>
            <ul>
                <router-link to="/home" :class=" title === 'home' ? active: ''">
                   <li>
                       <i class="icon-home"></i>
                       <span>首页</span>
                   </li>
                </router-link>
                <router-link to="/home">
                   <li>
                       <i class="icon-category"></i>
                       <span>分类</span>
                   </li>
                </router-link>
                <router-link to="/home">
                   <li>
                       <i class="icon-find"></i>
                       <span>发现</span>
                   </li>
                </router-link>
                <router-link to="/home">
                   <li>
                       <i class="icon-cart"></i>
                       <span>购物车</span>
                   </li>
                </router-link>
                <router-link to="/home">
                   <li>
                       <i class="icon-mine"></i>
                       <span>我</span>
                   </li>
                </router-link>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: [ title ]
 
}
</script>

<style lang="scss" scoped type="text/css">

%border-t {
   border-top: 1px solid #dedede;
}

footer{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    ul {
        width: 100%;
        @extend %border-t;
        display: flex;
        flex-flow: row nowrap;
        a{
            flex: 1;
            height: 49px;
            text-align: center;
            i {
                display: block;
                width: 28px;
                height: 28px;
                background: url('../assets/imgs/header-icon.png') no-repeat;
                background-size: 136px auto;
            }
            i.icon-home{
                background-position: 0 0;
            }
            &.active{
                i.icon-home{
                    background-position: 0 -28px;
                }
            }
        }
        
    }
}
</style>
