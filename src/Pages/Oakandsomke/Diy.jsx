import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RightPanelLayout from '../../Layout/RightPanelLayout'

const Diy = () => {
  const navigate = useNavigate()
  
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Sidebar */}
      <div className='w-full md:w-[42%] h-screen border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-2 border-b border-gray-200 flex-shrink-0'>
          <div className='flex items-center justify-between mb-1'>
            <button
              onClick={() => navigate('/')}
              className='p-2 hover:bg-gray-200 rounded-full transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>

            <h1 className='text-2xl font-semibold text-gray-900 text-center flex-1'>
              DIY
            </h1>

            <div className='w-9' />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          <div className='grid grid-cols-2 gap-4 mt-6 pb-4'>

          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <RightPanelLayout />
    </div>
  )
}

export default Diy
