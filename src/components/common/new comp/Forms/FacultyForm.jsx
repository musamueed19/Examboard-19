import Image from "next/image";
import Button from "../Button";
import InputFields from "../../InputFields";
import { useEffect, useState } from "react";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import Dropdown from "../Dropdown";
import { useRouter } from "next/navigation";
import {
  deleteRecord,
  patchRecord,
  postRecord,
} from "@/lib/Fetcher/handleRecord";
import MultiSelectdropdwon from "../MultiSelectdropdwon";

export default function FacultyForm({ setModal, type, id, setRefresh, userName }) {
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    location: "select",
    designation: "select",
    role: [],
    status: true,
    locationName: "select",
    designationName: "select",
    roleName: "",
    statusName: "Active",
  });
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { id: true, name: "Active" },
    { id: false, name: "Inactive" },
  ]);
  function onChange(name, value) {
    //  if (name === "contactNumber") {
    //    // Regex for validating a phone number
    //    const phoneRegex = /^[+]?[0-9]{10,15}$/; // Allows optional "+" and 10-15 digits
    //    if (!phoneRegex.test(value)) {
    //      setFormError("Invalid phone number. Must be 10-15 digits.");
    //    } else {
    //      setFormError(""); // Clear error if valid
    //    }
    // }

    const parsedValue = name === "status" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  }

  function validateContactNumber(value) {
    if (value === "") return;
    const phoneRegex = /^[+]?[0-9]{10,15}$/; // Allows optional "+" and 10-15 digits
    if (!phoneRegex.test(value)) {
      setFormError("Invalid phone number. Must be 10-15 digits.");
    } else {
      setFormError(""); // Clear error if valid
    }
  }

  function handleCancel() {
    setModal(false);

    console.log(locationOptions);
    console.log(designationOptions);
    console.log(roleOptions);
  }
  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    setFormError("");
    validateContactNumber(formData.contactNumber);

    if (formError !== "") {
      return;
    }
    if ((type === "add" || type === "update") && formData.name === "") {
      setFormError("name is required");
      return;
    } else if (
      (type === "add" || type === "update") &&
      (formData.designation === "select" ||
        formData.location === "select" ||
        formData.status === "select" ||
        formData.role.length === 0)
    ) {
      setFormError("You must select from all dropdowns");
      return;
    }

    console.log(
      `Form Type: ${type}, Faculty Id: ${id}, and Modal will be set to close`
    );
    // console.log(formData);

    if (type === "add") {
      const bodyData = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        status: formData.status,
        designation_id: formData.designation,
        location_id: formData.location,
        role_ids: formData.role,
      };

      console.log("----bodyData----", bodyData);

      const res = await postRecord(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties`,
        bodyData
      );
      if (!res.success) {
        console.log(res);
        setFormError(res.error);
        return;
      }
      setDisabled(true);
      console.log(res);
      // setSuccess('Faculty Created Successfully');
      setRefresh("Faculty record added successfully.");
      handleCancel();
    } else if (type === "update") {
      const bodyData = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        status: formData.status,
        designation_id: formData.designation,
        location_id: formData.location,
        role_ids: formData.role,
      };

      const res = await patchRecord(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties/editFaculty/${id}`,
        bodyData
      );
      if (!res.success) {
        console.log(res);
        setFormError(res.error);
        return;
      }
      setDisabled(true);
      console.log(res);
      // setSuccess('Faculty Created Successfully');
      setRefresh("Faculty record updated successfully.");
      handleCancel();
    } else if (type === "delete") {
      const res = await deleteRecord(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties?id=${id}`
      );
      if (!res.success) {
        console.log(res);
        setFormError(res.error);
        return;
      }
      setDisabled(true);
      console.log(res);
      // setSuccess('Faculty Deleted Successfully');
      setRefresh("Faculty record deleted successfully.");
      handleCancel();
    }
    else if (type === "bulkdelete") {
      const queryString = ids.map((id) => `id=${id}`).join("&");
      const res = await deleteRecord(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties?${queryString}`
      );
      if (!res.success) {
        console.log(res);
        setFormError(res.error);
        return;
      }
      setDisabled(true);
      console.log(res);
      // setSuccess('User Deleted Successfully');
      setRefresh("All selected Users deleted successfully.");
      handleCancel();
    }
  }

  async function getOptions() {
    let res = await getAll(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties/registration`
    );
    if (!res.success) {
      // setError("Something, went wrong! (an error occured)");
      setError(res.error);
      return;
    }
    console.log(res);

    setLocationOptions(
      res.data.locations.map((item) => ({
        id: item.id,
        name: item.location,
      }))
    );
    setDesignationOptions(
      res.data.designations.map((item) => ({
        id: item.id,
        name: item.designation,
      }))
    );
    setRoleOptions(
      res.data.roles.map((item) => ({
        id: item.id,
        name: item.password,
      }))
    );
    console.log(res.data.locations, res.data.designations, res.data.roles);
  }

  async function getFaculty() {
    let res = await getAll(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/faculties/${id}`
    );
    if (!res.success) {
      setError(res.error);
      return;
    }
    console.log(res);
    setFormData({
      name: res.data.name,
      email: res.data.email,
      contactNumber: res.data.contact_number,
      location: res.data.location.id,
      designation: res.data.designation.id,
      role: res.data.user.userRole[0].role.id,
      status: res.data.user.is_active,
      locationName: res.data.location.location,
      designationName: res.data.designation.designation,
      roleName: res.data.user?.userRole.map(role => role.role.name).join(", ") || "select",
      statusName: res.data.user.is_active ? "Active" : "Inactive",
    });
    setUserRoles(res.data.user.userRole);
    onChange("role", userRoles.map(role => role.role.name).join(", "))
  }
  if (type === "add" || type === "update") {
    useEffect(() => {
      getOptions();
    }, []);
  }

  if (type === "update" || type === "view") {
    useEffect(() => {
      getFaculty();
    }, []);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center bg-white max-w-md:w-[95%] w-[70%] lg:w-[47%] rounded-lg shadow-md relative py-[1.5rem] lg:py-[2rem]"
    >
      <button onClick={handleCancel} className="absolute right-5 top-3">
        <Image src="/cross.svg" alt="cross icon" width={20} height={20} />
      </button>
      <div className="w-[90%] lg:w-[95%] mx-auto lg:px-[2rem] space-y-8">
        {error !== "" ? (
          <p className="text-red-600 font-medium bg-red-100/70 w-full rounded-md px-6 my-8 py-4 flex items-center gap-4">
            <Image src="alert.svg" width={20} height={20} alt="error icon" />
            Error: {error}
          </p>
        ) : type === "add" ? (
          <>
            <h1 className="titleHeader">Add Faculty</h1>
            <div className="mt-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  label="Name"
                  input="text"
                  name="name"
                  placeholder="Enter name"
                  onChange={onChange}
                  value={formData.name}
                />
                <InputFields
                  label="Email"
                  required={true}
                  input="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={onChange}
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  label="Contact No."
                  input="text"
                  name="contactNumber"
                  placeholder="Enter phone #"
                  onChange={onChange}
                  value={formData.contactNumber}
                  onBlur={(e) => validateContactNumber(e.target.value)}
                />
                <Dropdown
                  label="Location"
                  options={locationOptions}
                  onChange={onChange}
                  name="location"
                  value={formData.location}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <MultiSelectdropdwon
                  label="Role"
                  options={roleOptions}
                  onChange={onChange}
                  name="role"
                  value={formData.role}
                />
                <Dropdown
                  label="Designation"
                  options={designationOptions}
                  onChange={onChange}
                  name="designation"
                  value={formData.designation}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <div className="w-full md:w-1/2">
                  <Dropdown
                    label="Status"
                    options={statusOptions}
                    onChange={onChange}
                    name="status"
                    value={formData.status}
                  />
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
            <div>
              {formError && (
                <p className="text-sm text-red-500 font-medium lowercase">
                  {formError}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 font-medium lowercase">
                  {success}
                </p>
              )}
              <div className="flex flex-col w-3/3 mx-auto md:w-full md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
                <Button
                  variant="revert"
                  type="button"
                  onClick={handleCancel}
                  disabled={disabled}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled}>
                  Save
                </Button>
              </div>
            </div>
          </>
        ) : type === "update" ? (
          <>
            <h1 className="titleHeader">Update Faculty</h1>
            <div className="mt-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  label="Name"
                  input="text"
                  name="name"
                  placeholder="Enter name"
                  onChange={onChange}
                  value={formData.name}
                />
                <div className="flex items-center w-full">
                  <InputFields
                    type="view"
                    inline={true}
                    label="Email"
                    required={true}
                    input="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={onChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  label="Contact No."
                  input="text"
                  name="contactNumber"
                  placeholder="Enter phone #"
                  onChange={onChange}
                  value={formData.contactNumber}
                  onBlur={(e) => validateContactNumber(e.target.value)}
                />
                <Dropdown
                  label="Location"
                  options={locationOptions}
                  onChange={onChange}
                  name="location"
                  value={formData.location}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <Dropdown
                  type="view"
                  inline={true}
                  label="Role"
                  options={roleOptions}
                  // onChange={onChange}
                  name="role"
                  value={formData.roleName}
                />
                <Dropdown
                  label="Designation"
                  options={designationOptions}
                  onChange={onChange}
                  name="designation"
                  value={formData.designation}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <div className="w-full md:w-1/2">
                  <Dropdown
                    type="view"
                    inline={true}
                    label="Status"
                    options={statusOptions}
                    // onChange={onChange}
                    name="status"
                    value={formData.statusName}
                  />
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
            <div className="flex flex-col">
              {formError && (
                <p className="text-sm text-red-500 font-medium lowercase">
                  {formError}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 font-medium lowercase">
                  {success}
                </p>
              )}
              <div className="flex flex-col w-3/3 mx-auto md:w-full md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
                <Button
                  variant="revert"
                  type="button"
                  onClick={handleCancel}
                  disabled={disabled}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled}>
                  Update
                </Button>
              </div>
            </div>
          </>
        ) : type === "view" ? (
          <>
            <h1 className="titleHeader">View Faculty</h1>
            <div className="mt-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  type="view"
                  label="Name"
                  input="text"
                  name="name"
                  placeholder="Enter name"
                  inline={true}
                  value={formData.name}
                />
                <InputFields
                  type="view"
                  label="Email"
                  required={true}
                  input="email"
                  name="email"
                  placeholder="Enter email"
                  inline={true}
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <InputFields
                  type="view"
                  label="Contact No."
                  input="text"
                  name="contactNumber"
                  placeholder="Enter phone #"
                  inline={true}
                  value={
                    formData.contactNumber === ""
                      ? "No contact no."
                      : formData.contactNumber
                  }
                />
                <Dropdown
                  type="view"
                  label="Location"
                  options={locationOptions}
                  inline={true}
                  name="location"
                  value={formData.locationName}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <Dropdown
                  type="view"
                  label="Role"
                  options={roleOptions}
                  inline={true}
                  name="role"
                  value={formData.roleName}
                />
                <Dropdown
                  type="view"
                  label="Designation"
                  options={designationOptions}
                  inline={true}
                  name="designation"
                  value={formData.designationName}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                <div className="w-full md:w-1/2">
                  <Dropdown
                    type="view"
                    label="Status"
                    options={statusOptions}
                    inline={true}
                    name="status"
                    value={formData.statusName}
                  />
                </div>
                <div className="w-1/2"></div>
              </div>
              {formError && (
                <p className="text-sm text-red-500 font-medium lowercase">
                  {formError}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 font-medium lowercase">
                  {success}
                </p>
              )}
            </div>
            <div className="flex flex-col w-3/3 mx-auto md:w-full md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
              <Button
                variant="revert"
                type="button"
                onClick={handleCancel}
                disabled={disabled}
              >
                Close
              </Button>
            </div>
          </>
        ) : type === "delete" ? (
          <>
            <h1 className="titleHeader">Delete Faculty</h1>
            <div className="w-[90%] mx-auto text-lg">
              <div>
                Are you sure, you want to delete this Faculty{" "}
                <span className="font-medium text-red-500">({userName})?</span>
              </div>
              <p>This will permanantly delete this Faculty.</p>
              {formError && (
                <p className="text-sm text-red-500 font-medium lowercase">
                  {formError}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-500 font-medium lowercase">
                  {success}
                </p>
              )}
            </div>
            <div className="flex flex-col w-3/3 mx-auto md:w-full md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
              <Button
                variant="revert"
                type="button"
                onClick={handleCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button variant="delete" type="submit">
                Delete
              </Button>
            </div>
          </>
        ) : (
          type === "bulkdelete" && (
            <>
              <h1 className="titleHeader">Delete Selected Faculties</h1>
              <div className="w-[90%] mx-auto text-lg">
                <div>
                  Are you sure, you want to delete all these{" "}
                  <span className="font-medium text-red-500">
                    (selected faculties)?
                  </span>
                </div>
                <p>This will permanantly delete all these faculties.</p>
              </div>
              <div>
                {formError && (
                  <p className="text-sm text-red-500 font-medium lowercase">
                    {formError}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-green-500 font-medium lowercase">
                    {success}
                  </p>
                )}
                <div className="flex flex-col w-3/3 mx-auto md:w-full md:flex-row md:items-center md:justify-end gap-3 md:gap-6">
                  <Button
                    variant="revert"
                    type="button"
                    onClick={handleCancel}
                    disabled={disabled}
                  >
                    Cancel
                  </Button>
                  <Button variant="delete" type="submit">
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </form>
  );
}
