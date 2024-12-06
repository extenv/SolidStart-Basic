import { useLocation } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";

export default function Nav() {
  const location = useLocation();
  const active = (path) => path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  // State untuk tema (true = dark mode, false = light mode)
  const [isDarkMode, setIsDarkMode] = createSignal(false);

  // Inisialisasi tema pada load halaman
  onMount(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  });

  // Fungsi toggle tema
  const toggleTheme = () => {
    const newTheme = !isDarkMode();
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <nav class="bg-sky-800 flex justify-between items-center px-10 text-white">
      <ul class="container flex items-center p-3">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
      </ul>
      <button
        onClick={toggleTheme}
        class="px-4 py-2 text-white bg-blue-500 dark:bg-yellow-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isDarkMode() ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </nav>
  );
}
