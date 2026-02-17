import React from 'react';
import RightPanelLayout from '../../Layout/RightPanelLayout';
import {useNavigate} from 'react-router-dom';

const SubProductView = () => {
  const navigate = useNavigate ();
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => navigate ('/')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <RightPanelLayout />
    </div>
  );
};

export default SubProductView;
