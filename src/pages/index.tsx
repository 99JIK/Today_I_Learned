
// CSS 모듈 가져오기
import styles from './index.module.css';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import KeyLinksSection from '@site/src/components/KeyLinksSection';
import LatestNewsSection from '@site/src/components/LatestNewsSection';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


// --- 기존 HomepageHeader ---
// 이 부분의 스타일은 docusaurus_modern_homepage_css_v1 아티팩트의 CSS를 따릅니다.
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg" // 이 버튼 스타일은 index.module.css에서 :global(.button)으로 제어됩니다.
            to="/docs/intro">
            문서 확인하기⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}


// --- 기본 Home 컴포넌트 ---
export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`} // 브라우저 탭에 표시될 제목
      description={`${siteConfig.tagline}`}> {/* SEO를 위한 설명 */}
      
      {/* 1. 홈페이지 헤더 */}
      <HomepageHeader />

      <main>
        {/* 3. 새로운 콘텐츠 섹션: 주요 바로가기 */}
        <KeyLinksSection />

        {/* 4. 새로운 콘텐츠 섹션: 최신 소식 / 블로그 안내 */}
        <LatestNewsSection />

        {/* 여기에 더 많은 섹션을 추가할 수 있습니다. */}
        {/* 예: 프로젝트 쇼케이스, 기여 안내, 문의하기 등 */}
      </main>
    </Layout>
  );
}
