import React from "react";

export default function TitleHeader({ title, fontSize = '3xl', alignment="center", margin="" }) {
  return (
    <div className={`flex items-center justify-${alignment} ${margin}`}>
      <h1
        className={`text-xl text-center lg:text-${fontSize} lg:text-4xl font-bold underline capitalize`}
      >
        {title}
      </h1>
    </div>
  );
}
