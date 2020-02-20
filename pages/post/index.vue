<template>
  <el-container>
  <el-aside width="350px">
      <el-row>
        <el-col :span="24">
    <el-menu
      :router='true'
      :unique-opened="true"
      default-active="1"
      class="el-menu-vertical-demo"
     
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-row v-for="(item,index) in navs" :key="index">
      <el-submenu index="item.index" >
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span>{{item.text}}</span>
        </template>    
          <el-menu-item index="item1.index" 
          v-for="(item1,index1) in item.children" :key="index1">
            {{item1.text}}</el-menu-item>
          <!-- <el-menu-item index="1-2">2&nbsp;&nbsp;广州&nbsp;&nbsp;粤港澳大湾区、泛珠江三角洲经济区</el-menu-item>
          <el-menu-item index="1-3">3&nbsp;&nbsp;上海&nbsp;&nbsp;长江入海口，东隔东中国海</el-menu-item>
          <el-menu-item index="1-4">4&nbsp;&nbsp;成都&nbsp;&nbsp;国家历史文化名城</el-menu-item>
          <el-menu-item index="1-5">5&nbsp;&nbsp;西安&nbsp;&nbsp;中国国际形象最佳城市之一</el-menu-item> -->
      </el-submenu>   
      </el-row>  
    </el-menu>
    <div class="img">
      <p>推荐城市</p><hr/>
      <nuxt-link to='#'>
        <img src="@/static/pic_sea.jpg" alt="">
      </nuxt-link>
    </div>
  </el-col>
</el-row>
  </el-aside>
  <el-container>
    <el-header>
      <div class="header">
        <el-row type='flex'>
        <input type="text" :placeholder="item" v-model="item"><i class="el-icon-search"></i>   
        </el-row>
        <span>推荐: 
          <!-- <a href="Javascript:;" ></a> -->
          <nuxt-link to='#' 
          v-for="(item,index) in ['广州','上海','北京']" :key="index"> 
           {{item}}
          </nuxt-link>      
        </span>
        <el-row  type='flex' justify='space-between'>
          <h2>推荐攻略</h2>
          <el-button type='primary'>写游记</el-button>
        </el-row>
      </div>
    </el-header>
    <el-main></el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  data () {
    return {
          item:'',
        
          navs:[
            {
              index:1,
              text:'热门城市',
              children:[
                {index:1-1,
                 text:`1 北京 世界著名古都和现代化国际城市`},
                {index:1-2,
                 text:'2 广州 粤港澳大湾区、泛珠江三角洲经济区'},
                {index:1-3,
                 text:'3 上海 长江入海口，东隔东中国海'},
                {index:1-4,
                 text:'4 成都 国家历史文化名城'},
                {index:1-5,
                 text:'5 西安 中国国际形象最佳城市之一'}
              ]
            },
            {
              index:2,
              text:'推荐城市',
              children:[
                {index:2-1,
                 text:`1 青岛 滨海度假旅游城市`},
                {index:2-2,
                 text:'2 杭州 西湖十景'},
                {index:2-3,
                 text:'3 深圳 世界影响力的创新创意之都'},
                {index:2-4,
                 text:'4 广州 粤港澳大湾区、泛珠江三角洲经济区'},
                {index:2-5,
                 text:'5 成都 国家历史文化名城'}
              ]
            }
          ]
    }
  },
  methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // }
     
    }

}
</script>

<style>
.img p{
  padding-top:20px;
  padding-bottom:20px;
}
.img img{
  width:100%;
}
.header input{
    display: flex;
    flex:1;
    height:40px;
    border:2px solid orange;
}
.el-submenu span:hover{
         color:yellow;
}
  /* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  } */
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>