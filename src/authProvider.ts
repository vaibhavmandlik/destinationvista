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

      if (auth?.data?.userRole !== "1") {
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
      } else {
        const approvedVendor = vendors.find(
          (vendor: any) => vendor.isApproved === "1"
        );

        if (!approvedVendor) {
          throw new Error("Your vendor account has not been approved yet.");
        }

        localStorage.setItem("selectedVendor", approvedVendor.id);
        auth.data.isApproved = approvedVendor.isApproved;
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
    localStorage.removeItem("selectedVendor"); // ✅ clear vendor selection too

    // ✅ Force redirect to vendor login page
    window.location.href = "/vendor/login";
    return Promise.resolve();
  },

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      localStorage.removeItem("selectedVendor");

      // ✅ Redirect to vendor login if unauthorized
      window.location.href = "/vendor/login";

      return Promise.reject();
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    const authData = localStorage.getItem("auth");
    const authCredentials = authData ? JSON.parse(authData) : null;

    // 🚨 Not logged in
    if (!authCredentials) {
      window.location.href = "/vendor/login";
      return Promise.reject();
    }

    // 🚨 Logged in but not a vendor
    if (authCredentials?.data?.userRole !== "1") {
      localStorage.removeItem("auth");
      localStorage.removeItem("selectedVendor");
      window.location.href = "/vendor/login";
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
    if (!authData) {
      // Not logged in, return a safe default
      return Promise.reject("No identity");
    }

    const authCredentials = JSON.parse(authData);
    const { id, fullName, avatar } = authCredentials?.data || {};

    return {
      id: id || null,
      fullName: fullName || "Unknown User",
      avatar: avatar || "https://i.pravatar.cc/150",
      vendorId: localStorage.getItem("selectedVendor"),
      userRole: authCredentials?.data?.userRole,
      isApproved: authCredentials?.data?.isApproved,
    };
  },

};

export default authProvider;
