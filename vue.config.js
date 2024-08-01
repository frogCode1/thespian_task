module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("srt")
      .test(/\.srt$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
};
