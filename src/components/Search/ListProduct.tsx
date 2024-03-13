/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Product } from "../../model/type";
import ProductItem from "../common/ProductItem/index";
import { useMainLayoutContext } from "../common/Head/MainLayoutContext";
import { useDispatch } from "react-redux";
import { getAction } from "@/fadux";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";
import { Response } from "@/fadux/typings/Response";
import { getProductsByCategory } from "../../sagas/productSaga";

export default function ListProduct({
  category,
  sort,
  isReady,
  q,
}: {
  category: string;
  sort: string;
  isReady: boolean;
  q: string;
}) {
  const { setIsLoading } = useMainLayoutContext();
  const dispatch = useDispatch();
  const { res: productList, isLoading: isLoadingProducts } = useSelector<
    RootState,
    Response
  >((state) => state.product.getProducts || {});
  const { res: productsByCategory, isLoading: isLoadingProductsByCategory } =
    useSelector<RootState, Response>(
      (state) => state.product.getProductsByCategory || {}
    );

  const getAllProduct = () => {
    dispatch(getAction("getProducts")({ sort }));
  };

  const getProductsByCategory = () => {
    dispatch(getAction("getProductsByCategory")({ category, sort }));
  };

  useEffect(() => {
    setIsLoading(!!isLoadingProducts || !!isLoadingProductsByCategory);
  }, [isLoadingProducts, isLoadingProductsByCategory]);

  useEffect(() => {
    if (!isReady) return;
    if (!category) {
      getAllProduct();
    } else {
      getProductsByCategory();
    }
  }, [category, sort, isReady]);

  return (
    <div className="order-last min-h-screen w-full md:order-none">
      <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(isReady ? category ? productsByCategory :  productList : [])
          ?.filter(
            (e: Product) =>
              e.title.toLocaleLowerCase().includes(q.toLocaleLowerCase()) || !q
          )
          .map((e: Product, index: number) => (
            <li
              key={index}
              className="aspect-square transition-opacity animate-fadeIn"
            >
              <ProductItem item={e} />
            </li>
          ))}
      </ul>
    </div>
  );
}
