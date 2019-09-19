<template>
  <div class="ratings-wrapper" ref="ratingsScroll">
    <div class="ratings-content">
      <div class="con-left">
        <h1 class="title">{{seller.score}}</h1>
        <p class="dec">综合评分</p>
        <p class="detail">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="con-right">
        <div class="right-star">
          <span class="title">服务态度</span>
          <div class="star-wrapper">
            <Star :size="16" :grade="seller.serviceScore"></Star>
          </div>
          <span class="grade">{{seller.serviceScore}}</span>
        </div>
        <div class="right-star">
          <span class="title">食品态度</span>
          <div class="star-wrapper">
            <Star :size="16" :grade="seller.foodScore"></Star>
          </div>
          <span class="grade">{{seller.foodScore}}</span>
        </div>
        <div class="right-star">
          <span class="title">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <Split></Split>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Star from '../../components/star/Star'
    import Split from '../../components/split/Split'
    export default {
        name: 'Ratings',
        props: ['seller'],
        data () {
          return {
          }
        },
        created () {
          this.$nextTick(() => {
            this._initScroll()
          })
        },
        components: {
          Star, Split
        },
        methods: {
          _initScroll () {
            this.ratingsScroll = new BScroll(this.$refs.ratingsScroll, {
              click: true
            })
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings-wrapper
    position fixed
    top 174px
    bottom 0
    width 100%
    height auto
    overflow hidden
    color #999
    .ratings-content
      padding 18px
      display flex
      border-1px(rgba(7, 17, 27, 0.1))
      .con-left
        flex 0 0 130px
        width 130px
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        .title
          font-size 24px
          line-height 28px
          color rgb(255,153,0)
        .dec
          font-size 12px
          line-height 12px
          color rgb(7,17,27)
          margin 6px 0 8px 0
          font-weight 400
        .detail
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
      .con-right
        padding-left 18px
        flex 1
        .right-star
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
          margin-bottom 8px
          display flex
          .title
            display inline-block
            margin-right 10px
          .grade
            display inline-block
            margin-left 5px
            font-size 12px
            color rgb(255,153,0)
            font-weight 600
            line-height 18px
          .time
            color rgb(147,153,159)
            line-height 18px
</style>
