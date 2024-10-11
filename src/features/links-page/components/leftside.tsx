import React, { memo } from 'react';

export const LinkView = memo(() => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative h-[70vh] w-72 rounded-3xl border-2 border-gray-800 bg-white p-1 shadow-lg">
        <div className="relative h-[68.6vh] w-[276px] rounded-3xl border-2 border-gray-800 bg-white shadow-lg">
          <div className="absolute -top-[5px] left-1/2 z-10 h-6 w-[140px] -translate-x-1/2 rounded-2xl border-2 border-black border-t-white bg-white "></div>
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4/5 rounded-lg bg-blue-600 py-3 text-center text-white shadow transition hover:bg-blue-500"
            >
              Google
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4/5 rounded-lg bg-gray-900 py-3 text-center text-white shadow transition hover:bg-gray-800"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4/5 rounded-lg bg-blue-700 py-3 text-center text-white shadow transition hover:bg-blue-600"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
LinkView.displayName = 'LinkView';
