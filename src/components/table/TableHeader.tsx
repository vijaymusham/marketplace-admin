import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type TableHeaderProps = {
    title: ReactNode;
    subtitle?: ReactNode;
    icon?: LucideIcon;
    component?: ReactNode;
    className?: string;
};

export default function TableHeader({
    title,
    subtitle,
    icon: Icon,
    component,
    className = "",
}: TableHeaderProps) {
    return (
        <div
            className={`mb-2 flex flex-col justify-between gap-5 md:mt-3 md:mb-4 lg:flex-row lg:items-center lg:gap-0 xl:mb-3 ${className}`}
        >
            <div className="flex max-sm:flex-col max-sm:items-start flex-1 items-center gap-3">
                {Icon && (
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={22} className="text-primary" />
                    </div>
                )}
                <div>
                    <h3 className="font-heading text-xl font-black text-white">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-xs font-medium text-[#8B83A3] md:text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {component}
        </div>
    );
}
