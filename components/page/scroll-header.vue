// The style tag is nessecary as the style should only be active iff the Options is present
<template>
    <header id="scroll-header">
        <div ref="scroll" class="common-container">
            <slot></slot>
        </div>
        <component :is="'style'">
        nav {
            background: none !important;
            color: white !important;
            box-shadow: none !important;
            border-bottom: none !important;
        }
        a.nav-link:before{
            background-color:#4f5f77 !important;
        }
        main{
            padding-top: 0vh !important;
        }
        </component>
    </header>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class ScrollHeader extends Vue {
    mounted(){

        window.onscroll = () => {
            // make the scollable item move slower than the scroll
            if (this.$refs.scroll)
                (this.$refs.scroll as HTMLElement).style.top = (window.pageYOffset / 1.5) + "px";
        }
    }
}
</script>

<style lang="scss">
#scroll-header {
    min-height: 40em;
    display: flex;
    position: relative;
    align-items: center;
    z-index: 0;
    justify-content: center;
    overflow: hidden;

    & > .common-container{
        padding: 4em 2em 2em 2em;
        color: white;
    }
    & > div {
        width: 100%;
        height: 100%;
        position: absolute;
    }
}
</style>