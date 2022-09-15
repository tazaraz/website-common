<template>
    <h2 class="section-title"><slot></slot></h2>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class SectionTitle extends Vue {
}
</script>

<style lang="scss">
.section-title{
    padding: 0.5em 1.5em;
    margin: 0;
    color: $text;
    font-size: 130%;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: .025em;

    &::before{
        content:"";
        margin: 0 0.4em;
        height: 0.13rem;
        width: 1em;
        background-color: $secondary;
        display: inline-block;
        vertical-align: middle;
    }
}
</style>