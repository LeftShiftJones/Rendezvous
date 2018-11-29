<template>
    <div>
        <h4 class="display-1">Welcome to Rendezvous &copy;</h4>

        <p class="body-1">This is a web site. I made this</p>
        <v-form vmodel="valid">
            <v-text-field
                v-model="username"
                label="Username"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                type="password"
                label="Non-trivial password"
                required
            ></v-text-field>
        </v-form>
    </div>
</template>
