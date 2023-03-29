import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api, RouterOutputs } from "~/utils/api";

const SinglePostPage: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching early
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>Post View</div>
      </main>
    </>
  );
};

export default SinglePostPage;
