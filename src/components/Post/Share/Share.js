import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Button } from '@react95/core';
import { Tick, WebLink } from '@react95/icons';
import siteConfig from '@config';
import buildDocumentTitle from '@utils/build-document-title';
import * as styles from './Share.module.scss';

const SUCCESS_TIMEOUT = 2000;

const Share = ({ title, compact = false }) => {
  const { t } = useTranslation();
  // null, 'shared' (native share sheet) or 'copied' (clipboard fallback).
  const [status, setStatus] = useState(null);
  const timeoutRef = useRef();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const showSuccess = (nextStatus) => {
    setStatus(nextStatus);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus(null), SUCCESS_TIMEOUT);
  };

  const copyLink = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('copied');
    } catch {
      // Clipboard can be blocked (e.g. insecure context); nothing else to do.
    }
  };

  const handleShare = async () => {
    // Canonical URL: drops query strings and hashes, keeps the locale prefix.
    const url = `${siteConfig.url}${window.location.pathname}`;
    // "Blog do GG - <post title>", same as the browser tab.
    const shareTitle = buildDocumentTitle(title);

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url });
        showSuccess('shared');
        return;
      } catch (error) {
        // The user closed the share sheet.
        if (error.name === 'AbortError') return;
      }
    }

    copyLink(`${shareTitle}\n${url}`);
  };

  const labels = {
    idle: t('Share'),
    shared: t('Shared'),
    copied: t('Copied'),
  };
  const current = status || 'idle';
  const Icon = status ? Tick : WebLink;

  if (compact) {
    return (
      <button
        type="button"
        className={styles['share__icon']}
        onClick={handleShare}
        title={labels[current]}
        aria-label={labels[current]}
      >
        <Icon variant="16x16_4" />
      </button>
    );
  }

  return (
    <Button
      onClick={handleShare}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap="$4"
    >
      <Icon variant="16x16_4" />
      {/* Every label shares one grid cell, so the button keeps the width of
          the longest one and never shifts when the label changes. */}
      <span className={styles['share__labels']} aria-live="polite">
        {Object.entries(labels).map(([key, label]) => (
          <span
            key={key}
            className={styles['share__label']}
            aria-hidden={key !== current}
            style={{ visibility: key === current ? 'visible' : 'hidden' }}
          >
            {label}
          </span>
        ))}
      </span>
    </Button>
  );
};

export default Share;
