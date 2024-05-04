import Cookies from "js-cookie";

function getSignature(tickedId, contractAddress) {
  const token = Cookies.get("signature" + contractAddress + tickedId);

  if (!token) {
    return false; // User is not authenticated
  }

  return token; // User is authenticated
}

export default getSignature;
