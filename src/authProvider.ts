import { type AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Custom error to be thrown when a user logs in but does not have a vendor profile.
 * This allows the UI to catch this specific error, store the partial authentication
 * data, and redirect the user to the vendor creation page.
 */
export class VendorNotFoundError extends Error {
  // We use 'any' here for simplicity, but you could define a strict type for your auth data.
  public readonly authData: any;

  constructor(message: string, authData: any) {
    super(message);
    this.name = 'VendorNotFoundError';
    this.authData = authData;
  }
}

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

      if(auth?.data?.userRole!== "1") {
        throw new Error("Access not allowed. Only vendor can login.");
      }

      // call api to check if the user has a vendor profile
      const { id: userId, accessToken } = auth.data;
      if (!userId || !accessToken) {
        throw new Error("Login failed: Missing user ID or access token.");
      }

      const vendorCheckHeaders = new Headers();
      vendorCheckHeaders.append("Authorization", `Bearer ${accessToken}`);

      const vendorRequestOptions: RequestInit = {
        method: 'GET',
        headers: vendorCheckHeaders,
      };

      const vendorResponse = await fetch(`${apiUrl}/vendor?userId=${userId}`, vendorRequestOptions);
      if (!vendorResponse.ok) {
        throw new Error(`Failed to check vendor status: ${vendorResponse.statusText}`);
      }
      const vendors = await vendorResponse.json();
      if (vendors.length === 0) {
        // If no vendor profile exists, throw a custom error containing the auth data.
        // This can be caught in a custom Login page to handle redirection.
        throw new VendorNotFoundError(
          "Vendor profile not found. Please create one.",
          auth.data
        );
      }
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
    return { id, fullName, avatar:avatarUrl , vendorId: localStorage.getItem("selectedVendor"), userRole: authCredentials?.data?.userRole, isApproved: authCredentials?.data?.isApproved };
  },
};

export default authProvider;
