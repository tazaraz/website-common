<template>
    <label class="common-input">
        <input :id="id"
               ref="input"
               :autofocus="focus"
               :type="type"
               :placeholder="placeholder"
               :value="value"
               :pattern="pattern"
               :required="required"
               @input="change"/>
        <span></span>
    </label>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator';
import { InputEvent } from '../events';

@Options({})
export default class Input extends Vue {
    @Prop() value: string | undefined
    @Prop() id: string | undefined
    @Prop({default:"text"}) type!: string
    @Prop({default:""}) placeholder!: string
    @Prop({default: false}) required!: boolean
    @Prop({default: "[\\w ,.\(\)]+"}) pattern!: string

    @Prop({default: false}) autofocus!: boolean | string

    focus!: boolean;

    @Emit("change")
    change(): InputEvent {
        return {
            value: (this.$refs["input"] as HTMLInputElement).value,
            target: this.$refs["input"] as HTMLInputElement
        };
    }

    created(){
        this.focus = this.autofocus === "";
    }
}
</script>

<style lang="scss">
.common-input{
    max-width: 25em;
    min-width: 15em;
    display: inline-block;
    position: relative;
    background: $background-medium;
    border: 0.2rem solid $background-dark;
    border-radius: $radius-small;

    input{
        width: 100%;
        padding: 1em;
        color: $text;
        border-radius: $radius-small;
    }
    span{
        content:"";
        width: 0;
        margin-top:-3px;
        display: block;
        position: absolute;
        border-bottom: 3px solid $primary;
        transition: 0.7s cubic-bezier(.22,.61,.36,1);
        z-index: 1;
    }

    /* Custom styling */
    &.shadow{
        -webkit-box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
        box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08);
    }

    &.line{
        overflow: hidden;
        &:hover span,
        & input:focus + span{
            width: 100%;
        }
    }

    &.invalid + span,
    & input:invalid + span{
        width: 100%;
        border-bottom: 3px solid red;
    }
}

/* Override default */
input[type="search"]{
    background-image: url(/img/common/search-small.svg);
    background-repeat: no-repeat;
    background-position: 0.6em center;
    background-size: 1.4em;
    padding-left: 2.5em !important;
}
</style>