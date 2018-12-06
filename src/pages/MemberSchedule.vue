<template>
    <div>
        <div v-for="(commitment, index) in my_commitments" v-bind:key="index" class="row">
            <div class="row">
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            my_commitments: null
        };
    },
    methods: {
        get_data: function() {
            axios.post("/api/commitments", {
                email: this.$root.currentUser
            })
            .then(result => {
                if(result.data.ok) {
                    console.log(result.data.commitments);
                    this.my_commitments = result.data.commitments;
                } else {
                    console.log(result.data.msge);
                }
            })
            .catch(err => {console.log(`There was an error: ${err}`)});

        }
    },
    beforeMount() {
        this.get_data();
    }
}

</script>