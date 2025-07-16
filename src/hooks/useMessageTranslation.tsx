import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationCache {
  [key: string]: string;
}

export const useMessageTranslation = () => {
  const { i18n } = useTranslation();
  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const [isTranslating, setIsTranslating] = useState(false);

  const translateMessage = async (message: string, targetLanguage?: string): Promise<string> => {
    const target = targetLanguage || i18n.language;
    const cacheKey = `${message}_${target}`;
    
    // Return cached translation if available
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Don't translate if target language is English or message is too short
    if (target === 'en' || message.length < 3) {
      return message;
    }

    setIsTranslating(true);
    
    try {
      // Use Google Translate API via a free service
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(message)}&langpair=auto|${target}&de=example@email.com`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the translation
        setTranslationCache(prev => ({
          ...prev,
          [cacheKey]: translatedText
        }));
        
        return translatedText;
      }
      
      return message; // Return original if translation fails
    } catch (error) {
      console.error('Translation error:', error);
      return message; // Return original if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  const getLanguageFlag = (langCode: string): string => {
    const flags: { [key: string]: string } = {
      'en': '🇺🇸',
      'es': '🇪🇸', 
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'pt': '🇵🇹',
      'it': '🇮🇹',
      'ru': '🇷🇺',
      'zh': '🇨🇳',
      'ja': '🇯🇵',
      'ar': '🇸🇦',
      'ko': '🇰🇷',
      'hi': '🇮🇳',
      'nl': '🇳🇱',
      'pl': '🇵🇱',
      'tr': '🇹🇷'
    };
    return flags[langCode] || '🌐';
  };

  const detectLanguage = async (text: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 100))}&langpair=auto|en&de=example@email.com`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText !== text) {
        // If translation differs significantly, it's likely not English
        return 'auto';
      }
      
      return 'en';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'auto';
    }
  };

  return {
    translateMessage,
    getLanguageFlag,
    detectLanguage,
    isTranslating,
    translationCache
  };
};