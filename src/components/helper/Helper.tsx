export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatStatus(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}
