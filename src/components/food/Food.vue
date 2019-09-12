<template>
  <div class="food" v-show="show" ref = "foodScroll">
    <div class="food-content">
      <div class="img-wrapper">
        <img :src="food.image" alt="">
        <i class="icon-arrow_lift" @click="closeDetail"></i>
      </div>
      <div class="content">
        <h1 class="name">{{food.name}}</h1>
        <div class="dec">
          <span>月售{{food.sellCount}}</span>
          <span>好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="new-price">￥{{food.price}}</span>
          <span class="old-price">{{food.oldPrice}}</span>
        </div>
        <div class="control-wrapper">
          <Cartcontrol :food = "food"></Cartcontrol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Cartcontrol from '../cartcontrol/Cartcontrol'
    export default {
        name: 'Food',
        data () {
          return {
            show: false
          }
        },
        created () {
          this.$nextTick(() => {
            this.Scroll = new BScroll(this.$refs.foodScroll, {
              click: true
            })
          })
        },
        components: {
          Cartcontrol
        },
        props: ['food'],
        methods: {
          showdetal () {
            this.show = true
          },
          closeDetail () {
            this.show = false
          }
        }
    }
</script>

<style scoped lang="stylus">
  .food
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    z-index 30
    background #fff
    .food-content
      position relative
      .img-wrapper
        width 100%
        height 0
        padding-top 100%
        & > img
          position absolute
          top 0
          left 0
          width 100%
          z-index -1
        & .icon-arrow_lift
          position absolute
          top 0
          left 0
          padding 10px
          font-size 16px
          color #fff
      .content
        position relative
        padding 18px
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        .name
          font-weight 700
          color rgb(7,17,27)
          line-height 14px
          font-size 14px
        .dec
          margin 8px 0 18px 0
        .price
          font-weight 700
          line-height 24px
          .new-price
            font-size 14px
            color rgb(240,20,20)
          .old-price
            font-size 10px
            color rgb(147,153,159)

        .control-wrapper
          position absolute
          right 0
          top 0
</style>
