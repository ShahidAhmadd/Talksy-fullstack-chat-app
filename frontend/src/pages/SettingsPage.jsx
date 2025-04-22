import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center p-1 sm:p-2 pt-16 lg:pt-20">
      {/* Header */}
      <header className="w-full max-w-5xl mb-4 text-center">
        <h1 className="text-2xl font-bold text-base-content">Theme Store</h1>
        <p className="text-base-content/70 mt-1">
        Choose a chat theme to personalize your experience</p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4">
        {/* Theme Selection Card */}
        <section className="w-full lg:w-1/4 bg-base-100/90 backdrop-blur-md rounded-xl p-4 shadow-md border border-base-300">
          <h2 className="text-lg font-semibold mb-3 text-base-content">Theme Gallery</h2>
          <p className="text-sm text-base-content/60 mb-4">Swipe to explore styles</p>
          <div className="space-y-3 max-h-[55vh] overflow-y-auto overflow-x-hidden">
            {THEMES.map((t, index) => (
              <button
                key={t}
                className={`
                  w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                  focus:outline-none focus:ring-2 focus:ring-primary
                `}
                onClick={() => setTheme(t)}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-base-300">
                  <div className="h-full grid grid-cols-2 gap-0.5 p-0.5" data-theme={t}>
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-sm font-medium capitalize text-base-content">
                  {t}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Preview Card */}
        <section className="w-full lg:w-3/4 bg-base-100/90 backdrop-blur-md rounded-xl p-4 shadow-md border border-base-300">
          <h2 className="text-lg font-semibold mb-3 text-base-content">Live Preview</h2>
          <div className="bg-base-200 rounded-xl overflow-hidden shadow-inner">
            {/* Chat Container */}
            <div className="p-4">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Username</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;