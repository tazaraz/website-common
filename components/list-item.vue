<template>
    <li v-if="to !== ''">
        <url :to="to" :target="target" :class="cursor" :direct="direct">
            <img v-if="image != ''" :src="image"/>
            <span>
                <header>{{title}}</header>
                <footer><slot></slot></footer>
            </span>
        </url>
    </li>
    <li v-else :class="cursor">
        <img v-if="image != ''" :src="image"/>
        <span>
            <header>{{title}}</header>
            <footer><slot></slot></footer>
        </span>
    </li>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';
import {assert, externalUrl} from '../tools';

@Options({})
export default class ListItem extends Vue {
    @Prop({required: true}) title: string | undefined
    @Prop({default:""}) to!: string
    @Prop({default:""}) target!: string
    @Prop({default:""}) image!: string
    @Prop({default: false}) direct!: boolean

    externalUrl = externalUrl
    cursor = "";

    beforeMount(){
        if (!this.to){
            this.cursor = "default-cursor";
        }
    }
}
</script>
