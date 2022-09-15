<template>
    <div class="dropdown-inline">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.dropdown-inline {
    display: inline-flex;
    white-space: nowrap;

    & div {
        position: relative;
        .dropdown {
            line-height: initial;
            margin: 0.4rem 0.2rem 0.4rem 1rem;
            width: 6rem;
        }
    }
}
</style>