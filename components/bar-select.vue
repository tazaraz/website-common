<template ref="select">
    <div :id="id" class="bar-select" @click="onClick">
        <ul ref="options" @scroll="updateBar">
            <slot></slot>
        </ul>
        <span ref="bar" class="selected"/>
    </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator';
import { selectEvent } from '../events'

@Options({})
export default class BarSelect extends Vue {
    @Prop() id: string | undefined

    public selectedElement = 0;
    private items!: HTMLUListElement;
    private bar!: HTMLSpanElement;
    private barTransition!: CSSStyleDeclaration['transition'];

    mounted(){
        this.items = this.$refs.options as HTMLUListElement;
        this.bar = this.$refs.bar as HTMLSpanElement;
        this.barTransition = getComputedStyle(this.bar).transitionDuration;

        // For every item given
        for (let c = 0; c < this.items.children.length; c++) {
            // Make sure it is a LI element
            if (this.items.children[c].nodeName !== "LI" &&
                this.items.children[c].nodeName !== "A") {
                this.items.removeChild(this.items.children[c]);
                console.warn(`select contains non-li/a elements: ${this.items.children[c].nodeName}`);
            }

            // Set the selected element if specified
            // @ts-ignore-next-line => ".selected" is per default not defined.
            if ((this.items.children[c] as HTMLLIElement).attributes.selected !== undefined) {
                // There should only be one selected element specified
                if (this.selectedElement !== 0) {
                    console.warn("There are multiple selected elements specified!");
                    continue;
                }

                // This is the selected Li element
                this.selectedElement = c;

                // Preset the offset of the bar, knowing which li is assigned as selected
                const offset = this.calculateOffset(this.items.children[c]);
                this.bar.style.top = offset + "px";
            }
        }
    }

    select(index: number) {
        if (index > this.items.children.length || index < 0)
            return false;
        else
            (this.items.children[index] as HTMLLIElement).click();
    }

    @Emit('click')
    onClick(event: Event): selectEvent {
        if (event.target && (
            (event.target as HTMLLIElement).matches("li") || (event.target as HTMLAnchorElement).matches("a"))) {
            // Re-enable the animation if it was disabled due to a scroll
            this.bar.style.transitionDuration = this.barTransition;
            const offset = this.calculateOffset(event.target);
            this.bar.style.top = offset + "px";
        }

        // Allow parent to listen to a change
        return {
            id: this.selectedElement,
            target: (this.items.children[this.selectedElement] as HTMLLIElement)
        } as selectEvent;
    }

    calculateOffset(target: Event["target"]): number {
        // Try to find the element which was clicked
        for (let c = 0; c < this.items.children.length; c++) {
            // If this is the element clicked
            if (this.items.children[c] === target) {
                // Set the selected bar height
                this.selectedElement = c;
                return (this.items.children[c] as HTMLLIElement).offsetTop - this.items.scrollTop;
            }
        }

        return 0;
    }

    updateBar(){
        // Scrolling, disable the animation
        this.bar.style.transition = "0.0s";
        const offset = (this.items.children[this.selectedElement] as HTMLLIElement).offsetTop - this.items.scrollTop;
        this.bar.style.top = offset + "px";
    }
}

</script>

<style lang="scss">
.bar-select {
    margin: 1.5em 0;
    position: relative;
    display: inline-block;
    font-size: 105%;
    max-width: 30em;
    overflow: hidden;
    ul {
        width: 100%;
        max-height: 17em;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        list-style-type: none;
        z-index: 2;
        position: inherit;

        li, a {
            padding: 0.5em 0.8em;
            font-size: 90%;
            font-weight: 500;
            color: $primary;
            cursor: pointer;
        }

    }

    span.selected {
        height: 2em;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        background: $background-dark;
        transition: 0.4s;
        -webkit-box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
        box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
        border-radius: $radius-small;
        z-index: 0;
    }
}
</style>