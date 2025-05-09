// 추천 위치: src/components/LatestNewsSection/index.tsx

import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
// Docusaurus의 BlogPost 타입을 직접 사용합니다.
import type {BlogPost} from '@docusaurus/plugin-content-blog';

// Docusaurus가 빌드 시 생성하는 블로그 목록 JSON 파일을 직접 임포트합니다.
// 경로는 docusaurus.config.ts의 blog 플러그인 id 설정에 따라 달라질 수 있습니다.
// id를 지정하지 않았다면 'default'가 사용됩니다.
// @ts-ignore: Docusaurus는 빌드 시점에 이 경로를 인식하지만, TypeScript는 모를 수 있습니다.
import blogData from '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

// 이 컴포넌트와 동일한 디렉터리에 styles.module.css 파일이 있다고 가정합니다.
import styles from './styles.module.css'; // 별도 컴포넌트 폴더 사용 시

// 홈페이지에 표시할 최근 게시물의 최대 개수
const MAX_POSTS_TO_SHOW = 4;

// 임포트한 JSON 데이터의 타입을 정의합니다.
// blog-post-list-prop-default.json 파일의 구조를 따릅니다.
interface BlogListJson {
  title: string;
  items: Array<{
    title: string;
    permalink: string;
    date: string; // ISO 8601 형식의 문자열
    // JSON 파일에는 formattedDate나 description이 없을 수 있습니다.
    // 필요하다면 아래 BlogPost 타입의 metadata에서 가져오거나 직접 포맷팅해야 합니다.
    // 여기서는 BlogPost 타입과 최대한 유사하게 처리합니다.
    // 실제로는 BlogPost의 metadata 객체를 직접 사용하지 않고,
    // JSON 파일의 items 배열에 있는 객체를 사용합니다.
  }>;
}

// BlogPost 타입의 metadata와 유사하게 인터페이스 정의 (화면 표시에 필요한 부분만)
interface DisplayPostMetadata {
  permalink: string;
  title: string;
  date: string; // 원본 date 문자열
  formattedDate?: string; // 직접 생성 또는 다른 방법으로 가져와야 함
  description?: string; // JSON에 없다면 표시 불가
}


export default function LatestNewsSection(): ReactNode {
  console.log('[LatestNewsSection] 직접 임포트한 blogData:', JSON.stringify(blogData, null, 2));

  const typedBlogData = blogData as BlogListJson;

  if (!typedBlogData || !typedBlogData.items || typedBlogData.items.length === 0) {
    console.warn(`[LatestNewsSection] JSON 파일을 직접 임포트했으나, 게시물 데이터를 찾을 수 없거나 비어 있습니다.
    '.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json' 파일이 정상적으로 생성되는지,
    그리고 해당 파일의 내용이 올바른지 확인하세요.
    개발 서버를 완전히 재시작했는지도 확인해주세요.`);
    return (
      <section className={styles.latestNewsSection}>
        <div className="container">
          <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
            최신 학습 & 소식
          </Heading>
          <p className="text--center" style={{ marginTop: '1rem' }}>
            최신 게시물을 불러오는 데 문제가 있거나, 아직 작성된 게시물이 없습니다. (JSON 직접 임포트 실패)
          </p>
        </div>
      </section>
    );
  }

  const allPostsFromJson = typedBlogData.items;
  console.log('[LatestNewsSection] JSON에서 가져온 모든 블로그 게시물:', allPostsFromJson.length, '개');

  // JSON 데이터에는 timestamp나 formattedDate가 없을 수 있으므로, date 문자열로 직접 정렬합니다.
  const sortedPosts = [...allPostsFromJson].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (isNaN(timeA) || isNaN(timeB)) {
      console.error('[LatestNewsSection] 날짜 정렬 오류 (JSON): 유효하지 않은 날짜 형식이 감지되었습니다.', a.date, b.date);
      return 0;
    }
    return timeB - timeA;
  });

  const postsToShow = sortedPosts.slice(0, MAX_POSTS_TO_SHOW);
  console.log('[LatestNewsSection] 화면에 표시할 게시물 (JSON 기반):', postsToShow.length, '개');

  // 날짜 포맷팅 함수 (JSON에는 formattedDate가 없으므로 직접 만듭니다)
  const formatDate = (dateString: string): string => {
    try {
      return new Intl.DateTimeFormat('ko-KR', { // 또는 'en-US' 등
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(dateString));
    } catch (e) {
      console.error("날짜 포맷팅 오류:", dateString, e);
      return dateString; // 오류 시 원본 날짜 반환
    }
  };

  return (
    <section className={styles.latestNewsSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          최신 학습 & 소식
        </Heading>
        {postsToShow.length > 0 ? (
          <div className={styles.newsItemsContainer}>
            {postsToShow.map((post) => (
              <Link to={post.permalink} key={post.permalink} className={styles.newsItemCard}>
                <Heading as="h3" className={styles.newsItemTitle}>
                  {post.title}
                </Heading>
                {/* JSON에는 formattedDate가 없으므로 직접 포맷팅 */}
                <p className={styles.newsItemDate}>{formatDate(post.date)}</p>
                {/* JSON에는 description이 없을 수 있습니다. 필요하다면 추가 처리 필요 */}
                {/* <p className={styles.newsItemDescription}>{post.description}</p> */}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text--center" style={{ marginTop: '1rem' }}>
            표시할 최신 게시물이 없습니다. (정렬 또는 필터링 후 결과 없음)
          </p>
        )}
        {allPostsFromJson.length > MAX_POSTS_TO_SHOW && postsToShow.length > 0 && (
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
