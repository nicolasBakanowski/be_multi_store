import { Request, Response } from "express";
import {
  createBrandService,
  deleteBrandService,
  getAllBrandsService,
  updateBrandService,
} from "../services/brandService";
import {
  entityImagePublicUrl,
  deleteEntityImageFolder,
  saveEntityImageFromBuffer,
} from "../helpers/imageService";

async function createBrandController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Brand image is required" });
    }

    const newBrand = await createBrandService(name, "pending");

    await saveEntityImageFromBuffer({
      entityType: "brand",
      entityId: newBrand.id,
      buffer: req.file.buffer,
    });
    const imageUrl = entityImagePublicUrl(req, "brand", newBrand.id);
    const updatedBrand = await updateBrandService(newBrand.id, { imageUrl });

    return res.status(201).json(updatedBrand);
  } catch {
    return res.status(500).json({ error: "Error creating brand" });
  }
}

async function getAllBrandsController(_req: Request, res: Response) {
  try {
    const brands = await getAllBrandsService();
    const formatted = brands.map((b) => ({
      id: b.id,
      name: b.name,
      imageUrl: b.imageUrl,
    }));
    return res.status(200).json(formatted);
  } catch {
    return res.status(500).json({ error: "Error fetching brands" });
  }
}

async function editBrandController(req: Request, res: Response) {
  try {
    const brandId = parseInt(req.params.id, 10);
    if (!brandId) {
      return res.status(400).json({ error: "Invalid brand ID" });
    }

    const updatedBrand = await updateBrandService(brandId, {
      name: req.body?.name,
    });

    if (req.file?.buffer) {
      await saveEntityImageFromBuffer({
        entityType: "brand",
        entityId: brandId,
        buffer: req.file.buffer,
      });
      const imageUrl = entityImagePublicUrl(req, "brand", brandId);
      await updateBrandService(brandId, { imageUrl });
    }

    if (!updatedBrand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    return res.status(200).json(updatedBrand);
  } catch {
    return res.status(500).json({ error: "Error editing brand" });
  }
}

async function deleteBrandController(req: Request, res: Response) {
  try {
    const brandId = parseInt(req.params.id, 10);
    const deleted = await deleteBrandService(brandId);
    if (!deleted) {
      return res.status(404).json({ error: "Brand not found" });
    }
    await deleteEntityImageFolder({ entityType: "brand", entityId: brandId });
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Error deleting brand" });
  }
}

export {
  createBrandController,
  getAllBrandsController,
  editBrandController,
  deleteBrandController,
};

