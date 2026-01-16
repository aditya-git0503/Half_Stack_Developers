'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetailModal from './components/ProjectDetailModal';
import FilterSortBar from './components/FilterSortBar';
import SearchPeople from './components/SearchPeople';
import Notifications from './components/Notifications';

// Project type definition
interface Project {
  id: string;
  title: string;
  elevatorPitch: string;
  missingRoles: string[];
  compatibilityScore: number;
  owner: {
    name: string;
    avatar: string | null;
    department: string;
    year?: string;
  };
  tags: string[];
  matchReason: string;
  teamSize?: number;
  maxTeamSize?: number;
  timeline?: string;
  stage?: string;
  createdAt?: string;
}

// Mock data - replace with real API calls later
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoTrack',
    elevatorPitch: 'A mobile app that gamifies sustainable living by tracking your carbon footprint and rewarding eco-friendly choices with real rewards from partner brands.',
    missingRoles: ['Frontend Dev', 'UI Designer'],
    compatibilityScore: 92,
    owner: {
      name: 'Pragya Sharma',
      avatar: null,
      department: 'Computer Science',
      year: '3rd Year',
    },
    tags: ['React Native', 'Sustainability', 'Mobile', 'Firebase'],
    matchReason: "You both have experience in React, and Pragya's focus on gamification aligns with your game dev background. Your Python skills complement her frontend expertise.",
    teamSize: 2,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Ideation',
    createdAt: '2 days ago',
  },
  {
    id: '2',
    title: 'StudySync',
    elevatorPitch: 'AI-powered study group matcher that finds students with complementary knowledge gaps and schedules optimal study sessions.',
    missingRoles: ['ML Engineer', 'Backend Dev'],
    compatibilityScore: 87,
    owner: {
      name: 'Rahul Verma',
      avatar: null,
      department: 'Data Science',
      year: '4th Year',
    },
    tags: ['Python', 'AI/ML', 'EdTech', 'TensorFlow'],
    matchReason: "Your machine learning coursework and Python proficiency make you an ideal fit. Rahul needs someone who can build recommendation algorithms.",
    teamSize: 1,
    maxTeamSize: 4,
    timeline: '2 months',
    stage: 'MVP',
    createdAt: '1 week ago',
  },
  {
    id: '3',
    title: 'CampusEats',
    elevatorPitch: 'Hyperlocal food delivery platform connecting hostel students with home-cooked meals from nearby PG accommodations.',
    missingRoles: ['Full Stack Dev'],
    compatibilityScore: 78,
    owner: {
      name: 'Ananya Patel',
      avatar: null,
      department: 'Business Administration',
      year: '2nd Year',
    },
    tags: ['Node.js', 'React', 'Marketplace', 'Stripe'],
    matchReason: "Ananya has the business model figured out but needs technical co-founders. Your full-stack experience could help ship the MVP fast.",
    teamSize: 3,
    maxTeamSize: 6,
    timeline: '4 months',
    stage: 'Prototype',
    createdAt: '3 days ago',
  },
  {
    id: '4',
    title: 'LabShare',
    elevatorPitch: 'Equipment sharing platform for university labs to reduce redundant purchases and maximize resource utilization across departments.',
    missingRoles: ['Backend Dev', 'DevOps'],
    compatibilityScore: 85,
    owner: {
      name: 'Vikram Singh',
      avatar: null,
      department: 'Mechanical Engineering',
      year: '4th Year',
    },
    tags: ['Django', 'IoT', 'B2B', 'PostgreSQL'],
    matchReason: "Your interest in IoT projects and Django experience matches perfectly. Vikram has domain expertise and lab connections.",
    teamSize: 2,
    maxTeamSize: 4,
    timeline: '6 months',
    stage: 'Ideation',
    createdAt: '5 days ago',
  },
  {
    id: '5',
    title: 'MindMate',
    elevatorPitch: 'Anonymous peer support platform for student mental health with AI-moderated conversations and crisis detection.',
    missingRoles: ['Frontend Dev', 'AI Engineer'],
    compatibilityScore: 81,
    owner: {
      name: 'Sneha Reddy',
      avatar: null,
      department: 'Psychology',
      year: '3rd Year',
    },
    tags: ['Next.js', 'NLP', 'HealthTech', 'WebSocket'],
    matchReason: "Your Next.js skills and interest in meaningful projects align well. Sneha brings clinical knowledge and user research.",
    teamSize: 1,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Research',
    createdAt: '1 day ago',
  },
  {
    id: '6',
    title: 'CodeBuddy',
    elevatorPitch: 'Pair programming platform that matches developers by skill level and learning goals for real-time collaborative coding sessions.',
    missingRoles: ['Backend Dev', 'Frontend Dev'],
    compatibilityScore: 89,
    owner: {
      name: 'Arjun Mehta',
      avatar: null,
      department: 'Computer Science',
      year: '3rd Year',
    },
    tags: ['WebRTC', 'React', 'Node.js', 'Monaco Editor'],
    matchReason: "Your experience with real-time applications and React makes you a perfect fit. Arjun needs help building the collaborative editor.",
    teamSize: 1,
    maxTeamSize: 4,
    timeline: '4 months',
    stage: 'MVP',
    createdAt: '4 days ago',
  },
  {
    id: '7',
    title: 'EventHub',
    elevatorPitch: 'Unified event discovery and ticketing platform for college fests, workshops, and hackathons across multiple universities.',
    missingRoles: ['Mobile Dev', 'UI Designer'],
    compatibilityScore: 76,
    owner: {
      name: 'Kavya Nair',
      avatar: null,
      department: 'Design',
      year: '2nd Year',
    },
    tags: ['Flutter', 'Firebase', 'Razorpay', 'Events'],
    matchReason: "Your mobile development skills and interest in event tech align well. Kavya has connections with multiple college fest committees.",
    teamSize: 2,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Prototype',
    createdAt: '1 week ago',
  },
  {
    id: '8',
    title: 'ResearchMatch',
    elevatorPitch: 'Platform connecting undergraduate students with professors for research opportunities based on interests and skills.',
    missingRoles: ['Full Stack Dev', 'ML Engineer'],
    compatibilityScore: 83,
    owner: {
      name: 'Dr. Priya Iyer',
      avatar: null,
      department: 'Faculty - CSE',
      year: 'Professor',
    },
    tags: ['Python', 'NLP', 'Academic', 'Matching'],
    matchReason: "Your NLP coursework and interest in academic tools is exactly what Dr. Iyer needs for the matching algorithm.",
    teamSize: 1,
    maxTeamSize: 3,
    timeline: '5 months',
    stage: 'Ideation',
    createdAt: '2 days ago',
  },
];

// Mock user data
const mockUser = {
  name: 'Chirag',
  email: 'chirag@iiits.in',
  avatar: null,
};

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [currentSort, setCurrentSort] = useState('match');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCreateProject = () => {
    // TODO: Open create project modal
    console.log('Create project clicked');
  };

  // Sort projects
  const sortedProjects = [...mockProjects].sort((a, b) => {
    if (currentSort === 'match') return b.compatibilityScore - a.compatibilityScore;
    if (currentSort === 'recent') return 0; // Would sort by date in real app
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-['Inter',sans-serif]">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B19EEF]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-[#8B7BD4]/10 rounded-full blur-[80px] animate-pulse delay-1000" />
        <div className="absolute -bottom-20 right-1/3 w-40 h-40 bg-[#B19EEF]/5 rounded-full blur-[60px] animate-pulse delay-500" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(177,158,239,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(177,158,239,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      {/* Sidebar */}
      <Sidebar 
        user={mockUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateProject={handleCreateProject}
      />

      {/* Main Content */}
      <main className="relative z-10 md:ml-64 min-h-screen transition-all duration-300">
        <div className="px-4 py-8 md:px-8 pt-16 md:pt-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {activeTab === 'explore' && (
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Explore Projects
                </span>
              )}
              {activeTab === 'search' && 'Search People'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'profile' && 'My Profile'}
            </h1>
            <p className="mt-2 text-gray-500">
              {activeTab === 'explore' && 'Discover projects looking for someone like you'}
              {activeTab === 'search' && 'Find collaborators across departments'}
              {activeTab === 'notifications' && 'Stay updated on your matches'}
              {activeTab === 'profile' && 'Manage your skills and preferences'}
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === 'explore' && (
            <>
              <FilterSortBar
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
              <ProjectGrid 
                projects={sortedProjects} 
                onProjectClick={handleProjectClick} 
              />
            </>
          )}
          
          {activeTab === 'search' && (
            <SearchPeople />
          )}
          
          {activeTab === 'notifications' && (
            <Notifications />
          )}
          
          {activeTab === 'profile' && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6 text-8xl">👤</div>
              <h2 className="text-2xl font-semibold text-white">Profile Setup</h2>
              <p className="mt-2 text-gray-500">Coming in the next update</p>
            </div>
          )}
        </div>
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
