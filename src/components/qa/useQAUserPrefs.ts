
import { useState } from "react";

export function useQAUserPrefs() {
  const [nightMode, setNightMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [persona, setPersona] = useState("student");
  return { nightMode, setNightMode, showBookmarks, setShowBookmarks, persona, setPersona };
}
