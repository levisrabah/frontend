import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../css/Layout.css';

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const { user } = useAuth();
//   const location = useLocation();

//   // Check if current route is an auth route (login, signup, etc.)
//   const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

//   // Check if current route requires sidebar
//   const requiresSidebar = user && !isAuthRoute;

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   if (isAuthRoute) {
//     return <main className="auth-layout">{children}</main>;
//   }

//   return (
//     <div className="layout">
//       <Header onMenuClick={toggleSidebar} />
      
//       <div className="layout-container">
//         {requiresSidebar && (
//           <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//         )}
        
//         <main className={`main-content ${requiresSidebar ? 'with-sidebar' : ''} ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
//           <div className="content-wrapper">
//             {children}
//           </div>
          
//           <Footer />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();

  // Check if current route is an auth route (login, signup, etc.)
  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  // Check if current route requires sidebar
  const requiresSidebar = user && !isAuthRoute;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isAuthRoute) {
    return <main className="auth-layout">{children}</main>;
  }

  return (
    <div className="layout">
      <Header user={user} onMenuClick={toggleSidebar} />
      
      <div className="layout-container">
        {requiresSidebar && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        
        <main className={`main-content ${requiresSidebar ? 'with-sidebar' : ''} ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <div className="content-wrapper">
            {children}
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;