import React from 'react'

function Student() {
  return (
    <>
    <CardTitle tag="h5">Project Listing</CardTitle>
    <CardSubtitle className="mb-2 text-muted" tag="h6">
      Overview of the projects
    </CardSubtitle>

    <Table className="no-wrap mt-3 align-middle" responsive borderless>
      <thead>
        <tr>
          <th>Team Lead</th>
          <th>Project</th>

          
          <th>Weeks</th>
          <th>Detail</th>
          
        </tr>
      </thead>
      <tbody>
        {data.map((student) => (
          <tr key={student.id} className="border-top">
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={student.image}
                  className="rounded-circle"
                  alt="avatar"
                  width="45"
                  height="45"
                />
                <div className="ms-3">
                  <h6 className="mb-0">{student.first_name} {student.last_name}</h6>
                  
                </div>
              </div>
            </td>
            <td>{student.class_name}</td>
            
            <td></td>
            <td><Button className="btn" color="info">
           More
          </Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  )
}

export default Student