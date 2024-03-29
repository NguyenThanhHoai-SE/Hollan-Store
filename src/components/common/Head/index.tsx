/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMainLayoutContext } from "./MainLayoutContext";
import DrawerCo from "../Drawer";
export default function Header() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const { isShowCart, setIsShowCart } = useMainLayoutContext();

  useEffect(() => {
      setCart(
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cartList") ?? "[]")
          : []
      );
  }, [isShowCart]);

  const listNav = [
    {
      name: "All",
      link: "/search/",
    },
    {
      name: "men's clothing",
      link: "/search/men's clothing",
    },
    {
      name: "event",
      link: "/event",
    },
  ];

  useEffect(() => {
    router.prefetch("/search");
  }, [router]);

  const cartCount = useMemo(() => {
    return cart?.length ?? 0;
  }, [cart]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      const q = e.currentTarget.value;

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              href="/"
            >
              <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Acme Store logo"
                  viewBox="0 0 32 28"
                  className="h-4 w-4 fill-black dark:fill-white h-[16px] w-[16px]"
                >
                  <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
                  <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
                </svg>
              </div>
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                Hollan Store
              </div>
            </Link>

            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {listNav.map((e, index) => (
                <li key={index}>
                  <a
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300 capitalize"
                    href={e.link}
                  >
                    {e.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden justify-center md:flex md:w-1/3">
            <form
              className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                onKeyUp={handleKeyUp}
                name="search"
                type="text"
                placeholder="Search for products..."
                autoComplete="off"
                defaultValue={router.query.q}
                className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
              />
              <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </div>
            </form>
          </div>

          <div className="flex justify-end md:w-1/3">
            <div
              className={`border rounded-full h-[20px] w-[20px] text-xs flex justify-center items-center absolute top-[7px] right-[18px] bg-[#ffffff] text-[#000000] z-[1] ${
                cartCount === 0 && "hidden"
              }`}
            >
              {cartCount}
            </div>
            <button aria-label="Open cart" onClick={() => setIsShowCart(true)}>
              <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 transition-all ease-in-out hover:scale-110 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <DrawerCo isShow={isShowCart} setIsShow={setIsShowCart} />
    </>
  );
}
