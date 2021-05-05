module.exports = {
  title: 'mls公共组件库说明文档',  // 设置网站标题
  description : '',
  base : '/dist/',
  markdown: {
    plugins: ['task-lists']
  },
  plugins: [
      ['@vuepress/medium-zoom'],
      [
          require('./plugins/demo-container/src'),
          {
              elementVersion: '2.15.1',
              vjsfVersion: '0.1.0'
          }
      ],
      [
          '@vuepress/pwa',
          {
              serviceWorker: true,
              updatePopup: true
          }
      ]
  ],
  themeConfig : {
    docsDir: 'docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'Gitee', link: 'https://www.baidu.com' },
    ],
    sidebar: [{
        title: '指南',
        collapsable: false,
        children: ['/guide/']
      },
      {
        title: '组件',
        collapsable: false,
        children: ['/guide/mlsCommonForm.md']
      }
    ],
    sidebarDepth : 2
  }
}