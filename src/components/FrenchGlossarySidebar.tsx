
import React from "react";
import { BookOpen, Link as LinkIcon, MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// A small glossary dataset for demonstration
const glossary = [
  { word: "Bonjour", def: "Hello" },
  { word: "Merci", def: "Thank you" },
  { word: "S'il vous plaît", def: "Please" },
  { word: "Où est… ?", def: "Where is ...?" },
  { word: "La bise", def: "The cheek kiss greeting" },
  { word: "Bisou", def: "A kiss (informal)" },
  { word: "Resto U", def: "University canteen" },
  { word: "Rentrée", def: "Back to school/university" },
  { word: "Carte Navigo", def: "Paris public transport pass" },
];

export function GlossarySidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Mini-glossary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
            <span className="font-bold text-indigo-800">French Mini-Glossary</span>
          </div>
          <ul className="text-sm leading-relaxed space-y-2">
            {glossary.map(g => (
              <li key={g.word}>
                <span className="font-semibold text-indigo-700 cursor-help" title={g.def}>{g.word}</span>
                <span className="text-gray-500"> – {g.def}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key links & shortcuts */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <a href="#student-favorites" className="flex items-center text-yellow-700 hover:underline">
            <Star className="mr-2 h-4 w-4" />
            Student Favorites
          </a>
          <a href="#" className="flex items-center text-blue-700 hover:underline">
            <LinkIcon className="mr-2 h-4 w-4" />
            Useful Links
          </a>
          <a href="#" className="flex items-center text-green-700 hover:underline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Feedback
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
