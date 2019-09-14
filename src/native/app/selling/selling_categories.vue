<template>
<div class="wrapper">
  <head title="Categories"></head>
  <scroller class="scroller">
    <text
      class="listItem"
      v-for="(item,index) in cateList"
      :key="index"
      @click="select(item)"
    >{{item.name}}</text>
  </scroller>
</div>
</template>

<script>
import { get_category_list } from "../../mixin/ajax.js";

export default {
  data() {
    return {
      cateList: []
    };
  },
  methods: {
    onLoad(parmar) {
      get_category_list({ type: 2, parentid: 0 }, (res, flag) => {
        if (res.code == 200) {
          this.cateList = res.data;
        }
      });
    },
    select(item) {
      this.log(item);
      const selectCategary = new BroadcastChannel("selectCategary");
      selectCategary.postMessage(item);
      this.back();
    }
  }
};
</script>

<style>
.listItem {
  width: 750px;
  height: 100px;
  padding-left: 32px;
  line-height: 100px;
  font-size: 30px;
  border-bottom-color: #e6e6e6;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
</style>
