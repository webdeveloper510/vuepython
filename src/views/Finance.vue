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
      <form @submit.prevent="onSubmit">
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
                  v-model="form.name"
                  :value="editedItem.name"
                  required
                ></v-text-field>
              </v-col>
            
              <v-col cols="12">
                <v-text-field
                  label="Artist*"
                  v-model="form.artist"
                   :value="editedItem.artist"
                  required
                ></v-text-field> 
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Amount*"
                  v-model="form.amount"
                 :value="editedItem.amount"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12">
               <v-checkbox
                  v-model="form.paid"
                 :value="editedItem.paid"
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
            type="submit"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </form>
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
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
           <v-dialog
          v-model="edit"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            form: {
                name: '',
                artist: '',
                paid: '',
                amount: ''
             
            },
getFinence1 : [],
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
        { text: 'Artist', value: 'artist' },
        { text: 'Amount', value: 'amount' },
        { text: 'status', value: 'paid', sortable: false },
        { text: 'Action', value: 'status', sortable: false },
        
      ],
      desserts: [],
      posts: [],
      editedIndex: -1,
      editedItem: {
        artist: '',
        amount: 0,
        paid:'',
        status: 0,
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
      this.getFinence()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Test',
            amount: 100,
            paid: true,
            artist: 'Artist1',
            id: 1,
          },   
            
      
        ]
      },

      onSubmit: function () {
        console.log(this.form);
        const baseURI = 'http://3.10.162.220:8000/insert_finance/'
       this.$http.post(baseURI,this.form,function (data1){
        console.log(data1)
       })
    
    },
   async getFinence() {   
      const baseURI = 'http://3.10.162.220:8000/get_finance_details/'
    await this.$http.get(baseURI).then(response => {
      // JSON responses are automatically parsed.
     // this.desserts = response.data
      console.log(response.data )
    })
    .catch(e => {
      this.errors.push(e)
    })
     
    },

      editItem (item) {
        console.log(item)
        this.editedItem.name = item.name
        this.editedItem.amount = item.amount
        this.editedItem.artist = item.artist
        this.editedIndex = this.desserts.indexOf(item)
       // this.editedItem = Object.assign({}, item)
        this.edit = true
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
        this.edit = false
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
