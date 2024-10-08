import FilterSelect from "@/components/Fragment/filterSelect";
import BarChart from "@/components/UI/BarChart";
import PieChart from "@/components/UI/PieChart";
import formatRupiah from "@/utils/formatRupiah";
import React, { useEffect, useMemo, useState } from "react";

type propsTypes = {
  submission: any;
};

const HomeGrafikLayout = (props: propsTypes) => {
  const { submission } = props;

  const [selectedBencana, setSelectedBencana] = useState("");
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const filteredData = useMemo(() => {
    const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
    const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
    return submission.filter(
      (item: { jenisBencana: string; daerah: string; tanggal: string }) => {
        const itemDate = new Date(item.tanggal);

        const matchesBencana = selectedBencana
          ? item.jenisBencana === selectedBencana
          : true;
        const matchesDaerah = selectedDaerah
          ? item.daerah === selectedDaerah
          : true;
        const matchesStartDate = startDate ? itemDate >= startDate : true;
        const matchesEndDate = endDate ? itemDate <= endDate : true;

        return (
          matchesBencana && matchesDaerah && matchesStartDate && matchesEndDate
        );
      },
    );
  }, [
    submission,
    selectedBencana,
    selectedDaerah,
    selectedStartDate,
    selectedEndDate,
  ]);

  const [kerusakan, setKerusakan] = useState<any>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

  const [korban, setKorban] = useState<any>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });
  const [jenisBencana, setJenisBencana] = useState<any>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

  useEffect(() => {
    const kerusakanData = filteredData.map((item: any) => ({
      fasilitasUmum: item.kerusakan.fasilitasUmum,
      rumah: item.kerusakan.rumah,
      rumahTerendam: item.kerusakan.rumahTerendam,
    }));

    const korbanData = filteredData.map((item: any) => ({
      meninggal: item.korban.meninggal,
      terluka: item.korban.terluka,
      hilang: item.korban.hilang,
    }));

    const totalFasilitasUmum = kerusakanData.reduce(
      (total: any, item: any) => total + item.fasilitasUmum,
      0,
    );
    const totalRumah = kerusakanData.reduce(
      (total: any, item: any) => total + item.rumah,
      0,
    );
    const totalRumahTerendam = kerusakanData.reduce(
      (total: any, item: any) => total + item.rumahTerendam,
      0,
    );
    const totalMeninggal = korbanData.reduce(
      (total: any, item: { meninggal: any }) => total + item.meninggal,
      0,
    );
    const totalTerluka = korbanData.reduce(
      (total: any, item: { terluka: any }) => total + item.terluka,
      0,
    );
    const totalHilang = korbanData.reduce(
      (total: any, item: { hilang: any }) => total + item.hilang,
      0,
    );
    const jenisDaerahCounts: { [key: string]: { [daerah: string]: number } } =
      {};

    filteredData.forEach((item: { jenisBencana: string; daerah: string }) => {
      if (!jenisDaerahCounts[item.jenisBencana]) {
        jenisDaerahCounts[item.jenisBencana] = {};
      }
      if (!jenisDaerahCounts[item.jenisBencana][item.daerah]) {
        jenisDaerahCounts[item.jenisBencana][item.daerah] = 0;
      }
      jenisDaerahCounts[item.jenisBencana][item.daerah] += 1;
    });

    const labels = Object.keys(jenisDaerahCounts);
    const daerahs = filteredData
      .map((item: { daerah: string }) => item.daerah)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index,
      );

    const datasets = daerahs.map((daerah: any) => {
      return {
        label: daerah,
        data: labels.map((label) => jenisDaerahCounts[label][daerah]),
        backgroundColor: getRandomColor(), // Use a function to generate distinct colors
      };
    });

    const jenisDaerahData = {
      labels,
      datasets,
    };

    const kerusakanChartData = {
      labels: [
        `Rumah : ${totalRumah}`,
        `Fasilitas Umum : ${totalFasilitasUmum}`,
        `Rumah Terendam : ${totalRumahTerendam}`,
      ],
      datasets: [
        {
          data: [totalRumah, totalFasilitasUmum, totalRumahTerendam],
          backgroundColor: [
            "rgba(230, 57, 70, 0.7)",
            "rgba(69, 123, 157, 0.7)",
            "rgba(168, 218, 220, 0.7)",
          ],
          hoverBackgroundColor: ["#E63946", "#457b9d", "#A8DADC"],
        },
      ],
    };
    const korbanChartData = {
      labels: [
        `Meninggal : ${totalMeninggal}`,
        `Terluka : ${totalTerluka}`,
        `Hilang : ${totalHilang}`,
      ],

      datasets: [
        {
          data: [totalMeninggal, totalTerluka, totalHilang],
          // backgroundColor: ["#E63946", "#457b9d", "#A8DADC"],
          backgroundColor: [
            "rgba(230, 57, 70, 0.7)",
            "rgba(69, 123, 157, 0.7)",
            "rgba(168, 218, 220, 0.7)",
          ],
          hoverBackgroundColor: ["#E63946", "#457b9d", "#A8DADC"],
        },
      ],
    };

    setJenisBencana(jenisDaerahData);
    setKerusakan(kerusakanChartData);
    setKorban(korbanChartData);
  }, [filteredData, submission]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const option: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  const optionBar: any = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const totalKerugian = filteredData
    .filter((item: { status: string }) => item.status === "Selesai") // Filter by status
    .map((item: { taksiranKerugian: number }) => item.taksiranKerugian)
    .reduce((total: number, item: number) => total + item, 0);

  const totalBantuan = filteredData
    .filter(
      (item: { status: string; bantuan: any }) =>
        item.status === "Selesai" && item.bantuan,
    ) // Filter by status and bantuan
    .flatMap((item: any) => item.bantuan)
    .reduce(
      (total: any, bantuanItem: any) => total + (bantuanItem.nominal || 0),
      0,
    );

  return (
    <main className="flex min-h-[calc(100vh-70px)] flex-col justify-center bg-white">
      <div className="px-5 py-5">
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="w-full rounded-md border bg-white px-3 py-7 xl:w-1/2 xl:py-1">
            <div className="flex items-center justify-center">
              <p className="my-3 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
                Grafik Data Bencana
              </p>
            </div>
            <div>
              <FilterSelect
                className="w-full"
                setSelectedBencana={setSelectedBencana}
                setSelectedDaerah={setSelectedDaerah}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
            </div>
            <div className="my-5 h-96 rounded-md border px-2 xl:h-[73%]">
              <BarChart data={jenisBencana} options={optionBar} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 xl:w-1/2">
            <div className="flex h-full flex-col gap-2 sm:flex-row">
              <div className="h-full rounded-md border bg-white px-3 sm:w-1/2 xl:w-1/2">
                <p className="my-3 bg-gradient-to-l from-secondary to-primary bg-clip-text text-center text-2xl font-bold text-transparent">
                  Total Kerusakan
                </p>
                <hr className="my-2" />
                <div className="my-3 flex h-3/4 items-center justify-center">
                  <PieChart data={kerusakan} option={option} />
                </div>
              </div>
              <div className="rounded-md border bg-white px-3 sm:w-1/2 xl:w-1/2">
                <p className="my-3 bg-gradient-to-l from-secondary to-primary bg-clip-text text-center text-2xl font-bold text-transparent">
                  Total Korban
                </p>
                <hr className="my-2" />
                <div className="my-3 flex h-3/4 items-center justify-center">
                  <PieChart data={korban} option={option} />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center rounded-md border bg-white">
              <p className="w-1/2 p-8 text-center text-sm xl:text-lg">
                Total Kerugian Material:{" "}
                <span className="text-md font-bold italic">
                  {formatRupiah(totalKerugian)}
                </span>
              </p>
              <p className="w-1/2 border-l-2 p-8 text-center text-sm xl:text-lg">
                Total Bantuan Sudah Diterima :{" "}
                <span className="text-md font-bold italic">
                  {formatRupiah(totalBantuan)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeGrafikLayout;
