const getReadingTimeMinutes = (readingTime) => {
  if (!readingTime?.minutes) {
    return null;
  }

  return Math.max(1, Math.ceil(readingTime.minutes));
};

export default getReadingTimeMinutes;