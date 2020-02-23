<template>
  <div>
    <div class="containers">
      <div class="main">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 文章标题 -->
        <h1>{{articleData.title}}</h1>
        <hr />
        <!-- 发表时间 -->
        <div class="article-time">
          <span>攻略：2019-05-22 10:57</span>
          <span>阅读：5132</span>
        </div>
        <!-- 正文内容 -->
        <div class="article-content" v-html="`${articleData.content}`">
          <!-- <div ></div> -->
        </div>
        <!-- 点赞分享部分 -->
        <div class="article-ctrl">
          <div class="ctrl-fater">
            <div class="ctrl-item">
              <i class="iconfont iconpinglun"></i>
              <p>评论(0)</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconstar1"></i>
              <p>收藏</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconding"></i>
              <p>点赞(36)</p>
            </div>
          </div>
        </div>
        <!-- 评论部分 -->
        <div class="comment">
          <h4>评论</h4>
          <div>
            <textarea autocomplete="off" placeholder="住口..." style="resize: none;"></textarea>
          </div>
          <!-- 添加图片部分 -->
          <div class="add-submit">
            <div>
              <!-- 上传图片的组件 -->
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                limit="10"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
            <!-- 提交按钮 -->
            <div>
              <el-button type="primary">提交</el-button>
            </div>
          </div>

          <!-- 评论列表 -->
          <div class="comment-list">
            <!-- 评论内容 -->
            <div>想评论？不存在的！</div>
          </div>

          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="0"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <DetailAside />
    </div>
  </div>
</template>

<script>
import DetailAside from "@/components/post/detailAside";
export default {
  // 添加组件
  components: {
    DetailAside
  },

  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      
      // 把获取到的数据暂存
      articleData: {},

      currentPage4:1,
      handleSizeChange:1,
      handleCurrentChange:2
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },

  mounted() {
    // 获取数据
    this.$axios({
      url: "/posts",
      params: {
        id: 4
      }
    }).then(res => {
      // console.log(res);
      this.articleData = res.data.data[0];
    });
  }
};
</script>

<style lang="less" >
.containers {
  display: flex;
  width: 1000px;
  //   height: 1500px;
  // background-color: aqua;
  margin: 4px auto 0;

  .main {
    //   float: left;
    flex: 70;
    // width: 700px;
    padding-top: 10px;
    //   height: 500px;
    //   background-color: blue;

    h1 {
      margin: 20px 0;
    }

    // 发表时间部分
    .article-time {
      margin: 20px auto;
      text-align: right;

      span {
        color: #998;
        margin: 10px;
      }
    }

    // 文章内容部分
    .article-content {
      // padding-top: 20px;
      max-width: 700px !important;

      p {
        display: block;
        font-size: 16px;
        margin-bottom: 8px;
        // width: 700px;
        span {
          // display: block;
          // width: 700px;

          > img {
            width: 100%;
            
          }
        }
      }
    }

    // 点赞分享部分
    .article-ctrl {
      .ctrl-fater {
        display: flex;
        justify-content: center;
        margin: 30px auto;

        .ctrl-item {
          width: 100px;
          height: 60px;
          // background-color: yellowgreen;
          text-align: center;

          i {
            font-size: 28px;
            color: orange;
          }
        }
      }
    }

    // 评论部分
    .comment {
      // 文本域
      textarea {
        width: 720px;
        height: 50px;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        color: rgba(0, 0, 25, 0.7);
        padding: 5px 15px;
        font-size: inherit;
        box-sizing: border-box;
        // outline: unset;
      }

      // 添加图片和提交
      .add-submit {
        display: flex;
        justify-content: space-between;
      }

      // 评论列表部分代码
      .comment-list {
        width: 100%;
        height: 200px;
        // background-color: aqua;
        border: 1px #998 dashed;
        margin: 10px 0;
        text-align: center;
        line-height: 200px;
      }

      // 分页
      .paging {
        text-align: center;
        margin-bottom: 5px;
      }
    }
  }
}

::-webkit-input-placeholder {
  /*Webkit browsers*/
  color: #998;
  font-size: 16px;
}
</style>


