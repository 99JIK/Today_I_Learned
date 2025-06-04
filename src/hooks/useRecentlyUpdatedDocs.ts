// src/hooks/useRecentlyUpdatedDocs.ts
import { useAllPluginInstancesData } from '@docusaurus/useGlobalData';

// 문서 메타데이터 타입
export interface DocMetadata {
  id: string;
  title: string;
  permalink: string;
  lastUpdatedAt?: number; // Unix timestamp (seconds)
  frontMatter: {
    description?: string;
  };
}

// plugin-content-docs 데이터 타입의 일부
interface DocsPluginData {
  path: string;
  versions: Array<{
    name: string;
    label: string;
    isLast: boolean;
    path: string;
    mainDocId: string;
    docs: DocMetadata[] | Record<string, DocMetadata>;
    sidebars?: Record<string, unknown>;
  }>;
}

interface UseRecentlyUpdatedDocsReturn {
  recentDocs: DocMetadata[];
  totalDocsCount: number;
}

const MAX_DOCS_TO_SHOW_FROM_HOOK = 5; // 표시할 최대 문서 수

export function useRecentlyUpdatedDocs(): UseRecentlyUpdatedDocsReturn {
  const allPluginData = useAllPluginInstancesData();
  const docsPluginData = allPluginData?.['docusaurus-plugin-content-docs']?.default as DocsPluginData | undefined;

  let allDocs: DocMetadata[] = [];

  if (docsPluginData && docsPluginData.versions) {
    docsPluginData.versions.forEach(version => {
      const versionDocsArray = Array.isArray(version.docs)
        ? version.docs
        : Object.values(version.docs);

      versionDocsArray.forEach(doc => {
        if (
          doc.permalink &&
          doc.permalink.startsWith('/docs/') &&
          doc.id !== 'intro/index' && 
          !doc.permalink.endsWith('/category')
        ) {
          allDocs.push(doc);
        }
      });
    }); // 여기가 원래 53번째 줄의 끝입니다.
  } // 여기가 원래 54번째 줄입니다. 에러 메시지에 있던 불필요한 `}>`를 제거했습니다.

  const sortedDocs = [...allDocs].sort((a, b) => {
    const timeA = a.lastUpdatedAt ?? 0;
    const timeB = b.lastUpdatedAt ?? 0;
    return timeB - timeA; // 내림차순 (최신순)
  });

  return {
    recentDocs: sortedDocs.slice(0, MAX_DOCS_TO_SHOW_FROM_HOOK),
    totalDocsCount: sortedDocs.length,
  };
}
