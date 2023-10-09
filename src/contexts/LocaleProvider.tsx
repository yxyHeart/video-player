import React, {useMemo} from 'react'
import LocaleContext from './LocaleContext'
import locales, {LocaleCode, PartialLocaleConfigMap} from '@/constants/locales'

const getLocaleConfig = (
    locale:LocaleCode,
    userLocales?:PartialLocaleConfigMap
)=>{
    const defaultConfig = locales[locale]
    const userConfig = userLocales?.[locale]
    return userConfig
        ?Object.assign({},defaultConfig,userConfig)
        :defaultConfig
}

type Props = {
    locale:LocaleCode
    localeConfig?:PartialLocaleConfigMap
    children:React.ReactNode
}

const LocaleProvider:React.FC<Props> = ({
    locale,
    localeConfig,
    children
})=>{
    const value = useMemo(()=>{
        return getLocaleConfig(locale, localeConfig)
    },[locale,localeConfig])

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    )
}

export default LocaleProvider