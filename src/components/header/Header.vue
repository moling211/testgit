<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="name">
          <span class="brandname"></span>
          <span>{{seller.name}}</span>
        </div>
        <span class="description">{{seller.description}}</span>
        <div class="supports">
          <span v-if="seller.supports" :class="classMap[seller.supports[0].type]"></span>
          <span v-if="seller.supports">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="number" @click="clickDetail">
        <span v-if="seller.supports" class="num">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="notice-wrapper" @click="clickDetail">
      <span class="notice-img"></span>
      <span class="notice-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-wrapper">
      <img :src="seller.avatar" alt="">
    </div>
    <!--弹出层-->
    <div class="mark-wrapper" v-show="detailShow" translate="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <!--商家名字-->
          <h1 class="seller-name">{{seller.name}}</h1>
          <!--星星-->
          <div class="star-wrapper">
            <Star :size="24" :grade="4.2"></Star>
          </div>
          <!--优惠信息-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="supports">
            <div :key="index" class="supports-item" v-if="seller.supports" v-for="(item,index) in seller.supports">
              <span v-if="seller.supports" :class="classMap[item.type]" class="su-img"></span>
              <span class="txt">{{item.description}}</span>
            </div>
          </div>
          <!--商家公告-->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!--公告-->
          <div class="seller-detail">
            {{seller.bulletin}}
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </div>
</template>

<script>
    import Star from '../star/Star.vue'
    export default {
        name: 'Header',
        props: ['seller'],
        data () {
          return {
            detailShow: false,
            grade: ''
          }
        },
        components: {
          Star
        },
        created () {
          this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        },
        methods: {
          clickDetail () {
            this.detailShow = true
          },
          closeDetail () {
            this.detailShow = false
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    width 100%
    height 100%
    position relative
    background-color rgba(7,17,27,0.5)
    overflow hidden
    .content-wrapper
      position relative
      display flex
      padding 24px 12px 18px 24px
      .avatar
        width 80px
        height 64px
        border-radius 2px
        overflow hidden
        display inline-block
        &>img
          width 64px
          height 64px
          border-radius 2px
      .content
        display inline-block
        & > span
          display block
        & .name
          font-size 16px
          font-weight bold
          line-height 18px
          & .brandname
            height 16px
            width 24px
            display inline-block
            vertical-align top
            bg-img("./brand")
        & .description
          font-size 12px
          line-height 12px
          margin 8px 0 10px 0
        & .supports
          line-height 12px
          & span
            font-size 10px
          & .decrease
            width 12px
            height 12px
            display inline-block
            vertical-align top
            bg-img("./decrease_1")
          & .discount
            width 12px
            height 12px
            display inline-block
            vertical-align top
            bg-img("./discount_1")
          & .guarantee
            width 12px
            height 12px
            display inline-block
            vertical-align top
            bg-img("./guarantee_1")
          & .invoice
            width 12px
            height 12px
            display inline-block
            vertical-align top
            bg-img("./invoice_1")
          & .special
            width 12px
            height 12px
            display inline-block
            vertical-align top
            bg-img("./special_1")
      .number
        position absolute
        font-size 10px
        line-height 12px
        height 24px
        padding 0 8px
        border-radius 16px
        background-color rgba(0,0,0,0.2)
        right 12px
        bottom 18px
        vertical-align top
        & .num
          display inline-block
          height 24px
          line-height 24px
          text-align center
    .notice-wrapper
      background-color rgba(7,17,27,0.2)
      position relative
      padding 0 12px 0 12px
      height 28px
      line-height 28px
      vertical-align top
      display flex
      & .notice-img
        display inline-block
        margin-top 7px
        margin-right 4px
        width 100px
        height 14px
        bg-img("./bulletin")
      & .notice-text
        display inline-block
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        font-size 10px
      & .icon-keyboard_arrow_right
        position absolute
        right 5px
        top 7px
    .bg-wrapper
      position absolute
      z-index -1
      width 100%
      height 100%
      top 0
      left 0
      filter blur(5px)
      & > img
        width 100%
        height 100%
    .mark-wrapper
      z-index 100
      position fixed
      overflow auto
      top 0
      left 0
      width 100%
      height 100%
      background-color rgba(7,17,27,0.8)
      transition all linear 0.5s
      &.fade-transition
        opacity 1
        background-color rgba(7,17,27,0.8)
      &.fade-enter,&.fade-leave
        opacity 0
        background-color rgba(7,17,27,0)
      & .detail-wrapper
        width 100%
        min-height 100%
        & .detail-main
          width 80%
          padding 0px 36px 0 36px
          margin 0 auto
          margin-top 64px
          padding-bottom 64px
          & .seller-name
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
          & .star-wrapper
            margin 16px auto 28px auto
            height 24px
            width 100%
          & .title
            display flex
            & .line
              flex 1
              top -8px
              border-1px(rgba(255,255,255,0.2))
            & .text
              font-size 14px
              line-height 16px
              font-weight 700
              padding 0 12px
          & .supports
            padding 24px 12px 28px 12px
            & .supports-item:last-child
              margin-bottom 0
            & .supports-item
              margin-bottom 12px
              & .su-img
                width 16px
                height 16px
                margin-right 6px
                vertical-align top
              & .txt
                vertical-align top
                font-size 12px
                line-height 12px
              & .decrease
                width 12px
                height 12px
                display inline-block
                vertical-align top
                bg-img("./decrease_2")
              & .discount
                width 12px
                height 12px
                display inline-block
                vertical-align top
                bg-img("./discount_2")
              & .guarantee
                width 12px
                height 12px
                display inline-block
                vertical-align top
                bg-img("./guarantee_2")
              & .invoice
                width 12px
                height 12px
                display inline-block
                vertical-align top
                bg-img("./invoice_2")
              & .special
                width 12px
                height 12px
                display inline-block
                vertical-align top
                bg-img("./special_2")
          & .seller-detail
            padding 24px 12px
            font-size 12px
            line-height 24px
      & .detail-close
        position relative
        width 32px
        height 32px
        font-size 32px
        clear both
        margin -64px auto 0 auto
</style>
