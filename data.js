const data = {
  // user: data?.user,
  namaPelapor: form.namaPelapor.value,
  NoTelp:form.noTelp.value,
  jenisBencana: form.jenisBencana.value,
  daerah: form.daerah.value,
  lokasi: form.lokasi.value,
  image: "",
  kerusakan: {
    bangunan: {
      rumah: {
        ringan: {
          jumlah: form.rumah?.value,
        },
        sedang: {
          jumlah: form.rumah?.value,
        },
        berat: {
          jumlah: form.rumah?.value,
        },
      },
      sekolah: {
        ringan: {
          jumlah: form.sekolah?.value,
        },
        sedang: {
          jumlah: form.rumah?.value,
        },
        berat: {
          jumlah: form.rumah?.value,
        },
      },
      rumahIbadah: {
        ringan: {
          jumlah: form.rumah?.value,
        },
        sedang: {
          jumlah: form.rumah?.value,
        },
        berat: {
          jumlah: form.rumah?.value,
        },
      },
    },
    lahan: {
      dampak: form.dampak.value,
      jumlah: form.jumlah.value,
    },
  },

  keteranganTambahan: form.keteranganTambahan?.value,
  korban: {
    jiwa: {
      lakiLaki: form.korbanLakiLakiMeninggal?.value,
      perempuan: form.korbanPerempuanMeninggal?.value,
      balita: form.korbanBalitaMeninggal?.value,
      lansia: form.korbanLansiaMeninggal?.value,
    },
    lukaLuka: {
      lakiLaki: form.korbanLakiLakiLukaLuka?.value,
      perempuan: form.korbanPerempuanLukaLuka?.value,
      balita: form.korbanBalitaLukaLuka?.value,
      lansia: form.korbanLansiaLukaLuka?.value,
    },
  },
  pengungsian: {
    lokasiPengungsian: form.lokasiPengungsian?.value,
    jumlahTenda: form.jumlahTenda?.value,
    jumlahPengungsi: form.jumlahPengungsi?.value,
  },
};
