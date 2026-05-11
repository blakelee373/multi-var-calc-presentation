declare module "gif.js.optimized" {
  type GIFOptions = {
    workers?: number;
    quality?: number;
    workerScript?: string;
    width?: number;
    height?: number;
    background?: string;
    repeat?: number;
    transparent?: string | null;
  };
  type FrameOptions = { delay?: number; copy?: boolean };

  class GIF {
    constructor(opts: GIFOptions);
    addFrame(
      image:
        | CanvasImageSource
        | CanvasRenderingContext2D
        | WebGLRenderingContext
        | ImageData,
      opts?: FrameOptions
    ): void;
    on(event: "finished", cb: (blob: Blob) => void): void;
    on(event: "progress", cb: (p: number) => void): void;
    on(event: "abort", cb: () => void): void;
    render(): void;
    abort(): void;
  }

  export default GIF;
}
