import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';
import pageStyles from '@site/src/pages/index.module.css';

interface AdPlaceholderItemProps {
  gridClasses?: string;
  imageUrl?: string;
  altText?: string;
  linkUrl?: string;
}

export default function AdPlaceholderItem({
  gridClasses,
  imageUrl = "https://placehold.co/300x200/F0F0F0/777777?text=Advertisement&font=notosanskr", // 기본 플레이스홀더
  altText = "Advertisement",
  linkUrl
}: AdPlaceholderItemProps): JSX.Element {
  const content = (
    <img
      src={imageUrl}
      alt={altText}
      className={pageStyles.adImage}
      onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x200/CCCCCC/777777?text=Ad+Space&font=notosanskr')}
    />
  );

  return (
    <aside className={clsx(pageStyles.newspaperCard, pageStyles.realAdSpace, gridClasses, styles.adPlaceholderCard)}>
      {linkUrl ? (
        <Link to={linkUrl} target="_blank" rel="noopener noreferrer sponsored">
          {content}
        </Link>
      ) : (
        content
      )}
    </aside>
  );
}