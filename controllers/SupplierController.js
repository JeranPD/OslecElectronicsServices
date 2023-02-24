import Supplier from "../models/Supplier.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";


const addNewSupplier = async (req, res) => {
    const {
        companyName,
        name,
        Address,
        contact,
        email,
        productOrder,
        quantity,
        productStatus,
        receivedAt,
        priced,
      } = req.body;
    
      if (
        !companyName ||
        !name ||
        !Address ||
        !contact ||
        !email ||
        !productOrder ||
        !quantity ||
        !productStatus ||
        !priced
      ) {
        throw new BadRequestError("Please provide all values");
      }
      req.body.createdBy = req.admin.id;
      const supplier = await Supplier.create(req.body);
      res.status(StatusCodes.CREATED).json({ supplier });
}

const getAllSupplier = async (req, res) => {
    const { searchSupplier, productStatus, sortSupplier } = req.query;
    const queryObject = {
        createdBy: req.admin.id,
    };

    if (productStatus && productStatus !== "all") {
        queryObject.productStatus = productStatus;
    }

    if (searchSupplier) {
        queryObject.companyName = { $regex: searchSupplier, $options: "i" };
    }

    let result = Supplier.find(queryObject);

    

    if (sortSupplier === "latest") {
        result = result.sort("-createdAt");
    }

    if (sortSupplier === "oldest") {
        result = result.sort("createdAt");
    }

    if (sortSupplier === "a-z") {
        result = result.sort("-companyName");
    }

    if (sortSupplier === "z-a") {
        result = result.sort("companyName");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    
    const suppliers = await result;

    const totalSupplier = await Supplier.countDocuments(queryObject);
    const numofSupplierPages = Math.ceil(totalSupplier / limit);

    res.status(StatusCodes.OK).json({ suppliers, totalSupplier, numofSupplierPages });
}

const updateSupplier = async (req, res) => {
    const { id: supplierId } = req.params;
    const {
        companyName,
        name,
        Address,
        contact,
        email,
        productOrder,
        quantity,
        productStatus,
        receivedAt,
        priced,
    } = req.body;

    if (
        !companyName ||
        !name ||
        !Address ||
        !contact ||
        !productOrder ||
        !quantity ||
        !productStatus ||
        !priced
    ) {
        throw new BadRequestError("Please provide all values");
    }

    const supplier = await Supplier.findOne({ _id: supplierId });

    if (!supplier) {
        throw new NotFoundError(`No Supplier with id : ${supplierId}`);
    }

    checkPermission(req.admin, supplier.createdBy);

    const updateSupplier = await Supplier.findOneAndUpdate(
        {
        _id: supplierId,
        },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ updateSupplier });
}

const deleteSupplier = async (req, res) => {
    const { id: supplierid } = req.params;

    const supplier = await Supplier.findOne({ _id: supplierid });

    if (!supplier) {
        throw new NotFoundError(`No supplier with id : ${supplierid}`);
    }

    checkPermission(req.admin, supplier.createdBy);

    await supplier.remove();
    res.status(StatusCodes.OK).json({ message: "Supplier deleted successfully" });
}

export {
    addNewSupplier,
    getAllSupplier,
    updateSupplier,
    deleteSupplier
  };