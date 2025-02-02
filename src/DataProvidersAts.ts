import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import { uploadFile } from "../componets/SampleFiles/UploadFileButton";
import { uploadFilePredictClass } from "../Interfaces";
import { stringify } from "query-string";
import { ATS_API_URL, OLD_DOCUPLOAD_API } from "../config";
import { Type } from "react-toastify/dist/utils";
import ca from "date-fns/locale/ca";
import { identity, property } from "lodash";

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
const API_URL = ATS_API_URL;

const OLD_DOCUPLOAD_API_URL = OLD_DOCUPLOAD_API;

const API_URL_DOC = `${API_URL}/applicant`;


let apiCalled = false;

const httpClient = (url, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // add your own headers here
  // {tokendata:token,trn_id}
  const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
  options.headers.set("authorization", data?.tokendata || null);
  options.headers.set("trn_id", data?.trn_id || null);
  return fetchUtils
    .fetchJson(url, options)
    .then((res) => {
      return res;
    })
    .catch((error: any) => {
      return new Promise(async function (resolve, reject) {
        //  debugger
        if (error.status == 401 && !apiCalled) {
          try {
            apiCalled = true;
            const localStorageData =
              JSON.parse(<any>localStorage.getItem("auth")) || {};
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                refreshtoken: localStorageData?.data?.refreshtoken,
              }),
            };
            const response: any = await fetch(
              `${API_URL}/auth/refreshtoken`,
              requestOptions
            );
            if (!response.ok) {
              localStorage.removeItem("auth");
              window.location.replace(
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.href.split(
                  window.location.protocol + "//" + window.location.host
                )[1]
              );
            } else {
              const res = await response.json();
              localStorage.removeItem("auth");
              localStorage.setItem(
                "auth",
                JSON.stringify({
                  ...localStorageData,
                  data: {
                    ...localStorageData?.data,
                    tokendata: res?.data?.tokendata,
                    refreshtoken: res?.data?.refreshtoken,
                  },
                })
              );
              apiCalled = false;
              const { data } =
                JSON.parse(<any>localStorage.getItem("auth")) || {};
              options.headers.set("authorization", data?.tokendata || null);
              return resolve(fetchUtils.fetchJson(url, options));
            }
          } catch (e: any) {
            localStorage.removeItem("auth");
            window.location.replace(
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.href.split(
                window.location.protocol + "//" + window.location.host
              )[1]
            );
          }
          //   localStorage.removeItem('auth');
          // sessionStorage.setItem('locationRequestToRedirect', window.location.href)
          //   window.location.replace(window.location.protocol + '//' + window.location.host + window.location.href.split(window.location.protocol + '//' + window.location.host)[1])
        }
        reject({ message: error?.body?.message });
      });
    });
};

const baseDataProvider = jsonServerProvider(API_URL, <any>httpClient);

export const dataProvidersAts = {
  ...baseDataProvider,
  create: async (resource, params) => {

    if (resource == "predefinedmessage") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const raw = JSON.stringify({ ...params.data, subscriberid: subscriberId });

        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/addpredefinedmessages`,
          {
            method: "POST",
            body: raw,
          }
        );
        // const r = json;
        // const res = {
        //   data: {
        //     ...r?.records,
        //   },
        // };
        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
    if (resource == "predefinedmessageAdmin") {
      try {
        // const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        // const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        // const SubscriberDataJson = JSON.parse(SubscriberData);
        // const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const raw = JSON.stringify({ ...params.data });

        const { json, headers, status }: any = await httpClient(
          API_URL + `/admin/predefinedmessages`,
          {
            method: "POST",
            body: raw,
          }
        );
       
       
        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
      if (resource === "updatereviewdone") {
        try {
          const raw = JSON.stringify({ ...params.data });
          const { json, headers, status }: any = await httpClient(
            API_URL + `/common/updatereviewdone`,
            {
              method: "POST",
              body: raw,
            }
          );
          const r = json;
          const res = {
            data: {
              id: params?.data?.applicationnumber,
              ...r?.records,
            },
          };
          return res;
        } catch (e: any) {
          throw new Error(e.message);
        }
      }
    //revoke
    if (resource === "revoke") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/revokeLandlord?ID=${params?.data?.ID}`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params?.data?.ID,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "addupdatetermsandcondition") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/addupdatetermsandcondition`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: 1,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "addCustomValidationMessage") {
      try {
        const raw = JSON.stringify({ ...params.data, userRole: params.data.userRole || 'admin' });
        const { json, headers, status }: any = await httpClient(
          API_URL + `/applicant/income/addCustomValidationMessage`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: 1,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
      if (resource == "submittermsandconditions") {
        try {
          const raw = JSON.stringify({ ...params.data });
          const { json, headers, status }: any = await httpClient(
            API_URL + `/subscriber/agreeterms`,
            {
              method: "POST",
              body: raw,
            }
          );
          const r = json;
          const res = {
            data: {
              id: 1,
              ...r?.records,
            },
          };
          return res;
        } catch (e: any) {
          throw new Error(e.message);
        }
      } else if (resource == "updatelandlordtandc") {
        try {
          const formdata = new FormData();
          formdata.append("IsTermsAccept", params.data.agreeterms);
          formdata.append("IsTermsResign", "0");
          formdata.append("TermsConditions", params.data.TermsConditions);
          formdata.append("files", params.data.signatureImage)
          // const raw = JSON.stringify({ ...params.data });
          const { json, headers, status }: any = await httpClient(
            API_URL + `/subscriber/updatelandlordtandc`,
            {
              method: "POST",
              body: formdata,
            }
          );
          const r = json;
          const res = {
            data: {
              id: 1,
              ...r?.records,
            },
          };
          return res;
        } catch (e: any) {
          throw new Error(e.message);
        }
      }
    if (resource == "addupdatetermsandcondition_admin") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/admin/updatetermsandcondition',
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: 1,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "addSystemNotification") {
      // 
      try {
        const raw = JSON.stringify({ ...params.data, ID: params.data.id || 0 });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/admin/addSystemNotification',
          {
            method: "POST",
            body: raw,
          }
        );

        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "addEditAdminResource") {
      // 
      try {
        //const raw = JSON.stringify({ ...params.data,ID: params.data.id || 0 });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/admin/addEditAdminResource',
          {
            method: "POST",
            body: params.data,
          }
        );

        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "updateprofiledocumentsettigs") {
      // 
      try {

        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/subscriber/updateprofiledocumentsettigs',
          {
            method: "POST",
            body: raw,
          }
        );

        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "updateprofilesettigs") {
      // 
      try {

        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/subscriber/updateprofilesettigs',
          {
            method: "POST",
            body: raw,
          }
        );

        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "addupdateapplicationprofile") {
      // 
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const raw = JSON.stringify({ ...params.data, SubscriberID: subscriberId });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/subscriber/addupdateapplicationprofile',
          {
            method: "POST",
            body: raw,
          }
        );

        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getCollectiveListOfPropertyAndOffice") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + '/common/getCollectiveListOfPropertyAndOffice',
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: 1,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "reprocessEmployer") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/reprocessEmployer`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params?.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "automovedocument") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL + `/admin/automovedocument?application_document_id=${params?.data?.application_document_id}`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params?.data?.application_document_id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getscreeningreport") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};


      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", data?.tokendata || null);

      const raw = JSON.stringify(params.data);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `${API_URL}/subscriber/getscreeningreport`,
          requestOptions
        );

        if (response.status != 200) {
          const result = await response.json();
          throw new Error(result?.message);
        }
        const result = await response.blob();
        const url = window.URL.createObjectURL(result);

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.click();

        return {
          data: { id: 1 },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "loginFromAdminDashboard") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json }: any = await httpClient(
          `${API_URL_DOC}/users/LoginFromAdminDashboard`,
          {
            method: "POST",
            body: raw,
          }
        );
        // const r = await result.json();
        const res = {
          data: {
            id: 1,
            ...json,
          },
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }

    if (resource === "loginFromAdminDashboardInvitedApp") {
      try {
        const { json, headers, status }: any = await httpClient(`${API_URL}/common/openSentInviteApp`, {
          method: 'POST',
          body: JSON.stringify(params.data),
        });
        return {
          data: { id: 1, ...json }
        };
      } catch (e) {
        throw new Error("Applicant is inactive or not found!");
      }
    }

    if (resource === "generateOTP_docupload") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json }: any = await httpClient(
          `${OLD_DOCUPLOAD_API_URL}/upload/GenerateToken`,
          {
            method: "POST",
            body: raw,
          }
        );
        // const r = await result.json();
        const res = {
          data: {
            id: 1,
            ...json,
          },
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "mlclassdetails") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json }: any = await httpClient(
          `${API_URL_DOC}/ml/mlclassdetails`,
          {
            method: "POST",
            body: raw,
          }
        );
        // const r = await result.json();
        const res = {
          data: {
            ...json,
          },
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "generateOtp") {
      try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({ ...params.data });
        const result: any = await fetch(API_URL_DOC + "/auth/GenerateOtp", {
          method: "POST",
          body: raw,
          headers: myHeaders,
        });

        const r = await result.json();
        const res = {
          data: {
            id: params.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "logout") {
      try {
        const { json }: any = await httpClient(API_URL + `/account/logout`, {
          method: "POST",
        });
        const r = json;
        const res = {
          data: {
            id: params.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "loginTokenCheckDocupload") {
      try {
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const raw = JSON.stringify({ ...params.data, token: data?.tokendata });
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/auth/superuser`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "fileUpload") {
      try {
        const formdata = new FormData();
        formdata.append("trn_id", params?.data?.trn_id);
        for (let i = 0; i < params?.data?.files.length; i++) {
          formdata.append("files[]", params?.data?.files[i]);
        }
        formdata.append("document_id", params?.data?.document_id);
        formdata.append("source_id", params?.data?.source_id);
        formdata.append("allowOfferLetter", params?.data?.allowOfferLetter);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/applicant/document`,
          {
            method: "POST",
            body: formdata,
          }
        );
        return { data: { ...params, ...json, id: params?.data?.trn_id } };
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    if (resource === "income") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/addSource`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "updateApplicationStatus") {
      try {
        const raw = JSON.stringify({ ...params.data });
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/document/updateApplicationStatus`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.data.trn_id,
            ...r,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "addcoappcosigner") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/addcoappcosigner`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "sendemailtoapplicant") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/sendemailtoapplicant`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "sendsmstoapplicant") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/sendsmstoapplicant`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "sendsecondaryapp") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/sendsecondaryapp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { ...res.data },
        };
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    } else if (resource == "addnewapplication") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/addnewapplication`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "mergeApplications") {
      try {
        let output = `NewApplication=${params.data[0]}`; // Start with the NewApplication part

        // Add OldApplication parts
        for (let i = 1; i < params.data.length; i++) {
          output += `&OldApplication=${params.data[i]}`;
        }
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/mergeapplication?${output}`,
          {
            method: "POST",
            // body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "saveVerificationStatus") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + "/income/saveVerificationStatus",
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );

        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "saveSOCRComment") {
      try {
        const raw = JSON.stringify(params.data);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/document/saveSOCRComment`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "addNotes") {
      try {
        const raw = JSON.stringify(params.data);

        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/addNotes`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "approvedWithConditions") {
    
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", data?.tokendata || null);

      const raw = JSON.stringify(params.data);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          API_URL +
          `/subscriber/addupdatelandlordadversedecision?subscriberid=${params.data.subscriberid}`,
          requestOptions
        );

        let result;
        if (params.data.IsEmail) {
          result = await response.json();
        } else {
          result = await response.blob();
          const url = window.URL.createObjectURL(result);

          const a = document.createElement("a");
          a.href = url;
          if (params.data.IsPrint) a.target = "_blank";
          else a.download = "docs.pdf"; // Set the desired file name
          a.click();

          // Clean up by revoking the URL object
          window.URL.revokeObjectURL(url);
        }
        return {
          data: {
            ...params.data,
            id: 1,
          },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "savedetails") {
      try {
        const raw = JSON.stringify(params.data);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/contextual/savedetails`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resendinvite") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/resendinvite`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "shareappreport") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/shareappreport`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resendshareappreport") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/resendshareappreport`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "accountLogin") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/Login`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
            // headers: {"Content-Type": "application/json"},
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "updatenewtagsection") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/updatenewtagsection`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "updatenewtagapp") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/updatenewtagapp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "forgotPassword") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/forgotPassword`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "forgotUsername") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/forgetUsername`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "mfa_VerifyOtp") {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(params.data);

        const requestOptions: any = {
          method: "POST",
          headers: myHeaders,
          credentials: "include",
          body: raw,
        };

        const response = await fetch(
          API_URL + "/account/VerifyOtp",
          requestOptions
        );
        // await response.text();
        const result = await response.json();

        if (response.status != 200) {
          throw new Error(result.message);
        }
        return {
          data: {
            id: 1,
            ...result,
          },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "mfa_sendmfaallotp") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/sendmfaallotp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "mfa_SendMfaEmailOtp") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/SendMfaEmailOtp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "mfa_sendmfasmsotp") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/sendmfasmsotp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resetPassword") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/resetPassword`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //change password for subscriber user setup
    else if (resource == "changePassword") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};

      const headers = new Headers();
      headers.append("authorization", data?.tokendata || null);
      headers.append("trn_id", data?.trn_id || null);
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/changepassword`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "processScreening") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/process-screening`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-property") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-property`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-property") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-property`,
          {
            method: "PUT",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-floor") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-floor`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-floor") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-floor`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-unit") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-unit`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "saveiddetail") {
      try {
        const raw = JSON.stringify(params.data);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/applicant/saveiddetail`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "savePayment") {
      try {
        const raw = JSON.stringify(params.data);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/stripe/payment`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "savedetails") {
      try {
        const raw = JSON.stringify(params.data);
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/contextual/savedetails`,
          {
            method: "POST",
            body: raw,
          }
        );
        return {
          data: { id: 1, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resendinvite") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/resendinvite`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "shareappreport") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/shareappreport`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resendshareappreport") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/resendshareappreport`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "accountLogin") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/Login`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
            // headers: {"Content-Type": "application/json"},
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "updatenewtagsection") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/updatenewtagsection`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "updatenewtagapp") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/updatenewtagapp`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "forgotPassword") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/forgotPassword`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "resetPassword") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/account/resetPassword`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "processScreening") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/process-screening`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-property") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-property`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-property") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-property`,
          {
            method: "PUT",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-floor") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-floor`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-floor") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-floor`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-unit") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-unit`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "update-template-status") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/subscriber/enableDisableTemplate`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //for admin manage user
    else if (resource == "setinactive") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/admin/setinactive`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //for subscriber user setup
    else if (resource == "setinactive-subscriber") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/subscriber/setinactive`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "update-email-template-details") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/subscriber/updateEmailTemplateData`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //for admin
    else if (resource == "update-admin-template-status") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/admin/enableDisableTemplate`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    else if (resource == "admin-update-email-template-details") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/admin/updateEmailTemplateData`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }




    else if (resource == "update-unit") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-unit`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-integration-setting-rule") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/integration-setting-rule`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-integration-setting-rule") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/integration-setting-rule`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-subscriber") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-subscriber`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-subscriber") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-subscriber`,
          {
            method: "PUT",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //add admin permission role
    else if (resource == "add-adminRole-permission") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/addrole`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //add update usersetup
    else if (resource == "add-user") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/registeruser`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //add schedule report
    else if (resource == "add-schedule-report") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/AddUpdateSubscriberReportScheduler`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //preauth quetion
    else if (resource == "addupdatepreauthquestions") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/addupdatepreauthquestions`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //add user- for admin user setup
    else if (resource == "add-user-admin-user-setup") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/register`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //add new role of user permission
    else if (resource == "add-role-permission") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/addrole`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "subscriber-status") {
      const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      const SubscriberDataJson = JSON.parse(SubscriberData);
      const subscriberId = SubscriberDataJson?.value || data?.subscriberid;

      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/subscriber-status?subscriberID=${params?.data?.subscriberID || subscriberId}&status=${params?.data?.status}`,
          {
            method: "PUT",
            // body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-hierarchy-levels") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/hierarchy-levels`,
          {
            method: "POST",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-hierarchy-levels") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/hierarchy-levels`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "updateStripeAccount") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/addStripe`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "add-office") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/add-office`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "update-office") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/update-office`,
          {
            method: "PUT",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == "import-xls") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/import-xls`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "import-xls-susbriber-userSetup") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/import`,
          {
            method: "POST",
            body: params?.data,
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource == "sendLeaseDocument") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/document/sendLeaseDocument?trn_id=${params?.data?.trn_id}&url=${params?.data?.url}`,
          {
            method: "POST",
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    return baseDataProvider.create(resource, params);
  },
  getOne: async (resource, params) => {
    
    if (resource === "getapplicationprofiledetails") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/getapplicationprofiledetails?id=${params?.id || ""}`,

        );

        const r = json;

        const res = {
          data: { ...r?.data, id: 1 },
          // SubscriberID:subscriberId
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getsubscribermanagerandleads") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/getsubscribermanagerandleads?subscriberid=${subscriberId}`
        );
        const r = json;
        const res = {
          data: { ...r, id: 1 },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "viewadverseletter") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/viewadverseletter?ApplicantID=${params?.id}&ApplicationStatus=${params?.meta?.ApplicationStatus}`
        );
        const r = json;
        const res = {
          data: { ...r, id: 1 },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
      if (resource === "getEmployerValidationCheck") {
        try {
          const { json, headers, status }: any = await httpClient(
            API_URL + `/subscriber/getEmployerValidationCheck/${params?.id}`
          );
          const r = json;
          const res = {
            data: { ...r?.data, id: 1 },
          };
          return res;
        } catch (e: any) {
          throw new Error(e.message);
        }
      }

      else
        if (resource === "getBankValidationCheck") {
          try {
            const { json, headers, status }: any = await httpClient(
              API_URL + `/subscriber/getBankValidationCheck/${params?.id}`
            );
            const r = json;
            const res = {
              data: { ...r?.data, id: 1 },
            };
            return res;
          } catch (e: any) {
            throw new Error(e.message);
          }
        } else
          if (resource === "getIDValidationCheck") {
            try {
              const { json, headers, status }: any = await httpClient(
                API_URL + `/applicant/applicant/getIDValidationCheck/${params?.id}`
              );
              const r = json;
              const res = {
                data: { ...r?.records, id: 1 },
              };
              return res;
            } catch (e: any) {
              throw new Error(e.message);
            }
          } else
            if (resource === "getTermsCondition") {
              try {
                const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
                const { json, headers, status }: any = await httpClient(
                  API_URL + `/subscriber/gettandc?subscriberid=${data?.subscriberid}`
                );
                const r = json;
                const res = {
                  data: { ...r?.[0], id: 1 },
                };
                return res;
              } catch (e: any) {
                throw new Error(e.message);
              }
            }

            else if (resource === "getTermsConditionLandlord") {
              try {
                const { json, headers, status }: any = await httpClient(
                  API_URL + `/subscriber/getlandlordtandc`
                );
                const res = {
                  data: { Description: json?.data, id: 1 },
                };
                return res;
              } catch (e: any) {
                throw new Error(e.message);
              }
            }
            ///move documents
            else if (resource === "getsectionavailable") {
              try {
                const { json, headers, status }: any = await httpClient(
                  API_URL + `/admin/getsectionavailable?applicantID=${params?.id}`
                );
                const r = json;
                const res = {
                  data: { ...r?.data },
                };
                return res;
              } catch (e: any) {
                throw new Error(e.message);
              }
            }

    if (resource === "getTokkenDetails") {
      try {
        // const raw=JSON.stringify({token:params.id});
        // const {json}:any = await httpClient(API_URL + `/auth/gettokendetails`, {
        //   method: "GET",
        //   body:raw,
        // });
        // const r = json;

        const { json, headers, status }: any = await httpClient(
          API_URL + `/auth/gettokendetails?token=${params.id}`
        );
        const r = json;
        const res = {
          data: { ...r?.data, id: params.id },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getApplicantDetails") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/auth/GetApplicantDetails/${params.id}`
        );
        const r = json;
        const res = {
          data: { ...r?.records, id: params.id },
        };

        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "mlclassdetails") {
      try {
        const { json }: any = await httpClient(
          API_URL_DOC + `/ml/getTemplateById/${params.id}`,
          {
            method: "GET",
          }
        );
        const r = json;
        const res = {
          data: {
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getSubscriberProfileSection_new") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/document/getSubscriberProfileSection_new/${params.id}`
        );
        const r = json;
        const res = {
          data: {
            id: params.id,
            status: r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "proofOfIdsData") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/applicant/getidentification/${params.id}`
        );
        const r = json;
        let otherNoDocReason: string | null = null;
        let noDocReason: string | null = null;
        if (r?.records.identification_data.file) {
          otherNoDocReason = null;
          noDocReason = null;
        } else if (!r?.records.identification_data.no_doc_reason) {
          otherNoDocReason = null;
          noDocReason =
            "I do not currently have access to document(s), but can provide later";
        } else if (
          r?.records.identification_data.no_doc_reason !=
          "I do not currently have access to document(s), but can provide later" &&
          r?.records.identification_data.no_doc_reason !=
          "I do not have proof of identification"
        ) {
          otherNoDocReason = r?.records.identification_data.no_doc_reason;
          noDocReason = "Other";
        } else {
          otherNoDocReason = null;
          noDocReason = r?.records.identification_data.no_doc_reason;
        }
        const res = {
          data: {
            id: params.id,
            ...r?.records,
            identification_data: {
              ...r?.records.identification_data,
              // no_doc_reason: noDocReason,
              // other_reason: otherNoDocReason
            },
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "income") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/getIncome/${params.id}`
        );
        const r = json;
        // finding a state default value
        const statedefaultValue = (employer_state: string) => {
          const findStatedefaultValue = r?.records?.States?.find(
            (item) => item?.StateShortCode == employer_state
          );
          if (findStatedefaultValue) {
            return {
              label: findStatedefaultValue
                ? findStatedefaultValue?.StateShortCode +
                " - " +
                findStatedefaultValue?.StateName
                : null,
              value: findStatedefaultValue ? findStatedefaultValue?.ID : null,
            };
          } else {
            return null;
          }
        };
        const newRes1 = {
          ...r,
          records: {
            ...r?.records,
            employment_details: {
              ...r?.records.employment_details,
              employer: r?.records.employment_details.employer.map((item) => {
                return {
                  ...item,
                  files: item.files.map((file) => {
                    return {
                      ...file,
                      Pay_date: file?.Pay_date?.split("T").shift(),
                      End_date: file?.End_date?.split("T").shift(),
                      Start_date: file?.Start_date?.split("T").shift(),
                      Pay_frequency: {
                        value: file.Pay_frequency,
                        label: file.Pay_frequency,
                      },
                    };
                  }),
                  employer_status: item?.employer_status
                    ? {
                      value: item?.employer_status,
                      label: item?.employer_status,
                    }
                    : null,
                  pay_frequency: item?.pay_frequency
                    ? { value: item?.pay_frequency, label: item?.pay_frequency }
                    : null,
                  employer_state: statedefaultValue(item?.employer_state),
                  availableToUpload:
                    item.files.length > 0
                      ? "Yes"
                      : item.no_doc_reason == null
                        ? ""
                        : "No",
                  fileCount: item.files.length,
                };
              }),
              employerCount: r.records.employment_details.employer.length,
            },
          },
        };
        const res = {
          data: {
            id: params.id,
            ...newRes1.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "bankDoc") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/getbank/${params.id}`
        );
        const r = json;
        const newRes1 = {
          ...r,
          records: {
            ...r?.records,
            banking_details: {
              ...r?.records.banking_details,
              banking: r?.records.banking_details.banking.map((item) => {
                return {
                  ...item,
                  availableToUpload:
                    item.files.length > 0
                      ? "Yes"
                      : item.no_doc_reason != null
                        ? "No"
                        : "",
                  no_doc_reason:
                    item.files.length > 0
                      ? null
                      : item.no_doc_reason ||
                      "I don't currently have access to document(s), but can provide later",
                  fileCount: item.files.length,
                };
              }),
              // employerCount: r.records.employment_details.employer.length,
            },
          },
        };
        const res = {
          data: {
            id: params.id,
            ...newRes1.records,
          },
        };
        // const res = {
        //   data: {
        //     id: params.id,
        //     ...r?.records,
        //   },
        // };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "otherIncomeDoc") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/getotherincome/${params.id}`
        );
        const r = json;
        const newRes1 = {
          ...r,
          records: {
            ...r?.records,
            other_income_details: {
              ...r?.records.other_income_details,
              otherincome: r?.records.other_income_details.otherincome.map(
                (item) => {
                  return {
                    ...item,
                    availableToUpload:
                      item.files.length > 0
                        ? "Yes"
                        : item.no_doc_reason != null
                          ? "No"
                          : "",
                    // no_doc_reason: item.no_doc_reason || "I don't currently have access to document(s), but can provide later",
                    fileCount: item.files.length,
                  };
                }
              ),
              // employerCount: r.records.employment_details.employer.length,
            },
          },
        };
        const res = {
          data: {
            id: params.id,
            ...newRes1.records,
          },
        };
        return res;
        // const res = {
        //   data: {
        //     id: params.id,
        //     ...r?.records,
        //   },
        // };
        // return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "otherDoc") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/income/getothedocs/${params.id}`
        );
        const r = json;
        const res = {
          data: {
            id: params.id,
            ...r?.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getMetaData") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC +
          `/income/docupload/getMetadata/${params.meta.trn_id}/${params.id}`
        );
        const res = {
          data: {
            id: params.id,
            ...json,
          },
        };

        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getapplicationgraph") {
      try {
        let url = `/common/getapplicationgraph?subscriberid=${params.id
          }&app_invitation_type=${params?.meta?.app_invitation_type || 1}`;
        if (!params.id)
          url = `/common/getapplicationgraph?app_invitation_type=${params?.meta?.app_invitation_type || 1
            }`;
        const { json }: any = await httpClient(`${API_URL}${url}`, {
          method: "GET",
        });
        const res = await json;
        return {
          data: { id: 1, ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getapplicationcountstatus") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getapplicationcountstatus?app_invitation_type=${params?.meta?.app_invitation_type}` +
          (params.id ? `&subscriberid=${params.id}` : ""),
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, records: res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "docuploadmanagementstats") {
      try {
        // Retrieve subscriber data from local storage
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;

        // Make the HTTP request with the dynamic subscriberId
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getdocuploadreportcount?subscriberid=${subscriberId}`,
          {
            method: "GET",
          }
        );

        return { data: { id: params.id, records: json } };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }



    if (resource === "verificationmanagementstats") {
      try {
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.meta?.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.meta?.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";

        const { json }: any = await httpClient(
          `${API_URL}/admin/getverificationreportcount?q=${params?.meta?.q || ""}&rangefrom=${rangefromFinal || ""}&rangeto=${rangetoFinal || ""}&subscribername=${params?.meta?.subscribername || ""}`,
          {
            method: "GET",

          }
        );

        // return { data: { id: params.id, records: json } };
        return { data: { id: params.id, records: json } };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getfilterforinbox") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/getfilterforinbox` +
          (params.id ? `?subscriberid=${params.id}` : ``),
          { method: "GET" }
        );
        // const res = json;
        return {
          data: { id: params.id, ...json.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getnewapplicationdetail") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getnewapplicationdetail` +
          (params.id ? `?subscriberid=${params.id}` : ""),
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: params.id, ...res.data },
        };
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == "getipaddress") {
      try {
        const result = await fetch(`https://geolocation-db.com/json/`, {
          method: "GET",
        });
        const res = await result.json();
        return {
          data: { id: params.id, ...res },
        };
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == "getapplicationinboxdetails") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/common/getapplicationinboxdetails/${params?.id}`,
          { method: "GET" }
        );
        return {
          data: { id: params.id, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getidentification") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/applicant/getidentification/${params.id}`,
          { method: "GET" }
        );
        const response = json;

        // const stateId = response.records.identification_data.state;
        // const selectedState = response.records.states.filter((state) => {
        //   return state.ID == stateId;
        // });
        if (response.records?.address?.length > 0) {
          const updateAddress = await response.records?.address.map(
            async (singleAddress, index) => {
              let states = await response.records.states.filter((state) => {
                if (state.ID == singleAddress.state) {
                  let body = {
                    value: state.ID,
                    label: state.StateName,
                  };

                  singleAddress.state = body;
                }
              });
            }
          );
        }

        const res = {
          ...response.records,
          applicant: {
            ...response.records.applicant,
            otherPhoneCaption: {
              value: response.records.applicant.otherPhoneCaption,
              label: response.records.applicant.otherPhoneCaption,
            },
            alias_status:
              response.records.applicant.Alias.length > 0 ? "Yes" : "No",
            // no_doc_reason: !response.records.identification_data.other_reason
            //   ? "Other"
            //   : !!response.records.identification_data.no_doc_reason
            //   ? response.records.identification_data.no_doc_reason
            //   : "I don't currently have access to document(s), but can provide later",
            no_doc_reason:
              response.records.identification_data.no_doc_reason ||
              "I don't currently have access to document(s), but can provide later",
            availableToUpload_id:
              response.records.identification_data.availableToUpload_id,
            // state:
            //   selectedState?.length > 0
            //     ? {
            //       value: selectedState[0].ID,
            //       label:
            //         selectedState[0].StateShortCode +
            //         " - " +
            //         selectedState[0].StateName,
            //     }
            //     : null,
            // isNameMatched: "",
            // isDOBMatched: "",
          },
          address: !response.records.address.length
            ? [
              {
                id: 0,
                is_current_address: true,
                move_in_date: null,
                move_out_date: null,
                current_rent: null,
                mortgage_rent: null,
              },
            ]
            : response.records.address,
          // ssn_data: {
          //   ...response.records.ssn_data,
          //   availableToUpload_ssn: response.records.ssn_data.file
          //     ? "Yes"
          //     : response.records.ssn_data.no_doc_reason
          //       ? "No"
          //       : response.records.ssn_data.other_reason
          //         ? "No"
          //         : "",
          //   no_doc_reason: response.records.ssn_data.no_doc_reason || "I don't currently have access to document(s), but can provide later",
          // },
        };
        return {
          data: { id: params.id, data: res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "ssnGetidentification") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/applicant/getidentification/${params.id}`,
          { method: "GET" }
        );
        const response = json;

        if (response.records?.address?.length > 0) {
          const updateAddress = await response.records?.address.map(
            async (singleAddress, index) => {
              let states = await response.records.states.filter((state) => {
                if (state.ID == singleAddress.state) {
                  let body = {
                    value: state.ID,
                    label: state.StateName,
                  };

                  singleAddress.state = body;
                }
              });
            }
          );
        }
        const res = {
          ...response.records,
          ssn_data: {
            ...response.records.ssn_data,
            availableToUpload_ssn: response.records.ssn_data.file
              ? "Yes"
              : response.records.ssn_data.no_doc_reason
                ? "No"
                : response.records.ssn_data.other_reason
                  ? "No"
                  : "",
            no_doc_reason:
              response.records.ssn_data.no_doc_reason ||
              "I don't currently have access to document(s), but can provide later",
          },
        };
        return {
          data: { id: params.id, data: res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getTandCpageforpayment") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/stripe/getTandCpageforpayment/${params.id}`,
          { method: "GET" }
        );
        const response = json;
        return {
          data: { id: params.id, data: response },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getpayment") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/stripe/getpayment/${params.id}`,
          { method: "GET" }
        );
        const response = json;
        return {
          data: { id: params.id, data: response },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "contextualgetdetails") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/applicant/contextual/getdetails/${params.id}`,
          { method: "GET" }
        );
        const response = json;
        let labelCount = 0;
        const res = {
          questionsLength: response.records?.length || 0,
          anyone_over_18: response?.records[0]
            ? {
              ...response?.records[0],
              labelCount: response?.records[0].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          co_occupants: response?.records[1]?.length > 0
            ? {
              ...response?.records[1],
              labelCount: response?.records[1].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          is_co_signer: response?.records[2]
            ? {
              ...response?.records[2],
              labelCount: response?.records[2].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          reference: response?.records[3]
            ? {
              ...response?.records[3],
              labelCount: response?.records[3].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          emergency_reference: response?.records[4]
            ? {
              ...response?.records[4],
              labelCount: response?.records[4].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          renters_insurance: response?.records[8]
            ? {
              ...response?.records[8],
              labelCount: response?.records[8].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          eviction_or_nonpayment: response?.records[10]
            ? {
              ...response?.records[10],
              labelCount: response?.records[10].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          contingencies: response?.records[11]
            ? {
              ...response?.records[11],
              labelCount: response?.records[11].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          filed_for_bankruptcy: response?.records[13]
            ? {
              ...response?.records[13],
              labelCount: response?.records[13].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          is_student: response?.records[7]
            ? {
              ...response?.records[7],
              labelCount: response?.records[7].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          have_vehicle: response?.records[6]
            ? {
              ...response?.records[6],
              labelCount: response?.records[6].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          have_pet: response?.records[5]
            ? {
              ...response?.records[5],
              labelCount: response?.records[5].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          do_you_smoke: response?.records[12]
            ? {
              ...response?.records[12],
              labelCount: response?.records[12].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
          convicted_for_crime: response?.records[9]
            ? {
              ...response?.records[9],
              labelCount: response?.records[9].display ? ++labelCount : labelCount,
              labelIndex: labelCount,
            }
            : {
              display: false,
              required: false,
              response: "no",
            },
        };

        // 
        return {
          data: { id: params.id, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getsubscribercount") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/getsubscribercount`,
          { method: "GET" }
        );
        const response = json?.data;
        return {
          data: { id: params.id, records: response },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "getqueuecount") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/getqueuecount`,
          { method: "GET" }
        );
        const response = json?.data;
        return {
          data: { id: params.id, records: response },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getactivedatagraph") {
      try {
        let url = `/account/getactivedatagraph?isday=${params.id}`;
        const { json }: any = await httpClient(`${API_URL}${url}`, {
          method: "GET",
        });
        const res = await json;
        return {
          data: { id: 1, ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getgraphdata") {
      try {
        let url = `/account/getgraphdata`;
        const { json }: any = await httpClient(`${API_URL}${url}`, {
          method: "GET",
        });
        const res = await json;
        const newResp = {
          ...res.data,
          osdata: res?.data?.osdata?.map((item: any) => {
            item.name = item.OS;
            item.value = item.Users;

            delete item.OS;
            delete item.Users;
            return item;
          }),
          broswerdata: res?.data?.broswerdata?.map((item: any) => {
            item.name = item.Browser;
            item.value = item.Users;

            delete item.Browser;
            delete item.Users;
            return item;
          }),
        };
        return {
          data: { id: 1, ...newResp },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "mlbanklist") {
      try {
        const { json }: any = await httpClient(`${API_URL_DOC}/ml/mlbanklist`, {
          method: "GET",
        });
        const res = await json;
        return {
          data: { id: 1, data: res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getalldocs") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getalldocs/${params.id}`,
          { method: "GET" }
        );
        const res = await json;

        return {
          data: { id: 1, data: res?.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getSecondaryApp") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/applicant/contextual/getsecondaryapplicationdetails/${params.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, data: res?.records },

        };

      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //get data policy
    if (resource === "getdatapolicy") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/account/getdatapolicy/`,
          { method: "GET" }
        );

        // const res = {
        //   data: json.data[0],
        //   total: json.total,
        // };
        const res = await json;
        return {
          data: { id: 1, data: res?.records },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //get term of use
    if (resource === "gettermsofuse") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/account/gettermsofuse/`,
          { method: "GET" }
        );

        const res = await json;
        return {
          data: { id: 1, data: res?.records },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //usersetup for admin
    // if (resource === "agreeterms") {
    //   try {
    //     const { json }: any = await httpClient(
    //       `${API_URL}/subscriber/gettandc?subscriberid=${params.data.filter}`,
    //       { method: "GET" }
    //     );

    //     const res = await json;
    //     return {
    //       data: { id: 1, data: res?.records },
    //     };
    //   } catch (e: any) {
    //     throw new Error(e.message);
    //   }
    // }

    if (resource === "registrationpage") {
      try {
        const headers = new Headers();
        headers.append("url", params.id);
        const { json }: any = await httpClient(
          `${API_URL?.replace("/api", "")}/users/registrationpage`,
          { headers: headers, method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, data: res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "viewappreport") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/view-app-report`,
          { method: "POST", body: JSON.stringify(params?.id) }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getApplicants") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/get-applicants?ApplicationNumber=${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getStates") {
      try {
        const { json }: any = await httpClient(`${API_URL}/common/getStates`, {
          method: "GET",
        });
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "application-profile") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/application-profile/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "lease-template") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/lease-template/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-third-party-apps") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/get-third-party-apps/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "subscriber-screening-company") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/subscriber-screening-company/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "adverse-letter") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/adverse-letter/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-property-details") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/${params?.id?.type === "Office"
            ? `get-office`
            : `get-property-details`
          }?${params?.id?.type === "Office" ? `officeID` : `propertyID`}=${params?.id?.propertyID
          }&subscriberID=${params?.id?.subscriberID}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "integration-setting-rule") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/${params?.id?.type === "Office"
            ? `get-office`
            : `get-property-details`
          }?${params?.id?.type === "Office" ? `officeID` : `propertyID`}=${params?.id?.propertyID
          }&subscriberID=${params?.id?.subscriberID}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "list-third-party-apps") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/list-third-party-apps`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "screening-company") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/screening-company`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "company-type") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/company-type`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-subscriber") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/get-subscriber/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, data: res?.records },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "subscriber-third-party-menu") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/subscriber-third-party-menu?subscriberID=${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-stripe-details") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getStripe/${params?.id?.type === "Office" ? "office" : "property"
          }?ID=${params?.id?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getDownloadDocumentsMessage") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/applicant/applicant/getdownloaddocuments/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getlookbacks") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getlookbacks?applicationnumber=${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-subscriber-configurations") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/subscriber-configurations/${params?.id}`,
          { method: "GET" }
        );
        const res = await json;
        return {
          data: { id: 1, ...res },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    return baseDataProvider.getOne(resource, params);
  },
  delete: async (resource, params) => {
    if (resource == "getocrqueuelist") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + "/admin/removefromqueue?id=" + params.id,
          {
            method: "POST",
          }
        );
        const r = json;
        const res = {
          data: { id: params.id },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "predefinedmessage") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + "/subscriber/deletepredefinedmessages/" + params.id,
          {
            method: "DELETE",
          }
        );
        const r = json;
        const res = {
          data: { ...r },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "predefinedmessageAdmin") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + "/admin/predefinedmessages/" + params.id,
          {
            method: "DELETE",
          }
        );
        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "deletedDocument") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + "/document/deletedDocument/" + params.id,
          {
            method: "DELETE",
          }
        );
        const r = json;
        const res = {
          data: { id: params.id },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getSystemNotification") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + "/admin/deleteSystemNotification/" + params.id,
          {
            method: "DELETE",
          }
        );
        const r = json;
        const res = {
          data: { id: params.id },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource.includes("/applicant/")) {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `${resource}/${params.id}`,
          {
            method: "DELETE",
          }
        );
        const r = json;
        const res = {
          data: { id: "" },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    return baseDataProvider.delete(resource, params);
  },
  getList: async (resource, params) => {
    const _start = (params.pagination.page - 1) * params.pagination.perPage;
    const _end = params.pagination.page * params.pagination.perPage;
    if (resource === "verificationmanagementstats") {
      try {
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";

        const { json }: any = await httpClient(
          `${API_URL}/admin/getverificationreportcount?q=${params.filter.q || ""}&rangefrom=${rangefromFinal || ""}&rangeto=${rangetoFinal || ""}&subscribername=${params.filter.subscribername || ""}`,
          {
            method: "GET",

          }
        );
        return {
          ...json,
          data: json?.data?.map((item,index) => ({ id: index, ...item })),
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else
    if (resource == 'predefinedMessage') {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getpredefinedmessages?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}&id=${params.filter?.id || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }else if (resource == 'predefinedMessageAdmin') {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/predefinedmessages?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}&id=${params.filter?.id || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getocrqueuelist") {
      try {
        // 
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getocrqueuelist?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == 'getAdminPermissions') {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/admin/getpermissions?rolename=` + params?.filter?.role
        );

        // return json;
        return { ...json, data: json?.data?.map((item) => ({ id: item.ID, ...item })) };
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "get-admin-role-permission") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/admin/getroles`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.Id,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //admin third party 
    if (resource === "get-admin-thirdParty-role-permission") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/admin/getthirdpartyroles`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.Id,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "landLoardInbox") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getlandlordinbox?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}`,
          {
            method: "GET",
          }
        );
        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
      if (resource === "adminScreenManagement") {
        try {
          // debugger;
          console.log("params", params);
          const rangeto = new Date();
          const currentDate = new Date();
          rangeto.setDate(currentDate.getDate() - 30);
  
          const formatDate = (date: Date) => {
            if (isNaN(date.getTime())) {
              return " ";
            }
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
  
            return `${month}/${day}/${year}`;
          };
          const rangefrom = params?.filter.rangefrom
            ? formatDate(new Date(params.filter.rangefrom))
            : formatDate(rangeto);
          const rangetoFormatted = params?.filter.rangeto
            ? formatDate(new Date(params.filter.rangeto))
            : formatDate(currentDate);
  
          const rangefromFinal = rangefrom || " ";
          const rangetoFinal = rangetoFormatted || " ";
          const _start = (params.pagination.page - 1) * params.pagination.perPage;
          const _end = params.pagination.page * params.pagination.perPage;
          const { json }: any = await httpClient(
            `${API_URL}/admin/getscreeningmanagementreportdv?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${rangefromFinal|| ""}&rangeto=${rangetoFinal || ""}&screeningcompany=${params?.filter.screeningcompany || ""}`,
            {
              method: "GET",

            }
          );

          return json;
        } catch (e: any) {
          throw new Error(e.message);
        }
      }
    if (resource === "adminVerificationmgt") {
      try {
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;

        const { json }: any = await httpClient(
          `${API_URL}/admin/getverificationmanagementreportdv?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${rangefromFinal || ""}&rangeto=${rangetoFinal || ""}&subscribername=${params?.filter.subscribername || ""}`,
          {
            method: "GET",
          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
  
    if (resource === "getSystemNotification") {
      try {
        const propertyStatusArray = params?.filter?.Active;
        let activeParam = "";
        // Check if the array contains both "Active" and "Inactive"
        if (propertyStatusArray && Array.isArray(propertyStatusArray)) {
          if (propertyStatusArray.includes(1) && propertyStatusArray.includes(0)) {
            activeParam = ""; // Set to null (by not including the parameter) if both "Active" and "Inactive" are selected
          } else if (propertyStatusArray.includes(1)) {
            activeParam = "&Active=1";
          } else if (propertyStatusArray.includes(0)) {
            activeParam = "&Active=0";
          }
        }
       
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getSystemNotification?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}
          &_StartDate=${params?.filter.StartDate || ""}&_EndDate=${params?.filter.EndDate || ""}&id=${params?.filter?.id || ""}&q=${params.filter?.q || ""}` + activeParam,
          {
            method: "GET",
          }
        );

        const res = {

          data: json.data.map((item: any) => ({

            id: item.id,

            ...item,
          })),

          total: json.total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getapplicationprofiledetails") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/getapplicationprofiledetails?id=${params?.filter?.id || ""}`,
          {
            method: "GET",
          }
        );
        const r = json;
        const res = {
          data: { ...r?.data, id: 1 },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //get preauth qustion for applicant in application settings
    if (resource === "getApplicationDetailsQueAns") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/getpreauthquestionsprofileandrolewise?profileid=${params?.filter?.profileId || ""}&subscriberid=${subscriberId}&rolename=${params?.filter?.rolename || ""}`,
          {
            method: "GET",
          }
        );
        const r = json;

        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getdocumentsectionwise") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/getdocumentsectionwise?SubscriberID=${subscriberId}&ApplicationProfileID=${params?.filter?.ApplicationProfileID || ""}`,
          {
            method: "GET",
          }
        );
        const r = json;

        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getquestionssectionwise") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json, headers, status }: any = await httpClient(

          API_URL + `/subscriber/getquestionssectionwise?ApplicationProfileID=${params?.filter?.ApplicationProfileID || ""}&SubscriberID=${subscriberId}
          &RoleName=${params?.filter?.RoleName || ""}&ProfileTab=${params?.filter?.ProfileTab || ""}`,
          {
            method: "GET",
          }
        );
        const r = json;

        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "adminRevenueManagement") {
      try {
        // debugger;
        console.log("params", params);
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getrevenuemanagementreportdv?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${rangefromFinal|| ""}&rangeto=${rangetoFinal || ""}&subscribername=${params?.filter.subscribername || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getgeographicalrules") {
      try {
        // 
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getgeographicalrules?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getinvitationlogs") {
      try {
        // 
       const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getinvitationlogs?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "adminLeadManagement") {
      try {
        // debugger;
        console.log("params", params);
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getleadmanagementreportdv?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${rangefromFinal || ""}&rangeto=${rangetoFinal|| ""}&subscribername=${params?.filter.subscribername || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else if (resource == 'GETDataFiled') {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/common/getdatafields`
        );

        const data = Object.keys(json.records).map((key) => { return { id: key, label: key, value: json.records[key] } });
        const res = {
          data: data,
          total: data.length,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    else if (resource == 'gusertypelist') {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/subscriber/usertypelist?subscriberid=` + params?.filter?.subscriberid || data?.subscriberid
        );
        return { ...json, data: json?.data?.map((item, index) => ({ id: index, ...item })) };
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    } else if (resource == 'getpermissions') {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/getpermissions?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}&rolename=${params?.filter?.role}`
        );
        return { ...json, data: json?.data?.map((item) => ({ id: item.ID, ...item })) };
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //for admin thrd party
    else if (resource == 'getthirdpartypermissions') {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL + `/admin/getthirdpartypermissions`
          // ?subscriberid=`+ params?.filter?.subscriberid + `&rolename=`+ params?.filter?.role
        );
        return { ...json, data: json?.data?.map((item) => ({ id: item.ID, ...item })) };
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == 'GETMLDetailsList') {
      try {
        // suggestion api to change post to get list 
        // 
        const raw = JSON.stringify({
          DocumentTypeID: params.filter.DocumentTypeID
        });
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/document/GetMLclassDetails`,
          {
            method: "POST",
            body: raw,
          }
        );
        const res = {
          data: json.records.map((item) => ({ id: item.ID, ...item })),
          total: json.records.length,
        };
        return res;
      }
      catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == 'gettermsandcondition') {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL + `/subscriber/gettermsandcondition${params?.filter?.SubscriberID ? `?SubscriberId=${params?.filter?.SubscriberID || data?.subscriberid}` : ''} `
        );
        const res = {
          data: json.data.map((item, index) => ({ id: index + 1, ...item })),
          total: json.data.length,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == 'gettermsandcondition_admin') {
      try {
        const { json }: any = await httpClient(
          API_URL + `/admin/gettermsandcondition`
        );
        const res = {
          data: json.data.map((item, index) => ({ id: index + 1, ...item })),
          total: json.data.length,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "Property") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        // subscriber/get-property-details/1
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/get-property-details?subscriberID=${params?.filter?.subscriberID || data?.subscriberid
          }&_sort=${params?.sort?.field || ""}&_order=${params?.sort?.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&_search=${params?.filter?.q || ""
          }&status=${params?.filter?.propertyStatus
            ? params?.filter?.propertyStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //copy url
    else if (resource === "getcopyurl") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/common/getcopyurl?Realestate=${params.filter.Realestate}&Urltype=${params.filter.urltype}` +
          (params?.filter?.subscriberID
            ? `&subscriberID=${params?.filter?.subscriberID}`
            : "")
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    } else if (resource === "getglobalsearch") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const modifyFilterValues = { ...params.filter }
        if (params?.filter?.subscriberid?.value != null && params?.filter?.subscriberid?.value != undefined) {
          modifyFilterValues.subscriberid = params?.filter?.subscriberid?.value;
        }
        const filterValue = objectToQueryString(modifyFilterValues);
        // 
        const { json }: any = await httpClient(
          `${API_URL}/admin/getglobalsearch?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue,
          { method: "GET" }
        );
        const r = await json;
        const data = r.data.map(item => ({ ...item, IsRevamp: item.ApplicationType == 'Application' ? true : item.IsRevamp, isAppCreatedUsingNet: !item.IsRevamp }));
        const res = { ...r, data: data }
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "mlclassdetails") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/mlclassdetails?doc_typeid=${params?.filter?.doc_typeid || 3
          }&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }&page=${params.pagination?.page || 1}&perPage=${params.pagination?.perPage
          }`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "getclassretrainlogs") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/getclassretrainlogs?doc_typeid=${params?.filter?.doc_typeid || 1
          }&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }&page=${params.pagination?.page || 1}&perPage=${params.pagination?.perPage
          }`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "getFlaggedDocuments") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/getFlaggedDocuments?doc_typeid=${params?.filter?.doc_typeid || 1
          }&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }&page=${params.pagination?.page || 1}&perPage=${params.pagination?.perPage
          }`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getFlaggedSOCRData") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/getFlaggedSOCRData?doc_typeid=${params?.filter?.doc_typeid || 1
          }&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }&page=${params.pagination?.page || 1}&perPage=${params.pagination?.perPage
          }`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "getFlagSOCRStatus") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/getFlagSOCRStatus?doc_typeid=${params?.filter?.doc_typeid || 1
          }&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }&page=${params.pagination?.page || 1}&perPage=${params.pagination?.perPage
          }`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getloginactivitylogs") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/account/getloginactivitylogs?_sort=${params?.sort.field || ""
          }&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&search_by=${params.filter?.q || ""}&rangefrom=${params.filter.start_date || ""
          }&rangeto=${params.filter.end_date || ""}&lastdays=${params.filter?.lastdays || ""
          }&city=${params.filter?.city || ""}&state=${params.filter?.state || ""
          }&country=${params.filter?.country || ""}&q=${params.filter?.q || ""}`,
          { method: "GET" }
        );
        const res = json;
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "loginuserlogs") {
      try {
        const userValue = localStorage.getItem("username");
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/loginuserlogs?page_size=${_end || ""}` + (params?.filter?.searchcode ? `&searchcode=${params?.filter?.searchcode}` : "") +
          (params?.filter?.range_from ? `&range_from=${params?.filter?.range_from}` : "") +
          (params?.filter?.range_to ? `&range_to=${params?.filter?.range_to}` : "") +
          (params?.sort?.field ? `&sort_column=${params?.sort?.field}` : "") +
          (params?.sort?.order ? `&sort_order=${params?.sort?.order}` : "") +
          (userValue ? `&username=${userValue}` : "")
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //For admin
    if (resource === "admin-email-template-list") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/admin/getEmailTemplateDetails?&_start=${_start || ""}&_end=${_end || ""}` +
          (params?.sort?.field ? `&_sort=${params?.sort?.field}` : "") +
          (params?.filter?.templateApplicableFor ? `&templateApplicableFor=${params?.filter?.templateApplicableFor}` : "") +
          (params?.filter?.ID ? `&ID=${params?.filter?.ID}` : "") +
          (params?.sort?.order ? `&_order=${params?.sort?.order}` : "") +
          (params?.filter?.q_email ? `&q=${params?.filter?.q_email}` : "") +
          (params?.filter?.rangefrom ? `&rangefrom=${params?.filter?.rangefrom}` : "") +
          (params?.filter?.rangeto ? `&rangeto=${params?.filter?.rangeto}` : "") +
          (params?.filter?.active ? `&active=${params?.filter?.active}` : "")

          // }&ID=${[params?.filter?.ID] || ""}&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""
          // }&q=${params?.filter?.q_email || ""}&active=${params?.filter?.active || ""
          // }&rangefrom=${params?.filter?.rangefrom || ""}&rangeto=${params?.filter?.rangeto || ""}` +

        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }

    if (resource === "getAdminResources") {
      try {
        const propertyStatusArray = params?.filter?.Active;
        let activeParam = "";

        // Check if the array contains both "Active" and "Inactive"
        if (propertyStatusArray && Array.isArray(propertyStatusArray)) {
          if (propertyStatusArray.includes(1) && propertyStatusArray.includes(0)) {
            activeParam = ""; // Set to null (by not including the parameter) if both "Active" and "Inactive" are selected
          } else if (propertyStatusArray.includes(1)) {
            activeParam = "&Active=1";
          } else if (propertyStatusArray.includes(0)) {
            activeParam = "&Active=0";
          }
        }
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;

        const { json }: any = await httpClient(
          `${API_URL}/admin/getAdminResources?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}` + (params.filter?.id ? `&id=${params.filter?.id}` : "") + (params.filter.q ? `&q=${params.filter.q}` : "") + (params.filter.Active || activeParam ? `&Active=${params.filter.Active}` : ""),

          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    //     return json;
    //   } catch (e: any) {
    //     throw new Error(e.message);
    //   }&rangefrom=${params.filter.start_date || ""}&rangeto=${params.filter.end_date || ""
    // }
    if (resource === "getleadmanagementreport") {
      try {
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getleadmanagementreport?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${rangefromFinal|| ""}&rangeto=${rangetoFinal || ""}`,

          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getdocuploadmanagementreport") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";

        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getdocuploadmanagementreport?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          ` + (rangefromFinal ? `&rangefrom=${rangefromFinal|| ""}` : "") + (rangetoFinal? `&rangeto=${rangetoFinal || ""} ` : "") + (!!params?.filter.office ? `&office=${params?.filter.office || ""}` : "") + (!!params?.filter.property ? `&property=${params?.filter.property || ""}` : ""),
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    // shedule report api
    if (resource === "getScheduleReport") {
      try {
        // const OfficeName = localStorage.getItem("Office")
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
     console.log(params.filter,"sgdfg")
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getsubscriberreportscheduler?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}` +
          (params?.filter.rangefrom ? `&rangefrom=${params?.filter.rangefrom || ""}` : "") +
          (params?.filter.rangeto ? `&rangeto=${params?.filter.rangeto || ""} ` : "") +
          (params?.filter.id ? `&ID=${params?.filter.id || ""} ` : "") +
          (params?.filter.Office?.map((item)=>item?.value) ? `&OfficeIDs=${params?.filter.Office?.map((item)=>item?.value)|| ""}` : "") +
          (params?.filter.Agent?.value ? `&UserIDs=${params?.filter.Agent?.value || ""}` : "") +
          (params?.filter.Property?.map((item)=>item?.value) ? `&PropertyIDs=${params?.filter.Property?.map((item)=>item?.value) || ""}` : "") +
          (params?.filter.Floor?.map((item)=>item?.value) ? `&FloorIDs=${params?.filter.Floor?.map((item)=>item?.value) || ""}` : "") +
          (params?.filter.Unit?.map((item)=>item?.value) ? `&UnitIDs=${params?.filter.Unit?.map((item)=>item?.value) || ""}` : ""),
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getrevenuemanagementreport") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const rangeto = new Date();
        const currentDate = new Date();
        rangeto.setDate(currentDate.getDate() - 30);

        const formatDate = (date: Date) => {
          if (isNaN(date.getTime())) {
            return " ";
          }
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();

          return `${month}/${day}/${year}`;
        };
        const rangefrom = params?.filter.rangefrom
          ? formatDate(new Date(params.filter.rangefrom))
          : formatDate(rangeto);
        const rangetoFormatted = params?.filter.rangeto
          ? formatDate(new Date(params.filter.rangeto))
          : formatDate(currentDate);

        const rangefromFinal = rangefrom || " ";
        const rangetoFinal = rangetoFormatted || " ";
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getrevenuemanagementreport?subscriberid=${subscriberId}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          ` + (rangefromFinal ? `&rangefrom=${rangefromFinal || ""}` : "") + (rangetoFinal ? `&rangeto=${rangetoFinal || ""} ` : "") + (!!params?.filter.office ? `&office=${params?.filter.office || ""}` : "") + (!!params?.filter.property ? `&property=${params?.filter.property || ""}` : ""),
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getconfidentialitylogs") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;

        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getconfidentialitylogs?subscriberid=${subscriberId || data?.subscriberid}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${params?.filter.rangefrom || ""}&rangeto=${params?.filter.rangeto || ""}&Type=${params?.filter?.Type || ""}`,

          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //   if (resource === "user-setup-admin") {
    //     try {
    //      const { json }: any = await httpClient(
    //        `${API_URL}/admin/docuverususers?sortorder=${params?.sort?.order}`+
    //        (params?.filter?.activecode ? `&activecode=${params?.filter?.activecode}` : "")+
    //        (params?.filter?.searchcode ? `&searchcode=${params?.filter?.searchcode}` : "")+
    //         (params?.sort?.field ? `&sortcolumn=${params?.sort?.field}` : "")+
    //        // (params?.sort?.order ? `&sortorder=${params?.sort?.order}` : "")+
    //        (params?.filter?.id ? `&userid=${params?.filter?.id}` : "")



    //      );
    //      const res = {
    //        data: json.data.map((item: any) => ({
    //          id: item.ID,
    //          ...item,
    //        })),
    //        total: json.total,
    //      };
    //      return res;
    //    } catch (e) {
    //      throw new Error("something went wrong, try again!");
    //    }
    //  }

    if (resource === "getadverseletter") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const propertyStatusArray = params?.filter?.active;
        let activeParam = "";

        // Check if the array contains both "Active" and "Inactive"
        if (propertyStatusArray && Array.isArray(propertyStatusArray)) {
          if (propertyStatusArray.includes(1) && propertyStatusArray.includes(0)) {
            activeParam = ""; // Set to null (by not including the parameter) if both "Active" and "Inactive" are selected
          } else if (propertyStatusArray.includes(1)) {
            activeParam = "&active=1";
          } else if (propertyStatusArray.includes(0)) {
            activeParam = "&active=0";
          }
        }
        const page_no = (params.pagination.page - 1) * params.pagination.perPage;
        const page_size = params.pagination.page * params.pagination.perPage;
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getadverseletter?subscriberid=${subscriberId || data?.subscriberid}&sortorder=${params?.sort?.order}` +
          //  (params?.filter?.active ? `&active=${params?.filter?.active}` : "")+
          (params?.filter?.searchcode ? `&searchcode=${params?.filter?.searchcode}` : "") + activeParam +
          (params?.sort?.field ? `&sortcolumn=${params?.sort?.field}` : "") +
          // (params?.sort?.order ? `&sortorder=${params?.sort?.order}` : "")+
          (params?.filter?.id ? `&id=${params?.filter?.id}` : "") + `&page_no=${page_no || ""}` + `&page_size=${page_size || ""}`,
          // &_start=${_start || ""}&_end=${_end || ""}


        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    
    if (resource === "getscreeningmanagementreportdv") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
       const { json }: any = await httpClient(
          `${API_URL}/admin/getscreeningmanagementreportdv?subscriberid=${params.filter.subscriberID || 2}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${params?.filter.rangefrom || ""}&rangeto=${params?.filter.rangeto || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }




    if (resource === "getrevenuemanagementreportdv") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getrevenuemanagementreportdv?subscriberid=${params.filter.subscriberID || 2}&_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}
          &rangefrom=${params?.filter.rangefrom || ""}&rangeto=${params?.filter.rangeto || ""}`,
          {
            method: "GET",

          }
        );

        return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getarchivedcancelled") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
         const { json }: any = await httpClient(
          `${API_URL}/subscriber/getarchivedcancelled?_sort=${params?.sort.field || ""
          }&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&q=${params.filter?.q || ""}&agent=${params.filter?.Agent || ""
          }&app_invitation_type=${params.filter?.app_invitation_type || ""
          }&property=${params.filter?.Office || params.filter.Property || ""
          }&rangefrom=${params.filter.start_date || ""}&rangeto=${params.filter.end_date || ""
          }&applicationstatus=${params.filter.ApplicationStatus
            ? params.filter.ApplicationStatus.toString()
            : ""
          }&Floor=${params.filter.Floor || ""}` +
          (params.filter.subscriberid ? `&subscriberid=${subscriberId}`
            : ""),
          { method: "GET" }
        );
        const res = json;
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "deletedDocument") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;

        const { json }: any = await httpClient(
          `${API_URL_DOC}/document/deletedDocument/${params.filter.trn_id}?_start=${_start}&_end=${_end}`
        );
        const res = json;
       
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (
      resource === "getAllBlockSections" ||
      resource === "getAllColumnSections"
    ) {
      try {
        const { json }: any = await httpClient(
          API_URL_DOC + `/ml/${resource}`,
          {
            method: "GET",
          }
        );
        const r = json;
        const res = {
          data: [...r?.records],
          total: r?.records.length,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getAllFieldsByDocumentId") {
      try {
        const { json }: any = await httpClient(
          API_URL_DOC + `/ml/getAllFieldsByDocumentId/6`,
          {
            method: "GET",
          }
        );
        const r = json;
        //
        const res = {
          data: [...r.records],
          total: r.records.length,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getAllImages") {
      const { pagination, filter } = params;
      const end = pagination.perPage * (pagination.page + 1);
      const start = pagination.perPage * pagination.page;
      try {
        const { json, headers }: any = await httpClient(
          API_URL_DOC +
          `/ml/getAllImages?_end=${end}&_order=DESC&_sort=id&_start=${start}&_id=${filter.id}`,
          {
            method: "GET",
          }
        );
        const r = json;
        const total = await headers.get("X-Total-Count");
        const res = {
          data: [...r],
          total: total,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getsubmittedauditlog") {
      try {
        // https://uatapiml.dvapply.com/api/subscriber/getsubmittedauditlog/23820
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getsubmittedauditlog/${params.filter.applicantId
          }?_sort=${params?.sort.field || ""}&_order=${params?.sort.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""
          }`,
          { method: "GET" }
        );
        const res = await json;
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getsubscriberinbox") {

      if (params.filter.ApplicationStatus?.[0] === 'Completed-Conditionally Approved') {
        params.filter.ApplicationStatus = 'CompletedConditionallyApproved';
      }
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getsubscriberinbox?_sort=${params?.sort.field || ""
          }&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&q=${sanitizeQueryParams(params.filter?.q) || ""}&agent=${sanitizeQueryParams(params.filter?.Agent) || ""
          }&app_invitation_type=${sanitizeQueryParams(params.filter?.app_invitation_type) || ""
          }&property=${sanitizeQueryParams(params.filter?.Office || params.filter.Property) || ""
          }&rangefrom=${sanitizeQueryParams(params.filter.start_date) || ""}&rangeto=${sanitizeQueryParams(params.filter.end_date) || ""
          }&applicationstatus=${params.filter.ApplicationStatus
            ? sanitizeQueryParams(params.filter.ApplicationStatus.toString())
            : ""
          }&Floor=${params.filter.Floor || ""}` +
          (subscriberId
            ? `&subscriberid=${subscriberId}`
            : ""),
          { method: "GET" }
        );
        const r = await json;
        const response_data = r.data.map(item => ({ ...item, IsRevamp: params?.filter?.app_invitation_type == 1 ? true : item.IsRevamp, isAppCreatedUsingNet: !item.IsRevamp }));
        const res = { ...r, data: response_data }
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getAdminAllinboxType") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        if (params.filter?.inbox_type == 'ATS_SCREENING_QUEUE') {
          const filterValue = objectToQueryString({ ...params.filter, 'app_invitation_type': 1, subscriberid: params?.filter?.subscriberid?.value || '' });
          const { json }: any = await httpClient(`${API_URL}/admin/getatsqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue, { method: 'GET' });
          // const data = json.data.map(item => ({ ...item, IsRevamp: true }));
          const data = json.data.map(item => ({ ...item, IsRevamp: true, isAppCreatedUsingNet: !item.IsRevamp }));
          const res = { ...json, data: data }
          return res;
        } else if (params.filter?.inbox_type == 'ATS_LAST_30_DAYS') {
          if (params?.filter?.lastApplicationInDays?.value == undefined) {
            delete params.filter.lastApplicationInDays
          } else {
            params.filter.lastApplicationInDays = params?.filter?.lastApplicationInDays?.value
          }
          const filterValue = objectToQueryString({ ...params.filter, 'app_invitation_type': 1, subscriberid: params?.filter?.subscriberid?.value || '' });
          const { json }: any = await httpClient(`${API_URL}/admin/getlastthirtydaysqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue, { method: 'GET' });
          const data = json.data.map(item => ({ ...item, IsRevamp: true, isAppCreatedUsingNet: !item.IsRevamp }));
          return { ...json, data: data }
        } else if (params.filter?.inbox_type == 'DOCUPLOAD_LAST_30_DAYS') {
          // 
          if (params?.filter?.lastApplicationInDays?.value == undefined) {
            delete params.filter.lastApplicationInDays
          } else {
            params.filter.lastApplicationInDays = params?.filter?.lastApplicationInDays?.value
          }
          const filterValue = objectToQueryString({ ...params.filter, 'app_invitation_type': 2, subscriberid: params?.filter?.subscriberid?.value || '' });
          const { json }: any = await httpClient(`${API_URL}/admin/getlastthirtydaysqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue, { method: 'GET' });
          const data = json.data.map(item => ({ ...item, IsRevamp: item.IsRevamp, isAppCreatedUsingNet: !item.IsRevamp }));
          return { ...json, data: data }
        } else {
          const filterValue = objectToQueryString({ ...params.filter, 'app_invitation_type': 1, subscriberid: params?.filter?.subscriberid?.value || '' });
          const { json }: any = await httpClient(`${API_URL}/admin/getreviewqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue, { method: 'GET' });
          const res = {
            ...json,
            data: json?.data?.map((item) => ({
              ...item,
              appInDAReviewQueue: item?.ApplicationType === "Application",
              ApplicationType: "Docupload",
            })),
          };
          return res;
        }
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "getadmininbox") {
      try {
        // https://uatapimlbeta.dvapply.com/ml/mlclassdetails?_end=10&_order=ASC&_sort=ClassName&_start=0&q=d
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        // &q=${params.filter?.q || ''}&agent=${params.filter?.Agent || ''}&app_invitation_type=${params.filter?.app_invitation_type || ''}&property=${params.filter?.Office || params.filter.Property || ''}&rangefrom=${params.filter.start_date || ''}&rangeto=${params.filter.end_date || ''}&applicationstatus=${params.filter.ApplicationStatus ? params.filter.ApplicationStatus.toString() : ''}&subscriberid=${params.filter.subscriberid}&Floor=${params.filter.Floor || ''}
        const { json }: any = await httpClient(
          `${API_URL}/admin/getreviewqueue?_sort=${params?.sort.field || ""
          }&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&` + objectToQueryString(params.filter),
          { method: "GET" }
        );

        const res = {
          ...json,
          data: json?.data?.map((item) => ({
            ...item,
            appInDAReviewQueue: item?.ApplicationType === "Application",

          })),
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getatsqueue") {
      try {
        const { json }: any = await httpClient(`${API_URL}/admin/getatsqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + objectToQueryString(params.filter), { method: 'GET' });
        const data = json.data.map(item => ({ ...item, IsRevamp: true, isAppCreatedUsingNet: !item.IsRevamp }));
        const res = { ...json, data: data }
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getlastthirtydaysqueue") {
      try {
        // https://uatapimlbeta.dvapply.com/ml/mlclassdetails?_end=10&_order=ASC&_sort=ClassName&_start=0&q=d
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        // &q=${params.filter?.q || ''}&agent=${params.filter?.Agent || ''}&app_invitation_type=${params.filter?.app_invitation_type || ''}&property=${params.filter?.Office || params.filter.Property || ''}&rangefrom=${params.filter.start_date || ''}&rangeto=${params.filter.end_date || ''}&applicationstatus=${params.filter.ApplicationStatus ? params.filter.ApplicationStatus.toString() : ''}&subscriberid=${params.filter.subscriberid}&Floor=${params.filter.Floor || ''}
        const filterValue = objectToQueryString(params.filter);
        const { json }: any = await httpClient(`${API_URL}/admin/getlastthirtydaysqueue?_sort=${params?.sort.field || ''}&_order=${params?.sort.order || ''}&_start=${_start || ''}&_end=${_end || ''}&` + filterValue, { method: 'GET' });
        const data = json.data.map(item => ({ ...item, IsRevamp: params?.filter?.app_invitation_type == 1 ? true : item.IsRevamp, isAppCreatedUsingNet: !item.IsRevamp }));
        const res = { ...json, data: data }
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getsubscriberusage") {
      try {
        // https://uatapimlbeta.dvapply.com/ml/mlclassdetails?_end=10&_order=ASC&_sort=ClassName&_start=0&q=d
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/admin/getsubscriberusage?_sort=${params?.sort.field || ""
          }&_order=${params?.sort.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }`,
          { method: "GET" }
        );
        const res = await json;
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getpredefinemessage") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getpredefinemessage?ApplicationNumber=${params.filter.appID}`,
          { method: "GET" }
        );
        const res = await json;
        return { ...res, data: res.data[0] };
        // return {...res,data:res.data.map(item=>({...item,id:item.ID}))};
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    else if (resource === "getDocumentTypeWiseMessage") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/applicant/applicant/getDocumentTypeWiseMessage/` + params?.filter?.document_id,
          { method: "GET" }
        );
        const res = await json;
        return { ...res, data: res.records, total: res.records.length };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get_subscriber_inbox_detials") {
      try {
        const _start = (params.pagination.page - 1) * params.pagination.perPage;
        const _end = params.pagination.page * params.pagination.perPage;
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getsubscriberinboxdetails?ApplicationNumber=${params.filter.ApplicationNumber}` +
          (params.filter.subscriberid
            ? `&subscriberid=${params.filter.subscriberid}`
            : ""),
          { method: "GET" }
        );
        const res = await json;
        return res;
        // return {
        //   data:{id:1,...res.data}
        // };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getagentlist") {
     try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getagentlist?subscriberid=${params.filter.SubscriberID}&url=${params.filter.url}`,
          { method: "GET" }
        );
        const res = json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.UserID })),
          total: res.total,
        };
        return finalRes;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getapplicationprofilelist") {
      try {
        const SubscriberData: any = localStorage.getItem("RaStore.switchSubscriberName");
        const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
        const SubscriberDataJson = JSON.parse(SubscriberData);
        const subscriberId = SubscriberDataJson?.value || data?.subscriberid;
        const profileStatus = params?.filter?.status;
        let activeParam = "";

        // Check if the array contains both "Active" and "Inactive"
        if (profileStatus && Array.isArray(profileStatus)) {
          if (profileStatus.includes(1) && profileStatus.includes(0)) {
            activeParam = ""; // Set to null (by not including the parameter) if both "Active" and "Inactive" are selected
          } else if (profileStatus.includes(1)) {
            activeParam = "&status=1";
          } else if (profileStatus.includes(0)) {
            activeParam = "&status=0";
          }
        }
        const url = `${API_URL}/subscriber/getapplicationprofilelist?subscriberid=${subscriberId}&_sort=${params?.sort?.field || ""}&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""}&q=${params.filter?.q || ""}${activeParam}`
       const { json }: any = await httpClient(
          url,
          { method: "GET" }
        );
        const res = json;
       return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "getfloorlist") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getfloorlist?subscriberid=${params.filter.SubscriberID}&propertyid=${params.filter.PropertyID}`,
          { method: "GET" }
        );
        const res = await json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.ID })),
          total: res.total,
        };
        return finalRes;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "getunitlist") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getunitlist?subscriberid=${params.filter.SubscriberID}&floorplanid=${params.filter.PropertyID}`,
          { method: "GET" }
        );
        const res = json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.ID })),
          total: res.total,
        };
        return finalRes;
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == "getsubscribers") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getsubscribers`,
          { method: "GET" }
        );
        const res = await json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.id })),
          total: res.total,
        };
        return finalRes;
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }

    if (resource == "getCollectiveListOfPropertyAndOffice") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getCollectiveListOfPropertyAndOffice?subscriberList=[${params?.filter}]`,
          { method: "GET" }
        );
        const res = await json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.id })),
          total: res.total,
        };
        return finalRes;
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource == "getlandlorddetail") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/getlandlorddetail?_sort=${params?.sort.field || ""
          }&subscriberid=${params?.filter?.subscriberid}&applicationnumber=${params?.filter?.ApplicationNumber
          }`,
          { method: "GET" }
        );
        const res = await json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.id })),
          total: res.total,
        };
        return finalRes;
      } catch (error) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "viewNotes") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/viewNotes/${params?.filter?.ApplicantID}`,
          {
            method: "GET",
          }
        );
        const res = await json;
        const finalRes = {
          data: res.data.map((item) => ({ ...item, id: item.id })),
          total: res.total,
        };

        return finalRes;
        // return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "get-floor") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/get-floor?subscriberID=${params?.filter?.subscriberID || data?.subscriberid
          }&propertyID=${params?.filter?.propertyID ? params?.filter?.propertyID : ""
          }&floorID=${params?.filter?.floorID ? params?.filter?.floorID : ""
          }&_sort=${params?.sort?.field || ""}&_order=${params?.sort?.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&_search=${params?.filter?.q_floor || ""
          }&status=${params?.filter?.floorStatus
            ? params?.filter?.floorStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "get-unit") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/get-unit?subscriberID=${params?.filter?.subscriberID || data?.subscriberid
          }&propertyID=${params?.filter?.propertyID ? params?.filter?.propertyID : ""
          }&unitID=${params?.filter?.unitID ? params?.filter?.unitID : ""
          }&_sort=${params?.sort?.field || ""}&_order=${params?.sort?.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&_search=${params?.filter?.q_units || ""
          }&status=${params?.filter?.unitsStatus
            ? params?.filter?.unitsStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "subscriber-list") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/subscriber-list?&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&_search=${params?.filter?.q || ""}&_filter=${params?.filter?.subscribersStatus
            ? params?.filter?.subscribersStatus?.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "integration-setting-rule") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/integration-setting-rule?subscriberID=${params?.filter?.subscriberID
          }&ThirdPartyAppID=${params?.filter?.thirdPartyAppId}&ID=${params?.filter?.id ? params?.filter?.id : ""
          }&_search=${params?.filter?.q || ""}&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "integration-setting-rule-entrata") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/integration-setting-rule?subscriberID=${params?.filter?.subscriberID
          }&ThirdPartyAppID=${params?.filter?.thirdPartyAppId}&ID=${params?.filter?.id ? params?.filter?.id : ""
          }&_search=${params?.filter?.q_entrata || ""}&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}&_filter=${params?.filter?.entrataStatus
            ? params?.filter?.entrataStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "integration-setting-rule-yardi") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/integration-setting-rule?subscriberID=${params?.filter?.subscriberID
          }&ThirdPartyAppID=${params?.filter?.thirdPartyAppId}&ID=${params?.filter?.id ? params?.filter?.id : ""
          }&_search=${params?.filter?.q_yardi || ""}&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}&_filter=${params?.filter?.yardiStatus
            ? params?.filter?.yardiStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "hierarchy-levels-list") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/hierarchy-levels?subscriberID=${params?.filter?.subscriberID || data?.subscriberid
          }&id=${params?.filter?.id || ""}&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&_search=${params?.filter?.q_hierarchy || ""}&_filter=${params?.filter?.hierarchyStatus
            ? params?.filter?.hierarchyStatus?.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "email-template-list") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};

      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getEmailTemplateDetails?subscriberid=${params?.filter?.subscriberID || data?.subscriberid
          }&_sort=${params?.sort?.field || ""
          }&ID=${[params?.filter?.ID]}&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&q=${params?.filter?.q_email || ""}&active=${params?.filter?.active || ""
          }&templateApplicableFor=${params?.filter?.templateApplicableFor || ""}&rangefrom=${params?.filter?.rangefrom || ""}
          &rangeto=${params?.filter?.rangeto || ""}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //user setup-subsciber
    if (resource === "user-setup") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        // Extract the propertyStatus array
        const propertyStatusArray = params?.filter?.propertyStatus;
        let activeParam = "";

        // Check if the array contains both "Active" and "Inactive"
        if (propertyStatusArray
          // && Array.isArray(propertyStatusArray)
        ) {
          if (propertyStatusArray.includes("Active") && propertyStatusArray.includes("Inactive")) {
            activeParam = ""; // Set to null (by not including the parameter) if both "Active" and "Inactive" are selected
          } else if (propertyStatusArray.includes("Active")) {
            activeParam = "&Active=1";
          } else if (propertyStatusArray.includes("Inactive")) {
            activeParam = "&Active=0";
          }
        }
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/getuserroles?SubscriberId=${params?.filter?.SubscriberId || data?.subscriberid}&UserType=${params?.filter?.UserType}` +
          (params?.filter?.q_email ? `&SearchCode=${params?.filter?.q_email}` : "") +
          activeParam +
          (params?.sort?.order ? `&SortOrder=${params?.sort?.order}` : "") +
          (params?.filter?.id ? `&HierarchyName=${params?.filter?.id}` : "")
          + (_end ? `&page_size=${_end}` : "") +
          (params?.sort?.field ? `&SortCol=${params?.sort?.field}` : "")
        );


        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
            officeList: item.PropertyName || item.Offices,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }

    //user setup-admin
    if (resource === "user-setup-admin") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/admin/docuverususers?sortorder=${params?.sort?.order}` +
          (params?.filter?.activecode ? `&activecode=${params?.filter?.activecode}` : "") +
          (params?.filter?.searchcode ? `&searchcode=${params?.filter?.searchcode}` : "") +
          (params?.sort?.field ? `&sortcolumn=${params?.sort?.field}` : "") +
          // (params?.sort?.order ? `&sortorder=${params?.sort?.order}` : "")+
          (params?.filter?.id ? `&userid=${params?.filter?.id}` : "")



        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //user setup-admin roles
    if (resource === "user-setup-admin-role") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/admin/docuverusroles`


        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //getRole
    if (resource === "get-role") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/usertypelist?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.Id,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //get role of user permission
    if (resource === "get-role-permission") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getroles?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}&defaultrole=1&showrole=1`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.Id,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //get role of third party user
    if (resource === "get-role-permission-third-party") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getroles?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}&defaultrole=0&showrole=1`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.Id,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //get association list
    if (resource === "get-association") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getassociation?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //getagent
    if (resource === "get-agent") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      const roleType = "Manager";
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getagents?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}&rolename=${roleType}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }

    //get manager
    if (resource === "get-manager") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      const roleType = "Manager";
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/getmanagers?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    //get proprty
    if (resource === "property-list") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/propertylist?subscriberid=${params?.filter?.subscriberid || data?.subscriberid}`
        );
        const res = {
          data: json.data.map((item: any) => ({
            id: item.ID,
            ...item,
          })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "get-office") {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/get-office?subscriberID=${params?.filter?.subscriberID || data?.subscriberid
          }&_sort=${params?.sort?.field || ""}&_order=${params?.sort?.order || ""
          }&_start=${_start || ""}&_end=${_end || ""}&_search=${params?.filter?.q || ""
          }&status=${params?.filter?.propertyStatus
            ? params?.filter?.propertyStatus.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "application-logs") {
      try {
        const { json }: any = await httpClient(
          API_URL +
          `/subscriber/application-logs?applicationNumber=${params?.filter?.applicationNumber
          }&applicantID=${params?.filter?.applicantID}&_sort=${params?.sort?.field || ""
          }&_order=${params?.sort?.order || ""}&_start=${_start || ""}&_end=${_end || ""
          }&_search=${params?.filter?.q_Logs || ""}&_filter=${params?.filter?.subscribersStatus
            ? params?.filter?.subscribersStatus?.toString()
            : ""
          }`
        );
        const res = {
          data: json.data,
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    if (resource === "pms-logs") {
      try {
       const { json }: any = await httpClient(API_URL + `/subscriber/get-third-party-logs?ApplicationNumber=${params?.filter?.applicationNumber}&applicantID=${params?.filter?.applicantID}&_sort=${params?.sort?.field || ''}&_order=${params?.sort?.order || ''}&_start=${_start || ''}&_end=${_end || ''}&_search=${params?.filter?.q_Logs || ''}&_filter=${params?.filter?.subscribersStatus ? params?.filter?.subscribersStatus?.toString() : ''}`);
        const res = {
          data: json.data.map((item, index) => ({ ...item, id: index })),
          total: json.total,
        };
        return res;
      } catch (e) {
        throw new Error("something went wrong, try again!");
      }
    }
    return baseDataProvider.getList(resource, params);
  },
  getMany: async (resource, params) => {
    if (resource == "mlclassfile") {
      try {
        const { status, headers, body, json }: any = await httpClient(
          `${API_URL_DOC}/ml/mlclassdetails?ids=${params.ids.join("&ids=")}`,
          { method: "GET" }
        );
        const res = json;
        return { data: res, total: headers.get("X-Total-Count") };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (
      resource === "getAllBlockSections" ||
      resource === "getAllColumnSections"
    ) {
      try {
        const query = {
          filter: JSON.stringify({ id: params.ids }),
        };
        const { json }: any = await httpClient(
          API_URL_DOC + `/ml/${resource}?${stringify(query)}`,
          {
            method: "GET",
          }
        );
        const r = json;
        const res = {
          data: [...r.records],
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "getAllFieldsByDocumentId") {
      try {
        const { json }: any = await httpClient(
          API_URL_DOC + `/ml/getAllFieldsByDocumentId/6`,
          {
            method: "GET",
          }
        );
        const r = json;
        const res = {
          data: [...r.records],
          total: r.records.length,
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    return baseDataProvider.getMany(resource, params);
  },
  update: async (resource, params) => {
    if (resource == 'predefinedmessageAdmin') {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/predefinedmessages/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
       return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
    if (resource == 'predefinedmessage') {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/addpredefinedmessages/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
       return json;
      } catch (e: any) {
        throw new Error(e.message);
      }
    } else
    if (resource == "update-user") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/registeruser`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    // //update schedule report
    // if (resource == "update-schedule-report") {
    //   try {
    //     const { json, headers, status }: any = await httpClient(
    //       `${API_URL}/subscriber/AddUpdateSubscriberReportScheduler`,
    //       {
    //         method: "PUT",
    //         body: JSON.stringify(params?.data),
    //       }
    //     );
    //     return {
    //       data: { id: 1, ...json },
    //     };
    //   } catch (e: any) {
    //     throw new Error(e.message);
    //   }
    // }
    //update role for permisions
    if (resource == "update-permission") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/subscriber/addrole`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    //update role for admin third party
    if (resource == "updatethirdpartypermissions") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/updatethirdpartypermissions`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "update-admin-permission") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/addrole`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "update-admin-user") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}/admin/register`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "update-adverse-letter-details") {
      try {
        const { json, headers, status }: any = await httpClient(
          `${API_URL}` + `/subscriber/updateadverseletter`,
          {
            method: "PUT",
            body: JSON.stringify(params?.data),
          }
        );
        return {
          data: { id: 1, ...json },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }


    if (resource === "unarchive") {
      // const subUrl = params.data.subUrl;
      // delete params.data.subUrl;
      const raw = JSON.stringify({ ...params.data });
      try {
        const { json, headers, status, error }: any = await httpClient(
          API_URL + "/subscriber/unarchive/" + params.id,
          {
            method: "PUT",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.data.trn_id,
            ...r.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource === "mlclassdetails") {
      try {
        const { json }: any = await httpClient(
          `${API_URL_DOC}/ml` + `/updatePaystubTemplate`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const r = json;
        const res = {
          data: {
            ...r.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }





    if (resource === "applicant") {
      //
      const subUrl = params.data.subUrl;
      delete params.data.subUrl;
      const raw = JSON.stringify({ ...params.data });
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `/applicant/docupload${subUrl}`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.data.trn_id,
            ...r.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "other_sections") {
      const subUrl = params.data.subUrl;
      delete params.data.subUrl;
      const raw = JSON.stringify({ ...params.data });
      try {
        // 
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `${subUrl}`,
          {
            method: "POST",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.data.trn_id,
            ...r.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource === "deletedDocument") {
      // const subUrl = params.data.subUrl;
      // delete params.data.subUrl;
      const raw = JSON.stringify({ ...params.data });
      try {
        const { json, headers, status, error }: any = await httpClient(
          API_URL_DOC + "/document/deletedDocument/" + params.id,
          {
            method: "PUT",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: {
            id: params.data.trn_id,
            ...r.records,
          },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "archive") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/archive/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { id: res.data[0].ApplicationNumber, ...res.data[0] },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "editapplicationdetail") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/common/editapplicationdetail/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        // need to check new response body res.data[0].ApplicationNumber
        return {
          data: { id: params?.id, ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }

    if (resource == "tranferapp") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/tranferapp/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { id: res.data[0].ApplicationNumber, ...res.data[0] },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "switchApplicant") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/switchrole`,
          {
            method: "POST",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { id: params.data.ApplicationNumber, ...res.data },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "removeapplicant") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/removeapplicant/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { id: params.id, ...res.data[0] },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "cancelapp") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/cancelapp/${params.id}`,
          {
            method: "PUT",
          }
        );
        const res = json;
        return {
          data: { id: res.data[0].ID, ...res.data[0] },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    if (resource == "readdapplicant") {
      try {
        const { json }: any = await httpClient(
          `${API_URL}/subscriber/readdapplicant/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(params.data),
          }
        );
        const res = json;
        return {
          data: { id: res.data[0].ID, ...res.data[0] },
        };
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    return baseDataProvider.update(resource, params);
  },
  insertSequence: async (payload) => {
    try {
      const { json }: any = await httpClient(API_URL + `/insertSequence`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const r = json;
      const res = {
        data: { ...r.records },
      };
      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  getSubscriberDetails: async (id) => {
    try {
      const { json, headers, status }: any = await httpClient(
        API_URL_DOC + `/users/logo/${id}`
      );
      const r = json;
      const res = {
        data: { ...r.records },
      };
      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },

  //   viewNotes: async (params,id) => {
  //     const { pagination, filter } = params;
  //     const end = pagination.perPage * (pagination.page + 1);
  //     const start = pagination.perPage * pagination.page;

  //   try {
  //     const { json, headers, status }: any = await httpClient(API_URL_DOC + `/common/viewNotes`)
  //     const r = json;
  //     const res = {
  //       data: { ...r.records },
  //     };
  //     return res;
  //   } catch (e) {
  //     throw new Error("something went wrong, try again!");
  //   }
  // },
  deleteSequence: async (resource, payload) => {
    const subUrl = payload.subUrl;
    delete payload.subUrl;
    const raw = JSON.stringify({ ...payload });
    if (resource === "income") {
      try {
        const { json, headers, status }: any = await httpClient(
          API_URL_DOC + `${subUrl}`,
          {
            method: "DELETE",
            body: raw,
          }
        );
        const r = json;
        const res = {
          data: { ...r.records },
        };
        return res;
      } catch (e: any) {
        throw new Error(e.message);
      }
    }
    try {
      const { json }: any = await httpClient(API_URL + subUrl, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const r = json;
      const res = {
        data: { ...r.records },
      };
      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  checkEmailExist: async (params) => {
    try {
      const { json }: any = await httpClient(
        `${API_URL}/common/checkemailexist?${params?.email
          ? `email=${params?.email}`
          : params?.username
            ? `username=${params?.username}`
            : null
        }`,
        { method: "GET" }
      );
      const res = await json;
      return {
        data: { ...res },
      };
    } catch (error) {
      throw new Error("something went wrong, try again!");
    }
    //   const {json}:any = await httpClient(API_URL + `/getAllImages/${params.id}`, {
    //     method: "DELETE",
    //
    //   });
    //   const r = json;
    //   const res = {
    //     data: { ...r.records },
    //   };
    //   return res;
    // } catch (e: any) {
    //   throw new Error(e.message);
    // }
  },
  generateXml: async (payload) => {
    try {
      const { json }: any = await httpClient(
        API_URL + `/generateXmlForDocuments`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const r = json;
      const res = {
        data: { ...r },
      };
      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  uploadFile: async (myFromData: uploadFile) => {
    try {
      const formdata = new FormData();
      myFromData.files.forEach((file, item) => {
        formdata.append("files", file);
      });
      formdata.append("class_id", myFromData.classId);
      const response: any = await httpClient(API_URL_DOC + "/ml/addpdf", {
        method: "POST",
        body: formdata,
      });
      return response.json;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  uploadFilePredictClass: async (myFromData: uploadFilePredictClass) => {
    try {
      const formdata = new FormData();
      formdata.append("files", myFromData.files);
      formdata.append("documenttype_id", myFromData.docTypeId);

      const res: any = await httpClient(API_URL_DOC + "/ml/predictclass", {
        method: "POST",
        body: formdata,
      });
      return res.json;
    } catch (e: any) {
      throw new Error(e.message);
    }

    // .then((response) => response.json())
    // .catch(
    //   (error: any) =>
    //     new Promise(function (resolve, reject) {
    //       reject({
    //         message:
    //           error?.body?.message || "something went wrong, try again!",
    //       });
    //     })
    // );
  },
  uploadDocument: (myFromData) => {
    const formdata = new FormData();
    formdata.append("trn_id", myFromData.id);
    formdata.append("files", myFromData.files);
    formdata.append("document_id", myFromData.document_id);
    formdata.append("source_id", myFromData.source_id);
    formdata.append("allowOfferLetter", "null");

    return httpClient(API_URL_DOC + `/applicant/document`, {
      method: "POST",
      body: formdata,
    })
      .then((response: any) => response.json)
      .catch(
        (error: any) =>
          new Promise(function (resolve, reject) {
            reject({
              message:
                error?.body?.message || "something went wrong, try again!",
            });
          })
      );
  },
  deleteDocument: (id) => {
    return httpClient(API_URL_DOC + `/applicant/deletedocument/${id}`, {
      method: "DELETE",
    })
      .then((response) => ({ data: { id: id } }))
      .catch(
        (error: any) =>
          new Promise(function (resolve, reject) {
            reject({
              message:
                error?.body?.message || "something went wrong, try again!",
            });
          })
      );
  },
  deleteDocumentAllIds: (id) => {
    return httpClient(API_URL_DOC + `/applicant/deleteiddocument/${id}`, {
      method: "DELETE",
    })
      .then((response) => ({ data: { id: id } }))
      .catch(
        (error: any) =>
          new Promise(function (resolve, reject) {
            reject({
              message:
                error?.body?.message || "something went wrong, try again!",
            });
          })
      );
  },
  deleteDocumentNoDoc: (id) => {
    return httpClient(API_URL_DOC + `/applicant/deletepaystub/${id}/0`, {
      method: "DELETE",
    })
      .then((response) => ({ data: { id: id } }))
      .catch(
        (error: any) =>
          new Promise(function (resolve, reject) {
            reject({
              message:
                error?.body?.message || "something went wrong, try again!",
            });
          })
      );
  },
  // getMetaData: async ({ document_id }) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const trn_id = sessionStorage.getItem('trn_id')
  //   try {
  //     const { json, headers, status }: any = await httpClient(API_URL_DOC + `/income/docupload/getMetadata/${trn_id}/${document_id}`);
  //     // const res = {
  //     //   data: { ...json },
  //     // };
  //     const res = {
  //       data: {
  //         id: trn_id,
  //         ...json,
  //       },
  //     };
  //     //
  //     return res;
  //   } catch (e: any) {
  //     throw new Error(e.message);
  //   }
  // },
  disableValidationMessage: async (payload) => {
    try {
      const raw = JSON.stringify({ ...payload });
      const { json, headers, status }: any = await httpClient(
        API_URL_DOC + `/document/updateValidationMessages`,
        {
          method: "POST",
          body: raw,
        }
      );
      const res = {
        data: { ...json },
      };
      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  getLoggedUser: async (payload) => {
    try {
      const raw = JSON.stringify({ ...payload });
      const { json, headers, status }: any = await httpClient(
        API_URL_DOC + "/auth/superuser",
        {
          method: "POST",
          body: raw,
        }
      );
      const res = {
        data: { ...json },
      };

      return res;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  
  verifyOtp: async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload);
    try {
      const result = await fetch(API_URL_DOC + "/auth/VerifyOtp", {
        method: "POST",
        body: raw,
        headers: myHeaders,
      });
      if (!result.ok) {
        throw new Error(`Error! status: ${result.status}`);
      }
      const res = await result.json();
      return { data: { ...res } };
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  paystubProcessing: async (payload: any) => {
    const subUrl = payload.subUrl;
    const method = payload?.method || "DELETE";
    // delete payload?.method;
    delete payload.subUrl;
    const raw = JSON.stringify({ ...payload });
    try {
      const { json, headers, status }: any = await httpClient(
        API_URL_DOC + `${subUrl}`,
        {
          method: method,
          body: raw,
        }
      );
      return { data: { ...json } };
    } catch (e: any) {
      throw new Error(e.message);
    }
  },
  downloadZip: async (payload: any) => {
    try {
      const { data } = JSON.parse(<any>localStorage.getItem("auth")) || {};

      const headers = new Headers();
      headers.append("authorization", data?.tokendata || null);
      headers.append("trn_id", data?.trn_id || null);

      // Make the fetch request with the headers
      const response = await fetch(
        API_URL + "/common/getdownloadalldocs/" + payload,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ZIP file");
      }

      // Convert the response body to a Blob
      const blob = await response.blob();

      // Create a Blob URL for the ZIP file
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "docszip.zip"; // Set the desired file name
      a.click();

      // Clean up by revoking the URL object
      window.URL.revokeObjectURL(url);
      // const { body }: any = await httpClient(API_URL + '/common/getdownloadalldocs/' + payload);
      return { data: response };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  validateInvitation: async (payload: any) => {
    try {
      const headers = new Headers();
      headers.append("auth", payload?.auth || null);

      // Make the fetch request with the headers
      const response = await httpClient(
        API_URL + "/common/validate-invitation",
        {
          method: "GET",
          headers: headers,
        }
      );
      return { data: response };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
