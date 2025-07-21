// client-side rendered page
'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session?.user) {
    return <p className="text-center mt-10">You must be logged in to view this page.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white shadow rounded text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
      <p className="text-lg mb-2">
        Hello, <strong>{session.user.name || session.user.email}</strong> 👋
      </p>
      <p className="text-gray-500 mb-6">You&apos;re now authenticated!</p>

      <div className="space-y-4">
        <button
          onClick={() => router.push('/create')}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create New Presentation
        </button>

        <button
          onClick={() => router.push('/history')}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
        >
          History
        </button>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
