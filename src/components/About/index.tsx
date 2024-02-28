export function AboutCo() {
  return (
    <div className="w-full">
      <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
        <h1 className="mb-8 text-5xl font-bold">About</h1>
        <div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">
          <p>
            This website is built with{" "}
            <a href="https://nextjs.org/commerce" title="Next.js Commerce">
              Next.js Commerce
            </a>
            , which is a ecommerce template for creating a headless Shopify
            storefront.&nbsp;
          </p>
          <p>Support for real-world commerce features including:&nbsp;</p>
          <ul>
            <li>- Out of stocks</li>
            <li>- Order history</li>
            <li>- Order status</li>
            <li>- Cross variant / option availability (aka. Amazon style)</li>
            <li>- 
              <a
                href="https://demo.vercel.store/product/acme-webcam-cover"
                title="Example of a hidden product in Next.js Commerce"
              >
                Hidden products
              </a>
            </li>
            <li>- 
              Dynamically driven content and features via Shopify (ie.
              collections, menus, pages, etc.)
            </li>
            <li>- 
              Seamless and secure checkout via{" "}
              <a
                href="https://www.shopify.com/checkout"
                title="Shopify Checkout"
              >
                Shopify Checkout
              </a>
            </li>
            <li>- And more!</li>
          </ul>
          <p>
            This template also allows us to highlight newer Next.js features
            including:&nbsp;
          </p>
          <ul>
            <li>- Next.js App Router</li>
            <li>- Optimized for SEO using Next.js&apos;s Metadata</li>
            <li>- React Server Components (RSCs) and Suspense</li>
            <li>- Server Actions&nbsp;for mutations</li>
            <li>- Edge runtime</li>
            <li>- New Next.js 13 fetching and caching paradigms</li>
            <li>- Dynamic OG images</li>
            <li>- Styling with Tailwind CSS</li>
            <li>- Automatic light/dark mode based on system settings</li>
            <li>- And more!</li>
          </ul>
        </div>
        <p className="text-sm italic">
          This document was last updated on July 18, 2023.
        </p>
      </div>
    </div>
  );
}
