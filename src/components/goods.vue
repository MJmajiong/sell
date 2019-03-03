<template>
 	<div class="goods">
 		<!-- $refs  相当于jq中的   var elm=$('')-->
 		<div class="menu-wrapper" ref="menuWrapper">
 			<div>
 				<div v-for="(item, index) in goods" :key="index" class="menu-item" :class="{current : currentIndex === index}"  @click="selectIndex(index, $event)">
 				<div class="text-wrapper" >
 					<span class="icon" v-show="item.type > 0" ><img src="../resource/img/discount_3@2x.png" height="12" width="12"></span>
 					<span class="text">{{item.name}}</span>
 				</div>
 				<hr>
 				</div>
 			</div>
 		</div>
 		<div class="foods-wrapper" ref="foodsWrapper">
 			<ul>
 				<li v-for="(items, index) in goods" :key="index" class="foods-list-hook">
 					<div class="item-title">{{items.name}}</div>
 					<ul>
 						<li v-for="(item2, index) in items.foods" :key="index" class="items-content-wrapper">
 							<div class="items-icon">
 								<img :src="item2.icon">
 							</div>
 							<div class="items-content">
 								<div class="items-name">{{item2.name}}</div>
 								<div v-show="item2.description" class="items-description">{{item2.description}}</div>
 								<div class="ratings">
 									<span>月售{{item2.sellCount}}份</span>
 									<span style="margin-left: 12px">好评率{{item2.rating}}%</span>
 								</div>
 								<div class="prices">
 									<span class="price">{{item2.price}}</span><span v-if="item2.oldPrice" style="margin-left:8px" class="oldPrice">{{item2.oldPrice}}</span>
 								</div>
 								<div class="cart-control-wrapper">
 									<cartcontrol :food=item2> </cartcontrol>
 								</div>
 							</div>
 						</li>
 					</ul>
 				</li>
 			</ul>
 		</div>
 		<shopcart :selectFoods="selectFoods" :deliveryPrice = "seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
 	</div>
</template>

<script>
import axios from "axios"
import Vue from 'vue'
import BScroll from 'better-scroll'
import shopcart from './shopcart.vue'
import cartcontrol from './cartcontrol'
export default {

  	name:'goods',
  	props:{
  		seller:{
  			type: Object
  		}
  	},
  	data() {
  		return {
  			goods:[],
  			heightList:[],
  			scrollY:0,
  			a:[]
  		};
  	},
  	components:{
  		shopcart,
  		cartcontrol
  	},
  	created() {
  		
  		axios.get('/good/goods').then(
  			res=>{
  				console.log(res)
  				if(res.data.code === 0){
  					this.goods = res.data.data;
  					Vue.nextTick(()=>{
  						this._initscroll()
  						this._caculateHeight()
  						//dom绑定一个scroll
  						//计算一下foods的高度
  					})
  				}
  			}
  		)
  	},
  	methods:{
  		selectIndex($index, $event){
  			console.log($event)
  			if(!$event._constructed){      //如果不存在这个属性，则为原生点击事件，不执行下面的函数
  				return
  			}
  			let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
  			this.foodsScroll.scrollToElement(foodList[$index], 300)
  		},
  		_initscroll() {
  			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
  				probeType:3,
  				click:true
  			})
  			this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
  				probeType:3,
  				click:true
  			})
  			let _this = this;
  			this.foodsScroll.on('scroll', (pos) => {
  				console.log(pos)
  				_this.scrollY = Math.abs(Math.round(pos.y))
  			})
  		},
  		_caculateHeight() {
  			let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
  			let height = 0
  			this.heightList.push(height)
  			for(let i = 0; i < foodsList.length; i++){
  				let item = foodsList[i]
  				height += item.clientHeight
  				this.heightList.push(height)
  			}

  		}
  	},
  	computed: {
  		currentIndex(){
  			for(let i = 0; i < this.heightList.length; i++){
  				let height1 = this.heightList[i]
  				let height2 = this.heightList[i + 1]
  				if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
  					return i
  				}
  				// if(this.scrollY >= height1 && this.scrollY < height2){
  				// 	return i
  				// }
  			}
  			return 0
  		},
  		 selectFoods() {
  		 	let foods = [];
  		 	if(this.goods.length !== 0){
  		 		this.goods.forEach(good => {
  		 			good.foods.forEach(food => {
  		 				if(food.count){
  		 					foods.push(food)
  		 				}
  		 			})
  		 		});
  		 	}
  		 	return foods
  		 }

  	}
}
</script>

<style scoped>
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 48px;
		left: 0;
		right: 0;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-wrapper{
		flex: 0 0 80px;
		/* width: 80px; */
		background-color: #f3f5f7;
	}

	

	

	.goods .menu-wrapper .menu-item{

		padding: 0 12px;
		font-size: 0;
		line-height: 16px;
	}

	.goods .menu-wrapper   .current{
		/* display: none; */
		/* position: relative; */
		margin-top: -1px;
		background-color: #ffffff;
		font-size: 12px;
		line-height: 14px;
		font-weight: 500;
	}

	.goods .menu-wrapper  .current::after{
		border-top: 1px solid #fff;
		font-weight: 200;
	}

	.goods .menu-wrapper .menu-item .text-wrapper{
		display: table-cell;
		vertical-align: middle;
		height: 54px;
		width: 56px;
		
	}

	.goods .menu-wrapper .menu-item .text-wrapper .text{
		font-size: 12px;
		line-height: 14px;
		font-weight: 200;

	}
	.goods .menu-wrapper .menu-item  hr{
		color: #ccc;
		opacity: 0.1;
	}
	.goods .foods-wrapper{
		flex: 1;
		background-color: rgb(255, 255, 255);
	}
	.foods-wrapper .foods-list-hook .item-title{
		height: 26px;
		padding-left: 14px;
		font-size: 12px;
		color: rgb(147, 153, 159);
		line-height: 26px;
		background-color: #f3f5f7;
		border-left: 4px solid #d9dde1;
	}
	
	.foods-wrapper .foods-list-hook .items-icon{
		flex: 0 0 57px;
	}

	.foods-wrapper .foods-list-hook .items-icon img{
		width: 57px;
		height: 57px;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper{
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		position: relative;
		background-color: rgba(255, 255, 255, 0.1);
		border-bottom:1px solid #DBDEDE ;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content{
		flex: 1;
		padding-left: 10px;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .items-name{
		font-size: 14px;
		color: rgb(7, 17, 27);
		line-height: 14px;
		margin-top: 2px;
	}
	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .items-description, .ratings{
		margin-top: 8px;
		font-size: 10px;
		color: rgb(147, 153, 159);
		line-height: 16px;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .ratings span{
		display: inline-block;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .price{
		font-size: 20px;
		color: rgb(240, 20, 20);
		font-weight: 700;
		line-height: 24px;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .oldPrice{
		font-size: 10px;
		vertical-align: top;
		color: rgb(147, 153, 159);
		font-weight: 700;
		line-height: 20px;
		text-decoration: line-through;
	}

	.foods-wrapper .foods-list-hook .items-content-wrapper .items-content .cart-control-wrapper{
		position: absolute;
		right: 0;
		bottom: 12px;
	}





</style>