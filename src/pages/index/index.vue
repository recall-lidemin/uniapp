<template>
  <view class="index" :style="{overflow:'hidden',height:h}">
    <!-- 搜索 -->
    <search @my="indexFather"></search>
    <!-- 轮播图 -->
    <view class="swiper-box">
      <swiper indicator-dots :autoplay="true" circular>

        <swiper-item v-for="item in swiperlist" :key="item.goods_id">
          <navigator url="/pages/goods/index">
            <image :src="item.image_src"></image>
          </navigator>
        </swiper-item>

      </swiper>
    </view>
    <!-- 导航菜单宫格 -->
    <view class="navs">
      <navigator v-for="item in navslist" :key="item.navigator_url" url="/pages/category/index">
        <image :src="item.image_src"></image>
      </navigator>

    </view>
    <!-- 楼层 -->
    <view class="box">
      <view class="floor" v-for="item in floorslist" :key="item.floor_title.image_src">
        <!-- 标题 -->
        <view class="floor-title">
          <image :src="item.floor_title.image_src"></image>
        </view>
        <!-- 条目 -->
        <view class="item">

          <navigator v-for="subitem in item.product_list" :key="subitem.image_src"
            :url="subitem.navigator_url">
            <image :src="subitem.image_src"></image>
          </navigator>

        </view>
      </view>

    </view>
    <!-- 回到顶部 -->
    <view class="goTop icon-top" @click="goTop" v-show="scrollTop>0"></view>
  </view>
</template>

<script>
import { getSwiperData, getNavsData, getFloorData } from "@/api/index";
import search from "@/components/search.vue";
export default {
  data() {
    return {
      h: "auto",
      swiperlist: [], //轮播图
      navslist: [], // 导航
      floorslist: [], // 楼层数据
      scrollTop: 0 //页面滚动数据
    };
  },
  onLoad() {
    //  获取轮播图 数据
    this.getSwiper();
    // 获取导航菜单数据
    this.getnavs();
    // 获取楼层数据
    this.getfloors();
  },
  methods: {
    // 回到顶部
    goTop() {
      // api接口pageScrollTo使页面滚动到指定位置
      uni.pageScrollTo({
        scrollTop: 0,
        duration:300
      });
    },

    indexFather(h) {
      console.log("index首页执行了", h);
      this.h = h;
    },
    // 获取轮播图数据
    async getSwiper() {
      const res = await getSwiperData();
      this.swiperlist = res.message;
    },
    // 获取导航数据
    async getnavs() {
      const res = await getNavsData();
      this.navslist = res.message;
    },
    // 获取楼层数据
    async getfloors() {
      const res = await getFloorData();
      this.floorslist = res.message;
    }
  },
  components: {
    search
  },
  // 监听下拉刷新事件
  async onPullDownRefresh() {
    // 刷新 页面 就是从头请求数据 来一遍
    // 查看network请求
    await this.getSwiper(); //假如 3秒
    await this.getnavs(); //假如 5秒
    await this.getfloors(); //假如 2秒
    // 等待请求完毕 应该 立刻关闭下拉效果
    uni.stopPullDownRefresh();
  },
  // 监听页面滚动事件显示回到顶部
  onPageScroll(obj) {
    this.scrollTop = obj.scrollTop;
  }
};
</script>

<style lang="less">
// 轮播图
.swiper-box {
  swiper {
    height: 340rpx;
  }
  image {
    width: 750rpx;
    height: 340rpx;
  }
}

.navs {
  display: flex;
  flex-wrap: wrap;
  padding: 30rpx 0;
  navigator {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.box {
  .floor {
    .floor-title {
      padding-top: 30rpx;
      background-color: #f4f4f4;
      image {
        width: 750rpx;
        height: 60rpx;
      }
    }
    .item {
      padding: 20rpx 16rpx;
      overflow: hidden;
      navigator {
        float: left;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        width: 193rpx;
        height: 188rpx;
      }
      navigator:nth-child(1) {
        margin-left: 0;
        width: 232rpx;
        height: 386rpx;
      }
      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }
  }
  .floor:nth-child(1) {
    .item {
      navigator {
        width: 233rpx;
      }
    }
  }
}

.goTop {
  position: fixed;
  bottom: 30rpx;
  /* #ifdef H5 */
  bottom: 65px;
  /* #endif */
  right: 30rpx;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100rpx;
  font-size: 48rpx;
  color: #666;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
