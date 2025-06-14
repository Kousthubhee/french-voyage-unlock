
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Volume2, ArrowLeft, RefreshCcw, ArrowLeft as Swap } from 'lucide-react';

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
];

interface TranslationFormProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
  onSwap: () => void;
  onClear: () => void;
  onListen: () => void;
}

interface CommonPhrasesProps {
  phrases: Array<{ english: string; french: string; category: string }>;
  onPhraseSelect: (phrase: { english: string; french: string }) => void;
}

const TranslationForm = ({
  sourceText,
  setSourceText,
  translatedText,
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
  onTranslate,
  isLoading,
  onSwap,
  onClear,
  onListen,
}: TranslationFormProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Translate</h2>
        <div className="grid gap-4">
          {/* Language selectors with swap */}
          <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] gap-2 items-center">
            <select
              className="border rounded px-4 py-2"
              aria-label="Source Language"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              disabled={isLoading}
            >
              {LANG_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Button
              type="button"
              onClick={onSwap}
              variant="ghost"
              aria-label="Swap source and target languages"
              className="justify-self-center mx-1"
              disabled={isLoading}
              tabIndex={0}
            >
              <Swap className="h-5 w-5" />
            </Button>
            <select
              className="border rounded px-4 py-2"
              aria-label="Target Language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              disabled={isLoading}
            >
              {LANG_OPTIONS
                .filter((opt) => opt.code !== sourceLanguage)
                .map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Input textarea */}
          <textarea
            className="border rounded px-4 py-2"
            placeholder="Enter text to translate"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            readOnly={isLoading}
            aria-label="Text to translate"
            rows={4}
          />

          {/* Translated text + listen */}
          <div className="relative flex flex-col gap-2">
            <textarea
              className="border rounded px-4 py-2 bg-gray-100"
              placeholder="Translated text"
              value={translatedText}
              readOnly
              aria-label="Translated text"
              rows={4}
            />
            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                onClick={onListen}
                variant="outline"
                size="sm"
                disabled={!translatedText || isLoading}
                aria-label="Listen to translation"
                className="gap-1"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </Button>
              <Button
                type="button"
                onClick={onClear}
                variant="ghost"
                size="sm"
                className="text-gray-500"
                disabled={isLoading && !sourceText && !translatedText}
              >
                <RefreshCcw className="h-4 w-4" /> Clear
              </Button>
            </div>
          </div>

          {/* Translate button */}
          <Button
            onClick={onTranslate}
            disabled={isLoading || !sourceText.trim() || sourceLanguage === targetLanguage}
            className="w-full"
            aria-busy={isLoading}
            aria-live={isLoading ? "polite" : undefined}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Translating...
              </span>
            ) : (
              "Translate"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CommonPhrases = ({ phrases, onPhraseSelect }: CommonPhrasesProps) => (
  <Card>
    <CardContent className="p-6">
      <h2 className="text-lg font-semibold mb-4">Common Phrases</h2>
      <div className="grid gap-4">
        {phrases.map((phrase, index) => (
          <Button key={index} onClick={() => onPhraseSelect(phrase)} className="justify-start">
            {phrase.english} - {phrase.french} <span className="ml-2 text-xs text-gray-400">({phrase.category})</span>
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);

  // Listen to translated text
  const handleListen = () => {
    if (!translatedText) return;
    const utter = new window.SpeechSynthesisUtterance(translatedText);
    utter.lang = targetLanguage === "fr" ? "fr-FR" : "en-US";
    window.speechSynthesis.speak(utter);
  };

  // Swap source and target languages
  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  // Clear text fields
  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const commonPhrases = [
    { english: "Hello", french: "Bonjour", category: "Greetings" },
    { english: "Thank you", french: "Merci", category: "Greetings" },
    { english: "Excuse me", french: "Excusez-moi", category: "Polite" },
  ];

  const handleTranslate = () => {
    setIsLoading(true);
    // Simulating realistic translation for demo; replace logic for real API
    setTimeout(() => {
      if (sourceLanguage === "en" && targetLanguage === "fr") {
        if (sourceText.trim().toLowerCase() === "hello") setTranslatedText("Bonjour");
        else if (sourceText.trim().toLowerCase() === "thank you") setTranslatedText("Merci");
        else if (sourceText.trim().toLowerCase() === "excuse me") setTranslatedText("Excusez-moi");
        else setTranslatedText("Traduction simulée : " + sourceText);
      } else if (sourceLanguage === "fr" && targetLanguage === "en") {
        if (sourceText.trim().toLowerCase() === "bonjour") setTranslatedText("Hello");
        else if (sourceText.trim().toLowerCase() === "merci") setTranslatedText("Thank you");
        else if (sourceText.trim().toLowerCase() === "excusez-moi") setTranslatedText("Excuse me");
        else setTranslatedText("Simulated translation: " + sourceText);
      } else {
        setTranslatedText("");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handlePhraseSelect = (phrase: { english: string; french: string }) => {
    // When a phrase is selected, auto set fields and translate if needed
    if (sourceLanguage === "en" && targetLanguage === "fr") {
      setSourceText(phrase.english);
      setTranslatedText(phrase.french);
    } else if (sourceLanguage === "fr" && targetLanguage === "en") {
      setSourceText(phrase.french);
      setTranslatedText(phrase.english);
    } else {
      setSourceText('');
      setTranslatedText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🌐 Translation Hub</h1>
        <p className="text-lg text-gray-600">Translate between English and French instantly</p>
      </div>
      <Tabs defaultValue="translate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translate">Translate</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>
        <TabsContent value="translate">
          <TranslationForm
            sourceText={sourceText}
            setSourceText={setSourceText}
            translatedText={translatedText}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            onTranslate={handleTranslate}
            isLoading={isLoading}
            onSwap={handleSwap}
            onClear={handleClear}
            onListen={handleListen}
          />
        </TabsContent>
        <TabsContent value="phrases">
          <CommonPhrases phrases={commonPhrases} onPhraseSelect={handlePhraseSelect} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

