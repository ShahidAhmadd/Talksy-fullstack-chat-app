import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser, logout } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        
        <div className="mt-3 flex items-center gap-2 lg:flex-row flex-col">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs hidden lg:block text-zinc-500"> ({onlineUsers.length - 1} online)</span>
        </div> 
      </div>

      <div className="flex-1 overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )} 
      </div>

      {authUser && (
        <div className="border-t border-base-300 w-full p-2 flex flex-col sm:flex-row gap-1 justify-center sm:justify-center lg:flex-row lg:justify-start">
          <Link
            to="/settings"
            className="btn btn-xs gap-1 bg-base-200 hover:bg-base-300 border-base-300 text-base-content transition-colors"
            title="Themes"
          >
            <Settings className="w-3 h-3" />
            <span className="hidden lg:inline text-xs">Themes</span>
          </Link>
          <Link
            to="/profile"
            className="btn btn-xs gap-1 bg-base-200 hover:bg-base-300 border-base-300 text-base-content transition-colors"
            title="Profile"
          >
            <User className="w-3 h-3" />
            <span className="hidden lg:inline text-xs">Profile</span>
          </Link>
          <button
            className="btn btn-xs gap-1 bg-red-500 hover:bg-red-600 text-white border-none transition-colors"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden lg:inline text-xs">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;