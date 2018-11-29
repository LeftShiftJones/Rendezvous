import Vue from "vue";

Vue.congif.productionTip = false;

import Vuetify from "vuetify";

Vue.use(Vuetify);

import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import Home from "./pages/Home.vue";
import Profile from "./pages/Profile.vue";
import MemberSchedule from "./pages/MemberSchedule.vue";
import TeamSchedule from "./pages/TeamSchedule.vue";
import CommitmentCreation from "./pages/CommitmentCreation.vue";
import ActivityProposal from "./pages/ActivityProposal.vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {name: "home-page", path: "/", component: Home},
        {name: "profile", path: "/profile", component: Profile},
        {name: "member-schedule", path: "/member-schedule", component: MemberSchedule},
        {name: "team-schedule", path: "/team-schedule", component: TeamSchedule},
        {name: "commitment-creation", path: "/commitment-creation", component: CommitmentCreation},
        {name: "activity-proposal", path: "/activity-proposal", component: ActivityProposal}
    ]
});

import App from "./App.vue";

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});