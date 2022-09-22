import { NuxtConfig } from '@nuxt/schema';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
    head: {
        meta: [
            { name: 'og:title', content: 'TazARaz' },
            { name: 'og:site_name', skip: true },
            { name: 'apple-mobile-web-app-title', skip: true },
            { name: 'author', skip: true },

            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap' }
        ]
    },

    css: [
        "@/common/assets/globals.scss",
        "@/common/assets/defaults.scss",
    ],

    components: {
        global: true,
        dirs: [
            '~/components',
            '~/common/components',
        ]
    },

    runtimeConfig: {
        public: {
            DOMAIN: process.env.DOMAIN || "localhost",
            PROTOCOL: process.env.PROTOCOL || "http",
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/common/assets/variables.scss";'
                }
            }
        },
    }
} as NuxtConfig