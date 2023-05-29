import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useQueryClient, useQuery } from "@tanstack/react-query";

// import { fetchClips } from "../providers/clips";
import ClipCategory from "../components/clip/clipCategory";
import { useMemo } from "react";

export interface Clip {
  category: string;
  video: string;
  image: string;
  createdAt: number;
}

export default function Home({ clips }) {
  // const queryClient = useQueryClient();

  // const {
  //   isLoading,
  //   isError,
  //   data: clips,
  // } = useQuery({
  //   queryKey: ["fetchClips"],
  //   queryFn: fetchClips,
  // });

  console.log(clips);

  const findCategories = (clips: Clip[]): string[] => {
    return [...new Set(clips.map((clip) => clip.category))];
  };

  const clipCategories = useMemo(() => findCategories(clips), [clips]);

  return (
    <>
      <Head>
        <title>Powder GG</title>
        <meta name="description" content="Powder GG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {clips && clips.length > 0 && (
          <>
            <ClipCategory clips={clips.slice(0, 5)} name="Recents" />
            {clipCategories.map((category) => (
              <ClipCategory
                clips={clips
                  .filter((clip) => clip.category === category)
                  .slice(0, 5)}
                name={category}
              />
            ))}
          </>
        )}
      </main>
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
  return {
    props: { clips },
    // revalidate data every 60 seconds
    revalidate: 60,
  };
};
