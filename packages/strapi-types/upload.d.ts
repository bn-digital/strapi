declare namespace Upload {
  interface UploadFile {
    id: string
    src: string
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    hash: string
    ext: string
    size: number
    url: string
    previewUrl: string
    provider: "aws-s3" | string
  }
}
