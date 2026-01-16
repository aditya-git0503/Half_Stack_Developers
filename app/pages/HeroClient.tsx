// components/landing/HeroClient.tsx
'use client';

import { FaPlay } from 'react-icons/fa';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function HeroClient() {
  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };

  const demoVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // replace

  return (
    <div className="max-w-3xl space-y-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
        Ghost-Collab
      </h1>

      <div>
        <TextGenerateEffect
          words="Find your co-founder in the next building."
          className="text-2xl md:text-3xl text-gray-100"
          duration={0.6}
        />
      </div>

      <div>
        <TextGenerateEffect
          words="Ghost Collab connects student builders at your university—so you can launch faster, together."
          className="text-lg md:text-xl text-gray-300 mt-3 leading-relaxed"
          duration={0.8}
        />
      </div>

      {/* 🔮 Nearly Invisible Sign-In Button */}
      <div className="pt-8">
        <button
          onClick={handleGoogleSignIn}
          className="
            h-12 w-full max-w-xs
            rounded-xl
            border border-white/10
            bg-white/3
            backdrop-blur-sm
            text-white
            font-medium
            transition-all
            duration-200
            hover:bg-white/6
            active:scale-[0.99]
            focus:outline-none
            shadow-none
            md:max-w-md
          "
        >
          Sign in with Google
        </button>
      </div>

      {/* 🔮 Nearly Invisible Demo Link */}
      <div className="pt-3">
        <a
          href={demoVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-xl
            border border-white/10
            bg-white/2
            backdrop-blur-sm
            text-indigo-200
            font-medium
            transition-all
            duration-200
            hover:bg-white/5
            hover:text-indigo-100
          "
        >
          <FaPlay size={12} />
          View demo
        </a>
      </div>
    </div>
  );
}