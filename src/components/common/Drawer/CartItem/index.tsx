import { ProductCus } from "../../../../model/type";
import Link from "next/link";
import Image from "next/image";

interface Props {
  item: ProductCus;
  cart: ProductCus[];
  setCart: (value: ProductCus[]) => void;
}
export function CartItem(props: Props) {
  const { item, cart, setCart } = props;

  const handleRemove = () => {
    setCart(cart.filter((e) => e.idCart !== item.idCart));
  };

  const handleDecrease = () => {
    if (item.count === 1) {
      handleRemove();
      return;
    }
    let findIndex = cart.findIndex((e) => e.idCart === item.idCart);
    const newItem = {
      ...cart[findIndex],
      count: cart[findIndex].count - 1,
    };
    let newCart = [...cart];
    newCart.splice(findIndex, 1, newItem);
    setCart(newCart);
  };

  const handleInCrease = () => {
    let findIndex = cart.findIndex((e) => e.idCart === item.idCart);
    const newItem = {
      ...cart[findIndex],
      count: cart[findIndex].count + 1,
    };
    let newCart = [...cart];
    newCart.splice(findIndex, 1, newItem);
    setCart(newCart);
  };

  return (
    <div className="relative flex w-full flex-row justify-between px-1 py-4">
      <div className="absolute z-40 -mt-2 ml-[55px]">
        <button
          onClick={handleRemove}
          aria-label="Remove cart item"
          aria-disabled="false"
          className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <p aria-live="polite" className="sr-only" role="status"></p>
      </div>
      <Link
        className="z-30 flex flex-row space-x-4"
        href={`/product/${item.id}`}
      >
        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
          <Image
            alt={item.title}
            src={item.image}
            className="h-full w-full object-cover"
            fill
            priority
          />
        </div>
        <div className="flex flex-1 flex-col text-base">
          <span className="leading-tight line-clamp-2">{item.title}</span>
          {item.color && item.size && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {item.color} / {item.size}
            </p>
          )}
        </div>
      </Link>

      <div className="flex h-16 flex-col justify-between">
        <p className="flex justify-end space-y-2 text-right text-sm">
          ${item.price} <span className="ml-1 inline">USD</span>
        </p>
        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
          {/* - */}
          <div>
            <button
              onClick={handleDecrease}
              aria-label="Reduce item quantity"
              aria-disabled="false"
              className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4 dark:text-neutral-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                ></path>
              </svg>
            </button>
          </div>
          <p className="w-6 text-center">
            <span className="w-full text-sm">{item.count}</span>
          </p>
          {/* + */}
          <div>
            <button
              onClick={handleInCrease}
              aria-label="Increase item quantity"
              aria-disabled="false"
              className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4 dark:text-neutral-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
