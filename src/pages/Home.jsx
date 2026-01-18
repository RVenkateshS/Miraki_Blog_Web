import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
 

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (!authStatus) {
        return (
            <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden relative">
                
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <Container>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 z-10 relative">
                        
                        {/* LEFT SIDE: Text & CTA */}
                        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Where Ideas <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Come to Life.
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                                Join the Miraki community. Share your stories, read fascinating articles, and connect with thinkers around the world.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link 
                                    to="/signup"
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    Get Started
                                </Link>
                                <Link 
                                    to="/login"
                                    className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-full shadow-sm hover:shadow-md transition-all hover:bg-gray-50"
                                >
                                    Login
                                </Link>
                            </div>

                             {/* Stats */}
                             
                        </div>

                        {/* RIGHT SIDE: The Aesthetic Card */}
                        <div className="lg:w-1/2 relative hidden md:block">
                            <div className="relative w-full max-w-md mx-auto aspect-[4/5] perspective-1000">
                                
                                {/* 1. The Gradient Shadow Behind */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-y-12 rotate-z-3 scale-95 opacity-80"></div>
                                
                                {/* 2. The Main White Card */}
                                <div className="absolute inset-0 bg-white rounded-3xl shadow-xl transform rotate-y-6 -rotate-z-2 border border-gray-100 overflow-hidden flex flex-col">
                                    
                                    {/* IMAGE SECTION (Updated) */}
                                    <div className="h-2/3 w-full relative overflow-hidden group">
                                       <img 
                                        src="/HomePagePic.jpg"  // <--- Use the variable inside curly braces
                                        alt="Creative Workspace"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
                                        {/* Overlay Gradient for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        
                                        {/* Rocket Icon (Moved to top right of image) */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-xl">
                                            🚀
                                        </div>
                                    </div>
                                    
                                    {/* TEXT SECTION */}
                                    <div className="p-6 bg-white flex-1 flex flex-col justify-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Start Writing Today
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            "Miraki gave me the platform to share my journey. It is simply amazing!"
                                        </p>
                                        
                                        {/* User Mini Profile */}
                                        <div className="mt-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                                VS
                                            </div>
                                            <span className="text-xs font-medium text-gray-400">Venkatesh S.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home