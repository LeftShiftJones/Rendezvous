<template>
    <div>
        <h4 class="display-1">Welcome to Rendezvous</h4>

        <v-form vmodel="valid">
            <v-text-field
                v-model="email"
                v-bind:rules="rules.required"
                label="Email address"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                type="password"
                v-bind:rules="rules.required"
                label="Non-trivial password"
                required
            ></v-text-field>
            <v-btn v-bind:disabled="valid" v-on:click="handleSubmit"
                >Login
            </v-btn>
        </v-form><div class="text-xs-center">
            <v-dialog v-model="dialogVisible" width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        {{ dialogHeader }}
                    </v-card-title>

                    <v-card-text> {{ dialogText }} </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat v-on:click="hideDialog"
                            >Okay</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
//import Instructions from "../components/Instructions.vue";
import axios from "axios";

export default {
    name: "HomePage",
    // components: {
    //     Instructions
    // },
    data: function() {
        return {
            valid: false,
            email: "",
            password: "",

            dialogHeader: "<no dialogHeader>",
            dialogText: "<no dialogText>",
            dialogVisible: false,

            rules: {
                required: [
                    val => val.length > 0 || 'Required'
                ]
            }
        };
    },
    methods: {
        handleSubmit: function() {
            axios
                .post("/api/members", {
                    email: this.email,
                    password: this.password,
                })
                .then(result => {
                    if (result.data.ok) {
                        this.showDialog("Success", result.data.msge);
                        this.$root.currentUser = this.email;
                        this.$root.currentUserName = result.data.username[0].name;
                        //this.$router.push({ name: "profile" });
                    } else {
                        this.showDialog("Sorry", result.data.msge);
                    }
                })
                .catch(err => this.showDialog("Failed", err));
        },
        showDialog: function(header, text) {
            this.dialogHeader = header;
            this.dialogText = text;
            this.dialogVisible = true;
        },
        hideDialog: function() {
            this.dialogVisible = false;
            this.$router.push({ name: "profile" });
        }
    },
  computed: {
      currentUser: () => {
        if (this.$root.currentUser) {
          return this.$root.currentUser;
        } else {
          return "No one logged in";
        }
      }
  }
};
</script>
