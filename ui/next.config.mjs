import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL
    }
};

export default nextConfig;
