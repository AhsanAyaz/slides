import "./index.css";
import { Composition } from "remotion";
import { PaginationBug } from "./PaginationBug";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="pagination-bug"
        component={PaginationBug}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
