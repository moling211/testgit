<template>
  <div class="star-box">
    <span v-for="(item,index) in arr" :key="index" :class="item" class="item-star"></span>
  </div>
</template>

<script>
    export default {
        name: 'Star',
        data () {
          return {
            arr: []
          }
        },
        props: ['size', 'grade'],
        computed: {
        },
        created () {
          if (this.grade) {
            var score = Math.floor(this.grade)
            var half = this.grade - score
            for (let i = 0; i < score; i++) {
              this.arr.push('on' + this.size)
            }
            if (half >= 0.5) {
              this.arr.push('half' + this.size)
            }
            if (this.arr.length < 5) {
              const LENGT = 5 - this.arr.length
              for (let j = 0; j < LENGT; j++) {
                this.arr.push('off' + this.size)
              }
            }
          }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .star-box
    text-align center
    & .item-star
      display inline-block
    & .on16
      width 15px
      height 15px
      bg-img('./star16_on')
      margin-right 6px
    & .off16
      width 15px
      height 15px
      bg-img('./star16_off')
      margin-right 6px
    & .half16
      width 15px
      height 15px
      margin-right 6px
      bg-img('./star16_half')
    & .on24
      width 24px
      height 24px
      bg-img('./star24_on')
      margin-right 8px
    & .off24
      width 24px
      height 24px
      bg-img('./star24_off')
      margin-right 8px
    & .half24
      width 24px
      height 24px
      margin-right 8px
      bg-img('./star24_half')
    & .on36
      width 36px
      height 36px
      margin-right 10px
      bg-img('./star36_on')
    & .off36
      width 36px
      height 36px
      margin-right 10px
      bg-img('./star36_off')
    & .half36
      width 36px
      height 36px
      margin-right 10px
      bg-img('./star36_half')
    & .on48
      width 48px
      height 48px
      margin-right 12px
      bg-img('./star48_on')
    & .off48
      width 48px
      height 48px
      margin-right 12px
      bg-img('./star48_off')
    & .half48
      width 48px
      height 48px
      bg-img('./star48_half')
      margin-right 12px
</style>
