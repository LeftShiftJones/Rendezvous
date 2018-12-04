<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUser }}</h4>
    
        <!--date-picker v-model="time1" :first-day-of-week="1"></date-picker>
        <date-picker v-model="time2" type="datetime" :time-picker-options="timePickerOptions"></date-picker>
        <date-picker v-model="time3" range :shortcuts="shortcuts"></date-picker-->
        
        <div id="core_hours">
            <v-form vmodel="valid">
                <v-select
                    :items="items"
                    v-model="e6"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select"
                    hint="Select the day of the week"
                    persistent-hint
                ></v-select>

                <!--datetime v-model="time" type="time">Sunday</datetime>
                <datetime v-model="time" type="time">Monday</datetime>
                <datetime v-model="time" type="time">Tuesday</datetime-->

                <!--date-picker v-model="sundayTime" type="time" lang="en" format="HH:mm" placeholder="Sunday"></date-picker-->
                <v-time-picker style="margin: 10px;" format="24hr" v-model="startTime" landscape width="200"></v-time-picker>
                <v-time-picker v-model="endTime" format="24hr" style="margin: 10px;" landscape width="200"></v-time-picker>

                <!--datetime vmodel="time" input-id="startDate" type="time">
                    <label for="startDate" slot="before">Field Label</label>
                    <span class="description" slot="after">The Field Description</span>
                </datetime-->
            </v-form>
        </div>
        
    </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';

export default {
    components: {DatePicker},
    methods: {

    },
    data: () => ({
    items: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  })
}
</script>