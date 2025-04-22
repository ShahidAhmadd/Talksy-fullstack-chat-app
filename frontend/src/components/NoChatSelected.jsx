import { MessageSquareText, MessagesSquare, MessageCircleHeart } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-gradient-to-br from-base-100/60 to-base-200/60">
      <style>
        {`
          @keyframes livelyChat {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          }
        `}
      </style>
      <div className="max-w-md text-center space-y-8">
        {/* Animated Typing Indicator */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-full bg-primary/25 flex items-center justify-center shadow-sm"
              style={{ animation: "livelyChat 1.6s ease-in-out infinite", animationDelay: "0ms" }}
            >
              <MessagesSquare className="w-7 h-7 text-primary" />
            </div>
            <div
              className="w-14 h-14 rounded-full bg-primary/25 flex items-center justify-center shadow-sm"
              style={{ animation: "livelyChat 1.6s ease-in-out infinite", animationDelay: "400ms" }}
            >
              <MessageCircleHeart className="w-7 h-7 text-primary" />
            </div>
            <div
              className="w-14 h-14 rounded-full bg-primary/25 flex items-center justify-center shadow-sm"
              style={{ animation: "livelyChat 1.6s ease-in-out infinite", animationDelay: "800ms" }}
            >
              <MessageSquareText className="w-7 h-7 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight drop-shadow-sm">
          Welcome to Talksy!
        </h2>
        <p className="text-base-content/70 text-base sm:text-lg leading-relaxed">
          Pick a chat from Contacts to start the conversation.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;