import { useAppContext } from "../context/appContext.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Customer from "./Customer";
import Wrapper from "../assets/wrappers/CustomersContainer";
import PageBtnContainer from "./PageBtnContainer.js";
import React, { useRef } from "react";
import "../assets/css/AllCustomers.css";
const CustomerContainer = () => {
  const {
    getCustomers,
    customers,
    isLoading,
    page,
    totalCustomer,
    search,
    searchStatus,
    sort,
    numofPages,
  } = useAppContext();
  const componentRef = useRef();

  
  useEffect(() => {
    getCustomers();
  }, [page, search, searchStatus, sort]);

 
  if (isLoading) {
    return <Loading center />;
  }

  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No Customers Display</h2>
      </Wrapper>
    );
  }

  let isTrue;

  return (
    <Wrapper>
      <h5>
        {totalCustomer} Customer{customers.length > 1 && "s"} found
      </h5>
      <div className="customer" ref={componentRef}>
        {customers.map((customer) => {
          if(customer.status === "completed"){
            isTrue = true
          } else if(customer.status !== "completed"){
            isTrue = false
          }
            return <Customer key={customer._id} {...customer} isTrue={isTrue}  />;
        })}
      </div>
      <div className="footer-section">
        
        {numofPages >= 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  );
};

export default CustomerContainer;
