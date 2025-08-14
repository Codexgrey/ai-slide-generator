// client-side rendered page
'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/components/UI/Loading';


export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);

  const router = useRouter();
 
  if (status === 'loading') {
    return <Spinner />;
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <span style={{ fontSize: '50px' }}>&#9940;</span>
        <p className="text-gray-700 text-lg font-medium">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white shadow rounded text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
      <p className="text-lg mb-2">
        Hello, <strong>{session.user.name || session.user.email}</strong> 👋
      </p>
      <p className="text-gray-500 mb-6">You&apos;re now authenticated 🚀!</p>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={() => { 
            setLoadingNew(true);
            router.push('/create')}
          }
          disabled={loadingNew}
          className="w-[275px] bg-green-600 text-white py-2 rounded-md hover:bg-green-800
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loadingNew ? 'Loading...' : 'New Presentation'}
        </button>

        <button
          onClick={() => { 
            setLoadingHistory(true);
            router.push('/history')}
          }
          disabled={loadingHistory}
          className="w-[275px] border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-200
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loadingHistory ? 'Loading history...' : 'View History'}
        </button>

        <button
          onClick={() => { 
            setLoadingSignOut(true);
            signOut({ callbackUrl: '/login' })
          }}
          disabled={loadingSignOut}
          className="w-[275px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loadingSignOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
}
