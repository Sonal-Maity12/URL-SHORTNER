import React from "react";
import { Outlet } from "react-router-dom";
import   Header  from './../components/header.jsx';

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        < Header/>
        
        <Outlet/>
         
      </main>

       <div className="p-10 text-center text-white bg-gray-800 mt-10">
        Made with 💝 by Sonali 
       </div>
    </div>
  )
};

export default AppLayout;
