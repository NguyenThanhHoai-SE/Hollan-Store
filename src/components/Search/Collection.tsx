import Link from "next/link";
export default function Collection({
  category,
  collections,
}: {
  category: string;
  collections: string[];
}) {
  return (
    <div className="order-first w-full flex-none md:max-w-[125px]">
      <nav>
        <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
          Collections
        </h3>
        <ul className="hidden md:block">
          {collections.map((e, index) => (
            <li className="mt-2 flex text-black dark:text-white" key={index}>
              <Link
                href={`${e !== "All" ? "/search/" + e : "/search"}`}
                className={`w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100 ${
                  (e === category || (!category && e === "All")) &&
                  "underline underline-offset-4"
                }`}
              >
                {e}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
