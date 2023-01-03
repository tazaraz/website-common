<template>
    <url class="back" :to="to" @click="back">
        <i>&#8592;</i>
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

    i {
        font-size: 120%;
        padding: 0 0.5rem 4% 0.6rem;
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