import axios from "axios";

const logOut = async (setLogged) => {
  try {
    // Send a GET request to the backend logout endpoint
    const response = await axios.get("http://localhost:5000/logout", {
      withCredentials: true, // Include cookies for session management
    });

    if (response.status === 200) {
      // Clear local storage and update the logged state
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
      setLogged("false");
      alert("Logged out successfully!");
    } else {
      alert("Failed to log out. Please try again.");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    alert("An error occurred while logging out.");
  }
};

export default logOut;
