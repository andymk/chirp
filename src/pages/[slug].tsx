import { SignInButton, useUser } from "@clerk/nextjs";
import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import { LoadingSpinner } from "~/components/loading";

import { api, RouterOutputs } from "~/utils/api";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const ProfilePage: NextPage<{ userId: string }> = ({ userId }) => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { data, isLoading } = api.profiles.getUserByUsername.useQuery({
    id: userId,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>Profile View</div>
        <div>{data.name}</div>
      </main>
    </>
  );
};

import { generateSSHelper } from "~/server/helpers/ssgHelper";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import { prisma } from "~/server/db";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const userId = slug.replace("@", "");

  await ssg.profiles.getUserByUsername.prefetch({ id: userId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
