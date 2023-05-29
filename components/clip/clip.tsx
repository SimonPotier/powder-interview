import moment from "moment";
import Image from "next/image";

const Clip = ({ clip }) => {
  return (
    <div className="category-clip-wrapper">
      <div className="category-clip">
        <Image
          src={clip.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={clip.category}
        />
      </div>
      <div className="category-clip-date text-secondary">{`${moment
        .unix(clip.createdAt)
        .format("H")} hours ago`}</div>
    </div>
  );
};

export default Clip;
