const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
import { formatImageURL } from "../utils/products";
import axios from "axios";

const fieldResolver = ({
  title,
  price,
  slug,
  image: { url, height, width, alternativeText: alt },
}) => {
  return {
    title,
    price,
    slug,
    image: { url: formatImageURL(url), height, width, alt },
  };
};

export const fetchProducts = async (filters = "") => {
  const res = await axios.get(`${API_URL}/products${filters}`);
  let { data } = res;
  return data.map((d) => fieldResolver(d));
};

export const getProduct = async (query) => {
  try {
    const res = await axios.get(`${API_URL}/products/${query}`);
    const { data } = res;
    const product = fieldResolver(data);
    return product;
  } catch (error) {
    return { error };
  }
};
