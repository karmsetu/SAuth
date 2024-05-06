// import { withNextConfig } from 'next/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //! is not working
        remotePatterns: [
            {
                hostname: 'utfs.io',
            },
        ],
    },
};

export default nextConfig;
