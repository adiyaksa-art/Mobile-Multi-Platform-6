import React, { createContext, useContext, useMemo, useState } from 'react';

export type DiaryEntry = {
  id: number;
  title: string;
  date: string;
  preview: string;
  body: string;
  mood: string;
};

type DiaryContextType = {
  entries: DiaryEntry[];
  likedIds: Set<number>;
  addEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  toggleLike: (id: number) => void;
  getById: (id: string | number) => DiaryEntry | undefined;
};

const DiaryContext = createContext<DiaryContextType | null>(null);

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-11-02',
    preview: 'Jalan pagi 20 menit sebelum memulai aktivitas.',
    body: 'Pagi ini terasa tenang. Saya berjalan selama 20 menit dan menyiapkan agenda hari ini.',
    mood: '😊',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-11-01',
    preview: 'Menyelesaikan modul dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    mood: '🎯',
  },
  {
    id: 3,
    title: 'Senja dan Buku',
    date: '2026-10-31',
    preview: 'Membaca buku sambil menikmati sore.',
    body: 'Sore ini saya menikmati waktu membaca buku dengan suasana yang santai.',
    mood: '😌',
  },
];

export function DiaryProvider({ children }: { children: React.ReactNode; }) {
  const [entries, setEntries] = useState<DiaryEntry[]>(INITIAL_ENTRIES);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const addEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    setEntries((prev) => [
      {
        id: Date.now(),
        ...entry,
      },
      ...prev,
    ]);
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getById = (id: string | number) => {
    return entries.find((entry) => entry.id === Number(id));
  };

  const value = useMemo(
    () => ({
      entries,
      likedIds,
      addEntry,
      toggleLike,
      getById,
    }),
    [entries, likedIds]
  );

  return (
    <DiaryContext.Provider value={value}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary harus digunakan di dalam DiaryProvider');
  }
  return context;
}