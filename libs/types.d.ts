declare module 'image-resize' {

  // types
  type typeOptions = {
    bgColor?: string
    format?: string
    height?: number
    outputType?: string
    quality?: number
    reSample?: number
    width?: number
    sharpen?: number
  }
  type typeSource = string|HTMLInputElement|File|Blob
  type typePromiseCanvas = Promise<HTMLCanvasElement>
  type typeOutput = Promise<string|Blob|HTMLCanvasElement>

  // class
  class ImageResize {
    // assets
    options: typeOptions
    // class units
    constructor(getOptions?: typeOptions)
    // methods
    play(src: typeSource): typeOutput
    get(src: typeSource, options?: typeOptions): typePromiseCanvas
    resize(canvas: HTMLCanvasElement, options?: typeOptions): typePromiseCanvas
    output(canvas: HTMLCanvasElement, options?: typeOptions): typeOutput
    updateOptions(value: typeOptions): ImageResize
  }

  export default ImageResize
}
