import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'kousthubheekrishna@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'Available on request',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Rouen, France',
      description: 'Our team is based in France'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '24-48 hours',
      description: 'We typically respond within'
    }
  ];

  const creators = [
    {
      name: 'Kousthubhee Krishna',
      role: 'Co-Founder & Developer',
      description:
        '“I know how overwhelming it can be to move to France as a student. Every question is welcome—let’s make your journey smoother together!”',
      avatar: '👩‍🎓'
    },
    {
      name: 'Srivatsava',
      role: 'Co-Founder & Content Creator',
      description:
        '“No doubt is too small. If you need help, just ask—our team has your back!”',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="sr-only">Contact Us</h1>
        {/* Use the PageTitle component for uniformity */}
        <div className="flex items-center justify-center mb-2">
          <Phone className="h-8 w-8 mr-3 text-pink-600" />
          <span>
            <span className="font-calibri font-bold text-3xl text-gray-700">
              Contact Us
            </span>
          </span>
        </div>
        <p className="text-lg text-gray-600 mb-1">
          Welcome! Whether you're planning your move, just arrived in France, or facing a tricky moment, we’re here for you.<br />
          No question is too small—reach out and our student team will get back to you soon!
        </p>
        <div className="mt-2 text-sm text-blue-700 italic">
          “We’ve lived the French student experience. Let’s make it easier, together.”
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Reach Out to Us Directly</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message (ask us anything!)"
                    className="h-32 resize-none"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  We'll reply within 24-48 hours. Your information stays private—used only to help you with your journey.
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-lg mr-4">
                        <Icon className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{info.title}</div>
                        <div className="text-gray-700">{info.value}</div>
                        <div className="text-sm text-gray-500">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Meet the Creators
              </h3>
              <p className="text-blue-700 mb-4">
                We're passionate about helping students like you build their future in France. No matter what you’re facing, just ask—we’re excited to help!
              </p>
              <div className="space-y-3">
                {creators.map((creator, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-3">{creator.avatar}</div>
                    <div>
                      <div className="font-medium text-blue-900">{creator.name}</div>
                      <div className="text-sm text-blue-700">{creator.role}</div>
                      <div className="text-xs text-blue-600 italic">{creator.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Here to Support Your Journey</h3>
              <p className="text-gray-600 mb-4">
                Our goal is to make studying in France as easy and enjoyable as possible for international students.
                Check our <span className="underline cursor-pointer text-blue-700"
                  onClick={() => window.scrollTo(0, 0)}>FAQ & resources</span> for instant help, or contact us any time!
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong>Student to student, we've got your back!</strong>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
