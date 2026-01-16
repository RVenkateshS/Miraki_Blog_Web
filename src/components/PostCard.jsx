import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
            {/* Image Section */}
            <div className='w-full h-48 sm:h-60 relative overflow-hidden'>
                <img 
                    src={appwriteService.getFilePreview(featuredImage)} 
                    alt={title}
                    className='object-cover w-full h-full transform hover:scale-105 transition-transform duration-500' 
                />
            </div>
            
            {/* Content Section */}
            <div className='p-5'>
                <h2 className='text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                    {title}
                </h2>
                <p className='text-gray-500 text-sm mt-2 font-medium'>
                    Read Article →
                </p>
            </div>
        </div>
    </Link>
  )
}

export default PostCard