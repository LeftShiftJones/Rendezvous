<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUser }}</h4>
        
        <div id="core_hours">
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

                
                <v-time-picker style="margin: 10px;" format="24hr" v-model="startTime" landscape width="200"></v-time-picker>
                <label for="startTime">Start Time</label>
                <v-time-picker style="margin: 10px;" format="24hr" v-model="endTime"   landscape width="200"></v-time-picker>
                <label for="endTime">Start Time</label>
            </v-form>
        </div>
        
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
        ]
    })
}
</script>