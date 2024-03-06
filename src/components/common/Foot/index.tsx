import Link from "next/link"

export default function Footer() {

    const listFootNav = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Term & Conditions",
            link: "/terms-conditions"
        },
        {
            name: "Shipping & Return Policy",
            link: "/shipping-return-policy"
        },
        {
            name: "FAQ",
            link: "/frequently-asked-questions"
        },

    ]
    return(
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
                <div>
                    <a className="flex items-center gap-2 text-black dark:text-white md:pt-1">
                        <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[30px] w-[30px] rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Acme Store logo" viewBox="0 0 32 28" className="h-4 w-4 fill-black dark:fill-white h-[10px] w-[10px]"><path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path><path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path></svg>
                        </div>
                        <span className="uppercase">Hollan Store</span>
                    </a>
                </div>

                <nav>
                    <ul>
                        {
                            listFootNav.map((item, index) => (
                                <li key={index}>
                                    <Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm text-black dark:text-neutral-300" href={`${item.link}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="md:ml-auto">
                    <a className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" href="https://gitlab.qtsd.vn/qts-team/demo_nextjs/-/tree/dev/hollan-research">
                    <span className="px-3">▲</span>
                    <hr className="h-full border-r border-neutral-200 dark:border-neutral-700"/>
                    <span className="px-3">Deploy</span>
                    </a>
                </div>
            </div>

            <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
                    <p>© 2024-2025 HOLLAN, Inc. All rights reserved.</p>
                    <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block"/>
                    <p>Designed in California</p>
                    <p className="md:ml-auto">
                        <a href="https://gitlab.qtsd.vn/qts-team/demo_nextjs/-/tree/dev/hollan-research" className="text-black dark:text-white">Crafted by ▲ Vercel</a>
                    </p>
                </div>
            </div>
        </div>
    )
}