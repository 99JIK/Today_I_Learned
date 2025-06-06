import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'JIK\'s TIL',
  tagline: 'From Yesterday\'s Insights to Today\'s Wisdom: My Learning  Chronicle.',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  url: 'https://til.jungin.kim',
  baseUrl: '/',
  organizationName: '99jik',
  projectName: 'Today_I_Learned',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    localeConfigs: {
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },
  presets: [
    [
      'classic', 
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          editUrl: 'https://github.com/99jik/Today-I-Learned/blog/',
          path: './blog',
          routeBasePath: 'how-can-you-find?/blog',
          // 블로그 사이드바 관련 설정 (선택 사항)
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 10, feedOptions: { type: 'all', copyright: `Copyright © ${new Date().getFullYear()} JIK\'s TIL` },
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/99jik/Today-I-Learned/docs/',
          routeBasePath: 'docs',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // --- 기타 플러그인 설정 (예: Google Analytics, Sitemap 등) ---
        // gtag: { // Google Analytics (GA4) 사용 시
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
        // sitemap: { // 사이트맵 생성 시
        //   changefreq: 'weekly',
        //   priority: 0.5,
        //   ignorePatterns: ['/tags/**'],
        //   filename: 'sitemap.xml',
        // },
      }),
    ],
  ],
  plugins: [[
    '@docusaurus/plugin-content-blog',{
          showReadingTime: true,
          id: 'Paper',
          editUrl: 'https://github.com/99jik/Today-I-Learned/papers/',
          path: './papers',
          routeBasePath: 'papers',
          blogSidebarTitle: 'Paper I Read',
          blogSidebarCount: 'ALL',
          postsPerPage: 10, feedOptions: { type: 'all', copyright: `Copyright © ${new Date().getFullYear()} JIK\'s TIL` },
        },
  ]],
  themeConfig: {
    navbar: {
      title: 'JIK\'s TIL',
      items: [
        { type: 'docSidebar',  sidebarId: 'JIKTILSidebar', position: 'right', label: 'DOCS'},
        { to: '/papers', label: 'PAPERS', position: 'right'},
        { href: 'https://github.com/99jik', label: 'GITHUB', position: 'right'}
      ]
    },
    footer: {
      style: 'light',
      links: [
        { title: 'JIK\'s TIL',
          items: [
            { label: 'Docs', to: '/docs/intro'},
            { label: 'Papers', to: '/papers'}
          ],
        },
        { title: 'Contact',
          items: [
            { label: 'E-Mail', href: 'mailto:99junginkim@gmail.com'},
            { label: 'Discord', href: 'https://discord.gg/vgEmEtbHmc'}
          ],
        },
        { title: 'Group',
          items: [
            { label: 'Altruistic Hive', href: 'https://altruistic-hive.org'},
            { label: 'KNU STLAB', href: 'https://selab.knu.ac.kr'}
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JIK, Built with Docusaurus.`, // 저작권 문구
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
    colorMode: { respectPrefersColorScheme: true},
    announcementBar: {
      id: 'announcementBar-2', // 고유 ID (다시 보지 않기 기능에 사용)
      content: '⭐️ 저의 학습 기록에 <b>별표</b>를 눌러주세요! <a target="_blank" rel="noopener noreferrer" href="https://github.com/99jik/Today-I-Learned">JIK\'s TIL</a> ⭐️',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },
    // algolia: { // Algolia DocSearch 사용 시 (신청 및 설정 필요)
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //   // optional:
    //   contextualSearch: true,
    // },
  } satisfies Preset.ThemeConfig,
};
export default config;