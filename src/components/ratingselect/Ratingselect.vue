<template>
  <div class="ratings-wrapper">
    <div class="selectType">
      <span class="block postive" :class="selectType === 2?'active':''">{{ratingText.all}} <i>{{allCount}}</i></span>
      <span class="block postive" :class="selectType === 0?'active':''">{{ratingText.pro}} <i>{{proCount}}</i></span>
      <span class="block negtive" :class="selectType === 1?'active':''">{{ratingText.neg}} <i>{{negCount}}</i></span>
    </div>
    <div class="ratings-hr">
      <p class="hr-p">
        <i class="icon-check_circle"></i>
        <span class="hr-span">只看有内容的评价</span>
      </p>
    </div>
    <div class="ratings-list">
      <ul class="list-ul">
        <li v-for="(item,index) in ratings" :key="index" class="list-li">
          <p>{{item.rateTime}}</p>
          <p>{{item.username}}</p>
          <p>{{item.rateType}}</p>
          <p>{{item.text}}</p>
          <img :src="item.avatar" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Ratingselect',
        props: ['ratings', 'ratingText', 'selectType'],
        data () {
          return {
            allCount: 0,
            proCount: 0,
            negCount: 0
          }
        },
        computed: {
        },
        created () {
        },
        methods: {
          getCount () {
            this.allCount = 0
            this.proCount = 0
            this.negCount = 0
            // console.log(this)
            for (let i = 0; i < this.ratings.length; i++) {
              if (this.ratings[i].rateType === 0) {
                this.proCount += 1
              } else if (this.ratings[i].rateType === 1) {
                this.negCount += 1
              }
            }
            this.allCount = this.proCount + this.negCount
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings-wrapper
    width 100%
    .selectType
      padding 12px 0px 18px 0px
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      display flex
      .block
        padding 0px 12px
        border-radius 2px
        display inline-block
        margin-right 8px
        font-size 12px
        font-weight 400
        line-height 32px
        color rgb(77,85,93)
        & i
          font-size 8px
          font-style normal
      .postive
        background rgba(0,160,220,0.2)
        &.active
          background rgba(0,160,220,1)
          color #fff
      .negtive
        background rgba(77,85,93,0.2)
        &.active
          background rgba(77,85,93,1)
    .ratings-hr
      padding 12px 18px
      border-1px(rgba(7,17,27,0.1))
      .hr-p
        color rgb(147,153,159)
        line-height 24px
        .icon-check_circle
          font-size 24px
          vertical-align top
        .hr-span
          font-size 12px
          vertical-align top
    .ratings-list
      width 100%
      .list-ul
        padding 0 18px
        .list-li
          padding 12px 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
</style>
