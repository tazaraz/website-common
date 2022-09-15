<template>
    <main>
        <slot></slot>
    </main>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class Main extends Vue {}

</script>
