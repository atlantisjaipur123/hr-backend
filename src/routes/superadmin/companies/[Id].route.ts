// src/routes/superadmin/companies/[id].route.ts
import { Router, Request, Response } from "express";
import prisma from "../../../lib/prisma.js";
import {
  requireAuth,
  requireSuperAdmin,
} from "../../../middleware/auth.middleware.js";

// You *can* keep mergeParams: true if your loader uses nested routers,
// but it's also safe to just use Router().
// Keeping it here is fine and won't cause the "argument handler must be a function" error.
const router = Router({ mergeParams: true });

router.use(requireAuth);
router.use(requireSuperAdmin);

// -----------------------------------------------------------------------------
// GET /api/v1/superadmin/companies/:id  →  Get single company
// -----------------------------------------------------------------------------
router.get("/", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: { admin: true },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found",
      });
    }

    return res.json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get company error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while fetching company",
    });
  }
});

// -----------------------------------------------------------------------------
// PATCH /api/v1/superadmin/companies/:id  →  Update company
// -----------------------------------------------------------------------------
router.patch("/", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updated = await prisma.company.update({
      where: { id },
      data: req.body,
    });

    return res.json({
      success: true,
      message: "Company updated successfully",
      company: updated,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while updating company",
    });
  }
});

// -----------------------------------------------------------------------------
// DELETE /api/v1/superadmin/companies/:id  →  Soft delete company
// -----------------------------------------------------------------------------
router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.company.update({
      where: { id },
      data: { deletedAt: new Date() }, // soft delete
    });

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Delete company error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while deleting company",
    });
  }
});

export default router;
