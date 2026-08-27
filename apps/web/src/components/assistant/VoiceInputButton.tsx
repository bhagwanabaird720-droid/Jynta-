'use client';

import { useState } from 'react';

export function VoiceInputButton({ onResult }: { onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false);

  function handleClick() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice input is not supported on this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  }

  return (
    <button
      onClick={handleClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full ${
        listening ? 'bg-red-100 text-red-600' : 'text-neutral-500'
      }`}
    >
      🎤
    </button>
  );
}
