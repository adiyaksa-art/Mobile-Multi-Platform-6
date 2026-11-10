import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS } from '../../src/styles/tokens';
const MOODS = ['😊', '🎯', '😌', '🥳'];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-02');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('');

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });
    setTitle('');
    setBody('');
    setMood('');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tambah Diary</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        style={styles.input}
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />
      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[
              styles.moodButton,
              mood === item && styles.moodSelected,
            ]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.saveButton, !canSave && styles.disabled]}
      >
        <Text style={styles.saveText}>Simpan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: '#fff',
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: '700',
  },
  moodRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  mood: {
    fontSize: 26,
  },
  saveButton: {
    padding: 14,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
});