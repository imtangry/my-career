'use client'

import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
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

export const Editor = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    console.log(content)
    console.log(addBlankLinesAfterHtmlTags(content))
  }, [content])
  return (
    <div className='markdown-wrapper relative flex h-full w-full flex-col'>
      <Textarea
        className='w-full'
        placeholder='Type your content here.'
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <div className='mt-6 flex-1 overflow-auto border p-4'>
        <div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
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
        onClick={() => console.log(content)}
      >
        Save
      </Button>
    </div>
  )
}
