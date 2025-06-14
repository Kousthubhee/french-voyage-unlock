import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, ArrowLeft as Swap, Mic, Copy, StickyNote } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

// TypeScript declarations to enable use of SpeechRecognition on `window`
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer R }
  ? R
  : any;

// declare ambient global access (simplifies usage below)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ru', label: 'Russian' },
  { code: 'ar', label: 'Arabic' },
];

const AUTO_DETECT = { code: 'auto', label: 'Detect' };

const getLangLabel = (code: string) => (
  LANG_OPTIONS.find(l => l.code === code)?.label || code
);

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto'); // 'auto' means detect
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<Array<any>>([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect language using a simple heuristics (and demo API key for Google Translate auto-detect)
  async function detectLanguage(text: string): Promise<string> {
    // For demo, use character sets, fallback to 'en'
    if (!text.trim()) return 'auto';
    // quick ugly presets
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(text)) return 'ja';
    if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/[\u0400-\u04FF]/.test(text)) return 'ru';
    if (/[¿áéíóúñü]/i.test(text)) return 'es';
    if (/[üöäß]/i.test(text)) return 'de';
    if (/[àâçéèêëîïôûùüÿœ]/i.test(text)) return 'fr';
    if (/[अ-ह]{2}/i.test(text)) return 'hi';
    return 'en';
    // For robust detection, use a language API (Google Translate, Detect endpoint)
  }

  // Translation logic: simulate API - can be replaced by any translation API
  const fakeTranslate = (txt: string, from: string, to: string) => {
    // Just for demo; in prod, call a real translation API.
    if (from === "en" && to === "fr") return "Traduction simulée : " + txt;
    if (from === "fr" && to === "en") return "Simulated translation: " + txt;
    return `[${getLangLabel(from)}→${getLangLabel(to)}]: ${txt}`;
  };

  const handleTranslate = async (latestText = sourceText, latestSourceLang = sourceLanguage, latestTargetLang = targetLanguage) => {
    setIsLoading(true);

    let from = latestSourceLang;
    // Auto-detect language
    if (latestSourceLang === 'auto') {
      from = await detectLanguage(latestText);
      setSourceLanguage(from);
    }
    // Fake delay for demo purposes
    setTimeout(() => {
      const result = latestText
        ? fakeTranslate(latestText, from, latestTargetLang)
        : '';
      setTranslatedText(result);

      // Save to translation history if non-empty
      if (latestText.trim() && result) {
        setTranslationHistory((prev) => [
          { text: latestText, from, to: latestTargetLang, result, timestamp: Date.now() },
          ...prev.filter(item => !(item.text === latestText && item.from === from && item.to === latestTargetLang)), // dedupe
        ]);
      }
      setIsLoading(false);
    }, 350);
  };

  // Debounced auto-translate as user types, or on language change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (sourceText.trim() && targetLanguage) {
        handleTranslate(sourceText, sourceLanguage, targetLanguage);
      } else {
        setTranslatedText('');
      }
    }, 400);
    // eslint-disable-next-line
  }, [sourceText, sourceLanguage, targetLanguage]);

  // Speech-to-text
  const handleSpeechToText = () => {
    // Both Chrome and Safari may provide speech recognition under different names
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      toast("Speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognitionClass();
    recognition.lang = sourceLanguage !== 'auto' ? sourceLanguage : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setSourceText(text);
      setIsListening(false);
      recognition.stop();
    };
    recognition.onerror = () => {
      setIsListening(false);
      recognition.stop();
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // Swap languages
  const handleSwap = () => {
    if (sourceLanguage === 'auto') return; // can't swap if detecting
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  // Play translated text
  const handleListen = () => {
    if (!translatedText) return;
    const utter = new window.SpeechSynthesisUtterance(translatedText);
    utter.lang = targetLanguage !== 'auto' ? targetLanguage : 'en-US';
    window.speechSynthesis.speak(utter);
  };

  // Copy translated text
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    toast("Copied translation!");
  };

  // Select a translation from history
  const handleHistoryClick = (entry: any) => {
    setSourceText(entry.text);
    setSourceLanguage(entry.from);
    setTargetLanguage(entry.to);
    setTranslatedText(entry.result);
    setNotesOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-2 relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🌐 Translation Hub</h1>
        <p className="text-lg text-gray-600">Instantly translate between dozens of languages</p>
      </div>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          onClick={() => setNotesOpen(true)}
          className="gap-1"
        >
          <StickyNote className="h-4 w-4" />
          Notes
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
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
                <option value="auto">{AUTO_DETECT.label}</option>
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleSwap}
                variant="ghost"
                aria-label="Swap source and target languages"
                className="justify-self-center mx-1"
                disabled={isLoading || sourceLanguage === 'auto' || targetLanguage === 'auto'}
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
                  .filter((opt) => opt.code !== sourceLanguage && opt.code !== 'auto')
                  .map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.label}
                    </option>
                  ))}
              </select>
            </div>

            {/* Input textarea with speech to text */}
            <div className="flex gap-2 items-start">
              <Textarea
                className="flex-1 border rounded px-4 py-2"
                placeholder="Enter text to translate"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                readOnly={isLoading}
                aria-label="Text to translate"
                rows={4}
              />
              <Button
                type="button"
                onClick={handleSpeechToText}
                variant={isListening ? "secondary" : "outline"}
                size="icon"
                className={isListening ? "animate-pulse border-primary" : ""}
                aria-label={isListening ? "Stop recording" : "Speak"}
                disabled={isLoading}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>

            {/* Translated text, with listen and copy */}
            <div className="relative flex flex-col gap-2">
              <Textarea
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
                  onClick={handleListen}
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
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  disabled={!translatedText}
                  aria-label="Copy translated text"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSourceText('');
                    setTranslatedText('');
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500"
                  disabled={isLoading && !sourceText && !translatedText}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes/history Drawer */}
      {notesOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-black/25 flex items-start justify-end">
          <div className="bg-white shadow-lg h-full w-full max-w-md p-6 overflow-y-auto transition-all animate-in fade-in right-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Translation History</h2>
              <Button variant="ghost" onClick={() => setNotesOpen(false)}>Close</Button>
            </div>
            <div className="space-y-3">
              {translationHistory.length === 0 ? (
                <div className="text-gray-400 text-center mt-12">No history.</div>
              ) : (
                translationHistory.map((item, idx) => (
                  <Card key={idx} className="mb-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <CardContent className="p-3">
                      <div className="text-xs flex gap-2 mb-1">
                        <span className="rounded bg-gray-100 px-2">{getLangLabel(item.from)}</span>
                        <span>→</span>
                        <span className="rounded bg-gray-100 px-2">{getLangLabel(item.to)}</span>
                        <span className="ml-auto text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="font-semibold text-gray-800">{item.text}</div>
                      <div className="text-xs text-gray-600 mt-1 truncate">{item.result}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {translationHistory.length > 0 && (
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => setTranslationHistory([])}
              >
                Clear All History
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
