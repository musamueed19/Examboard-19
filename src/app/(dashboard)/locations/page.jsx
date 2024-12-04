"use client";
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import SuccessToast from "@/components/common/new comp/SuccessToast";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import axios from "axios";
import { useState, useEffect } from "react";

const columns = ["Location"];
const actions = {
  actions: true,
  update: true,
  view: false,
  delete: true,
  all: false,
};

export default function LocationManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]); // State for records
  const [refresh, setRefresh] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/locations?search=${inputValue.trim()}&limit=${rows}&page=${page}`
      );
console.log(response.data.data);
console.log(typeof response.data.data);


      // Check if response.data is an array and set records
      if (response.data && Array.isArray(response.data.data)) {
        setRecords(
          response.data.data.map((item) => ({
            location: item.location,
            id: item.id,
          }))
        );
        setTotalRecords(response.data.total);
      } else {
        console.error("Data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };


  useEffect(() => {
    // Fetch records inside useEffect
    fetchLocations();
    showMessageStrip();
  }, [inputValue, rows, page, refresh]); // Empty dependency array to fetch data only once
const handleSearchChange = (value) => {
  setInputValue(value); // This will trigger the search useEffect
};
const totalPages = Math.ceil(totalRecords / rows);
  return (
    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Locations Management" />

      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar
            label="Location"
            searchValue={inputValue}
            setSearchValue={handleSearchChange}
            path="locations"
          />
          {/* Add other filter components here if needed */}
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="locations"
            path="locations"
            setRefresh={setRefresh}
          />
          <FormModal
            title="Add"
            type="create"
            table="locations"
            setRefresh={setRefresh}
          />
        </div>
      </div>

      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="locations"
        label="locations"
        count={1}
        setRefresh={setRefresh}
        onSelectedIdsChange={handleSelectedIdsChange}
      />
      {records.length > 0 && (
        <Pagination
          rows={rows}
          setRows={setRows}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
