<template>
<div class="articlelist">
  <div v-if="item.images.length>=3">
       <h2><nuxt-link to='#'>{{item.title}}</nuxt-link></h2>
       <p v-html="item.summary" class="article"></p>   
       <el-row class="img" type='flex'>
         <nuxt-link  v-for="(each,index) in item.images" :key="index" to='#'>
         <img :src="each" alt=""></nuxt-link></el-row>
         <div class="info">
           <el-row type='flex' justify='space-between' algin='middle' class="userinfo">
             <span><i class="el-icon-location-outline"></i>
             {{item.cityName}}&nbsp;by&nbsp;
             <nuxt-link to='#'><img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt=""></nuxt-link>&nbsp;
             <nuxt-link to='#'>{{item.account.nickname}}</nuxt-link>
             &nbsp;<i class="el-icon-view"></i>&nbsp;{{item.watch}}</span>
             <p>{{item.like}}&nbsp;赞</p>
           </el-row>
         </div>
  </div>
  <hr>

  <div v-if="1<=item.images.length&&item.images.length<3">
    <el-row type='flex'>
       <div class="img">
      <nuxt-link to='#'><img :src="item.images[0]" alt="" v-if="item.images.length===1"></nuxt-link>
         <nuxt-link to='#' v-for="(each,index) in item.images" :key="index">
           <img :src="each" alt="" v-if="item.images.length===2"></nuxt-link>
       </div>
       <div class="content">
           <h2><nuxt-link to='#'>{{item.title}}</nuxt-link></h2>
           <p v-html="item.summary" class="article"></p>
           <div class="info">
           <el-row type='flex' justify='space-between' algin='middle' class="userinfo">
             <span><i class="el-icon-location-outline"></i>
             {{item.cityName}}&nbsp;by&nbsp;
             <nuxt-link to='#'><img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt=""></nuxt-link>&nbsp;
             <nuxt-link to='#'>{{item.account.nickname}}</nuxt-link>
             &nbsp;<i class="el-icon-view"></i>&nbsp;{{item.watch}}</span>
             <p>{{item.like}}&nbsp;赞</p>
           </el-row>
         </div>
       </div>
    </el-row>
  </div>
   <hr>

   <div v-if="item.images.length<1">
       <h2><nuxt-link to='#'>{{item.title}}</nuxt-link></h2>
       <p v-html="item.summary" class="article"></p>   
       
         <div class="info">
           <el-row type='flex' justify='space-between' algin='middle' class="userinfo">
             <span><i class="el-icon-location-outline"></i>
             {{item.cityName}}&nbsp;by&nbsp;
             <nuxt-link to='#'><img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt=""></nuxt-link>&nbsp;
             <nuxt-link to='#'>{{item.account.nickname}}</nuxt-link>
             &nbsp;<i class="el-icon-view"></i>&nbsp;{{item.watch}}</span>
             <p>{{item.like}}&nbsp;赞</p>
           </el-row>
         </div>
  </div>
  <hr>

</div>
</template>

<script>
export default {
  props: {
     item:{
          type:Object,
          default:{}
     }
  }

}
</script>

<style scoped lang='less'>
/* .articlelist{
  width:
} */

// img{
//   width:100%;
//   // display: flex;
//   // flex:1;
// }

.userinfo {
  //  span{
  //   //  display: flex;
  //  }
   
   img {
     width:20px;
     height:20px;
   }
}

.article{
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 3;
             overflow: hidden;
             margin:10px 0;
}

.articlelist div{
  margin:30px 0;
}

.img{
  // float:left;
    img{
      width:100%;
    }
}
// .content{
//     // float:right;
//     margin-left: 10px;
// }
</style>