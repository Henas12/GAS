import { Button, Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
<Card>
  <CardBody>
    <div className="d-flex">
      <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
        <i className={props.icon}></i>
      </div>
      <div className="ms-3">
        <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
        <small className="text-muted">{props.subtitle}</small>
      </div>
    </div>
    <div className="d-flex justify-content-end mt-3"> {/* Add a margin top here */}
      <button className="btn btn-sm btn-primary">Fill Out Form</button> {/* Adjust button class according to your styling */}
    </div>
  </CardBody>
</Card>
  );
};

export default TopCards;