import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center md:justify-between justify-center">
      <div className="hidden md:flex"></div>

      <div className="hidden md:flex italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://twitter.com/SelbergKris"
          target="_blank"
          rel="noreferrer"
        >
          Kris Selberg
        </a>
        based on the tweets of
        <a
          className="hover:opacity-50 ml-1"
          href="https://twitter.com/AlexHormozi"
          target="_blank"
          rel="noreferrer"
        >
          Alex Hormozi
        </a>
        . Largely inspired by
        <a
          className="hover:opacity-50 mx-1"
          href="https://twitter.com/mckaywrigley"
          target="_blank"
          rel="noreferrer"
        >
          McKay Wrigley
        </a>
      </div>

      <div className="flex space-x-4">
        <a
          className="flex items-center hover:opacity-50"
          href="https://twitter.com/SelbergKris"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter size={24} />
        </a>

        <a
          className="flex items-center hover:opacity-50"
          href="https://github.com/krisselberg/alex-hormozi-gpt"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub size={24} />
        </a>
      </div>
    </div>
  );
};
