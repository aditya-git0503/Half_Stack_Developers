<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { 
  FiEdit2, 
  FiPlus, 
  FiX, 
  FiGithub, 
  FiLinkedin, 
  FiGlobe,
  FiMail,
  FiCalendar,
  FiBookOpen,
  FiAward,
  FiCode,
  FiSave
} from 'react-icons/fi';
=======
// src/components/dashboard/MyProfile.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  FiEdit2, FiPlus, FiX, FiGithub, FiLinkedin, FiGlobe,
  FiMail, FiCalendar, FiBookOpen, FiAward, FiCode, FiSave
} from 'react-icons/fi';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase-client';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
>>>>>>> Pranjal

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
  department?: string;
<<<<<<< HEAD
  year?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  lookingFor?: string[];
=======
  year?: number;
  bio?: string;
  skills: string[];
  workStyle: 'early-bird' | 'night-owl';
  intensity: 'casual' | 'hardcore';
>>>>>>> Pranjal
  github?: string;
  linkedin?: string;
  portfolio?: string;
  projectsJoined?: number;
  connectionsCount?: number;
}

interface MyProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
}

const skillSuggestions = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
  'TailwindCSS', 'Firebase', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'Figma', 'UI/UX Design', 'React Native', 'Flutter', 'Swift', 'Kotlin',
  'Java', 'C++', 'Rust', 'Go', 'GraphQL', 'REST APIs'
];

<<<<<<< HEAD
const interestSuggestions = [
  'EdTech', 'FinTech', 'HealthTech', 'AI/ML', 'Sustainability',
  'Social Impact', 'Gaming', 'E-commerce', 'SaaS', 'Mobile Apps',
  'Web3', 'Blockchain', 'IoT', 'AR/VR', 'Robotics', 'Open Source'
];

const lookingForOptions = [
  'Co-founder', 'Technical Lead', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'ML Engineer', 'UI/UX Designer', 'Product Manager',
  'DevOps Engineer', 'Mobile Developer', 'Data Scientist', 'Mentor'
];

export default function MyProfile({ user }: MyProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    department: 'Computer Science',
    year: '3rd Year',
    bio: '',
    skills: ['React', 'TypeScript', 'Python'],
    interests: ['AI/ML', 'EdTech'],
    lookingFor: ['Co-founder', 'ML Engineer'],
    github: '',
    linkedin: '',
    portfolio: '',
    projectsJoined: 0,
    connectionsCount: 0,
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const addSkill = (skill: string) => {
    if (skill && !profile.skills?.includes(skill)) {
      setProfile({ ...profile, skills: [...(profile.skills || []), skill] });
=======
export default function MyProfile({ user }: MyProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch or create profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const auth = getAuth();
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('User not logged in');

        const userDoc = await getDoc(doc(db, 'users', uid));
        let data: UserProfile;

        if (!userDoc.exists()) {
          // Create minimal profile matching your schema
          data = {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            department: '',
            year: null,
            bio: '',
            skills: [],
            workStyle: 'night-owl',
            intensity: 'casual',
            github: '',
            linkedin: '',
            portfolio: '',
            projectsJoined: 0,
            connectionsCount: 0,
          };
          await setDoc(doc(db, 'users', uid), {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          const docData = userDoc.data();
          data = {
            name: docData.name || user.name,
            email: docData.email || user.email,
            avatar: docData.avatar || user.avatar,
            department: docData.department || '',
            year: docData.year || null,
            bio: docData.bio || '',
            skills: docData.skills || [],
            workStyle: docData.workStyle || 'night-owl',
            intensity: docData.intensity || 'casual',
            github: docData.github || '',
            linkedin: docData.linkedin || '',
            portfolio: docData.portfolio || '',
            projectsJoined: docData.projectsJoined || 0,
            connectionsCount: docData.connectionsCount || 0,
          };
        }

        setProfile(data);
        setError(null);
      } catch (err: any) {
        console.error('Profile error:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Not authenticated');

      await updateDoc(doc(db, 'users', uid), {
        name: profile.name,
        department: profile.department,
        year: profile.year,
        bio: profile.bio,
        skills: profile.skills,
        workStyle: profile.workStyle,
        intensity: profile.intensity,
        github: profile.github,
        linkedin: profile.linkedin,
        portfolio: profile.portfolio,
        updatedAt: new Date(),
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // Skill management
  const [newSkill, setNewSkill] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    if (skill && profile && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
>>>>>>> Pranjal
    }
    setNewSkill('');
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skill: string) => {
<<<<<<< HEAD
    setProfile({ ...profile, skills: profile.skills?.filter(s => s !== skill) });
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests?.includes(interest)) {
      setProfile({ ...profile, interests: [...(profile.interests || []), interest] });
    }
    setNewInterest('');
    setShowInterestSuggestions(false);
  };

  const removeInterest = (interest: string) => {
    setProfile({ ...profile, interests: profile.interests?.filter(i => i !== interest) });
  };

  const toggleLookingFor = (option: string) => {
    if (profile.lookingFor?.includes(option)) {
      setProfile({ ...profile, lookingFor: profile.lookingFor.filter(l => l !== option) });
    } else {
      setProfile({ ...profile, lookingFor: [...(profile.lookingFor || []), option] });
    }
  };

  const handleSave = () => {
    // TODO: Save to Firebase
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

=======
    if (profile) {
      setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    }
  };

  // Vibe toggle handlers
  const toggleWorkStyle = () => {
    if (profile) {
      setProfile({
        ...profile,
        workStyle: profile.workStyle === 'early-bird' ? 'night-owl' : 'early-bird',
      });
    }
  };

  const toggleIntensity = () => {
    if (profile) {
      setProfile({
        ...profile,
        intensity: profile.intensity === 'casual' ? 'hardcore' : 'casual',
      });
    }
  };

  // Loading & Error
  if (loading) {
    return <div className="text-white p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-400 p-6">{error}</div>;
  }

  if (!profile) return null;

>>>>>>> Pranjal
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 md:p-8">
<<<<<<< HEAD
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#B19EEF]/10 blur-3xl" />
        
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B19EEF] to-[#8B7BD4] text-3xl font-bold text-white shadow-lg shadow-[#B19EEF]/20 md:h-32 md:w-32 md:text-4xl">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                getInitials(profile.name)
=======
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#B19EEF]/10 blur-3xl" />
        
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B19EEF] to-[#8B7BD4] text-3xl font-bold text-white shadow-lg shadow-[#B19EEF]/20 md:h-32 md:w-32 md:text-4xl">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full rounded-2xl object-cover" />
              ) : (
                profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
>>>>>>> Pranjal
              )}
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#B19EEF] text-white shadow-lg transition-transform hover:scale-110">
                <FiEdit2 size={14} />
              </button>
            )}
          </div>

<<<<<<< HEAD
          {/* Info */}
=======
>>>>>>> Pranjal
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="mb-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-2xl font-bold text-white outline-none focus:border-[#B19EEF]/50 md:text-3xl"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white md:text-3xl">{profile.name}</h2>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1.5">
<<<<<<< HEAD
                    <FiMail size={14} />
                    {profile.email}
=======
                    <FiMail size={14} /> {profile.email}
>>>>>>> Pranjal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiBookOpen size={14} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        className="w-40 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-sm outline-none focus:border-[#B19EEF]/50"
                      />
                    ) : (
                      profile.department
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={14} />
                    {isEditing ? (
<<<<<<< HEAD
                      <input
                        type="text"
                        value={profile.year}
                        onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                        className="w-24 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-sm outline-none focus:border-[#B19EEF]/50"
                      />
                    ) : (
                      profile.year
=======
                      <select
                        value={profile.year || ''}
                        onChange={(e) => setProfile({ ...profile, year: e.target.value ? Number(e.target.value) : null })}
                        className="w-24 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-sm outline-none focus:border-[#B19EEF]/50"
                      >
                        <option value="">Select Year</option>
                        {[1, 2, 3, 4, 5].map(y => (
                          <option key={y} value={y}>Year {y}</option>
                        ))}
                      </select>
                    ) : (
                      profile.year ? `Year ${profile.year}` : ''
>>>>>>> Pranjal
                    )}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
<<<<<<< HEAD
=======
                disabled={saving}
>>>>>>> Pranjal
                className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all ${
                  isEditing
                    ? 'bg-[#B19EEF] text-white hover:bg-[#a08be0]'
                    : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
<<<<<<< HEAD
                }`}
              >
                {isEditing ? (
                  <>
                    <FiSave size={16} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <FiEdit2 size={16} />
                    Edit Profile
=======
                } ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isEditing ? (
                  <>
                    <FiSave size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                  </>
                ) : (
                  <>
                    <FiEdit2 size={16} /> Edit Profile
>>>>>>> Pranjal
                  </>
                )}
              </button>
            </div>

<<<<<<< HEAD
            {/* Bio */}
=======
>>>>>>> Pranjal
            <div className="mt-4">
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
<<<<<<< HEAD
                  placeholder="Tell others about yourself, your experience, and what you're passionate about..."
=======
                  placeholder="Tell others about yourself..."
>>>>>>> Pranjal
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-300 outline-none placeholder:text-gray-600 focus:border-[#B19EEF]/50"
                />
              ) : (
<<<<<<< HEAD
                <p className="text-gray-400">
                  {profile.bio || 'No bio yet. Click edit to add one!'}
                </p>
              )}
            </div>

            {/* Stats */}
=======
                <p className="text-gray-400">{profile.bio || 'No bio yet.'}</p>
              )}
            </div>

>>>>>>> Pranjal
            <div className="mt-4 flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profile.projectsJoined}</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profile.connectionsCount}</div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
              <div className="text-center">
<<<<<<< HEAD
                <div className="text-2xl font-bold text-white">{profile.skills?.length || 0}</div>
=======
                <div className="text-2xl font-bold text-white">{profile.skills.length}</div>
>>>>>>> Pranjal
                <div className="text-sm text-gray-500">Skills</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          {isEditing ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <FiGithub size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="GitHub username"
                  className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <FiLinkedin size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  placeholder="LinkedIn username"
                  className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <FiGlobe size={18} className="text-gray-400" />
                <input
                  type="text"
                  value={profile.portfolio}
                  onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                  placeholder="Portfolio URL"
                  className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </>
          ) : (
            <>
              {profile.github && (
<<<<<<< HEAD
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white"
                >
                  <FiGithub size={16} />
                  {profile.github}
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white"
                >
                  <FiLinkedin size={16} />
                  {profile.linkedin}
                </a>
              )}
              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white"
                >
                  <FiGlobe size={16} />
                  Portfolio
                </a>
              )}
              {!profile.github && !profile.linkedin && !profile.portfolio && (
                <span className="text-sm text-gray-600">No social links added yet</span>
              )}
=======
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white">
                  <FiGithub size={16} /> {profile.github}
                </a>
              )}
              {profile.linkedin && (
                <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white">
                  <FiLinkedin size={16} /> {profile.linkedin}
                </a>
              )}
              {profile.portfolio && (
                <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-[#B19EEF]/30 hover:text-white">
                  <FiGlobe size={16} /> Portfolio
                </a>
              )}
>>>>>>> Pranjal
            </>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiCode size={20} className="text-[#B19EEF]" />
          <h3 className="text-lg font-semibold text-white">Skills</h3>
        </div>
<<<<<<< HEAD
        
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((skill) => (
            <span
              key={skill}
              className="group flex items-center gap-1.5 rounded-full border border-[#B19EEF]/30 bg-[#B19EEF]/10 px-3 py-1.5 text-sm text-[#B19EEF]"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-[#B19EEF]/60 transition-colors hover:text-red-400"
                >
=======
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span key={skill} className="group flex items-center gap-1.5 rounded-full border border-[#B19EEF]/30 bg-[#B19EEF]/10 px-3 py-1.5 text-sm text-[#B19EEF]">
              {skill}
              {isEditing && (
                <button onClick={() => removeSkill(skill)} className="text-[#B19EEF]/60 transition-colors hover:text-red-400">
>>>>>>> Pranjal
                  <FiX size={14} />
                </button>
              )}
            </span>
          ))}
<<<<<<< HEAD
          
=======
>>>>>>> Pranjal
          {isEditing && (
            <div className="relative">
              <div className="flex items-center gap-1 rounded-full border border-dashed border-white/20 px-3 py-1.5">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onFocus={() => setShowSkillSuggestions(true)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill(newSkill)}
                  placeholder="Add skill..."
                  className="w-24 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
<<<<<<< HEAD
                <button
                  onClick={() => addSkill(newSkill)}
                  className="text-gray-400 hover:text-[#B19EEF]"
                >
                  <FiPlus size={14} />
                </button>
              </div>
              
=======
                <button onClick={() => addSkill(newSkill)} className="text-gray-400 hover:text-[#B19EEF]">
                  <FiPlus size={14} />
                </button>
              </div>
>>>>>>> Pranjal
              {showSkillSuggestions && (
                <div className="absolute left-0 top-full z-10 mt-2 max-h-48 w-64 overflow-y-auto rounded-xl border border-white/10 bg-[#1a1a24] p-2 shadow-xl">
                  <div className="mb-2 px-2 text-xs font-medium text-gray-500">Suggestions</div>
                  <div className="flex flex-wrap gap-1">
                    {skillSuggestions
<<<<<<< HEAD
                      .filter(s => !profile.skills?.includes(s))
=======
                      .filter(s => !profile.skills.includes(s))
>>>>>>> Pranjal
                      .filter(s => s.toLowerCase().includes(newSkill.toLowerCase()))
                      .slice(0, 12)
                      .map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSkill(skill)}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400 transition-colors hover:bg-[#B19EEF]/20 hover:text-[#B19EEF]"
                        >
                          {skill}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Interests Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiAward size={20} className="text-[#B19EEF]" />
          <h3 className="text-lg font-semibold text-white">Interests</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {profile.interests?.map((interest) => (
            <span
              key={interest}
              className="group flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400"
            >
              {interest}
              {isEditing && (
                <button
                  onClick={() => removeInterest(interest)}
                  className="text-emerald-400/60 transition-colors hover:text-red-400"
                >
                  <FiX size={14} />
                </button>
              )}
            </span>
          ))}
          
          {isEditing && (
            <div className="relative">
              <div className="flex items-center gap-1 rounded-full border border-dashed border-white/20 px-3 py-1.5">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onFocus={() => setShowInterestSuggestions(true)}
                  onKeyDown={(e) => e.key === 'Enter' && addInterest(newInterest)}
                  placeholder="Add interest..."
                  className="w-24 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                />
                <button
                  onClick={() => addInterest(newInterest)}
                  className="text-gray-400 hover:text-emerald-400"
                >
                  <FiPlus size={14} />
                </button>
              </div>
              
              {showInterestSuggestions && (
                <div className="absolute left-0 top-full z-10 mt-2 max-h-48 w-64 overflow-y-auto rounded-xl border border-white/10 bg-[#1a1a24] p-2 shadow-xl">
                  <div className="mb-2 px-2 text-xs font-medium text-gray-500">Suggestions</div>
                  <div className="flex flex-wrap gap-1">
                    {interestSuggestions
                      .filter(i => !profile.interests?.includes(i))
                      .filter(i => i.toLowerCase().includes(newInterest.toLowerCase()))
                      .slice(0, 12)
                      .map((interest) => (
                        <button
                          key={interest}
                          onClick={() => addInterest(interest)}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-400"
                        >
                          {interest}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Looking For Section */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Looking For</h3>
          <p className="mt-1 text-sm text-gray-500">
            What kind of collaborators or opportunities are you seeking?
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {lookingForOptions.map((option) => {
            const isSelected = profile.lookingFor?.includes(option);
            return (
              <button
                key={option}
                onClick={() => isEditing && toggleLookingFor(option)}
                disabled={!isEditing}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? 'border border-[#B19EEF]/50 bg-[#B19EEF]/20 text-[#B19EEF]'
                    : isEditing
                    ? 'border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                    : 'border border-white/5 bg-white/[0.02] text-gray-600'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      {isEditing && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
          <p className="mt-1 text-sm text-gray-500">
            Irreversible and destructive actions
          </p>
          <div className="mt-4 flex gap-3">
            <button className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
=======
      {/* Vibe Section (Work Style + Intensity) */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Vibe</h3>
        
        {/* Work Style */}
        <div className="mb-6">
          <h4 className="text-gray-300 mb-3">When do you work best?</h4>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={isEditing ? toggleWorkStyle : undefined}
              disabled={!isEditing}
              className={`flex-1 py-2 rounded-xl transition-all
                ${profile.workStyle === 'early-bird'
                  ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-100'
                  : 'bg-white/5 border border-white/10 text-gray-300'} 
                ${isEditing ? 'hover:bg-emerald-500/30' : ''}`}
            >
              Early Bird
            </button>
            <button
              type="button"
              onClick={isEditing ? toggleWorkStyle : undefined}
              disabled={!isEditing}
              className={`flex-1 py-2 rounded-xl transition-all
                ${profile.workStyle === 'night-owl'
                  ? 'bg-purple-500/20 border border-purple-400 text-purple-100'
                  : 'bg-white/5 border border-white/10 text-gray-300'}
                ${isEditing ? 'hover:bg-purple-500/30' : ''}`}
            >
              Night Owl
            </button>
          </div>
        </div>

        {/* Intensity */}
        <div>
          <h4 className="text-gray-300 mb-3">What's your vibe?</h4>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={isEditing ? toggleIntensity : undefined}
              disabled={!isEditing}
              className={`flex-1 py-2 rounded-xl transition-all
                ${profile.intensity === 'casual'
                  ? 'bg-blue-500/20 border border-blue-400 text-blue-100'
                  : 'bg-white/5 border border-white/10 text-gray-300'}
                ${isEditing ? 'hover:bg-blue-500/30' : ''}`}
            >
              Casual
            </button>
            <button
              type="button"
              onClick={isEditing ? toggleIntensity : undefined}
              disabled={!isEditing}
              className={`flex-1 py-2 rounded-xl transition-all
                ${profile.intensity === 'hardcore'
                  ? 'bg-red-500/20 border border-red-400 text-red-100'
                  : 'bg-white/5 border border-white/10 text-gray-300'}
                ${isEditing ? 'hover:bg-red-500/30' : ''}`}
            >
              Hardcore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> Pranjal
