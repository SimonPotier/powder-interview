import { Clip as ClipProps } from "../../pages";
import Clip from "./clip";

interface ClipCategoryProps {
  clips: ClipProps[];
  name: string;
}

const ClipCategory: React.FC<ClipCategoryProps> = ({ clips, name }) => {
  return (
    <div className="category">
      <div className="category-heading">{name}</div>
      <div className="category-body d-flex justify-content-between">
        {clips.map((clip, index) => (
          <Clip key={index} clip={clip} />
        ))}
      </div>
    </div>
  );
};

const Player = ({ src }) => {
  return (
    <div>
      <video width="100%" height="100%" controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default ClipCategory;
