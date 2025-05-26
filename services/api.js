const API_BASE_URL = "https://ezbook-api.onrender.com"
// import.meta.env.VITE_API_BASE_URL;


// Auth header helper
const getHeaders = (token = null, isJson = true) => {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

export const api = {
  // Register new user
  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Registration error:", data);
      throw new Error(data.message || "Registration failed");
    }
    return data;
  },

  // Login user
  async login(loginData) {
    const res = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(loginData),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Login error:", data);
      throw new Error(data.message || "Login failed");
    }

    // Don't save token/user here — handled by AuthContext
    return data;
  },
  // Login with Google token
async loginWithGoogle(googleToken) {
  const res = await fetch(`${API_BASE_URL}/api/user/google-login`, {
    method: "POST",
    headers: getHeaders(), // Content-Type: application/json
    body: JSON.stringify({ token: googleToken }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Google login error:", data);
    throw new Error(data.message || "Google login failed");
  }

  return data;
},

  // Get current logged-in user
  async getCurrentUser() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/user/me`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Get user error:", data);
      throw new Error(data.message || "Failed to get user");
    }
    return data;
  },

  // Get all facilities (with optional filtering)
  async getFacilities(params = "") {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/facility${params}`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Get facilities error:", data);
      throw new Error("Failed to fetch facilities");
    }
    return data;
  },

  // Create a facility (with image upload)
  async createFacility(facilityData) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (const key in facilityData) {
      if (key === "pictures") {
        facilityData.pictures.forEach((pic) =>
          formData.append("pictures", pic)
        );
      } else {
        formData.append(key, facilityData[key]);
      }
    }
    const res = await fetch(`${API_BASE_URL}/api/facility`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Create facility error:", data);
      throw new Error(data.message || "Failed to create facility");
    }
    return data;
  },

  // Book a facility
  async bookFacility(bookingData) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Booking error:", data);
      throw new Error(data.message || "Booking failed");
    }
    return data;
  },

  // Get user's own bookings
  async getMyBookings() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/bookings/mine`, {
      headers: getHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Fetch my bookings error:", data);
      throw new Error("Failed to fetch your bookings");
    }
    return data;
  },
};
