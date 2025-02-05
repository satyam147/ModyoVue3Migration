const LiquidClass =
  process.env.NODE_ENV !== 'production'
    ? require('./LiquidParserJs.ts')
    : require('./PlatformParser.ts').default

const liquidParser = new LiquidClass()

export default liquidParser
