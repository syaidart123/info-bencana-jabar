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
      }
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
      0
    );
    const totalRumah = kerusakanData.reduce(
      (total: any, item: any) => total + item.rumah,
      0
    );
    const totalRumahTerendam = kerusakanData.reduce(
      (total: any, item: any) => total + item.rumahTerendam,
      0
    );
    const totalMeninggal = korbanData.reduce(
      (total: any, item: { meninggal: any }) => total + item.meninggal,
      0
    );
    const totalTerluka = korbanData.reduce(
      (total: any, item: { terluka: any }) => total + item.terluka,
      0
    );
    const totalHilang = korbanData.reduce(
      (total: any, item: { hilang: any }) => total + item.hilang,
      0
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
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );

    const datasets = daerahs.map((daerah: any) => {
      return {
        label: daerah,
        data: labels.map((label) => jenisDaerahCounts[label][daerah] || 0),
        backgroundColor: getRandomColor(), // Use a function to generate distinct colors
      };
    });

    const jenisDaerahData = {
      labels,
      datasets,
    };

    const kerusakanChartData = {
      labels: [
        `Fasilitas Umum : ${totalFasilitasUmum}`,
        `Rumah : ${totalRumah}`,
        `Rumah Terendam : ${totalRumahTerendam}`,
      ],
      datasets: [
        {
          data: [totalFasilitasUmum, totalRumah, totalRumahTerendam],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
    .map((item: { taksiranKerugian: number }) => item.taksiranKerugian)
    .reduce((total: number, item: number) => total + item, 0);

  const totalBantuan = filteredData
    .filter((item: { bantuan: any }) => item && item.bantuan)
    .flatMap((item: any) => item.bantuan)
    .reduce(
      (total: any, bantuanItem: any) => total + (bantuanItem.nominal || 0),
      0
    );

  return (
    <main className="min-h-[90svh] flex flex-col justify-center bg-white">
      <div className="mx-5 my-2">
        <div className="flex  flex-col xl:flex-row gap-2 min-h-[calc(100svh-90px)] ">
          <div className="w-full xl:w-1/2 bg-white rounded-md border px-3 py-7 xl:py-1">
            <div>
              <FilterSelect
                className="w-full"
                setSelectedBencana={setSelectedBencana}
                setSelectedDaerah={setSelectedDaerah}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
            </div>
            <div className="px-2 my-5 border rounded-md h-96 xl:h-3/4">
              <p className="text-xl text-center font-bold py-2">
                Grafik Data Bencana
              </p>
              <BarChart data={jenisBencana} options={optionBar} />
            </div>
          </div>
          <div className="w-full xl:w-1/2 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2 h-full ">
              <div className="bg-white sm:w-1/2 rounded-md h-full border px-3 xl:w-1/2">
                <p className="text-xl text-center font-bold py-2">
                  Total Kerusakan
                </p>
                <hr className="my-2" />
                <div className="my-3 flex items-center justify-center h-3/4">
                  <PieChart data={kerusakan} option={option} />
                </div>
              </div>
              <div className="bg-white sm:w-1/2 rounded-md border px-3 xl:w-1/2">
                <p className="text-xl text-center font-bold py-2">
                  Total Korban
                </p>
                <hr className="my-2" />
                <div className="my-3 flex items-center justify-center h-3/4">
                  <PieChart data={korban} option={option} />
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center bg-white border w-full rounded-md">
              <p className="p-8 w-1/2 text-center text-sm xl:text-lg">
                Total Kerugian Material:{" "}
                <span className="italic text-md font-bold">
                  {formatRupiah(totalKerugian)}
                </span>
              </p>
              <p className="p-8 w-1/2 border-l-2 text-center text-sm xl:text-lg">
                Total Bantuan Sudah Diterima :{" "}
                <span className="italic text-md font-bold">
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
