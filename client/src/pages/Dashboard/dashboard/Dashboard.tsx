import React, { useState, useEffect } from "react";
import SectionTitle from "../../../components/Title";
import { useGetDataQuery } from "../../../features/apis/dashboardApi";
import { useTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DataSet = {
  id: number;
  label: string;
  backgroundColor: string[];
  data: number[];
};

const Dashboard = () => {
  const { data: dash, isLoading, isSuccess, isFetching } = useGetDataQuery(undefined, { refetchOnMountOrArgChange: true });
  const { t } = useTranslation();
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [dataSets, useDataSets] = useState<DataSet[]>([
    {
      id: 1,
      label: "camado",
      backgroundColor: ["#3F51B5"],
      data: [],
    },
  ]);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const dataSets_copy = [...dataSets];

      dataSets_copy[0].data = convertSales(dash.grouped_sales_month);

      useDataSets(dataSets_copy);
    }
  }, [isSuccess, isFetching]);

  function convertSales(data: { total_sales: number | null; month: number }[]): number[] {
    const monthsData = [...data];

    const monthsArray = new Array(12).fill(0);

    monthsData.forEach((data) => {
      monthsArray[data.month] = data.total_sales;
    });

    return monthsArray;
  }

  function getSkeltonCards(): React.ReactNode {
    const cards = [];

    for (let i = 0; i < 4; i++) {
      cards.push(
        <div key={i} className="bg-gray-300 h-24 dark:bg-dark-gray animate-pulse shadow-ld p-4 text-white rounded-md flex justify-between items-center"></div>
      );
    }

    return <div className="grid lg:grid-cols-4 gap-4">{cards}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title={t("dashboard")} />
      {isSuccess && (
        <>
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="bg-danger shadow-ld h-24 p-4 text-white rounded-md flex justify-between items-center">
              <span className="font-bold text-xl">
                {t("total")} {t("sales")}
              </span>
              <span>{dash.total_sales ? Math.floor(dash.total_sales) : 0} €</span>
            </div>
            <div className="bg-success shadow-ld p-4 h-24 text-white rounded-md flex justify-between items-center">
              <span className="font-bold text-xl">
                {t("total")} {t("purchases")}
              </span>
              <span>{dash.total_purchases ? Math.floor(dash.total_purchases) : 0} €</span>
            </div>
            <div className="bg-danger shadow-ld p-4 h-24 text-white rounded-md flex justify-between items-center">
              <span className="font-bold text-xl">
                {t("sales")} {t("today")}
              </span>
              <span>{dash.today_sales ? Math.floor(dash.today_sales) : 0} €</span>
            </div>
            <div className="bg-success shadow-ld p-4 h-24 text-white rounded-md flex justify-between items-center">
              <span className="font-bold text-xl">
                {t("purchases")} {t("today")}
              </span>
              <span>{dash.today_purchases ? Math.floor(dash.today_purchases) : 0} €</span>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-gray rounded-md p-4">
            <Bar data={{ labels, datasets: dataSets }} />
          </div>
        </>
      )}

      {(isLoading || isFetching) && getSkeltonCards()}
    </div>
  );
};

export default Dashboard;
