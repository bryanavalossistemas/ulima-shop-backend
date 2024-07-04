import OrderDetail from "../models/OrderDetail.js";

class OrderDetailController {
  static async createOrderDetail(req, res) {
    try {
      const { quantity } = req.body;
      if (!quantity) {
        throw new Error();
      }
      const orderDetail = await OrderDetail.create(req.body);
      return res.status(201).json(orderDetail);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getAllOrderDetails(req, res) {
    try {
      const orderDetails = await OrderDetail.findAll();
      return res.status(200).json(orderDetails);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async getOrderDetail(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(404).json("Error");
      }
      return res.status(200).json(orderDetail);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async updateOrderDetail(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const { quantity } = req.body;
      if (!quantity) {
        throw new Error();
      }
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(404).json("Error");
      }
      await orderDetail.update(req.body);
      await orderDetail.save();
      return res.status(200).json(orderDetail);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }

  static async deleteOrderDetail(req, res) {
    try {
      const idParam = req.params.id;
      const id = Number(idParam);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        throw new Error();
      }
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(404).json("Error");
      }
      await orderDetail.destroy();
      return res.status(200).json(orderDetail);
    } catch (error) {
      return res.status(500).json("Error");
    }
  }
}

export default OrderDetailController;
