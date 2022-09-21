<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="d-flex justify-end date_menu_container">
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-row>
            <v-col cols="12" md="3" >
              <panel cls="dark" style="height:160px;" v-bind="attrs" v-on="on">
                <v-card-text>
                  <v-img src="@/assets/icons/tickets.svg" class="panel-icon d-block" contain max-height="40"
                    max-width="40" width="40" height="40"></v-img>

                  <div class="panel-line">
                    Open Invoices
                  </div>
                  <div class="panel-number" style="font-weight:bold;">{{count}}</div>
                </v-card-text>
              </panel>
            </v-col>
            <v-col cols="12" md="3">
              <panel cls="dark" style="height:160px;">
                <v-card-text>
                  <v-img src="@/assets/icons/earnings.svg" class="panel-icon d-block" contain max-height="40"
                    max-width="40" width="40" height="40"></v-img>

                  <div class="panel-line">
                    Overdue
                  </div>
                  <div class="panel-number" style="font-weight:bold;">{{Overdue}}</div>
                </v-card-text>
              </panel>
            </v-col>
            <v-col cols="12" md="3">
              <panel cls="dark" style="height:160px;">
                <v-card-text>
                  <v-img src="@/assets/icons/visitors.svg" class="panel-icon d-block" contain max-height="40"
                    max-width="40" width="40" height="40"></v-img>

                  <div class="panel-line">
                    To be paid
                  </div>
                  <div class="panel-number" style="font-weight:bold;">&euro;{{amount_paid}}</div>
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
                  <v-col cols="12">
                    <v-text-field label="Name*" v-model="form.name" required></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="Artist*" v-model="form.artist" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Amount*" v-model="form.amount" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox v-model="form.paid" label="Paid-checkbox"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text type="submit" @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-btn style="height: 48px !important; width: 100%;margin-left: -8px;" depressed color="primary" large
          v-model="Invoice" @click="Invoice = true">
          + New Invoice
        </v-btn>
      </v-col>
      <v-col cols="12" md="3">
        <v-select style="height: 45px !important; width: 100%;margin-left: -5px;" :pick="pick" label="Pick Artist"
          outlined></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-4">
        <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:item.status="{ item }">
          <!-- <v-simple-checkbox :ripple="false" v-model="item.status" @click="check($event)"></v-simple-checkbox> 
          -->         
          <input type="checkbox" v-model="item.status" @change="check($event,item.id)"/>
            </template>
            <template v-slot:item.duedate="{ item }">
                {{item.duedate|formatDate}}
             </template>
          <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.download="{item}">
            <v-btn 
            class="ma-2"
            outlined 
            :href="`${link}${item.id}`"
            download>
            Download PDF
    </v-btn>
          </template>
          

        </v-data-table>
      </v-col>
    </v-row>
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

    <v-dialog v-model="Invoice" max-width="500px">
      <form @submit.prevent="onInvoice">
        <v-card>
          <v-card-title>
            <span class="text-h5">Invoicens</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Invoice Name*" v-model="invoice.invoice_name" required></v-text-field>
               

                <v-select v-model="invoice.artistid" :items="ArtistDetails" item-text="ArtistName" item-value="id"
                  label='Artists*' filled required>
                </v-select>
                <v-select v-model="invoice.partnerid" :items="Partner" item-text="PartnerName" item-value="id"
                  label='Partner*' filled required>
                </v-select>
               
                  <v-textarea v-model="invoice.description1" name="input-7-1" label="Description 1" rows="2">
                  </v-textarea>
              
                  <v-text-field v-model="invoice.amount1" label="Amount 1" type="number" />

                  <v-textarea v-model="invoice.description2" name="input-7-1" label="Description 2" rows="2">
                  </v-textarea>
                
                  <v-text-field v-model="invoice.amount2" label="Amount 2" type="number" />
                
                  <v-dialog ref="dialog" :return-value.sync="date" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="invoice.duedate" label="Due Date" prepend-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="invoice.duedate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="invoice.duedate = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                  
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="Invoice = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit" @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>


    <v-dialog v-model="edit" max-width="500px">
      <form @submit.prevent="onEdit">
        <v-card>
          <v-card-title>
            <span class="text-h5">Invoicen</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Name*" v-model="editedItem.Name" :value="editedItem.name" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="editedItem.service1" name="input-7-1" label="Service 1" rows="2">
                  </v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Amount1*" v-model="editedItem.amount1"
                    required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="editedItem.service2" name="input-7-1" label="Service 2" rows="2">
                  </v-textarea>
                </v-col>

                   <v-col cols="12">
                    <v-text-field label="Amount2*"  v-model="editedItem.amount2"
                    required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-dialog ref="dialog" :return-value.sync="date" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="editedItem.duedate"  label="Due Date" prepend-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.duedate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="editedItem.duedate = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                  </v-col>
                
                <v-col cols="12">
                  <v-checkbox v-model="editedItem.status" :value="editedItem.status" label="Paid-checkbox"></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="edit = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit" @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-container>

</template>

<script>

import panel from "@/components/core/panel";


export default {
  name: 'Finance',
  components: {
    panel
  },

  mounted() {

  },


  data: () => ({
    paid: false,
    form: {
      name: '',
      artist: '',
      paid: '',
      amount: ''
    },
    amount_paid:'',
    date: '',
    getFinence1: [],
    invoice: {
      artistid: '',
      partnerid: '',
      description1: '',
      description2: '',
      amount1: '',
      amount2: '',
      invoice_name: '',
      duedate: '',
      paid:false

    },
    link:"http://13.40.100.181/get_pdf_path/",
    ArtistDetails: [],
    Partner: [],
    id: '',
    edit: false,
    Invoice: false,
    pick: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'center',
        sortable: false,
        value: 'Name',
        glutenfree: false,
      },
      { text: 'Artist', align: 'center', value: 'artist' },
      { text: 'Partner', align: 'center', value: 'partnername' },
      { text: 'Amount', align: 'center', value: 'amount' },
      { text: 'Date', align: 'center', value: 'duedate'},
      { text: 'Status', align: 'center', value: 'status', sortable: false },
      { text: 'Action', align: 'center', value: 'actions', sortable: false },
       { text: 'Download', align: 'center', value: 'download', sortable: false }
       

    ],
    desserts: [],
    count: '',
    posts: [],
    Overdue:'',
    editedIndex: -1,
    editedItem: {
      artist: '',
      amount: 0,
      paid: '',
      status: 0,
      name: '',
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
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
    this.getFinence()
    this.getArtist()
    this.getOverdue()
    this.amount_to_paid()
    
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'Test1',
          amount: 1001,
          paid: true,
          artist: 'Artist1',
          id: 1,
        },


      ]
    },
    async onSubmit() {
      console.log(this.form);
      var fd = new FormData();
      fd.append('amount', this.form.amount)
      fd.append('artist', this.form.artist)
      fd.append('name', this.form.name)
      fd.append('paid', this.form.paid)
      const baseURI = 'http://13.40.100.181/insert_finance/'
      await this.$http.post(baseURI, fd).then(response => {
        this.dialog = false;
        this.getFinence();
        console.log(response.data)
      })
        .catch(e => {
          this.errors.push(e)
        })

    },
    
    async onInvoice() {
      console.log(this.invoice.paid) 
      var fd = new FormData();
      fd.append('invoice_name', this.invoice.invoice_name)
      fd.append('partnername', this.invoice.partnerid)
      fd.append('artistname', this.invoice.artistid)
      fd.append('servicesname1', this.invoice.description1)
      fd.append('servicesname2', this.invoice.description2)
      fd.append('amount1', this.invoice.amount1)
      fd.append('amount2', this.invoice.amount2 ? this.invoice.amount2:'00')
      fd.append('duedate', this.invoice.duedate)
      fd.append('paid', this.invoice.paid)
      const baseURI = 'http://13.40.100.181/insert_invoice/'
      await this.$http.post(baseURI, fd).then(response => {
        this.Invoice = false;
        console.log(response.data)

        this.getFinence();
        this.$toasted.show("Invoice Update Successfully!")

      })
        .catch(e => {
          this.errors.push(e)
        })
    },


    async onEdit() {
      console.log(this.editedItem);
      var fd = new FormData();
      fd.append('amount1', this.editedItem.amount1)
      fd.append('amount2', this.editedItem.amount2)
      fd.append('servicesname1', this.editedItem.service1)
      fd.append('servicesname2', this.editedItem.service2)
      fd.append('duedate', this.editedItem.duedate)
      fd.append('paid', this.editedItem.status ? 'True' : 'False')
      console.log(fd);
      const baseURI = 'http://13.40.100.181/edit_invoice/' + this.editedItem.id
      await this.$http.post(baseURI, fd).then(response => {
        this.edit = false;
        this.getFinence();
        this.amount_to_paid()
        this.getOverdue()
        console.log(response.data)
      })
        .catch(e => {
          this.errors.push(e)
        })

    },


    async getFinence() {
      const baseURI = 'http://13.40.100.181/insert_invoice/'
      await this.$http.get(baseURI).then(response => {
        // JSON responses are automatically parsed.
        console.log(response)
        this.desserts = response.data.Invoice_list
        this.count = response.data.invoice_count
     
      })
        .catch(e => {
          this.errors.push(e)
        })

    },
    async amount_to_paid() {
      const baseURI = 'http://13.40.100.181/amount_to_be_paid/'
      await this.$http.get(baseURI).then(response => {
        // JSON responses are automatically parsed.
        console.log(response)
           this.amount_paid = response.data.to_be_paid_dict
      })
        .catch(e => {
          this.errors.push(e)
        })
    },  
    async getOverdue() {
      const baseURI = 'http://13.40.100.181/show_overdue_amount/'
      await this.$http.get(baseURI).then(response => {
        // JSON responses are automatically parsed.
        this.Overdue = response.data.overdue_amount

     
      })
        .catch(e => {
          this.errors.push(e)
        })

    },

    async getArtist() {
      const baseURI = 'http://13.40.100.181/get_invoice_details/'
      await this.$http.get(baseURI).then(response => {
        // JSON responses are automatically parsed.

        this.ArtistDetails = response.data.artist
        this.Partner = response.data.Partner
        //console.log(response.data )
      })
        .catch(e => {
          this.errors.push(e)
        })
    },
    
    editItem(item) {
         console.log(item)

        this.editedItem.Name = item.Name
        this.editedItem.amount1 = item.amount1
        this.editedItem.amount2 = item.amount2
        this.editedItem.service2 = item.service2
        this.editedItem.service1 = item.service1
        this.editedItem.duedate = item.duedate
        this.editedItem.status = item.status
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.edit = true
    },

    async check(e,id) {   
      console.log(id)   
     // e.target.checked ? True : False;
      var fd = new FormData();
        fd.append('status',e.target.checked ? 'True' : 'False')
        fd.append('id',id)
      const baseURI = 'http://13.40.100.181/update_status/'
      await this.$http.post(baseURI,fd).then(response => {       
        console.log(response )
        this.getFinence();
        this.amount_to_paid()
        this.getOverdue()
      })
        .catch(e => {
          this.errors.push(e)
        })
        
      
    },  

    deleteItem(item) {
      console.log(item)
      this.id = item.id
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

  async deleteItemConfirm() {
        this.desserts.splice(this.editedIndex, 1)
        var fd = new FormData();
        fd.append('id', this.id)
        console.log(this.id)
        const baseURI = 'http://13.40.100.181/delete_invoice/' 
        await this.$http.post(baseURI, fd).then(response => {
          console.log(response)
          this.desserts = response.data
          this.closeDelete()
          this.getFinence();
      
        })
          .catch(e => {
            this.errors.push(e)
          })

    },

    close() {
      this.edit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // },
  },
}
</script>