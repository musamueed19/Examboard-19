import Btns from "./Btns";
import TitleHeader from "./TitleHeader";


{/* <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog"></div>; */ }

export default function DeleteDialog({ title, object, onDelete, onCancel,Coursetitle }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 px-6">
      <TitleHeader title={`Delete ${title || Coursetitle}`}
      />
      <div className="flex flex-col gap-2">
        <h3>
          Are you sure you want to delete this {title} <span className="text-red-500 font-semibold">{object}</span>?
        </h3>
        <p>This will permanately delete this {title}{Coursetitle}</p>
        <div className="flex w-full justify-end gap-2 mt-4">
          <Btns type="primary" title="Cancel" onClick={onCancel}/>
          <Btns type="alert" title="Delete" />
        </div>
      </div>
    </div>
  );
}
