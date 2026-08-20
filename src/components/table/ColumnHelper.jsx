import { Copy } from "@hugeicons/core-free-icons";
import Icon from "../ui/Icon";
import toast from "react-hot-toast";
import moment from "moment/moment";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { copyTextToClipboard } from "@/lib/clipboard";
import { CopyIcon } from "lucide-react";

const StatusBadge = ({ status }) => {
    const styles = {
        New: "bg-emerald-100 text-emerald-600",
        Active: "bg-green-100 text-green-600",
        Inactive: "bg-red-100 text-red-600",
    };
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-medium font-int",
                styles[status] ?? "bg-gray-100 text-gray-600"
            )}
        >
            {status}
        </span>
    );
};
export const TableId = ({ row }) => {
    if (!row) return null;
    const idStr = typeof row === "string" ? row : row?.id;
    return (
        <div className="flex items-center gap-2"><span className='uppercase'>#{idStr?.slice(-10) || "---- -----"}</span> <span><CopyIcon className="cursor-pointer text-primary hover:text-primary" size={18}
            onClick={() => {
                navigator.clipboard.writeText(idStr);
                toast.success('ID Copied!');
            }} /></span>
        </div>
    );
};

export const TableDate = ({row}) => {
    return (
    <span className="text-sm">
        <div className="font-medium font-int">
            {row?.createdAt ? moment(row.createdAt).format("DD-MM-YYYY") : "---- -----"}
        </div>
        <div className="text-xs text-gray-500 font-int">
            {row?.createdAt ? moment(row.createdAt).format("hh:mm A") : ""}
        </div>
    </span>
    );
};

export const TableActiveStatus = ({ row }) => {
    const status = row?.isActive ? "Active" : "Inactive";
    return <StatusBadge status={status} />;
};

export const TableSwitch = ({ value, handleFun }) => {
    return <Switch
        checked={value}
        onCheckedChange={(checked) =>
            handleFun(checked)
        }
    />
}
export const TableSwitchId = ({ value, handleFun, id }) => {
    return <Switch
        checked={value}
        onCheckedChange={(checked) =>
            handleFun(id, checked)
        }
    />
}
