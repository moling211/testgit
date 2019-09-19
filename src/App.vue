<template>
  <div>
     <Header :seller="seller"></Header>
     <div class="tab">
       <router-link class="tab-item" :to="{ path:'/goods'}">商品</router-link>
       <router-link class="tab-item" :to="{ path:'/ratings'}">评论</router-link>
       <router-link class="tab-item" :to="{ path:'/seller'}">商家</router-link>
     </div>
     <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import Header from './components/header/Header'
  import Home from './Home'
  const Errno = 0
export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then(response => {
      // get body data
      response = response.body
      if (response.errno === Errno) {
        this.seller = response.data
        // console.log(this.seller)
      }
    }, response => {
      // error callback
    })
  },
  components: {
    Header,
    Home
  }
}
</script>

<style lang="stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(17,27,77,0.1))
    .tab-item
      flex 1
      text-align center
      font-size 14px
      color rgb(77,85,93)
      &.router-link-active
        color rgb(240,20,20)
</style>
