"use client";

import { useState } from "react";

export function ArticleShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function shareUrl(network: "linkedin" | "x") {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const destination = network === "linkedin"
      ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      : `https://x.com/intent/post?url=${url}&text=${text}`;
    window.open(destination, "_blank", "noopener,noreferrer");
  }

  const buttonClass = "inline-flex h-10 items-center justify-center rounded-xs border border-border-primary bg-bg-primary px-3.5 text-sm max-md:text-xs max-md:leading-4 font-medium text-text-secondary shadow-xs transition-[transform,background-color] duration-150 hover:bg-bg-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current motion-reduce:transform-none";

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share this Perspective">
      <button type="button" onClick={copyLink} className={buttonClass}>{copied ? "Link copied" : "Copy link"}</button>
      <button type="button" onClick={() => shareUrl("linkedin")} className={`${buttonClass} w-10 px-0`} aria-label="Share on LinkedIn">in</button>
      <button type="button" onClick={() => shareUrl("x")} className={`${buttonClass} w-10 px-0`} aria-label="Share on X">X</button>
    </div>
  );
}
