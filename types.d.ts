declare module 'image-resize' {

  // types
  type typeOptions = {
    width?: number
    height?: number
    format?: 'png'|'jpg'|'webp'
    outputType?: 'base64'|'canvas'|'blob'
    quality?: number
    reSample?: number
    sharpen?: number
    bgColor?: string
  }
  type typeSource = string|File|Blob|HTMLCanvasElement
  type typeOutput = Promise<string|Blob|HTMLCanvasElement>

  // function
  export default function imageResize(src: typeSource, options?: typeOptions): typeOutput

}
