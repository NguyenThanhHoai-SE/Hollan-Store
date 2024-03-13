import { Button } from "antd";
import Link from "next/link";

export function EventCo() {

  return (
    <div className="flex justify-center">
      <div className="order-last min-h-screen w-full md:order-none max-w-[1200px]">
        <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {new Array(15).fill(null).map((e, index) => (
            <Link
              className="w-full h-[150px] flex justify-center items-center bg-[#ffffff] cursor-pointer"
              key={index}
              href={`/event/${index + 1}`}
            >
              <p className="text-[#000000] font-bold">Event {index + 1}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
