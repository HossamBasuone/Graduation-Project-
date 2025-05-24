// lib/initClientState.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice"; // import your action

export default function InitClientState() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return null; // this component doesn't render anything
}
