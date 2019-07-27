<template>
	<div>
   <head :back="true" bgcolor="#303030" title="Payment successful"></head>
		<div class="icon">
        <text class="iconfont">&#xe60d;</text>
        <text class="status">Payment successful </text> 
        <text class="btn" @click="returnpage">Return</text>
        <text class="btn">View orders</text>
	 
		</div>
   
	</div>
</template>

<script>
const navigator = weex.requireModule('navigator') ;
export default {
  data() {
    return {
      amount: 0
    };
  },
  onLoad(e) {
    this.amount = parseFloat(e.amount).toFixed(2);
  },
  methods: {
    returnpage() {
      navigator.backTo('A')
    }
  }
};
</script>

<style  scoped>
.icon {
  width: 750px;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.iconfont {
  font-family: iconfont;
  font-size: 300px;
  color: #4ab440;
}
.status {
  color: #4ab440;
  font-size: 34px;
  margin-top: 50px;
  margin-bottom: 160px;
}

.btn {
  width: 400px;
  height: 80px;
  line-height: 80px;
  border-radius: 80px;
  background-color: #303030;
  color: #fff;
  text-align: center;
  font-size: 30px;
  margin-top: 88px;
}
</style>
