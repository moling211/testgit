<template>
  <div class="ratings-wrapper">
    <div class="selectType">
      <span @click="select(2)" class="block postive" :class="selectTy === 2?'active':''">{{ratingText.all}} <i>{{ratings?ratings.length:0}}</i></span>
      <span @click="select(0)" class="block postive" :class="selectTy === 0?'active':''">{{ratingText.pro}} <i>{{pos.length}}</i></span>
      <span @click="select(1)" class="block negtive" :class="selectTy === 1?'active':''">{{ratingText.neg}} <i>{{neg.length}}</i></span>
    </div>
    <div class="ratings-hr">
      <p class="hr-p">
        <i @click="chose" class="icon-check_circle" :class="onlyCon?'on':''"></i>
        <span class="hr-span">只看有内容的评价</span>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Ratingselect',
        props: ['ratings', 'ratingText', 'selectType', 'onlyContent'],
        data () {
          return {
            selectTy: this.selectType,
            onlyCon: this.onlyContent
          }
        },
        computed: {
          pos () {
            if (this.ratings) {
              return this.ratings.filter((ratings) => {
                return ratings.rateType === 0
              })
            } else {
              return []
            }
          },
          neg () {
            if (this.ratings) {
              return this.ratings.filter((ratings) => {
                return ratings.rateType === 1
              })
            } else {
              return []
            }
          }
        },
        created () {
        },
        methods: {
          select (type) {
            this.selectTy = type
            this.$emit('selectChose', type)
          },
          chose () {
            this.onlyCon = !this.onlyCon
            this.$emit('onlyChose', this.onlyCon)
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
          color #fff
    .ratings-hr
      padding 12px 18px
      border-1px(rgba(7,17,27,0.1))
      .hr-p
        color rgb(147,153,159)
        line-height 24px
        .icon-check_circle
          font-size 24px
          vertical-align top
          &.on
            color #00c850
        .hr-span
          font-size 12px
          vertical-align top
</style>
