export type Aid = {
  daerah: string;
  lokasi: string;
  created_at: Date;
  updated_at: Date;
  status: "Proses" | "Selesai";
  bantuan: [
    {
      lembaga: string;
      jenisBantuan: "Rupiah" | "Barang";
      namaBantuan:string;
      qty?: number;
      nominal?: number;
    }
  ];
};
