import { useEffect, useMemo, useState } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState(''); // State untuk filter mood

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    let result = entries;

    // Filter berdasarkan mood terlebih dahulu
    if (moodFilter) {
      result = result.filter((entry) => entry.mood === moodFilter);
    }

    // Lalu filter berdasarkan query pencarian
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) {
      return result;
    }
    
    return result.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q)
    );
  }, [entries, debouncedQuery, moodFilter]); // moodFilter masuk sebagai dependency

  // Fungsi untuk mengosongkan query dan filter mood
  const resetFilters = () => {
    setQuery('');
    setMoodFilter('');
  };

  return {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    filteredEntries,
    resetFilters,
    resultCount: filteredEntries.length,
  };
}