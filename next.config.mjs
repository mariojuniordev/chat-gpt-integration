/** @type {import('next').NextConfig} */

const ENV = process.env;

const { ASSISTANT_ID, OPENAI_API_KEY } = ENV;

const nextConfig = {
  env: {
    ASSISTANT_ID,
    OPENAI_API_KEY,
  },
  reactStrictMode: true,
};

export default nextConfig;
