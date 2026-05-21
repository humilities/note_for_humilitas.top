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
      dark: 'github-dark'
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
      }
    ],

    // 侧边栏
    sidebar: {
      '/algorithm/': [
        {
          text: '🎯 Algorithm',
          items: [
            {
              text: '📅 26.3 专题',
              link: '/algorithm/26.3/',
              collapsed: false,
              items: [
                { text: '26.2.2', link: '/algorithm/26.3/26.2.2.md' },
                { text: '26.3.8', link: '/algorithm/26.3/26.3.8.md' },
                { text: '26.3.9', link: '/algorithm/26.3/26.3.9.md' },
                { text: '26.3.10', link: '/algorithm/26.3/26.3.10.md' },
                { text: '26.3.11', link: '/algorithm/26.3/26.3.11.md' },
                { text: '26.3.12', link: '/algorithm/26.3/26.3.12.md' },
                { text: '26.3.13', link: '/algorithm/26.3/26.3.13.md' },
                { text: '26.3.14', link: '/algorithm/26.3/26.3.14.md' },
                { text: '26.3.15', link: '/algorithm/26.3/26.3.15.md' },
                { text: '26.3.16', link: '/algorithm/26.3/26.3.16.md' },
                { text: '26.3.17', link: '/algorithm/26.3/26.3.17.md' }
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
            { text: '⌨️ Leader 快捷键', link: "/nvim/my shortcut with <leader>.md" },
            { text: '📁 Oil.nvim 文件操作', link: "/nvim/the file operations based on the oil.nvim.md" },
            { text: '🎮 基础命令', link: "/nvim/the basic command.md" },
            { text: '📋 复制粘贴', link: "/nvim/the copy and paste in nvim.md" },
            { text: '🗑️ 删除操作', link: "/nvim/the delete in nvim.md" }
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
