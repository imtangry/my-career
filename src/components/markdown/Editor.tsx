'use client'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {cn} from '@/lib/utils'
import {uuidv4} from '@walletconnect/utils'
import {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialOceanic} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'

// TODO 这个方法会对所有HTML标签换行 所以如果是标签嵌套标签 会造成样式错误 目前只是临时解决语雀导出文件的渲染
const addBlankLinesAfterHtmlTags = (content: string): string => {
  const endTagRegex = /(<\/\w+[^>]*>)/g
  return content.replace(endTagRegex, `$1\n\n`)
}

export const Editor = ({
  type,
  className
}: {
  type: string
  className?: string
}) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const handleSave = async () => {
    fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: uuidv4(), title, type, content})
    })
  }

  return (
    <div
      className={cn(
        'markdown-wrapper relative flex h-full w-full flex-col',
        className
      )}
    >
      <Input
        type='text'
        placeholder='输入内容标题'
        className='mb-6'
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <Textarea
        className='h-24 w-full'
        placeholder='输入你的markdown内容，可以从语雀等平台里的编辑器导出'
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <div className='mt-6 flex-1 overflow-auto border p-4'>
        <div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialOceanic}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={className}
                    {...props}
                  >
                    {children}
                  </code>
                )
              }
            }}
          >
            {addBlankLinesAfterHtmlTags(content)}
          </ReactMarkdown>
        </div>
      </div>
      <Button
        className='mt-6 h-12'
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  )
}
