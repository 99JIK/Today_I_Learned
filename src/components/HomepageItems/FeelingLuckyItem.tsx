import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { useHistory } from '@docusaurus/router';
import paperList from '@generated/docusaurus-plugin-content-blog/Paper/blog-post-list-prop-Paper.json';
import styles from './styles.module.css';
import pageStyles from '@site/src/pages/index.module.css';

// 타입 정의
interface PaperPost {
  id: string;
  title: string;
  permalink: string;
}

interface FeelingLuckyItemProps {
  gridClasses?: string;
}

export default function FeelingLuckyItem({ gridClasses }: FeelingLuckyItemProps): JSX.Element {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const allPapers = useMemo(() => {
    return (paperList.items as PaperPost[]) || [];
  }, []);

  const handleLuckyClick = () => {
    if (allPapers.length === 0) {
        alert("오류: 추천할 만한 논문을 찾지 못했습니다.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allPapers.length);
      const luckyPaper = allPapers[randomIndex];
      
      console.log('선택된 논문:', luckyPaper);

      if (luckyPaper?.permalink) {
        history.push(luckyPaper.permalink);
      } else {
        setIsLoading(false);
        alert("오류: 유효한 링크를 찾지 못했습니다.");
      }
    }, 1500);
  };

    return (
    <article className={clsx(pageStyles.newspaperCard, gridClasses, styles.luckyCard)}>
        <div className={styles.content}>
        <Heading as="h2" className={clsx(pageStyles.articleTitle, styles.luckyTitle)}>
            Am I Feeling Lucky?
        </Heading>
        <p className={styles.description}>
            어떤 논문을 읽을지 고민되시나요?
        </p>
        <button
            className={styles.luckyButton}
            onClick={handleLuckyClick}
            disabled={isLoading}
        >
            {isLoading ? (
            <span className={styles.loadingText}>잡히는 대로 논문을 던져 주는 중...</span>
            ) : (
            '🍀 행운을 시험해보세요! 🍀'
            )}
        </button>
        </div>
    </article>
    );
}
