import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center w-full mt-2 pb-1 sm:px-4 px-2">
      <div
        onClick={
        () => navigate('/')
      }
        role="button"
        tabIndex={0}
        onKeyDown={() => navigate('/')}
      >
        {/* <img
          alt="header text"
          src="/handshake.svg"
          className="sm:w-12 sm:h-12 w-10 h-10 ml-0"
          width={32}
          height={32}
        /> */}
        <h1 className="sm:text-4xl text-2xl font-semibold ml-2 tracking-tight m-0.5 sm:m-2">
          ResumeAI
          {' '}
          <span className="text-sm text-slate-400">beta</span>
        </h1>
      </div>
    </header>
  );
}
