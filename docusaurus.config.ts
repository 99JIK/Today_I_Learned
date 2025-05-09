// docusaurus.config.ts (TypeScript 예시)
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'JIK\'s TIL', // 1. 사이트 제목 수정
  tagline: 'From Yesterday\'s Insights to Today\'s Wisdom: My Learning  Chronicle.', // 2. 사이트 부제목(태그라인) 수정
  favicon: 'img/favicon.ico', // 파비콘 이미지 경로 (필요시 static/img 폴더에 이미지 추가)
  trailingSlash: false,
  // 3. GitHub Pages 배포 URL 설정 (매우 중요!)
  url: 'https://til.jungin.kim', // 본인의 GitHub 사용자 이름으로 변경
  // 4. Base URL 설정 (매우 중요!)
  baseUrl: '/', // '/<저장소 이름>/' 형식으로 입력. 만약 username.github.io 저장소라면 '/' 로 설정

  // 5. GitHub Pages 배포 관련 설정
  organizationName: '99jik', // 본인의 GitHub 사용자 이름
  projectName: 'Today_I_Learned', // GitHub 저장소 이름 (username.github.io 저장소의 경우에도 저장소 이름 그대로 입력)

  onBrokenLinks: 'warn', // 깨진 링크 발견 시 빌드 실패 처리 (개발 중에는 'warn'으로 해도 무방, 개발 완료 후 'throw')
  onBrokenMarkdownLinks: 'warn', // 깨진 마크다운 링크 발견 시 경고

  // 언어 설정 (한국어 설정 예시)
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'], // 지원할 언어 목록
    localeConfigs: { // 각 언어별 세부 설정 (선택 사항)
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
      'classic', // @docusaurus/preset-classic 사용
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // --- Blog 플러그인 설정 ---
        blog: {
          showReadingTime: true, // 게시물 읽기 시간 표시 여부
          // 블로그 편집 URL (선택 사항)
          // editUrl: 'https://github.com/your-username/your-repo-name/tree/main/',
          path: './papers', // 블로그 마크다운 파일이 위치할 폴더 (프로젝트 루트 기준) - 기본값으로 설정
          routeBasePath: 'papers', // 블로그 URL 기본 경로 (예: your-site.com/blog) - 기본값으로 설정
          // 블로그 사이드바 관련 설정 (선택 사항)
          blogSidebarTitle: 'All posts', // 사이드바 제목
          blogSidebarCount: 'ALL', // 사이드바에 표시할 게시물 수 ('ALL' 또는 숫자)
          // 여기에 다른 blog 플러그인 옵션을 추가할 수 있습니다.
          // 예: postsPerPage: 10, feedOptions: { type: 'all', copyright: `Copyright © ${new Date().getFullYear()} My Site` },
        },
        // --- Docs 플러그인 설정 ---
        docs: {
          sidebarPath: './sidebars.ts', // 사이드바 설정 파일 경로 (프로젝트 루트 기준)
          // 문서 편집 URL (선택 사항): GitHub 등에서 'Edit this page' 링크 활성화
          // editUrl: 'https://github.com/your-username/your-repo-name/tree/main/',
          routeBasePath: 'docs', // 문서 URL 기본 경로 (예: your-site.com/docs/intro)
          showLastUpdateTime: true,
          // 여기에 다른 docs 플러그인 옵션을 추가할 수 있습니다.
          // 예: showLastUpdateTime: true, showLastUpdateAuthor: true,
        },
        
        // --- Theme 설정 ---
        theme: {
          customCss: './src/css/custom.css', // 사용자 정의 CSS 파일 경로 (프로젝트 루트 기준)
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

  themeConfig: {
    // 네비게이션 바 설정
    navbar: {
      title: 'JIK\'s TIL', // 네비게이션 바 제목
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png', // 로고 이미지 경로 (static/img 폴더에 이미지 추가)
      },
      items: [
        // 8. 메뉴 항목 설정 (Docs 사용 시)
        {
          type: 'docSidebar',
          sidebarId: 'JIKTILSidebar', // sidebars.ts 파일 내의 사이드바 ID와 일치해야 함
          position: 'left',
          label: 'Documents', // 메뉴에 표시될 이름
        },
        // 8. 메뉴 항목 설정 (Blog 사용 시)
        { to: '/papers', label: 'Papers', position: 'left' },

        // GitHub 저장소 링크 (선택 사항)
        {
          href: 'https://github.com/99jik', // 본인 저장소 주소로 변경
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // 푸터(Footer) 설정
    footer: {
      style: 'light',
      links: [
        // 푸터 링크 설정 (필요에 따라 추가/수정)
        {
          title: 'JIK\'s TIL',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro', // Docs의 첫 페이지 경로
            },
            {
              label: 'Papers',
              to: '/papers'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/99jik', // 본인 저장소 주소
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/vgEmEtbHmc'
            },
            {
              label: 'Altruistic Hive',
              href: 'https://altruistic-hive.org'
            }
          ],
        },
        {
          title: 'Contact',
          items: [
            // { label: 'Papers', to: '/papers' }, // 블로그 메뉴
            {
              label: 'E-Mail',
              href: 'mailto:99junginkim@gmail.com', // 본인 저장소 주소
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JIK, Built with Docusaurus.`, // 저작권 문구
    },
    prism: {
      theme: prismThemes.github, // 코드 블록 라이트 테마
      darkTheme: prismThemes.dracula, // 코드 블록 다크 테마
    },
    // --- 기타 테마 설정 (선택 사항) ---
    colorMode: { // 다크 모드/라이트 모드 설정
      respectPrefersColorScheme: true, // OS 설정을 따를지 여부
    },
    announcementBar: { // 상단 공지 바 설정
      id: 'announcementBar-2', // 고유 ID (다시 보지 않기 기능에 사용)
      content:
        '⭐️ 저희 프로젝트에 <b>별표</b>를 눌러주세요! <a target="_blank" rel="noopener noreferrer" href="https://github.com/your-username/your-repo-name">GitHub</a> ⭐️',
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