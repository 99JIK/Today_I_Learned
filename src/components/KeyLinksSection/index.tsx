import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

//  export default function HomepageFeatures(): ReactNode {
// --- 새로운 콘텐츠 섹션 1: 주요 바로가기 ---
// 이 섹션의 스타일은 아래에서 제공될 index.module.css의 .keyLinksSection 등을 따릅니다.
export default function KeyLinksSection(): ReactNode {
  const keyLinks = [
    {
      title: '핵심 문서 가이드',
      description: '프로젝트의 핵심 개념과 사용법을 빠르게 익혀보세요.',
      link: '/docs/category/핵심-가이드', // 실제 문서 경로로 수정하세요
      icon: '📚', // 또는 SVG 아이콘 컴포넌트
    },
    {
      title: 'API 레퍼런스',
      description: '상세한 API 정보를 찾아보고 활용해보세요.',
      link: '/docs/api-reference', // 실제 문서 경로로 수정하세요
      icon: '⚙️',
    },
    {
      title: '튜토리얼 & 예제',
      description: '따라 하면서 배울 수 있는 다양한 튜토리얼을 제공합니다.',
      link: '/docs/category/튜토리얼', // 실제 문서 경로로 수정하세요
      icon: '💡',
    },
  ];

  return (
    <section className={styles.keyLinksSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          주요 바로가기
        </Heading>
        <div className={clsx('row', styles.keyLinksRow)}>
          {keyLinks.map((item, idx) => (
            <div key={idx} className={clsx('col col--4', styles.keyLinkItem)}>
              <Link to={item.link} className={styles.keyLinkCard}>
                <div className={styles.keyLinkIcon}>{item.icon}</div>
                <Heading as="h3" className={styles.keyLinkTitle}>{item.title}</Heading>
                <p className={styles.keyLinkDescription}>{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}