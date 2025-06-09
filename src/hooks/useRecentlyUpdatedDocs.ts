// src/hooks/useRecentlyUpdatedDocs.ts
import { usePluginData } from '@docusaurus/useGlobalData';
import type { DocMetadata as GlobalDocMetadata } from '@docusaurus/plugin-content-docs';

export interface DocMetadata extends GlobalDocMetadata {
  frontMatter: {
    description?: string;
  };
}

interface DocsPluginData {
  path: string;
  versions: Array<{
    name: string;
    label: string;
    isLast: boolean;
    path: string;
    mainDocId: string;
    docs: Record<string, DocMetadata>;
    sidebars?: Record<string, unknown>;
  }>;
}

interface UseRecentlyUpdatedDocsReturn {
  recentDocs: DocMetadata[];
  totalDocsCount: number;
}

const MAX_DOCS_TO_SHOW_FROM_HOOK = 5;

export function useRecentlyUpdatedDocs(): UseRecentlyUpdatedDocsReturn {
  const docsPluginData = usePluginData('docusaurus-plugin-content-docs') as DocsPluginData | undefined;
  
  let allItems: DocMetadata[] = [];

  if (docsPluginData && docsPluginData.versions) {
    docsPluginData.versions.forEach(version => {
      const versionDocsArray = Object.values(version.docs);
      allItems.push(...versionDocsArray);
    });
  } else {
    console.error("[Debug] Could not find 'docsPluginData' or 'docsPluginData.versions'.");
    return { recentDocs: [], totalDocsCount: 0 };
  }

  // --- 새로운 디버깅 단계 ---
  // 필터링 전, 수집된 모든 아이템의 전체 내용을 콘솔에 출력합니다.
  console.log(`[Debug] Found ${allItems.length} total items before filtering. Dumping all item details below:`);
  allItems.forEach((item, index) => {
    console.log(`[Debug] Item #${index}:`, item);
  });
  // --- 디버깅 단계 끝 ---

  const filteredDocs = allItems.filter(doc => 
    typeof doc.lastUpdatedAt === 'number' && doc.permalink
  );
  
  console.log(`[Debug] After filtering, ${filteredDocs.length} docs remained.`);

  const sortedDocs = [...filteredDocs].sort((a, b) => {
    return b.lastUpdatedAt - a.lastUpdatedAt;
  });

  const recentDocs = sortedDocs.slice(0, MAX_DOCS_TO_SHOW_FROM_HOOK);

  console.log('[Debug] Final recentDocs to show:', recentDocs);

  return {
    recentDocs,
    totalDocsCount: sortedDocs.length,
  };
}
