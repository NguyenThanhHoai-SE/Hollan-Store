import { Product } from "@/model/type";
import Image from "next/image";


export default function Page({topProducts, products}: {topProducts : Product[], products:Product[] } )
{
    return (
        <>
            <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
                {
                    topProducts.map((item, index) => (
                        <div key={item.id} className={`${index > 0 ? 'md:col-span-2' : 'md:col-span-4'} ${index > 0 ? 'md:row-span-1' : 'md:row-span-2'}`}>
                            <a className='relative block aspect-square h-full w-full' href='https://demo.vercel.store/product/acme-geometric-circles-t-shirt'>
                                <div className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800'>
                                    <Image priority className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105' fill src={item.image} alt='' sizes={`(min-width: 768px) ${index > 0 ? '33vw' : '66vw'}, 100vw`} style={{position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: "transparent"}}/>
                                    <div className={`absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label ${index === 0 && 'lg:px-20 lg:pb-[35%]'}`}>
                                        <div className='flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white'>
                                            <h3 className=''>{item.title}</h3>
                                            <p className='flex-none rounded-full bg-blue-600 p-2 text-white'>${item.price} <span className='ml-1 inline hidden @[275px]/label:inline'>USD</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </section>

            <div className='w-full overflow-x-auto pb-6 pt-1'>
                <ul className='flex animate-carousel gap-4'>
                    {
                        products.map((item) => (
                            <li key={item.id} className='relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3'>
                                <a className='relative h-full w-full' href={`https://fakestoreapi.com/products/${item.id}`}>
                                    <div className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800'>
                                    <Image className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105 object-cover' fill src={item.image} alt='' sizes={`(min-width: 768px) 33vw, 50vw`} style={{position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: "transparent"}}/>
                                    <div className='absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label'>
                                        <div className='flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white'>
                                            <h3 className='mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight'>{item.title}</h3>
                                            <p className='flex-none rounded-full bg-blue-600 p-2 text-white'>${item.price}<span className='ml-1 inline hidden @[275px]/label:inline'>USD</span></p>
                                        </div>
                                    </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
  }