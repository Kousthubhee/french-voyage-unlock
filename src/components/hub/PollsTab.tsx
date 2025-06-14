
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Heart, Share2 } from 'lucide-react';

interface Poll {
  id: number;
  type: 'poll';
  author: string;
  avatar: string;
  time: string;
  question: string;
  options: { text: string; votes: number }[];
  likes: number;
  comments: CommentType[];
  category: string;
}
interface CommentType {
  id: number;
  author: string;
  content: string;
  time?: string;
  likes: number;
  replies: ReplyType[];
}
interface ReplyType {
  id: number;
  author: string;
  content: string;
  time?: string;
  likes: number;
}

interface PollsTabProps {
  polls: Poll[];
  pollQuestion: string;
  pollOptions: string[];
  onChangeQuestion: (v: string) => void;
  onUpdateOption: (idx: number, v: string) => void;
  onAddOption: () => void;
  onPublish: () => void;
  onVote: (pollId: number, optionIndex: number) => void;
  onLike: (itemId: number, type: string) => void;
  newComment: Record<string, string>;
  setNewComment: (v: Record<string, string>) => void;
  onComment: (itemId: number, type: string) => void;
  onReply: (itemId: number, commentId: number, type: string) => void;
}

export function PollsTab({
  polls,
  pollQuestion,
  pollOptions,
  onChangeQuestion,
  onUpdateOption,
  onAddOption,
  onPublish,
  onVote,
  onLike,
  newComment,
  setNewComment,
  onComment,
  onReply,
}: PollsTabProps) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create a Poll</h3>
          <Input
            placeholder="Poll question"
            value={pollQuestion}
            onChange={(e) => onChangeQuestion(e.target.value)}
            className="mb-4"
          />
          {pollOptions.map((option, index) => (
            <Input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => onUpdateOption(index, e.target.value)}
              className="mb-2"
            />
          ))}
          <Button variant="outline" size="sm" onClick={onAddOption} className="mb-4">
            Add Option
          </Button>
          <Button size="sm" onClick={onPublish}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Poll
          </Button>
        </CardContent>
      </Card>
      {polls.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{item.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{item.author}</div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{item.category}</span>
            </div>
            <h4 className="text-lg font-semibold">{item.question}</h4>
            <div className="space-y-2 mt-2">
              {item.options.map((option, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <div className="flex items-center space-x-2">
                    <span>{option.votes} votes</span>
                    <Button size="sm" onClick={() => onVote(item.id, idx)}>
                      Vote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
              <button
                className="flex items-center hover:text-red-500"
                onClick={() => onLike(item.id, item.type)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {item.likes}
              </button>
            </div>
            {/* Comments/replies for polls can be implemented here just like in QATab if needed */}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
