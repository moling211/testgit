<template>
  <div class="seller-wrapper" ref="sellerScroll">
    <div class="seller-content">
      <!--商家-->
      <div class="sellers">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrapper">
          <Star :size="16" :grade="seller.score"></Star>
          <span>({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="sellers-flex">
          <div class="ltem">
            <p class="item-up">起送价</p>
            <p class="price"><span class="num">{{seller.minPrice}}</span>元</p>
          </div>
          <div class="ltem">
            <p class="item-up">商家配送</p>
            <p class="price"><span class="num">{{seller.deliveryPrice}}</span>元</p>
          </div>
          <div class="ltem">
            <p class="item-up">平均配送时间</p>
            <p class="price"><span class="num">{{seller.deliveryTime}}</span>分钟</p>
          </div>
        </div>
        <div class="heart" @click="favarite=!favarite">
          <i class="icon-favorite" :class="favarite?'red':''"></i>
          <p class="text">{{collectText}}</p>
        </div>
      </div>
      <Split></Split>
      <!--公告-->
      <div class="notice">
        <h1 class="title">公告与活动</h1>
        <div class="dec-wrapper">
          <p class="dec">{{seller.bulletin}}</p>
        </div>
        <div class="supports">
          <div :key="index" class="supports-item" v-if="seller.supports" v-for="(item,index) in seller.supports">
            <span v-if="seller.supports" :class="classMap[item.type]" class="su-img"></span>
            <span class="txt">{{item.description}}</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <!--实景-->
      <div class="true-pic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-ul" ref="ulWrapper">
            <li class="pic-item" v-for="(item ,index) in seller.pics" :key="index">
              <img :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
      <Split></Split>
      <!--商家信息-->
      <div class="seller-msg">
        <h1 class="title">商家信息</h1>
        <ul class="seller-ul">
          <li class="seller-li" v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Star from '../../components/star/Star'
    import Split from '../../components/split/Split'
    export default {
        name: 'Seller',
        props: ['seller'],
        components: {
          Star, Split
        },
        data () {
          return {
            classMap: [],
            favarite: false
          }
        },
        created () {
          this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
          this.$nextTick(() => {
            this._initScroll()
            this.listScroll()
          })
        },
        computed: {
          collectText () {
            return this.favarite ? '已收藏' : '收藏'
          }
        },
        methods: {
          _initScroll () {
            this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
              click: true
            })
          },
          listScroll () {
            if (this.seller.pics) {
              let WIDTH = 120
              // console.log(this.$refs)
              this.$refs.ulWrapper.style.width = (WIDTH + 6) * this.seller.pics.length - 6 + 'px'
              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.picWrapper, {
                    startX: 0,
                    click: true,
                    scrollX: true,
                    // 忽略竖直方向的滚动
                    scrollY: false,
                    eventPassthrough: 'vertical'
                  })
                } else {
                  this.scroll.refresh()
                }
              })
            }
          }
        }
    }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
  .seller-wrapper
    color rgb(7,17,27)
    position fixed
    top 174px
    bottom 0
    width 100%
    height auto
    overflow hidden
    .seller-content
      width 100%
      .sellers
        padding 18px
        position relative
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          font-size 14px
          line-height 14px
          color rgb(7,17,27)
        .star-wrapper
          margin-top 8px
          display flex
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
          padding-bottom 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .text
            display inline-block
            margin-left 12px
        .sellers-flex
          display flex
          padding-top 18px
          .ltem
            width 30%
            color rgb(7,17,27)
            border-right 1px solid rgba(7, 17, 27, 0.1)
            text-align center
            font-size 10px
            line-height 10px
            &:last-child
              border-right none
            .item-up
              color rgb(147,153,159)
            .price
              margin-top 4px
              .num
                font-size 24px
                font-weight 400
                line-height 24px

        .heart
          right 18px
          top 16px
          width 38px
          text-align center
          position absolute
          .icon-favorite
            font-size 24px
            line-height 24px
            color #D4D6D9
          .red
            color rgb(240,20,20)
          .text
            margin-top 4px
            font-size 10px
            line-height 10px
            color rgb(77,85,93)
      .notice
        padding 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          font-size 14px
          line-height 14px
          color rgb(7,17,27)
        .dec-wrapper
          padding 8px 12px 12px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .dec
            font-size 12px
            line-height 24px
            color rgb(240,20,20)
        .supports
          line-height 12px
          .supports-item
            padding 12px 16px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            & span
              height 16px
              line-height 16px
              font-size 12px
              color rgb(7,17,27)
            & .decrease
              width 16px
              height 16px
              display inline-block
              vertical-align top
              bg-img("./decrease_4")
            & .discount
              width 16px
              height 16px
              display inline-block
              vertical-align top
              bg-img("./discount_4")
            & .guarantee
              width 16px
              height 16px
              display inline-block
              vertical-align top
              bg-img("./guarantee_4")
            & .invoice
              width 16px
              height 16px
              display inline-block
              vertical-align top
              bg-img("./invoice_4")
            & .special
              width 16px
              height 16px
              display inline-block
              vertical-align top
              bg-img("./special_4")
      .true-pic
        padding 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          font-size 14px
          line-height 14px
          color rgb(7,17,27)
        .pic-wrapper
          padding 12px 0
          .pic-ul
            display flex
            .pic-item
              margin-right 6px
              &>img
                width 120px
                height 90px
      .seller-msg
        padding 18px
        .title
          font-size 14px
          line-height 14px
          color rgb(7,17,27)
        .seller-ul
          padding 12px
          font-size 12px
          font-weight 200
          .seller-li
            padding 16px 12px
            border-top 1px solid rgba(7, 17, 27, 0.1)
</style>
