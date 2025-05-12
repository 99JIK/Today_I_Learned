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
      title: '반갑습니다!',
      description: '작성자의 정보를 확인할 수 있습니다.',
      link: '/Who-am-I', // 실제 문서 경로로 수정하세요
      icon: '🙋🏻‍♂️', // 또는 SVG 아이콘 컴포넌트
    },
    {
      title: 'JIK\'s TIL 요약',
      description: '빠르게 이 사이트의 구조를 확인해보세요.',
      link: '/How-to-Read', // 실제 문서 경로로 수정하세요
      icon: '🕵🏻',
    },
    {
      title: '키워드 별 논문',
      description: '키워드 별로 논문을 찾아보세요.',
      link: '/papers/tags', // 실제 문서 경로로 수정하세요
      icon: '🧑🏻‍🎓',
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