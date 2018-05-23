<template>
    <footer class="my-footer">
        <ul>
            <router-link to="/home" :class=" title === 'home' ? 'active': ''">
            <li>
                <i class="icon-home"></i>
                <span>首页</span>
            </li>
            </router-link>
            <router-link to="/category" :class=" title === 'category' ? 'active': ''">
            <li>
                <i class="icon-category"></i>
                <span>分类</span>
            </li>
            </router-link>
            <router-link to="/find" :class=" title === 'find' ? 'active': ''">
            <li>
                <i class="icon-find"></i>
                <span>发现</span>
            </li>
            </router-link>
            <router-link to="/cart" :class=" title === 'cart' ? 'active': ''">
            <li>
                <i class="icon-cart"></i>
                <span>购物车</span>
            </li>
            </router-link>
            <router-link to="/mine" :class=" title === 'mine' ? 'active': ''">
            <li>
                <i class="icon-mine"></i>
                <span>我</span>
            </li>
            </router-link>
        </ul>
    </footer>
</template>

<script>
export default {
  name: 'MyFooter',
  props: ['title']
 
}
</script>

<style lang="scss" scoped type="text/css">

%border-t {
   border-top: 1px solid #dedede;
}
$color: #96b922;

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
            padding-top:2px;
            box-sizing: border-box;
            i {
                display: block;
                width: 28px;
                height: 28px;
                background: url('../assets/imgs/header-icon.png') no-repeat;
                background-size: 136px auto;
                margin: 0 auto;
            }
            i.icon-home{
                background-position: 0 0;
            }
            i.icon-category{
                background-position: -27px 0;
            }
            i.icon-find{
                background-position: -54px 0;
            }
            i.icon-cart{
                background-position: -82px 0;
            }
            i.icon-mine{
                background-position: -108px 0;
            }
            &.active{
                span{
                    color: $color;
                }
                i.icon-home{
                    background-position: 0 -27px;
                }
                i.icon-category{
                    background-position: -27px -27px;
                }
                i.icon-find{
                    background-position: -54px -27px;
                }
                i.icon-cart{
                    background-position: -82px -27px;
                }
                i.icon-mine{
                    background-position: -108px -27px;
                }
            }
        }
        
    }
}
</style>
