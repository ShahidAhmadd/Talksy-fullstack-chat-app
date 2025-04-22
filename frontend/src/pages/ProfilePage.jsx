import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Clock, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-base-100 to-base-300 flex flex-col p-1 sm:p-2 pt-16 lg:pt-20">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row gap-4 p-4">
       

        {/* Main Content */}
        <main className="w-full bg-base-100/95 backdrop-blur-md rounded-xl p-8 shadow-md border border-base-300">

          <h1 className="text-3xl font-bold mb-4 text-base-content text-center pb-2 pt-2">My Profile</h1>

          {/* Profile Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-base-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-primary text-base-100 p-2 rounded-full cursor-pointer
                  hover:bg-primary-focus transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-6 h-6" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60 mt-2">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 ">
            <div className="space-y-6  ">
              <div className="p-4 bg-base-200 rounded-lg border border-base-300">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-base-content" />
                  <h4 className="text-md font-medium">Full Name</h4>
                </div>
                <p className="text-base">{authUser?.fullName}</p>
              </div>
              <div className="p-4 bg-base-200 rounded-lg border border-base-300 ">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-base-content " />
                  <h4 className="text-md font-medium">Email Address</h4>
                </div>
                <p className="text-base">{authUser?.email}</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="p-4 bg-base-200 rounded-lg border border-base-300">
              <h4 className="text-md font-medium mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-base-content" /> Account Details
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Member Since  </span>
                  <span> : {authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span> Account Status</span>
                  <span className="flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-4 h-4" /> Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;