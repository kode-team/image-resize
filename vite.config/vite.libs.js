import { defineConfig } from 'vite'

const projectName = 'imageResize'
const config = defineConfig(() => {
  return {
    publicDir: false,
    base: './',
    build: {
      minify: true,
      outDir: 'libs',
      assetsDir: '',
      lib: {
        entry: 'src/image-resize/index.js',
        name: projectName,
        formats: [ 'es', 'umd' ],
        fileName: (format, a, b) => {
          return `${projectName}.${format}.js`
        },
      },
    },
  }
})

export default config
