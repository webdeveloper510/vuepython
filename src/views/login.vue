<template>
  <v-container
    class="fill-height"
    fluid
  >

    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
    >
      <form @submit.prevent="login">
        <v-card>
            <v-card-title class="headline">
              Login
            </v-card-title>

        <v-card-text>
          <v-text-field label="Username" v-model="account.username"></v-text-field>
          <v-text-field label="Password" type="password" v-model="account.password"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
          </form>
    </v-dialog>

  </v-container>
</template>

<script>


// import Api from "@/service/Api";
// import axios from 'axios'

export default {
  name: 'Login',
  mounted(){

  },
  methods:{
    async login() {
      var fd = new FormData();
      fd.append('username', this.account.username)
      fd.append('password', this.account.password)
      const baseURI = 'http://13.40.100.181:443/api-token-auth/'// Here is login Api
      await this.$http.post(baseURI, fd).then(response => {
        console.log(response)
           localStorage.setItem('user',response.data.token)
           this.$router.push('/') 
      })
        .catch(e => {
          this.errors.push(e)
        })

    },
  },
  data: () => ({
    dialog: true,
    account:{
      username:'',
      password:''
    }

  })

}
</script>