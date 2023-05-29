import Link from "next/link";
import { Clip as ClipProps } from "../../pages";
import Clip from "./clip";

interface ClipCategoryProps {
  clips: ClipProps[];
  name: string;
  handleCurrentClip: (clip: ClipProps) => void;
  showSeeAll: boolean;
}

const ClipCategory: React.FC<ClipCategoryProps> = ({
  clips,
  name,
  handleCurrentClip,
  showSeeAll,
}) => {
  return (
    <div className="category">
      <div className="category-heading">
        <div className="d-flex justify-content-between">
          <div>{name}</div>
          {showSeeAll && (
            <Link href={`/clips?category=${name}`}>
              <div className="text-success">See all</div>
            </Link>
          )}
        </div>
      </div>
      <div className="category-body d-flex justify-content-between">
        {clips.map((clip, index) => (
          <Clip
            key={index}
            clip={clip}
            handleCurrentClip={(clip) => handleCurrentClip(clip)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClipCategory;
