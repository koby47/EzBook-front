// services/api.js
import { Form } from 'react-router-dom';
import axiosInstance from './axiosInstance';

export const api = {
  // Get all facilities
  async getFacilities(params = "") {
    const res = await axiosInstance.get(`/api/facility${params}`);
    return res.data.facilities; // ✅ ONLY return the array
  },




  // Get single facility by ID
async getFacilityById(id) {
  const res = await axiosInstance.get(`/api/facility/${id}`);
  return res.data.facility; // 
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
  // Upload user avatar
async uploadAvatar(formData) {
  const res = await axiosInstance.patch("/api/user/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
},

// Update profile name/email
async updateProfile(payload) {
  const res = await axiosInstance.patch("/api/user/me", payload);
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

async getManagerOverview() {
  const res = await axiosInstance.get("/api/manager/overview");
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
  },

  //  Update facility (with image upload)
  async updateFacility(id, data) {
    const formData = new FormData();

    for (const key in data) {
      if (key === "pictures" && Array.isArray(data.pictures)) {
        data.pictures.forEach((pic) => {
          formData.append("pictures", pic);
        });
      } else {
        formData.append(key, data[key]);
      }
    }

    const res = await axiosInstance.put(`/api/facility/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.facility;
  },

  //  Delete facility by ID
  async deleteFacility(id) {
    const res = await axiosInstance.delete(`/api/facility/${id}`);
    return res.data;
  },
 // Get all bookings (manager, admin)
  async getBookings() {
    const res = await axiosInstance.get("/api/bookings");
    return res.data;
  },

  // Update booking status (approve or cancel)
  async updateBookingStatus(id, status) {
    const res = await axiosInstance.put(`/api/bookings/${id}`, { status });
    return res.data;
  },
  
};

