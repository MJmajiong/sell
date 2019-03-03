<template>
  <div id="app">
   		<v-header :seller="seller"></v-header>
   		<div class="tab">
   			<div class="tab-item"><router-link :to="{name:'goods'}">商品</router-link></div>
   			<div class="tab-item"><router-link to='/ratings'>评价</router-link></div>
   			<div class="tab-item"><router-link to='/seller'>商家</router-link></div>
   		</div>
   		<hr>
		<div class="wrapper">
			<router-view :seller="seller"></router-view>	
		</div>
   		
  </div>
</template>

<script>
import header from '@/components/header'
import goods  from '@/components/goods'
import axios from 'axios'
export default {
  name: 'App',
  data() {
  	return {
  		seller:{}
  	}
  },
  components:{
  	'v-header':header,
  	goods
  },
  created () {
  	axios.get('/good/seller').then(
  			res=>{
  				console.log(res)
  				if(res.data.code === 0){
  					this.seller = res.data.data
  				}
  				console.log(this.seller)
  			}
  		)
  }

}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
	}
	.tab{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.tab-item{
		flex: 1;
		height: 40px;
		font-size: 14px;
		text-align: center;
	}
	hr{
		color: black;
		font-size: 22px;
	}
</style>
