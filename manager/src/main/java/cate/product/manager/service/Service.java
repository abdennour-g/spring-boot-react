package cate.product.manager.service;

import java.util.List;

import cate.product.manager.s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cate.product.manager.dao.CategoryRepository;
import cate.product.manager.dao.ProductRepository;
import cate.product.manager.entitie.Category;
import cate.product.manager.entitie.Product;

@RestController
@CrossOrigin("*")
public class Service {
	@Autowired
	private ProductRepository proDao;
	@Autowired
	private CategoryRepository cateDao;

	@GetMapping("/all_products")
	public List<Product> products() {
		return proDao.getPoducts();
	}

	//http://localhost:2000/all_products/1
	@GetMapping("/all_products/{id}")
	public List<Product> products(@PathVariable(value = "id") Integer id) {
			return id<1?proDao.getPoducts():proDao.getPoducts(id);
		}

	//http://localhost:2000/all_products
	@RequestMapping(value = "/newPro", method = RequestMethod.POST)
	public Product addProduct(@RequestBody Product Product0) {
		s.log(Product0+"");
		return proDao.save(Product0);
	}

	// http://localhost:2000/newPro
	@RequestMapping(value = "/updatePro/{id}", method = RequestMethod.PUT)
	public Product updateProduct(@PathVariable(value = "id") Integer id, @RequestBody Product Product0) {
		Product Product1 = proDao.findById(id).get();
		Product1.setDesign(Product0.getDesign());
		Product1.setAmount(Product0.getAmount());
		Product1.setPrice(Product0.getPrice());
		Product1.setIdCat(Product0.getIdCat());
		s.log(Product0+"");
		return proDao.save(Product0);
	}

	@RequestMapping(value = "/deletePro/{id}", method = RequestMethod.DELETE)
	public void delPro(@PathVariable(value = "id") Integer id) {
		proDao.deleteById(id);
	}

	// http://localhost:2000/newPro/1
	@GetMapping("/all_categories")
	public List<Category> categs() {
		return cateDao.getCategories();
	}
	// http://localhost:2000/all_categories

	@RequestMapping(value = "/newCat", method = RequestMethod.POST)
	public Category addCategory(@RequestBody Category Category0) {
		s.log(Category0+"");
		return cateDao.save(Category0);
	}

	// http://localhost:2000/newCat
	@RequestMapping(value = "/updateCat/{id}", method = RequestMethod.PUT)
	public Category updateCategory(@PathVariable(value = "id") Integer id, @RequestBody Category Category0) {
		Category Category1 = cateDao.findById(id).get();
		Category1.setDesignCat(Category0.getDesignCat());
		s.log(Category0+"");
		return cateDao.save(Category0);
	}

	@RequestMapping(value = "/deleteCat/{id}", method = RequestMethod.DELETE)
	public void delCat(@PathVariable(value = "id") Integer id) {
		proDao.findAll().stream().filter(x -> x.getIdCat() == id).sorted().forEach(p -> {
			proDao.deleteById(p.getIdProd());
		});
		cateDao.deleteById(id);
	}

}
