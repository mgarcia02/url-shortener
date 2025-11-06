import warningIcon from "../assets/warning-icon.svg"
import type { WarningTooltipProps } from "../types/urlTypes"

function WarningTootip({ isAuth, hasNoUrls }: WarningTooltipProps) {

    if (isAuth || hasNoUrls) return null
    return (
        <div className="relative flex justify-end group">
            <img src={warningIcon} alt="Logo" className="inline-block w-auto h-5 cursor-pointer" />
            <div className="absolute right-0 overflow-hidden text-xs text-white transition-all duration-1000 bg-gray-800 rounded-lg group-hover:px-2 group-hover:py-1 truncation max-h-6 max-w-0 group-hover:max-w-full">
                Demo: las URLs no funcionarán hasta que te registres
            </div>
        </div>
    )
}

export default WarningTootip