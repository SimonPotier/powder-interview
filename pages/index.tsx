import Head from "next/head";
import type { GetStaticProps } from "next";

import ClipCategory from "../components/clip/clipCategory";
import { useMemo } from "react";
import ClipModal from "../components/modals/clipModal";
import useClip from "./hooks/useClip";

export interface Clip {
  category: string;
  video: string;
  image: string;
  createdAt: number;
}

export default function Home({ clips }) {
  const {
    handleCurrentClip,
    handleClipModalToggle,
    currentClip,
    clipModalOpen,
    bodyContent,
  } = useClip();

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
            <ClipCategory
              showSeeAll
              clips={clips.slice(0, 5)}
              name="Recents"
              handleCurrentClip={(clip) => handleCurrentClip(clip)}
            />
            {clipCategories.map((category, index) => (
              <ClipCategory
                key={index}
                showSeeAll
                handleCurrentClip={(clip) => handleCurrentClip(clip)}
                clips={clips
                  .filter((clip) => clip.category === category)
                  .slice(0, 5)}
                name={category}
              />
            ))}
          </>
        )}
        <ClipModal
          isOpen={clipModalOpen}
          title={currentClip?.category}
          body={bodyContent}
          onClose={() => handleClipModalToggle(false)}
        />
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
