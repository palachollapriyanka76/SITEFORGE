"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Globe, AlertCircle } from "lucide-react";

const languages = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "हिन्दी (Hindi)" },
  { code: "te-IN", name: "తెలుగు (Telugu)" },
  { code: "ta-IN", name: "தமிழ் (Tamil)" }
];

export default function VoiceInput({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [recognition, setRecognition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const SpeechRecognition = 
      window.SpeechRecognition || window.webkitSpeechRecognition;

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

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setErrorMsg("Microphone permission denied.");
        } else {
          setErrorMsg("Could not process voice input.");
        }
      };

      rec.onresult = (event) => {
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
      {/* Waveform indicator */}
      {isListening && (
        <div className="flex items-center gap-1 h-6 px-2 bg-white border border-[#2F3E46]/12 rounded-lg animate-pulse">
          <span className="text-[10px] text-[#354F52] font-semibold">Recording</span>
          <div className="flex items-end gap-0.5 h-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="w-0.5 bg-[#52796F] rounded-full animate-bounce"
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

      {/* Language Selector */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 h-10 px-3 rounded-full bg-white border border-[#2F3E46]/12 text-[#354F52] hover:text-[#2F3E46] transition-colors text-xs font-semibold">
          <Globe className="h-4 w-4 text-[#52796F]" />
          <span>{languages.find((l) => l.code === selectedLang)?.name.split(" ")[0]}</span>
        </button>
        
        <div className="absolute bottom-12 left-0 z-30 hidden group-hover:block w-36 bg-white border border-[#2F3E46]/12 rounded-xl overflow-hidden shadow-md py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`w-full text-left text-xs font-semibold px-4 py-2 hover:bg-[#CAD2C5]/20 transition-colors ${
                selectedLang === lang.code ? "text-[#52796F] bg-[#CAD2C5]/10" : "text-[#354F52]"
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
        className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 relative ${
          isListening 
            ? "bg-red-650 border-red-500 text-white shadow-md" 
            : "bg-white border-[#2F3E46]/12 text-[#354F52] hover:text-[#2F3E46] hover:border-[#52796F]"
        }`}
        title={isListening ? "Stop Recording" : "Record Voice Prompt"}
      >
        {isListening ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
        {isListening && (
          <span className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-75 pointer-events-none" />
        )}
      </button>

      {errorMsg && (
        <div className="absolute bottom-16 left-4 flex items-center gap-1.5 text-[10px] text-rose-600 bg-rose-50 border border-rose-250 py-1.5 px-3 rounded-lg z-20">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
