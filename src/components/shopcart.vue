<template>
		<div class="shopcart">
			<div class="content">
				<div class="chart-icon-wrapper" @click='goList'>
					<div class="chart-icon icon-shopping_cart" :class="{noChart : totalCount != 0}"></div>
					<div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
				</div>
				<div class="delive-fee" @click='goList'>
					<div class="price " :class="{noprice : totalPrice != 0}">￥{{totalPrice}}</div>
					<!-- <div class="chart-icon-line"></div> -->
					<div class="deliveryPrice">另需配送费￥{{deliveryPrice}}</div>
				</div>
				<div class="deliver-base" :class="{deliverOk : totalPrice >= 20}">{{inform}}</div>
			</div>

			<div class="cart-list-wrapper" v-show="showList" ref="cartScroll">
				<div class="cart-gray" @click="goList"></div>
				<div class="cart-list">
					<div class="cart-list-header">
						<span class="cart-title">购物车</span>
						<span class="clear" @click="clearAll">清空</span>
					</div>
					<div class="food-item" v-for="food in selectFoods">
						<span class="food-title">{{food.name}}</span>
						<span class="food-price">{{food.price}}</span>
						<cartcontrol class="cart-control-list" :food=food></cartcontrol>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import axios from "axios";
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from "./cartcontrol";

export default {
	components:{
		cartcontrol
	},
	created () {
	    Vue.nextTick(()=>{
	      this._initScroll()
	    })
    
  	},
	props:{
		deliveryPrice:{
			type:Number, 
		},
		minPrice:{
			type:Number
		},
		selectFoods: {
		     type: Array,
		     default() {
		       return [];
		     }
    	}
	},
	data() {
		return {
			fold:true
		}
	},
	computed:{
		totalCount() {
			let totalCount = 0
			this.selectFoods.forEach((food) => {
				totalCount += food.count
			})
			return totalCount
		},
		totalPrice() {
			let totalNum = 0
			this.selectFoods.forEach((food) => {
				totalNum += food.price * food.count
			})
			return totalNum
		},
		inform() {
			if(this.totalPrice == 0){
				return `￥${this.minPrice}`
			}else if(this.totalPrice > 0 && this.totalPrice < 20){
				return `还差￥${20 - this.totalPrice}起送`
			}else{
				return `去结算`
			}
		},
		showList(){
	      if(!this.totalCount){
	        this.fold = true
	        return false
	      }
	      return !this.fold
	    }
	},
	methods: {
	    goList(){
	      if(!this.selectFoods.length){
	        return
	      }
	      this.fold = !this.fold
	    },
	    clearAll(){
	      this.selectFoods.forEach((food) => {
	        food.count = 0
	      })
	    },
	    _initScroll(){
	      this.scroll = new BScroll(this.$refs.cartScroll,{
	        click: true
	      })
	      this.scroll.on('scroll',(pos) => {})
    }
  }
};

</script>

<style>
		.shopcart{
			position: fixed;
			width: 100%;
			height: 48px;
			bottom: 0;
			left: 0;
			z-index: 100;
		}	
		.shopcart .content{
			width: 100%;
			display: flex;
			background-color: #141d27;
		}
		.shopcart .content .chart-icon-wrapper{
			flex: 0 0 80px;
			position: relative;
		}
		.shopcart .content .chart-icon-wrapper .chart-icon{
			position: relative;
			width: 44px;
			height: 44px;
			border-radius: 50%;
			border: 6px solid #141d27;
			background-color: #2b333b;
			margin-left: 18px;
			margin-top: -10px;
			font-size: 24px;
			color: rgba(255, 255, 255, 0.4);
			line-height: 44px;
			text-align: center;
		}
		.shopcart .content .chart-icon-wrapper .total-count{
			position: absolute;
			right: 0px;
			top: -6px;
			text-align: center;
			background-color: red;
			color: #ffffff;
			width: 24px;
			height: 16px;
			font-size: 8px;
			font-weight: 700;
			line-height: 16px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
			border-radius: 16px;
		}

		.shopcart .content .chart-icon-wrapper .noChart{
			background-color: #00a0dc;
			color: #fff;
		}
		.shopcart .content .delive-fee{
			flex: 1;
			padding: 12px 0 12px 12px;

		}

		

		.shopcart .content .delive-fee .price{
			display: inline-block;
			line-height: 24px;
			color: rgba(0, 0, 0, 0.2);
			padding-right: 12px;
			border-right:1px solid rgba(0, 0, 0, 0.4);
		}

		/* .shopcart .content .delive-fee .chart-icon-line{
			display: inline-block;
			border-right: 1px solid #fff;
		}	 */

		.shopcart .content .delive-fee .noprice{
			color: #ffffff;
		}
		.shopcart .content .delive-fee .deliveryPrice{
			display: inline-block;
			padding-left: 12px;
			font-size: 12px;
			color: rgba(255, 255, 255, 0.4);
			font-weight: 700;

		}
		
		.shopcart .content .deliver-base{
			flex: 0 0 105px;
			padding: 0 8px;
			line-height: 48px;
			font-size: 12px;
			text-align: center;
			color: rgba(255, 255, 255, 0.1);
			font-weight: 700;
			background-color: #2b333b;
		}
		
		.shopcart .content .deliverOk{
			flex: 0 0 105px;
			padding: 0 8px;
			line-height: 48px;
			font-size: 12px;
			text-align: center;
			font-weight: 700;
			background-color: green;
			color: #fff;
		}

		.shopcart .cart-list-wrapper{
			position: fixed;
			top: 0px;
			width: 100%;
			bottom: 48px;
			display: flex;
			flex-direction: column;
			z-index: -1;
		}

		.shopcart .cart-list-wrapper .cart-gray{
			flex: 1;
			background-color: rgba(7, 17, 27, 0.6);
		}

		.shopcart .cart-list-wrapper .cart-list{
			width: 100%;
			position: fixed;
			bottom: 48px;
			left: 0;
			background-color: #ffffff;
			overflow: auto;
			max-height: 217px;
		}
		.shopcart .cart-list-wrapper .cart-list-header {
			height: 40px;
			line-height: 40px;
			padding: 0 18px;
			border: 1px solid rgba(7, 17, 27, 0.1);
			background-color: #f3f5f7;
		}

		.shopcart .cart-list-wrapper .cart-list-header .cart-title{
			font-size: 14px;
			font-weight: 200;
			color: rgb(7, 17, 27);
		}
		.shopcart .cart-list-wrapper .cart-list-header .clear{
			position: absolute;
			right: 18px;
			font-size: 12px;
			color: rgb(0, 160, 220);
		}

		.shopcart .cart-list-wrapper .food-item{
			position:relative;
			width: 100%;
			height: 48px;
			line-height: 48px;
			margin: 0 18px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		}

		.shopcart .cart-list-wrapper .food-item .food-title{
			font-size: 14px;
			color: rgb(7, 17, 27);
		}
		.shopcart .cart-list-wrapper .food-item .food-price{
			position: absolute;
			right: 120px;
			font-size: 10px;	
		}

		.shopcart .cart-list-wrapper .food-item .cart-control-list{
			position: absolute;
			right: 18px;
			top: 6px;
			display: inline-block;
		}



</style>