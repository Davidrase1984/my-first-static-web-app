module.exports = {
  configureWebpack: {
    output: {
      hashFunction: 'sha256',
    },
    performance: {
      hints: false
    }
  }
};