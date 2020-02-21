<template>
  <div v-if='type===3'>
       <h2><nuxt-link to='#'>{{item.title}}</nuxt-link></h2>
       <p v-html="item.summary"></p>
       <nuxt-link  v-for="(each,index) in item.images" :key="index" to='#'>
         <img :src="each" alt=""></nuxt-link>
         <div class="info">
           <el-row>
             <span><i class="el-icon-location-outline"></i>
             {{item.cityName}}&nbsp;by&nbsp;
             `${$axios.defaults.baseURL}${item.account.defaultAvatar}`
             &nbsp;<i class="el-icon-view"></i>&nbsp;{{item.watch}}</span>
           </el-row>
         </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>