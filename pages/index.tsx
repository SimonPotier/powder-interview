import Head from "next/head";
import type { GetStaticProps } from "next";

import ClipCategory from "../components/clip/clipCategory";
import { useCallback, useMemo, useState } from "react";
import ClipModal from "../components/modals/clipModal";
import Player from "../components/player";

export interface Clip {
  category: string;
  video: string;
  image: string;
  createdAt: number;
}

export default function Home({ clips }) {
  const [currentClip, setCurrentClip] = useState(null);
  const [clipModalOpen, setClipModalOpen] = useState(false);

  const findCategories = (clips: Clip[]): string[] => {
    return [...new Set(clips.map((clip) => clip.category))];
  };

  const clipCategories = useMemo(() => findCategories(clips), [clips]);

  const handleCurrentClip = useCallback(
    (clip: Clip) => {
      setCurrentClip(clip);
      setClipModalOpen(true);
    },
    [setCurrentClip, setClipModalOpen]
  );

  const bodyContent = useMemo(
    () => <Player clip={currentClip} />,
    [currentClip]
  );

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
          title="Filters"
          body={bodyContent}
          onClose={() => setClipModalOpen(false)}
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
