import { type AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

const authProvider: AuthProvider = {
  // called when the user attempts to log in
  // { username, password }
  login: async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl + "/user/login", requestOptions);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      debugger;
    //   if (auth?.data?.isApproved !== 1) {
    //     alert("Your account is not approved yet. Please wait for approval.");
    //   throw new Error("Your account is not approved yet.");
    // }
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    const authData = localStorage.getItem("auth");
    const authCredentials = authData ? JSON.parse(authData) : null;
    if (authCredentials?.data?.userRole !== "1") {
      return Promise.reject("Access not allowed. Only vendor can login.");
    } 
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    return Promise.resolve();
  },
  async getIdentity() {
    const authData = localStorage.getItem("auth");
    const authCredentials = authData ? JSON.parse(authData) : null;
    const { id, fullName, avatar } = authCredentials?.data;
    const avatarUrl = !avatar ? `https://i.pravatar.cc/150` : "";
    return { id, fullName, avatar:avatarUrl , vendorId: localStorage.getItem("selectedVendor"), userRole: authCredentials?.data?.userRole };
  },
};

export default authProvider;
