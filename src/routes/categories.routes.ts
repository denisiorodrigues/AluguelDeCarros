import { Router } from "express";

import { Category } from "../models/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.get("/all", (request, response) => {
    return response.json(categories);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const category = new Category();

    Object.assign(category, {
        name,
        description,
        create_at: new Date(),
    });

    categories.push(category);

    return response.status(201).json(category);
});

export { categoriesRoutes };
