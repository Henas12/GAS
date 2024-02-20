import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
  <CardImg alt="Card image cap" src={props.image} style={{ width: '100%', height: '250px' }} />
  <CardBody className="p-4">
    <CardTitle tag="h5">{props.firstName} {props.lastName}</CardTitle>
    <CardSubtitle>{props.class_name}</CardSubtitle>
    <Button color={props.color}>Take</Button>
  </CardBody>
</Card>

  );
};

export default Blog;
