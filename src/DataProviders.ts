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
  vendorId: string;
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
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
  startDate: string;
  endDate?: string;
  vendorDiscount: number;
  pickupLocation?: string;
  startPoint?: string;
  endPoint?: string;
  modeOfTravel: string;
  isActive: string;
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

// CREATE: flat structure
const createPackageFormData = (params: CreateParams<PackageParams>) => {
  const formData = new FormData();

  if (params.data.images) {
    const imagesArr: any = params.data.images;
    for (let fileObj of imagesArr) {
      formData.append("images", fileObj.rawFile);
    }
  }

  // Flattened fields
  params.data.title && formData.append("title", params.data.title);
  params.data.price && formData.append("price", params.data.price);
  params.data.durationDays && formData.append("durationDays", params.data.durationDays);
  params.data.destination && formData.append("destination", params.data.destination);
  params.data.availableSlots && formData.append("availableSlots", params.data.availableSlots);
  params.data.description && formData.append("description", params.data.description);
  params.data.vendorId && formData.append("vendorId", params.data.vendorId);

  // Flattened itinerary and details
  params.data.quickItinerary && formData.append("quickItinerary", params.data.quickItinerary);
  params.data.itinerary && formData.append("itinerary", JSON.stringify(params.data.itinerary));
  params.data.inclusion && formData.append("inclusion", params.data.inclusion);
  params.data.exclusion && formData.append("exclusion", params.data.exclusion);
  params.data.otherInfo && formData.append("otherInfo", params.data.otherInfo);
  if (params.data.vendorDiscount !== undefined && params.data.vendorDiscount !== null) {
    formData.append("vendorDiscount", String(params.data.vendorDiscount));
  }
  params.data.pickupLocation && formData.append("pickupLocation", params.data.pickupLocation);
  params.data.startPoint && formData.append("startPoint", params.data.startPoint);
  params.data.endPoint && formData.append("endPoint", params.data.endPoint);
  params.data.modeOfTravel && formData.append("modeOfTravel", params.data.modeOfTravel);

  // Categories
  if (params.data.category && Array.isArray(params.data.category)) {
    params.data.category.forEach((cat: string | number) => {
      formData.append("categories", String(cat));
    });
  }

  // Dates
  params.data.startDate &&
    formData.append("startDate", formatDateToYYYYMMDD(params.data.startDate));
  params.data.endDate &&
    formData.append("endDate", formatDateToYYYYMMDD(params.data.endDate));

  // isApproved
  params.data.isApproved && formData.append("isApproved", params.data.isApproved);

  return formData;
};

// UPDATE: nested details object
const updatePackageFormData = (params: UpdateParams<PackageParams>) => {
  const formData = new FormData();

  if (params.data.images) {
    const imagesArr: any = params.data.images;
    for (let fileObj of imagesArr) {
      formData.append("images", fileObj.rawFile);
    }
  }

  // Flatten main fields
  formData.append("id", params.id);
  params.data.title && formData.append("title", params.data.title);
  params.data.price && formData.append("price", params.data.price);
  params.data.durationDays && formData.append("durationDays", params.data.durationDays);
  params.data.destination && formData.append("destination", params.data.destination);
  params.data.availableSlots && formData.append("availableSlots", params.data.availableSlots);
  params.data.description && formData.append("description", params.data.description);
  params.data.vendorId && formData.append("vendorId", params.data.vendorId);

  // Nest details
  params.data.quickItinerary &&
    formData.append("details[quickItinerary]", params.data.quickItinerary);
  params.data.itinerary &&
    formData.append("details[itinerary]", JSON.stringify(params.data.itinerary));
  params.data.inclusion && formData.append("details[inclusion]", params.data.inclusion);
  params.data.exclusion && formData.append("details[exclusion]", params.data.exclusion);
  params.data.otherInfo && formData.append("details[otherInfo]", params.data.otherInfo);
  if (params.data.vendorDiscount !== undefined && params.data.vendorDiscount !== null) {
    formData.append("details[vendorDiscount]", String(params.data.vendorDiscount));
  }
  params.data.pickupLocation && formData.append("details[pickupLocation]", params.data.pickupLocation);
  params.data.startPoint && formData.append("details[startPoint]", params.data.startPoint);
  params.data.endPoint && formData.append("details[endPoint]", params.data.endPoint);
  params.data.modeOfTravel && formData.append("details[modeOfTravel]", params.data.modeOfTravel);

  // Categories
  if (params.data.category && Array.isArray(params.data.category)) {
    params.data.category.forEach((cat: string | number) => {
      formData.append("categories", String(cat));
    });
  }

  // Dates
  params.data.startDate &&
    formData.append("startDate", formatDateToYYYYMMDD(params.data.startDate));
  params.data.endDate &&
    formData.append("endDate", formatDateToYYYYMMDD(params.data.endDate));

  // isApproved
  params.data.isApproved && formData.append("isApproved", params.data.isApproved);

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
      const formData = updatePackageFormData(params);
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
      const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
      const { field, order } = params.sort || { field: "id", order: "ASC" };
      const filters = params.filter || {};

      const query: any = {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order,
        ...filters,
      };

      const queryString = new URLSearchParams(query).toString();

      return httpClient(`${apiUrl}/${resource}?${queryString}`, { method: "GET" })
        .then(({ json }) => ({ data: json, total: json.length }));
    } else if (resource === "destination") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
      const { field, order } = params.sort || { field: "id", order: "ASC" };
      const filters = params.filter || {};

      const query: any = {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order,
        ...filters,
      };

      const queryString = new URLSearchParams(query).toString();

      return httpClient(`${apiUrl}/${resource}?${queryString}`, { method: "GET" })
        .then(({ json }) => {
          const records = Array.isArray(json) ? json : json.data;

          const updatedRecords = records.map((item: { imagePath: any; id: any }) => ({
            ...item,
            id: item.id,
            imagePath: item.imagePath ? `${apiUrl}${item.imagePath}` : null,
          }));

          return {
            data: updatedRecords,
            total: json.total || updatedRecords.length,
          };
        });
    }
    else if (resource === "category") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
      const { field, order } = params.sort || { field: "id", order: "ASC" };
      const filters = params.filter || {};

      const query: any = {
        _page: page,
        _limit: perPage,
        _sort: field,
        _order: order,
        ...filters,
      };

      const queryString = new URLSearchParams(query).toString();
      return httpClient(`${apiUrl}/${resource}?${queryString}`, { method: "GET" })
        .then(({ json }) => {
          const records = Array.isArray(json) ? json : json.data;
          const updatedRecords = records.map(
            (item: { imagePath: string[] | null; id: number; name: string; description: string }) => {
              let imagePath = "";

              if (Array.isArray(item.imagePath) && item.imagePath.length > 0) {
                imagePath = `${apiUrl}${item.imagePath[0]}`;
              }

              return { ...item, imagePath };
            }
          );
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
