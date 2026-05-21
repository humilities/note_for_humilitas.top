import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "humilitas occidit superbiam",
  description: "my note",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'cf', link: '/algorithm/' },
      { text: 'nvim', link: '/nvim/'}
    ],

    sidebar: [
      {
        text: 'cf',
        items: [
          {
            text: '26.3',
            link: '/algorithm/26.3/',
            collapsed: true,
            items: [
              // 🌟 修复：这里之前所有的末尾句号 . 全都纠正为了标准的逗号 ,
              { text: '26.2.2.md', link: '/algorithm/26.3/26.2.2.md' },
              { text: '26.3.8.md', link: '/algorithm/26.3/26.3.8.md' },
              { text: '26.3.9.md', link: '/algorithm/26.3/26.3.9.md' },
              { text: '26.3.10.md', link: '/algorithm/26.3/26.3.10.md' },
              { text: '26.3.11.md', link: '/algorithm/26.3/26.3.11.md' },
              { text: '26.3.12.md', link: '/algorithm/26.3/26.3.12.md' },
              { text: '26.3.13.md', link: '/algorithm/26.3/26.3.13.md' },
              { text: '26.3.14.md', link: '/algorithm/26.3/26.3.14.md' },
              { text: '26.3.15.md', link: '/algorithm/26.3/26.3.15.md' },
              { text: '26.3.16.md', link: '/algorithm/26.3/26.3.16.md' },
              { text: '26.3.17.md', link: '/algorithm/26.3/26.3.17.md' }
            ]
          }
        ]
      },
      {
        text: 'nvim',  // 🌟 修复：这里补上了缺失的英文逗号
        link: '/nvim/',
        collapsed: true,
        items: [
          { text: 'the operation concerning tabs', link: "/nvim/the operation concerning tabs.md" },
          { text: 'the use of gitvim', link: "/nvim/the use of gitvim" },
          { text: 'my shortcut with <leader>', link: "/nvim/my shortcut with <leader>.md" },
          { text: 'the file operations based on the oil.nvim', link: "/nvim/the file operations based on the oil.nvim.md" },
          { text: 'the basic command', link: "/nvim/the basic command.md" },
          { text: 'the copy and paste in nvim', link: "/nvim/the copy and paste in nvim.md" },
          { text: 'the delete in nvim', link: "/nvim/the delete in nvim.md" }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/humilites' }
    ]
  }
})
