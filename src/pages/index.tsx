import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api, RouterOutputs } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();
  if (!user) return null;
  console.log(user);
  return (
    <div className="flex w-full gap-x-3">
      <img
        src={user.profileImageUrl}
        alt="User Profile Image"
        className="h-14 w-14 rounded-full"
      />
      <input
        type="text"
        placeholder="Type some message"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="flex items-center gap-4 border-b border-slate-400 p-4"
    >
      <img src={author?.image} className="h-14 w-14 rounded-full" />
      <div className="flex flex-col">
        <div className="flex text-slate-400">
          <span>{`@${author?.name}`}</span>
          <span>&nbsp;· 4 hours ago</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  const { data } = api.posts.getAll.useQuery();
  if (!data) return <div>Loading</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            <div>{!user.isSignedIn && <SignInButton />}</div>
            <div>{user.isSignedIn && <CreatePostWizard />}</div>
          </div>
          <div className="flex flex-col">
            {data &&
              data?.map((fullPost) => (
                <PostView {...fullPost} key={fullPost.post?.id} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
