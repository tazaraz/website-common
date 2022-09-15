<template>
    <li v-if="url !== ''">
        <url v-if="image == ''" :to="url" :target="target" :class="cursor" :direct="direct">
            <header>{{title}}</header>
            <footer><slot></slot></footer>
        </url>
        <url v-else :to="url" :target="target" :class="cursor" :direct="direct">
            <img :src="image"/>
            <header class="list-title">{{title}}</header>
        </url>
    </li>
    <li v-else>
        <span v-if="image == ''" :class="cursor">
            <header>{{title}}</header>
            <footer><slot></slot></footer>
        </span>
        <span v-else :class="cursor">
            <img :src="image"/>
            <header class="list-title">{{title}}</header>
        </span>
    </li>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert, externalUrl} from '../tools';

@Options({})
export default class ListItem extends Vue {
    @Prop({required: true}) title: string | undefined
    @Prop({default:""}) url!: string
    @Prop({default:""}) target!: string
    @Prop({default:""}) image!: string
    @Prop({default: false}) direct!: boolean

    externalUrl = externalUrl
    cursor = "";

    created(){
        assert((this.$parent as any).listImages, null, "ListItem must be placed inside a ListGroup.");
        assert((this.$parent as any).listImages, undefined, "ListItem must be placed inside a ListGroup.");
        assert(this.title, undefined, `ListItem missing 'title' attribute.`);

        (this.$parent as any).listImages.push(this.image)
    }

    beforeMount(){
        if (!this.url){
            this.cursor = "default-cursor";
        }
    }
}
</script>
