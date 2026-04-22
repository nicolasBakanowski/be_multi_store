import {
  createBrandInDB,
  deleteBrandInDB,
  getAllBrandsFromDB,
  getBrandByIdFromDB,
  updateBrandInDB,
} from "../repositories/brandRepository";

async function createBrandService(name: string, imageUrl: string) {
  try {
    return await createBrandInDB({ name, imageUrl });
  } catch {
    throw new Error("Error creating brand");
  }
}

async function getAllBrandsService() {
  try {
    return await getAllBrandsFromDB();
  } catch {
    throw new Error("Error fetching brands");
  }
}

async function getBrandByIdService(brandId: number) {
  try {
    return await getBrandByIdFromDB(brandId);
  } catch {
    throw new Error("Error fetching brand by ID");
  }
}

async function updateBrandService(
  brandId: number,
  updatedBrandData: Partial<{ name: string; imageUrl: string }>
) {
  try {
    return await updateBrandInDB(brandId, updatedBrandData);
  } catch {
    throw new Error("Error editing brand");
  }
}

async function deleteBrandService(brandId: number) {
  try {
    return await deleteBrandInDB(brandId);
  } catch {
    throw new Error("Error deleting brand");
  }
}

export {
  createBrandService,
  getAllBrandsService,
  getBrandByIdService,
  updateBrandService,
  deleteBrandService,
};

