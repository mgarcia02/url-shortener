import { createContext, useState } from 'react';
import type { Url, UrlsContextType } from '../types/urlTypes';

const UrlsContext = createContext<UrlsContextType | undefined>(undefined)

function UrlsContextProvider({ children }: { children: React.ReactNode }) {
    const storedUrls = localStorage.getItem("urls")
    const initialUrls = storedUrls ? JSON.parse(storedUrls) : []

    const [urls, setUrls] = useState<Url[]>(initialUrls)

    return (
        <UrlsContext.Provider value={{ urls, setUrls }}>
            {children}
        </UrlsContext.Provider>
    )
}


export { UrlsContext, UrlsContextProvider }