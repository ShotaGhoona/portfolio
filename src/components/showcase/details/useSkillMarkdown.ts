'use client';

import { useEffect, useState } from 'react';

// Loads a raw markdown file from /public and returns its text.
// Used by the "Words" showcase details to display the actual skill/prompt file.
export function useSkillMarkdown(publicPath: string) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(publicPath)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((body) => {
        if (active) setText(body);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [publicPath]);

  return { text, error, loading: text === null && !error };
}
