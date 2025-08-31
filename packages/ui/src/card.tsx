import { JSX, type ReactNode } from "react";
import { Button } from "./button";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}):JSX.Element {
  return (
    <div className=" border border-slate-300 rounded-md p-4 bg-white">
      <h1 className="text-lg border-b font-bold border-slate-300 pb-1 text-neutral-600">
        {title}
      </h1>
      <div className="text-sm mt-1 text-neutral-500 ">{children}</div>
    </div>
  );
}
