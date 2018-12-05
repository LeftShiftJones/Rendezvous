<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUser }}</h4>
        <v-container>
        <div id="core_hours">
            <h5 class="headline">Set Core Hours</h5>
            <v-form vmodel="valid">
                <v-select style="width: 145px;"
                    :items="items"
                    v-model="e6"
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
                                :return-value.sync="time"
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
                                    @change="$refs.menu.save(startTime)"
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
                                :return-value.sync="time"
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
                                    @change="$refs.menu.save(endTime)"
                                    landscape
                            ></v-time-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
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
let day_to_change = "";
//import DatePicker from 'vue2-datepicker';

export default {
    //components: {DatePicker},
    methods: {
        update_day_of_week(weekday) {
            day_to_change = weekday;
            // eslint-disable-next-line
            console.log(`${day_to_change}`);
        },
        update_core_hours() {
            //SQL patch to change/update core hours
            day_to_change = day_to_change + "";
        }
    },
    data: () => ({
        items: [
            { text: 'Sunday', value: 0 },
            { text: 'Monday', value: 1 },
            { text: 'Tuesday', value: 2 },
            { text: 'Wednesday', value: 3 },
            { text: 'Thursday', value: 4 },
            { text: 'Friday', value: 5 },
            { text: 'Saturday', value: 6 }
        ],
      startTime: null,
      endTime: null,
      startTimeMenu: false,
      endTimeMenu: false,
    })
}
</script>