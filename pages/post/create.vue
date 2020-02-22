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
          <el-form-item label="攻略名称:"
                        prop="title">
            <el-input v-model="form.title"
                      placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="攻略内容:"
                        prop="content">
            <client-only>
              <vue-editor :editorToolbar="customToolbar"
                          :editorOptions="editorSettings"
                          v-model="form.content"></vue-editor>
            </client-only>
          </el-form-item>
          <el-form-item label="攻略城市:"
                        prop="city">
            <el-input v-model="form.city"
                      placeholder="请选择游玩城市"
                      class="city"></el-input>
          </el-form-item>
        </el-form>
        <!-- 提交与保存为草稿 -->
        <el-button type="primary"
                   @click="handleSubmit">提交</el-button>
        <span>
          或者
          <el-link type="warning">警告链接</el-link>
        </span>
      </div>
      <div class="aside">
        <div class="draft-box">
          <h4>草稿箱<span>(1)</span></h4>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        city: ''
      },
      customToolbar: [],
      editorSettings: {}
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
          console.log(res.data)
        })
        console.dir(JSON.parse(localStorage.getItem('store')))
      } else if (!this.form.title) {
        this.$message.error('请输入标题')
      } else if (!this.form.content) {
        this.$message.error('请输入文章内容')
      } else if (!this.form.city) {
        this.$message.error('请输入你要发布的城市')
      }

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
    .city {
      width: 200px;
    }
  }
  .aside {
    width: 200px;
    .draft-box {
      padding: 3px;
      border: 1px solid #ccc;
      h4 {
        font-weight: normal;
      }
    }
  }
}
</style>