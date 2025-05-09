// 추천 위치: src/components/LatestNewsSection/index.tsx

import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
// usePluginData 훅을 직접 사용합니다.
import {usePluginData, useAllPluginInstancesData} from '@docusaurus/useGlobalData';
import type {BlogPost, PluginOptions} from '@docusaurus/plugin-content-blog';

// 이 컴포넌트와 동일한 디렉터리에 styles.module.css 파일이 있다고 가정합니다.
import styles from './styles.module.css';

const MAX_POSTS_TO_SHOW = 5;

// usePluginData가 반환할 것으로 예상되는 타입 정의
// Docusaurus 내부 타입과 유사하게 정의합니다.
interface BlogPluginData {
  blogPosts: BlogPost[];
  blogTags: unknown; // 실제로는 BlogTag[] 등이지만, 여기서는 blogPosts에 집중
  options?: PluginOptions; // 플러그인 옵션도 포함될 수 있음
  // 다른 필드가 있을 수 있음
}

export default function LatestNewsSection(): ReactNode {
  // --- 진단용 로그: usePluginData ---
  // docusaurus.config.ts 에서 blog 플러그인에 별도의 id를 지정하지 않았다면 'default'가 기본 ID 입니다.
  // 만약 id를 'blog' 등으로 지정했다면, 두 번째 인자로 해당 id를 전달합니다. (예: 'blog')
  // const pluginData = usePluginData('docusaurus-plugin-content-docs', 'default') as BlogPluginData | undefined;
  const pluginData = usePluginData('docusaurus-plugin-content-docs', 'default');
  console.log('[LatestNewsSection] usePluginData("docusaurus-plugin-content-blog", "default") 결과:', JSON.stringify(pluginData, null, 2));
  // ------------------------------------
debugger;
  const blogPosts = pluginData?.blogPosts;

  if (!blogPosts || blogPosts.length === 0) {
    console.warn(`[LatestNewsSection] usePluginData를 통해 블로그 게시물 데이터를 찾을 수 없거나 비어 있습니다.
    콘솔 로그의 'usePluginData' 결과를 확인하여 'docusaurus-plugin-content-blog' 데이터가 (ID: default) 올바르게 로드되었는지 확인하세요.
    점검 사항:
    1. docusaurus.config.ts의 blog 플러그인 설정 (path: './papers', routeBasePath: '/paper').
    2. './papers' 폴더에 유효한 마크다운 게시물이 있고, 각 파일 front matter에 'title'과 'date'가 올바르게 포함되어 있는지.
    3. Docusaurus 개발 서버를 완전히 재시작했는지 (Ctrl+C 후 npm start).
    4. .docusaurus 폴더, node_modules/.cache 폴더 삭제 후 npm install 및 재시작.
    5. /paper 경로의 블로그 목록 페이지가 정상적으로 글 목록을 표시하는지.`);
    return (
      <section className={styles.latestNewsSection}>
        <div className="container">
          <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
            최신 학습 & 소식
          </Heading>
          <p className="text--center" style={{ marginTop: '1rem' }}>
            최신 게시물을 불러오는 데 문제가 있거나, 아직 작성된 게시물이 없습니다. (개발자 콘솔을 확인해주세요)
          </p>
        </div>
      </section>
    );
  }

  const allPosts: BlogPost[] = blogPosts;
  console.log('[LatestNewsSection] 가져온 모든 블로그 게시물 (allPosts):', allPosts.length, '개');
  if (allPosts.length > 0) {
    // 첫 번째 게시물의 metadata 전체를 로깅하여 timestamp, formattedDate 등의 존재 여부 확인
    console.log('[LatestNewsSection] 첫 번째 게시물 메타데이터:', JSON.stringify(allPosts[0].metadata, null, 2));
  }

  const sortedPosts = [...allPosts].sort((a, b) => {
    // metadata.timestamp가 있다면 우선 사용, 없다면 metadata.date를 파싱하여 사용
    const timeA = a.metadata.timestamp ?? new Date(a.metadata.date).getTime();
    const timeB = b.metadata.timestamp ?? new Date(b.metadata.date).getTime();
    if (isNaN(timeA) || isNaN(timeB)) {
      console.error('[LatestNewsSection] 날짜 정렬 오류: 유효하지 않은 날짜 형식이 감지되었습니다. 파일 확인 필요:', a.metadata.source, b.metadata.source, '날짜:', a.metadata.date, b.metadata.date);
      return 0; // 유효하지 않은 날짜는 순서 변경 안 함
    }
    return timeB - timeA;
  });

  const postsToShow = sortedPosts.slice(0, MAX_POSTS_TO_SHOW);

  return (
    <section className={styles.latestNewsSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          최신 학습 & 소식
        </Heading>
        {postsToShow.length > 0 ? (
          <div className={styles.newsItemsContainer}>
            {postsToShow.map(({metadata}) => (
              <Link to={metadata.permalink} key={metadata.permalink} className={styles.newsItemCard}>
                <Heading as="h3" className={styles.newsItemTitle}>
                  {metadata.title}
                </Heading>
                {/* BlogPost 타입의 metadata에는 formattedDate가 포함되어 있습니다. */}
                <p className={styles.newsItemDate}>{metadata.formattedDate}</p>
                {metadata.description && (
                  <p className={styles.newsItemDescription}>{metadata.description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text--center" style={{ marginTop: '1rem' }}>
            표시할 최신 게시물이 없습니다. (정렬 또는 필터링 후 결과 없음)
          </p>
        )}
        {allPosts.length > MAX_POSTS_TO_SHOW && postsToShow.length > 0 && (
          <div className={clsx('text--center', styles.seeMoreButtonContainer)}>
            <Link className={clsx('button button--outline button--primary button--md', styles.seeMoreButton)} to="/paper">
              모든 글 보기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
