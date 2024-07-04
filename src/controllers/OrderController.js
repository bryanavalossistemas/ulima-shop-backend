import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Product from "../models/Product.js";
import { User } from "../models/User.js";
import { Op } from "sequelize";

class OrderController {
  static async createOrder(req, res) {
    console.log("first");
    try {
      const {
        firstDirection,
        secondDirection,
        district,
        city,
        country,
        subtotal,
        shippingAmount,
        tax,
        total,
        orderShippingMethodId,
        orderPaymentMethodId,
      } = req.body;
      if (
        !firstDirection ||
        !secondDirection ||
        !district ||
        !city ||
        !country ||
        !subtotal ||
        !shippingAmount ||
        !tax ||
        !total ||
        !orderShippingMethodId ||
        !orderPaymentMethodId
      ) {
        throw new Error();
      }
      const formated = {
        ...req.body,
        orderShippingMethodId: +orderShippingMethodId,
        orderPaymentMethodId: +orderPaymentMethodId,
        userId: req.user.id,
      };
      const order = await Order.create({ ...formated });
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: { model: User, as: "user" },
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrder(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderDetail,
            as: "orderDetails",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });
      if (!order) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateOrder(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const {
        firstDirection,
        secondDirection,
        district,
        city,
        country,
        status,
        lastFourNumbersPay,
        subtotal,
        shippingAmount,
        tax,
        total,
      } = req.body;
      if (
        !firstDirection ||
        !secondDirection ||
        !district ||
        !city ||
        !country ||
        !status ||
        !lastFourNumbersPay ||
        !subtotal ||
        !shippingAmount ||
        !tax ||
        !total
      ) {
        throw new Error();
      }
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json("Error");
      }
      await order.update(req.body);
      await order.save();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteOrder(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json("Error");
      }
      await order.destroy();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrdersByUserId(req, res) {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: OrderDetail,
            as: "orderDetails",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async cancelOrder(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json("Error");
      }
      order.status = "Cancelado";
      await order.save();
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrdersByCreatedAt(req, res) {
    try {
      const { createdAt } = req.query;
      if (!createdAt) {
        throw new Error();
      }
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.gte]: createdAt,
          },
        },
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default OrderController;
