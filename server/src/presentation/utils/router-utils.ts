import { Response } from "express";

export class RouterUtils {
  static ok<T>(res: Response, data: T): Response {
    res.set("Cache-Control", "private, max-age=0");
    return res.status(200).json(data);
  }

  static okcache<T>(res: Response, data: T): Response {
    res.set("Cache-Control", "public, max-age=1209600"); // 2 semaines
    return res.status(200).json(data);
  }

  static created<T>(res: Response, data: T): Response {
    return res.status(201).json(data);
  }

  static notFound(res: Response): Response {
    return res.status(404).json({ error: "Not found" });
  }

  static badRequest(res: Response): Response {
    return res.status(400).json({ error: "Bad request" });
  }

  static forbidden(res: Response): Response {
    return res.status(403).json({ error: "Forbidden" });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static error(error: any, res: Response): Response {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
