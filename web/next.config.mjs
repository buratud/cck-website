/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com',
                port: '',
                pathname: '/api/static/**'
            }
        ]
    }
};

export default nextConfig;
