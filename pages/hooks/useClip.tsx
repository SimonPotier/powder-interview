/**
 * * This hook allow modal and player control from everywhere it's needed
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { Clip } from "../index";
import Player from "../../components/player";

const useClip = () => {
  const [currentClip, setCurrentClip] = useState(null);
  const [clipModalOpen, setClipModalOpen] = useState(false);

  // set data when a clip is selected
  const handleCurrentClip = useCallback(
    (clip: Clip) => {
      setCurrentClip(clip);
      setClipModalOpen(true);
    },
    [setCurrentClip, setClipModalOpen]
  );

  const handleClipModalToggle = (val) => {
    setClipModalOpen(val);
  };

  // render component to insert into modal body
  const bodyContent = useMemo(
    () => <Player clip={currentClip} />,
    [currentClip]
  );

  return {
    handleCurrentClip,
    handleClipModalToggle,
    currentClip,
    clipModalOpen,
    bodyContent,
  };
};

export default useClip;
