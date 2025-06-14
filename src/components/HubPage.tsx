import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Heart, Calendar, Video, Edit, Search, Award, Pin } from 'lucide-react';
import { QATab } from './hub/QATab';
import { BlogsTab } from './hub/BlogsTab';
import { ReelsTab } from './hub/ReelsTab';
import { PollsTab } from './hub/PollsTab';

export const HubPage = () => {
  const [activeTab, setActiveTab] = useState('qa'); // Default to Q&A tab
  const [newPost, setNewPost] = useState('');
  const [newReel, setNewReel] = useState(null);
  const [newReelCaption, setNewReelCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'post',
      author: 'Sarah M.',
      avatar: '👩‍🎓',
      time: '2 hours ago',
      content: 'Just arrived in Lyon! The campus is amazing and everyone is so helpful. Any tips for opening a bank account here?',
      likes: 12,
      comments: [],
      category: 'Arrival'
    },
    {
      id: 2,
      type: 'reel',
      author: 'John D.',
      avatar: '👨‍🎓',
      time: '3 hours ago',
      videoUrl: 'https://example.com/reel1.mp4',
      caption: 'Exploring Paris on a budget! 🗼',
      likes: 20,
      comments: [],
      category: 'Travel'
    },
    {
      id: 3,
      type: 'poll',
      author: 'Maria L.',
      avatar: '👩‍🔬',
      time: '1 day ago',
      question: 'Best city to study in France?',
      options: [{ text: 'Paris', votes: 10 }, { text: 'Lyon', votes: 5 }],
      likes: 8,
      comments: [],
      category: 'Poll'
    }
  ]);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      author: 'Alex K.',
      title: 'My First Month in France: A Journey',
      time: '5 hours ago',
      content: 'Sharing my experience with the CAF application...',
      likes: 28,
      comments: []
    }
  ]);
  const [newComment, setNewComment] = useState({});

  const upcomingEvents = [
    { id: 1, title: 'Virtual Networking Event', date: 'Dec 15, 2024', time: '7:00 PM CET', attendees: 45 },
    { id: 2, title: 'French Language Exchange', date: 'Dec 18, 2024', time: '6:30 PM CET', attendees: 23 },
    { id: 3, title: 'Live Q&A: Visa Tips', date: 'Dec 20, 2024', time: '5:00 PM CET', attendees: 30 }
  ];

  const handleLike = (itemId, type) => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type ? { ...item, likes: item.likes + 1 } : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    }
  };

  const handleComment = (itemId, type) => {
    const commentText = newComment[`${type}-${itemId}`] || '';
    if (!commentText) return;

    const newCommentObj = {
      id: Date.now(),
      author: 'You',
      content: commentText,
      likes: 0,
      replies: []
    };

    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type ? { ...item, comments: [...item.comments, newCommentObj] } : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, comments: [...blog.comments, newCommentObj] } : blog
      ));
    }

    setNewComment({ ...newComment, [`${type}-${itemId}`]: '' });
  };

  const handleReply = (itemId, commentId, type) => {
    const replyText = newComment[`reply-${type}-${itemId}-${commentId}`] || '';
    if (!replyText) return;

    const newReply = {
      id: Date.now(),
      author: 'You',
      content: replyText,
      likes: 0
    };

    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(post =>
        post.id === itemId && post.type === type ? {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
          )
        } : post
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? {
          ...blog,
          comments: blog.comments.map(comment =>
            comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
          )
        } : blog
      ));
    }

    setNewComment({ ...newComment, [`reply-${type}-${itemId}-${commentId}`]: '' });
  };

  const handlePublishPost = () => {
    if (!newPost) return;
    const newPostObj = {
      id: Date.now(),
      type: 'post',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      category: 'General'
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setActiveTab('qa');
  };

  const handleReelUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };

  const handlePublishReel = () => {
    if (!newReel || !newReelCaption) return;
    const newReelObj = {
      id: Date.now(),
      type: 'reel',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      videoUrl: newReel,
      caption: newReelCaption,
      likes: 0,
      comments: [],
      category: 'Travel'
    };
    setPosts([newReelObj, ...posts]);
    setNewReel(null);
    setNewReelCaption('');
    setActiveTab('reels');
  };

  const handlePublishBlog = () => {
    if (!blogTitle || !blogContent) return;
    const newBlog = {
      id: Date.now(),
      author: 'You',
      title: blogTitle,
      time: 'Just now',
      content: blogContent,
      likes: 0,
      comments: []
    };
    setBlogs([newBlog, ...blogs]);
    setBlogTitle('');
    setBlogContent('');
    setActiveTab('blogs');
  };

  const addPollOption = () => setPollOptions([...pollOptions, '']);
  const updatePollOption = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handlePublishPoll = () => {
    if (!pollQuestion || pollOptions.some(opt => !opt)) return;
    const newPoll = {
      id: Date.now(),
      type: 'poll',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      question: pollQuestion,
      options: pollOptions.map(opt => ({ text: opt, votes: 0 })),
      likes: 0,
      comments: [],
      category: 'Poll'
    };
    setPosts([newPoll, ...posts]);
    setPollQuestion('');
    setPollOptions(['', '']);
    setActiveTab('polls');
  };

  const handleVotePoll = (pollId, optionIndex) => {
    setPosts(posts.map(post =>
      post.id === pollId && post.type === 'poll' ? {
        ...post,
        options: post.options.map((opt, idx) =>
          idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        )
      } : post
    ));
  };

  const qaPosts = posts.filter(p => p.type === 'post');
  const reels = posts.filter(p => p.type === 'reel');
  const polls = posts.filter(p => p.type === 'poll');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Community Hub
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students, share experiences, and get support
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'qa' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'blogs' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('blogs')}
          >
            Blogs
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'reels' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('reels')}
          >
            Reels
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'polls' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('polls')}
          >
            Polls
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'qa' && (
            <QATab
              qaPosts={posts.filter(p => p.type === 'post')}
              newPost={newPost}
              onNewPostChange={setNewPost}
              onPublishPost={handlePublishPost}
              onLike={handleLike}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsTab
              blogTitle={blogTitle}
              blogContent={blogContent}
              onChangeTitle={setBlogTitle}
              onChangeContent={setBlogContent}
              onPublish={handlePublishBlog}
              blogs={blogs}
              onLike={handleLike}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
            />
          )}
          {activeTab === 'reels' && (
            <ReelsTab
              reels={posts.filter(p => p.type === 'reel')}
              newReel={newReel}
              newReelCaption={newReelCaption}
              onReelUpload={handleReelUpload}
              onChangeCaption={setNewReelCaption}
              onPublish={handlePublishReel}
              onLike={handleLike}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
            />
          )}
          {activeTab === 'polls' && (
            <PollsTab
              polls={posts.filter(p => p.type === 'poll')}
              pollQuestion={pollQuestion}
              pollOptions={pollOptions}
              onChangeQuestion={setPollQuestion}
              onUpdateOption={updatePollOption}
              onAddOption={addPollOption}
              onPublish={handlePublishPoll}
              onVote={handleVotePoll}
              onLike={handleLike}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
            />
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-900">{event.title}</div>
                    <div className="text-sm text-blue-700">{event.date} at {event.time}</div>
                    <div className="text-xs text-blue-600 mt-1">{event.attendees} attending</div>
                    <Button size="sm" className="mt-2 w-full">Join Event</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">🏆</span>
                  <span>Top Contributor</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">🌟</span>
                  <span>Helpful Mentor</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">🎉</span>
                  <span>Community Star</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts This Week</span>
                  <span className="font-semibold">{posts.filter(p => p.time === 'Just now').length + 89}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered</span>
                  <span className="font-semibold">{posts.reduce((acc, post) => acc + post.comments.length, 0) + 156}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Help</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📋 Post a Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🤝 Find Study Partner
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🏠 Housing Exchange
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Share Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
