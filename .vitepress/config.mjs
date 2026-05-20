import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "humilitas occidit superbiam",
  description: "my note",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'algorithm', link: '/algorithm' }
      { text: 'nvim', link: '/nvim'}
    ],

    sidebar: [
      {
        text: 'algoritm',
        items: [
          { text: '26.3', link: '/algorithm/26.3' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/humilites' }
    ]
  }
})
