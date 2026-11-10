import { useCallback, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, SPACE, TYPO, RADIUS } from "../../src/styles/tokens";

const MOODS = ['😊', '🎯', '😌', '🥳'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const { 
    query, setQuery, 
    moodFilter, setMoodFilter, 
    filteredEntries, resetFilters, resultCount 
  } = useDiarySearch(entries);
  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback((id: number) => {
    router.push({
      pathname: "/detail/[id]",
      params: { id: String(id) },
    });
  }, [router]);

  const handleReset = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          style={styles.search}
        />
      </View>

      {/* Row untuk Filter Mood & Tombol Reset */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodList}>
          {MOODS.map(mood => (
            <Pressable 
              key={mood} 
              onPress={() => setMoodFilter(moodFilter === mood ? '' : mood)}
              style={[styles.moodChip, moodFilter === mood && styles.moodActive]}
            >
              <Text style={styles.moodText}>{mood}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>
      
      <FlatList
        data={filteredEntries}
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
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  header: { fontSize: TYPO.h1, fontWeight: "700", color: COLORS.text, marginBottom: SPACE.m },
  searchRow: { flexDirection: "row", gap: SPACE.s, marginBottom: SPACE.m },
  search: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, backgroundColor: "#fff" },
  filterRow: { flexDirection: "row", alignItems: "center", marginBottom: SPACE.s },
  moodList: { gap: SPACE.s, paddingRight: SPACE.m },
  moodChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, backgroundColor: "#fff" },
  moodActive: { borderColor: COLORS.accent, borderWidth: 2, backgroundColor: '#EFF6FF' },
  moodText: { fontSize: 16 },
  resetButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: COLORS.danger, borderRadius: 20 },
  resetText: { color: '#fff', fontWeight: 'bold' },
  counter: { color: COLORS.muted, marginBottom: SPACE.s },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { textAlign: "center", color: COLORS.muted, paddingTop: 40 },
});