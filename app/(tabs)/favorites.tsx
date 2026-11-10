import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { useLikedEntries } from '../../src/hooks/useLikedEntries';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const likedEntries = useLikedEntries(entries, likedIds);

  const openDetail = useCallback((id: number) => {
    router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Diary Favorit</Text>
      <Text style={styles.counter}>{likedEntries.length} entri disukai</Text>
      
      <FlatList
        data={likedEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada diary yang disukai.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text, marginBottom: SPACE.s },
  counter: { color: COLORS.muted, marginBottom: SPACE.m },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { textAlign: 'center', color: COLORS.muted, paddingTop: 40 },
});