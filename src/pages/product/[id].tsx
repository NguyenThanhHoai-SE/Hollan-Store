import { NextPage } from "next";
import Head from 'next/head';
import ProductDetail from '../../components/ProductDetail/index';
import { Product } from '../../model/type';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
    const {id} = context.query;
    console.log("context", id);
    // Fetch data from external API
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const repo: Product = await res.json();
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
      <ProductDetail product={repo}/>
    </>
  );
};

export default SearchPageIndex;
