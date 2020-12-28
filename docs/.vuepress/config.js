const globalNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Admin Guide', link: '/admin/' },
  { text: 'Developer Docs', link: '/shared/overview' },
  { text: 'Design Prototypes', link: '/design' },
  {
    text: 'Airtable',
    items: [
      {
        text: 'Development',
        link:
          'https://airtable.com/invite/l?inviteId=invHQEihpTRQwvjDE&inviteToken=5c94d6ba23c2a7f349e6e168a25403a13f2c435af256a296f0630991998a5488',
      },
      {
        text: 'Production',
        link:
          'https://airtable.com/invite/l?inviteId=invi3W9OkQcJ0BaVL&inviteToken=267a57e59cb2dff2f2a1053580707ce7309cbfb017f81168681daf0cd0ded24b',
      },
      {
        text: 'Workspace',
        link:
          'https://airtable.com/invite/l?inviteId=inveo2G7RDr4TETPW&inviteToken=eaa9f9dd2c363c4aeadb64bf2918b7cbca5e6eb5c2b34e6f214e2bb796aa13df',
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
  '/admin/',
  {
    title: 'Airtable Guidelines',
    collapsable: false,
    sidebarDepth: 2,
    children: [
      '/admin/forms',
      '/admin/newclerk',
      '/admin/stores',
      '/admin/storehours',
      '/admin/productimages',
    ],
  },
  '/admin/sending-notifications',
  '/admin/scheduled-update',
  '/admin/marketingassets',
  '/admin/links',
  '/admin/future',
];

const devSidebar = [
  '/shared/overview',
  {
    title: 'Customer Application',
    sidebarDepth: 2,
    children: [
      ['/customer/', 'Introduction'],
      '/customer/getting-started',
      '/customer/auth',
      '/customer/navigation',
      '/customer/stores',
      '/customer/map',
      '/customer/rewards',
      '/customer/updating-faqs',
      '/customer/resources',
      '/customer/settings',
      '/customer/styling',
      '/customer/icons',
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
      '/node/store-products',
      '/node/twilio-notifications',
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
  '/shared/future',
];

module.exports = {
  title: 'Healthy Corners',
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
    algolia: {
      apiKey: '3ea67aa35be2cb7fdca6bf5a750388dc',
      indexName: 'healthycorners-rewards',
    },
  },
  plugins: [
    ['@vuepress/back-to-top'],
    [
      'container',
      {
        type: 'faq',
        before: (info) =>
          `<details class="custom-block faq">${
            info ? `<summary>${info}</summary>` : ''
          }\n`,
        after: () => '</details>\n',
      },
    ],
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
