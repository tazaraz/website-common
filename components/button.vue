<template>
    <input
        v-if="type != ''"
        :type="type"
        :value="value"
        :class="`common-button ${prim}`"
    />
    <Url v-else :to="to" :direct="direct" :to-root="toRoot" :target="target" :classes="`common-button ${prim}`">{{
        value
    }}</Url>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';

@Options({})
export default class Button extends Vue {
    @Prop() primary: string | undefined

    @Prop({default: ""}) value!: string | undefined
    @Prop({default: ""}) type!: string

    @Prop({default: ""}) to!: string;
    @Prop() classes!: string;
    /* Sets the <a></a> target */
    @Prop({default: ""}) target!: string;
    /* Enforces the link to be an <a> tag */
    @Prop({default: false}) direct!: boolean;
    /* Makes the url target the root domain instead of the subdomain */
    @Prop({default: false}) toRoot!: string;

    prim = ""

    beforeMount(){
        // If <Button primary text=""..../>
        // this.primary will be <empty string> instead of undefined
        if (this.primary !== undefined)
            this.prim = "primary"
    }
}
</script>

<style lang="scss">
input.common-button {
    font-size: 100%;
    cursor: pointer;
}
.common-button {
    padding: 0.8em 0.5em;
    margin: 0.8em;
    display: inline-block;
    text-align: center;
    border-radius: $radius-medium;
    font-weight: 600;
    transition: 0.25s;

    &:not(.primary) {
        color: $primary;
        background: $button;
        // border: $button-border solid 0.15em;

        &:hover {
            background: $button-active;
            // border: $button-border-active solid 0.15em;
        }
    }
    &.primary {
        color: white;
        background: $primary;
        // border: $primary-border solid 0.15em;

        &:hover {
            background: $primary-active;
            // border: $primary-border-active solid 0.15em;
        }
    }
}
</style>