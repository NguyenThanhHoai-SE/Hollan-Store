import { useEffect, useState } from "react";
import { Product } from '../../model/type';
import ProductItem from '../common/ProductItem/index';

export default function ListProduct({
  category,
  isReady,
  sort,
  q
}: {
  category: string;
  isReady: boolean;
  sort: string;
  q: string;
}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllProduct = () => {
      if (!isReady) return;
      fetch(`https://fakestoreapi.com/products?sort=${sort}`)
        .then((res) => res.json())
        .then((json) => setProducts(json));
    };

    const fetchGetProductsByCategory = () => {
      fetch(`https://fakestoreapi.com/products/category/${category}?sort=${sort}`)
        .then((res) => res.json())
        .then((json) => setProducts(json));
    };

    if (!category) {
      fetchAllProduct();
    } else {
      fetchGetProductsByCategory();
    }
  }, [category, isReady, sort]);

  return (
    <div className="order-last min-h-screen w-full md:order-none">
      <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
            products?.filter((e: Product) => e.title.toLocaleLowerCase().includes(q.toLocaleLowerCase()) || !q).map((e: Product, index) => (
                <li key={index} className="aspect-square transition-opacity animate-fadeIn">
                    <ProductItem item={e} />
                </li>
            ))
        }
      </ul>
    </div>
  );
}
