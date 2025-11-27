import React from 'react';
import { X, Calendar, Code } from 'lucide-react';

const VersionHistoryModal = ({ isOpen, onClose, versionHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Version History</h2>
            <p className="text-gray-400 text-sm mt-1">Plugin update timeline and changelog</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {versionHistory && versionHistory.length > 0 ? (
              versionHistory.map((version, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-sky-500/30">
                  {idx !== versionHistory.length - 1 && (
                    <div className="absolute left-[-6px] top-0 w-2 h-2 bg-sky-500 rounded-full"></div>
                  )}
                  {idx === versionHistory.length - 1 && (
                    <div className="absolute left-[-8px] top-0 w-4 h-4 bg-sky-500 rounded-full border-2 border-gray-900"></div>
                  )}
                  
                  <div className="ml-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-300 rounded-lg text-sm font-semibold">
                        <Code size={14} />
                        <span>v{version.version}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={14} />
                        <span>{new Date(version.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {version.changes.map((change, changeIdx) => (
                        <div key={changeIdx} className="flex items-start gap-3 text-gray-300">
                          <span className="text-sky-400 mt-1">•</span>
                          <span>{change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>No version history available.</p>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;

