import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["chrestensoelberg.dk"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withPayload(nextConfig);
