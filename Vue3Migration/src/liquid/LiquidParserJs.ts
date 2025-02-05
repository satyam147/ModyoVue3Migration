import { Liquid } from 'liquidjs'
import localLiquidVariables from './local-liquid-variables.ts'

export default class LiquidParserJs {
  /**
   * Create a Client.
   * @param library object containing all local liquid context
   * @returns function with all Liquid instance
   */
  engine: Liquid = null
  constructor() {
    document.write(process.env.NODE_ENV)
    this.engine = new Liquid({
      root: 'views/',
      extname: '.liquid',
      strictFilters: true,
      strictVariables: true
    })
    this.engine.registerFilter(
      'asset_url_by_uuid',
      (a) => localLiquidVariables.assets.find((el) => el.id === a).url
    )
    this.engine.registerFilter(
      'asset_url',
      (asset, type) => `${localLiquidVariables.assets.find((el) => el.id === asset).base}.${type}`
    )
    this.engine.registerFilter('asset_image', (a) => {
      const asset = localLiquidVariables.assets.find((el) => el.id === a)
      return `<img src='${asset.url}'' alt='${asset.alt_text}' />`
    })
  }

  /**
   * Parse a liquid string
   * @param liquidString Target Content Space UID
   * @returns a usable object or string
   */
  async parseLiquidAsync(liquidString: any) {
    return this.engine.parseAndRender(liquidString, localLiquidVariables)
  }

  /**
   * Parse a liquid string
   * @param liquidString Target Content Space UID
   * @returns a usable object or string
   */
  parseLiquid(liquidString: any) {
    return this.engine.parseAndRenderSync(liquidString, localLiquidVariables)
  }

  parse(liquidString: any) {
    return this.parseLiquid(liquidString)
  }

  parseAsync(liquidString: any) {
    return this.parseLiquidAsync(liquidString)
  }
}
