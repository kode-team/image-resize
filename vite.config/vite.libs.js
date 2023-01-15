import { defineConfig } from 'vite'

const projectName = 'ImageResize'
const config = defineConfig(() => {
  return {
    publicDir: false,
    build: {
      minify: true,
      outDir: 'libs',
      lib: {
        entry: 'src/ImageResize/index.js',
        name: projectName,
        formats: [ 'es', 'umd' ],
        fileName: (format) => `${projectName}.${format}.js`
      }
    },
  }
})

export default config
