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

const columns = ["Designation"];

const actions = {
  actions: true,
  update: true,
  view: false,
  delete: true,
  all: false,
};

export default function DesignationManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [refresh, setRefresh] = useState("");
  const [loading, setLoading] = useState(true);

  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  useEffect(() => {
    const searchDesignations = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BASE_API_URL
          }/designations?search=${inputValue.trim()}&limit=${rows}&page=${page}`
        );

        const formattedRecords = response.data.data.map((item) => ({
          designation: item.designation,
          id: item.id,
        }));

        setRecords(formattedRecords);
        setTotalRecords(response.data.total);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    searchDesignations();
    setLoading(false);
    showMessageStrip();
  }, [inputValue, rows, page, refresh]);

  const fetchDesignations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/designations`
      );
      const formattedRecords = response.data.data.map((item) => ({
        designation: item.designation,
        id: item.id,
      }));
      setRecords(formattedRecords);
      setTotalRecords(response.data.total);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  useEffect(() => {
    fetchDesignations(); // Initial load
  }, [rows, page, refresh]);

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  const handleSearchChange = (value) => {
    setInputValue(value); // This will trigger the search useEffect
  };
  const totalPages = Math.ceil(totalRecords / rows);

  return (
    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Designations Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          {/* Pass the handler to Searchbar so it can update inputValue */}
          <Searchbar
            label="Search Designation"
            searchValue={inputValue}
            setSearchValue={handleSearchChange}
            path="designations"
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="designations"
            path="designations"
            setRefresh={setRefresh}
          />
          <FormModal
            title="Add"
            type="create"
            table="designations"
            setRefresh={setRefresh}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          records={records}
          actions={actions}
          setRefresh={setRefresh}
          table="designations"
          count={1}
          label="Designation"
          url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/designations`}
          onSelectedIdsChange={handleSelectedIdsChange}
        />
      )}
      {totalRecords > 0 && (
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
