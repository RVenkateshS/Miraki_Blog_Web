import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation() // To detect current page

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    // UPGRADE 1: Stronger glass effect and a subtle gradient border at the bottom
    <header className='sticky top-0 z-50 py-4 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300'>
      <Container>
        <nav className='flex items-center justify-between'>
          
          {/* Logo Section */}
          <div className='mr-8 hover:scale-105 transition-transform duration-200'>
            <Link to='/'>
              {/* Using the new SVG Logo we created */}
              <Logo width='50px' />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className='flex ml-auto items-center space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 
                      ${location.pathname === item.slug 
                        // Active State: Blue background, white text, shadow
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700" 
                        // Inactive State: Transparent background, dark text, light hover
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button (Only if logged in) */}
            {authStatus && (
              <li className='ml-4 pl-4 border-l border-gray-200'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header