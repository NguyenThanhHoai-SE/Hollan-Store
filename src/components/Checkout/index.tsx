import { Breadcrumb, Form, Input, Button, Select } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import Checkbox from "antd/es/checkbox/Checkbox";
import { ProductCus } from "../../model/type";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
export function Checkout() {
  const items = [
    {
      title: <p style={{ color: "rgb(0,112,243)" }}>Cart</p>,
    },
    {
      title: <p style={{ color: "white", fontWeight: "bold" }}>Information</p>,
      // href: "/",
    },
    {
      title: <p style={{ color: "rgb(255 255 255 / 66%)" }}>Shipping</p>,
      // href: "/",
    },
    {
      title: <p style={{ color: "rgb(255 255 255 / 66%)" }}>Payment</p>,
      // href: "/",
    },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const [form] = Form.useForm();

  const [cart, setCart] = useState<ProductCus[]>([]);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Access localStorage
      const storedData = JSON.parse(localStorage.getItem("cartList") ?? "[]");
      setCart(storedData);
    }
  }, []);

  const total = useMemo(() => {
    const initialValue = 0;
    const sumWithInitial = cart.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.count,
      initialValue
    );
    return sumWithInitial;
  }, [cart]);

  return (
    <div className={`${styles.checkout} flex mt-[50px] justify-center`}>
      <div className="w-[675px] px-[38px] h-full border-r-[1px] border-neutral-200 dark:border-neutral-800">
        <div>
          <Link
            className="mr-2 flex items-center w-full md:w-auto lg:mr-6"
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
        </div>
        <div className="my-5">
          <Breadcrumb
            separator=">"
            items={items}
            className={styles.Breadcrumb}
          />
        </div>
        <Form form={form} onFinish={onFinish}>
          <div className="my-5 text-[#fff]">
            <p className="capitalize font-bold text-[17px] mb-2">contact</p>
            <Form.Item name="emailOrPhone" className="mb-2">
              <Input size="large" placeholder="Email or mobile phone number" />
            </Form.Item>
            <Form.Item name="isGiveEmail" valuePropName="checked">
              <Checkbox>
                <p className="text-[#fff]">Email me with news and offers</p>
              </Checkbox>
            </Form.Item>
          </div>
          <div className="my-5 text-[#fff]">
            <p className="capitalize font-bold text-[17px] mb-2">
              Shipping address
            </p>
            <Form.Item name="country">
              <Select className={styles.select} placeholder="Country/Region">
                <Select.Option value="VietNam">Vietnam</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex space-x-3">
              <Form.Item name="firstName" className="w-full">
                <Input size="large" placeholder="First Name" />
              </Form.Item>
              <Form.Item name="lastName" className="w-full">
                <Input size="large" placeholder="Last Name" />
              </Form.Item>
            </div>
            <Form.Item name="address" className="w-full">
              <Input size="large" placeholder="Address" />
            </Form.Item>
            <Form.Item name="apartment" className="w-full">
              <Input
                size="large"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </Form.Item>
            <div className="flex space-x-3">
              <Form.Item name="city" className="w-full">
                <Input size="large" placeholder="City" />
              </Form.Item>
              <Form.Item name="district" className="w-full">
                <Input size="large" placeholder="District" />
              </Form.Item>
              <Form.Item name="ward" className="w-full">
                <Input size="large" placeholder="Ward" />
              </Form.Item>
            </div>
            <Form.Item name="isSaveInfo" valuePropName="checked">
              <Checkbox>
                <p className="text-[#fff]">
                  Save this information for next time
                </p>
              </Checkbox>
            </Form.Item>
          </div>
          <div className="flex justify-between items-center">
            <Link href="/">
              <p className="font-bold text-[#fff] text-[rgb(86,139,255)]">
                &lt; Return to cart
              </p>
            </Link>
            <Button type="primary" htmlType="submit">
              Continue to shipping
            </Button>
          </div>
        </Form>
      </div>
      <div className="w-[675px] h-full px-[38px]">
        <div>
          <ul className="flex-grow overflow-auto py-4">
            {cart.map((e: ProductCus, index: number) => (
              <li key={index} className="flex w-full flex-col my-5">
                <div className="flex justify-between">
                  <div className="flex flex-row space-x-4">
                    <div className="relative w-[62px] h-[62px]">
                      <Image
                        alt={e.title}
                        src={e.image}
                        fill
                        className="rounded bg-[#fff]"
                        loading="lazy"
                      />
                      <div className="absolute top-[-10px] right-[-10px] border rounded-full bg-[#000000] w-[20px] h-[20px] flex justify-center items-center">
                        {e.count}
                      </div>
                    </div>

                    <div className="flex flex-col px-5">
                      <p>{e.title}</p>
                      {e.color && e.size && (
                        <p className="text-[#A8A8A8] capitalize">
                          {e.color} / {e.size}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p>${e.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex justify-between py-1">
            <p>Subtotal</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>Shipping</p>
            <p className="text-[#A8A8A8]">Calculated at next step</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-[20px] font-bold">Total</p>
            <p className="text-[20px] font-bold">
              <span className="text-[12px] text-[#A8A8A8] font-normal">
                USD{" "}
              </span>
              ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
