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
        <div class="control-wrapper" v-if="food.count>0">
          <Cartcontrol :food = "food"></Cartcontrol>
        </div>
        <div class="buy" v-if="!food.count" @click.stop.prevent="addNum">加入购物车</div>
      </div>
      <Split></Split>
      <!--商品介绍-->
      <div class="food-info">
        <h1>商品介绍</h1>
        <p>{{food.info}}</p>
      </div>
      <Split></Split>
      <!--商品评价-->
      <div class="food-ratings">
        <h1 class="title">商品评价</h1>
        <Ratingselect @onlyChose="choseFunction" @selectChose ="selectFunction" :ratings="food.ratings" :ratingText="ratingText" :selectType="selectType" :onlyContent="onlyContent"></Ratingselect>
      </div>
      <!--评价列表-->
      <div v-show="!food.ratings || !(food.ratings.length)" class="no-ratings">暂无评价</div>
      <div class="rating-list" v-show="food.ratings">
        <ul class="list-ul">
          <li class="list-li" v-for="(item,index) in food.ratings" :key="index" v-show="needShow(item.rateType, item.text)">
            <p class="time">{{item.rateTime | formatDate}}</p>
            <p class="rating">
              <i :class="{'icon-thumb_up':item.rateType===0, 'icon-thumb_down':item.rateType===1}"></i>
              <span class="text">{{item.text}}</span>
            </p>
            <p class="user">
              <span class="username">{{item.username}}</span>
              <img :src="item.avatar">
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import Cartcontrol from '../cartcontrol/Cartcontrol'
    import Split from '../split/Split'
    import Ratingselect from '../ratingselect/Ratingselect'
    import {formatDate} from '../../common/js/date.js'
    export default {
        name: 'Food',
        data () {
          return {
            show: false,
            ratingText: {
              all: '全部',
              pro: '推荐',
              neg: '吐槽'
            },
            selectType: 2,
            onlyContent: false
          }
        },
        filters: {
          formatDate (time) {
            var date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
          }
        },
        created () {
          this.$nextTick(() => {
            if (!this.Scroll) {
              this.Scroll = new BScroll(this.$refs.foodScroll, {
                click: true
              })
            } else {
              this.Scroll.refresh()
            }
          })
        },
        computed: {
        },
        components: {
          Cartcontrol, Split, Ratingselect
        },
        props: ['food'],
        methods: {
          showdetal () {
            this.show = true
          },
          closeDetail () {
            this.show = false
          },
          addNum () {
            Vue.set(this.food, 'count', 1)
          },
          needShow (type, text) {
            if (text === '' && this.onlyContent) {
              return false
            } else if (type === this.selectType) {
                return true
            } else if (this.selectType === 2) {
                return true
            } else {
              return false
            }
          },
          choseFunction (data) {
            this.onlyContent = data
            this.$nextTick(() => {
              this.Scroll.refresh()
            })
          },
          selectFunction (data) {
            this.selectType = data
            this.$nextTick(() => {
              this.Scroll.refresh()
            })
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
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
        border-1px(rgba(7,17,27,0.1))
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
          right 18px
          bottom  10px
        .buy
          position absolute
          right 18px
          bottom  18px
          background rgb(0,160,220)
          color #fff
          padding 6px 10px
          border-radius 12px
          font-size 10px
          line-height 12px
      .food-info
        padding 18px
        border-1px(rgba(7,17,27,0.1))
        &>h1
          font-size 14px
          color #07111b
          line-height 14px
          margin-bottom 6px
        & >p
          font-size 12px
          color rgb(77,85,93)
          line-height 24px
          padding 0 8px
      .food-ratings
        width 100%
        padding-top 18px
        .title
          font-size 14px
          color #07111b
          line-height 14px
          margin-bottom 6px
          padding 0 18px
      .rating-list
        width 100%
        .list-ul
          padding 0 18px
          .list-li
            padding 16px 0
            border-1px(rgba(7,17,27,0.1))
            position relative
            &:last-child
              border-none()
            .time
              font-size 10px
              color rgb(147,153,159)
              line-height 12px
            .rating
              .icon-thumb_up
                font-size 12px
                color rgb(0,160,220)
                line-height 24px
              .icon-thumb_down
                font-size 12px
                color rgb(147,153,159)
                line-height 24px
              .text
                vertical-align center
                font-size 12px
                line-height 16px
                color rgb(7,17,27)
            .user
              position absolute
              right 0
              top 18px
              .username
                display inline-block
                vertical-align top
              &>img
                width 12px
                border-radius 50%
                height 12px
                display inline-block
                vertical-align top
      .no-ratings
        padding 18px
        font-size 12px
</style>
