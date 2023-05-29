import { useMemo } from "react";
import Head from "next/head";
import type { GetStaticProps } from "next";
import { Inter } from "next/font/google";

import ClipCategory from "../components/clip/clipCategory";
import ClipModal from "../components/modals/clipModal";
import useClip from "./hooks/useClip";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { fetchClips } from "./actions/clips";

export interface Clip {
  category: string;
  video: string;
  image: string;
  createdAt: number;
}

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home({ clips }) {
  const {
    handleCurrentClip,
    handleClipModalToggle,
    currentClip,
    clipModalOpen,
    bodyContent,
  } = useClip();
  const { width } = useWindowDimensions();

  const findCategories = (clips: Clip[]): string[] => {
    return [...new Set(clips.map((clip) => clip.category))];
  };

  const clipCategories = useMemo(() => findCategories(clips), [clips]);

  const displayedClipsNumber = (width) => {
    let n;
    switch (true) {
      case width < 992:
        n = 3;
        break;
      case width < 1312:
        n = 4;
        break;
      default:
        n = 5;
        break;
    }
    return n;
  };

  const clipsNumber = useMemo(() => displayedClipsNumber(width), [width]);
  console.log(clipsNumber);

  return (
    <>
      <Head>
        <title>Powder GG</title>
        <meta name="description" content="Powder GG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        {clips && clips.length > 0 && (
          <>
            <ClipCategory
              showSeeAll
              clips={clips.slice(0, clipsNumber)}
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
                  .slice(0, clipsNumber)}
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
  const clips = await fetchClips();
  return {
    props: { clips },
    // revalidate data every 60 seconds
    revalidate: 60,
  };
};
