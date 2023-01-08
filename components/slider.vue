<template>
    <span class="slider">
        <input type="range" :min="min" :max="max" :value="value" @input="emit">
    </span>
</template>

<script lang="ts">
import {Vue, Options, Emit, Prop} from 'vue-property-decorator';

@Options({})
export default class Slider extends Vue{
    @Prop({required: true}) value!: number
    @Prop({required: true}) min!: number
    @Prop({required: true}) max!: number

    @Emit('change')
    emit(e: Event) {
        return (e.target as HTMLInputElement).value;
    }
}
</script>

<style lang="scss">
.slider {
    width: 100%;

    input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 0.6rem;
        background: $button-border;
        outline: none;
        border-radius: $radius-medium;
        -webkit-transition: .2s;
        transition: opacity .2s;

        &:hover { opacity: 0.8; }
        &:active::-webkit-slider-thumb,
        &:active::-moz-range-thumb {
            background: $primary-border-active;
            border: 0.2rem solid $button-border-active;
        }

        &::-webkit-slider-thumb,
        &::-moz-range-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 1.2rem;
            height: 1.2rem;
            background: $primary;
            cursor: pointer;
            border-radius: $radius-large;
            border: 0.2rem solid $text;
        }
    }
}
</style>