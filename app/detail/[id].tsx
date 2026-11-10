import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const { getById, likedIds, toggleLike } = useDiary();
  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mood}>{entry.mood}</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.body}>{entry.body}</Text>
        <Pressable onPress={() => toggleLike(entry.id)} style={styles.likeButton}>
          <Text style={styles.likeText}>{liked ? '❤️ Disukai' : '🤍 Suka'}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  mood: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  body: {
    fontSize: TYPO.body,
    lineHeight: 22,
    color: COLORS.text,
  },
  likeButton: {
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  likeText: {
    fontWeight: '700',
    color: COLORS.danger,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});