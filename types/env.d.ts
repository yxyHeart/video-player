/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
    readonly VITE_BASE_API: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }