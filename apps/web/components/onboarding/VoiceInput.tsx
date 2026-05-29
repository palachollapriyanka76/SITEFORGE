"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Globe, AlertCircle } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const languages = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "हिन्दी (Hindi)" },
  { code: "te-IN", name: "తెలుగు (Telugu)" },
  { code: "ta-IN", name: "தமிழ் (Tamil)" }
];

export default function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [recognition, setRecognition] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check speech recognition support
    const SpeechRecognition = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setErrorMsg("Microphone permission denied.");
        } else {
          setErrorMsg("Could not process voice input.");
        }
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscript(transcript);
        }
      };

      setRecognition(rec);
    }
  }, [onTranscript]);

  useEffect(() => {
    if (recognition) {
      recognition.lang = selectedLang;
    }
  }, [selectedLang, recognition]);

  const toggleListening = () => {
    if (!recognition) {
      setErrorMsg("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Waveform indicator (visible only when recording) */}
      {isListening && (
        <div className="flex items-center gap-1 h-6 px-2 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse">
          <span className="text-[10px] text-zinc-500 font-medium">Recording</span>
          <div className="flex items-end gap-0.5 h-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="w-0.5 bg-indigo-500 rounded-full animate-bounce"
                style={{
                  height: "100%",
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.8s"
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Language Selector Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-semibold">
          <Globe className="h-4 w-4" />
          <span>{languages.find((l) => l.code === selectedLang)?.name.split(" ")[0]}</span>
        </button>
        
        {/* Hidden dropdown menu hover */}
        <div className="absolute bottom-12 left-0 z-30 hidden group-hover:block w-36 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`w-full text-left text-xs font-medium px-4 py-2.5 hover:bg-zinc-800 transition-colors ${
                selectedLang === lang.code ? "text-indigo-400 bg-zinc-800/40" : "text-zinc-400"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mic trigger button */}
      <button
        type="button"
        onClick={toggleListening}
        className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 relative ${
          isListening 
            ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.45)]" 
            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
        }`}
        title={isListening ? "Stop Recording" : "Record Voice Prompt"}
      >
        {isListening ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
        {isListening && (
          <span className="absolute inset-0 rounded-xl border border-red-500 animate-ping opacity-75 pointer-events-none" />
        )}
      </button>

      {/* Feedback messages */}
      {errorMsg && (
        <div className="absolute bottom-16 left-4 flex items-center gap-1.5 text-[10px] text-rose-400 bg-rose-950/20 border border-rose-900/40 py-1.5 px-3 rounded-lg z-20">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
