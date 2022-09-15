<template>
    <article v-if="error && error.statusCode == 404" class="common-container">
        <header id="title">
            I've looked everywhere, but I can't find it...
            <p class="small">
                The page you looked for might not exist anymore, or did not at all.
            </p>
        </header>
        <div class="options">
            Go to the <url to="/" :to-root="true">homepage</url>, or try some of the following pages:
            <list-group id="projects" class="hover">
                <list-item title="Arcade" url="/arcade/">
                    A web-based, black-white, custom rebuild of games.
                </list-item>
            </list-group>
        </div>
    </article>
    <article v-else-if="error && error.statusCode == 406" class="common-container">
        <header id="title">
            Something is not right...
            <p class="small">
                Please try to reload the page.
            </p>
        </header>
    </article>
    <article v-else class="common-container">
        <header id="title">
            Whoops, I did not account for error {{error.statusCode}}!
            <p class="small">
                Go back or try reloading the page.
            </p>
            <Back>Go to the previous page</Back>
        </header>
    </article>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';

@Options({
    layout: 'error', // you can set a custom layout for the error page
    head: {
        title: "Where did you go?",
        meta: [
            {
                property: 'og:description',
                content: 'That page is unknown to me.',
            },
        ]
    }
})
export default class App extends Vue {
    @Prop({default: null}) error: Object;
}

</script>

<style lang="scss" scoped>
.common-container{
    max-width: 70rem;
    margin: 0 auto;
    padding: 10rem 2em 0 2rem;
    width: 100%;

    #title{
        font-size: 180%;
        font-weight: 600;
        .small{
            font-size: 70%;
        }
    }
    .options{
        margin-top: 5em;
        display: block;
        .help .common-card{
            padding: 0;
            min-height: 0;
        }
        .border{
            border: 0.1em white solid;
        }
    }
}
</style>