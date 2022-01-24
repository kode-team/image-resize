declare module 'image-resize' {

  type Options = {
    bgColor?: string;
    format?: string;
    height?: number;
    outputType?: string;
    quality?: number;
    reSample?: number;
    width?: number;
  };

  class ImageResize {
    options: Options;
    play(src: string|HTMLInputElement|File|Blob): Promise<HTMLCanvasElement>;
  }

  export default ImageResize;
}
