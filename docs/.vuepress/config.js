module.exports = {
  title: 'mls公共组件库说明文档',  // 设置网站标题
  description : '',
  base : process.env.NODE_ENV === 'production' ? '/mls-common-ui/dist/' : '/',
  markdown: {
    plugins: ['task-lists']
  },
  plugins: [
      ['@vuepress/medium-zoom'],
      [
          require('./plugins/demo-container/src'),
          {
              elementVersion: '2.15.1',
              vjsfVersion: '1.4.0'
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
      { text: '表单生成器', link: 'https://form.lljj.me/schema-generator.html#/index' },
      { text: 'Github', link: 'https://github.com/ph2017/mls-common-ui' },
    ],
    sidebar: [{
        title: '指南',
        collapsable: false,
        children: ['/guide/']
      },
      {
        title: '组件',
        collapsable: false,
        children: ['/guide/mlsCommonForm.md', '/guide/mlsCommonTable.md']
      }
    ],
    sidebarDepth : 3
  }
}