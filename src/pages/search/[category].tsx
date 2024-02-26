import Search from "../../components/Search";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();
  return { props: { categories } };
}) satisfies GetStaticProps<{
  categories: string[];
}>;

const SearchPage = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const collections = ['All', ...(categories ?? [])]
  return (
    <>
      <Head>
        <title>Search</title>
        <meta content="Search" property="og:title" />
      </Head>
      <Search collections={collections} />
    </>
  );
};

export default SearchPage;
