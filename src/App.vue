<template>
  <v-app id="inspire">

    <LeftMainNavigation></LeftMainNavigation>

    <v-main :style="{background: '#EDF5F7'}">

      <v-container fluid style="padding:24px;">
        <v-row>
          <v-col>
            <v-card elevation="0" style="padding:8px;">
              <router-view></router-view>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  @import 'scss/override.scss';
</style>

<script>
  import LeftMainNavigation from './components/layout/left_main_navigation.vue'


  export default {
    components:{
      LeftMainNavigation,
    },
    mounted() {

    },

    methods: {
      togglenav() {
        this.$store.commit('layout/navopen',!this.$store.state.layout.navopen)
      },

    },
    computed:{

      theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      },

    },
    data: () => ({


    }),
  }
</script>
