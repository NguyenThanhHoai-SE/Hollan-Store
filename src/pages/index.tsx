import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import HomePage from "../components/HomePage";
import { Product } from '../model/type';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("https://fakestoreapi.com/products");
  const repo: Product[] = await res.json();
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
