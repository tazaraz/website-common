<template>
    <Nuxt />
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class App extends Vue {
    head(){
        return {title: "Plain"}
    }
}
</script>