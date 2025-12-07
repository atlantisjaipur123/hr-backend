// src/routes/superadmin/companies/index.route.ts
import { Router } from "express";
import prisma from "../../../lib/prisma.js";
import { requireAuth, requireSuperAdmin } from "../../../middleware/auth.middleware.js";
const router = Router();
router.use(requireAuth);
router.use(requireSuperAdmin);
// -----------------------------------------------------------------------------
// GET /api/v1/superadmin/companies  →  List companies
// -----------------------------------------------------------------------------
router.get("/", async (_req, res) => {
    try {
        const companies = await prisma.company.findMany({
            include: {
                authorizedPerson: true,
                _count: {
                    select: { employees: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return res.json({
            success: true,
            companies,
        });
    }
    catch (error) {
        console.error("Get companies error:", error);
        return res
            .status(500)
            .json({ success: false, error: "Unable to fetch companies" });
    }
});
// -----------------------------------------------------------------------------
// POST /api/v1/superadmin/companies  →  Create new company
// -----------------------------------------------------------------------------
router.post("/", async (req, res) => {
    try {
        const d = req.body;
        // 🔐 Basic validation for required fields (from Prisma model)
        if (!d.code && !d.name) {
            return res
                .status(400)
                .json({ success: false, error: "Company code or name is required" });
        }
        if (!d.pan) {
            return res
                .status(400)
                .json({ success: false, error: "PAN is required" });
        }
        if (!d.flat || !d.city || !d.state || !d.pin) {
            return res.status(400).json({
                success: false,
                error: "Address fields (flat, city, state, pin) are required",
            });
        }
        // ⚠ STATE must be like "RAJASTHAN", "MAHARASHTRA" (your enum values)
        // 1️⃣ Create Company
        const company = await prisma.company.create({
            data: {
                // Required + core
                code: d.code || `COMP-${Date.now().toString().slice(-6)}`,
                name: d.name || d.code || "Unnamed Company",
                status: "ACTIVE",
                visibility: "PRIVATE",
                flat: d.flat,
                road: d.road || null,
                city: d.city,
                state: d.state, // must match StateCode enum, e.g. "RAJASTHAN"
                pin: d.pin,
                pan: d.pan,
                // Optional contact
                stdCode: d.stdCode || null,
                phone: d.phone || null,
                email: d.email || null,
                website: d.website || null,
                // Service / nature / type
                serviceName: d.serviceName || null,
                natureOfCompany: d.natureOfCompany || null,
                typeOfCompany: d.typeOfCompany || "OTHERS",
                branchDivision: d.branchDivision || "MAIN",
                // Important dates
                startDate: d.startDate ? new Date(d.startDate) : null,
                endDate: d.endDate ? new Date(d.endDate) : null,
                dateOfStartingBusiness: d.dateOfStartingBusiness
                    ? new Date(d.dateOfStartingBusiness)
                    : null,
                // Statutory fields (all optional)
                cin: d.cin || null,
                tan: d.tan || null,
                gstin: d.gstin || null,
                pfRegionalOffice: d.pfRegionalOffice || null,
                pensionCoverageDate: d.pensionCoverageDate
                    ? new Date(d.pensionCoverageDate)
                    : null,
                esiLocalOffice: d.esiLocalOffice || null,
                ptoCircleNo: d.ptoCircleNo || null,
                pfCoverageDate: d.pfCoverageDate
                    ? new Date(d.pfCoverageDate)
                    : null,
                esiNumber: d.esiNumber || null,
                ptRegCert: d.ptRegCert || null,
                ptEnrCert: d.ptEnrCert || null,
                lwfRegNo: d.lwfRegNo || null,
                ddoCode: d.ddoCode || null,
                ddoRegNo: d.ddoRegNo || null,
                tanRegNo: d.tanRegNo || null,
                paoCode: d.paoCode || null,
                paoRegNo: d.paoRegNo || null,
                ain: d.ain || null,
                tdsCircle: d.tdsCircle || null,
                ministryName: d.ministryName || null,
                ministryIfOthers: d.ministryIfOthers || null,
                labourId: d.labourId || null,
                // The rest (leaveSetupType, defaultAttendance, etc.)
                // rely on Prisma defaults — no need to send unless UI controls them now.
            },
        });
        // 2️⃣ Create Authorized Person (if AP name provided)
        if (d.apName) {
            await prisma.authorizedPerson.create({
                data: {
                    companyId: company.id,
                    name: d.apName,
                    designation: d.apDesignation || "",
                    fatherName: d.apFatherName || null,
                    dob: d.apDob ? new Date(d.apDob) : null,
                    gender: d.apSex || "MALE",
                    premise: d.apPremise || null,
                    flat: d.apFlat || d.flat,
                    road: d.apRoad || d.road,
                    area: d.apArea || null,
                    city: d.apCity || d.city,
                    state: d.apState || d.state,
                    pin: d.apPin || d.pin,
                    pan: d.apPan || d.pan,
                    email: d.apEmail || d.email,
                    stdCode: d.apStdCode || null,
                    phone: d.apPhone || d.phone,
                },
            });
        }
        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            companyId: company.id,
            company,
        });
    }
    catch (error) {
        console.error("Create company error:", error);
        return res
            .status(500)
            .json({ success: false, error: "Server error while creating company" });
    }
});
export default router;
//# sourceMappingURL=index.route.js.map