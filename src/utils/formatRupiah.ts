export default function formatRupiah(nominal: number){
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(nominal);
}