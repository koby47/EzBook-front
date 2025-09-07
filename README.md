EzBook, a simple, secure platform that allows users to find and book facilities while allowing facility managers to list and manage their facilities and bookings.




# prerequisites

Node 18+ / npm 9+ (or yarn)

.env file (Vite requires VITE_ prefix)

# Required environment variables
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_GOOGLE_CLIENT_ID=your-firebase-client-id   # optional if using Google sign-in

Install & run
# install
npm install

# dev
npm run dev

# build
npm run build

# preview production build
npm run preview

# Folder structure (key files)
#src/
  App.jsx                // routes + lazy loading
  services/
    axiosInstance.js     // baseURL + auth header interceptor
    api.js                // wrapper for backend endpoints
  context/
    AuthContext.jsx      // stores user/token; login/logout helpers
  components/
    pages/
      LoginPage.jsx
      RegisterPage.jsx
      FacilityDetailsPage.jsx
    Dashboard/
      UserDashboardLayout.jsx
      FacilityManagerDashboard.jsx
      tabs/OverviewTab.jsx
           ManageFacilitiesTab.jsx
           BookingsTab.jsx
           NotificationsTab.jsx
           ManagerProfile.jsx
    ui/
      Gallery.jsx
      Spinner.jsx
      BookingModal.jsx #

# Important points

Auth: AuthContext reads/writes token and user to localStorage. Axios interceptor uses localStorage.getItem("token") to send Authorization: Bearer <token>.

API shape: Some endpoints return a top-level object: e.g. { total, page, count, facilities }. Your components should check .facilities or normalize on recv.

# Role-based navigation:

if (data.user.role === "manager") navigate("/manager-dashboard");
else navigate("/dashboard");


# Gallery:
 Uses Cloudinary base URL if images are stored as Cloudinary public_ids. CLOUDINARY_BASE_URL used inside Gallery.jsx.

Add / Edit facility: forms use FormData and multipart/form-data header. api.createFacility() and api.updateFacility() handle this.

Manager overview: call api.getManagerOverview() to populate OverviewTab.