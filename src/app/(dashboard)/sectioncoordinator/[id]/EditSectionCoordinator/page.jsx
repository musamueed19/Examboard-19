import CourseAllocationForm from "@/components/Forms/CourseAllocationForm";
import TitleHeader from "@/components/common/TitleHeader";


export default function EditSection({section, id}) {


    return (
      // console.log(semester.semester, semester.type)
        <div >
      
        
        <CourseAllocationForm section={section} id={id} type={section.type} />
      </div>
    );
}
