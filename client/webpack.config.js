module.exports={
    resolve:{
        fallback:{
            path : require.resolve("path-browserify"),
            zlib: require.resolve("browserify-zlib"),
            crypto : require.resolve("crypto-browserify"),
            stream : require.resolve("stream-browserify"),
            http : require.resolve("stream-http"),   
        },
    },
};