import React from 'react'

// import { permanentRedirect } from 'next/navigation';

interface NotFoundProp {}

const NotFound: React.FC<NotFoundProp> = () => {
  // permanentRedirect('/');
  return (
    <html>
      <body>
        <div>404</div>
      </body>
    </html>
  )
}

export default NotFound
