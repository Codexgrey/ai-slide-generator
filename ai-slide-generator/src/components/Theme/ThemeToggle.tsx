// client rendering
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTheme } from "@/redux/uiSlice";
import { useEffect } from "react";

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    // apply theme to class
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-800 
                hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}
