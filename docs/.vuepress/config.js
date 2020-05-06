module.exports = {
  title: 'Healthy Corners Rewards',
  description:
    "Documentation for the projects developed by @calblueprint for DC Central Kitchen's Healthy Corners initiative",
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo.png',
      },
    ],
  ],
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Admin Guide', link: '/guide/' },
      { text: 'Developer Docs', link: '/dev/' },
      {
        text: 'Github',
        items: [
          {
            text: 'Customer App',
            link: 'https://github.com/calblueprint/dccentralkitchen',
          },
          {
            text: 'Clerk App',
            link: 'https://github.com/calblueprint/dccentralkitchen-clerks',
          },
          {
            text: 'Backend',
            link: 'https://github.com/calblueprint/dccentralkitchen-node',
          },
        ],
      },
      {
        text: 'Airtable',
        items: [
          {
            text: 'Development',
            link:
              'https://airtable.com/invite/l?inviteId=invesIqGWvEme1unA&inviteToken=d2b75868ccb369533de5ecc1856f5b51ce59a1f8634a5e63f269b49ae6c7c829',
          },
          {
            text: 'Production',
            link:
              'https://airtable.com/invite/l?inviteId=invs00iNRdVREHGdd&inviteToken=c60062f2439511603a97ca005e1a03ee9226d9bab0149ff469034475e08381e6',
          },
          {
            text: 'Workspace',
            link:
              'https://airtable.com/invite/l?inviteId=invFPVCCPnoHZ0htX&inviteToken=8c4d57af33a94c6b1527d75df1f13c7ecb9a98b38ae3eb432700445e1fb2bc6d',
          },
        ],
      },
    ],
    sidebar: ['/guide/', '/dev/'],
  },
};
