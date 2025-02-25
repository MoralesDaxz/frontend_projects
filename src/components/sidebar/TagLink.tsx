
import { FC } from "react";

interface TabProps {
  url: string;
  title: string;
  srcImg: string;
  isActive: boolean;
}
const TabLink: FC<TabProps> = ({ url, title, isActive, srcImg }) => {
  const defaultTab =
    "group-hover/track:pl-1 transition-all duration-300 font-medium";
  const openTab = `${defaultTab} w-fit max-w-[350px] opacity-100`;
  const closeTab = `${defaultTab} w-[0px] opacity-0 `;
  return (
    <>
      <a href={url} className="w-fit group/track flex items-center gap-1">
        <img
          alt={title}
          src={srcImg}
          width={50}
          height={50}
          className="w-[25px] h-[25px] rounded-sm text-center"
        />

        <p className={isActive ? openTab : closeTab}>{title}</p>
      </a>
    </>
  );
};

export default TabLink;