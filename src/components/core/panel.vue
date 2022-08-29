<template>

    <v-card class="rounded-lg" :class="cls" elevation="0">
      <div class="circle_bg"></div> 
      <div class="circle_bg2"></div>
      <div class="circle_bg3"></div>
      <v-img src="@/assets/circle_bg3.svg" class="circle_bg3"></v-img>
      <slot></slot>
    </v-card>

</template>
<script>
  export default {
    name: 'panel',
    props:['cls']

  }
</script>
