"use client";

import Add from "@/components/common/new comp/Add";
import BulkDelete from "@/components/common/new comp/BulkDelete";
import FacultyForm from "@/components/common/new comp/Forms/FacultyForm";
import Modal from "@/components/common/new comp/Modal";
import Pagination from "@/components/common/new comp/Pagination";
import SuccessToast from "@/components/common/new comp/SuccessToast";
import Searchbar from "@/components/common/Searchbar";
import FacultyTable from "@/components/Tables/facultyTable";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import React, { useEffect, useState } from "react";

export default function UsersPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modal, setModal] = useState(false);
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [ids, setIds] = useState("");
  const [userName, setUserName] = useState("");
  const [refresh, setRefresh] = useState("");
  
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  
  // const [url, setUrl] = useState(`${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties?search=${inputValue.trim()}&limit=${rows}&page=${page}`);

  async function getFaculties() {
    let res = await getAll(`${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties?search=${inputValue.trim()}&limit=${rows}&page=${page}`);
    if (res.success) {
      setRecords(res.data.data);
      setTotalRecords(res.data.total);
    }
    console.log(res, records);
  }

  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  useEffect(() => {
    getFaculties();
    setLoading(false);
    showMessageStrip();
  }, [inputValue, rows, page, refresh]);

  useEffect(() => {
    setPage(1);
  }, [inputValue, rows, refresh]);

  const handleSearchChange = (value) => {
    setInputValue(value); // This will trigger the search useEffect
  };
  const totalPages = Math.ceil(totalRecords / rows);


  return (
    <div className="w-full h-full rounded-md py-6 px-4 lg:px-10 lg:py-8 lg:mb-4 flex flex-col gap-6">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <h1 className="titleHeader">Faculty Management</h1>

      <div className="mt-8 justify-between items-center hidden md:flex">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <Searchbar
            label="Faculty name or email"
            searchValue={inputValue}
            setSearchValue={handleSearchChange}
            path="faculties"
          />
          {/* <Filter label="User Role" options={userRoleOptions} name="userRole" />
          <Filter
            label="User Status"
            options={userStatusOptions}
            name="userStatus"
          /> */}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Bulk Delete Button */}
          {records.length > 1 && (
            <BulkDelete
              size={30}
              setModal={setModal}
              setType={setType}
              ids={ids}
            />
          )}

          {/* Add Button */}
          <Add size={16} setModal={setModal} setType={setType} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FacultyTable
            records={records}
            message="No records found."
            setModal={setModal}
            setType={setType}
            setId={setUserId}
            setName={setUserName}
            onSelectedIdsChange={setIds}
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
        </>
      )}

      <Modal isOpen={modal}>
        <FacultyForm
          setModal={setModal}
          type={type}
          id={userId}
          setRefresh={setRefresh}
          userName={userName}
          ids={ids}
        />
      </Modal>
    </div>
  );
}
