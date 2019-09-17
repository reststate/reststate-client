module.exports = {
  title: '@reststate/client',
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-128167246-4',
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: '@reststate/client', link: '/' },
      { text: 'github', link: 'https://github.com/reststate/reststate-client' },
      { text: '/vuex', link: 'https://vuex.reststate.codingitwrong.com' },
      { text: '/mobx', link: 'https://mobx.reststate.codingitwrong.com' },
      { text: 'home', link: 'https://reststate.codingitwrong.com' },
    ],
    sidebar: ['/', 'installation', 'reading-data', 'writing-data'],
    displayAllHeaders: true,
  },
};
