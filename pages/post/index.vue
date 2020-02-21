<template>
  <div class="main">
        <div class="tab" @mouseleave="handleOver">
              <div class="left">
                     <el-row type='flex' class="item" justify='space-between' align='middle'
                     v-for="(item,index) in navs" :key="index">
                         <span @mouseenter="handleEnter(index)" :class="{active:current===index}">
                             {{item.type}}<i class="el-icon-arrow-right"></i></span>
                     </el-row>
              </div>
              <div class="right" v-if="current!==false">
                  <ul>
                      <li v-for="(item,index) in navs[current].children" :key="index">
         {{index+1}}&nbsp;&nbsp;<Nuxt-link to='#'>{{item.city}}&nbsp;&nbsp;{{item.desc}}</Nuxt-link>
                      </li>
                  </ul>
              </div>
        </div>
        <div class="img">
            <h2>推荐城市</h2><hr>
            <Nuxt-link to='#'>
                <img src="@/static/pic_sea.jpg"  alt="">
            </Nuxt-link>        
        </div>
    <div class="header">
        <el-row type='flex'>
            <!-- <input type="text" placeholder="请输入想去的地方，比如：'广州'">
            <i class="el-icon-search"></i> -->
            <el-input placeholder="请输入想去的地方，比如：'广州'" v-model="city"
            suffix-icon="el-icon-search"></el-input>
        </el-row>
        <el-row class="city">
            <span>推荐:&nbsp;&nbsp;
            <nuxt-link v-for="(city,index) in ['广州','上海','北京']"
             :key="index" :to="`/post/${city}`">{{city}}&nbsp;&nbsp;</nuxt-link>
        </span>
        </el-row>
        <el-row type='flex' justify='space-between' class="title">
            <h2>推荐攻略</h2>
            <el-button type='primary'><i class="el-icon-edit"></i>写游记</el-button>
        </el-row>      
        <hr>
    </div>
    <div class="post">
         <Postlist></Postlist>
    </div>
  </div>
</template>

<script>
import Postlist from '@/components/post/postlist'
export default {
    components:{
        Postlist
    },
    data () {
        return {
            city:'',
            current:false,
            navs:[
                // {
                //     type:'热门城市',
                //     children:[
                //         {No:1,
                //          city:'北京',
                //          desc:' 世界著名古都和现代化国际城市'}, 
                //         {No:2,
                //          city:'广州',
                //          desc:' 粤港澳大湾区、泛珠江三角洲经济区'}, 
                //         {No:3,
                //          city:'上海',
                //          desc:'长江入海口，东隔东中国海'}, 
                //         {No:4,
                //          city:'成都',
                //          desc:'国家历史文化名城'}, 
                //         {No:5,
                //          city:'西安',
                //          desc:'中国国际形象最佳城市之一'},         
                //     ]
                // },
                // {
                //     type:'推荐城市',
                //     children:[
                //         {No:1,
                //          city:'青岛',
                //          desc:'  滨海度假旅游城市'}, 
                //         {No:2,
                //          city:'杭州',
                //          desc:'  西湖十景'}, 
                //         {No:3,
                //          city:'深圳',
                //          desc:'世界影响力的创新创意之都'}, 
                //         {No:4,
                //          city:'广州',
                //          desc:'粤港澳大湾区、泛珠江三角洲经济区'}, 
                //         {No:5,
                //          city:'成都',
                //          desc:'国家历史文化名城'},         
                //     ]
                // },
                // {
                //     type:'奔向海岛',
                //     children:[
                //         {No:1,
                //          city:'秦皇岛',
                //          desc:'   驰名中外的旅游休闲胜地'}, 
                //         {No:2,
                //          city:'青岛',
                //          desc:'  滨海度假旅游城市'}, 
                //         {No:3,
                //          city:'珠海',
                //          desc:'浪漫之城，百岛之市'}, 
                //         {No:4,
                //          city:'深圳',
                //          desc:'世界影响力的创新创意之都'}, 
                //         {No:5,
                //          city:'海口',
                //          desc:' 海滨自然旖旎风光'},         
                //     ]
                // },
                // {
                //     type:'主题推荐',
                //     children:[
                //         {No:1,
                //          city:'海口',
                //          desc:'   海滨自然旖旎风光'}, 
                //         {No:2,
                //          city:'广州',
                //          desc:'  粤港澳大湾区、泛珠江三角洲经济区'}, 
                //         {No:3,
                //          city:'上海',
                //          desc:' 长江入海口，东隔东中国海'}, 
                //         {No:4,
                //          city:'珠海',
                //          desc:'浪漫之城，百岛之市'}, 
                //         {No:5,
                //          city:'西安',
                //          desc:' 中国国际形象最佳城市之一'},         
                //     ]
                // },
            ]
        }
    },

    methods: {
        handleEnter(index){
            this.current=index;
        },
        handleOver(){
            this.current=false;
        }
    },

    mounted () {
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            console.log(res);
            this.navs=res.data.data;
        })


        this.$axios({
            url:'/posts',
            city:this.city
        }).then(res=>{
            console.log(res);
            
        })
    }

}
</script>

<style scoped lang='less'>
.main{
    margin:0 auto;
    width:1200px;
    position: relative;
    
}
.tab{
    margin-top: 30px;
    position:relative;
}
.left{
    width:300px;
   
    position: relative;
    top:0;
    left: 0;
    z-index: 9;
}
.item{
    width:300px;
    height:50px;
    border:1px #ccc solid;

    /* span .active{
        padding-left: 20px;
    } */
}
 .item  .active{
        border-right:none;       
    }
  
.right{
    width:350px;
    height:200px;
    border:1px #ccc solid;
    position:absolute;  
    top: 0;
    left:300px;
    background-color: #ccc;

    /* li {
        margin:25px;
    } */
}
.right li {
        padding:10px;
    }

    .img{
        margin:20px 0;
        width:300px;      
    }

  .img  h2 {
            margin:20px 0;
        }

 .img img{
           width:100%; 
           margin:20px 0;  
        }

  .header{
      position:absolute;
      top:0;
      left:400px;  
      width:800px;
      
  }
  

//   .header input{
//       display: flex;
//       flex:1;
//       height:50px;
//       border:2px solid orange;
//   }
.el-input  /deep/ input{
    
    height:50px;
    border:2px solid orange;
}

  .city{
      margin-top: 10px;
      margin-bottom: 15px;
  }
  .title {
      margin:10px auto;
      h2{
          color:orange;
      }
  }
  .post{
       position: absolute;
       top:200px;
       left:400px;
  }
</style>