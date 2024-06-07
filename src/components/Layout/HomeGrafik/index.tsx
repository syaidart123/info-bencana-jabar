import FilterSelect from "@/components/Fragment/filterSelect";
import BarChart from "@/components/UI/BarChart";
import PieChart from "@/components/UI/PieChart";
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
      (item: { jenisBencana: string; daerah: string, tanggal: string }) => {
        const itemDate = new Date(item.tanggal);

      const matchesBencana = selectedBencana ? item.jenisBencana === selectedBencana : true;
      const matchesDaerah = selectedDaerah ? item.daerah === selectedDaerah : true;
      const matchesStartDate = startDate ? itemDate >= startDate : true;
      const matchesEndDate = endDate ? itemDate <= endDate : true;

      return matchesBencana && matchesDaerah && matchesStartDate && matchesEndDate;
      }
    );
  }, [submission, selectedBencana, selectedDaerah, selectedStartDate, selectedEndDate]);

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
    const jenisBencanaCounts: { [jenis: string]: number } = {};
    filteredData.forEach((item: { jenisBencana: string | number }) => {
      jenisBencanaCounts[item.jenisBencana] =
        (jenisBencanaCounts[item.jenisBencana] || 0) + 1;
    });

    const labels = Object.keys(jenisBencanaCounts);
    const data = labels.map((label) => jenisBencanaCounts[label]);

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
    const jenisBencanaData = {
      labels,
      datasets: [
        {
          label: "Total",
          data,
          backgroundColor: "#36A2EB",
        },
      ],
    };
    setJenisBencana(jenisBencanaData);
    setKerusakan(kerusakanChartData);
    setKorban(korbanChartData);
  }, [filteredData, submission]);

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
    indexAxis: "y",
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

  return (
    <div className="w-full min-h-screen">
      <div className=" mx-5 py-10">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="w-full lg:w-1/2 bg-white rounded-md border px-3">
            <div className="ml-5">
              <FilterSelect
                setSelectedBencana={setSelectedBencana}
                setSelectedDaerah={setSelectedDaerah}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
            </div>
            <div className="px-2 my-5 border rounded-md h-80">
              <BarChart data={jenisBencana} options={optionBar} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:flex-row ">
            <div className="bg-white rounded-md border px-3 lg:w-1/2">
              <p className="text-xl text-center font-bold py-2">
                Total Kerusakan
              </p>
              <hr className="my-2" />
              <div className="my-3 flex items-center justify-center">
                <PieChart data={kerusakan} option={option} />
              </div>
            </div>
            <div className="bg-white rounded-md border px-3 lg:w-1/2">
              <p className="text-xl text-center font-bold py-2">Total Korban</p>
              <hr className="my-2" />
              <div className="my-3 flex items-center justify-center">
                <PieChart data={korban} option={option} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGrafikLayout;
