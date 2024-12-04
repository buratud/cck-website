/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ai-vpn.southeastasia.cloudapp.azure.com',
                port: '',
                pathname: '/api/static/**'
            }
        ]
    }
};

export default nextConfig;
