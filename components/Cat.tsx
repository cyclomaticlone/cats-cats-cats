import React from "react";
import { Cat } from "../types/types";

type Props = {
  cat: Cat | undefined;
  className?: string;
};

const Cat = ({ cat, className }: Props) => {
  return (
    <article className={`${className} relative h-80`}>
      <div className="absolute bg-stone-700 h-80 w-full animate-pulse "></div>
      {cat && (
        <picture className="absolute block w-full">
          <img
            src={cat.url}
            alt={`Random Cat - ${cat.name || cat.id}`}
            className="w-full h-80 object-cover"
          />
        </picture>
      )}
    </article>
  );
};

export default Cat;
