const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Auth header helper

const getHeaders =(token = null, isJson = true ) => {

    const headers ={};
    if (token) headers ["Authorization"] = `Bearer ${token}`;
    if (isJson) headers["Content-Type"] ="application/json";
    return headers;

};

export const api ={
    //Register new user

    async register (userData){
        const res = await fetch (`${API_BASE_URL}/api/user/register`,{
          method:"Post",
          headers:getHeaders(),
          body:JSON.stringify(userData),  
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message||"Registration failed");
        return data;
    },
    //login

    async login (loginData){
        const res =await fetch(`${ API_BASE_URL}/api/user/login`,{
        method:"POST",
        headers:getHeaders(),
        body:JSON.stringify(loginData),
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message ||"Login failed");

        //Store token/user in localStorage
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        return data;
    },

       //Get current logged-in user
       async getCurrentUser (){
        const token = localStorage.getItem("token");
        const res = await fetch(`{API_BASE_URL}/api/user/me`,{
            headers: getHeaders(token),
        });
        const data = await res.json();
        if(!res.ok)throw new Error(data.message || "Failed to get user");
        return data;

       },
       //Get all facilities (with optional filtering)
      async getFacilities(params =""){
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/facility${params}`,{
            headers:getHeaders(token),
        });
        const data = await res.json();
        if(!res.ok) throw new Error("Failed to fetch facilities");
        return data
      },

      //create a facility (with image upload)
      async createFacility(facilityData){
        const token =localStorage.getItem ("token");
        const formData = new FormData();
        for(const key in facilityData){
            if (key === "pictures"){
                facilityData.pictures.forEach((pic) =>
                formData.append("pictures",pic)
            );
            }else{
                formData.append(key, facilityData[key]);
            }
        }
        const res = await fetch(`${API_BASE_URL}/api/facility`,{
            method :"POST",
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Failed to create facility");
        return data;
      },

      //Book a facility
      async bookFacility(bookingData){
        const token =localStorage.getItem("token");
        const res =await fetch(`${API_BASE_URL}/api/bookings`,{
           method:"POST",
           headers:getHeaders(token) ,
           body:JSON.stringify(bookingData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error (data.message ||"Booking failed");
        return data;
      },
      //Get user's own bookings
      async getMyBookings(){
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/bookings/mine`,{
            headers:getHeaders(token),
        });
        const data = await res.json();
        if(!res.ok) throw new Error("Failed to fetch your bookings");
        return data;
      },
};