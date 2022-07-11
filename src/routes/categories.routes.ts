import { Router } from "express";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.get("/categories/all", (request, response) => {
    return response.json(categories);
});

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    categories.push({
        name,
        description,
    });

    return response.status(201).send();
});

export { categoriesRoutes };
