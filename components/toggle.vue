<template>
    <label v-if="type === 'switch'" :id="styling" class="switch">
        <input :id="id" type="checkbox" :checked="checked !== undefined" :disabled="disabled !== undefined">
        <div>
            <span><slot></slot></span>
        </div>
    </label>
    <label v-else :id="styling" class="checkbox">
        <input :id="id" type="checkbox" :checked="checked !== undefined" :disabled="disabled !== undefined">
        <span></span>
        <slot></slot>
    </label>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert} from '../tools';

@Options({})
export default class Toggle extends Vue {
    /** Id used for styling the button */
    @Prop({required: false}) id!: string;
    /** Id used to get the value of the button */
    @Prop({}) styling: string | undefined;
    /** Type of the toggle.
     * can be either "switch" or "checkbox"
     */
    @Prop({default: "switch"}) type!: "switch" | "checkbox";
    /**
     * Whether the default is checked
     */
    @Prop() checked!: boolean;
    @Prop() disabled!: boolean;

    created(){
        assert(this.id, undefined, "Toggle requires an ID.");
    }
}
</script>

<style lang="scss">
.switch {
    margin: 0.5em;
    width: 3.65rem;
    height: 2em;
    position: relative;
    display: table;

    input {
        opacity: 0;
        width: 0;
        height: 0;
        display: none;

        &:checked + div {
            background-color: $primary;
            &::before {
                left: 1.75rem;
            }

            &:hover{
                background-color: $primary-active;
            }
        }
    }
    div {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        cursor: pointer;
        border-radius: 2em;
        background-color: $button-border-active;
        -webkit-transition: .5s;
        transition: .5s;

        &:hover{
            background: $button-active;
        }

        &::before {
            content: "";
            height: 1.6rem;
            width: 1.6rem;
            left: 0.30rem;
            bottom: 0.20rem;
            position: absolute;
            background-color: white;
            border-radius: 50%;
            -webkit-transition: .5s;
            transition: .5s;
        }
    }
    span {
        margin-left: 5rem;
        line-height: 2.1rem;
        white-space: nowrap;
    }
}
.checkbox {
    display: table;
    position: relative;
    padding-top: 0.1em;
    padding-left: 2em;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 100%;

    &:hover input + span {
        background-color: $button-active;
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        display: none;

        &:checked + span {
            background-color: $secondary;
        }

        /* Show the checkmark when checked */
        &:checked + span::after {
            display: block;
        }
    }

    &:active input + span {
        opacity: 0.6;
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        height: 1.55em;
        width: 1.55em;
        border-radius: $radius-medium;
        background-color: $button-border-active;

        &::after {
            content: "";
            position: absolute;
            display: none;
            left: 0.55rem;
            top: 0.25rem;
            width: 0.3rem;
            height: 10px;
            border: solid white;
            border-width: 0 0.25rem 0.25rem 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }

}
</style>