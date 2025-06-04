import React from 'react';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import RecentlyUpdatedDocuments from '@site/src/components/RecentlyUpdatedDocuments'; // 경로 및 이름 확인
import pageStyles from '@site/src/pages/index.module.css'; 
import styles from './styles.module.css'; // 이 컴포넌트의 스타일 파일 import

interface LatestNewsItemProps {
  gridClasses?: string;
}

export default function LatestNewsItem({ gridClasses }: LatestNewsItemProps): JSX.Element {
  return (
    <article 
      className={clsx(
        pageStyles.newspaperCard, 
        pageStyles.latestNewsSectionContainer, 
        gridClasses, 
        styles.latestNewsCard // ./styles.module.css 에 정의된 클래스 사용
      )}
    >
      <Heading as="h2" className={clsx(pageStyles.articleTitle, pageStyles.sectionTitleAlt)}>
        Recently Updated Documents
      </Heading>
      <div className={pageStyles.latestNewsContent}>
        <RecentlyUpdatedDocuments /> 
      </div>
    </article>
  );
}
