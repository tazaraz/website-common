<template>
    <nuxt-link v-if="!direct && !externalUrl(url) && target === ''" :class="classes" :to="url">
        <slot></slot>
    </nuxt-link>
    <a v-else-if="target === ''" :class="classes" :href="url">
        <slot></slot>
    </a>
    <a v-else :class="classes" :href="url" :target="target">
        <slot></slot>
    </a>
</template>

<script lang="ts">
import { Options, Prop, Vue } from  'vue-property-decorator';
import { externalUrl } from '../tools';

@Options({})
export default class Url extends Vue {
    @Prop({default: ""}) to!: string;
    @Prop() classes!: string;
    /* Sets the <a></a> target */
    @Prop({default: ""}) target!: string;
    /* Enforces the link to be an <a> tag */
    @Prop({default: false}) direct!: boolean;
    /* Makes the url target the root domain instead of the subdomain */
    @Prop({default: false}) toRoot!: string;

    externalUrl = externalUrl;
    url = "";

    mounted(){
        const config = useRuntimeConfig();

        // If we want to go to the root domain add a http(s) to the url to ensure redirect
        if (this.toRoot && window.location.hostname !== config.DOMAIN){
            this.url = config.PROTOCOL + config.DOMAIN;
        }

        // Add the location to the url
        this.url += this.to;
    }
}
</script>