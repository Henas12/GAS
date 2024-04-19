// src/components/ResultsComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup} from 'react-bootstrap';

const ResultsComponent = ({ results, onItemClick }) => {
  return (



<ListGroup style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd' }}>
        {results.map((item) => (
          <ListGroup.Item key={item.user.id} onClick={() => onItemClick(item)} style={{ cursor: 'pointer' }}>
            {item.user.username}
          </ListGroup.Item>
        ))}
      </ListGroup>





  

  );
};


export default ResultsComponent;
