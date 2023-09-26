import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-2 pb-1 sm:px-4 px-2">
      <a href="/" className="flex space-x-3">
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
      </a>
    </header>
  );
}
