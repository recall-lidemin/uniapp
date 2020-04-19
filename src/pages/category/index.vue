<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y>
          <text :class="{active: activeIndex === index}" 
          v-for="(item,index) in allCategorys" 
          :key="item.cat_id"
          @click="getSubCate(index)"
          >{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <!-- 小程序提供得滚动标签 -->
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <!-- 根据当前左侧激活得索引，来循环对应得children属性，获取右侧对应数据展示 -->
          <view class="children" v-for="(item) in allCategorys[activeIndex].children" :key="item.cat_id">
            <view class="title">{{item.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index" v-for="brands in item.children" :key="brands.cat_id">
                <image :src="brands.cat_icon"></image>
                <text>{{brands.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';
  import { getCategory } from '@/api/category.js'
  export default {
    data(){
      return {
        // 所有分类
        allCategorys: [],
        // 当前索引
        activeIndex:0

      }
    },
    onLoad(){
      // 页面加载就获取所有分类
      this.getCategory()
    },
    methods:{
      async getCategory(){
        const res = await getCategory()
        this.allCategorys = res.message 
        console.log(res);
      },
      // 获取当前激活索引
      getSubCate(index){
        this.activeIndex = index
      }
    },
    components: {
      search
    }
  }
</script>

<style scoped lang="scss">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
