'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './components/Sidebar';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetailModal from './components/ProjectDetailModal';
import FilterSortBar from './components/FilterSortBar';
import SearchPeople from './components/SearchPeople';
import Notifications from './components/Notifications';
import MyProfile from './components/MyProfile';
import { FiLoader } from 'react-icons/fi';

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
  createdTimestamp?: number;
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
    matchReason: "You both have experience in React, and Pragya's focus on gamification aligns with your background.",
    teamSize: 2,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Ideation',
    createdAt: '2 days ago',
    createdTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your machine learning coursework and Python proficiency make you an ideal fit.",
    teamSize: 1,
    maxTeamSize: 4,
    timeline: '2 months',
    stage: 'MVP',
    createdAt: '1 week ago',
    createdTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
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
    matchReason: "Ananya has the business model figured out but needs technical co-founders.",
    teamSize: 3,
    maxTeamSize: 6,
    timeline: '4 months',
    stage: 'Prototype',
    createdAt: '3 days ago',
    createdTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your interest in IoT projects and Django experience matches perfectly.",
    teamSize: 2,
    maxTeamSize: 4,
    timeline: '6 months',
    stage: 'Ideation',
    createdAt: '5 days ago',
    createdTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your Next.js skills and interest in meaningful projects align well.",
    teamSize: 1,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Ideation',
    createdAt: '1 day ago',
    createdTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your experience with real-time applications and React makes you a perfect fit.",
    teamSize: 1,
    maxTeamSize: 4,
    timeline: '4 months',
    stage: 'MVP',
    createdAt: '4 days ago',
    createdTimestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your mobile development skills and interest in event tech align well.",
    teamSize: 2,
    maxTeamSize: 5,
    timeline: '3 months',
    stage: 'Prototype',
    createdAt: '1 week ago',
    createdTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
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
    matchReason: "Your NLP coursework and interest in academic tools is exactly what's needed.",
    teamSize: 1,
    maxTeamSize: 3,
    timeline: '5 months',
    stage: 'Ideation',
    createdAt: '2 days ago',
    createdTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
];

// Role filter mapping
const roleFilterMapping: Record<string, string[]> = {
  frontend: ['Frontend Dev', 'UI Designer'],
  backend: ['Backend Dev', 'DevOps'],
  ml: ['ML Engineer', 'AI Engineer'],
  mobile: ['Mobile Dev'],
  design: ['UI Designer'],
  fullstack: ['Full Stack Dev'],
};

// Stage filter mapping
const stageFilterMapping: Record<string, string> = {
  ideation: 'Ideation',
  mvp: 'MVP',
  prototype: 'Prototype',
  launched: 'Launched',
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [currentSort, setCurrentSort] = useState('match');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Filter and sort projects - MUST be before any conditional returns
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...mockProjects];

    // Apply filters
    if (activeFilters.length > 0) {
      const roleFilters = activeFilters.filter(f => roleFilterMapping[f]);
      const stageFilters = activeFilters.filter(f => stageFilterMapping[f]);

      result = result.filter((project) => {
        // Check role filters
        const matchesRole = roleFilters.length === 0 || roleFilters.some((filter) => {
          const roles = roleFilterMapping[filter];
          return project.missingRoles.some((role) => 
            roles.some((r) => role.toLowerCase().includes(r.toLowerCase()))
          );
        });

        // Check stage filters
        const matchesStage = stageFilters.length === 0 || stageFilters.some((filter) => {
          return project.stage?.toLowerCase() === stageFilterMapping[filter].toLowerCase();
        });

        return matchesRole && matchesStage;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (currentSort) {
        case 'match':
          return b.compatibilityScore - a.compatibilityScore;
        case 'recent':
          return (b.createdTimestamp || 0) - (a.createdTimestamp || 0);
        case 'trending':
          // Trending = combination of match score and recency
          const aScore = a.compatibilityScore * 0.6 + (a.createdTimestamp || 0) / Date.now() * 40;
          const bScore = b.compatibilityScore * 0.6 + (b.createdTimestamp || 0) / Date.now() * 40;
          return bScore - aScore;
        default:
          return 0;
      }
    });

    return result;
  }, [activeFilters, currentSort]);

  // Create user data from Firebase auth (without profile photo - using initials)
  const userData = user ? {
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatar: null, // Don't use photoURL, show initials instead
  } : null;

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

  // Show loading while auth is checking
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <FiLoader className="w-8 h-8 text-[#B19EEF] animate-spin" />
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user || !userData) {
    return null;
  }

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
        user={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateProject={handleCreateProject}
        isCollapsed={isSidebarCollapsed}
        onCollapseChange={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={`relative z-10 min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <div
          className={`px-4 py-8 md:px-8 pt-16 md:pt-8 w-full ${
            isSidebarCollapsed ? 'max-w-none' : 'max-w-7xl'
          }`}
        >
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
              {activeTab === 'explore' && `${filteredAndSortedProjects.length} projects looking for someone like you`}
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
                projects={filteredAndSortedProjects} 
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
            <MyProfile user={userData} />
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
