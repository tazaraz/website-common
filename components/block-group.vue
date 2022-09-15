<template>
    <ul :id="id" :class="`block-items ${imaged}`">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert} from '../tools';

@Options({})
export default class BlockGroup extends Vue {
    @Prop() id: string | undefined

    public blockImages: Array<string> = [];
    imaged  = "";

    mounted(){
        assert(this.id, undefined, "BlockGroup requires an ID.");

        let count = 0;
        for (let b = 0; b < this.blockImages.length; b++)
            if (this.blockImages[b] !== "")
                count += 1;

        if (count !== 0) {
            if (count !== this.blockImages.length)
                assert(1, 1, "Either all blocks must have an image, or none at all.")

            this.imaged = "images"
        }
    }
}
</script>

<style lang="scss">
.block-items{
    padding: 0;
    margin: 0 auto;
    width: 100%;
    display: inline-flex;
    list-style-type: none;

    & > li{
        padding: 2em;
        min-width: 14em;
        width: 100%;

        display: grid;
        gap: 0.5em;
        grid-template-rows: 1.3em;
        flex: 1 0 21%;

        & > header {
            font-size: 1em;
            color: $primary;
            align-items: center;
        }
        & > footer {
            background: inherit;
        }
    }

    &.images > li{
        grid-template-rows: 5em;

        & > header{
            display: grid;
            grid-template-rows: 3em 1.5em;
            gap: 0.5em;

            img{
                height: 100%
            }
        }
    }
}

@media only screen and (max-width: 1020px){
    .block-items{
        flex-wrap: wrap;

        & > li{
            flex: 1 0 34%;
        }
    }
}
</style>