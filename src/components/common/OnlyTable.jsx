"use client";

import { useState } from "react";

export default function OnlyTable({ columns, actions, records, table, count }) {
  let i = 1;

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState(
    new Array(records.length).fill(false)
  );
  const [selectedIds, setSelectedIds] = useState([]);

  const handleHeaderCheckboxChange = () => {
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
  };

  const handleRowCheckboxChange = (index) => {
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
  };

  return (
    <>
      {records.length === 0 ? (
        <div className="flex justify-center font-bold items-center h-64">
          <p>No record found.</p>
        </div>
      ) : (
        <table className="w-[94%] mx-auto overflow-hidden shadow-sm mt-2 rounded-md border-[1.5px] border-gray-300">
          <thead>
            <tr className="bg-slate-300">
              <th className="hidden md:table-cell h-full py-2 px-[0.2rem]">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer scale-150"
                    checked={isAllChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                </div>
              </th>
              <th className="border-y-2 pl-2 py-2 rounded-sm text-left">
                Sr. #
              </th>
              {columns.map((th) => (
                <th
                  key={th}
                  className="border-y-2 pl-2 py-2 rounded-sm text-left"
                >
                  {th}
                </th>
              ))}
              {actions.actions && (
                <th className="border-y-2 pl-2 py-2 rounded-sm">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr
                key={i}
                className="border-y-2 hover:bg-gray-200/80 hover:cursor-pointer odd:bg-[#f2f2f2]"
              >
                <td className="hidden md:table-cell border-y-2 py-2 px-1 rounded-sm text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="text-center cursor-pointer scale-150"
                      checked={checkedRecords[index]}
                      onChange={() => handleRowCheckboxChange(index)}
                    />
                  </div>
                </td>
                <td className="border-y-2 pl-2 py-2 rounded-sm">{i++}</td>
                {Object.values(record).map(
                  (value, index) =>
                    index < count && (
                      <td
                        key={index}
                        className="border-y-2 pl-2 py-2 rounded-sm text-ellipsis text-nowrap overflow-hidden text-[0.8rem] lg:text-[0.95rem]"
                      >
                        {value}
                      </td>
                    )
                )}
                {actions.actions && (
                  <td className="py-2 flex items-center justify-center rounded-sm">
                    <div
                      className={`${
                        actions.all
                          ? "gap-[0.45rem] lg:gap-[0.8rem]"
                          : "gap-[0.7rem] lg:gap-[3rem]"
                      } flex items-center justify-evenly`}
                    >
                      {actions.update && (
                        <button>
                          {/* Your edit SVG */}
                          <svg width="20" height="20" fill="currentColor">
                            <path d="M14.5 2l3 3-10.5 10.5-3-3z" />
                          </svg>
                          Edit
                        </button>
                      )}
                      {actions.view && (
                        <button>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.3869 6.31016C18.649 6.67756 18.78 6.86126 18.78 7.13319C18.78 7.40512 18.649 7.58882 18.3869 7.95622C17.2097 9.60704 14.2031 13.1658 10.162 13.1658C6.12078 13.1658 3.11423 9.60704 1.93696 7.95622C1.67495 7.58882 1.54395 7.40512 1.54395 7.13319C1.54395 6.86126 1.67495 6.67756 1.93696 6.31016C3.11423 4.65934 6.12078 1.10059 10.162 1.10059C14.2031 1.10059 17.2097 4.65934 18.3869 6.31016Z"
                              stroke="#14181F"
                              strokeWidth="1.55124"
                            />
                            <path
                              d="M12.7472 7.13335C12.7472 5.70547 11.5897 4.54795 10.1618 4.54795C8.73394 4.54795 7.57642 5.70547 7.57642 7.13335C7.57642 8.56123 8.73394 9.71875 10.1618 9.71875C11.5897 9.71875 12.7472 8.56123 12.7472 7.13335Z"
                              stroke="#14181F"
                              strokeWidth="1.55124"
                            />
                          </svg>
                        </button>
                      )}
                      {actions.delete && (
                        <button>
                          {/* Delete SVG */}
                          <svg width="20" height="20" fill="currentColor">
                            <path d="M6 2v1H3v2h1l1 12h8l1-12h1V3h-3V2h-6zm2 5h2v8H8V7z" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
