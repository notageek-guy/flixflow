import { AuthRoute } from "@/components/AuthRoute";
import Content from "@/components/Content";
import Layout from "@/components/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movie App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthRoute>
        <Layout>
          <Content />
        </Layout>
      </AuthRoute>
    </div>
  );
};

export default Home;
