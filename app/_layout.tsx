import React from 'react';
import { Stack } from 'expo-router';
import { DiaryProvider } from '../src/context/DiaryContext';

export default function RootLayout() {
  return (
    <DiaryProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: 'Detail Diary',
          }}
        />
      </Stack>
    </DiaryProvider>
  );
}