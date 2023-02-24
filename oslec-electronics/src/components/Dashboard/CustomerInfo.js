import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { style } from "../../assets/css/Analytics.js";
import "../../assets/css/CustomerInfo.css";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { SearchContainerReceipt, ReceiptContainer } from "../../components/Index.js";

function CustomerInfo() {
  const [showPicker, setShowPicker] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // Data Status
  
  const [status, setStatus] = useState("");
  const onChangeStatus = ({ target }) => {
    const { value } = target;
    setStatus(value);
  };

  const ref = useRef(null);
  const onClickFilter = () => {
    setShowPicker(false);
    if(status === ""){
      return getCustomerData(state)
    }
    if(status !== ""){
      setStatus("")
      return getInfoData(state, status);
    }
    
  };
  
  const [info, setInfo] = useState();
  const getInfoData = async (appState, appStatus) => {
    try {
      const startDate = moment(appState[0].startDate).format("MM/DD/YYYY");
      const endDate = moment(appState[0].endDate).format("MM/DD/YYYY");
      const infoResponse = await fetch(
        `/api/v1/customer/info?dTo=${endDate}&dFrom=${startDate}&status=${appStatus}&id=${JSON.parse(localStorage.getItem('admin'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (infoResponse.ok) {
        const jsonInfo = await infoResponse.json();
        
        setInfo(jsonInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const [customer, setCustomer] = useState();
  const getCustomerData = async (appState) => {
    try {
      const startDate = moment(appState[0].startDate).format("MM/DD/YYYY");
      const endDate = moment(appState[0].endDate).format("MM/DD/YYYY");
      const infoResponse = await fetch(
        `/api/v1/customer/info1?dTo=${endDate}&dFrom=${startDate}&id=${JSON.parse(localStorage.getItem('admin'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (infoResponse.ok) {
        const jsonInfo = await infoResponse.json();
        setInfo(jsonInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };



  // Print
  const refPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
    documentTitle: "Oslec Electronics Customer Info",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowPicker]);

  useEffect(() => {
    document.title = "Generating Reports";
  }, []);
  const [showReceipt, setshowReceipt] = useState('')
  const [showPrintAll, setPrintAll] = useState('none')

  const buttonReceipt = () =>{
    setshowReceipt('block')
    setPrintAll('none')
  }

  const buttonPrintAll = () =>{
    setPrintAll('block')
    setshowReceipt('none')
  }

  return (
    <>
      <div style={style.buttonFilter}>
        <button className="btn" style={style.chartConf} onClick={buttonReceipt}>Print Receipt</button>
        <button className="btn" style={style.chartConf}onClick={buttonPrintAll}>Print All</button>
      </div>
      <div style={{display: showReceipt }}>
        <SearchContainerReceipt />
        <ReceiptContainer />
      </div>
      <div className="table-container" style={{display: showPrintAll }}>
        <div className="table-header-action">
          <button className="btn" style={style.chartConf} onClick={handlePrint}>
            Print
          </button>
          <button
            className="btn"
            style={style.chartConf}
            onClick={() => setShowPicker(!showPicker)}
          >
            select date
          </button>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                right: "10%",
                border: "1px solid black",
                zIndex: 1,
                visibility: showPicker ? "visible" : "hidden",
                backgroundColor: "white",
                boxShadow: "5px 10px #888888",
              }}
              ref={ref}
            >
              <DateRangePicker
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="vertical"
              />
              <div style={style.containerButton}>
                <div style={style.buttonC}>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      id="completed"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="completed" style={{ fontSize: 12 }}>
                      Completed
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="ongoing"
                      id="ongoing"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="ongoing" style={{ fontSize: 12 }}>
                      Ongoing
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      id="pending"
                      onChange={onChangeStatus}
                      style={{ margin: 5 }}
                    />
                    <label htmlFor="pending" style={{ fontSize: 12 }}>
                      Pending
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    style={style.btnCancel}
                    onClick={() => setShowPicker(false)}
                  >
                    Cancel
                  </button>
                  <button style={style.btnFilter} onClick={onClickFilter}>
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="table-body" ref={refPrint} style={{overflowX : 'auto',fontSize: '14px'}}>
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
              {info &&
                info.map((e) => {
                  return (
                    <tr>
                      <td>{e.trackingNumber}</td>
                      <td>{e.lastName}</td>
                      <td>{e.firstName}</td>
                      <td>{e.product}</td>
                      <td>{e.serialNumber}</td>
                      <td>{e.brand}</td>
                      <td>{e.replacedParts}</td>
                      <td>{e.fixingparts}</td>
                      <td>{e.description}</td>
                      <td>{e.estimate}</td>
                      <td>{e.status}</td>
                      <td>{e.address}</td>
                      <td>{e.price}</td>
                      <td>{e.paymentStatus}</td>
                      <td>{e.warrantyStartAt}</td>
                      <td>{e.warrantyEndAt}</td>
                      <td>{moment(e.createdAt).format("MM/DD/YYYY")}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
