import { WarehausesServices } from "../servicios/warehauses.servicios.js";


export class WarehausesController {
  constructor() { }

  getAll = async (req, res) => {
    const { message, status, data } = await WarehausesServices.getAll();

    return res.status(status).json({
      message,
      data
    });
  };

  getOne = async (req, res) => {
    const { id } = req.params;

    const { message, status, data } = await WarehausesServices.getById(Number(id));

    return res.status(status).json({
      message,
      data
    });
  };

  created = async (req, res) => {
    const warehauseData = req.body;

    const { message, status, data } = await WarehausesServices.create(warehauseData);

    return res.status(status).json({
      message,
      data
    });
  };

  updated = async (req, res) => {
    const { id } = req.params;
    const warehauseData = req.body;

    const { message, status, data } = await WarehausesServices.update(Number(id), warehauseData);

    return res.status(status).json({
      message,
      data
    });
  };

  deleted = async (req, res) => {
    const { id } = req.params;

    const { message, status } = await WarehausesServices.delete(Number(id));

    return res.status(status).json({
      message
    });
  };
}
