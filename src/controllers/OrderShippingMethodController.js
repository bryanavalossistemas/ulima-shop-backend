import OrderShippingMethod from "../models/OrderShippingMethod.js";

class OrderShippingMethodController {
  static async createOrderShippingMethod(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new Error();
      }
      const orderShippingMethod = await OrderShippingMethod.create(req.body);
      return res.status(201).json(orderShippingMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllOrderShippingMethods(req, res) {
    try {
      const orderShippingMethods = await OrderShippingMethod.findAll();
      return res.status(200).json(orderShippingMethods);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrderShippingMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderShippingMethod = await OrderShippingMethod.findByPk(id);
      if (!orderShippingMethod) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(orderShippingMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateOrderShippingMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { name } = req.body;
      if (!name) {
        throw new Error();
      }
      const orderShippingMethod = await OrderShippingMethod.findByPk(id);
      if (!orderShippingMethod) {
        return res.status(404).json("Error");
      }
      await orderShippingMethod.update(req.body);
      await orderShippingMethod.save();
      return res.status(200).json(orderShippingMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteOrderShippingMethod(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderShippingMethod = await OrderShippingMethod.findByPk(id);
      if (!orderShippingMethod) {
        return res.status(404).json("Error");
      }
      await orderShippingMethod.destroy();
      return res.status(200).json(orderShippingMethod);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default OrderShippingMethodController;
