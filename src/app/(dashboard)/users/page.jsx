"use client";

import Add from "@/components/common/new comp/Add";
import BulkDelete from "@/components/common/new comp/BulkDelete";
import Filter from "@/components/common/new comp/Filter";
import UserForm from "@/components/common/new comp/Forms/UserForm";
import Modal from "@/components/common/new comp/Modal";
import Pagination from "@/components/common/new comp/Pagination";
import Searchbar from "@/components/common/new comp/Searchbar";
import SuccessToast from "@/components/common/new comp/SuccessToast";
import UserTable from "@/components/Tables/userTable";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import React, { useEffect, useState } from "react";

const userRoleOptions = [
  { value: "All" },
  { value: "Admin" },
  { value: "HoD" },
  { value: "Supervisor" },
];
const userStatusOptions = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

export default function UsersPage() {
  const [records, setRecords] = useState([]);
  const [url, setUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties`
  );
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [ids, setIds] = useState([]);
  const [userName, setUserName] = useState("");
  const [refresh, setRefresh] = useState("");

  async function getUsers() {
    try {
      setLoading(true); // Start loading before fetching
      let res = await getAll(url);
      if (res.success) {
        setRecords(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
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
    getUsers();
    showMessageStrip();
  }, [refresh]);

  return (
    <div className="w-full h-full rounded-md pt-6 px-4 lg:px-10 flex flex-col gap-6">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <h1 className="titleHeader">Users Management</h1>

      <div className="mt-8 flex justify-between items-center">
        <div className="hidden md:flex flex-col lg:flex-row lg:gap-6">
          <Searchbar label="User name" />
          <Filter label="User Role" options={userRoleOptions} name="userRole" />
          <Filter
            label="User Status"
            options={userStatusOptions}
            name="userStatus"
          />
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
          {/* <Add size={16} setModal={setModal} setType={setType} /> */}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserTable
            records={records}
            message="No records found."
            setModal={setModal}
            setType={setType}
            setId={setUserId}
            setName={setUserName}
            onSelectedIdsChange={setIds}
          />

          {records.length > 10 && <Pagination />}
        </>
      )}

      <Modal isOpen={modal}>
        <UserForm
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
