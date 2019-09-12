<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="clickDecrease">
      <i class="icon-remove_circle_outline"></i>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="clickAdd">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'Cartcontrol',
        props: ['food'],
        methods: {
          clickAdd () {
            if (!this.food.count) {
              Vue.set(this.food, 'count', 1)
            } else {
              this.food.count++
            }
          },
          clickDecrease () {
            if (this.food.count) {
              this.food.count--
            }
          }
        }
    }
</script>

<style scoped lang="stylus">
  .cartcontrol
    display flex
    .cart-decrease, .cart-add
      padding 6px
      font-size 24px
      color rgb(0,160,220)
      line-height 24px
    .cart-count
      width 12px
      text-align center
      font-size 10px
      line-height 36px
      color rgb(147,153,159)
</style>
