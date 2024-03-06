import getParamCaseInsensitive from "@/util/getParamCaseInsensitive";
import { GetServerSidePropsContext, NextPage } from "next";

const Index: NextPage = () => {
    return <div />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {query} = context;

    const id = getParamCaseInsensitive(query ?? {}, 'id');

    if (!id) {
        return {
          notFound: true,
        };
      }

      return {
        redirect: {
            destination: `/product/${id}`
        }
      }
}

export default Index;