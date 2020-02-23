<template>
  <div class="container">
    <el-row type="flex"
            class="row-bg"
            justify="space-between">
      <!-- 主边框 -->
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <!-- 表单域 -->
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="攻略名称:">
            <el-input v-model="form.title"
                      placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="攻略内容:">
            <client-only>
              <vue-editor :editorToolbar="customToolbar"
                          :editorOptions="editorSettings"
                          v-model="form.content"></vue-editor>
            </client-only>
          </el-form-item>
          <el-form-item label="攻略城市:">
            <el-autocomplete v-model="form.city"
                             :fetch-suggestions="queryCitySearch"
                             placeholder="请搜索到达城市"
                             @select="handleCitySelect"
                             @blur="handleCityBlur"
                             class="city"></el-autocomplete>
          </el-form-item>
        </el-form>
        <!-- 提交与保存为草稿 -->
        <el-row type="flex"
                align-item="center">
          <el-button type="primary"
                     @click="handleSubmit">提交</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i>或者</i> &nbsp;
          <el-link type="warning"
                   @click="handleSave">保存到草稿</el-link>
        </el-row>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <div class="draft">
          <h4>草稿箱({{$store.state.create.posts.length}})</h4>
          <div v-for="(item,index) in $store.state.create.posts"
               :key="index"
               class="i-draft">
            <p @click="readDraft(index)">{{item.title}}<i class="el-icon-edit"></i></p>
            <div class="date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        city: ''
      },
      customToolbar: [],
      editorSettings: {},
      // 城市列表
      citys: []
    }
  },

  methods: {
    handleSubmit () {
      if (this.form.title && this.form.content && this.form.city) {
        this.$axios({
          url: '/posts',
          method: 'POST',
          data: this.form,
          headers: { Authorization: `Bearer ` + this.$store.state.user.userInfo.token }
        }).then(res => {
          if (res.data.message == '新增成功') {
            this.$message({
              message: '发布成功',
              type: 'success'
            })
            this.form = {
              title: '',
              content: '',
              city: ''
            }
          }
        })
        // console.dir(JSON.parse(localStorage.getItem('store')))
      } else if (!this.form.title) {
        this.$message.error('请输入标题')
      } else if (!this.form.content) {
        this.$message.error('请输入文章内容')
      } else if (!this.form.city) {
        this.$message.error('请输入你要发布的城市')
      }
    },
    handleSave () {
      let date = moment(new Date()).format("YYYY-MM-DD")
      let data = {
        ...this.form,
        date
      }
      // console.log(data)
      this.$store.commit("create/postSave", data)
      console.log(this.$store.state.create.posts)
    },
    queryCitySearch (value, cb) {
      if (!value) {
        this.city = [];
        cb([]);
        return;
      };
      this.$axios({
        url: "/cities",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        this.citys = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        })
        // console.log(this.citys)
        cb(this.citys)
      })
    },
    handleCitySelect (item) {
      this.form.city = item.value
    },
    handleCityBlur () {
      if (this.citys.length === 0) {
        return
      }
      this.form.city = this.citys[0].value
    },
    readDraft (index) {
      this.form.title = this.$store.state.create.posts[index].title;
      this.form.content = this.$store.state.create.posts[index].title;
      this.form.city = this.$store.state.create.posts[index].title
    }
  }
}


</script>

<style lang="less" scoped>
.container {
  padding: 30px 0;
  width: 1000px;
  margin: 0 auto;
  .main {
    width: 750px;
    h2 {
      font-size: 22px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    i {
      font-size: 14px;
      line-height: 40px;
    }
    .city {
      width: 200px;
    }
  }
  .draft {
    width: 180px;
    padding: 10px;
    border: 1px solid #ccc;
    p {
      cursor: pointer;
      font-size: 14px;
    }
    .i-draft {
      margin-bottom: 5px;
    }
    h4 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>