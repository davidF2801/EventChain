import Cookies from "js-cookie";

function useToken(navigate) {
  const token = Cookies.get("token");

  if (!token) {
    navigate("/login");
  }

  return token;
}

export default useToken;
