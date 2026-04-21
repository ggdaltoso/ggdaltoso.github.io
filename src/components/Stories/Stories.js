import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Frame, TitleBar, ProgressBar, Modal } from '@react95/core';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useStories } from '@hooks';
import * as styles from './Stories.module.scss';

const formatStoryDate = (date) => {
  if (!date) return '';
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

const TICK_MS = 100;

const Stories = ({ isOpen, onClose }) => {
  const { stories } = useStories();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(0);
  const isPausedRef = useRef(false);
  const pointerDownAt = useRef(null);

  isPausedRef.current = isPaused;

  const stopTimer = () => clearInterval(timerRef.current);

  const startTimer = useCallback((duration) => {
    stopTimer();
    progressRef.current = 0;
    setProgress(0);
    timerRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      progressRef.current += (TICK_MS / duration) * 100;
      if (progressRef.current >= 100) {
        stopTimer();
        setProgress(100);
        setCurrentIdx((prev) => prev + 1);
      } else {
        setProgress(progressRef.current);
      }
    }, TICK_MS);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopTimer();
      setCurrentIdx(0);
      setProgress(0);
      return;
    }
    if (currentIdx >= stories.length) {
      onClose();
      return;
    }
    startTimer(stories[currentIdx]?.duration ?? 5000);
    return stopTimer;
  }, [isOpen, currentIdx]);

  const handlePointerDown = (e) => {
    pointerDownAt.current = { x: e.clientX, t: Date.now() };
    setIsPaused(true);
  };

  const handlePointerUp = (e) => {
    setIsPaused(false);
    if (!pointerDownAt.current) return;

    const held = Date.now() - pointerDownAt.current.t;
    const moved = Math.abs(e.clientX - pointerDownAt.current.x);

    pointerDownAt.current = null;

    if (held > 200 || moved > 10) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    if (x < width / 3) {
      setCurrentIdx((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  if (!isOpen || stories.length === 0) return null;

  return (
    <div
      className={styles['stories__overlay']}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Modal title={`Stories ${formatStoryDate(stories[currentIdx]?.date)}`}>
        <Frame className={styles['stories__window']}>
          <Frame
            boxShadow="$in"
            mb="$2"
            p="$1"
            className={styles['stories__content']}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <img
              src={stories[currentIdx]?.url}
              alt=""
              draggable={false}
              className={styles['stories__image']}
            />
          </Frame>
          <Frame className={styles['stories__progressRow']} boxShadow="$in">
            {stories.map((_, i) => (
              <ProgressBar
                key={i}
                percent={i < currentIdx ? 100 : i === currentIdx ? progress : 0}
                className={styles['stories__bar']}
              />
            ))}
          </Frame>
        </Frame>
      </Modal>
    </div>
  );
};

export default Stories;
