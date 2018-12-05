<template>
    <v-toolbar dark color="primary">

        <router-link v-bind:to="{ name: 'home-page' }">
            <v-toolbar-title class="white--text">
                Rendezvous Scheduling App
            </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-btn flat v-bind:to="{ name: 'profile' }">My Profile</v-btn>

        <v-btn flat v-bind:to="{ name: 'member-schedule' }">My Schedule</v-btn>

        <!--v-btn flat v-bind:to="{ name: 'team-schedule' }">Team Schedule</v-btn-->

        <v-btn flat icon v-bind:to="{ name: 'home-page' }" v-on:click="logoutUser">
            <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>

export default {
    methods: {
        logoutUser: function() {
            if(this.$root.currentUser != null) {
                this.$root.currentUser = null;
                //alert(`You have been logged out`);
            }
        }
    }
}
</script>
