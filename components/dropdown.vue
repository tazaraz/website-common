<template>
    <div :id="id" class="dropdown" @click="onChange">
        <ul ref="options">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator';
import { DropdownEvent } from '../events';

@Options({
    emits: ['click', 'close']
})
export default class Dropdown extends Vue {
    @Prop() id: string | undefined

    public isOpen           = false;

    private selected        = 0;
    private maxHeight       = 0;
    private items!:         HTMLUListElement;

    @Emit('click')
    public onChange(event: Event): DropdownEvent {
        if (event.target && (event.target as HTMLLIElement).matches("li")) {
            // If the dropdown menu is open
            if (this.isOpen) {
                this.closeDropdown(event);
            } else {
                this.openDropdown();
            }
        }

        // Allow parent to listen to a change
        return {
            id: this.selected,
            target: (this.items.children[this.selected] as HTMLLIElement),
            isOpen: this.isOpen
        } as DropdownEvent;
    }

    beforeMount(){
        // This should be done only once
        if (Vue.prototype.$dropdown_listeners !== true) {
            Vue.prototype.$dropdown_list = [];
            Vue.prototype.$dropdown_listeners = true;

            window.addEventListener('mouseup', event => {
                Vue.prototype.$dropdown_list.forEach((element: Dropdown) => {
                    if (element.isOpen && ((event !== undefined &&
                        (event.target as HTMLElement).parentNode !== element.items &&
                        (event.target as HTMLElement).parentNode?.parentNode !== element.items &&
                        (event.target as HTMLElement).parentNode?.parentNode?.parentNode !== element.items) ||
                        event === undefined)) {
                        element.closeDropdown();
                    }
                });
            })
        }
    }

    mounted(){
        // Get the container for the elements of the dropdown
        this.items = this.$refs.options as HTMLUListElement;

        // Get the maxHeight and margin of the element
        this.maxHeight = parseFloat(getComputedStyle(this.items).maxHeight);

        // Add the selected class to the list item
        this.items.children[this.selected].classList.add("selected");

        // Add the instance to a global list, so we can access it to close it if clicked outside
        Vue.prototype.$dropdown_list.push(this)
    }

    select(index: number){
        // If this element does not exist, return false
        if (index < 0 || index >= this.items.children.length)
            index = 0;

        this.selected = index;
        this.calculateSelectedElement();
        return this.items.children[this.selected] as HTMLLIElement;
    }

    private calculateSelectedElement(){
        // If somehow the selected element exceeds the amount of children
        this.selected = this.selected > this.items.children.length - 1 ? 0 : this.selected

        // For every item given
        for (let c = 0; c < this.items.children.length; c++) {
            // Make sure it is a LI element
            if (this.items.children[c].nodeName !== "LI") {
                this.items.removeChild(this.items.children[c]);
                console.warn("dropdown contains non-li elements.");
            }

            // Set the selected element if specified
            // @ts-ignore-next-line => ".selected" is per default not defined.
            if ((this.items.children[c] as HTMLLIElement).attributes.selected !== undefined) {
                // If this is the second element we encounter with the selected attribute, remove it
                if (this.selected !== -1)
                    // This is the selected Li element
                    this.selected = c;
            }

            this.items.children[c].classList.remove("selected");
        }

        // This means we failed to find the selected element
        this.items.children[this.selected].classList.add("selected");
    }

    public closeDropdown(event: Event | undefined = undefined){
        this.selected = this.selected > this.items.children.length - 1 ? 0 : this.selected;

        // Find the id of the element clicked
        // Calculate the offset for next time
        if (event) {
            for (let c = 0; c < this.items.children.length; c++) {
                // If this is the element clicked
                if (this.items.children[c] === event.target) {
                    // Make the clicked li the selected one
                    this.items.children[this.selected].classList.remove("selected");
                    this.items.children[c].classList.add("selected");

                    // Set the offset
                    this.selected = c;
                    break;
                }
            }
        }

        this.isOpen = false;

        // Remove the absolute style offset
        this.items.style.top = "0px";

        // Close the dropdown
        this.items.classList.remove("open");
        this.$el.classList.remove("open");

        // If there is no event, it means we clicked outside of the dropdown and it has closed
        if (!event)
            this.$emit('close')
    }

    public openDropdown(){
        // Save the original position of the dropdown
        const oldBoundingBox = (this.$el as HTMLElement).getBoundingClientRect();

        // Add the class to the list to open it
        this.items.classList.add("open");
        this.$el.classList.add("open");
        // Temporarily reset the style defined margin
        this.items.style.maxHeight = this.maxHeight + "px";

        this.isOpen = true;
        this.preventOutOfBounds(oldBoundingBox);
    }

    public preventOutOfBounds(oldBoundingBox: DOMRect){
        this.calculateSelectedElement();
        const selected = (this.$el as HTMLLIElement).getBoundingClientRect();
        const itemHeight = (this.items.children[this.selected] as HTMLLIElement).offsetHeight;
        let item = (this.items.children[this.selected] as HTMLLIElement).offsetTop;

        // If the user scrolled and now the item is not visible anymore
        if (item < this.items.scrollTop) {
            // Set the scroll to the item itself, making it visible
            this.items.scrollTop = item
            // Adjust the dropdown offset
            item = this.items.scrollTop - item;
        }

        else if (item > this.items.offsetHeight + this.items.scrollTop) {
            // Scroll to the item, accounting for the height of that item
            this.items.scrollTop = item - this.items.offsetHeight + itemHeight
            // We scrolled up exactly how much we need to move the dropdown down
            item -= this.items.scrollTop;
        }

        else
            // Take scroll into account
            item -= this.items.scrollTop

        // Calculate the change and undo it
        let top = oldBoundingBox.top - selected.top - item;

        // Write the offset
        this.items.style.top = top + "px";

        // Now check if we are out of bounds
        const container = this.items.getBoundingClientRect();
        if (container.top < 0) {
            // Minus because container is negative
            top -= container.top;
        } else if (container.top + container.height > window.innerHeight) {
            // We need to adjust the max-height
            this.items.style.maxHeight = container.height - ((container.height + container.top) - window.innerHeight) + "px";
        }

        // Update the style
        this.items.style.top = top + "px";
    }
}
</script>

<style lang="scss">
.dropdown {
    position: relative;
    display: inline-block;
    font-size: 105%;
    background-color: $background-dark;
    -webkit-box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
    box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
    border-radius: $radius-small;

    &.open {
        position: absolute;
        ul {
            display: unset;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        max-height: 29rem;
        position: absolute;
        white-space: nowrap;
        list-style-type: none;
        display: contents;

        background-color: $background-dark;
        -webkit-box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
        box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px $radius-small rgba(0,0,0,.08);
        border-radius: $radius-small;

        /* transition: 0.4s; */

        &.open {
            overflow-y: auto;
            z-index: 10;

            /* Add a hover effect */
            li:hover, li.hover {
                background: $button-active;
            }
        }

        /* If the dropdown is not open */
        &:not(.open) {
            /* Add an indicator icon */
            .selected {
                border: none;
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14"><path d="M8 5 4.5 1.5 1 5m0 4 3.6 3.5L8 9" fill="none" stroke="%232ad1aa" stroke-width="2"/></svg>') no-repeat calc(100% - 1rem) center;
                background-size: 1rem 1rem;
            }
            /* Hide non-selected items */
            & > li:not(.selected){
                display: none;
            }
        }
    }

    li {
        width: 100%;
        padding: 0.5rem 3rem 0.5rem 0.8rem;
        font-size: 90%;
        font-weight: 500;
        color: $primary;
        cursor: pointer;
    }
}
</style>
