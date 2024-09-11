import fs from 'fs'
import path from 'path'
import {NextRequest, NextResponse} from 'next/server'

// 项目根目录下的 files 文件夹路径
const filesDir = path.join(process.cwd(), 'files')

// 确保 files 目录存在
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir)
}

export async function POST(req: NextRequest) {
  const params = await req.json()
  const {id, title, content} = params

  console.log('Received content', params)
  // 验证数据完整性
  if (!id || !title || !content) {
    return NextResponse.json(
      {error: 'Missing id, title, or content'},
      {status: 400}
    )
  }

  // 构造文件路径
  const filePath = path.join(filesDir, `${id}.json`)

  // 写入文件
  try {
    fs.writeFileSync(filePath, JSON.stringify({id, title, content}, null, 2))
    return NextResponse.json(
      {message: 'Content saved successfully'},
      {status: 200}
    )
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}
