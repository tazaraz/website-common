<template>
    <li>
        <header>
            {{title}}
            <img v-if="image != ''" src="image" />
        </header>
        <div class="block-text" v-html="text"></div>
        <footer v-if="url !='' && urltext != ''">
            <nuxt-link v-if="!externalUrl(url)" :to="url" :target="urltarget" v-html="urltext"></nuxt-link>
            <a         v-else :href="url" :target="urltarget" v-html="urltext"></a>
        </footer>
    </li>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert, externalUrl} from '../tools';

@Options({})
export default class Block extends Vue {
    @Prop({required: true}) title!: string | undefined;
    @Prop({required: true}) text!: string | undefined;
    @Prop({default:""}) url!: string;
    @Prop({default:""}) urltext!: string;
    @Prop({default:""}) urltarget!: string;
    @Prop({default:""}) image!: string;

    externalUrl = externalUrl

    created(){
        assert((this.$parent as any).blockImages, null, "Block must be placed inside a BlockGroup.");
        assert((this.$parent as any).blockImages, undefined, "Block must be placed inside a BlockGroup.");

        assert(this.title, undefined, `Block missing 'title' attribute.`);
        assert(this.text, undefined, `Block missing 'text' attribute.`);

        // Let the parent check if all block either have or have no image
        (this.$parent as any).blockImages.push(this.image)
    }
}
</script>