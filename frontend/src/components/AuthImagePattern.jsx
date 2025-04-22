import { useThemeStore } from "../store/useThemeStore";

const AuthImagePattern = ({ title, subtitle }) => {
  const { theme = "light" } = useThemeStore(); // Fallback to 'light'

  return (
    <div
      className={`w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 pt-54 sm:pt-64 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900/60 to-gray-800/60"
          : "bg-gradient-to-br from-base-100/60 to-base-200/60"
      }`}
    >
      <style>
        {`
          @keyframes livelyImage {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
            50% { transform: scale(1.03) rotate(1deg); opacity: 1; }
          }
        `}
      </style>
      <div className="max-w-md text-center space-y-12">
        {/* Animated Image */}
        <div className="flex justify-center mb-10 animate-bounce">
          <div
            className={`w-56 h-56 rounded-2xl ${
              theme === "dark"
                ? "bg-primary/25 shadow-lg"
                : "bg-primary/20 shadow-sm"
            } flex items-center justify-center`}
            style={{
              animation: "livelyImage 2s ease-in-out infinite",
            }}
          >
            <img
              src="/talksy.png" // Ensure this path is correct
              alt="Talksy Logo"
              className={`w-48 h-48 object-contain ${
                theme === "dark" ? "brightness-90" : ""
              }`}
            />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-sm animate-bounce ${
            theme === "dark" ? "text-white" : "text-base-content"
          }`}
        >
          {title || "Welcome to Talksy!"}
        </h2>
        <p
          className={`text-base sm:text-lg leading-relaxed gap-10 ${
            theme === "dark" ? "text-gray-300" : "text-base-content/70"
          }`}
        >
          {subtitle || "Join the conversation today."}
          
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;