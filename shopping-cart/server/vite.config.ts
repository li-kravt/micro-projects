import {defineConfig} from 'vite'
import {VitePluginNode} from 'vite-plugin-node'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'app'
    }),
    tsConfigPaths()
  ]
})
