import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

export default function LocationForm({
  type,
  data = "",
  setOpen,
  setRefresh,
  setIsVisible,
  setContent,
}) {
  const [formData, setFormData] = useState({
    locationTitle: data?.location || "",
  });
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function saveHandler() {
  //   console.log(location);

  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/locations/addLocation`, {location})
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching locations:", error);
  //     });
  // }

  function submitHandler(event) {
    event.preventDefault();

    if (type === "create") {
      console.log(location);

      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/locations/addLocation`, {
          location: formData.locationTitle,
        })
        .then((response) => {
          setRefresh("New Location Added successfully");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }

    if (type === "update") {
      console.log(location, data.id);
      axios
        .patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/locations/${data.id}`, {
          location: formData.locationTitle,
        })
        .then((response) => {
          setRefresh("Location has Updated successfully");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }
    if (type === "delete") {
      console.log(location, data.id);
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/locations?id=${data.id}`
        )
        .then((response) => {
          setRefresh("Location has Deleted successfully");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    }

    // router.push('/locations')
  }
  function handleCancel() {
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
          <TitleHeader fontSize="xl" title="Update Location" />
          <div className="flex flex-col justify-center w-full px-16">
            <InputFields
              type={type}
              label="Location Title"
              input="text"
              name="locationTitle"
              placeholder="Enter location name"
              value={formData.locationTitle}
              onChange={handleChange}
            />
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add New Location" />
          <div className="flex flex-col justify-center w-full px-16">
            <InputFields
              value={formData.locationTitle}
              label="Location Title"
              input="text"
              name="locationTitle"
              placeholder="Enter location name"
              onChange={handleChange}
            />
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : (
        type === "delete" && (
          <DeleteDialog
            title="location"
            object={data.location}
            onCancel={handleCancel}
          />
        )
      )}
    </form>
  );
}
