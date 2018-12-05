<template>
    <div>
        <h4 class="display-1">My Commitments</h4>
        <div v-for="(commitment, index) in my_commitments" v-bind:key="index" class="row">
            <v-container>
                <v-card-text class="py-0">
                    <v-timeline
                            align-top
                            dense
                    >
                        <v-timeline-item
                                color=accent
                                small
                        >
                            <v-layout pt-3>
                                <v-flex xs3>
                                    <strong>5pm-7pm</strong>
                                </v-flex>
                                <v-flex>
                                    <em>{{ commitment }}</em>
                                    <br> Month ##, 2018
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-container>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            my_commitments: ["Commitment A", "Commitment B", "Commitment C"]
        };
    }
}

</script>