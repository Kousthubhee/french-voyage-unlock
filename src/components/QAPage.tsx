import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Send, Bot, User, ImageUp, FileUp } from "lucide-react";
import { faqCategories } from "@/data/faqCategories";

// ✅ Define type for messages allowing optional file/fileName
interface MessageItem {
  id: number;
  type: "user" | "bot";
  message: string;
  file?: string;
  fileName?: string;
}

export const QAPage = () => {
  // ✅ Add types to messages array
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm here to help you with any questions about studying in France. What would you like to know?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(faqCategories[0].label);
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Preview image/file
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Notice close state
  const [noticeClosed, setNoticeClosed] = useState(false);

  // Simulate bot reply with typing animation
  // Make sure userMsg is a string & type is correct
  const sendBotReply = (userMsg: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev: MessageItem[]): MessageItem[] => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          message: `Thanks for your question about "${userMsg || file?.name || "your file"}". This is a simulated AI bot, not a real human. In production, this would connect to an AI service to provide answers about studying in France.`,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !file) return;
    const messageText = newMessage.trim();

    const userMessage: MessageItem = {
      id: messages.length + 1,
      type: "user",
      message: messageText + (file ? `\n[Attached: ${file.name}]` : ""),
      file: filePreview || undefined,
      fileName: file?.name,
    };

    setMessages((prev: MessageItem[]): MessageItem[] => [
      ...prev,
      userMessage,
    ]);
    setNewMessage("");
    setFile(null);
    setFilePreview(null);
    sendBotReply(messageText);
  };

  const handleQuickQuestion = (q: string) => {
    setNewMessage(q);
    if (inputFileRef.current) inputFileRef.current.value = "";
    setFile(null);
    setFilePreview(null);
  };

  // Handle file upload and preview for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files && e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    if (uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setFilePreview(ev.target?.result as string);
      reader.readAsDataURL(uploadedFile);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
          Ask Me Anything
        </h1>
        <p className="text-lg text-gray-600">
          Get instant answers to your questions about studying in France
        </p>
      </div>

      {!noticeClosed && (
        <div className="bg-blue-50 border border-blue-200 px-5 py-4 mb-4 rounded relative text-sm text-blue-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 animate-fade-in">
          <span>
            <strong>AI Bot Notice:</strong> This is a simulated assistant for demo purposes. Your questions stay private and are <u>not</u> sent to any external servers or AI service.
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto px-2 py-1"
            onClick={() => setNoticeClosed(true)}
          >
            Close
          </Button>
        </div>
      )}

      <Card className="h-96 mb-6">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start max-w-xs lg:max-w-md ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`p-2 rounded-full ${msg.type === "user" ? "bg-blue-600 text-white ml-2" : "bg-gray-200 text-gray-600 mr-2"}`}>
                    {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`p-3 rounded-lg ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                    {msg.message}
                    {/* Show preview if message has file */}
                    {msg.file && (
                      <div className="mt-2">
                        {/* Show image preview if image, else file icon */}
                        {msg.file.startsWith("data:image") ? (
                          <img src={msg.file} alt={msg.fileName || ""} className="h-24 max-w-full rounded border" />
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-blue-800">
                            <FileUp className="h-4 w-4" />
                            {msg.fileName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="p-2 rounded-full bg-gray-200 text-gray-600 mr-2">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100 text-gray-900 flex items-center gap-2">
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                  <span className="dot-flash" />
                  <span className="ml-2">typing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <form
              className="flex flex-col sm:flex-row items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              {/* File/Image upload button */}
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                ref={inputFileRef}
                className="hidden"
                onChange={handleFileChange}
                aria-label="Attach file"
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                aria-label="Attach an image or file"
                onClick={() => inputFileRef.current?.click()}
              >
                <ImageUp className="h-5 w-5" />
                File
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault(); // DISABLE enter-to-send
                }}
              />
              <Button
                type="submit"
                className="flex-shrink-0"
                disabled={(!newMessage.trim() && !file) || isTyping}
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </form>
            {/* Show file preview if uploaded */}
            {file && (
              <div className="mt-2 flex items-center gap-2">
                {filePreview && file.type.startsWith("image/") ? (
                  <img src={filePreview} alt={file.name} className="h-16 rounded border" />
                ) : (
                  <FileUp className="text-blue-700" />
                )}
                <span className="text-xs">{file.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setFilePreview(null);
                    if (inputFileRef.current) inputFileRef.current.value = "";
                  }}
                  className="px-1 py-0"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Questions</h3>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList>
            {faqCategories.map((cat) => (
              <TabsTrigger
                key={cat.label}
                value={cat.label}
                className="capitalize"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqCategories.map((cat) => (
            <TabsContent value={cat.label} key={cat.label}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {cat.questions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Typing dots CSS */}
      <style>{`
        .dot-flash {
          width: 8px;
          height: 8px;
          background: #888;
          display: inline-block;
          border-radius: 50%;
          margin-right: 3px;
          animation: dot-flash-keyframes 1s infinite linear alternate;
        }
        .dot-flash:nth-child(2) { animation-delay: .2s; }
        .dot-flash:nth-child(3) { animation-delay: .4s; }
        @keyframes dot-flash-keyframes {
          0% { opacity: 0.2; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1.2);}
        }
      `}</style>
    </div>
  );
};
