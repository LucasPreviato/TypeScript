import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";


const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository()



//import route inside server
categoriesRouters.post('/', (req, res) => {
  const { name, description } = req.body
  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: 'Category already exists' })
  }

  categoriesRepository.create({ name, description })

  return res.status(201).send();

})

categoriesRouters.get('/', (req, res) => {
  const all = categoriesRepository.list();
  return res.json(all);
})

export { categoriesRouters }