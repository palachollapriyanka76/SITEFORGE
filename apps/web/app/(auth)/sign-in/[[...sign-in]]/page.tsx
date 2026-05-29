"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center w-full">
      <SignIn
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "w-full",
            card: "w-full bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.08)] p-0 sm:p-2",
            headerTitle: "font-display text-white font-extrabold text-2xl tracking-tight text-center",
            headerSubtitle: "text-zinc-400 text-xs text-center mt-1",
            socialButtonsBlockButton: "w-full bg-zinc-800 border border-zinc-700/80 hover:bg-zinc-700/60 hover:border-zinc-600/80 text-white rounded-xl h-11 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm font-sans font-semibold text-xs",
            socialButtonsBlockButtonText: "text-white font-semibold text-xs",
            formButtonPrimary: "w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.25)] border border-indigo-400/20",
            formFieldInput: "w-full bg-zinc-950 border border-zinc-800/80 text-zinc-100 rounded-xl h-11 px-3.5 focus:border-indigo-500/80 focus:ring-0 text-xs font-normal transition-colors",
            formFieldLabel: "text-zinc-400 font-bold text-[11px] mb-1.5 uppercase tracking-wider",
            footerActionText: "text-zinc-500 text-xs font-medium",
            footerActionLink: "text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200",
            dividerLine: "bg-zinc-800/80",
            dividerText: "text-zinc-600 text-[10px] uppercase font-bold tracking-widest",
            formFieldWarningText: "text-amber-400 text-[10px] mt-1.5",
            formFieldErrorText: "text-rose-400 text-[10px] mt-1.5",
            alertText: "text-rose-400 text-xs",
          },
        }}
      />
    </div>
  );
}
