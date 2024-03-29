import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../model/type";

export default function ProductItem({ item }: { item: Product }) {
  return (
    <Link className="relative inline-block h-full w-full" href={`/product/${item.id}`}>
      <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
        <Image
          className="bg-[#ffffff] relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          src={item.image}
          fill
          alt={item.title}
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
              {item.title}
            </h3>
            <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
              ${item.price}{" "}
              <span className="ml-1 inline hidden @[275px]/label:inline">
                USD
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
