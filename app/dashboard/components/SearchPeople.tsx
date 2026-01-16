'use client';

import { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiCode, FiStar, FiMessageCircle } from 'react-icons/fi';

interface Person {
  id: string;
  name: string;
  avatar: string | null;
  department: string;
  year: string;
  skills: string[];
  interests: string[];
  lookingFor: string;
  matchScore: number;
}

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Aditya Kumar',
    avatar: null,
    department: 'Computer Science',
    year: '3rd Year',
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    interests: ['Web Dev', 'AI/ML', 'Open Source'],
    lookingFor: 'Looking to join an AI startup idea',
    matchScore: 94,
  },
  {
    id: '2',
    name: 'Priya Menon',
    avatar: null,
    department: 'Design',
    year: '2nd Year',
    skills: ['Figma', 'UI/UX', 'Illustration', 'Framer'],
    interests: ['Product Design', 'Branding', 'Motion'],
    lookingFor: 'Seeking technical co-founder for design tool',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    avatar: null,
    department: 'Data Science',
    year: '4th Year',
    skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],
    interests: ['ML', 'Analytics', 'FinTech'],
    lookingFor: 'Building a stock prediction platform',
    matchScore: 82,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    avatar: null,
    department: 'Electronics',
    year: '3rd Year',
    skills: ['IoT', 'Arduino', 'Embedded C', 'PCB Design'],
    interests: ['Hardware', 'Robotics', 'Smart Home'],
    lookingFor: 'Need app developers for IoT project',
    matchScore: 76,
  },
  {
    id: '5',
    name: 'Karthik Nair',
    avatar: null,
    department: 'Business',
    year: '2nd Year',
    skills: ['Marketing', 'Sales', 'Excel', 'Pitching'],
    interests: ['Startups', 'Growth', 'Strategy'],
    lookingFor: 'Technical co-founder for ed-tech idea',
    matchScore: 85,
  },
  {
    id: '6',
    name: 'Ananya Singh',
    avatar: null,
    department: 'Computer Science',
    year: '4th Year',
    skills: ['Flutter', 'Dart', 'Firebase', 'Swift'],
    interests: ['Mobile Dev', 'Health Tech', 'Social Good'],
    lookingFor: 'Building mental health app for students',
    matchScore: 91,
  },
];

const skillFilters = ['Frontend', 'Backend', 'Mobile', 'AI/ML', 'Design', 'Business', 'IoT'];
const departmentFilters = ['Computer Science', 'Design', 'Business', 'Electronics', 'Data Science'];

export default function SearchPeople() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillFilters, setActiveSkillFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredPeople = mockPeople.filter((person) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        person.name.toLowerCase().includes(query) ||
        person.skills.some((s) => s.toLowerCase().includes(query)) ||
        person.department.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, skill, or department..."
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#12121a] border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#B19EEF]/40 transition-all duration-300"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`h-12 px-4 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
            showFilters
              ? 'bg-[#B19EEF]/10 border-[#B19EEF]/30 text-[#B19EEF]'
              : 'bg-[#12121a] border-white/5 text-gray-400 hover:border-[#B19EEF]/30'
          }`}
        >
          <FiFilter size={16} />
          Filters
        </button>
      </div>

      {/* Skill Filters */}
      {showFilters && (
        <div className="rounded-xl bg-[#12121a] border border-white/5 p-4">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillFilters.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  if (activeSkillFilters.includes(skill)) {
                    setActiveSkillFilters(activeSkillFilters.filter((s) => s !== skill));
                  } else {
                    setActiveSkillFilters([...activeSkillFilters, skill]);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSkillFilters.includes(skill)
                    ? 'bg-[#B19EEF] text-[#0a0a0f]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className="group rounded-2xl bg-[#12121a] border border-white/5 p-5 hover:border-[#B19EEF]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#B19EEF] to-[#8B7BD4] flex items-center justify-center text-lg font-semibold text-[#0a0a0f]">
                {person.avatar ? (
                  <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(person.name)
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white truncate">{person.name}</h3>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#B19EEF]/10 text-[#B19EEF] text-xs font-medium">
                    <FiStar size={12} />
                    {person.matchScore}%
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <FiMapPin size={12} />
                  {person.department} · {person.year}
                </div>
              </div>
            </div>

            {/* Looking For */}
            <p className="mt-4 text-sm text-gray-400 line-clamp-2">{person.lookingFor}</p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {person.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400"
                >
                  {skill}
                </span>
              ))}
              {person.skills.length > 4 && (
                <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-500">
                  +{person.skills.length - 4}
                </span>
              )}
            </div>

            {/* Action Button */}
            <button className="mt-4 w-full py-2.5 rounded-xl bg-[#B19EEF]/10 border border-[#B19EEF]/20 text-[#B19EEF] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#B19EEF]/20 transition-all duration-200">
              <FiMessageCircle size={16} />
              Connect
            </button>
          </div>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white">No matches found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
