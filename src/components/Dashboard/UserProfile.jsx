import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await api.getCurrentUser();
      setUser(data);
      setFormData({ name: data.name, email: data.email });
    } catch (err) {
      toast.error("Failed to load user");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (avatarFile) {
        const form = new FormData();
        form.append("avatar", avatarFile);
        await api.uploadAvatar(form);
      }

      await api.updateProfile(formData);
      toast.success("Profile updated");
      setEditMode(false);
      fetchUser();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-6">
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="rounded-full w-full h-full object-cover border-4 border-blue-200 shadow"
                />
              </div>

              {editMode && (
                <div className="mt-3">
                  <label
                    htmlFor="avatarUpload"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Choose File
                  </label>
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
              <p className="text-blue-500 capitalize">{user.role}</p>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    disabled={!editMode}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-md bg-white border-blue-300 focus:outline-none ${
                      editMode ? "focus:ring focus:ring-blue-200" : "bg-gray-100"
                    }`}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    disabled={!editMode}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-md bg-white border-blue-300 focus:outline-none ${
                      editMode ? "focus:ring focus:ring-blue-200" : "bg-gray-100"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                {editMode ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="text-blue-600 hover:text-red-500 font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
