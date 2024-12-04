"use client";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import Loading from "./loading";
import Searchbar from "@/components/common/Searchbar";
import InputFields from "@/components/common/InputFields";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import { useSearchParams } from "next/navigation";
import SuccessToast from "@/components/common/new comp/SuccessToast";

const columns = ["Semester", "Start Date", "End Date", "Active"];
const actions = {
  actions: "true",
  all: "true",
};

const statusOptions = [
  { value: "All", name: "All" },
  { value: "Active", name: "Active" },
  { value: "InActive", name: "InActive" },
];

export default function SemesterManagementPage() {
  const [records, setRecords] = useState([]);
  const [recordsAscending, setRecordsAscending] = useState([]);
  const [recordsDescending, setRecordsDescending] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("All");
  const [refresh, setRefresh] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const searchParams = useSearchParams();
  const message = searchParams?.get("message"); // Read query parameter

  useEffect(() => {
    if (message) {
      setRefresh(message);
    }
  }, [message]);
  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  useEffect(() => {
    const fetchSemesters = async () => {
      if (initialLoad) setLoading(true); // Show loading on initial load only

      try {
          
          console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters?status=${status}&search=${searchTerm}&limit=${rows}&page=${page}`);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters?status=${status}&search=${searchTerm}&limit=${rows}&page=${page}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch semesters");

        const { data, total } = await response.json();

        const ascendingRecords = data.map((item) => ({
          title: item.title,
          start_date: item.start_date,
          end_date: item.end_date,
          status: item.is_Active ? "True" : "False",
          id: item.id,
        }));
        const descendingRecords = [...ascendingRecords].reverse();

        setRecordsAscending(ascendingRecords);
        setRecordsDescending(descendingRecords);
        setRecords(isAscending ? ascendingRecords : descendingRecords);
        setTotalRecords(total);
      } catch (error) {
        console.error("Error fetching semesters:", error);
        setError(error);
      } finally {
        if (initialLoad) setLoading(false); // Stop loading only on initial load
        setInitialLoad(false); // Disable initial load flag after first fetch
      }
    };

    fetchSemesters();
    showMessageStrip();
  }, [searchTerm, status, refresh, rows, page]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    setRecords(isAscending ? recordsDescending : recordsAscending);
  };
  useEffect(() => {
    setPage(1);
  }, [searchTerm, rows,status, refresh]);


  const handleSelectedIdsChange = (ids) => setSelectedIds(ids);

  if (loading) return <Loading />;
  if (error) return <div>Error loading semesters: {error.message}</div>;

  const totalPages = Math.ceil(totalRecords / rows);

  return (
    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Semesters Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar
            label="Search Semester"
            searchValue={searchTerm}
            setSearchValue={setSearchTerm}
            path="semesters"
          />
          <InputFields
            label="Semester Status"
            required={true}
            input="dropdown"
            name="status"
            options={statusOptions}
            value={status}
            onChange={(name, value) => setStatus(value)}
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="semesters"
            path="semesters"
            setRefresh={setRefresh}
          />
          <FormModal
            title="Add"
            type="create"
            table="semesters"
            setRefresh={setRefresh}
          />
        </div>
      </div>
      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="semesters"
        count={4}
        label="Semester"
        onSelectedIdsChange={handleSelectedIdsChange}
        setRefresh={setRefresh}
        toggleSortOrder={toggleSortOrder}
      />
      {totalRecords > 10 && (
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
