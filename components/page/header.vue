<template>
    <nav>
        <ul>
            <li v-for="item in items"
                :key="item.title + item.id"
                :class="`nav-item ${item.location}`">
                <url :id="item.id"
                     :to="item.to"
                     :classes="'nav-link'"
                     :to-root="item.toRoot">{{item.title}}</url>
            </li>
            <li class="nav-item mobile">
                <label id="nav-popup-toggle" for="nav-popup-bool">
                    <a class="nav-link">
                        <h2 class="burger">Menu</h2>
                    </a>
                </label>
                <!-- start popup -->
                <input id="nav-popup-bool" type="checkbox" style="display: none;">
                <ul id="nav-popup-list" ref="nav-popup-list">
                    <li class="nav-popup-item header">
                        <span>Overview</span>
                        <label class="nav-popup-link" for="nav-popup-bool">
                            <h2 class="cross">Close</h2>
                        </label>
                    </li>
                    <li v-for="(item, index) in items"
                        :key="item.title"
                        :class="`nav-popup-item ${item.location}
                            ${item.location === 'left' && items[index+1].location === 'right' ? 'separator' : '' }`">
                        <Url
                            :id="item.id"
                            :to="item.to"
                            :classes="'nav-popup-link'"
                            :to-root="item.toRoot">{{item.title}}</Url>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator';

export interface HeaderCss {
    popupColor?: string;
}

export interface IPageLink {
    title: string;
    to: string;
    location: string;
    id?: string;
    toRoot?: boolean;
}

@Options({})
export default class Header extends Vue {
    @Prop({required: true}) items!: IPageLink[];
    @Prop({required: false}) css!: HeaderCss | undefined;

    mounted(){
        if (!this.css) return

        const popup = (this.$refs["nav-popup-list"] as HTMLUListElement);
        if (this.css.popupColor)
            popup.style.color = this.css.popupColor;
    }
}

</script>


<style lang="scss" scoped>
nav{
    z-index: 10;
    padding: 1rem;
    height: 5rem;
    left: 0;
    right: 0;
    position: absolute;
    background: $background-light;
    color: $primary;
    box-shadow: 0 0 1.2em rgba(0, 0, 0, .5);
    border-bottom: 0.2rem $background-medium solid;

    & > ul {
        padding: 0;
        margin: 0 auto;
        height: 100%;
        position: relative;
        font-size: 100%;
        max-width: 70rem;
    }
    .nav-item {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 110%;

        &.left{ font-size: 130%; }
    }

    .nav-link {
        position: relative;
        padding: 1em;
        color: inherit;
        white-space: nowrap;

        &::before {
            content: "";
            position: absolute;
            width: 89%;
            height: 0.1em;
            bottom: 0.5em;
            left: 5%;
            background-color: #697490;
            visibility: hidden;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: all 0.3s ease-in-out 0s;
            transition: all 0.3s ease-in-out 0s;
        }

        &:hover::before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
}

/**
 * Handles items based screen width
 */
@media only screen and (min-width: 650px){
    nav > ul { display: flex; }
    .nav-item.right {margin-left: auto;}
    .nav-item.right ~ .nav-item.right{margin-left: 0;}
    .nav-item.mobile { display: none; }
}
@media only screen and (max-width: 650px){
    nav > ul { display: flex; }
    .nav-item.left{ justify-content: initial; flex-grow: 1; }
    .nav-item.right { display: none; }
    nav:not(.no-mobile) .nav-item.mobile { display: flex; }
}

/**
 * Navbar popup for mobile browsers
 */
#nav-popup-list{
    padding: 0;
    background: $background-light;
    position: absolute;
    left: 0;
    right: 0;
    top: 0.5rem;
    border-radius: $radius-medium;
    transition: 0.3s;
    box-shadow: 0 0.7rem 1rem rgba(0, 0, 0, .3);

    .nav-popup-item{
        display: flex;
        margin: 0.5rem 1rem;

        &.header > span {
            flex-grow: 1;
            line-height: 3.3rem;
            padding: 0 1rem;
            font-size: 130%;
            color: $text;
        }
        &.left{
            display: flex;
            font-size: 120%;
            &.separator {
                border-bottom: 0.2rem solid #e3e3e3;
            }
        }
        &.right a {
            color: $secondary;
        }
    }

    .nav-popup-link{
        position: relative;
        line-height: 3.3rem;
        height: 3.3rem;
        display: inline-block;
        padding: 0 1.7rem;
        color: #2ad1aa;
        cursor: pointer;
    }
}

/**
 * Hamburger drawing
 */
#nav-popup-toggle{
    width: 100%;
    height: 100%;
    position: relative;
}

.nav-item.mobile .nav-link{
    padding: 0 1.7rem;
    height: 100%;
    cursor: pointer;
    display: block;
}
.nav-item.mobile .nav-link::before {
    visibility: hidden;
}

#nav-popup-toggle a > .burger,
#nav-popup-toggle a > .burger::before,
#nav-popup-toggle a > .burger::after{
    font-size: 0px;
    width: 1.7rem;
    height: 0.2rem;
    top: 50%;
    right: 0.85rem;
    position: absolute;
    background: currentColor;
    border-radius: $radius-small;
}
#nav-popup-toggle a > .burger::before,
#nav-popup-toggle a > .burger::after{
    content:"";
    left: 0;
}


#nav-popup-toggle a > .burger::before{ top: -9px; }
#nav-popup-toggle a > .burger::after{ top: +9px; }

/* dawing of the cross */
.nav-popup-item.header label > .cross,
.nav-popup-item.header label > .cross::after{
    font-size: 0px;
    width: 2rem;
    height: 0.3rem;
    top: calc(50% - 0.1rem);
    left: calc(50% - 1rem);
    position: absolute;
    transform: rotate(45deg);
}
.nav-popup-item.header label > .cross {
    background: #23b391;
}
.nav-popup-item.header label > .cross::after{
    content:"";
    background: #17d860;
    left: 0;
    top: 0;
    transform: rotate(90deg);
}

/* handle the popup toggle */
#nav-popup-list {
    opacity: 0;
    pointer-events: none;
}

#nav-popup-bool:checked ~ #nav-popup-list {
    opacity: 1;
    pointer-events: auto;
}

</style>