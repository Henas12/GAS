import React from 'react';

const ItemDetailsComponent = ({ item }) => {
  return (
    <div>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ItemDetailsComponent;