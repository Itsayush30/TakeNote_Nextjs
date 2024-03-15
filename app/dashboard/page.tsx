
'use client'

import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-8">Welcome to TakeNote</h1>
      <div className="flex justify-center space-x-4">
        <Link href="/dashboard/addnote">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Notes
          </button>
        </Link>
        <Link href="/dashboard/getnote">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Saved Notes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
