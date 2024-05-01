import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function useRequireAuth() {
  const token = Cookies.get("token");

  if (!token) {
    return null; // User is not authenticated
  }

  return token; // User is authenticated
}

export default useRequireAuth;
