const Supplier = require("../models/supplierModel");
const factory = require("./handelFactory");

exports.getSuppliers = factory.getAll(Supplier);

exports.getSupplier = factory.getOne(Supplier);

exports.createSupplier = factory.createOne(Supplier);

exports.updateSupplier = factory.updateOne(Supplier);

exports.deleteSupplier = factory.deleteOne(Supplier);
