import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextVideo(nextConfig, {
  folder: 'videos', // This tells next-video your videos are in the root/videos folder
});