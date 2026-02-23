"use client";

import dynamic from "next/dynamic";

const NetworkHome = dynamic(
  () => import("@/components/about/NetworkHome"),
  { ssr: false }
);

export default function NetworkHomeDynamic() {
  return <NetworkHome />;
}

