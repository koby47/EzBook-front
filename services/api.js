// src/services/api.js
import axios from "./axiosInstance";

export const api = {
  // Register new user
  async register(userData) {
    const res = await axios.post("/api/user/register", userData);
    return res.data;
  },

  //  Login user
  async login(loginData) {
    const res = await axios.post("/api/user/login", loginData);
    return res.data;
  },

  //  Login with Google
  async loginWithGoogle(googleToken) {
    const res = await axios.post("/api/user/google-login", { token: googleToken });
    return res.data;
  },

  //  Get current user info
  async getCurrentUser() {
    const res = await axios.get("/api/user/me");
    return res.data;
  },

  // Get all facilities (with optional filters)
  async getFacilities(params = "") {
    const res = await axios.get(`/api/facility${params}`);
    return res.data;
  },

  // Create facility (form-data upload)
  async createFacility(facilityData) {
    const formData = new FormData();
    for (const key in facilityData) {
      if (key === "pictures") {
        facilityData.pictures.forEach((pic) => formData.append("pictures", pic));
      } else {
        formData.append(key, facilityData[key]);
      }
    }

    const res = await axios.post("/api/facility", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  //  Book facility
  async bookFacility(bookingData) {
    const res = await axios.post("/api/bookings", bookingData);
    return res.data;
  },

  //  Get user bookings
  async getMyBookings() {
    const res = await axios.get("/api/bookings/mine");
    return res.data;
  },
};