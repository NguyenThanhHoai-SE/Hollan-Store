import { Product, ProductCus } from "../../model/type";
import Image from "next/image";
import SizeAndColor from "./SizeAndColor";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useMainLayoutContext } from "@/components/common/Head/MainLayoutContext";
import moment from "moment";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectColor, setSelectColor] = useState<string>("");
  const [selectSize, setSelectSize] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { setIsShowCart, setIsLoading } = useMainLayoutContext();

  const addToCart = () => {
    let cart: ProductCus[] = JSON.parse(
      localStorage.getItem("cartList") ?? "[]"
    );
    if (cart.length > 0) {
      let indexProduct = cart.findIndex(
        (e) =>
          e.id === product.id &&
          e.color === selectColor &&
          e.size === selectSize
      );
      if (indexProduct >= 0) {
        cart.splice(indexProduct, 1, {
          ...cart[indexProduct],
          count: cart[indexProduct].count + 1,
        });
      } else {
        cart.push({
          ...product,
          count: 1,
          color: selectColor,
          size: selectSize,
          idCart: moment().format("YYYYMMDD_HHmmss"),
        });
      }
    } else
      cart.push({
        ...product,
        count: 1,
        color: selectColor,
        size: selectSize,
        idCart: moment().format("YYYYMMDD_HHmmss"),
      });
    localStorage.setItem("cartList", JSON.stringify(cart));
    setIsLoading(true);
    setTimeout(() => {
      setIsShowCart(true);
      setIsLoading(false);
    }, 500)
  };

  useEffect(() => {
    const fetchGetProductsByCategory = async () => {
      await fetch(
        `https://fakestoreapi.com/products/category/${product.category}`
      )
        .then((res) => res.json())
        .then((json) =>
          setRelatedProducts(json?.filter((e: Product) => e.id !== product.id))
        );
      setIsLoading(false);
    };

    if (product) {
      setIsLoading(true);
      fetchGetProductsByCategory();
    }
  }, [product, setIsLoading]);

  const isAddToCart = useMemo(() => {
    if (!["electronics", "jewelery"].includes(product.category))
      return selectColor && selectSize;
    return true;
  }, [selectColor, selectSize, product]);

  const colors = [
    {
      id: 1,
      name: "black",
      isSold: false,
    },
    {
      id: 2,
      name: "white",
      isSold: false,
    },
    {
      id: 3,
      name: "blue",
      isSold: true,
    },
  ];

  const sizes = [
    {
      id: 1,
      name: "S",
      isSold: false,
    },
    {
      id: 2,
      name: "M",
      isSold: false,
    },
    {
      id: 3,
      name: "L",
      isSold: false,
    },
    {
      id: 4,
      name: "XL",
      isSold: true,
    },
    {
      id: 5,
      name: "XXL",
      isSold: true,
    },
    {
      id: 6,
      name: "XXXL",
      isSold: false,
    },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
        {/* left */}
        <div className="h-full w-full basis-full lg:basis-4/6">
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-[#ffffff]">
            <Image
              alt={product.title}
              src={product.image}
              fill
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* right */}
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <p>
                ${product.price} <span className="ml-1 inline">USD</span>
              </p>
            </div>
          </div>

          {!["electronics", "jewelery"].includes(product.category) && (
            <>
              <SizeAndColor
                title="color"
                list={colors}
                setValue={(value: string) => setSelectColor(value)}
                value={selectColor}
              />
              <SizeAndColor
                title="size"
                list={sizes}
                setValue={(value: string) => setSelectSize(value)}
                value={selectSize}
              />
            </>
          )}

          <div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-6 text-sm leading-tight dark:text-white/[60%]">
            {product.description}
          </div>
          <button
            onClick={addToCart}
            disabled={!isAddToCart}
            className={`relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white ${
              isAddToCart
                ? "hover:opacity-90"
                : "cursor-not-allowed opacity-60 hover:opacity-60"
            }`}
          >
            <div className="absolute left-0 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </div>
            Add To Cart
          </button>
        </div>
      </div>

      <div className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <ul className="flex w-full gap-4 overflow-x-auto pt-1">
          {relatedProducts.map((item) => (
            <li
              key={item.id}
              className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Link
                className="relative h-full w-full"
                href={`/product/${item.id}`}
              >
                <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                  <Image
                    className="relative bg-[#ffffff] h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    fill
                    src={item.image}
                    loading="lazy"
                    alt=""
                    sizes={`(min-width: 768px) 33vw, 50vw`}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                    <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                      <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                        {item.title}
                      </h3>
                      <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                        ${item.price}
                        <span className="ml-1 inline hidden @[275px]/label:inline">
                          USD
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
