<template>
    <div>
        <div v-for="(commitment, index) in my_commitments" v-bind:key="index" class="row">
            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            my_commitments: []
        };
    }
}

</script>