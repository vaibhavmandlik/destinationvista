import jsonServerProvider from "ra-data-json-server";
import { CreateParams, fetchUtils, UpdateParams } from "react-admin";
const apiUrl = import.meta.env.VITE_API_URL;

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
type PackageParams = {
  id: string;
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
};
const createPackageFormData = (
  params: CreateParams<PackageParams> | UpdateParams<PackageParams>
) => {
  const formData = new FormData();
  debugger;
  if(params.data.images){
    const imagesArr:any = params?.data?.images;
    for(let fileObj of imagesArr){
      formData.append("images[]", fileObj?.rawFile);
    }
  } 
  params.data.title && formData.append("title", params.data.title);
  params.data.price && formData.append("content", params.data.price);
  params.data.durationDays && formData.append("durationDays", params.data.durationDays);
  params.data.destination && formData.append("destination", params.data.destination);
  params.data.availableSlots && formData.append("availableSlots", params.data.availableSlots);
  params.data.description && formData.append("description", params.data.description);

  return formData;
};
export const dataProviders = {
  ...baseDataProvider,
  create: (resource, params) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      debugger;
      return httpClient(`${apiUrl}/${resource}`, {
          method: "POST",
          body: formData,
        })
        .then(({ json }) => ({ data: json }));
    }
    return baseDataProvider.create(resource, params);
  },
  update: (resource, params) => {
    if (resource === "package") {
      const formData = createPackageFormData(params);
      formData.append("id", params.id);
      return httpClient(`${apiUrl}/${resource}`, {
          method: "PUT",
          body: formData,
        })
        .then(({ json }) => ({ data: json }));
    }
    return baseDataProvider.update(resource, params);
  },
};
