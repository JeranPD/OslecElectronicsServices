import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/CustomersContainer";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { style } from "../assets/css/Analytics.js";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
const ReceiptContainer = () => {
  const {
    customerReceipt,
    getCustomerReceipt,
    isLoading,
    searchLastNameReceipt,
    searchFirstNameReceipt,
  } = useAppContext();

  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
    documentTitle: "Oslec Electronics Customer Receipt",
  });

  
  useEffect(() => {
    getCustomerReceipt();
  }, [searchLastNameReceipt, searchFirstNameReceipt]);

 
  if (isLoading) {
    return <Loading center />;
  }
  let colorGreen;
  let green;

  let statusColor;
  let statusColorGreen;
  const align = {textAlign: 'center'}

  if (customerReceipt.length === 0) {
    return (
      <Wrapper>
        <h2>No Customers Display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {customerReceipt.map((record, index) => {
        if(record.lastName.toLowerCase() === searchLastNameReceipt.toLowerCase() || record.firstName.toLowerCase() === searchFirstNameReceipt.toLowerCase()) {
          if(record.status === 'completed'){
            statusColor = '#d1e7dd'
            statusColorGreen = '#008000'
          } else{
            statusColor = '#ffc107'
            statusColorGreen = '#ffc107'
          }
          if(record.paymentStatus === 'paid'){
            colorGreen = '#d1e7dd'
            green = '#008000'
          } else{
            colorGreen = '#ffc107'
            green = '#ffc107'
          }
          return (
            <MDBContainer className="py-5" >
            <MDBCard className="p-4">
              <MDBCardBody ref={refPrint}>
                <h2 style={align}><span className="os-color">Os</span>lec Electronics Services</h2>
                <h3>Customer Receipt</h3>
                <MDBRow>
                  <MDBCol xl="8">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        Customer: <span style={{ color: "#5d9fc5" }}>{`${record.firstName} ${record.lastName}`}</span>
                      </li>
                      <li className="text-muted">{`${record.address}`}</li>
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol xl="4">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                        <span className="fw-bold ms-1">Transaction Date: </span>{moment(record.createdAt).format("MM/DD/YYYY")}
                      </li>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: green }} />
                        <span className="fw-bold ms-1">Payment Status:</span>
                        <span className="badge text-black fw-bold ms-1" style={{ backgroundColor: colorGreen }}>
                          {record.paymentStatus} 
                        </span>
                      </li>
                      <li className="text-muted">
                        <MDBIcon fas icon="circle" style={{ color: statusColorGreen }} />
                        <span className="fw-bold ms-1">Status:</span>
                        <span className="badge text-black fw-bold ms-1" style={{ backgroundColor: statusColor }}>
                          {record.status}
                        </span>
                      </li>
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-2 mx-1 justify-content-center">
                  <MDBTable striped borderless>
                    <MDBTableHead
                      // className="text-white"
                      style={{ backgroundColor: "#ff585f", color: "#050a3" }}
                    >
                      <tr>
                        <th scope="col">Data Name</th>
                        <th scope="col">Data</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    <tr>
                        <td>Tracking Number:</td>
                        <td>{record.trackingNumber}</td>
                      </tr>
                      <tr>
                        <td>Product:</td>
                        <td>{record.product}</td>
                      </tr>
                      <tr>
                        <td>Brand:</td>
                        <td>{record.brand}</td>
                      </tr>
                      <tr>
                        <td>Serial Number:</td>
                        <td>{record.serialNumber}</td>
                      </tr>
                      <tr>
                        <td>Replacement Parts:</td>
                        <td>{record.replacedParts}</td>
                      </tr>
                      <tr>
                        <td>Fixing Parts:</td>
                        <td>{record.fixingparts}</td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td>{record.description}</td>
                      </tr>
                      <tr>
                        <td>Estimate:</td>
                        <td>{record.estimate}</td>
                      </tr>
                      <tr>
                        <td>Warranty Start At:</td>
                        <td>{record.warrantyStartAt}</td>
                      </tr>
                      <tr>
                        <td>Warranty End At:</td>
                        <td>{record.warrantyEndAt}</td>
                      </tr>
                      
                    </MDBTableBody>
                  </MDBTable>
                </MDBRow>
                <MDBRow>
                  <MDBCol xl="8">
                    <p className="ms-3">
                      Thank you for your purchase
                    </p>
                  </MDBCol>
                  <MDBCol xl="3">
                    <p className="text-black float-start">
                      <span className="text-black me-3"> Total Amount</span>
                      <span style={{ fontSize: "25px" }}>₱ {record.price}</span>
                    </p>
                  </MDBCol>
                </MDBRow>
                <hr />
                
              </MDBCardBody>
            </MDBCard>
            <MDBCard>
              <MDBCardBody className="my-2 mx-1 justify-content-center">
                <button className="btn" style={style.chartConf} onClick={handlePrint}>
                      Print
                </button>
                </MDBCardBody>
            </MDBCard>
            
          </MDBContainer>
            );
          } 
          
        })} 
    
      
    </Wrapper>
  );
};

export default ReceiptContainer;
