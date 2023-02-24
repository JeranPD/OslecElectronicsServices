import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/CustomersContainer";
import PageRecordsContainer from "./PageRecordsContainer.js";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
import moment from "moment";
const RecordsContainer = () => {
  const {
    records,
    totalRecords,
    numofRecords,
    recordsPage,
    getRecords,
    isLoading,
    sort,
    searchLastName,
    searchFirstName,
  } = useAppContext();
  const componentRef = useRef();

  
  useEffect(() => {
    getRecords();
  }, [recordsPage, searchLastName, searchFirstName, sort]);

 
  if (isLoading) {
    return <Loading center />;
  }

  if (totalRecords === 0) {
    return (
      <Wrapper>
        <h2>No Customers Records Found</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {searchLastName ? `${searchLastName} ${searchFirstName} Records Found` : totalRecords + ' Completed found'} 
      </h5>
      
      <div className="table-body" ref={componentRef}  style={{overflowX : 'auto', fontSize: '14px'}}>
        
            <table className="table table-striped table-bordered table-responsive">
              <thead style={{ fontSize: 13 }}>
                <tr>
                  <th>TRACKING NUMBER</th>
                  <th>LAST NAME</th>
                  <th>FIRST NAME</th>
                  <th>PRODUCT</th>
                  <th>SERIAL NO.</th>
                  <th>BRAND</th>
                  <th>REPLACEMENT PARTS</th>
                  <th>FIXING PARTS</th>
                  <th>DESCRIPTION</th>
                  <th>ESTIMATE</th>
                  <th>STATUS</th>
                  <th>ADDRESS</th>
                  <th>PRICE</th>
                  <th>PAYMENT STATUS</th>
                  <th>WARRANTY START AT</th>
                  <th>WARRANTY END AT</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 13 }}>
              {records.map((record, index) => {
                  return (
                      <tr key={index}>
                        <td>{record.trackingNumber}</td>
                        <td>{record.lastName}</td>
                        <td>{record.firstName}</td>
                        <td>{record.product}</td>
                        <td>{record.serialNumber}</td>
                        <td>{record.brand}</td>
                        <td>{record.replacedParts}</td>
                        <td>{record.fixingparts}</td>
                        <td>{record.description}</td>
                        <td>{record.estimate}</td>
                        <td>{record.status}</td>
                        <td>{record.address}</td>
                        <td>{record.price}</td>
                        <td>{record.paymentStatus}</td>
                        <td>{record.warrantyStartAt}</td>
                        <td>{record.warrantyEndAt}</td>
                        <td>{moment(record.createdAt).format("MM/DD/YYYY")}</td>
                      </tr>
                    );
                
                })}
            </tbody>
            </table>
      </div>
    
      <div className="footer-section">
        {numofRecords > 1 && <PageRecordsContainer />}
      </div>
    </Wrapper>
  );
};

export default RecordsContainer;
