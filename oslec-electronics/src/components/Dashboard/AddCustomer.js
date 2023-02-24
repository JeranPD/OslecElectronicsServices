import { FormRow, Alert } from "../../components/Index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRowSelect from "../FormRowSelect";
import { useEffect } from "react";

const AddCustomer = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    trackingNumber,
    lastName,
    firstName,
    product,
    serialNumber,
    brand,
    replacedParts,
    fixingparts,
    description,
    estimate,
    statusOptions,
    status,
    address,
    price,
    handleChange,
    clearValues,
    createCustomer,
    editCustomer,
    warrantyStartAt,
    warrantyEndAt,
    paymentStatusOptions,
    paymentStatus
  } = useAppContext();
  
  useEffect(() => {
    document.title = "Add Customer";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !trackingNumber ||
      !lastName ||
      !firstName ||
      !product ||
      !serialNumber ||
      !brand ||
      !fixingparts ||
      !estimate ||
      !address ||
      !price
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editCustomer();
      return;
    }
    createCustomer();
  };

  const handleCustomerInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

 

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Update Customer" : "Add Customer"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="tracking number"
            name="trackingNumber"
            value={trackingNumber}
            handleChange={handleCustomerInput}
          />
          
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="first name"
            name="firstName"
            value={firstName}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="product"
            value={product}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="Serial Number"
            name="serialNumber"
            value={serialNumber}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            name="brand"
            value={brand}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="Replacement Parts"
            name="replacedParts"
            value={replacedParts}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="Fixing Parts"
            name="fixingparts"
            value={fixingparts}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="text"
            labelText="description"
            name="description"
            value={description}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="address"
            value={address}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="estimate"
            value={estimate}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            name="price"
            value={price}
            handleChange={handleCustomerInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleCustomerInput}
            list={statusOptions}
          />

          <FormRowSelect
            name="paymentStatus"
            value={paymentStatus}
            handleChange={handleCustomerInput}
            list={paymentStatusOptions}
          />

          <FormRow
            type="date"
            labelText="warranty Start At"
            name="warrantyStartAt"
            value={warrantyStartAt}
            handleChange={handleCustomerInput}
          />

          <FormRow
            type="date"
            labelText="warranty End At"
            name="warrantyEndAt"
            value={warrantyEndAt}
            handleChange={handleCustomerInput}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Update" : "Add Customer"}
            </button>
          </div>
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddCustomer;
