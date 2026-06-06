import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "humilitas",
  description: "my note",
  lang: 'zh-CN',

  // 启用深色模式
  appearance: 'dark',

  // Head 配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#ec4899' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Humilitas - 学习笔记' }],
    ['meta', { name: 'og:description', content: '记录技术探索，分享学习心得' }]
  ],

  markdown: {
    // 在这里把插件挂载上去
    config: (md) => {
      md.use(mathjax3)
    },
    // 代码块主题
    theme: {
      light: 'github-light',
      dark: 'github-light'
    },
    // 启用行号
    lineNumbers: true
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // Logo
    logo: '✨',

    // 导航栏
    nav: [
      {
        text: '🏠 Home',
        link: '/'
      },
      {
        text: '💻 Algorithm',
        link: '/algorithm/',
        activeMatch: '/algorithm/'
      },
      {
        text: '⚙️ Nvim',
        link: '/nvim/',
        activeMatch: '/nvim/'
      },
      {
        text: '🗄️ DSC',
        link: '/dsc/',
        activeMatch: '/dsc/'
      }
    ],

    // 侧边栏
    sidebar: {
      '/algorithm/': [
        {
          text: '🎯 Algorithm',
          items: [
            {
              text: '📅 2026-02',
              collapsed: false,
              items: [
                { text: '2026-02-02', link: '/algorithm/2026-02/2026-02-02.md' }
              ]
            },
            {
              text: '📅 2026-03',
              link: '/algorithm/2026-03/',
              collapsed: false,
              items: [
                { text: '2026-03-08', link: '/algorithm/2026-03/2026-03-08.md' },
                { text: '2026-03-09', link: '/algorithm/2026-03/2026-03-09.md' },
                { text: '2026-03-10', link: '/algorithm/2026-03/2026-03-10.md' },
                { text: '2026-03-11', link: '/algorithm/2026-03/2026-03-11.md' },
                { text: '2026-03-12', link: '/algorithm/2026-03/2026-03-12.md' },
                { text: '2026-03-13', link: '/algorithm/2026-03/2026-03-13.md' },
                { text: '2026-03-14', link: '/algorithm/2026-03/2026-03-14.md' },
                { text: '2026-03-15', link: '/algorithm/2026-03/2026-03-15.md' },
                { text: '2026-03-16', link: '/algorithm/2026-03/2026-03-16.md' },
                { text: '2026-03-17', link: '/algorithm/2026-03/2026-03-17.md' },
                { text: '2026-03-19', link: '/algorithm/2026-03/2026-03-19.md' },
                { text: '2026-03-21', link: '/algorithm/2026-03/2026-03-21.md' }
              ]
            }
          ]
        }
      ],
      '/nvim/': [
        {
          text: '⚙️ Neovim',
          items: [
            { text: '📑 Tab 操作', link: "/nvim/the operation concerning tabs.md" },
            { text: '🔧 GitVim 使用', link: "/nvim/the use of gitvim" },
            { text: '⌨️ Leader 快捷键', link: "/nvim/my shortcut with leader.md" },
            { text: '📁 Oil.nvim 文件操作', link: "/nvim/the file operations based on the oil.nvim.md" },
            { text: '🎮 基础命令', link: "/nvim/the basic command.md" },
            { text: '📋 复制粘贴', link: "/nvim/the copy and paste in nvim.md" },
            { text: '🗑️ 删除操作', link: "/nvim/the delete in nvim.md" }
          ]
        }
      ],
      '/dsc/': [
        {
          text: '🗄️ DSC',
          items: [
            { text: 'Home', link: '/dsc/' },
            { text: 'Lab 7', link: '/dsc/lab7.md' },
            { text: 'Normalization Tool', link: '/dsc/tool.md' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/humilites'
      }
    ],

    // 页脚
    footer: {
      copyright: 'Copyright © 2024 Humilitas'
    },

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '📋 目录'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 返回顶部文字
    returnToTopLabel: '返回顶部',

    // 侧边栏文字
    sidebarMenuLabel: '菜单',

    // 深色模式切换
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
