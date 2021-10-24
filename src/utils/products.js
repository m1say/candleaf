const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const formatImageURL = (url) => {
  return `${url.startsWith("/") ? API_URL : ""}${url}`;
};

export const buildCartQuery = (data) => {
  const query = Object.keys(data).reduce((accum, slug, index) => {
    let part = "slug_in=" + slug;
    let prefix = index === 0 ? "?" : "&";
    return accum + prefix + part;
  }, "");
  return query;
};
