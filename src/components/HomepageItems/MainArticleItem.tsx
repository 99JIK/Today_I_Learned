import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css'; // 각 아이템별 스타일 (필요시)
import pageStyles from '@site/src/pages/index.module.css'; // 홈페이지 그리드 스타일 참조

interface MainArticleItemProps {
  title: string;
  summary: string;
  link: string;
  image: string;
  gridClasses?: string; // 그리드 배치를 위한 클래스
}

export default function MainArticleItem({
  title,
  summary,
  link,
  image,
  gridClasses,
}: MainArticleItemProps): JSX.Element {
  return (
    <article className={clsx(pageStyles.newspaperCard, gridClasses, styles.mainArticleCard)}>
      <Link to={link} className={pageStyles.articleLinkWrapper}>
        <img
          src={image}
          alt={title}
          className={pageStyles.mainArticleImage}
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x350/E9E9E9/B0B0B0?text=Image+Error&font=notosanskr')}
        />
        <div className={pageStyles.articleContent}>
          <Heading as="h2" className={pageStyles.articleTitle}>
            {title}
          </Heading>
          <p className={pageStyles.articleSummary}>{summary}</p>
        </div>
      </Link>
      <Link to={link} className={clsx('button button--sm button--outline', pageStyles.readMoreButton)}>
        더 알아보기 &rarr;
      </Link>
    </article>
  );
}