import { withJuno } from "@junobuild/nextjs-plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'xdlzc-taaaa-aaaal-ajaqq-cai.icp0.io',
            port: '',
          },
        ],
      },
};

export default withJuno({ nextConfig });
