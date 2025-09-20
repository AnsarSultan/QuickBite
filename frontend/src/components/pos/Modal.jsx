import React from 'react'

function Modal({isOpen, onClose, children }) {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-xl shadow-lg w-1/3 p-6 relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 cursor-pointer hover:bg-gray-300 p-2 rounded text-gray-600 hover:text-black"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Modal Content */}
      {children}
    </div>
  </div>
  )
}

export default Modal