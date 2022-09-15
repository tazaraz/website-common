<template>
    <section class="common-container common-back-link">
        <nuxt-link v-if="url !== ''" :to="url">&#8592; <slot></slot></nuxt-link>
        <a v-else @click="back()">&#8592; <slot></slot></a>
    </section>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';

@Options({})
export default class Back extends Vue {
    @Prop({default:''}) url!: string;

    back(){
        history.back();
    }
}
</script>

<style lang="scss">
.common-back-link > a:hover{
    color: $primary;
}
</style>