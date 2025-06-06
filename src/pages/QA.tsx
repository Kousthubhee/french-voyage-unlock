
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MessageCircle, ThumbsUp, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  likes: number;
  isPopular: boolean;
  lastUpdated: string;
}

const QA = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Visa', 'Housing', 'Banking', 'Education', 'Health', 'Transportation'];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I apply for a student visa to France?',
      answer: 'To apply for a student visa to France, you need to: 1) Get accepted to a French institution, 2) Apply through Campus France, 3) Schedule a VFS appointment, 4) Prepare required documents including passport, acceptance letter, proof of finances, and health insurance.',
      category: 'Visa',
      likes: 45,
      isPopular: true,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      question: 'What documents do I need for Campus France?',
      answer: 'For Campus France, you typically need: Academic transcripts, diplomas, language proficiency certificates, passport copy, motivation letter, CV, and proof of financial resources. Some programs may require additional documents.',
      category: 'Education',
      likes: 38,
      isPopular: true,
      lastUpdated: '2024-01-12'
    },
    {
      id: '3',
      question: 'How much money should I budget for living in France?',
      answer: 'Monthly living costs in France vary by city: Paris €1,200-1,800, Lyon €800-1,200, other cities €600-1,000. This includes accommodation, food, transportation, and personal expenses.',
      category: 'Housing',
      likes: 52,
      isPopular: true,
      lastUpdated: '2024-01-10'
    },
    {
      id: '4',
      question: 'Can I open a bank account before arriving in France?',
      answer: 'Some banks allow international students to open accounts online before arrival, but most require physical presence. Popular student-friendly banks include BNP Paribas, Crédit Agricole, and Société Générale.',
      category: 'Banking',
      likes: 29,
      isPopular: false,
      lastUpdated: '2024-01-08'
    },
    {
      id: '5',
      question: 'Do I need health insurance in France?',
      answer: 'Yes, health insurance is mandatory. EU students can use EHIC, non-EU students need private insurance initially, then can apply for French social security (Sécurité Sociale) after arrival.',
      category: 'Health',
      likes: 34,
      isPopular: false,
      lastUpdated: '2024-01-06'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqs.filter(faq => faq.isPopular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
            <h1 className="ml-4 text-xl font-bold text-gray-900">Q&A Hub</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Got Questions? We've Got Answers! 🤔
          </h2>
          <p className="text-lg text-gray-600">
            Find instant answers to common questions about studying in France
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <MessageCircle size={20} className="mr-2" />
              Ask AI Assistant
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Popular Questions */}
        {searchQuery === '' && selectedCategory === 'All' && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              🔥 Popular Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularFAQs.map((faq) => (
                <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <ThumbsUp size={12} />
                        <span>{faq.likes}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">{faq.question}</h4>
                    <p className="text-xs text-gray-600 line-clamp-3">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All FAQs */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {searchQuery ? 'Search Results' : 'All Questions'}
          </h3>
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{faq.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp size={16} />
                        <span>{faq.likes}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">{faq.answer}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Updated {faq.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>Admin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Chatbot Section */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still Need Help? 🤖</h3>
          <p className="mb-6">Our AI assistant is here 24/7 to answer your questions instantly!</p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <MessageCircle size={20} className="mr-2" />
            Chat with AI Assistant
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QA;
