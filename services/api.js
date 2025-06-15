// services/api.js
import axiosInstance from './axiosInstance';

export const api = {
  // Get all facilities
  async getFacilities(params = "") {
    const res = await axiosInstance.get(`/api/facility${params}`);
    return res.data.facilities; // ✅ ONLY return the array
  },

  // Register
  // async register(userData) {
  //   const res = await axiosInstance.post("/api/user/register", userData);
  //   return res.data;
  // },



  // Get single facility by ID
async getFacilityById(id) {
  const res = await axiosInstance.get(`/api/facility/${id}`);
  return res.data.facility; // Adjust based on actual backend response shape
},

  // Login
  async login(userData) {
    const res = await axiosInstance.post("/api/user/login", userData);
    return res.data;
  },

  // Login with Google
  async loginWithGoogle(googleToken,role ="user" ) {
    const res = await axiosInstance.post("/api/user/google-login", {
      token: googleToken,
      role,
    });
    return res.data;
  },

  // Get logged-in user
  async getCurrentUser() {
    const res = await axiosInstance.get("/api/user/me");
    return res.data.user;
  },

  // Book facility
  async bookFacility(bookingData) {
    const res = await axiosInstance.post("/api/bookings", bookingData);
    return res.data;
  },
 


  // Get user's bookings
  async getMyBookings() {
    const res = await axiosInstance.get("/api/bookings/mine");
    return res.data;
  },
  async exportBookingsPDF() {
  const res = await axiosInstance.get("/api/bookings/mine/pdf", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "EzBook-Bookings.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
}
,
async userUpdateBooking(id, payload) {
  if (!id) {
    console.error("Missing booking ID", payload);
    throw new Error("Booking ID is missing");
  }
  const res = await axiosInstance.patch(`/api/bookings/user/${id}`, payload);
  return res.data;
}
,
 async cancelBooking(id) {
  const res = await axiosInstance.patch(`/api/bookings/user/${id}`, {
    status: "cancelled",
  });
  return res.data;
},



  // Create a new facility (with image upload)
  async createFacility(facilityData) {
    const formData = new FormData();
    for (const key in facilityData) {
      if (key === "pictures") {
        facilityData.pictures.forEach((pic) => {
          formData.append("pictures", pic);
        });
      } else {
        formData.append(key, facilityData[key]);
      }
    }

    const res = await axiosInstance.post("/api/facility", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  }
  
};

