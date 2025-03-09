
import React from 'react';

const PageBackground: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lending-primary/5 via-transparent to-transparent opacity-70 pointer-events-none dark:opacity-50 light:opacity-20"></div>
      
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[30%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[50%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[70%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[90%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          
          <div className="absolute top-0 left-[10%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[30%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[50%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[70%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[90%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          
          <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[50%] left-[50%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[70%] left-[70%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[90%] left-[90%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
        </div>
      </div>
    </>
  );
};

export default PageBackground;
