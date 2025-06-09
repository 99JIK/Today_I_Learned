    import React from 'react';
    import clsx from 'clsx';
    import useBaseUrl from '@docusaurus/useBaseUrl';
    import { useColorMode } from '@docusaurus/theme-common';
    import styles from './styles.module.css';
    
    interface ProfileImageProps {
      lightSrc: string; // 라이트 모드용 이미지 경로
      darkSrc: string;  // 다크 모드용 이미지 경로
      alt?: string;
    }
    
    export default function ProfileImage({
      lightSrc,
      darkSrc,
      alt = 'Profile Image',
    }: ProfileImageProps): JSX.Element {
      const { colorMode } = useColorMode();
      const lightImageUrl = useBaseUrl(lightSrc);
      const darkImageUrl = useBaseUrl(darkSrc);
    
      return (
        <div className={styles.imageContainer}>
          {/* 두 개의 이미지를 겹쳐놓고, 테마에 따라 투명도를 조절하여 크로스페이드 효과를 줍니다. */}
          <img
            src={lightImageUrl}
            alt={alt}
            className={clsx(
              styles.profileImage,
              colorMode === 'dark' ? styles.hidden : styles.visible,
            )}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <img
            src={darkImageUrl}
            alt={alt}
            className={clsx(
              styles.profileImage,
              colorMode === 'light' ? styles.hidden : styles.visible,
            )}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      );
    }
    