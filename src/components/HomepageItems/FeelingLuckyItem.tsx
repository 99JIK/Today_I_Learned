import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';
import pageStyles from '@site/src/pages/index.module.css';

// 타입 정의
interface DocMetadata {
  id: string;
  title: string;
  permalink: string;
}
interface VersionData {
  docs: Record<string, DocMetadata>;
}
interface DocsPluginData {
  versions: VersionData[];
}

interface FeelingLuckyItemProps {
  gridClasses?: string;
}

export default function FeelingLuckyItem({ gridClasses }: FeelingLuckyItemProps): JSX.Element {
  const history = useHistory();
  const docsPluginData = usePluginData('docusaurus-plugin-content-docs') as DocsPluginData | undefined;
  const [isLoading, setIsLoading] = useState(false);

  // useMemo를 사용하여 전체 문서 목록을 한 번만 계산합니다.
  const allDocs = useMemo(() => {
    // docsPluginData가 없거나, versions 배열이 없거나 비어있는 경우 빈 배열 반환
    if (!docsPluginData?.versions || docsPluginData.versions.length === 0) {
      console.warn('[FeelingLucky] Docs data is not available.');
      return [];
    }

    // 모든 버전의 문서를 하나의 배열로 합칩니다.
    return docsPluginData.versions
      .flatMap(version => (version.docs ? Object.values(version.docs) : []))
      .filter(doc => doc.permalink && !doc.permalink.endsWith('/category'));
  }, [docsPluginData]); // docsPluginData가 변경될 때만 재계산

  const handleLuckyClick = () => {
    if (allDocs.length === 0) {
      alert('이동할 수 있는 문서를 찾을 수 없습니다. 사이트가 빌드되었는지 확인해주세요.');
      return;
    }

    setIsLoading(true);

    // 1. 랜덤 문서 선택
    const randomIndex = Math.floor(Math.random() * allDocs.length);
    const luckyDoc = allDocs[randomIndex];

    // 2. 약 1.2초의 딜레이 후 페이지 이동 (애니메이션 효과)
    setTimeout(() => {
      // 로딩 상태를 false로 되돌리고 페이지 이동
      setIsLoading(false);
      if (luckyDoc && luckyDoc.permalink) {
        history.push(luckyDoc.permalink);
      } else {
        alert('잘못된 문서 링크입니다. 다시 시도해주세요.');
      }
    }, 1200);
  };


    return (
    <article className={clsx(pageStyles.newspaperCard, gridClasses, styles.luckyCard)}>
        <div className={styles.content}>
        <Heading as="h2" className={clsx(pageStyles.articleTitle, styles.luckyTitle)}>
            Am I Feeling Lucky?
        </Heading>
        <p className={styles.description}>
            어떤 문서를 읽을지 고민되시나요?
        </p>
        <button
            className={styles.luckyButton}
            onClick={handleLuckyClick}
            disabled={isLoading}
        >
            {isLoading ? (
            <span className={styles.loadingText}>손에 잡히는 대로 문서 던져 주는 중...</span>
            ) : (
            '🍀 행운을 시험해보세요! 🍀'
            )}
        </button>
        </div>
    </article>
    );
}
