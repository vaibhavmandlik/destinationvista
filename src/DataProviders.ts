import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
// import { uploadFile } from "../componets/SampleFiles/UploadFileButton";
// import { uploadFilePredictClass } from "../Interfaces";
import { stringify } from "query-string";
// import { ATS_API_URL, OLD_DOCUPLOAD_API } from "../config";
const apiUrl = import.meta.env.VITE_API_URL;

const objectToQueryString = (obj) => {
  return Object.keys(obj) 
    .map((key) => `${key.toLowerCase()}=${obj[key]}`)
    .join("&");
};

const sanitizeQueryParams=(value) =>{
  if (typeof value === "string") {
    // Check if the string contains commas
    if (value.includes(",")) {
      return value
        .split(",") // Split by commas
        .map(item => item.trim()) // Trim each part
        .join(","); // Join back with commas
    } else {
      return value.trim(); // Trim the entire string if no commas
    }
  }
  return value; // Return as is if not a string
}
// const API_URL_DOC = 'https://uatapiml.dvapply.com/applicant';
// const API_URL = ATS_API_URL;

// const OLD_DOCUPLOAD_API_URL = OLD_DOCUPLOAD_API;

// const API_URL_DOC = `${API_URL}/applicant`;


// let apiCalled = false;

// const httpClient = (url, options: any = {}) => {
//   if (!options.headers) {
//     options.headers = new Headers({ Accept: "application/json" });
//   }
//   // add your own headers here
//   // {tokendata:token,trn_id}
//   const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
//   options.headers.set("authorization", data?.tokendata || null);
//   options.headers.set("trn_id", data?.trn_id || null);
//   return fetchUtils
//     .fetchJson(url, options)
//     .then((res) => {
//       return res;
//     })
//     .catch((error: any) => {
//       return new Promise(async function (resolve, reject) {
//         //  debugger
//         if (error.status == 401 && !apiCalled) {
//           try {
//             apiCalled = true;
//             const localStorageData =
//               JSON.parse(<any>localStorage.getItem("auth")) || {};
//             const requestOptions = {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 refreshtoken: localStorageData?.data?.refreshtoken,
//               }),
//             };
//             const response: any = await fetch(
//               `${API_URL}/auth/refreshtoken`,
//               requestOptions
//             );
//             if (!response.ok) {
//               localStorage.removeItem("auth");
//               window.location.replace(
//                 window.location.protocol +
//                 "//" +
//                 window.location.host +
//                 window.location.href.split(
//                   window.location.protocol + "//" + window.location.host
//                 )[1]
//               );
//             } else {
//               const res = await response.json();
//               localStorage.removeItem("auth");
//               localStorage.setItem(
//                 "auth",
//                 JSON.stringify({
//                   ...localStorageData,
//                   data: {
//                     ...localStorageData?.data,
//                     tokendata: res?.data?.tokendata,
//                     refreshtoken: res?.data?.refreshtoken,
//                   },
//                 })
//               );
//               apiCalled = false;
//               const { data } =
//                 JSON.parse(<any>localStorage.getItem("auth")) || {};
//               options.headers.set("authorization", data?.tokendata || null);
//               return resolve(fetchUtils.fetchJson(url, options));
//             }
//           } catch (e: any) {
//             localStorage.removeItem("auth");
//             window.location.replace(
//               window.location.protocol +
//               "//" +
//               window.location.host +
//               window.location.href.split(
//                 window.location.protocol + "//" + window.location.host
//               )[1]
//             );
//           }
//           //   localStorage.removeItem('auth');
//           // sessionStorage.setItem('locationRequestToRedirect', window.location.href)
//           //   window.location.replace(window.location.protocol + '//' + window.location.host + window.location.href.split(window.location.protocol + '//' + window.location.host)[1])
//         }
//         reject({ message: error?.body?.message });
//       });
//     });
// };

// const baseDataProvider = jsonServerProvider(API_URL, <any>httpClient);

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const auth = localStorage?.getItem("auth");
  const { data } = auth ? JSON.parse(auth) : { data: null };
  options.headers.set("Authorization", `Bearer ${data?.accessToken}`);
  return fetchUtils.fetchJson(url, options);
};
const baseDataProvider = jsonServerProvider(apiUrl, httpClient);


export const dataProviders = {
  ...baseDataProvider,
  getList: async(resource:string, params:any) => {
    return baseDataProvider.getList(resource, params);
  },
};
