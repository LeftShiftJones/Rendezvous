<template>
    <div>
        <v-card-text style="height: 30px; position: relative">
            <v-btn
                    absolute
                    fab
                    bottom
                    right
                    color="accent"
                    v-bind:disabled="valid"
                    v-on:click="handleCreate"
            >
                <v-icon
                >add</v-icon>
            </v-btn>
        </v-card-text>
        <v-timeline
                align-top
                dense
        >
        <div v-for="(commitment, index) in my_commitments" v-bind:key="index" class="row">
            <div class="row">
                <v-container>
                    <v-card-text class="py-0">
                            <v-timeline-item
                                    color="accent"
                                    fill-dot
                                    right
                            >
                                <v-card>
                                    <v-card-title class="secondary">
                                        <v-icon
                                                size="42"
                                                class="mr-3"
                                        >
                                            mdi-magnify
                                        </v-icon>
                                        <h2 class="display-1 white--text font-weight-light">{{ commitment.title }}</h2>
                                    </v-card-title>
                                    <v-container>
                                        <v-layout>
                                            <v-flex xs10>
                                                <strong>Start Time:</strong> {{ commitment.start_date_time | moment }} <br>
                                                <strong>End Time:</strong> {{ commitment.end_date_time | moment }} <br>
                                                <strong>Location:</strong> {{ commitment.location }}
                                            </v-flex>
                                            <v-flex xs2>
                                                <v-icon size="64">mdi-calendar-text</v-icon>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-timeline-item>
                    </v-card-text>
                </v-container>
            </div>
        </div>
        </v-timeline>
    </div>
</template>

<script>
import axios from "axios";
const moment = require("moment");

export default {
    data() {
        return {
          valid: false,
          moment: require("moment"),
          my_commitments: null
        };
    },
    methods: {
        get_data: function() {
            axios.post("/api/commitments", {
                email: this.$root.currentUser
            })
            .then(result => {
                if(result.data.ok) {
                    console.log(result.data.commitments);
                    this.my_commitments = result.data.commitments;
                } else {
                    console.log(result.data.msge);
                }
            })
            .catch(err => {console.log(`There was an error: ${err}`)});

        },
      handleCreate: function() {
          this.$router.push({ name: 'commitment-creation' });
      },
    },
    beforeMount() {
        this.get_data();
    },
    filters: {
        moment: function (date) {
            return moment(date).format('dddd, MMMM Do, h:mm a');
        }
    }
}

</script>