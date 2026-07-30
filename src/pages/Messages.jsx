import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { conversations as initialConversations, currentUser } from '../data/mockData'
import Avatar from '../components/ui/Avatar'
import { Search, Send, Image, Paperclip, Phone, Video, Info, MoreVertical, ArrowLeft, Edit } from 'lucide-react'

export default function Messages() {
  const [convos, setConvos] = useState(initialConversations.map(c => ({ ...c })))
  const [activeId, setActiveId] = useState(null)
  const [input, setInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  const activeConvo = convos.find(c => c.id === activeId)

  const filteredConvos = convos.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConvo?.messages?.length])

  const selectConvo = (id) => {
    setActiveId(id)
    setConvos(prev => prev.map(c =>
      c.id === id ? { ...c, unread: 0 } : c
    ))
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text || !activeId) return

    const newMsg = {
      id: `m${Date.now()}`,
      senderId: '1',
      content: text,
      time: 'Just now'
    }

    setConvos(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: text,
          time: 'Now'
        }
      }
      return c
    }))
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-white overflow-hidden">

      {/* ───── LEFT PANEL – Conversation List ───── */}
      <div className={`w-full md:w-80 md:flex-shrink-0 border-r border-gray-200 flex flex-col bg-white ${activeId ? 'hidden md:flex' : 'flex'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Edit size={18} className="text-muted" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2.5">
            <Search size={16} className="text-muted mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(convo => {
            const isActive = convo.id === activeId
            return (
              <div
                key={convo.id}
                onClick={() => selectConvo(convo.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-50 border-l-2 border-primary'
                    : 'hover:bg-gray-50 border-l-2 border-transparent'
                }`}
              >
                <Avatar src={convo.avatar} name={convo.name} online={convo.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm truncate ${convo.unread > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {convo.name}
                    </span>
                    <span className="text-xs text-muted shrink-0 ml-2">{convo.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className={`text-sm truncate max-w-[160px] ${convo.unread > 0 ? 'text-gray-800 font-medium' : 'text-muted'}`}>
                      {convo.lastMessage}
                    </p>
                    {convo.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shrink-0 font-medium">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredConvos.length === 0 && (
            <div className="text-center py-10 text-sm text-muted">No conversations found</div>
          )}
        </div>
      </div>

      {/* ───── RIGHT PANEL – Chat Area ───── */}
      <div className={`flex-1 flex flex-col ${activeId ? 'flex' : 'hidden md:flex'}`}>

        {!activeConvo ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
              <Send size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-sm text-muted max-w-xs">Choose from your existing conversations or start a new one</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveId(null)}
                  className="md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors mr-1"
                >
                  <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <Avatar src={activeConvo.avatar} name={activeConvo.name} online={activeConvo.online} />
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{activeConvo.name}</h3>
                  <p className="text-xs text-muted">
                    {activeConvo.online ? (
                      <span className="text-green-600">Active now</span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={18} className="text-muted" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Video size={18} className="text-muted" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Info size={18} className="text-muted" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 flex flex-col gap-2">
              {activeConvo.messages.map((msg, idx) => {
                const isOwn = msg.senderId === '1'
                const prevMsg = activeConvo.messages[idx - 1]
                const sameSenderAsPrev = prevMsg && prevMsg.senderId === msg.senderId
                const nextMsg = activeConvo.messages[idx + 1]
                const sameSenderAsNext = nextMsg && nextMsg.senderId === msg.senderId

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'} ${sameSenderAsPrev ? 'mt-0.5' : 'mt-3'}`}
                  >
                    {/* Other user avatar – show only on last message in a group */}
                    {!isOwn && (
                      <div className="w-8 shrink-0">
                        {!sameSenderAsNext && (
                          <Avatar src={activeConvo.avatar} name={activeConvo.name} size="sm" />
                        )}
                      </div>
                    )}

                    <div className={`max-w-xs ${isOwn ? 'ml-auto' : ''}`}>
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed ${
                          isOwn
                            ? 'bg-primary text-white rounded-2xl rounded-tr-sm'
                            : 'bg-white shadow-sm text-gray-800 rounded-2xl rounded-tl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                      {!sameSenderAsNext && (
                        <p className={`text-xs text-muted mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 px-4 py-3 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                  <Paperclip size={18} className="text-muted" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                  <Image size={18} className="text-muted" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a message..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-2.5 rounded-full transition-colors shrink-0 ${
                    input.trim()
                      ? 'bg-primary text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
