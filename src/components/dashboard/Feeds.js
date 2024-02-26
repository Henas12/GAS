import React from "react";
import Loader from "../../layouts/loader/Loader";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLogsQuery } from "../../slices/studentApiSlice";
import TimeAgo from "../student/TimeCaculated";
const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  const { id: studentId } = useParams();
  const {data, isLoading, error, refetch} = useLogsQuery(studentId)


 

  
    
  
  return (
    isLoading? <Loader/>:
    <Card>
      <CardBody>
        
        <ListGroup flush className="mt-4">
          {data.map((feed, index) => (
            
        
              
            
            
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="danger"
              >
                <i className="bi bi-hdd"></i>
              </Button>
              <div style={{disply:"flex"}}>
                <div>
               Guardian: <small className="ms-auto text-muted text-small"> @{feed.guardian.username} </small>

                </div>
<div>
Staff:<small className="ms-auto text-muted text-small"> @{feed.staff.user.username}</small>

</div>
              </div>
              
         
              <small className="ms-auto text-muted text-small">
              <TimeAgo dateTime={feed.date_time} />
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
