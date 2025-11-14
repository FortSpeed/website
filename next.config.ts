import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization with CDN support
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Uncomment and configure if using CDN
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'your-cdn-domain.com',
    //   },
    // ],
  },
  
  // Compression (GZIP/Brotli)
  compress: true,
  
  // Production optimizations
  // Note: swcMinify is enabled by default in Next.js 16+
  
  // Output configuration for static optimization
  // Uncomment for Docker/containerized deployments
  // output: 'standalone', // Creates optimized standalone build
  
  // Turbopack configuration (empty to allow webpack config)
  // Note: We use webpack for production builds to leverage custom optimizations
  turbopack: {},
  
  // Webpack optimizations for better code splitting and tree-shaking
  // Use --webpack flag in build command to use these optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Optimize chunk splitting
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for heavy libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Separate chunk for Three.js (heavy library)
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              chunks: 'all',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Separate chunk for Framer Motion
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/](framer-motion|motion)[\\/]/,
              chunks: 'all',
              priority: 25,
              reuseExistingChunk: true,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    // Tree-shaking optimizations
    // Note: Icon alias removed - let Next.js handle tree-shaking automatically
    // The optimizePackageImports config handles this better
    
    return config;
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'motion',
      'lucide-react',
      '@tabler/icons-react',
    ],
    // Enable partial prerendering for better performance
    ppr: false, // Set to true when stable
  },
  
  // Headers for caching and security
  async headers() {
    return [
      {
        // Static assets caching
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Image optimization caching
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font files caching
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Public assets caching
        source: '/:path*\\.(jpg|jpeg|png|gif|svg|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (if needed)
  async redirects() {
    return [];
  },
  
  // Rewrites for API or CDN (if needed)
  async rewrites() {
    return [];
  },
};

export default nextConfig;
