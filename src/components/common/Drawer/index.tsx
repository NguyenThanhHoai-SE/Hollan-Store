/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, Space } from "antd";
import styles from "./index.module.scss";
import { CartEmpty } from "./CartEmpty";
import { ProductCus } from "../../../model/type";
import { CartItem } from "./CartItem/index";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
interface Props {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}
export default function DrawerCo(props: Props) {
  const { isShow, setIsShow } = props;
  const onClose = () => {
    setIsShow(false);
  };

  const cartLocal = JSON.parse(localStorage.getItem("cartList") ?? "[]");
  const [cart, setCart] = useState<ProductCus[]>(cartLocal);

  useEffect(() => {
    if (isShow) {
      setCart(cartLocal);
    }
  }, [isShow]);

  const handleCart = (cartTemp: ProductCus[]) => {
    setCart(cartTemp);
    localStorage.setItem("cartList", JSON.stringify(cartTemp));
  };

  const total = useMemo(() => {
    const initialValue = 0;
    const sumWithInitial = cart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price*currentValue.count,
      initialValue
    );
    return sumWithInitial;
  }, [cart]);

  return (
    <Drawer
      className={styles.drawer_cus}
      title="My Cart"
      placement={"right"}
      style={{ backgroundColor: "black" }}
      closable={false}
      onClose={onClose}
      open={isShow}
      key={"right"}
      extra={
        <button aria-label="Close cart" onClick={onClose}>
          <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 transition-all ease-in-out hover:scale-110 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </button>
      }
    >
      {cart.length > 0 ? (
        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4">
            {cart.map((e: ProductCus, index: number) => (
              <li
                key={index}
                className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
              >
                <CartItem item={e} cart={cart} setCart={handleCart} />
              </li>
            ))}
          </ul>

          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Taxes</p>
              <p className="text-right text-base text-black dark:text-white">
                $0.00 <span className="ml-1 inline">USD</span>
              </p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p className="Shipping">Shipping</p>
              <p className="text-right">Calculated at checkout</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p>Total</p>
              <p className="text-right text-base text-black dark:text-white">
                ${total} <span className="ml-1 inline">USD</span>
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
          >
            Proceed to Checkout
          </Link>
        </div>
      ) : (
        <CartEmpty />
      )}
    </Drawer>
  );
}
