"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.listProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const product_1 = require("../schema/product");
const not_found_1 = require("../exceptions/not-found");
const prisma = new client_1.PrismaClient();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    product_1.ProductSchema.parse(req.body);
    const product = yield prisma.product
        .create({
        data: Object.assign(Object.assign({}, req.body), { tags: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.tags.join("") }),
    })
        .catch((err) => {
        throw new bad_request_1.BadRequestException("Something went wrong while creating the products", root_1.ErrorCode.INTERNAL_EXCEPTION);
    });
    res.json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    if (product.tags) {
        product.tags = req.body.tags.join("");
    }
    //check if the product ID
    const existingProduct = yield prisma.product.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!existingProduct) {
        throw new not_found_1.NotfoundException("Please select a valid product", root_1.ErrorCode.INTERNAL_EXCEPTION);
    }
    const updateProduct = yield prisma.product.update({
        where: {
            id: +req.params.id,
        },
        data: product,
    });
    res.json(updateProduct);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteProduct = deleteProduct;
const listProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.listProducts = listProducts;
const getProductById = (req, res, next) => { };
exports.getProductById = getProductById;
