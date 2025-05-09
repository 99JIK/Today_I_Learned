import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

// --- 새로운 콘텐츠 섹션 2: 최신 소식 / 블로그 안내 ---
// 이 섹션의 스타일은 아래에서 제공될 index.module.css의 .latestNewsSection 등을 따릅니다.
export default function LatestNewsSection(): ReactNode {
  // 실제로는 플러그인이나 API를 통해 최신 블로그 데이터를 가져올 수 있습니다.
  // 여기서는 간단한 예시를 보여줍니다.
  const recentPosts = [
    { title: 'Docusaurus 시작하기', link: '/blog/docusaurus-start', date: '2025-05-08' },
    { title: 'React 상태 관리 심층 분석', link: '/blog/react-state-management', date: '2025-05-01' },
    { title: '타입스크립트 제네릭 완전 정복', link: '/blog/typescript-generics', date: '2025-04-25' },
  ];

  return (
    <section className={styles.latestNewsSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          최신 학습 & 소식
        </Heading>
        <div className={styles.newsItemsContainer}>
          {recentPosts.map((post, idx) => (
            <Link to={post.link} key={idx} className={styles.newsItemCard}>
              <Heading as="h3" className={styles.newsItemTitle}>{post.title}</Heading>
              <p className={styles.newsItemDate}>{post.date}</p>
            </Link>
          ))}
        </div>
        <div className={clsx('text--center', styles.seeMoreButtonContainer)}>
          <Link className={clsx('button button--outline button--primary button--md', styles.seeMoreButton)} to="/blog">
            모든 글 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
