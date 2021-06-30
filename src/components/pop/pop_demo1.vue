<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-06-29 16:50:40
 * @LastEditors: 王敏
 * @LastEditTime: 2021-06-29 19:21:19
-->
<template>
  <div class="bg">
    {{ text }}
    <a-button
      type="primary"
      @click="close(true)"
    >
      关闭
    </a-button>
  </div>
</template>

<script>
export default {
  props:{
    text:{
      type:String,
      default(){return ''}
    },
    close:{
      type:Function
    }
  },
  data (){
    return {
    };
  },
  mounted(){},
  methods:{},
}

</script>
<style lang='less' scoped>
  .bg{
    width: 200px;
    background: rgba(0,0,0,.5);
    padding:20px;
  }
</style>