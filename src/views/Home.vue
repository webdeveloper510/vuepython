<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <div class="d-flex justify-end date_menu_container">
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
         <panel cls="dark" style="height:160px;">
            <v-card-text>
              <v-img src="@/assets/icons/tickets.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div class="panel-line">
                Aantal tickets verkocht in deze periode
              </div>
              <div class="panel-number" style="font-weight:bold;">5</div>
            </v-card-text>
        </panel>
      </v-col>
      <v-col cols="3">
        <panel cls="dark" style="height:160px;">
            <v-card-text>
              <v-img src="@/assets/icons/earnings.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div class="panel-line">
                Omzet in deze periode
              </div>
              <div class="panel-number" style="font-weight:bold;">&euro;3</div>
            </v-card-text>
        </panel>
      </v-col>
      <v-col cols="3">

        <panel cls="dark" style="height:160px;">
            <v-card-text>
              <v-img src="@/assets/icons/visitors.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div class="panel-line">
                Aantal bezoekers aan de ticketshop
              </div>
              <div class="panel-number" style="font-weight:bold;">2</div>
            </v-card-text>
        </panel>
      </v-col>
      <v-col cols="3">
        <panel cls="dark" style="height:160px;">
              <v-card-text>
                <v-img src="@/assets/icons/statistics.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

                <div class="panel-line">
                  Conversie ratio
                </div>
                <div class="panel-number">1%</div>
              </v-card-text>
          </panel>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import panel from "@/components/core/panel";


export default {
  name: 'Home',
  components: {
    panel
  },
  mounted () {

  },
  methods:{

  },

  computed: {

  },
  watch: {

  },

  data: () => ({

  })
}
</script>
