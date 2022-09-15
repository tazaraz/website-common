<template>
    <p class="article-title"><slot></slot></p>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class ArticleTitle extends Vue {
}
</script>

<style lang="scss">
.article-title{
    padding: 0.5em 2em 0.5em 1.5em;
    margin: 0 auto;
    width: 100%;
    max-width: 70rem;
    font-size: 160%;
    font-weight: 300;
    line-height: 160%;
    letter-spacing: .025em;
}
</style>