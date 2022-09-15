<template>
    <footer>
        <div class="common-container">
            <ul class="info">
                <url to="/" :to-root="true">TazARaz</url>
                <li class="name">
                    Emo Maat
                </li>
                <li class="copyright">
                    &#169; {{ new Date().getFullYear() }}&nbsp;
                </li>
            </ul>
            <ul class="footer-contact">
                <li class="title">Contact</li>
                <li>
                    <url to="/about" :to-root="true">About me</url>
                </li>
                <li>
                    <a href="mailto:emosbm@gmail.com" class="footer-link">Mail</a>
                </li>
            </ul>
            <ul class="footer-projects">
                <li class="title">Projects</li>
                <li>
                    <url to="/arcade" :to-root="true">Arcade</url>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator';

@Options({})
export default class Footer extends Vue {
}

</script>

<style lang="scss">
footer {
    background-color: $background-light;

    li {
        padding: 0;
        list-style: none;
    }

    ul.info {
        padding: 0 0 0 1.4em;
        a { color: #51beff; }
    }

    > .common-container{
        display: flex;
        grid-gap: 1.3rem;
        padding: 1.3rem;
        max-width: 70rem;
        margin: 0 auto;
        width: 100%;
    }

    .footer-projects,
    .footer-contact{
        padding: 0 1.3rem;
        flex-grow: 2;

        a { color: #2ad1aa; }
    }
    .title{
        font-size: 140%;
        padding-bottom: 0.5rem;
    }
    .info{
        flex-grow: 1;

        a {
            font-size: 130%;
        }
        .copyright{
            color: grey;
        }
    }
}

@media only screen and (max-width: 720px){
    footer > .common-container{
        flex-wrap: wrap;
        grid-gap: 0px;
    }
    footer .quickbar{
        flex-direction: initial;
        align-items: baseline;
        justify-content: space-between;
    }
    footer .quickbar li{
        padding: 0 0.6rem;
    }
}
</style>
