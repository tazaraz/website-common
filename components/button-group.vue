<template>
    <div :id="id" class="buttongroup">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert} from '../tools';

@Options({})
export default class ButtonGroup extends Vue {
    @Prop() id: string | undefined

    public primary: Array<string> = [];
    public fetchingChildren = true;

    mounted(){
        if (this.primary.length > 1)
            assert(1, 1, "ButtonGroup can only have one primary Button");
    }
}
</script>

<style lang="scss">
/**
 * Common button
 * Has a group to stay in nice order
 */
.buttongroup{
    position: relative;
    padding: 1em;
    display: flex;
    flex-wrap: wrap;
}
</style>