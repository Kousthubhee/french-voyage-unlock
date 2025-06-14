
import { Sun, Moon, Bookmark, Filter } from "lucide-react";

type QASharedToolbarProps = {
  nightMode: boolean;
  setNightMode: (v: boolean) => void;
  onShowBookmarks?: () => void;
  showBookmarks?: boolean;
};

export function QASharedToolbar({
  nightMode,
  setNightMode,
  onShowBookmarks,
  showBookmarks,
}: QASharedToolbarProps) {
  return (
    <div className="flex items-center gap-3 mb-3 justify-end">
      <button
        onClick={() => setNightMode(!nightMode)}
        className="p-2 rounded transition-colors"
        title={`Switch to ${nightMode ? "Light" : "Night"} Mode`}
        type="button"
      >
        {nightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      {onShowBookmarks && (
        <button
          onClick={onShowBookmarks}
          className={`p-2 rounded border ${showBookmarks ? "bg-yellow-200 border-yellow-600" : "bg-white border-gray-300"}`}
          title="View Bookmarked Answers"
          type="button"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
