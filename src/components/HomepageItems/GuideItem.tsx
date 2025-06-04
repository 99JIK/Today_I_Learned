import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';
import pageStyles from '@site/src/pages/index.module.css';

interface GuideItemProps {
  title: string;
  summary: string;
  link: string;
  gridClasses?: string;
}

export default function GuideItem({ title, summary, link, gridClasses }: GuideItemProps): JSX.Element {
  return (
    <article className={clsx(pageStyles.newspaperCard, pageStyles.secondaryArticle, gridClasses, styles.guideCard)}>
      <Link to={link} className={pageStyles.articleLinkWrapper}>
        <div className={pageStyles.articleContent}>
          <Heading as="h2" className={pageStyles.articleTitle}>
            {title}
          </Heading>
          <p className={pageStyles.articleSummary}>{summary}</p>
        </div>
      </Link>
      <Link to={link} className={clsx('button button--sm button--outline', pageStyles.readMoreButton)}>
        가이드 읽기 &rarr;
      </Link>
    </article>
  );
}