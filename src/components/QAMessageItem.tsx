
import React from "react";
import { User, Bot, FileUp } from "lucide-react";

interface QAMessageItemProps {
  id: number;
  type: "user" | "bot";
  message: string;
  file?: string;
  fileName?: string;
}

export const QAMessageItem: React.FC<QAMessageItemProps> = ({
  type,
  message,
  file,
  fileName,
}) => {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start max-w-xs lg:max-w-md ${type === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`p-2 rounded-full ${type === "user" ? "bg-blue-600 text-white ml-2" : "bg-gray-200 text-gray-600 mr-2"}`}>
          {type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={`p-3 rounded-lg ${type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
          {message}
          {/* Show preview if message has file */}
          {file && (
            <div className="mt-2">
              {/* Show image preview if image, else file icon */}
              {file.startsWith("data:image") ? (
                <img src={file} alt={fileName || ""} className="h-24 max-w-full rounded border" />
              ) : (
                <div className="flex items-center gap-1 text-sm text-blue-800">
                  <FileUp className="h-4 w-4" />
                  {fileName}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
