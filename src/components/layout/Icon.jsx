import { HugeiconsIcon } from "@hugeicons/react";

export default function Icon({
    icon,
    size = 24,
    color = "#000",
    strokeWidth = 1.5,
    className = "",
}) {
    return (
        <HugeiconsIcon
            icon={icon}
            size={size}
            color={color}
            className={className}
            strokeWidth={strokeWidth}
        />
    );
}
