import { useRouter } from "next/router";
import Collection from "./Collection";
import ListProduct from "./ListProduct";
import { useState } from "react";

export default function Search({ collections }: { collections: string[] }) {
  const router = useRouter();
  const { category, q } = router.query;
  const sortList = ["asc", "desc"];
  const [sort, setSort] = useState("asc");

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
      <Collection category={category as string} collections={collections} />
      <ListProduct
        category={category as string}
        sort={(sort as string) ?? "asc"}
        q = {q as string ?? ''}
        isReady = {router.isReady && router.pathname.includes('category') ? !!category : true}
      />
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
            Sort by
          </h3>
          <ul className="hidden md:block">
            {sortList.map((e, index) => (
              <li
                key={index}
                className="mt-2 flex text-sm text-black dark:text-white"
              >
                <p
                  className={`w-full hover:underline hover:underline-offset-4 capitalize cursor-pointer ${
                    e === sort && "underline underline-offset-4"
                  }`}
                  onClick={() => {
                    setSort(e);
                  }}
                >
                  {e}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
