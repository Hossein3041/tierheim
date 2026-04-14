/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    transpilePackages: ['@mui/x-charts'],
    images: { unoptimized: true },
    basePath: "/tierheim",
};

export default nextConfig;
