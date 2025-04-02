declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: {
      canvas: HTMLCanvasElement;
      clearColor(r: number, g: number, b: number, a: number): void;
      enable(option: number): void;
      blendFunc(src: number, dst: number): void;
      BLEND: number;
      SRC_ALPHA: number;
      ONE_MINUS_SRC_ALPHA: number;
      getExtension(name: string): { loseContext?: () => void } | null;
    };
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    constructor(gl: any, options: { vertex: string; fragment: string; uniforms?: any });
    uniforms: any;
  }

  export class Mesh {
    constructor(gl: any, options: { geometry: any; program: any });
  }

  export class Triangle {
    constructor(gl: any);
  }

  export class Color {
    constructor(...args: any[]);
    r: number;
    g: number;
    b: number;
  }
} 