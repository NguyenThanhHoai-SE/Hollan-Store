import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import HomePage from "../components/HomePage";
import { Product } from '../model/type';
import store from "@/store";
import API from "@/services/Api";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const products: any = await store.dispatch(API.getProducts);
  const repo: Product[] = products.data;
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Product[] }>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const topProducts = [...repo].slice(0, 3) ?? [];
  const products = [...repo].splice(3) ?? [];

  return <HomePage topProducts={topProducts} products={products} />;
}
