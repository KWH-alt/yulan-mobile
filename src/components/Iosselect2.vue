<template>
  <div class="fold" v-show="more">
    <div class="foldwrap"></div>
    <div class="foldbox">
      <div class="box-top">
        <div class="select-box">
          <van-picker :columns="columns" @change="onChange" />
        </div>
      </div>
      <div class="box-bottom">
        <div class="sure" @click="sure">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "areaflag", "area_2"],
  data() {
    return {
      columns: ["全部"],
      columns2: ["全部"], //当身份是大区经理时，则使用这个数组传递二级列表
      more: true,
      selected: "",
      a: 1
    };
  },
  mounted() {
    let th = this;
    if (this.$store.state.position == "SALEMAN_S") {
      this.$store.state.area_M.forEach(e => {
        this.columns.push(e.sname);
      });
    }
  },
  watch: {
    index(val, oldval) {
      this.columns = ["全部"];
      if (val != 0) {
        this.$store.state.area_M[val - 1].Sarea.forEach(e => {
          this.columns.push(e.sname);
        });
      }
    },
    columns(val) {
    }
  },
  methods: {
    sure() {
      this.more = false;
      this.$emit("listen3", this.more);
      this.$emit("listen4", this.selected);
    },
    cancel() {
      this.more = false;
      this.$emit("listen3", this.more);
    },
    onChange(picker, value, index) {
      this.selected = value == "全部" ? "" : value;
    }
  }
};
</script>

<style scoped>
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 40;
}
.foldbox {
  width: 286px;
  height: 268px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 45px;
}
.box-top {
  height: 240px;
  width: 100%;
}
.select-box {
  margin: 0;
  display: inline-block;
  padding-top: 10px;
  width: 168px;
  height: 210px;
  overflow: hidden;
}
.van-picker-column__item--selected {
  font-size: 18px;
}
.van-hairline--top-bottom:after {
  border-width: 3px 0;
  content: "";
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure:hover,
.cancel:hover {
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.sure {
  border-radius: 0 0 0 10px;
}
.cancel {
  border-radius: 0 0 10px 0;
}
</style>