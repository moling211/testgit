<template>
  <div class="good-wrapper">
    <div class="good-left" ref="menuScroll">
      <ul class="left-list">
        <li class="list-item" @click="choosefood(index)" v-for="(item,index) in goods" :key="index" :class="(currentIndex==index)?'current':''">
          <p class="text">
            <span class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <div class="good-right" ref="foodScroll">
      <div>
        <div v-for="(item,index) in goods" :key="index" class="right-list">
          <h1 class="right-title">{{item.name}}</h1>
          <ul v-for="(food,index) in item.foods" :key="index" class="right-item">
            <li class="right-content" @click="lookDetail(food)">
              <img :src="food.icon" alt="">
              <div class="text-content">
                <h2 class="food-title">{{food.name}}</h2>
                <p class="food-description dec">{{food.description}}</p>
                <p class="food-description">
                  <span>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </p>
                <p class="food-description">
                  <span class="newprice">￥{{food.price}} </span>
                  <span class="oldprice" v-if="food.oldPrice>0">￥{{food.oldPrice}}</span>
                </p>
              </div>
              <!--按钮-->
              <div class="control-wrapper">
                <Cartcontrol :food="food"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--详情页-->
      <Food  ref="singleFood" :food = "singleFood"></Food>
    </div>
    <Shopcart :selectList="selectList" :seller="seller"></Shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Shopcart from '../shopcart/Shopcart'
  import Cartcontrol from '../cartcontrol/Cartcontrol'
  import Food from '../food/Food'
  const Errno = 0
  export default {
    name: 'Goods',
    data () {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'guarantee', 'invoice'],
        heightArr: [],
        scrollY: 0,
        seller: [],
        singleFood: []
      }
    },
    components: {
      Shopcart, Cartcontrol, Food
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.heightArr.length; i++) {
          let heigh1 = this.heightArr[i]
          let heigh2 = this.heightArr[i + 1]
          if (!heigh2 || (this.scrollY >= heigh1 && this.scrollY < heigh2)) {
            return i
          }
        }
        return 0
      },
      selectList () {
        let arr = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              arr.push(food)
            }
          })
        })
        return arr
      }
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body
        if (response.errno === Errno) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this.getHeight()
          })
        }
      }, response => {
        // error callback
      })
      this.$http.get('/api/seller').then(response => {
        // get body data
        response = response.body
        if (response.errno === Errno) {
          this.seller = response.data
          // console.log(this.seller)
        }
      }, response => {
        // error callback
      })
    },
    methods: {
      // 查看详情页
      lookDetail (food) {
        this.$refs.singleFood.showdetal()
        this.singleFood = food
        console.log(food)
      },
      choosefood (index) {
        let listHeight = this.$refs.foodScroll.getElementsByClassName('right-list')
        let el = listHeight[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          // console.log(pos.y)
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      getHeight () {
        //  每一块的高
        let listHeight = this.$refs.foodScroll.getElementsByClassName('right-list')
        let height = 0
        this.heightArr.push(height)
        for (let i = 0; i < listHeight.length; i++) {
          let itemHeight = listHeight[i].clientHeight
          height += itemHeight
          this.heightArr.push(height)
        }
        // console.log(this.heightArr)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .good-wrapper
    width 100%
    position absolute
    overflow hidden
    top 174px
    bottom 52px
    display flex
    z-index 10
    & .good-left
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      & .left-list
        width 100%
        margin 0 auto
        & .list-item
          height 54px
          width 100%
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
          line-height 14px
          color rgb(77, 85, 93)
          display flex
          flex-direction column
          justify-content center
          &.current
            background #fff
            font-weight 700
          &:last-child
            border-none()
          & .text
            padding 0 12px
            & .icon
              width 16px
              height 16px
            & .decrease
              width 12px
              height 12px
              display inline-block
              vertical-align top
              bg-img("./decrease_3")
            & .discount
              width 12px
              height 12px
              display inline-block
              vertical-align top
              bg-img("./discount_3")
            & .guarantee
              width 12px
              height 12px
              display inline-block
              vertical-align top
              bg-img("./guarantee_3")
            & .invoice
              width 12px
              height 12px
              display inline-block
              vertical-align top
              bg-img("./invoice_3")
            & .special
              width 12px
              height 12px
              display inline-block
              vertical-align top
              bg-img("./special_3")
    & .good-right
      flex 1
      height 100%
      & .right-list
        & .right-title
          background #f3f5f7
          color rgb(147, 153, 159)
          font-size 12px
          line-height 30px
          padding-left 14px
          border-left 2px solid #d9dde1
        & .right-item
          padding-top 18px
          padding-bottom 18px
          border-1px(rgba(7, 17, 27, 0.1))
          & .right-content
            display flex
            padding-left 18px
            & img
              flex 0 0 57px
              width 57px
              height 57px
              margin-right 10px
            & .text-content
              flex 1
              font-size 10px
              color rgb(147, 153, 159)
              line-height 10px
              & .food-title
                font-size 14px
                color rgb(7, 17, 27)
                line-height 14px
              & .food-description
                margin 8px 0
                font-size 10px
                color rgb(147, 153, 159)
                line-height 10px
                &.dec
                  line-height 14px
                &:last-child
                  margin-bottom 0
                & .newprice
                  display inline-block
                  font-size 14px
                  line-height 14px
                  font-weight 700
                  color #F01414
                  margin-right 5px
                & .oldprice
                  font-size 10px
                  line-height 14px
                  font-weight 700
            & .control-wrapper
              position absolute
              right 6px
              bottom 6px
</style>
