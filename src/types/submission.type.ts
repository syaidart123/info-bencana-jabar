export type Submission = {
    namaPelapor: string;
    jenisBencana: string;
    lokasi: string;
    kerusakan?: {
        rumah?: {
            karakteristik: string;
            dampak: string;
        };
        sekolah?: {
            karakteristik: string;
            dampak: string;
        };
        rumahIbadah?: {
            karakteristik: string;
            dampak: string;
        };
        lahan?: {
            karakteristik: string;
            dampak: string;
        };
        keteranganTambahan?: string;
    }
    korbanJiwa?: {
        lakiLaki: number;
        perempuan: number;
        balita: number;
        lansia: number;
    }
    pengungsian?: {
        lokasiPengungsian: string;
        jumlahTenda:number;
        jumlahPengungsi:number;
    }
image: string;
}

