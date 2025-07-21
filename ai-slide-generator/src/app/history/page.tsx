// client-side rendered page
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <h1 className="text-2xl font-bold mb-6 text-center">Your Presentation History</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : presentations.length === 0 ? (
        <p className="text-center text-gray-500">No presentations yet.</p>
      ) : (
        <div className="space-y-4">
          {presentations.map((presentation) => (
            <div
              key={presentation.id}
              onClick={() => router.push(`/preview?id=${presentation.id}`)}
              className="cursor-pointer p-4 rounded border hover:bg-gray-50 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{presentation.title}</h2>
              <p className="text-sm text-gray-500">
                Created at: {new Date(presentation.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
