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
    <v-row >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
      
      <v-row>
        <v-col cols="12"
        md="3" v-on:click="dialog=true">
        <panel cls="dark"  style="height:160px;" v-bind="attrs"
           v-on="on"  >
            <v-card-text>
              <v-img src="@/assets/icons/tickets.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div   class="panel-line">
                Open Invoices
              </div>
              <div class="panel-number" style="font-weight:bold;">5</div>
            </v-card-text>
        </panel>
        </v-col>
        <v-col cols="12"
        md="3">
       <panel cls="dark" style="height:160px;">
            <v-card-text>
              <v-img src="@/assets/icons/earnings.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div class="panel-line">
                 Overdue
              </div>
              <div class="panel-number" style="font-weight:bold;">&euro;3</div>
            </v-card-text>
        </panel>
        </v-col>
         <v-col cols="12"
        md="3">
     <panel cls="dark" style="height:160px;">
            <v-card-text>
              <v-img src="@/assets/icons/visitors.svg" class="panel-icon d-block" contain max-height="40" max-width="40" width="40" height="40"></v-img>

              <div class="panel-line">
                 To be paid 
              </div>
              <div class="panel-number" style="font-weight:bold;">2</div>
            </v-card-text>
        </panel>
        </v-col>
      </v-row>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Invoicen</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12">
                <v-text-field
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
            
              <v-col cols="12">
                <v-text-field
                  label="Artist*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Amount*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12">
               <v-checkbox
               style="opecity:1;"
                  v-model="paid"
                  label="Paid-checkbox"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row>
    <v-col cols="12"
    md="3" >
  <v-btn
          style="height: 48px !important; width: 100%;"
      depressed
         class="mx-4"
      color="primary"
       large
    >
      + New Invoice
    </v-btn>
    </v-col>
     <v-col cols="12"
    md="3" >
  <v-select
     class="mx-4"
    style="height: 45px !important; width: 100%;"
          :pick="pick"
          label="Pick Artist"
          outlined
        ></v-select>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="pa-4">
        <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
   
  >
   <template v-slot:item.actions="{ item }">
        <v-simple-checkbox
          v-model="item.actions"
        ></v-simple-checkbox>
      </template>
    <template v-slot:item.status="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
   
  </v-data-table>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>

import panel from "@/components/core/panel";


export default {
  name: 'Finance',
  components: {
     panel
  },

  mounted () {

  },


  data: () => ({
paid  :false,
  pick: ['Foo', 'Bar', 'Fizz', 'Buzz'],
   dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
          glutenfree:false,
        },
        { text: 'Artist', value: 'calories' },
        { text: 'Amount', value: 'fat' },
        { text: 'Partner', value: 'carbs' },
        { text: 'Due date', value: 'protein' },
        { text: 'status', value: 'actions', sortable: false },
        { text: 'Action', value: 'status', sortable: false },
        
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
}
</script>
