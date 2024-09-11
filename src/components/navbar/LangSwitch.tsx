import Link from 'next/link'

import {Lang, locales} from '~/i18n/config'

export default function LangSwitch({lang}: {lang: Lang}) {
  return (
    <>
      {locales
        .filter((l) => lang !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' | '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          )
        })}
    </>
  )
}
