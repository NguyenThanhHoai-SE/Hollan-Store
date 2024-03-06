import { Product } from "@/model/type";
import { useEffect } from "react";
declare global {
  interface Window {
    getProduct: (id: string) => void;
  }
}

const InitExposedFunctions = () => {
  useEffect(() => {
    window.getProduct = async (id: string) => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const repo: Product = await res.json();
        return repo;
      } catch (error) {
        return {};
      }
    };
  }, []);

  return <div />;
};

export default InitExposedFunctions;
