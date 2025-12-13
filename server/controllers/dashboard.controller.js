import { Report } from "../models/Report.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        msg: "Month query parameter is required (YYYY-MM)",
      });
    }

    const stats = await Report.aggregate([
      {
        $match: { month },
      },
      {
        $group: {
          _id: null,
          totalNGOs: { $addToSet: "$ngoId" },
          totalPeopleHelped: { $sum: "$peopleHelped" },
          totalEventsConducted: { $sum: "$eventsConducted" },
          totalFundsUtilized: { $sum: "$fundsUtilized" },
        },
      },
      {
        $project: {
          _id: 0,
          totalNGOsReporting: { $size: "$totalNGOs" },
          totalPeopleHelped: 1,
          totalEventsConducted: 1,
          totalFundsUtilized: 1,
        },
      },
    ]);

    // If no data for the month
    if (stats.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No data found for this month",
        data: {
          totalNGOsReporting: 0,
          totalPeopleHelped: 0,
          totalEventsConducted: 0,
          totalFundsUtilized: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Dashboard data fetched successfully",
      data: stats[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
