import jsonServerProvider from "ra-data-json-server";
import { CreateParams, fetchUtils, UpdateParams } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers();
  }

  if (options.body instanceof FormData) {
    options.headers.delete("Content-Type");
  } else {
    options.headers.set("Accept", "application/json");
  }
  const auth = localStorage?.getItem("auth");
  const { data } = auth ? JSON.parse(auth) : { data: null };
  options.headers.set("Authorization", `Bearer ${data?.accessToken}`);
  return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = jsonServerProvider(apiUrl, httpClient);

type itineraryType = {
  title: string;
  discription: string;
};

type PackageParams = {
  id: string;
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
  vendorId: string;
  description: string;
  images: {
    rawFile: File;
    src?: string;
    title?: string;
  };
  quickItinerary: string;
  itinerary: itineraryType[];
  inclusion: string;
  exclusion: string;
  otherInfo: string;
  start_date: string;
  end_date?: string;
  isApproved?: string;
  category: [];
};

function formatDateToYYYYMMDD(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const createPackageFormData = (
  params: CreateParams<PackageParams> | UpdateParams<PackageParams>,
) => {
  const formData = new FormData();
  if (params.data.images) {
    const imagesArr: any = params?.data?.images;
    for (let fileObj of imagesArr) {
      formData.append("images", fileObj?.rawFile);
    }
  }
  params.data.title && formData.append("title", params.data.title);
  params.data.price && formData.append("price", params.data.price);
  params.data.durationDays &&
    formData.append("durationDays", params.data.durationDays);
  params.data.destination &&
    formData.append("destination", params.data.destination);
  params.data.availableSlots &&
    formData.append("availableSlots", params.data.availableSlots);
  params.data.description &&
    formData.append("description", params.data.description);
  params.data.vendorId && formData.append("vendorId", params.data.vendorId);
  params.data.quickItinerary &&
    formData.append("quickItinerary", params.data.quickItinerary);
  params.data.itinerary &&
    formData.append("itinerary", JSON.stringify(params.data.itinerary));
  params.data.inclusion && formData.append("inclusion", params.data.inclusion);
  params.data.exclusion && formData.append("exclusion", params.data.exclusion);
  params.data.otherInfo && formData.append("otherInfo", params.data.otherInfo);
  if (params.data.category && Array.isArray(params.data.category)) {
    params.data.category.forEach((cat: string | number) => {
      formData.append("categories", String(cat));
    });
  }
  params.data.isApproved &&
    formData.append("isApproved", params.data.isApproved);
  params.data.start_date &&
    formData.append(
      "startDate",
      params.data.start_date
        ? formatDateToYYYYMMDD(params.data.start_date)
        : formatDateToYYYYMMDD(new Date().toISOString()),
    );
  params.data.end_date &&
    formData.append(
      "endDate",
      params.data.end_date
        ? formatDateToYYYYMMDD(params.data.end_date)
        : formatDateToYYYYMMDD(new Date().toISOString()),
    );
  return formData;
};

function jsonToFormData(obj: any, form = new FormData(), namespace = "") {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];

      if (value?.rawFile instanceof File || value?.rawFile instanceof Blob) {
        form.append(formKey, value.rawFile);
      } else if (typeof value === "object" && value !== null) {
        jsonToFormData(value, form, formKey);
      } else if (value !== undefined && value !== null) {
        form.append(formKey, value);
      }
    }
  }
  return form;
}
export const dataProviders = {
  ...baseDataProvider,
  create: (resource: any, params: any) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "destination") {
      const formData = new FormData();
      formData.append("title", params.data.title);
      formData.append("description", params.data.description);
      formData.append("city_id", params.data.city_id);
      formData.append("points", params.data.points);
      formData.append("links", params.data.links);
      formData.append("moreInfo", params.data.moreInfo);
      const imageObj = params.data.imagePath;
      if (imageObj?.rawFile instanceof File) {
        formData.append("images", imageObj.rawFile);
      }
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "category") {
      const formData = new FormData();
      formData.append("name", params.data.name);
      formData.append("description", params.data.description);
      const imageObj = params.data.imagePath;
      if (imageObj?.rawFile instanceof File) {
        formData.append("images", imageObj.rawFile);
      }
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "vendor") {
      const formData = jsonToFormData(params.data);
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "vendor/sendMail") {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: { id: 1, ...json } }));
    } else if (resource === "vendor/withdraw") {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: { id: 1, ...json } }));
    } else if (resource === "blog") {
      const formData = createPackageFormData(params);
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    }
    return baseDataProvider.create(resource, params);
  },

  update: (resource: any, params: any) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      formData.append("id", params.id);
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }) => {
        return { data: { ...json.data, id: json.data.id } };
      });
    } else if (resource === "ticket") {
      const formData = JSON.stringify({ status: params?.data?.status });
      return httpClient(`${apiUrl}/${resource}/${params.id}/status`, {
        method: "PUT",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    } else if (resource === "destination") {
      const formData = new FormData();
      formData.append("title", params.data.title);
      formData.append("description", params.data.description);
      formData.append("city_id", params.data.city_id);
      const imageObj = params.data.imagePath;
      if (imageObj?.rawFile instanceof File) {
        formData.append("images", imageObj.rawFile);
      }
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }) => ({ data: json }));
    }
    return baseDataProvider.update(resource, params);
  },

  getList: (resource: any, params: any) => {

    if (resource === "statistics") {
      return httpClient(
        `${apiUrl}/vendor/${resource}?vendorId=${params.filter.vendorId}`,
        { method: "GET" }
      ).then(({ json }) => ({ data: [{ id: 1, data: json }], total: 1 }));
    } else if (resource === "withdrawals") {
      return httpClient(
        `${apiUrl}/vendor/${resource}/${params.filter.vendorId}`,
        { method: "GET" }
      ).then(({ json }) => ({ data: json }));
    } else if (resource === "ticket") {
      return httpClient(`${apiUrl}/${resource}`, { method: "GET" })
        .then(({ json }) => ({ data: json, total: json.length }));
    } else if (resource === "destination") {
      return httpClient(`${apiUrl}/${resource}`, { method: "GET" })
        .then(({ json }) => {
          const records = Array.isArray(json) ? json : json.data;
          const updatedRecords = records.map(item => ({
            ...item,
            imagePath: `${apiUrl}${item.imagePath}`,
          }));
          return { data: updatedRecords, total: updatedRecords.length };
        });
    } else if (resource === "category") {
      return httpClient(`${apiUrl}/${resource}`, { method: "GET" })
        .then(({ json }) => {
          const records = Array.isArray(json) ? json : json.data;
          const updatedRecords = records.map(item => {
            let imagePath = "";
            try {
              const parsed = JSON.parse(item.imagePath);
              if (Array.isArray(parsed) && parsed.length > 0) {
                imagePath = `${apiUrl}${parsed[0]}`;
              }
            } catch {
              console.error("Invalid imagePath format:", item.imagePath);
            }
            return { ...item, imagePath };
          });
          return { data: updatedRecords, total: updatedRecords.length };
        });
    } else if (resource === "common/city") {
      return httpClient(`${apiUrl}/${resource}`, { method: "GET" })
        .then(({ json }) => {
          const records = Array.isArray(json) ? json : json.data;

          const mapped = records.map((city: any) => ({
            ...city,
            id: city.city_id,   // 👈 REQUIRED by React-Admin
          }));

          console.log("Mapped cities for RA:", mapped);
          return {
            data: mapped,
            total: mapped.length,
          };
        });
    }
    else
      return baseDataProvider.getList(resource, params);
  },


  approvePackage: async (id: string) => {
    return httpClient(`${apiUrl}/package/approve/${id}`)
      .then(({ json }) => ({ data: json }));
  },
};
