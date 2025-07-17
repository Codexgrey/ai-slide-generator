// client-side utility for editing slides
'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateSlide } from '@/redux/slidesSlice';

export default function SlideEditor({ onClose }: { onClose: () => void }) {
    const dispatch = useDispatch();
    const activeIndex = useSelector((state: RootState) => state.slides.activeSlideIndex);
    const slide = useSelector((state: RootState) => state.slides.slides[activeIndex]);

    const [title, setTitle] = useState(slide.title);
    const bulletRef = useRef<HTMLDivElement>(null);
    const notesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bulletRef.current) {
        bulletRef.current.innerHTML = slide.content.join('<br/>');
        }
        if (notesRef.current) {
        notesRef.current.innerHTML = slide.notes || '';
        }

    }, [slide]);


    const handleHighlight = () => {
        if (typeof window !== 'undefined') {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const span = document.createElement('span');
                span.style.backgroundColor = 'yellow';
                span.style.padding = '0 2px';
                range.surroundContents(span);
            }
        }
    };

    const handleSave = () => {
        const updatedBullets =
        bulletRef.current?.innerHTML
            .split(/<br\s*\/?>/)
            .map((line) => line.trim())
            .filter(Boolean) ?? [];

        const updatedNotes = notesRef.current?.innerHTML || '';

        dispatch(
            updateSlide({
                index: activeIndex,
                slide: {
                title,
                content: updatedBullets,
                notes: updatedNotes,
                },
            })
        );
        onClose();
    };


    return (
        <div className="p-6 border rounded-md bg-white shadow space-y-4 max-w-xl mx-auto">
            <h2 className="text-lg font-semibold">Edit Slide</h2>

            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    className="w-full border px-3 py-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                    Bullet Points
                    <button
                        type="button"
                        onClick={handleHighlight}
                        className="text-xs px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                    >
                        Highlight
                    </button>
                </label>
                <div
                    ref={bulletRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full border px-3 py-2 rounded h-32 overflow-y-auto whitespace-pre-wrap"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 flex justify-between items-center">
                    Notes
                    <button
                        type="button"
                        onClick={handleHighlight}
                        className="text-xs px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                    >
                        Highlight
                    </button>
                </label>
                <div
                    ref={notesRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="w-full border px-3 py-2 rounded h-24 overflow-y-auto whitespace-pre-wrap"
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-300 text-black rounded hover:bg-zinc-400"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
