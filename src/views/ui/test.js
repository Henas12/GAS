// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button } from 'reactstrap';

// const Test = () => {
//   const [guardians, setGuardians] = useState([]);

//   const getGenderedUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/guardians/');
//       setGuardians(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <Button onClick={getGenderedUsers}>Get Guardians</Button>
//       {guardians.map(guardian => (
//         <div key={guardian.id}>{guardian.username}</div>
//       ))}
//     </>
//   );
// }

// export default Test;


// const [formData, setFormData] = useState({
//   name: '',
//   image: null,  // Use null to represent no file initially
// });

// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleFileChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.files[0] });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const formDataToSend = new FormData();
//     formDataToSend.append('username', formData.name);
//     formDataToSend.append('user_photo', formData.image);

//     const response = await axios.post('http://localhost:8000/verify/', formDataToSend);
//     console.log('Backend response:', response.data);
//   } catch (error) {
//     console.error('Error sending data to the backend:', error);
//   }
// };

// return (
//   <form onSubmit={handleSubmit}>
//     <label>
//       Name:
//       <input type="text" name="name" value={formData.name} onChange={handleChange} />
//     </label>
//     <br />
//     <label>
//       Image:
//       <input type="file" name="image" onChange={handleFileChange} />
//     </label>
//     <br />
//     <button type="submit">Submit</button>
//   </form>

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function YourComponent() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmAction = () => {
    // Perform your confirmed action here
    // ...

    // Close the confirmation modal
    setShowConfirmation(false);
  };

  const handleCancelAction = () => {
    // Handle cancel action or simply close the modal
    setShowConfirmation(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowConfirmation}>
        Show Confirmation
      </Button>

      <Modal show={showConfirmation} onHide={handleCancelAction}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to perform this action?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelAction}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default YourComponent;
