// client-side rendered page
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/UI/Loading';


interface Presentation {
  id: string;
  title: string;
  createdAt: string;
}

export default function HistoryPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresentations = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(`/api/presentations?email=${session.user.email}`);
      const data = await res.json();

      setPresentations(data || []);
      setLoading(false);
    };

    fetchPresentations();
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setLoadingDashboard(true);
            router.push('/')}
          }
          disabled={loadingDashboard}
          className="inline-flex items-center text-gray-600 hover:text-black transition 
          hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm border border-gray-200 
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingDashboard ? 'Loading Dashboard...' : '← Back to Dashboard'}
        </button>

        <button
          onClick={() => {
            setLoadingCreate(true);
            router.push('/create')}
          }
          disabled={loadingCreate}
          className="inline-flex items-center text-gray-600 hover:text-black transition 
          hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm border border-gray-200
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingCreate ? 'Loading Create...' : 'Go to Create →'}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Your Presentation History</h1>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spinner />
        </div>
      ) : presentations.length === 0 ? (
        <p className="text-center text-gray-500">No presentations yet.</p>
      ) : (
        <div className="space-y-4">
          {presentations.map((presentation) => (
            <div
              key={presentation.id}
              onClick={() => { 
                setLoadingId(presentation.id);
                router.push(`/preview?id=${presentation.id}`);
              }}
              className="cursor-pointer p-4 rounded-md border hover:bg-gray-100 shadow-sm"
            >
              {loadingId === presentation.id ? (
                'Loading Presentation...'
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{presentation.title}</h2>
                  <p className="text-sm text-gray-500">
                    Created at: {new Date(presentation.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
