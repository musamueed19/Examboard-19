"use client";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";
import setId from "./IdExtractorFromOptions";
import { mutate } from "swr";

const statusOptions = [
  { value: "Active", id: true },
  { value: "Inactive", id: false },
];

export default function UserForm({
  type,
  data = "",
  setOpen,
  setIsVisible,
  setContent,
}) {
  const [locationOptions, setLocationOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: data?.name || "",
    contact: data?.contact || "",
    role: data?.role || "",
    status: data?.status || "",
    email: data?.email || "",
    location: data?.location || "",
    designation: data?.designation || "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [roleId, setRoleId] = useState(data.roleId);
  const [designationId, setDesignationId] = useState(data.designationId);
  const [locationId, setLocationId] = useState(data.locationId);
  const [statusId, setStatusId] = useState(data.statusId);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties/registration`)
      .then((response) => {
        // console.log(response);

        setLocationOptions(
          response.data.locations.map((item) => ({
            id: item.id,
            value: item.location,
          }))
        );
        setDesignationOptions(
          response.data.designations.map((item) => ({
            id: item.id,
            value: item.designation,
          }))
        );
        setRoleOptions(
          response.data.roles.map((item) => ({
            id: item.id,
            value: item.password,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  useEffect(() => {
    setId(formData.designation, setDesignationId, designationOptions);
    setId(formData.location, setLocationId, locationOptions);
    setId(formData.role, setRoleId, roleOptions);
    setId(formData.status, setStatusId, statusOptions);
  }, [formData.designation, formData.location, formData.status, formData.role]);

  // console.log(designationId, locationId, roleId, statusId);

  function submitHandler(event) {
    event.preventDefault();
    const bodyData = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contact,
      status: statusId,
      designation_id: designationId,
      location_id: locationId,
      role_ids: [roleId],
    };
    console.log(bodyData, data.roleId, roleId, formData.role);
    if (type === "create") {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties`, bodyData)
        .then((response) => {
          // console.log(response);
          handleSuccess("New User Added successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
    if (type === "update") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties/editFaculty/${data.id}`,
          bodyData
        )
        .then((response) => {
          console.log(response);
          handleSuccess("User record Updated successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
    if (type === "delete") {
      axios
        .delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties?id=${data.id}`)
        .then((response) => {
          // console.log(response);
          handleSuccess("User record Deleted successfully");
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
    mutate('/users')
  }

  function cancelHandler() {
    setOpen(false);
  }

  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <form onSubmit={submitHandler} className="w-full px-8 lg:px-16">
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit User" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                label="Name"
                required={true}
                input="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputFields
                type={type}
                label="Contact No."
                required={true}
                input="tel"
                name="contact"
                placeholder="Enter phone #"
                value={formData.contact}
                onChange={handleChange}
              />
              <InputFields
                type={type}
                label="Role"
                required={true}
                input="dropdown"
                name="role"
                value={formData.role}
                options={roleOptions}
                onChange={handleChange}
              />
              <InputFields
                type={type}
                label="Status"
                required={true}
                input="dropdown"
                name="status"
                value={formData.status}
                options={statusOptions}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                label="Email"
                required={true}
                input="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputFields
                type={type}
                label="Location"
                required={true}
                input="dropdown"
                name="location"
                value={formData.location}
                options={locationOptions}
                onChange={handleChange}
              />
              <InputFields
                type={type}
                label="Designation"
                required={true}
                input="dropdown"
                name="designation"
                value={formData.designation}
                options={designationOptions}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={cancelHandler}
            />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ) : type === "view" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="View User" />
          <div className="w-full flex flex-col gap-4 lg:pl-8">
            <InputFields
              inline={true}
              type={type}
              label="Name"
              required={true}
              input="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
            />
            <InputFields
              inline={true}
              type={type}
              label="Email"
              required={true}
              input="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
            />
            <InputFields
              inline={true}
              type={type}
              label="Contact No."
              required={true}
              input="text"
              name="contact"
              value={formData.contact}
              placeholder="Enter phone #"
            />
            <InputFields
              inline={true}
              type={type}
              label="Location"
              required={true}
              input="dropdown"
              name="location"
              value={formData.location}
              options={locationOptions}
            />
            <InputFields
              inline={true}
              type={type}
              label="Role"
              required={true}
              input="dropdown"
              name="role"
              value={formData.role}
              options={roleOptions}
            />

            <InputFields
              inline={true}
              type={type}
              label="Designation"
              required={true}
              input="dropdown"
              name="designation"
              value={formData.designation}
              options={designationOptions}
            />

            <InputFields
              inline={true}
              type={type}
              label="Status"
              required={true}
              input="dropdown"
              name="status"
              value={formData.status}
              options={statusOptions}
            />
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Close"
              btnType="button"
              onClick={cancelHandler}
            />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add User" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Name"
                required={true}
                input="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              <InputFields
                label="Contact No."
                required={true}
                input="text"
                name="contact"
                placeholder="Enter phone #"
                onChange={handleChange}
              />
              <InputFields
                label="Role"
                required={true}
                input="dropdown"
                name="role"
                options={roleOptions}
                onChange={handleChange}
              />
              <InputFields
                label="Status"
                required={true}
                input="dropdown"
                name="status"
                options={statusOptions}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Email"
                required={true}
                input="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <InputFields
                label="Location"
                required={true}
                input="dropdown"
                name="location"
                options={locationOptions}
                onChange={handleChange}
              />
              <InputFields
                label="Designation"
                required={true}
                input="dropdown"
                name="designation"
                options={designationOptions}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={cancelHandler}
            />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : (
        type === "delete" && (
          <DeleteDialog
            title="User"
            object={data.name}
            onCancel={cancelHandler}
          />
        )
      )}
    </form>
  );
}

// const designationOptions = [
//   {
//     value: "Associate Professor",
//     name: "Associate Professor",
//   },
//   {
//     value: "Assistant Professor",
//     name: "Assistant Professor",
//   },
//   {
//     value: "Tutor/Instructor",
//     name: "Tutor/Instructor",
//   },
//   {
//     value: "Lecturer",
//     name: "Lecturer",
//   },
// ];
// const roleOptions = [
//   {
//     value: "Associate Professor",
//     name: "Associate Professor",
//   },
//   {
//     value: "Assistant Professor",
//     name: "Assistant Professor",
//   },
//   {
//     value: "Teacher/Instructor",
//     name: "Tutor/Instructor",
//   },
//   {
//     value: "HoD",
//     name: "HoD",
//   },
//   {
//     value: "Admin",
//     name: "Admin",
//   },
//   {
//     value: "Faculty Member",
//     name: "Faculty Member",
//   },
// ];

// const locationOptions = [
//   { value: "Islamabad Campus" },
//   { value: "Lawrence Road Office" },
//   { value: "Karachi Campus (I)" },
//   { value: "Faisal Town Campus, Lahore" },
//   { value: "Gujranwala Campus" },
//   { value: "Faisalabad Campus" },
//   { value: "Karachi Campus (II)" },
//   { value: "Abbotabad Campus" },
//   { value: "Hyderabad Campus" },
//   { value: "Peshawar Campus" },
// ];
