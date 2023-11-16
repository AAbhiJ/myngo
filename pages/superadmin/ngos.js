import React from "react";

const ngos = () => {
  return (
    <>
      <style jsx>{``}</style>
      <div className="container-fluid">
        <div className="row p-3 row-gap-2">
          <div className="col-12 shadow rounded-4 p-3 box-d">
            <h2 className="h3">NGOS : </h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Registration Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>NGO1</th>
                  <th>9090909090</th>
                  <th>REG123123</th>
                  <th>ngo1@gmail.com</th>
                  <th>Pune</th>
                  <th>Not Verified</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ngos;
