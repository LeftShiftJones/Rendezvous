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
                                        <v-btn flat icon color="white" v-on:click="delete_event($event, commitment.commitment_id)"><v-icon>delete</v-icon></v-btn>
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
          my_commitments: null,
          commitment_to_delete: null
        };
    },
    methods: {
        get_data: function() {
            axios.post("/api/commitments", {
                email: this.$root.currentUser
            })
            .then(result => {
                if(result.data.ok) {
                    if(result.data.count == 0) {
                        console.log(`User has 0 events scheduled, proceed normally...`);
                    } else {
                        this.my_commitments = result.data.commitments;
                    }
                }
            })
            .catch(err => {alert(`There was an error retrieving your schedule: ${err}`)});

        },
        handleCreate: function() {
            this.$router.push({ name: 'commitment-creation' });
        },
        delete_event: function(event, event_id) {
            this.commitment_to_delete = event_id;
            //console.log(event_id);
            axios.delete("/api/commitments", {
                id: this.commitment_to_delete
            })
            .then(result => {
                if(result.data.ok) {
                    this.$router.push({name: 'member-schedule'});
                } else {
                    alert(`We were unable to delete your commitment`);
                }
            })
            .catch(err => {alert(`There was an issue deleting your commitment: ${err}`)});
        }
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