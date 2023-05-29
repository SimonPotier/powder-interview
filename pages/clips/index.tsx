import type { GetStaticProps } from "next";
import { Clip } from "..";
import ClipCategory from "../../components/clip/clipCategory";
import { useRouter } from "next/router";
import useClip from "../hooks/useClip";
import ClipModal from "../../components/modals/clipModal";
import moment from "moment";
import { inter } from "..";
import { fetchClips } from "../actions/clips";

export default function Clips({ clips }) {
  const {
    handleCurrentClip,
    handleClipModalToggle,
    currentClip,
    clipModalOpen,
    bodyContent,
  } = useClip();
  const router = useRouter();
  const { category, isReady } = router.query;

  const filterClips = (clips, category): Clip[] => {
    let filteredClips;
    if (category === "Recents") {
      // We do not have a category "Recents" in the API data
      // so we show all the clips sorted by createdAt instead.
      filteredClips = clips.sort((a, b) => {
        // @ts-ignore
        return (
          moment.unix(a.createdAt).format("H") -
          moment.unix(b.createdAt).format("H")
        );
      });
    } else {
      filteredClips = clips.filter((clip) => clip.category === category);
    }
    return filteredClips;
  };

  return (
    <div className={inter.className}>
      <ClipCategory
        showSeeAll={false}
        clips={filterClips(clips, category)}
        name={category}
        handleCurrentClip={(clip) => handleCurrentClip(clip)}
      />
      <ClipModal
        isOpen={clipModalOpen}
        title={currentClip?.category}
        body={bodyContent}
        onClose={() => handleClipModalToggle(false)}
      />
    </div>
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
