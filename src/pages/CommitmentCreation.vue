<template>
    <div>
        <h4 class="display-1">Commitment Creation</h4>
        <v-spacer></v-spacer>
        <v-form vmodel="valid">
            <v-text-field
                v-model="title"
                v-bind:rules="rules.required"
                label="Title"
                required
            ></v-text-field>

            <v-text-field
                    v-model="location"
                    v-bind:rules="rules.required"
                    label="Location"
                    required
            ></v-text-field>
        <v-layout row wrap>
            <v-flex xs11 sm5>
                <v-menu
                        ref="startDateMenu"
                        :close-on-content-click="false"
                        v-model="startDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="500px"
                        min-width="500px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="startDate"
                            label="Start date"
                            prepend-icon="calendar_today"
                            readonly
                    ></v-text-field>
                    <v-date-picker
                            v-if="startDateMenu"
                            v-model="startDate"
                            dark="true"
                            full-width
                            landscape
                    ></v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs11 sm5>
                <v-menu
                        ref="startTimeMenu"
                        :close-on-content-click="false"
                        v-model="startTimeMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="500px"
                        min-width="500px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="startTime"
                            label="Start time"
                            prepend-icon="access_time"
                            readonly
                    ></v-text-field>
                    <v-time-picker
                            v-if="startTimeMenu"
                            v-model="startTime"
                            full-width
                            landscape
                    ></v-time-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs11 sm5>
                <v-menu
                        ref="endDateMenu"
                        :close-on-content-click="false"
                        v-model="endDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="500px"
                        min-width="500px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="endDate"
                            label="End date"
                            prepend-icon="calendar_today"
                            readonly
                    ></v-text-field>
                    <v-date-picker
                            v-if="endDateMenu"
                            v-model="endDate"
                            dark="true"
                            full-width
                            landscape
                    ></v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs11 sm5>
                <v-menu
                        ref="endTimeMenu"
                        :close-on-content-click="false"
                        v-model="endTimeMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="500px"
                        min-width="500px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="endTime"
                            label="End time"
                            prepend-icon="access_time"
                            readonly
                    ></v-text-field>
                    <v-time-picker
                            v-if="endTimeMenu"
                            v-model="endTime"
                            full-width
                            landscape
                    ></v-time-picker>
                </v-menu>
            </v-flex>
        </v-layout>
            <v-btn v-bind:disabled="valid" v-on:click="handleSubmit"
            >Submit
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommitmentCreation",
  data: function() {
    return {
      valid: false,
      startDate: null,
      startTime: null,
      startDateMenu: false,
      startTimeMenu: false,
      endDate: null,
      endTime: null,
      endDateMenu: false,
      endTimeMenu: false,
      location: null,
      title: null,
      dialogVisible: false,

      rules: {
        required: [
          val => val.length > 0 || 'Required'
        ]
      }
    }
  },
  methods: {
    handleSubmit: function() {
      axios
        .patch("api/commitments", {
          title: this.title,
          location: this.location,
          start: this.startDate + this.startTime,
          end: this.endDate + this.endTime,
        })
        .then(result => {
            if (result.data.ok) {
                console.log("Commitment added!");
            } else {
                console.log("Uh-oh");
            }
        })
        .catch(err => console.log("Failed", err));
    }
  }
}
</script>