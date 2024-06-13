import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useAllParentsQuery } from "../slices/ParentApiSlice";
import { useAllGuardiansQuery } from "../slices/guardiansApiSlice";
import { useAllTeachersQuery } from "../slices/teacherApiSlice";
import { useGetStudentsQuery } from "../slices/studentApiSlice";
import Loader from "../layouts/loader/Loader";
const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {

  const {data:guardians, isLoading, error, refetch} = useAllGuardiansQuery()
  const {data:parents, isLoading:isParentLoading} = useAllParentsQuery()
  const {data:students, isLoading:isStudentsLoading} = useGetStudentsQuery()
  const {data:teachers, isLoading:isTeachersLoading} = useAllTeachersQuery()


  return (
    ( isLoading || isParentLoading|| isStudentsLoading|| isTeachersLoading ? <Loader/>:
      <div>
      {/*Top Cards*/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Students"
            subtitle="Students"
            earning={students.length}
            icon="bi bi-people-fill"
          />
        </Col>
        
       
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Guardians"
            subtitle="Guardians"
            earning={parseInt(guardians.length) + parseInt(parents.length)}
            icon="bi bi-people"
          />
        </Col>

       
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Staff"
            subtitle="Staff"
            earning='9'
            icon="bi bi-people"
          />
        </Col>
      </Row>
      {/*Sales & Feed*/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
       
      </Row>
      {/*Table */}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
     
    </div>
  )
    
  );
};

export default Starter;