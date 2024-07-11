import React, { useEffect, useMemo, useState } from "react";
import FilterSelect from "@/components/Fragment/filterSelect";
import BarChart from "@/components/UI/BarChart";

type propsTypes = {
  submission: any;
};

const DashboardGrafik = (props: propsTypes) => {
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [monthlyData, setMonthlyData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const groupDataByMonth = (data: any[]) => {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const monthData: { [key: string]: { [key: string]: number } } = {};

      data.forEach((item) => {
        const monthIndex = new Date(item.tanggal).getMonth();
        const month = months[monthIndex]; // Get month name
        const { jenisBencana, daerah } = item;

        if (!monthData[month]) {
          monthData[month] = {};
        }
        const key = `${jenisBencana} - ${daerah}`;

        if (!monthData[month][key]) {
          monthData[month][key] = 0;
        }
        monthData[month][key] += 1;
      });

      return { months, monthData };
    };

    const { months, monthData } = groupDataByMonth(filteredData);

    const allKeys = Array.from(
      new Set(Object.values(monthData).flatMap((data) => Object.keys(data))),
    );

    const monthlyLabels = months;
    const monthlyDatasets = allKeys.map((key) => ({
      label: key,
      data: months.map((month) => monthData[month]?.[key]),
      backgroundColor: getRandomColor(),
    }));
    const monthlyChartData = {
      labels: monthlyLabels,
      datasets: monthlyDatasets,
    };

    setMonthlyData(monthlyChartData);
  }, [filteredData]);

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

  return (
    <div>
      <FilterSelect
        className="w-full"
        setSelectedBencana={setSelectedBencana}
        setSelectedDaerah={setSelectedDaerah}
        setSelectedStartDate={setSelectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
      />
      <div className="h-96">
        <BarChart data={monthlyData} options={optionBar} />
      </div>
    </div>
  );
};

export default DashboardGrafik;
