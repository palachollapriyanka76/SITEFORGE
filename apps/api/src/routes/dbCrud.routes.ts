import { Router, Request, Response, NextFunction } from "express";
import { prisma, DatabaseService } from "@siteforge/database";

const router = Router();
const dbService = new DatabaseService(prisma);

// Utility for handling pagination and query options
const getPagination = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  return { skip, take: limit };
};

// ==========================================
// 1. BUSINESS CATEGORIES
// ==========================================
router.get("/categories", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const parentOnly = req.query.parents === "true";
    
    let categories;
    let total;

    if (parentOnly) {
      categories = await dbService.categories.findRoots();
      total = await dbService.categories.count({ parentId: null });
    } else {
      categories = await dbService.categories.findMany({ skip, take });
      total = await dbService.categories.count();
    }

    res.json({ success: true, data: categories, pagination: { total, take, skip } });
  } catch (error) {
    next(error);
  }
});

router.post("/categories", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await dbService.categories.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.put("/categories/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await dbService.categories.update(req.params.id as string, req.body);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.delete("/categories/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.categories.softDelete(req.params.id as string);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 2. TEMPLATES
// ==========================================
router.get("/templates", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const { search, categoryId } = req.query;

    let templates;
    if (search || categoryId) {
      templates = await dbService.templates.searchTemplates(
        (search as string) || "",
        (categoryId as string) || "",
        take
      );
    } else {
      templates = await dbService.templates.findMany({ skip, take });
    }

    const total = await dbService.templates.count();
    res.json({ success: true, data: templates, pagination: { total, take, skip } });
  } catch (error) {
    next(error);
  }
});

router.post("/templates", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const template = await dbService.templates.create(req.body);
    res.status(201).json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
});

router.put("/templates/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const template = await dbService.templates.update(req.params.id as string, req.body);
    res.json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
});

router.delete("/templates/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.templates.softDelete(req.params.id as string);
    res.json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. IMAGES
// ==========================================
router.get("/images", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { take } = getPagination(req);
    const { query, categoryId, section, aspectRatio } = req.query;
    
    const images = await dbService.images.searchImages({
      query: query as string,
      categoryId: categoryId as string,
      section: section as string,
      aspectRatio: aspectRatio as string,
      limit: take,
    });
    
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
});

router.post("/images", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = await dbService.images.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
});

router.put("/images/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = await dbService.images.update(req.params.id as string, req.body);
    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
});

router.delete("/images/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.images.softDelete(req.params.id as string);
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 4. PRODUCTS
// ==========================================
router.get("/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const { businessId, sku } = req.query;

    if (sku) {
      const product = await dbService.products.findBySku(sku as string);
      return res.json({ success: true, data: product ? [product] : [] });
    }

    if (businessId) {
      const products = await dbService.products.findByBusiness(businessId as string, take, skip);
      return res.json({ success: true, data: products });
    }

    const products = await dbService.products.findMany({ skip, take });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
});

router.post("/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await dbService.products.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.put("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await dbService.products.update(req.params.id as string, req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.products.softDelete(req.params.id as string);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 5. SERVICES
// ==========================================
router.get("/services", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const { businessId } = req.query;

    if (businessId) {
      const services = await dbService.services.findByBusiness(businessId as string, take, skip);
      return res.json({ success: true, data: services });
    }

    const services = await dbService.services.findMany({ skip, take });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
});

router.post("/services", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await dbService.services.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

router.put("/services/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await dbService.services.update(req.params.id as string, req.body);
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

router.delete("/services/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.services.softDelete(req.params.id as string);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 6. THEMES
// ==========================================
router.get("/themes", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const themes = await dbService.themes.findMany({ skip, take });
    res.json({ success: true, data: themes });
  } catch (error) {
    next(error);
  }
});

router.post("/themes", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const theme = await dbService.themes.create(req.body);
    res.status(201).json({ success: true, data: theme });
  } catch (error) {
    next(error);
  }
});

router.put("/themes/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const theme = await dbService.themes.update(req.params.id as string, req.body);
    res.json({ success: true, data: theme });
  } catch (error) {
    next(error);
  }
});

router.delete("/themes/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.themes.softDelete(req.params.id as string);
    res.json({ success: true, message: "Theme deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 7. LAYOUTS
// ==========================================
router.get("/layouts", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const layouts = await dbService.layouts.findMany({ skip, take });
    res.json({ success: true, data: layouts });
  } catch (error) {
    next(error);
  }
});

router.post("/layouts", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const layout = await dbService.layouts.create(req.body);
    res.status(201).json({ success: true, data: layout });
  } catch (error) {
    next(error);
  }
});

router.put("/layouts/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const layout = await dbService.layouts.update(req.params.id as string, req.body);
    res.json({ success: true, data: layout });
  } catch (error) {
    next(error);
  }
});

router.delete("/layouts/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.layouts.softDelete(req.params.id as string);
    res.json({ success: true, message: "Layout deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 8. TEMPLATE SECTIONS
// ==========================================
router.get("/sections", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skip, take } = getPagination(req);
    const sections = await dbService.sections.findMany({ skip, take });
    res.json({ success: true, data: sections });
  } catch (error) {
    next(error);
  }
});

router.post("/sections", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = await dbService.sections.create(req.body);
    res.status(201).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
});

router.put("/sections/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const section = await dbService.sections.update(req.params.id as string, req.body);
    res.json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
});

router.delete("/sections/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbService.sections.softDelete(req.params.id as string);
    res.json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 9. INSTANT AI-FREE GENERATION & KNOWLEDGE PROFILE
// ==========================================
router.get("/categories/:id/profile", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await dbService.categories.findFullProfile(req.params.id as string);
    if (!profile) {
      return res.status(404).json({ success: false, error: "Category profile not found" });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
});

router.post("/generate-instant", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, businessId, categoryId } = req.body;
    if (!name || !businessId || !categoryId) {
      return res.status(400).json({ success: false, error: "Missing required fields: name, businessId, categoryId" });
    }
    const website = await dbService.generateInstantWebsite({ name, businessId, categoryId });
    res.status(201).json({ success: true, data: website });
  } catch (error) {
    next(error);
  }
});

export default router;
