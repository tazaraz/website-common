<template>
    <div v-if="image !== undefined" class="common-visual">
        <img :src="image" :alt="alt">
        <p> {{text}} </p>
    </div>
    <div v-else-if="gif !== undefined" class="common-visual">
        <img :src="gif" :alt="alt">
        <p> {{text}} </p>
    </div>
    <div v-else-if="video !== undefined" class="common-visual">
        <video>
            <source :src="video">
        </video>
        <p> {{text}} </p>
    </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert} from '../tools';

@Options({})
export default class Visual extends Vue {
    @Prop() image: string | undefined
    @Prop() gif: string | undefined

    @Prop({default:""}) text!: string
    @Prop({default:""}) alt!: string

    video = undefined

    created(){
        if (this.image === undefined &&
            this.video === undefined &&
            this.gif === undefined) {
            assert(true, false, "Visual requires an image, video or gif location.");
        }
    }
}
</script>

<style lang="scss">
.common-visual{
    padding: 1em;

    img{
        padding-bottom: 0.3em;
        max-width: 100%;
        display: block;
    }
}
</style>