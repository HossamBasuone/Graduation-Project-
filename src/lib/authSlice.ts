"use client"
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";




const initialState: { token: null | string, role:null|string } = {
  token:  null,
  role:  null,
};



const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); 
      const {role}:{role:string|null} = jwtDecode(action.payload);
      state.role = role;
      localStorage.setItem("role", role);
      
    },


    clearData(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const authReducer = authSlice.reducer;
export const { clearData, setToken} = authSlice.actions;
