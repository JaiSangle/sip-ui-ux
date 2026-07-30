import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { currentUser, users, posts } from '../data/mockData'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap, Star, Edit, Plus, MessageSquare, UserPlus, Check, MoreHorizontal, Award } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' }
  })
}

export default function Profile() {
  const { id } = useParams()
  const { user } = useAuth()
  const isOwnProfile = id === '1' || id === 'me'
  const profileData = isOwnProfile ? currentUser : users.find(u => u.id === id) || currentUser

  const [connected, setConnected] = useState(false)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [endorsedSkills, setEndorsedSkills] = useState(new Set())

  const profilePosts = posts.filter(p => p.userId === profileData.id).slice(0, 3)
  const otherUsers = users.filter(u => u.id !== profileData.id).slice(0, 3)

  const toggleEndorse = (skill) => {
    setEndorsedSkills(prev => {
      const next = new Set(prev)
      if (next.has(skill)) next.delete(skill)
      else next.add(skill)
      return next
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4">

        {/* ───── MAIN CONTENT ───── */}
        <div className="col-span-12 md:col-span-8 space-y-4">

          {/* CARD 1 – Cover & Avatar */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-blue-500 to-blue-400 relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-28 h-28 rounded-full border-4 border-white object-cover absolute bottom-0 left-6 transform translate-y-1/2"
              />
              {/* Action buttons – top right */}
              <div className="absolute top-4 right-4 flex gap-2">
                {isOwnProfile ? (
                  <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white transition-colors shadow-sm">
                    <Edit size={15} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setConnected(!connected)}
                      className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm ${
                        connected
                          ? 'bg-white/90 backdrop-blur-sm text-primary'
                          : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
                      }`}
                    >
                      {connected ? <Check size={15} /> : <UserPlus size={15} />}
                      {connected ? 'Connected' : 'Connect'}
                    </button>
                    <Link
                      to="/messages"
                      className="flex items-center gap-1.5 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <MessageSquare size={15} />
                      Message
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 mt-16">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-muted mt-1">{profileData.headline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted">
                {profileData.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {profileData.location}
                  </span>
                )}
                <span className="text-primary font-medium">{profileData.connections} connections</span>
              </div>
              {!isOwnProfile && profileData.mutualConnections && (
                <p className="text-xs text-muted mt-2">{profileData.mutualConnections} mutual connections</p>
              )}
            </div>
          </motion.div>

          {/* CARD 2 – About */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              {isOwnProfile && (
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <Edit size={16} className="text-muted" />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {profileData.about && profileData.about.length > 150 && !aboutExpanded
                ? <>
                    {profileData.about.slice(0, 150)}...
                    <button onClick={() => setAboutExpanded(true)} className="text-muted hover:text-primary ml-1 font-medium">see more</button>
                  </>
                : profileData.about || 'No bio added yet.'
              }
            </p>
          </motion.div>

          {/* CARD 3 – Experience */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Briefcase size={20} className="text-muted" />
                Experience
              </h2>
              {isOwnProfile && (
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <Plus size={18} className="text-muted" />
                </button>
              )}
            </div>
            <div className="space-y-0">
              {profileData.experience && profileData.experience.map((exp, idx) => (
                <div key={exp.id}>
                  {idx > 0 && <div className="border-t border-gray-100 my-4"></div>}
                  <div className="flex gap-4">
                    <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900">{exp.role}</h3>
                          <p className="text-sm text-gray-700">{exp.company}</p>
                          <p className="text-sm text-muted mt-0.5">{exp.duration}</p>
                        </div>
                        {isOwnProfile && (
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                            <Edit size={14} className="text-muted" />
                          </button>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!profileData.experience || profileData.experience.length === 0) && (
                <p className="text-sm text-muted">No experience added yet.</p>
              )}
            </div>
          </motion.div>

          {/* CARD 4 – Education */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <GraduationCap size={20} className="text-muted" />
                Education
              </h2>
              {isOwnProfile && (
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <Plus size={18} className="text-muted" />
                </button>
              )}
            </div>
            <div className="space-y-0">
              {profileData.education && profileData.education.map((edu, idx) => (
                <div key={edu.id}>
                  {idx > 0 && <div className="border-t border-gray-100 my-4"></div>}
                  <div className="flex gap-4">
                    <img src={edu.logo} alt={edu.school} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900">{edu.school}</h3>
                          <p className="text-sm text-gray-700">{edu.degree}, {edu.field}</p>
                          <p className="text-sm text-muted mt-0.5">{edu.year}</p>
                          {edu.grade && <p className="text-sm text-muted">Grade: {edu.grade}</p>}
                        </div>
                        {isOwnProfile && (
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                            <Edit size={14} className="text-muted" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!profileData.education || profileData.education.length === 0) && (
                <p className="text-sm text-muted">No education added yet.</p>
              )}
            </div>
          </motion.div>

          {/* CARD 5 – Skills */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Star size={20} className="text-muted" />
                Skills
              </h2>
              {isOwnProfile && (
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <Plus size={18} className="text-muted" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.skills && profileData.skills.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5">
                  <span className="text-sm text-gray-700">{skill}</span>
                  {!isOwnProfile && (
                    <button
                      onClick={() => toggleEndorse(skill)}
                      className={`text-xs font-medium ml-1 transition-colors ${
                        endorsedSkills.has(skill) ? 'text-primary' : 'text-muted hover:text-primary'
                      }`}
                    >
                      {endorsedSkills.has(skill) ? 'Endorsed ✓' : 'Endorse'}
                    </button>
                  )}
                </div>
              ))}
              {(!profileData.skills || profileData.skills.length === 0) && (
                <p className="text-sm text-muted">No skills added yet.</p>
              )}
            </div>
          </motion.div>

          {/* CARD 6 – Activity */}
          <motion.div custom={5} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
            </div>
            {profilePosts.length > 0 ? (
              <div className="space-y-0">
                {profilePosts.map((post, idx) => (
                  <div key={post.id}>
                    {idx > 0 && <div className="border-t border-gray-100 my-3"></div>}
                    <div className="group">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                        <span>{post.likes} likes</span>
                        <span>{post.comments.length} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/feed" className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
                  Show all posts →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted">No recent activity</p>
            )}
          </motion.div>
        </div>

        {/* ───── RIGHT SIDEBAR ───── */}
        <aside className="col-span-12 md:col-span-4 space-y-4">

          {/* People Also Viewed */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-sm text-gray-900 mb-4">People Also Viewed</h3>
            <div className="space-y-4">
              {otherUsers.map(u => (
                <div key={u.id} className="flex items-start gap-3">
                  <Link to={`/profile/${u.id}`}>
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/profile/${u.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary hover:underline transition-colors block truncate">
                      {u.name}
                    </Link>
                    <p className="text-xs text-muted truncate">{u.headline}</p>
                    <button className="mt-1.5 text-xs font-medium text-primary border border-primary rounded-full px-3 py-1 hover:bg-blue-50 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Strength – own profile only */}
          {isOwnProfile && (
            <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-sm text-gray-900 mb-4 flex items-center gap-2">
                <Award size={18} className="text-yellow-500" />
                Profile Strength
              </h3>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">All-Star</span>
                  <span className="text-sm font-semibold text-primary">70%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                  />
                </div>
              </div>

              {/* Tips */}
              <div className="space-y-2.5 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-500 shrink-0" />
                  <span className="text-gray-600">Add a photo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-500 shrink-0" />
                  <span className="text-gray-600">Add experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-500 shrink-0" />
                  <span className="text-gray-600">Add 5 skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0"></div>
                  <span className="text-muted">Get 3 endorsements</span>
                </div>
              </div>
            </motion.div>
          )}
        </aside>
      </div>
    </div>
  )
}
