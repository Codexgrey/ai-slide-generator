'use client';

import { useState } from 'react';
import SlideEditor from './SlideEditor';

export default function ExportPanel() {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      {editing && (
        <div className="mb-6">
          <SlideEditor onClose={() => setEditing(false)} />
        </div>
      )}

      {/* panel action buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-600"
        >
          Edit Text
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">
          Present
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
          Save
        </button>
        <button className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700">
          Export PDF
        </button>
      </div>
    </div>
  );
}
