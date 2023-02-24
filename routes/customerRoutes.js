import express from "express";
const router = express.Router();

import {
  addNewCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  showStats,
  getDate,
  getInfo,
  getInfo1,
  getRecords,
  getCustomerReceipt
} from "../controllers/customerController.js";

router.route("/").post(addNewCustomer).get(getAllCustomer);

router.get("/sales", async (req, res, next) => {
  try {
    const { dTo, dFrom, dGte, status, id } = req.query;
    // Status are one of pending, ongoing and completed
    const lDate = await getDate({ dTo, dFrom, dGte, status, id });

    const groupedData = lDate.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          date: curr.date,
          price: curr.price,
          count: 1,
          brand: {},
        };
      } else {
        acc[curr.date].price += curr.price;
        acc[curr.date].count++;
      }

      if (!acc[curr.date].brand[curr.brand]) {
        acc[curr.date].brand[curr.brand] = 1;
      } else {
        acc[curr.date].brand[curr.brand]++;
      }
      return acc;
    }, {});

    const finalData = Object.values(groupedData).map((dateData) => {
      let maxBrand = "";
      let maxBrandCount = 0;
      for (let brand in dateData.brand) {
        if (dateData.brand[brand] > maxBrandCount) {
          maxBrand = brand;
          maxBrandCount = dateData.brand[brand];
        }
      }
      return {
        date: dateData.date,
        price: dateData.price,
        count: dateData.count,
        brand: maxBrand,
      };
    });
    finalData.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(finalData);
  } catch (err) {
    console.log(rtt);
  }
});

router.get("/info", async (req, res, next) => {
  try {
    const { dFrom, dTo, status, id } = req.query;
    const infoResponse = await getInfo({ dFrom, dTo, status, id });
    res.json(infoResponse);
  } catch (err) {
    console.log(err);
  }
});

router.get("/info1", async (req, res, next) => {
  try {
    const { dFrom, dTo, status, id } = req.query;
    const infoResponse1 = await getInfo1({ dFrom, dTo, status, id });
    res.json(infoResponse1);
  } catch (err) {
    console.log(err);
  }
});
router.route("/customerReceipt").get(getCustomerReceipt);
router.route("/records").get(getRecords);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteCustomer).patch(updateCustomer);

export default router;
