<template>
  <div class="ratings-wrapper" ref="ratingsScroll">
    <div>
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
      <div class="ratings-wrapper">
        <Ratingselect @onlyChose="choseFunction" @selectChose ="selectFunction" :ratings="ratings" :ratingText="ratingText" :selectType="selectType" :onlyContent="onlyContent"></Ratingselect>
      </div>
      <!--列表-->
      <div class="ratings-list">
        <ul class="list-ul">
          <li class="list-li" v-for="(item,index) in ratings" :key="index" v-show="needShow (item.rateType, item.text)">
            <div class="avatar">
              <img :src="item.avatar" alt="" class="avatar-img">
            </div>
            <div class="content">
              <p class="username">{{item.username}}</p>
              <div class="star-content">
                <Star :size="16" :grade="item.score"></Star>
                <span class="cometime">{{item.deliveryTime?item.deliveryTime:0}}分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="bottom-con">
                <i :class="{'icon-thumb_up':item.rateType===0, 'icon-thumb_down':item.rateType===1}"></i>
                <span class="tag" v-for="(tag,index) in item.recommend" :key="index">{{tag}}</span>
              </div>
              <p class="time">{{item.rateTime | formatDate}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Star from '../../components/star/Star'
    import Split from '../../components/split/Split'
    import Ratingselect from '../../components/ratingselect/Ratingselect'
    import {formatDate} from '../../common/js/date.js'
    const Errno = 0
    export default {
        name: 'Ratings',
        props: ['seller'],
        filters: {
          formatDate (time) {
            var date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
          }
        },
        data () {
          return {
            ratingText: {
              all: '全部',
              pro: '推荐',
              neg: '吐槽'
            },
            selectType: 2,
            onlyContent: false,
            ratings: []
          }
        },
        created () {
          this.$http.get('/api/ratings').then(response => {
            response = response.body
            if (response.errno === Errno) {
              this.ratings = response.data
              this.$nextTick(() => {
                this._initScroll()
              })
            }
          }, response => {
            // error callback
          })
        },
        components: {
          Star, Split, Ratingselect
        },
        methods: {
          _initScroll () {
            this.ratingsScroll = new BScroll(this.$refs.ratingsScroll, {
              click: true
            })
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
              this.ratingsScroll.refresh()
            })
          },
          selectFunction (data) {
            this.selectType = data
            this.$nextTick(() => {
              this.ratingsScroll.refresh()
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
      @media only screen and (max-width:320px)
        padding 10px 5px
      .con-left
        flex 0 0 130px
        width 130px
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width:320px)
          flex 0 0 115px
          width 115px
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
        @media only screen and (max-width:320px)
          padding-left 8px
        .right-star
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
          margin-bottom 8px
          display flex
          .title
            display inline-block
            margin-right 10px
            @media only screen and (max-width:320px)
              margin-right 5px
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
    .ratings-wrapper
      width 100%
      position relative
      top 0
    .ratings-list
      width 100%
      .list-ul
        padding 0 18px
        .list-li
          padding 18px 0
          display flex
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .avatar
            flex 0 0 30px
            width 30px
            .avatar-img
              width 28px
              height 28px
              border-radius 50%
          .content
            margin-left 12px
            flex 1
            position relative
            .username
              font-size 10px
              line-height 12px
              color rgb(7,17,27)
            .star-content
              margin 4px 0 6px 0
              display flex
              .cometime
                font-size 10px
                color rgb(147,153,159)
                line-height 12px
                margin-left 6px
                display flex
                flex-direction column
                justify-content center
            .text
              font-size 12px
              line-height 18px
              font-weight 400
              color rgb(7,17,27)
              margin-bottom 8px
            .bottom-con
              font-size 9px
              color rgb(147,153,159)
              line-height 16px
              .tag
                display inline-block
                border 1px solid rgba(7, 17, 27, 0.1)
                padding 2px 6px
                margin-left 6px
                margin-bottom 6px
              .icon-thumb_up
                font-size 12px
                color rgb(0,160,220)
                line-height 16px
              .icon-thumb_down
                font-size 12px
                color rgb(183,187,191)
                line-height 16px
            .time
              position absolute
              right 0
              font-size 10px
              color rgb(147,153,159)
              line-height 12px
              top 0
</style>
