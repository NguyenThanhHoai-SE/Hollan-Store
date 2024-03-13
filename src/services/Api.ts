import axios from "axios";
import qs from "querystringify";
import { APIType } from "./typings/Api";

export const Create = (baseURL = process.env.NEXT_PUBLIC_API_URL) => {
  const api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    // 10 second timeout...
    timeout: 20000,
  });

  const GET = (payload: any) =>
    api.get(`${payload?.path}?${qs.stringify(payload?.params)}`, {
      // headers: {
      //   Authorization: "Bearer " + CookiesService.getClientCookies("token"),
      // },
    });

  const POST = (payload: any) =>
    api.post(`${payload?.path}`, payload?.params, {
      // headers: {
      //   Authorization: "Bearer " + CookiesService.getClientCookies("token"),
      // },
    });

  const PUT = (payload: any) =>
    api.put(payload?.path, payload?.params, {
      // headers: {
      //   Authorization: "Bearer " + CookiesService.getClientCookies("token"),
      // },
    });

  const DELETE = (payload: any) =>
    api.delete(`${payload?.path}?${qs.stringify(payload?.params)}`, {
      // headers: {
      //   Authorization: "Bearer " + CookiesService.getClientCookies("token"),
      // },
    });

  // ===============================================================================================================

  const getProducts = (payload: any) =>
    api.get(`/products?${qs.stringify(payload)}`, {
      headers: {
        // Authorization: "Bearer " + "",
      },
    });

    const getProductDetail = (payload: any) =>
    api.get(`/products/${payload.id}`, {
      headers: {
        // Authorization: "Bearer " + "",
      },
    });

    const getProductsByCategory = (payload: any) =>
    api.get(`/products/category/${payload.category}?${qs.stringify(payload)}`, {
      headers: {
        // Authorization: "Bearer " + "",
      },
    });

    const getCategories = () =>
    api.get(`/products/categories`, {
      headers: {
        // Authorization: "Bearer " + "",
      },
    });

  return {
    GET,
    POST,
    PUT,
    DELETE,

    getProducts,
    getProductDetail,
    getProductsByCategory,
    getCategories
  };
};

// let's return back our create method as the default.
const API: APIType = Create();

export default API;
