import Icon from "../ui/Icon"

const TableHeader = ({ title, subtitle, icon, component, className }) => {
    return (
        <div className={`flex justify-between flex-col gap-5 lg:gap-0 lg:flex-row lg:items-center md:mt-3 mb-2 md:mb-4 xl:mb-6 ${className}`}>
            <div className="flex items-center gap-3 flex-1 max-sm:flex-col max-sm:items-start">
                {icon && (
                    <div className="flex items-center justify-center size-10  rounded-xl bg-primary/10 text-primary">
                        <Icon icon={icon} size={22} className="text-primary" />
                    </div>
                )}
                <div>
                    <h3 className="text-xl md:text-xl font-black text-black font-axiforma">
                        {title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-int">
                        {subtitle}
                    </p>
                </div>
            </div>
            {component && component}
        </div>
    )
}

export default TableHeader
