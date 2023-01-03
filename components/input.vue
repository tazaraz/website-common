<template>
    <label :id="id" class="common-input">
        <input
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
    border-radius: $radius-small;

    :focus {
        outline: none;
    }

    input{
        width: 100%;
        padding: 0.6em;
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
    background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' width='50px' height='50px' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M602.829 712.369l230.358 233.067c22.423 22.687 58.944 22.853 81.572.373s22.795-59.096.372-81.783l-222.148-224.76c53.94-61.34 86.688-142.107 86.688-230.556 0-191.674-153.786-347.268-343.755-347.268S92.161 217.037 92.161 408.71c0 191.674 153.786 347.268 343.755 347.268 60.591 0 117.501-15.829 166.914-43.608zm-166.914-72.052c-126.02 0-228.394-103.577-228.394-231.608s102.374-231.608 228.394-231.608c126.02 0 228.394 103.577 228.394 231.608S561.935 640.317 435.915 640.317z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 0.6em center;
    background-size: 1.4rem;
    padding-left: 2.5em !important;
}
</style>