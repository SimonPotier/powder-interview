import Head from "next/head";
import { useQueryClient } from "react-query";

import { fetchClips } from "../../providers/clips";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

type Clip = {
  category: string;
  video: string;
  image: string;
  createdAt: Date;
};

export default function Home({ clips }) {
  // const {
  //   isLoading,
  //   isError,
  //   data: clips,
  // } = useQueryClient({
  //   queryKey: ["fetchClips"],
  //   queryFn: fetchClips,
  // });

  console.log(clips);
  return (
    <>
      <Head>
        <title>Powder GG</title>
        <meta name="description" content="Powder GG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  clips: Clip;
}> = async () => {
  const res = await fetch(
    "https://assets.dev.verse-core.vrse.gg/frontend-interview/data.json"
  );
  const clips = await res.json();
  return { props: { clips } };
};
