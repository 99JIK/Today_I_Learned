// docusaurus.config.ts (TypeScript 예시)
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '나의 TIL 기록 저장소', // 1. 사이트 제목 수정
  tagline: '오늘 내가 배운 것들을 기록합니다.', // 2. 사이트 부제목(태그라인) 수정
  favicon: 'img/favicon.ico', // 파비콘 이미지 경로 (필요시 static/img 폴더에 이미지 추가)
  trailingSlash: false,
  // 3. GitHub Pages 배포 URL 설정 (매우 중요!)
  url: 'https://99jik.github.io', // 본인의 GitHub 사용자 이름으로 변경
  // 4. Base URL 설정 (매우 중요!)
  baseUrl: '/Today_I_Learned/', // '/<저장소 이름>/' 형식으로 입력. 만약 username.github.io 저장소라면 '/' 로 설정

  // 5. GitHub Pages 배포 관련 설정
  organizationName: '99jik', // 본인의 GitHub 사용자 이름
  projectName: 'Today_I_Learned', // GitHub 저장소 이름 (username.github.io 저장소의 경우에도 저장소 이름 그대로 입력)

  onBrokenLinks: 'warn', // 깨진 링크 발견 시 빌드 실패 처리 (개발 중에는 'warn'으로 해도 무방, 개발 완료 후 'throw')
  onBrokenMarkdownLinks: 'warn', // 깨진 마크다운 링크 발견 시 경고

  // 언어 설정 (한국어 설정 예시)
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // 6. TIL 문서를 Docs 플러그인으로 관리할 경우 설정
          sidebarPath: './sidebars.ts', // 사이드바 설정 파일 경로
          // GitHub에서 'Edit this page' 링크를 활성화하려면 아래 주석 해제 후 경로 수정
          // editUrl: 'https://github.com/<YOUR_GITHUB_USERNAME>/my-til-site/tree/main/',
          routeBasePath: '/docs', // TIL 문서들의 기본 경로 (예: /docs/intro)
        },
        blog: {
          // 7. TIL을 블로그 형식으로 관리할 경우 설정 (Docs 대신 Blog 사용 시)
          showReadingTime: true, // 읽기 시간 표시 여부
          // GitHub에서 'Edit this page' 링크를 활성화하려면 아래 주석 해제 후 경로 수정
          // editUrl: 'https://github.com/<YOUR_GITHUB_USERNAME>/my-til-site/tree/main/',
          routeBasePath: '/blog', // 블로그 포스트 기본 경로 (예: /blog/welcome)
          path: './blog', // 블로그 마크다운 파일 위치
          blogSidebarCount: 'ALL', // 사이드바에 모든 포스트 표시 ('ALL') 또는 최근 N개 ('5')
          blogSidebarTitle: '최근 TIL', // 블로그 사이드바 제목
        },
        theme: {
          customCss: './src/css/custom.css', // 사용자 정의 CSS 파일 경로
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 네비게이션 바 설정
    navbar: {
      title: 'JIK\'s TIL(It DOES NOT FIXED!!!)', // 네비게이션 바 제목
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg', // 로고 이미지 경로 (static/img 폴더에 이미지 추가)
      },
      items: [
        // 8. 메뉴 항목 설정 (Docs 사용 시)
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar', // sidebars.ts 파일 내의 사이드바 ID와 일치해야 함
          position: 'left',
          label: 'TIL 문서', // 메뉴에 표시될 이름
        },
        // 8. 메뉴 항목 설정 (Blog 사용 시)
        { to: '/blog', label: 'TIL 블로그', position: 'left' },

        // GitHub 저장소 링크 (선택 사항)
        {
          href: 'https://github.com/99jik/my-til-site', // 본인 저장소 주소로 변경
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // 푸터(Footer) 설정
    footer: {
      style: 'dark',
      links: [
        // 푸터 링크 설정 (필요에 따라 추가/수정)
        {
          title: 'Docs',
          items: [
            {
              label: 'TIL 문서',
              to: '/docs/intro', // Docs의 첫 페이지 경로
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // 관련 커뮤니티 링크 등
          ],
        },
        {
          title: 'More',
          items: [
            // { label: 'Blog', to: '/blog' }, // 블로그 메뉴
            {
              label: 'GitHub',
              href: 'https://github.com/99jik/my-til-site', // 본인 저장소 주소
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
  } satisfies Preset.ThemeConfig,
};

export default config;