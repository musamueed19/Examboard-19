"use client";

import { useEffect, useState } from "react";
import Delete from "../common/new comp/Delete";
import Update from "../common/new comp/Update";
import View from "../common/new comp/View";

export default function FacultyTable({
  records = [],
  message,
  setModal,
  setType,
  setId,
  setName,
  onSelectedIdsChange,
}) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState(
    new Array(0).fill(false)
  );
  const [selectedIds, setSelectedIds] = useState([]);

  function handleHeaderCheckboxChange() {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setCheckedRecords(new Array(records.length).fill(newValue));

    if (newValue) {
      const allIds = records.map((record) => record.id);
      setSelectedIds(allIds);
      console.log("All selected IDs:", allIds);
    } else {
      setSelectedIds([]);
    }
  }

  function handleRowCheckboxChange(index) {
    const updatedCheckedRecords = [...checkedRecords];
    updatedCheckedRecords[index] = !updatedCheckedRecords[index];
    setCheckedRecords(updatedCheckedRecords);

    const updatedSelectedIds = [...selectedIds];
    if (updatedCheckedRecords[index]) {
      updatedSelectedIds.push(records[index].id);
    } else {
      const recordId = records[index].id;
      const idIndex = updatedSelectedIds.indexOf(recordId);
      if (idIndex > -1) {
        updatedSelectedIds.splice(idIndex, 1);
      }
    }
    setSelectedIds(updatedSelectedIds);
    console.log("Selected IDs:", updatedSelectedIds);

    setIsAllChecked(updatedCheckedRecords.every((checked) => checked));
  }

  useEffect(() => {
    // Reset selections and checked records when records change
    setCheckedRecords(new Array(records.length).fill(false));
    setIsAllChecked(false);
    setSelectedIds([]);
  }, [records]);

  useEffect(() => {
    onSelectedIdsChange(selectedIds);
  }, [selectedIds]);

  return (
    <table className="w-full mt-8" id="table">
      <thead className="font-bold">
        <tr>
          <td id="tableCheckbox">
            <input
              type="checkbox"
              checked={isAllChecked ?? false}
              onChange={handleHeaderCheckboxChange}
            />
          </td>
          <td>Sr. #</td>
          <td>Name</td>
          <td>Email</td>
          <td>Contact No.</td>
          <td>Location</td>
          <td>Designation</td>
          <td id="table-action">Actions</td>
        </tr>
      </thead>
      <tbody>
        {records && records.length > 0 ? (
          records.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedRecords[index] ?? false}
                  onChange={() => handleRowCheckboxChange(index)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {item.contact_number === ""
                  ? "No contact no."
                  : item.contact_number}
              </td>
              <td className="capitalize">{item.location}</td>
              <td className="capitalize">{item.designation}</td>
              <td className="flex gap-2 justify-end">
                <Update
                  setModal={setModal}
                  setName={setName}
                  name={item.name}
                  setType={setType}
                  id={item.id}
                  setId={setId}
                />
                <View
                  setModal={setModal}
                  setName={setName}
                  name={item.name}
                  setType={setType}
                  id={item.id}
                  setId={setId}
                />
                <Delete
                  setModal={setModal}
                  setName={setName}
                  name={item.name}
                  setType={setType}
                  id={item.id}
                  setId={setId}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              {message || "No records found."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
