<template>
  <div class="semp-city">
    <div class="has-choose-box flex-row pad-left">
      <text
        class="has-choose"
        v-if="index<=showRank"
        :class="[index==showRank?'active':'']"
        v-for="(item,index) in cityList"
        :key="index"
        @click="onRankClick(index)"
      >{{item.name!='0'?item.name:'请选择'}}</text>
    </div>
    <div>
      <scroller class="city-item-box" scroll-y="true">
        <div
          class="city-item pad-left flex-row"
          :class="item.areaCode==valueObj[cityList[showRank].identify].value?'active':''"
          v-for="(item,index) in cityList[showRank].showList"
          :key="index"
          @click="onChooseClick(item)"
        >
          <text>{{item.areaName}}</text>
          <div v-if="item.areaCode==valueObj[cityList[showRank].identify].value">
            <!-- <semp-icon type="gou" color="#0faeff" size="26"></semp-icon> -->
          </div>
        </div>
        <div class="city-item pad-left flex-row" @click="onChooseClick(other)" v-if="showRank>1">
          <text>其它(如没有你的镇区，街道请在详细地址输入)</text>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { cityData } from "./area.js";
export default {
  data() {
    return {
      other: {
        label: "",
        value: "0"
      },
      showRank: 0,
      cityList: [
        {
          identify: "province",
          name: "0",
          showList: cityData
        },
        {
          identify: "city",
          name: "0",
          showList: []
        },
        {
          identify: "county",
          name: "0",
          showList: []
        },
        {
          identify: "town",
          name: "0",
          showList: []
        }
      ],
      valueObj: {
        province: {
          label: "",
          value: "0"
        },
        city: {
          label: "",
          value: "0"
        },
        county: {
          label: "",
          value: "0"
        },
        town: {
          label: "",
          value: "0"
        }
      }
    };
  },
  methods: {
    onChooseClick(item) {
      if (item.childList != "" && item.childList) {
        this.valueObj[this.cityList[this.showRank].identify].label =
          item.areaName;
        this.valueObj[this.cityList[this.showRank].identify].value =
          item.areaCode;
        this.cityList[this.showRank].name = item.areaName;
        this.showRank++;
        this.cityList[this.showRank].showList = item.childList;
      } else {
        this.valueObj.town.label = "";
        this.valueObj.town.value = "0";
        this.valueObj[this.cityList[this.showRank].identify].label =
          item.areaName;
        this.valueObj[this.cityList[this.showRank].identify].value =
          item.areaCode;
        this.$emit("confirm", this.valueObj);
      }
    },
    onRankClick(key) {
      this.showRank = key;
    }
  }
};
</script>

<style scoped>
div {
  font-size: 28px;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.pad-left {
  padding-left: 10px;
}

.has-choose-box {
  height: 60px;
  line-height: 60px;
}

.has-choose {
  margin-right: 50px;
  padding: 0 5px;
}

.has-choose.active {
  color: #4da0e0;
  border-bottom: 2px solid #4da0e0;
}

.city-item-box {
  height: 500px;
}

.city-item {
  height: 80px;

  padding: 0 30px;
}

div {
  justify-content: center;
}

.active {
  color: #4da0e0;
}
</style>
