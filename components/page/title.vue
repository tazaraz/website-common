<template>
    <p id="page-title"><slot></slot></p>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class Title extends Vue {
}
</script>

<style lang="scss">
#page-title{
    color: white;
    padding: 3em 0 2em 0;
    margin: 0;
    font-size: 300%;
    text-align: center;
    line-height: 170%;
    letter-spacing: .025em;
}
</style>