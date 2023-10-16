import { ref, computed } from 'vue';

export function useTextTransform() {
  const toUpperCase = (wordToConvert: string) => {
    return wordToConvert.toUpperCase();
  };

  const toTitleCase = (wordToConvert: string) => {
    return wordToConvert.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  return {
    toUpperCase,
    toTitleCase
  };
}