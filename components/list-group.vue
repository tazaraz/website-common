<template>
    <ul :id="id" :class="`common-list`">
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
    display: flex;
    padding: 0;
    line-height: 1.3em;
    padding-bottom: 1em;
    transition: all .2s ease-in-out;
    align-items: center;

    & > a {
        display: flex;
        align-items: center;
        width: 100%;
    }

    span {
        width: 100%;
        height: 100%;

        header {
            color: $secondary;
        }

        footer{
            color: $text;
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
    &.hover li:hover{
        transform: scale(1.1) translate(1%);
    }
}

@media only screen and (max-width: 600px){
    .common-list.grid{
        grid-template-columns: 100%;
        padding:0;
    }
    .common-list.grid li{
        padding:2em;
        text-align: center;
    }
}
</style>