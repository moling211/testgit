<template>
  <div>
    <div class="shopcart" >
      <div class="shop-content" @click="showList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="totalCount>0?'selectClass':''">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalMoney}}</div>
          <div class="dec">另需配送费 ￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay" :class="(totalMoney>=seller.minPrice)?'enougth':'no-enougth'">{{enoughMoney}}</div>
      </div>
      <transition name="fade">
        <div class="shop-list" v-show="show">
          <div class="list-header" v-show="totalCount>0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ">
            <span class="left-txt">购物车</span>
            <span class="left-clear" @click="clearAll">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul class="list-ul">
              <li v-for="(item,index) in selectList" :key="index" class="list-li">
                <div class="title">{{item.name}}</div>
                <div class="price">￥{{item.price}}</div>
                <div class="control-wrapper">
                  <Cartcontrol :food="item"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="shop-mark" v-show="show && (totalCount !== 0)"></div>
  </div>
</template>

<script>
    import Cartcontrol from '../cartcontrol/Cartcontrol'
    import BScroll from 'better-scroll'
    export default {
        name: 'Shopcart',
        data () {
          return {
            show: false
          }
        },
        props: ['selectList', 'seller'],
        components: { Cartcontrol },
        computed: {
          totalCount () {
            let count = 0
            for (let i = 0; i < this.selectList.length; i++) {
              count += this.selectList[i].count
            }
            return count
          },
          totalMoney () {
            let total = 0
            for (let i = 0; i < this.selectList.length; i++) {
              total += this.selectList[i].price * this.selectList[i].count
            }
            return total
          },
          enoughMoney () {
            if (this.totalMoney < this.seller.minPrice) {
              let money = this.seller.minPrice - this.totalMoney
              return '还差￥' + money + '起送'
            } else {
              return '去结算'
            }
          },
          ListShow () {
            if (this.totalCount > 0) {
              return true
            } else {
              return false
            }
          }
        },
        mounted () {
          this._initList()
        },
        methods: {
          _initList () {
            this.listScroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          },
          showList () {
            if ((this.totalCount > 0) && (this.ListShow === true)) {
              this.show = !this.show
            }
          },
          clearAll () {
            for (let i = 0; i < this.selectList.length; i++) {
              this.selectList[i].count = 0
            }
            this.show = false
          },
          pay () {
            if (this.totalMoney > this.seller.minPrice) {
              window.alert('付款：' + this.totalMoney + '元')
            }
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    bottom  0
    left 0
    width 100%
    height 48px
    z-index 100
    & .shop-content
      width 100%
      display flex
      & .content-left
        flex 1
        background #141d27
        display flex
        & .logo-wrapper
          position relative
          top -10px
          width 58px
          height:58px
          background #141d27
          padding 6px
          margin 0 11px
          border-radius 50%
          box-sizing border-box
          z-index 100
          & .logo
            width 100%
            height 100%
            background #2B343C
            border-radius 50%
            display flex
            flex-direction column
            justify-content center
            text-align center
            &.selectClass
              background #00A0DC
              & .icon-shopping_cart
                color #fff
            & .icon-shopping_cart
              color #80858A
              font-size 24px
              line-height 24px
          & .num
            position absolute
            top 0px
            right 0
            background #F01414
            width 30px
            height 18px
            text-align center
            line-height 18px
            color #fff
            border-radius 24px
            font-size 12px
            font-weight 400
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        & .price
          display inline-block
          margin-top 12px
          height 24px
          line-height 24px
          color rgba(255,255,255,0.4)
          font-weight 700
          font-size 16px
          padding-right 12px
          margin-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
        & .dec
          display inline-block
          font-size 10px
          color rgba(255,255,255,0.4)
          line-height 48px
      & .content-right
        flex 0 0 105px
        width 105px
        font-weight 700
        font-size 12px
        line-height 48px
        text-align center
        &.enougth
          background #00B43C
          color #fff
        &.no-enougth
          background #2B333B
          color rgba(255,255,255,0.4)
    .fade-enter-active, .fade-leave-active
      transition all 1s
    .fade-enter, .fade-leave-to
      transform translate3d(0,100%,0)
    .shop-list
      width 100%
      position fixed
      background #fff
      bottom 48px
      z-index -1
      .list-header
        display flex
        justify-content space-between
        line-height 40px
        background #f3f5f7
        height 40px
        padding 0 18px
        border-1px(rgba(7,17,27,0.1))
        .left-txt
          display inline-block
          font-size 14px
          color rgb(7,17,27)
        .left-clear
          display inline-block
          font-size 12px
          font-weight 400
          color rgb(0,160,220)
      .list-content
        max-height 217px
        padding 0 18px
        overflow hidden
        .list-ul
          .list-li
            line-height 48px
            border-1px(rgba(7,17,27,0.1))
            height 48px
            display flex
            .title
              flex 1
              color rgb(7,17,27)
              line-height 48px
              font-weight 700
              font-size 14px
            .price
              flex 0 0 50px
              width 50px
              font-weight 700
              font-size 14px
              line-height 48px
              color rgb(240,20,20)
              margin 0 12px 0 18px
              text-align right
            .control-wrapper
              flex 0 0 84px
              width 84px
              padding-top 5px
  .shop-mark
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    backdrop blur(10px)
    background rgba(7,17,27,0.6)
    z-index 0
</style>
