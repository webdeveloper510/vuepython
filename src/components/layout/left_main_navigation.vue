<template>
  <v-card

  >

    <v-navigation-drawer
      permanent
      width="228"
      app
      mini-variant-width="120"

      :mini-variant="$store.state.layout.navopen"
    >
      <v-img src="@/assets/logo_yt.svg" width="42" height="28" v-show="$store.state.layout.navopen" style="margin:0 auto;margin-top:20px"></v-img>
      <v-img src="@/assets/logo_yourtickets.svg" width="148" v-show="!$store.state.layout.navopen" style="margin:0 auto;margin-top:20px"></v-img>
      <v-list dense style="margin-top:94px;">
        <template v-for="item in items">

            <v-list-item :key="item.text" :to="item.link" link>
              <v-list-item-action>
                <v-img :src="require('@/assets/icons/menu/' + item.icon + '.svg')"></v-img>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </template>
      </v-list>

    </v-navigation-drawer>
  </v-card>
</template>
<script>

  export default {
    name:'LeftMainNavigation',
    mounted (){

    },
    methods: {
      togglenav() {
        this.$store.commit('layout/navopen',!this.$store.state.layout.navopen)
      },
      collapse_toggle(){
        this.events_collapsed = this.events_collapsed ? false : true;
      },

    },
    computed:{

    },
    watch: {

    },
    data: () => ({

      items: [
        { icon: 'home', text: 'Dashboard', link: '/' },
        { icon: 'events', text: 'Finance tab', link: '/finance'},
        { icon: 'events', text: 'Events' ,link: '/events', isPanel: true},
        { icon: 'stats', text: 'Statistieken',link: '/stats'  },
        { icon: 'multishop', text: 'Multi shop',link: '/multishop'}
      ],
    }),
  }
</script>
