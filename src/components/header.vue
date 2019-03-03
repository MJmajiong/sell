<template>
 	<div class="wrapper">
		<div class="content-wrapper">
			<div class="content">
			<div class="avatar">
				<img :src="seller.avatar" class="img-avatar">
			</div>
			<div class="seller-message">
				<div class="message-name">
					<span><img src="../resource/img/brand@2x.png" height="18" width="30" alt=""></span>
					<span>{{seller.name}}</span>
				</div>

				<div class="seller-send">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>

				<div class="message-favourable">
					<span><img src="../resource/img/discount_2@2x.png" height="16" width="16" alt=""></span>
					<span v-if="seller.supports" class="message-pay">{{seller.supports[0].description}}</span>
				</div>
				<div class="num-wrapper" v-if='seller.supports'>
					<span class="num">{{seller.supports.length}}个</span>
					<span class="icon-keyboard_arrow_right more"></span>
					<!-- <span clas="icon-keyboard more"> &gt;</span> -->
				</div>
			</div>
			</div>
		</div>
		
			<div class="public-content">
				<span class="bulletin-icon"><!-- <img src="../resource/img/bulletin@3x.png" height="15" width="22"> --></span>
				<span class="buttetin ">{{seller.bulletin}}</span>
				<span class="icon-keyboard_arrow_right"></span>     <!--  用这种方法写那个向右的小图标可以，用桌面上那个static文件夹中的那个方法也行，由于icon-keyboard_arrow_right是用伪元素来操作的，所以一定要操作父元素单行打点，然后才能将小图标通过absolute的方式出现在该出现的位置 -->

			</div>

		
		<div class="background">
			<img :src="seller.avatar" alt="">
		</div>
 	</div>
</template>

<script>
import axios from 'axios'
export default {
  	props:{
  		seller:{
  			type:Object
  		}
  	},
  	created() {
  		console.log(this.seller.score)
  	}
}
</script>

<style scoped>

		.wrapper{
			
			width: 100%;
		}
		

		.content{
			
			position: relative;
			background-color: rgba(7, 17, 27, 0.5);
			/* blur: 10px; */
			padding-top: 24px;
			padding-left: 24px;
			padding-bottom: 18px;
		}
		
		.content .avatar{
		
			float: left;
			padding-right: 16px;

		}
		.content .avatar .img-avatar{
			width: 64px;
			height: 64px;
		}
		
		.content .seller-message .message-name{
			display: inline-block;
			height: 18px;
			line-height: 18px;
		}
		.content .seller-message .message-name span{
			font-size: 16px;
			color: rgb(255, 255, 255);
			font-weight: bold;
			vertical-align: top;
		}

		.content .seller-message .seller-send{
			display: inline-block;
			font-size: 12px;
			color: rgb(255, 255, 255);
			font-weight: 100;
			line-height: 12px;
			margin-top: 8px;
		}
		
		.content .message-favourable{
			margin-top: 5px;
		}

		.content .message-favourable span{
			color: rgb(255, 255, 255);
			font-size: 10px;
			font-weight: 100;
			vertical-align: middle;
		}

		
		.bulletion-wrapper{
			height: 28px;
			width: 100%;
			background-color: rgba(7, 17, 27, 0.2);
		}
	
		.content .num-wrapper{
			color: rgb(255, 255, 255);
			position: absolute;
			right: 12px;
			bottom: 14px;
			padding: 7px 8px;
			font-size: 10px;
			border-radius: 12px;
			background-color: rgba(0, 0, 0, 0.2);
			height: 12px;
			line-height: 12px;
		}

		.content .num-wrapper .num{
			width: 24px;
			margin-right: 2px;
		}
		
		.public-content{
			position: relative;
			height: 28px;
			/* width: 100%; */
			background-color: rgba(7, 17, 27, 0.2);
			padding: 0 12px 0 12px;
			line-height: 28px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			color: white;
			font-size: 10px;
		}
		
		.public-content .bulletin{
			margin-left: 4px;
			margin-right: 4px;
			vertical-align: middle;
		}
		
		
		.public-content .bulletin-icon{
			margin-left: 12px;
			display: inline-block;
			width: 22px;
			height: 12px;
			background-image: url('../resource//img/bulletin@3x.png');
			background-size: 22px 12px;
			vertical-align: middle;
		}
		.public-content .icon-keyboard_arrow_right{
			position: absolute;
			right: 8px;
			bottom: 8px;
		}
		
		.background{
			
			position: absolute;
			top: 0;
			left: 0;
			background: url({{seller.avatar}});
			z-index: -1;
			width: 100%;
			filter: blur(10px);             /* 模糊效果 */
		}
		.background img{
			background-size: cover;         /* 将图片铺开 */
			width: 100%;
			height: 134px;
		}
		

	
</style>