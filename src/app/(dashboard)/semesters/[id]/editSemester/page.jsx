import EditSemesterForm from "@/components/Forms/EditSemesterForm";
import TitleHeader from "@/components/common/TitleHeader";


export default function EditSemester({semester}) {


    return (
      // console.log(semester, semester.type)
        <div className="h-fit">
        <TitleHeader title= {`${semester.type} Semester`} />
        
        <EditSemesterForm semester={semester} type={semester.type}></EditSemesterForm>
      </div>
    );
}
