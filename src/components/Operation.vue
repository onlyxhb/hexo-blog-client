<template>
  <div class="operation">
    <div class="btns" @click="handleOpera">
      <i class="el-icon-minus click-back" name="window.min"/>
      <i class="self-max click-back" name="window.max"/>
      <i class="el-icon-close click-back" name="window.close"/>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  methods: {
    handleOpera (event) {
      let name = event.target.getAttribute('name')
      if (name) {
        ipcRenderer.send(name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation {
  position: relative;
  width:100%;
  height: 60px;
  -webkit-app-region: drag;
  .btns {
    float: right;
    display: flex;
    -webkit-app-region: no-drag;
    i {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #3B4D62;
      font-size: 17px;
      cursor: pointer;
      &.self-max {
        position: relative;
        &::before {
        content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 10px;
          height: 10px;
          border: 1px solid #3B4D62;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>