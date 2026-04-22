import Brand from "../models/brandModel";

async function createBrandInDB(brandData: { name: string; imageUrl: string }) {
  try {
    return await Brand.create(brandData);
  } catch {
    throw new Error("Error creating brand in the database");
  }
}

async function getAllBrandsFromDB() {
  try {
    return await Brand.findAll();
  } catch {
    throw new Error("Error fetching brands from the database");
  }
}

async function getBrandByIdFromDB(brandId: number) {
  try {
    return await Brand.findByPk(brandId);
  } catch {
    throw new Error("Error fetching brand by ID from the database");
  }
}

async function updateBrandInDB(
  brandId: number,
  updatedBrandData: Partial<{ name: string; imageUrl: string }>
) {
  try {
    const [updatedRowsCount] = await Brand.update(updatedBrandData, {
      where: { id: brandId },
    });
    if (updatedRowsCount === 0) {
      throw new Error("Brand not found");
    }
    return await getBrandByIdFromDB(brandId);
  } catch {
    throw new Error("Error editing brand in the database");
  }
}

async function deleteBrandInDB(brandId: number) {
  try {
    return await Brand.destroy({ where: { id: brandId } });
  } catch {
    throw new Error("Error deleting brand in the database");
  }
}

export {
  createBrandInDB,
  getAllBrandsFromDB,
  getBrandByIdFromDB,
  updateBrandInDB,
  deleteBrandInDB,
};

