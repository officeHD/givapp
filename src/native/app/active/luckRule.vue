<template>
<div class="wrapper">
  <head title="Rule"></head>
  <empty v-if="!rullerTxt" tips="Rule is empty"></empty>
  <scroller class="ruleList" :show-scrollbar="false">
    <text>{{rullerTxt}}</text>
  </scroller>
</div>
</template>
<script>
export default {
  data() {
    return {
      rullerTxt: ""
    };
  },
  methods: {
    onLoad(parmar) {
      this.log(parmar);
      this.rullerTxt = parmar.data;
    }
  }
};
</script>
<style  scoped>
.wrapper {
  background-color: #fff;
}
.ruleList {
  padding: 32px;
  flex: 1;
}
.title {
  font-size: 30px;
  color: #333;
  line-height: 42px;
  margin-bottom: 20px;
}
.item {
  margin-bottom: 15px;
  font-size: 24px;
  line-height: 33px;
  color: #666666;
}
</style>