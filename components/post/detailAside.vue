<template>
  <!-- 右侧内容 -->
  <div class="aside">
    <h4>相关攻略</h4>

    <!-- 推荐文章列表 -->
    <div class="recommend-list">
      <!-- 1 -->
      <a href v-for="(item, index) in recommends" :key="index" @click="changeClick(index)">
        <div class="a-centent">
          <div class="big-img">
            <img :src="item.images[0]" alt />
          </div>
          <div>
            <div class="a-title">{{item.title}}</div>
            <span>{{item.updated_at|getData}}</span>
            <span>阅读：{{item.watch}}</span>
          </div>
        </div>
      </a>

      <!-- 2 -->
      <!-- <a href>
        <div class="a-centent">
          <div class="big-img">
            <img src alt />
          </div>
          <div>
            <div class="a-title">这是文章的标题</div>
            <span>2019-07-21 3：50</span>
            <span>阅读 7</span>
          </div>
        </div>
      </a>
      <hr />-->
      <!-- 3 -->
      <!-- <a href>
        <div class="a-centent">
          <div class="big-img">
            <img src alt />
          </div>
          <div>
            <div class="a-title">这是文章的标题</div>
            <span>2019-07-21 3：50</span>
            <span>阅读 7</span>
          </div>
        </div>
      </a>
      <hr />-->
      <!-- 4 -->
      <!-- <a href>
        <div class="a-centent">
          <div class="big-img">
            <img src alt />
          </div>
          <div>
            <div class="a-title">这是文章的标题</div>
            <span>2019-07-21 3：50</span>
            <span>阅读 7</span>
          </div>
        </div>
      </a>
      <hr />-->
      <!-- 5 -->
      <!-- <a href>
        <div class="a-centent">
          <div class="big-img">
            <img src alt />
          </div>
          <div>
            <div class="a-title">这是文章的标题</div>
            <span>2019-07-21 3：50</span>
            <span>阅读 7</span>
          </div>
        </div>
      </a>-->
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
        recommends:[]
    };
  },

  filters: {
    getData: date => {
      return moment(date).format("YYYY-MM-DD");
    }
  },

  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {
        id: 421
      }
    }).then(res => {
      console.log(res);
      this.recommends=res.data.data
      
    });
  },
  methods:{
    changeClick(index){
      console.log(index);
    }
  }
};
</script>

<style scoped lang="less">
.aside {
  //   float: right;
  flex: 28;
  width: 280px;
  height: 500px;
  margin-left: 20px;
  // background-color: yellow;

  h4 {
    font-weight: 400;
    font-size: 18px;
    margin: 10px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #d0d0d0;
  }

  .recommend-list {
    a {
      display: flex;
      width: 100%;
      height: 120px;
      // background-color: brown;
      align-items: center;
      border-bottom: 1px solid #d0d0d0;

      .a-centent {
        display: flex;
        .big-img {
          width: 100px;
          height: 80px;
          background-color: #d0d0d0;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .a-title {
          width: 100%;
          height: 3.6em;
        }

        span {
          font-size: 12px;
          color: #998;
        }
      }
    }
  }
}
</style>