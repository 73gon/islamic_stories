export interface ProphetStory {
  id: string;
  nameKey: string;
  arabicName?: string;
  titleKey?: string;
  eraKey?: string;
  summaryKey: string;
  storyKey: string; // Key for the story object (e.g., 'prophets.muhammad.story')
  lessonsKeys: string[];
  quranRefs: { surah: string; ayat: string }[];
}
