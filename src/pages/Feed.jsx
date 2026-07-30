import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { currentUser, posts as initialPosts, users } from '../data/mockData'
import Avatar from '../components/ui/Avatar'
import { ThumbsUp, MessageSquare, Share, Send, Bookmark, X, Image, Smile, MoreHorizontal } from 'lucide-react'

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / 86400000)
  if (days > 7) return `${Math.floor(days / 7)}w`
  if (days > 0) return `${days}d`
  const hours = Math.floor(diff / 3600000)
  if (hours > 0) return `${hours}h`
  return 'Just now'
}

export default function Feed() {
  const [feedPosts, setFeedPosts] = useState(initialPosts.map(p => ({ ...p, liked: false })))
  const [showModal, setShowModal] = useState(false)
  const [newPostText, setNewPostText] = useState('')
  const [openComments, setOpenComments] = useState({})
  const [commentInputs, setCommentInputs] = useState({})
  const [expandedPosts, setExpandedPosts] = useState({})
  const [connectedUsers, setConnectedUsers] = useState({})

  const handleLike = (postId) => {
    setFeedPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
      }
      return p
    }))
  }

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim()
    if (!text) return
    const newComment = {
      id: `c${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: text,
      timestamp: new Date().toISOString()
    }
    setFeedPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] }
      }
      return p
    }))
    setCommentInputs(prev => ({ ...prev, [postId]: '' }))
  }

  const handleCreatePost = () => {
    if (!newPostText.trim()) return
    const newPost = {
      id: `${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userHeadline: currentUser.headline,
      content: newPostText.trim(),
      likes: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      image: null,
      comments: [],
      liked: false
    }
    setFeedPosts(prev => [newPost, ...prev])
    setNewPostText('')
    setShowModal(false)
  }

  const suggestedUsers = users.filter(u => !u.isConnected).slice(0, 3)

  const trendingTopics = [
    { tag: '#Placement2024', posts: '2,451' },
    { tag: '#InternshipTips', posts: '1,832' },
    { tag: '#TechJobs', posts: '1,204' },
    { tag: '#StudentLife', posts: '987' },
    { tag: '#DSA', posts: '756' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-12 gap-4">

        {/* ───── LEFT COLUMN ───── */}
        <aside className="hidden md:block col-span-3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Banner + Avatar */}
            <div className="relative">
              <div className="h-16 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full border-3 border-white object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="pt-8 pb-4 px-4 text-center">
              <h3 className="font-semibold text-gray-900">{currentUser.name}</h3>
              <p className="text-sm text-muted mt-0.5 leading-snug">{currentUser.headline}</p>
              <p className="text-xs text-muted mt-1">{currentUser.location}</p>
            </div>

            <div className="border-t border-gray-100 mx-4"></div>

            {/* Stats */}
            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Connections</span>
                <span className="text-primary font-semibold">{currentUser.connections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Profile views</span>
                <span className="text-primary font-semibold">{currentUser.profileViews}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mx-4"></div>

            {/* Quick Links */}
            <div className="px-4 py-3 space-y-1">
              <Link to="/network" className="block text-sm text-gray-700 hover:text-primary hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors">My Network</Link>
              <Link to="/jobs" className="block text-sm text-gray-700 hover:text-primary hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors">Jobs</Link>
              <Link to="/notifications" className="block text-sm text-gray-700 hover:text-primary hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors">Notifications</Link>
            </div>
          </div>
        </aside>

        {/* ───── MIDDLE COLUMN ───── */}
        <div className="col-span-12 md:col-span-6">

          {/* Post Creation Box */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center gap-3">
              <Avatar src={currentUser.avatar} name={currentUser.name} />
              <div
                onClick={() => setShowModal(true)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 text-sm text-muted cursor-pointer transition-colors"
              >
                What's on your mind, {currentUser.name.split(' ')[0]}?
              </div>
            </div>
            <div className="flex mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowModal(true)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-muted hover:bg-gray-50 rounded-lg transition-colors">
                <Image size={18} className="text-green-600" />
                <span>Photo</span>
              </button>
              <button onClick={() => setShowModal(true)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-muted hover:bg-gray-50 rounded-lg transition-colors">
                <Bookmark size={18} className="text-orange-500" />
                <span>Article</span>
              </button>
              <button onClick={() => setShowModal(true)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-muted hover:bg-gray-50 rounded-lg transition-colors">
                <Share size={18} className="text-primary" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Post Creation Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
                    <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <X size={20} className="text-muted" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar src={currentUser.avatar} name={currentUser.name} />
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-muted">Post to Anyone</p>
                      </div>
                    </div>
                    <textarea
                      value={newPostText}
                      onChange={e => setNewPostText(e.target.value)}
                      placeholder="What do you want to share?"
                      rows={6}
                      className="w-full resize-none outline-none text-sm text-gray-800 placeholder-gray-400 leading-relaxed"
                      autoFocus
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Image size={20} className="text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Smile size={20} className="text-yellow-500" />
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feed Posts */}
          {feedPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">

              {/* Post Header */}
              <div className="flex items-start justify-between p-4 pb-2">
                <div className="flex gap-3">
                  <Link to={`/profile/${post.userId}`}>
                    <Avatar src={post.userAvatar} name={post.userName} />
                  </Link>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link to={`/profile/${post.userId}`} className="font-semibold text-sm text-gray-900 hover:text-primary hover:underline transition-colors">{post.userName}</Link>
                      <span className="text-xs text-muted bg-gray-100 px-1.5 py-0.5 rounded">1st</span>
                    </div>
                    <p className="text-xs text-muted">{post.userHeadline}</p>
                    <p className="text-xs text-muted mt-0.5">{timeAgo(post.timestamp)}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal size={18} className="text-muted" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {post.content.length > 200 && !expandedPosts[post.id]
                    ? <>
                        {post.content.slice(0, 200)}...
                        <button onClick={() => setExpandedPosts(prev => ({ ...prev, [post.id]: true }))} className="text-muted hover:text-primary ml-1 font-medium">see more</button>
                      </>
                    : post.content
                  }
                </p>
                {post.image && (
                  <img src={post.image} alt="Post" className="rounded-lg w-full max-h-80 object-cover mt-3" />
                )}
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between px-4 py-2 text-xs text-muted">
                <span>{post.likes.toLocaleString()} likes</span>
                <span>{post.comments.length} comments · {post.shares} shares</span>
              </div>

              <div className="border-t border-gray-100 mx-4"></div>

              {/* Action Buttons */}
              <div className="flex px-2 py-1">
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  onClick={() => handleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${post.liked ? 'text-primary' : 'text-muted hover:bg-gray-50'}`}
                >
                  <ThumbsUp size={18} fill={post.liked ? 'currentColor' : 'none'} />
                  <span>Like</span>
                </motion.button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${openComments[post.id] ? 'text-primary' : 'text-muted hover:bg-gray-50'}`}
                >
                  <MessageSquare size={18} />
                  <span>Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-gray-50 transition-colors">
                  <Share size={18} />
                  <span>Share</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-gray-50 transition-colors">
                  <Send size={18} />
                  <span>Send</span>
                </button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {openComments[post.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-4 py-3 space-y-3">
                      {/* Existing Comments */}
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-2.5">
                          <Avatar src={comment.userAvatar} name={comment.userName} size="sm" />
                          <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-sm font-semibold text-gray-900">{comment.userName}</p>
                            <p className="text-sm text-gray-700 mt-0.5">{comment.content}</p>
                            <p className="text-xs text-muted mt-1">{timeAgo(comment.timestamp)}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
                        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentInputs[post.id]?.trim()}
                            className="ml-2 text-primary disabled:text-gray-300 transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ───── RIGHT COLUMN ───── */}
        <aside className="hidden md:block col-span-3 space-y-4">

          {/* People You May Know */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-3">People You May Know</h3>
            <div className="space-y-4">
              {suggestedUsers.map(user => (
                <div key={user.id} className="flex items-start gap-3">
                  <Link to={`/profile/${user.id}`}>
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/profile/${user.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary hover:underline transition-colors block truncate">{user.name}</Link>
                    <p className="text-xs text-muted truncate">{user.headline}</p>
                    <p className="text-xs text-muted mt-0.5">{user.mutualConnections} mutual connections</p>
                    <button
                      onClick={() => setConnectedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }))}
                      className={`mt-2 text-xs font-medium px-4 py-1.5 rounded-full border transition-colors ${
                        connectedUsers[user.id]
                          ? 'border-gray-300 text-muted bg-gray-50'
                          : 'border-primary text-primary hover:bg-blue-50'
                      }`}
                    >
                      {connectedUsers[user.id] ? 'Pending' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Trending</h3>
            <div className="space-y-3">
              {trendingTopics.map(topic => (
                <div key={topic.tag} className="cursor-pointer group">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">{topic.tag}</p>
                  <p className="text-xs text-muted">{topic.posts} posts</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
