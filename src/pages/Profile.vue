<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUserName }}.</h4>
        <v-container>
        <div id="core_hours">
            <h5 class="headline">Set Core Hours</h5>
            <v-form vmodel="valid">
                <v-select style="width: 145px;"
                    :items="items"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select"
                    hint="Select the day of the week"
                    v-model="day_to_change"
                    persistent-hint
                ></v-select>

                <!--The following allows our time picker to be stored in menus for a cleaner interface -->
                <!--Note that though the user enters time in am/pm format, the time is returned in 24hr format -->
                <v-layout row wrap>
                    <v-flex xs11 sm5>
                        <v-menu
                                ref="startMenu"
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
                                    dark="true"
                                    full-width
                                    landscape
                            ></v-time-picker>
                        </v-menu>
                    </v-flex>

                    <v-flex xs11 sm5>
                        <v-menu
                                ref="endMenu"
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
                <v-btn v-on:click="update_core_hours">Submit</v-btn>
            </v-form>
            <div class="text-xs-center">
            <v-dialog v-model="dialogVisible" width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        Core Hours Updated
                    </v-card-title>

                    <v-card-text> You have successfully updated your core hours. </v-card-text>

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
    </v-container>

    <!--v-container>
       <h5 class="headline">Manage Teams</h5>
        List teams here?
    </v-container>

    <v-container>
        <h5 class="headline">Manage Proposed Commitments</h5>
    </v-container-->
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: "ProfilePage",
    data: function() {
        return {
            day_to_change: null,
            startTime: "",
            endTime: "",
            items: [
                { text: 'Sunday',    value: 0 },
                { text: 'Monday',    value: 1 },
                { text: 'Tuesday',   value: 2 },
                { text: 'Wednesday', value: 3 },
                { text: 'Thursday',  value: 4 },
                { text: 'Friday',    value: 5 },
                { text: 'Saturday',  value: 6 }
            ],
            startTimeMenu: false,
            endTimeMenu: false,
            send_start: null,
            send_end: null,

            dialogHeader: "<no dialogHeader>",
            dialogText: "<no dialogText>",
            dialogVisible: false

        }
    },
    methods: {
        update_core_hours: function() {
          //console.log("update_core_hours called");
          this.send_start = this.startTime + ":00";
          this.send_end = this.endTime + ":00";
          axios
            .patch("/api/core_hours", {
              email: this.$root.currentUser,
              day: this.day_to_change,
              startTime: this.send_start,
              endTime: this.send_end,
            })
            .then(result => {
              if (result.data.ok) {
                this.showDialog("Success", result.data.msge);
              } else {
                this.showDialog("Sorry", result.data.msge);
              }
            })
            // eslint-disable-next-line
            .catch(err => this.showDialog("Failed", err));
        },

      showDialog: function() {
        this.dialogVisible = true;
        this.day_to_change= null;
        this.startTime= null;
        this.endTime = null
      },
      hideDialog: function() {
        this.dialogVisible = false;
        this.$router.push({ name: "profile" });
      }
    }
}
</script>