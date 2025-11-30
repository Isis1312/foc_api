import { AreaServices} from "../servicios/areas.servicios .js";

export class AreaController {
  constructor() { }

  getAll = async (req, res) => {
    const { message, status, data } = await AreaController.getAll();

    return res.status(status).json({
      message,
      data
    });
  };

  getOne = async (req, res) => {
    const { id } = req.params;

    const { message, status, data } = await AreaController.getById(Number(id));

    return res.status(status).json({
      message,
      data
    });
  };

  created = async (req, res) => {
    const areaData = req.body;

    const { message, status, data } = await AreaController.create(areaData);

    return res.status(status).json({
      message,
      data
    });
  };

  updated = async (req, res) => {
    const { id } = req.params;
    const areaData = req.body;

    const { message, status, data } = await AreaController.update(Number(id), areaData);

    return res.status(status).json({
      message,
      data
    });
  };

  deleted = async (req, res) => {
    const { id } = req.params;

    const { message, status } = await AreaController.delete(Number(id));

    return res.status(status).json({
      message
    });
  };
}
