import React from 'react'

export default function Avatar({ src, name = "", size = "md", online = false }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl", xl: "w-24 h-24 text-3xl" }
  return (
    <div className="relative inline-block">
      <img src={src || `https://ui-avatars.com/api/?name=${name}&background=0A66C2&color=fff`} alt={name} className={`${sizes[size]} rounded-full object-cover`} onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${name}&background=0A66C2&color=fff` }} />
      {online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
    </div>
  )
}
