const globalNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Admin Guide', link: '/admin/' },
  { text: 'Developer Docs', link: '/shared/overview' },
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
  {
    text: 'GitHub',
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
        text: 'Backend Server',
        link: 'https://github.com/calblueprint/dccentralkitchen-node',
      },
    ],
  },
];

const adminSidebar = [
  {
    title: 'Admin Guide',
    collapsable: false,
    sidebarDepth: 2,
    children: ['/admin/', '/admin/stores', '/admin/storehours', '/admin/forms'],
  },
];

const devSidebar = [
  '/shared/overview',
  {
    title: 'Customer Application',
    sidebarDepth: 2,
    children: [
      ['/customer/', 'Introduction'],
      '/customer/getting-started',
      '/customer/styling',
      '/customer/icons',
      '/customer/navigation',
      '/customer/auth',
      '/customer/stores',
      '/customer/map',
      '/customer/rewards',
      '/customer/resources',
      '/customer/settings',
      '/customer/constants',
    ],
  },
  {
    title: 'Clerk Application',
    sidebarDepth: 2,
    children: [
      ['/clerk/', 'Introduction'],
      '/clerk/getting-started',
      '/clerk/styling',
      '/clerk/icons',
      '/clerk/auth',
      '/clerk/navigation',
      '/clerk/checkout',
      '/clerk/constants',
    ],
  },
  {
    title: 'Backend Server',
    sidebarDepth: 2,
    children: [
      ['/node/', 'Introduction'],
      '/node/getting-started',
      '/node/app-overview',
    ],
  },
  {
    title: 'Managing & Deploying Apps',
    sidebarDepth: 2,
    children: [
      '/shared/airtable',
      '/shared/deployingupdates',
      '/shared/analytics',
    ],
  },
];

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
    // Git repo and edit links
    repo: 'calblueprint/dccentralkitchen',
    docsDir: 'docs',
    docsBranch: 'docs',
    editLinkText: 'Edit this page on GitHub',
    editLinks: true,
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    nav: globalNavbar,
    sidebar: {
      '/admin': adminSidebar,
      '/customer': devSidebar,
      '/clerk': devSidebar,
      '/node': devSidebar,
      '/shared': devSidebar,
    },
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'rightlink',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        before: (info) => `<div class="callout"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
  ],
};
