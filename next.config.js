module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "fakestoreapi.com"
        ],
    },
    transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
    async redirects() {
        return [
            {
                source: '/main',
                permanent:  true,
                destination: '/'
            },
            {
                source: '/product-detail',
                permanent:  true,
                destination: '/product/:ID',
                has: [
                    {
                        type: 'query',
                        key: 'ID',
                        value: '(?<ID>.*)'
                    }
                ]
            },
            {
                source: '/p',
                permanent:  true,
                destination: '/product'
            },
        ]
    }
};