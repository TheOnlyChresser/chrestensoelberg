import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['localhost'],
    },
    // any other config options here
};

export default withPayload(nextConfig);
