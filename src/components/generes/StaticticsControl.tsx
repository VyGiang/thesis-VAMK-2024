// StaticControl.tsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import FileSaver from "file-saver";

interface Dataset {
  datasetId: number;
  startTime: string;
  endTime: string;
  value: number;
}

interface Pagination {
  total: number;
  lastPage: number;
  prevPage: number | null;
  nextPage: number | null;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

interface FingridResponse {
  data: Dataset[];
  pagination: Pagination;
}

const StaticControl: React.FC = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [page, setPage] = useState(1);
  const [dataset, setDataset] = useState<Dataset[]>([]);
  const [allData, setAllData] = useState<Dataset[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const perPage = 10; // Default perPage is 10

  const saveDataAsJSON = (data: Dataset[]) => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    FileSaver.saveAs(jsonBlob, "all_dataset_data.json");
  };

  const fetchDataPage = async (
    currentPage: number
  ): Promise<FingridResponse> => {
    const url = `http://localhost:5000/api/datasets/317/data`;

    const response = await axios.get<FingridResponse>(url, {
      params: {
        startTime,
        endTime,
        page: currentPage,
      },
    });

    return response.data;
  };

  const fetchData = async (currentPage: number) => {
    const response = await fetchDataPage(currentPage);
    setDataset(response.data);
    setPagination(response.pagination);
    setPage(currentPage);
  };

  const fetchAllPages = async () => {
    let currentPage = 1;
    const allFetchedData: Dataset[] = [];
    let response: FingridResponse;

    do {
      response = await fetchDataPage(currentPage);
      allFetchedData.push(...response.data);
      currentPage += 1;
    } while (response.data.length === perPage); // Stop when the last page is reached

    setAllData(allFetchedData);
    console.log(allFetchedData);
    saveDataAsJSON(allFetchedData);
    fetchData(1); // Display the first page
  };

  const handlePrevPage = () => {
    if (pagination && page > 1) {
      const prevPage = page - 1;
      fetchData(prevPage);
    }
  };

  const handleNextPage = () => {
    if (pagination && dataset.length === perPage) {
      const nextPage = page + 1;
      fetchData(nextPage);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Navbar */}
        <Navbar />
        <div className="flex items-center justify-end">
          <p className="text-right text-sm font-bold">Thursday, 9 May 2024</p>
        </div>

        {/* Main */}
        <div className="bg-[#F0F0F0] sm:col-span-1 md:col-span-1 lg:col-span-2 rounded-xl grid grid-cols-4 gap-5 p-5">
          <div className="col-span-4">
            <h1 className="lg:text-5xl sm:text-lg md:text-lg font-bold mb-3">
              Firebase
            </h1>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <label className="text-sm font-bold">
              Start Time
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="text-sm font-bold">
              End Time
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              onClick={fetchAllPages}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Fetch All Pages
            </button>
          </div>
          <div className="col-span-4 mt-5">
            <h2 className="text-2xl font-bold">Results</h2>
            {dataset.map((item) => (
              <div key={item.startTime} className="mb-3">
                <p>
                  <strong>Dataset ID:</strong> {item.datasetId}
                </p>
                <p>
                  <strong>Start Time:</strong> {item.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {item.endTime}
                </p>
                <p>
                  <strong>Value:</strong> {item.value}
                </p>
                <hr />
              </div>
            ))}
            <div className="flex justify-between mt-5">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Previous Page
              </button>
              <button
                onClick={handleNextPage}
                disabled={dataset.length < perPage}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticControl;
