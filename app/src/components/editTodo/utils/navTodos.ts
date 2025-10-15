export const goToNext = (
    hasNext: boolean, 
    currentIndex: number, 
    setCurrentIndex: (index: number) => void
) => {
    if (hasNext) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
};

export const goToPrevious = (hasPrevious: boolean,
    currentIndex: number,
    setCurrentIndex: (index: number) => void
) => {
    if (hasPrevious) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
};