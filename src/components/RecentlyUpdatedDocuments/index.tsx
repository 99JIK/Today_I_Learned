import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useRecentlyUpdatedDocs, type DocMetadata } from '@site/src/hooks/useRecentlyUpdatedDocs';
import styles from './styles.module.css';

export default function RecentlyUpdatedDocuments(): ReactNode {
  const { recentDocs, totalDocsCount } = useRecentlyUpdatedDocs();

  if (recentDocs.length === 0) {
    return (
      <div className={styles.noDocsContainer}>
        <p>최근 업데이트된 문서가 없습니다.</p>
      </div>
    );
  }

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return '날짜 정보 없음';
    try {
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(timestamp * 1000));
    } catch (e) {
      return '날짜 변환 오류';
    }
  };

  return (
    <div className={styles.docItemsContainer}>
      {recentDocs.map((doc: DocMetadata) => (
        <Link to={doc.permalink} key={doc.permalink} className={clsx('card', styles.docItemCard)}>
          <div className="card__body">
            <Heading as="h3" className={styles.docItemTitle}>
              {doc.title}
            </Heading>
            {doc.lastUpdatedAt && (
              <p className={styles.docItemDate}>{formatDate(doc.lastUpdatedAt)}</p>
            )}
            {doc.frontMatter.description && (
              <p className={styles.docItemDescription}>{doc.frontMatter.description}</p>
            )}
          </div>
        </Link>
      ))}
      {totalDocsCount > recentDocs.length && (
         <div className={styles.seeMoreButtonContainer}>
           <Link className={clsx('button button--outline button--sm', styles.seeMoreButton)} to="/docs/intro">
             모든 문서 보기
           </Link>
         </div>
       )}
    </div>
  );
}
