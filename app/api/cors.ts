import type { NextApiRequest, NextApiResponse } from "next";

// Fungsi untuk menangani CORS
const allowCors = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Ganti "*" dengan domain spesifik jika perlu
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return handler(req, res);
};

// Handler API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "CORS bekerja di mobile dan desktop!" });
};

// Bungkus handler dengan middleware CORS
export default allowCors(handler);
