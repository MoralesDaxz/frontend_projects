import { FC, ReactNode, useState } from "react";
import TabLink from "./TagLink";
import { infoTag } from "@utils/sidebar/tag";


type Props = {
  children: ReactNode;
};
const SideBar: FC<Props> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const defaultSide =
    "min-h-screen bg-[#383737] transition-all duration-500 ease-out p-2";
  const openSide = `${defaultSide} w-[300px] max-w-[350px]`;
  const closeSide = `${defaultSide} w-[50px]`;

  return (
    <section className="w-full min-h-[350px] bg-[#383737] text-white flex justify-between">
      <section
        className={isActive ? openSide : closeSide}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        <section className="flex flex-col gap-3 pt-10">
          {infoTag.map((tab, i) => {
            return (
              <TabLink
                isActive={isActive}
                url={tab.url}
                title={tab.title}
                srcImg={tab.img}
                key={i}
              />
            );
          })}
        </section>
      </section>
      <section className="w-full min-h-full bg-[black] rounded-s-2xl">
        {children}
      </section>
    </section>
  );
};

export default SideBar;
