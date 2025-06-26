// opt-in for client-side rendering
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/uiSlice";

export default function InputForm() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    dispatch(setError(null)); // clear error on input change
  };

  return (
    <div>
      <label htmlFor="slide-input" className="block text-lg font-semibold mb-2">
        Topic or Content
      </label>
      <textarea
        id="slide-input"
        className="w-full min-h-[150px] p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Enter your presentation topic or paste content..."
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}
