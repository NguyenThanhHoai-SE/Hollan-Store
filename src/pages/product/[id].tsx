import Head from "next/head";
import ProductDetail from "../../components/ProductDetail/index";
import { Product } from "../../model/type";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import store from "@/store";
import API from "@/services/Api";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  // Fetch data from external API
  const product: any = await store.dispatch(() => API.getProductDetail({ id }));

  const repo: Product = product.data;
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Product }>;

const SearchPageIndex = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Product Detail</title>
        <meta content="Product Detail" property="og:title" />
      </Head>
      <ProductDetail product={repo} />
    </>
  );
};

export default SearchPageIndex;
