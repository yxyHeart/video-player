import React, { ReactElement } from 'react'
import { useLocaleText } from '@/contexts/LocaleContext'

const TranslatedText:React.FC<{
    name:Parameters<typeof useLocaleText>[0]
    style?:Parameters<typeof useLocaleText>[1]
}> = ({name,style='text'}):ReactElement =>{
    return <>{useLocaleText(name,style)}</>
}

export default TranslatedText