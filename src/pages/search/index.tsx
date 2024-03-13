import Search from "../../components/Search";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import store from "@/store";
import API from "@/services/Api";

export const getStaticProps = (async () => {
  const categoryList: any = await store.dispatch(API.getCategories);
  const categories = categoryList?.data ?? [];
  return { props: { categories } };
}) satisfies GetStaticProps<{
  categories: string[];
}>;

const SearchPageIndex = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const collections = ['All', ...(categories ?? [])]
  return (
    <>
      <Head>
        <title>Search</title>
        <meta content="Search" property="og:title" />
      </Head>
      <Search collections={collections}/>
    </>
  );
};

export default SearchPageIndex;
