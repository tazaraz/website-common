<template>
    <url class="back" :to="to" @click="back">
        <svg viewBox="0 -4.5 25 25" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="currentColor"><path d="M5.62132 9.5L9.06066 12.9393C9.64645 13.5251 9.64645 14.4749 9.06066 15.0607C8.47487 15.6464 7.52513 15.6464 6.93934 15.0607L0.93934 9.0607C0.353553 8.4749 0.353553 7.5251 0.93934 6.9393L6.93934 0.93934C7.52513 0.35355 8.47487 0.35355 9.06066 0.93934C9.64645 1.52513 9.64645 2.47487 9.06066 3.06066L5.62132 6.5H23C23.8284 6.5 24.5 7.1716 24.5 8C24.5 8.8284 23.8284 9.5 23 9.5H5.62132z"/></svg>
        <span><slot></slot></span>
    </url>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';

@Options({})
export default class Back extends Vue {
    @Prop({default:''}) to!: string;

    back(){
        if (this.to === '')
            history.back();
    }
}
</script>

<style lang="scss">
.back {
    display: flex;
    align-items: center;

    svg {
        padding: 0 0.6rem 0 0.6rem;
    }

    &:hover {
        color: $primary;
        text-decoration: none !important;

        span {
            text-decoration: underline;
        }
    }
}
</style>