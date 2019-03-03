<template>
		<div id="cart-control">
			<span class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click="remove"></span>
			<span class="count" v-show="food.count > 0">{{food.count}}</span>
			<span class="increase icon-add_circle" @click="add($event)"></span>
		</div>
</template>


<script type="text/javascript">
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			//绑定了一个bscroll插件
			add(event) {
				if(event._constructed){
					if(!this.food.count){
						Vue.set(this.food, "count")
						this.food.count = 1
					}else{
						this.food.count ++
					}
				}
			},
			remove(event) {
				if(event._constructed){
					if(this.food.count === 0){
						return
					}
					this.food.count --
				}
			}
		}
	}
</script>

<style type="text/css">
			#cart-control{
				font-size: 0;

			}
			#cart-control .icon-remove_circle_outline, .icon-add_circle{
				display: inline-block;
				width: 24px;
				height: 24px;
				line-height: 24px;
				font-size: 24px;
			}

			#cart-control .increase, .decrease{
				padding: 6px;
				display: inline-block;
				line-height: 24px;
				color: #00a0dc;
				font-size: 24px;
			}
			#cart-control .count{
				display: inline-block;
				text-align: center;
				width: 12px;
				font-size: 10px;
				color: rgb(147, 153, 159);
				line-height: 24px;
				padding-top: 6px;
				vertical-align: top;
			}

</style>