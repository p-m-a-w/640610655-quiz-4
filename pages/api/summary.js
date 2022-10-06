export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
