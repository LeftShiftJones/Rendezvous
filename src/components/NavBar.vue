<template>
    <v-toolbar dark color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <router-link v-bind:to="{ name: 'home-page' }">
            <v-toolbar-title class="white--text">
                Single Page App
            </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>

        <v-btn flat v-bind:to="{ name: 'profile' }">My Profile</v-btn>

        <v-btn flat v-bind:to="{ name: 'member-schedule' }">My Schedule</v-btn>

        <v-btn flat v-bind:to="{ name: 'team-schedule' }">Team Schedule</v-btn>

    </v-toolbar>
</template>
