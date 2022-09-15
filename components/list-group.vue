<template>
    <ul :id="id" :class="`common-list${imaged}${width}`">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert} from '../tools';

@Options({})
export default class ListGroup extends Vue {
    @Prop({default: ""}) id!: string
    @Prop({default: 0}) gridSize!: number

    listImages: Array<string> = [];
    imaged = ""
    width = ""

    mounted(){
        let count = 0;
        for (let b = 0; b < this.listImages.length; b++)
            if (this.listImages[b] !== "")
                count += 1;

        if (count !== 0) {
            if (count !== this.listImages.length)
                assert(1, 1, "Either all ListItems must have an image, or none at all.")

            this.imaged = " images"
        }

        if (this.gridSize > 0)
            this.width = ` width-${this.gridSize}`
    }
}
</script>

<style lang="scss">
$item-min-width: 10rem;
.common-list {
    &:not(.grid).hover li:hover{
        transform: translateX(1.5%);
    }
    &:not(.hover) li a:hover{
        color: $primary;
    }
}


.common-list li{
    display: block;
    padding: 0;
    line-height: 1.3em;
    padding-bottom: 1em;
    transition: all .2s ease-in-out;

    span,
    a {
        width: 100%;
        height: 100%;

        header {
            color: $secondary;
        }

        footer{
            color: $text !important;
            background: inherit
        }

        &.default-cursor {
            cursor: default;
        }
    }

    footer:empty{
        display: none;
    }
}

/**
 * Grid
 */
.common-list.grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max($item-min-width, 100%/2), 1fr));
    overflow: hidden;
    grid-auto-rows: 1fr;

    li > span,
    li > a {
        padding: 2em;

        &:hover{
            color: $primary;
        }
    }
    &.hover:not(.images) li:hover{
        transform: scale(1.1) translate(1%);
    }
}

.common-list.grid.width-3 { grid-template-columns: repeat(auto-fill, minmax(max($item-min-width, 100%/3), 1fr)); }
.common-list.grid.width-4 { grid-template-columns: repeat(auto-fill, minmax(max($item-min-width, 100%/4), 1fr)); }
.common-list.grid.width-5 { grid-template-columns: repeat(auto-fill, minmax(max($item-min-width, 100%/5), 1fr)); }

/**
 * images grid
 */
.common-list.images {
    padding: 0;
    margin: 0 auto;
    width: 100%;
    display: grid;
    justify-content: center;

    li {
        padding: 1rem;
        max-width: 30rem;
        margin: 0 auto;

        & > span,
        & > a {
            padding: 0;
            position: relative;
            display: flex;
        }
        &:hover img { filter: blur(2px); }
        &:hover .list-title { opacity: 1; }
    }
    img {
        transition: all .3s ease-in-out;
        width: 100%;
        min-width: $item-min-width;
    }
    .list-title{
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        position: absolute;

        color: $primary;
        font-size: 1.5em;
        font-weight: bold;
        text-decoration: none;

        text-align: center;
        justify-content: center;
        align-items: center;
        background: rgba($primary, 0.4);
        transition: all .3s ease-in-out;
        opacity: 0;
    }
}

// @media only screen and (max-width: 600px){
//     .common-list.grid{
//         grid-template-columns: 50% 50%;
//         padding:0;
//     }
//     .common-list.grid li{
//         padding:2em;
//         text-align: center;
//     }
// }
// @media only screen and (max-width: 450px){
//     .common-list.grid{
//         grid-template-columns: 100%;
//         padding:0;
//     }
// }
</style>