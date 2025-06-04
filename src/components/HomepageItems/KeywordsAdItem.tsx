import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';
import pageStyles from '@site/src/pages/index.module.css';

interface KeywordsAdItemProps {
  title: string;
  text: string;
  link: string;
  linkText: string;
  gridClasses?: string;
}

export default function KeywordsAdItem({
  title,
  text,
  link,
  linkText,
  gridClasses,
}: KeywordsAdItemProps): JSX.Element {
  return (
    <aside className={clsx(pageStyles.newspaperCard, pageStyles.sideAds, gridClasses, styles.keywordsAdCard)}>
      <Heading as="h3" className={pageStyles.sideAdTitle}>{title}</Heading>
      <p className={pageStyles.sideAdText}>{text}</p>
      <Link to={link} className={clsx('button button--sm button--outline button--block', pageStyles.sideAdButton)}>
        {linkText}
      </Link>
    </aside>
  );
}