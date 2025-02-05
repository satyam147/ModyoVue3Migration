// vitest.config.ts
import { fileURLToPath } from 'node:url'
import viteConfig from './vite.config'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'

export default mergeConfig(
  // @ts-ignore
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: [
        'verbose',
        ['vitest-sonar-reporter', { outputFile: 'coverage/sonar-cloud-reporter.xml' }]
      ]
    }
  })
)

/*

, */
