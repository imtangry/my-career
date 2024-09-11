import fs from 'fs'
import path from 'path'
import {NextResponse} from 'next/server'

const filesDir = path.join(process.cwd(), 'files')

export async function GET() {
  try {
    // 读取 files 文件夹中的所有文件
    const fileNames = fs.readdirSync(filesDir)

    // 读取每个文件的内容并解析为 JSON
    const allContent = fileNames.map((fileName) => {
      const filePath = path.join(filesDir, fileName)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(fileContent)
    })
    return NextResponse.json({data: allContent}, {status: 200})
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}
