declare module 'image-resize' {

  // types
  type typeOptions = {
    bgColor?: string
    width?: number
    height?: number
    format?: 'png'|'jpg'|'webp'
    outputType?: 'base64'|'canvas'|'blob'
    quality?: number
    reSample?: number
    sharpen?: number
  }
  type typeSource = string|HTMLInputElement|File|Blob
  type typePromiseCanvas = Promise<HTMLCanvasElement>
  type typeOutput = Promise<string|Blob|HTMLCanvasElement>

  // class
  export class ImageResize {
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

  // TODO: resize 함수

}
