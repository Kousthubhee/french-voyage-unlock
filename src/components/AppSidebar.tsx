
import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Building2, 
  Languages, 
  Phone,
  FileText,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  // Optionally, user profile info, fallback to mock if not provided (for demo)
  userName?: string | null;
  userAvatarUrl?: string | null;
}

export const AppSidebar = ({
  currentPage,
  setCurrentPage,
  userName,
  userAvatarUrl,
}: AppSidebarProps) => {
  // Fallback demo user (in real usage, pass via props)
  const name = userName ?? "Explorer";
  const avatarUrl = userAvatarUrl ?? "";

  const menuItems = [
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', color: 'text-blue-600', tooltip: 'Your onboarding checklist' },
    { id: 'documents', icon: FileText, label: 'Documents & Renewals', color: 'text-teal-600', tooltip: 'Manage paperwork and renewal timelines' },
    { id: 'qa', icon: MessageSquare, label: 'Ask Me Anything', color: 'text-green-600', tooltip: 'Chat with our AI or browse FAQs' },
    { id: 'hub', icon: Users, label: 'Community Hub', color: 'text-purple-600', tooltip: 'Connect with fellow students' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', color: 'text-orange-600', tooltip: 'Latest campus and city news' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', color: 'text-red-600', tooltip: 'See our affiliations' },
    { id: 'language', icon: Languages, label: 'Learn French', color: 'text-indigo-600', tooltip: 'Practice French language skills' },
    { id: 'translate', icon: Languages, label: 'Translate', color: 'text-cyan-600', tooltip: 'Translate documents or conversations' },
    { id: 'contact', icon: Phone, label: 'Contact Us', color: 'text-pink-600', tooltip: 'Reach support or ask for help' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 pb-2">
          <div 
            className="text-xl font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentPage('checklist')}
          >
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Your guide to French education
          </div>
        </div>
        <div className="flex items-center mb-2 px-4 mt-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-blue-400 shadow-sm"
            />
          ) : (
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-lg border">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
          )}
          <div className="ml-3">
            <div className="font-medium text-gray-900 leading-5 text-sm">Hello, {name}!</div>
            <div className="text-xs text-gray-500">Welcome!</div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full group transition-all`}
                      tooltip={item.tooltip}
                    >
                      <span className={`
                        rounded-full p-1 flex items-center justify-center mr-2 transition-all
                        ${isActive 
                          ? 'bg-blue-100 text-blue-600 scale-110 shadow-sm animate-sidebar-active'
                          : item.color + ' bg-transparent'}
                      `}>
                        <Icon className={`h-5 w-5`} />
                      </span>
                      <span className={`transition-all ${isActive ? 'text-blue-900 font-bold' : ''}`}>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-blue-900 mb-1">Need Help?</div>
          <div className="text-xs text-blue-700 mb-2">
            Reach out to our support team for assistance
          </div>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentPage('contact')}
          >
            Contact Support
          </Button>
        </div>
      </SidebarFooter>

      {/* Custom animation for active sidebar item */}
      <style>
        {`
          @keyframes sidebarActive {
            0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.2);}
            100% { box-shadow: 0 4px 24px 2px rgba(59,130,246,0.11);}
          }
          .animate-sidebar-active {
            animation: sidebarActive 0.4s;
          }
        `}
      </style>
    </Sidebar>
  );
};
