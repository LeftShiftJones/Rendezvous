<template>
    <div>
        <h4 class="display-1">Welcome, {{ this.$root.currentUser }}</h4>
    
        <div id="core_hours">
            <v-form vmodel="valid">
                <!--datetime v-model="time" type="time">Sunday</datetime>
                <datetime v-model="time" type="time">Monday</datetime>
                <datetime v-model="time" type="time">Tuesday</datetime>

                <date-picker v-model="sundayTime" type="time" lang="en" format="HH:mm" placeholder="Sunday"></date-picker-->

                <datetime v-model="date" input-id="startDate" type="time">
                    <label for="startDate" slot="before">Field Label</label>
                    <span class="description" slot="after">The Field Description</span>
                </datetime>
            </v-form>
        </div>
    </div>
</template>


<script>

</script>