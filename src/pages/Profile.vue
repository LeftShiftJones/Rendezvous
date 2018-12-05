<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUser }}</h4>
        <v-container>
        <div id="core_hours">
            <h5 class="headline">Set Core Hours</h5>
            <v-form vmodel="valid">
                <v-select style="width: 145px;"
                    :items="items"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select"
                    hint="Select the day of the week"
                    @change="update_day_of_week"
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
                                    @change="update_start"
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
                                    @change="update_end"
                                    landscape
                            ></v-time-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-btn>Sumbit</v-btn>
            </v-form>

        

    </div>
    </v-container>

    <v-container>
       <h5 class="headline">Manage Teams</h5>
        List teams here?
    </v-container>

    <v-container>
        <h5 class="headline">Manage Proposed Commitments</h5>
    </v-container>
    </div>
</template>


<script>
import axios from "axios";
let day_to_change = "";
let startTime;
let endTime;
//import DatePicker from 'vue2-datepicker';

export default {
     name: "ProfilePage",
    data: function() {
        return {
            startTime: null,
            endTime: null,
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
            endTimeMenu: false
        }
    },
    methods: {
        update_day_of_week: function(weekday) {
            day_to_change = weekday;
            // eslint-disable-next-line
            console.log(`${day_to_change}`);
        },
        update_start: function(time) {
            startTime = time;
            // eslint-disable-next-line
            console.log(`Start time is: ${startTime}`);
        },
        update_end: function(time) {
            endTime = time;
            // eslint-disable-next-line
            console.log(`End time is: ${endTime}`);
        },
        update_core_hours: function() {

            axios
                .post("/api/{email}/core_hours", {
                    email: this.$root.currentUser,
                    day: this.day_to_change,
                    startTime: this.startTime,
                    endTime: this.endTime,
                })
                .then(result => {
                    if(result.data.ok) {
                        console.log(`Result is okay: ${result.data.msge}`);
                    } else {
                        console.log(`Result is NOT okay: ${result.data.msge}`);
                    }
                })
                .catch(err=> console.log(`Failed: ${result.data.msge}`));

            //SQL patch to change/update core hours
            day_to_change = day_to_change + "";
            
        }
    }
}
</script>