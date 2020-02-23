<template>
  <div class="main clearfix">

      <div class="leftside">
        <div class="tab" @mouseleave="handleOver">
              <div class="left">
                     <el-row type='flex' class="item" justify='space-between' align='middle'
                     v-for="(item,index) in navs" :key="index">
                         <span @mouseenter="handleEnter(index)" :class="{active:current===index}">
                             {{item.type}}</span><i class="el-icon-arrow-right"></i>
                     </el-row>
              </div>
              <div class="right" v-if="current!==false">
                  <ul>
                      <li v-for="(item,index) in navs[current].children" :key="index">
         {{index+1}}&nbsp;&nbsp;
         <!-- <Nuxt-link to='#'>{{item.city}}&nbsp;&nbsp;{{item.desc}}</Nuxt-link> -->
         <a href="Javascript:;" @click="getpostlist(item.city)">{{item.city}}&nbsp;&nbsp;{{item.desc}}</a>
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
     </div>

   <div class="rightside">
       <div class="header">
        <el-row type='flex' class="searchtab">
            <!-- <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="city">
            <i class="el-icon-search"></i> -->
            <!-- <el-input placeholder="请输入想去的地方，比如：'广州'" v-model="city"
            suffix-icon="el-icon-search"></el-input> -->
            <el-input placeholder="请输入想去的地方，比如：'广州'"  v-model="city">    
            <i slot="suffix" class="el-input__icon el-icon-search" @click='getpostlist(city)'></i>
            </el-input>
        </el-row>
        <el-row class="city">
            <span>推荐:&nbsp;&nbsp;
            <!-- <nuxt-link v-for="(city,index) in ['广州','上海','北京']"
             :key="index" :to="`/post/${city}`">{{city}}&nbsp;&nbsp;</nuxt-link> -->
             <a href="Javascript:;" :key="index" @click="getpostlist(city)"
             v-for="(city,index) in ['广州','上海','北京']">{{city}}&nbsp;&nbsp;</a>
        </span>
        </el-row>
        <el-row type='flex' justify='space-between' class="title">
            <h2>推荐攻略</h2>
            <el-button type='primary'><i class="el-icon-edit"></i>写游记</el-button>
        </el-row>      
        <hr>
       </div>
       <div class="post">
         <Postlist v-for="(data,index) in datalist" 
         :key="index" :item='data'></Postlist>
       </div>

           <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
            // articlelist:[],
            total:0,
            pageSize:3,
            currentPage:1,
            datalist:[],
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
        },
         handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize=val;
          this.currentPage=1;
        //   this.$router.replace({
        //       url:this.$route.path,
        //       query:{
        //           start:this.pageSize*(this.currentPage-1),
        //           limit:this.pageSize
        //       }
        //   })
          this.getpostlist(this.city);
      },
       handleCurrentChange(val) {
        //    console.log(`当前页: ${val}`);
        //    this.currentPage=val;
           this.getpostlist(this.city,val);
        //    this.$router.replace({
        //        url:this.$route.path,
        //        query:{
        //            city:this.city,
        //            start:this.pageSize*(this.currentPage-1),
        //            limit:this.pageSize
        //        }
        //    });
              
        //    this.articlelist=this.datalist.slice(this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
            // let start=this.pageSize*(this.currentPage-1);
            // let limit=this.pageSize;
            //  this.articlelist=this.datalist.slice
            //     (start,limit)
      },


      getpostlist(city,val){
          console.log(city);         
          this.city=city;
          if(val){
              this.currentPage=val;
          }else{
              this.currentPage=1;
          }
          
          if(city){
                this.$axios({
            url:'/posts',
            params:{
                city:city,
                _start:this.pageSize*(this.currentPage-1),
                _limit:this.pageSize}
        }) .then(res=>{
            console.log(res);
            this.datalist= res.data.data;
            console.log(this.datalist);         
            this.total= res.data.total;
            this.$router.replace({
               url:this.$route.path,
               query:{
                   city:this.city,
                   start:this.pageSize*(this.currentPage-1),
                   limit:this.pageSize
               }

           });
           
        }) } else {
             this.$axios({
            url:'/posts',
            params:{               
                _start:this.pageSize*(this.currentPage-1),
                _limit:this.pageSize}
           }) .then(res=>{
            console.log(res);
            this.datalist= res.data.data;
            this.total= res.data.total;
        })
        }       
         
      }
    },

    mounted () {
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            console.log(res);
            this.navs=res.data.data;
        })

       this.getpostlist();
        
    },

    
    // computed: {
    //     articlelist(){
    //         let start=this.pageSize*(this.currentPage-1);
    //         let limit=this.pageSize;
    //           const arr=this.datalist.slice
    //             (start,limit)
                 
                  
    // //             //    {start:this.pageSize*(this.currentPage-1)},
    // //             //    {limit:this.pageSize}
    // //         //   (this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
    //           return arr;
    //     }
    // }

}
</script>

<style scoped lang='less'>
.main{
    margin:0 auto;
    width:1200px;
    position: relative;
    // height: 2000px;
    // display:flex;
}
.leftside{
    float:left;
}
.rightside{
    float:right;
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
    span{
        margin-left: 10px;
    }

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
    left:299px;
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
    //   position:absolute;
    //   top:30px;
    //   left:400px;  
      width:800px;
      margin-top: 30px;
      
  }
  

//   .searchtab input{
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
    //    position: absolute;
    //    top:200px;
    //    left:400px;
       width:800px;
  }
</style>