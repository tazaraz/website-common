<template>
    <div>
        <PageHeader :items="items" />
        <PageMain>
            <slot />
        </PageMain>
        <PageFooter />
    </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';
import { IPageLink } from '../components/page/header.vue';

@Options({
    head: {
        title: "TazARaz",
        meta: [
            {
                property: 'og:description',
                content: 'A place for all of my personal projects.',
            },
        ]
    }
})
export default class App extends Vue {
    items: IPageLink[] = [
        {title: 'TazARaz', to: '/', location: "left", toRoot: true},
        {title: 'About', to: '/about/', location: "right", toRoot: true},
    ];
    mounted() {
        console.log(1)
    }
}
</script>
