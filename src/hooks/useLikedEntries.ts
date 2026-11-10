import { useMemo } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

export function useLikedEntries(entries: DiaryEntry[], likedIds: Set<number>) {
  const likedEntries = useMemo(() => {
    return entries.filter(entry => likedIds.has(entry.id));
  }, [entries, likedIds]);

  return likedEntries;
}