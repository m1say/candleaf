const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
import { formatImageURL } from "../utils/products";
import axios from "axios";

const fieldResolver = ({
  owner,
  text,
  rating,
  avatar: {
    img: { url, height, width, alternativeText: alt },
  },
}) => {
  return {
    owner,
    text,
    rating,
    avatar: { url: formatImageURL(url), height, width, alt },
  };
};

export const fetchTestimonials = async (filters = "") => {
  const res = await axios.get(`${API_URL}/testimonials${filters}`);
  let { data } = res;
  return data.map((d) => fieldResolver(d));
};
