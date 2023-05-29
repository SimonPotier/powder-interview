/**
 * * Player component: handle clip playing
 */

import { Clip } from "../pages";

interface PlayerProps {
  clip: Clip;
}

const Player = ({ clip }) => {
  return (
    <div>
      <video width="100%" height="100%" controls autoPlay>
        <source src={clip.video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Player;
