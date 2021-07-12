package cate.product.manager;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import cate.product.manager.dao.CategoryRepository;
import cate.product.manager.dao.ProductRepository;
import cate.product.manager.entitie.Category;
import cate.product.manager.entitie.Product;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class ManagerApplication {
	//http://localhost:2000/v2/api-docs
	//http://localhost:2000/swagger-ui.html
	public static void main(String[] args) {
		SpringApplication.run(ManagerApplication.class, args);
	}

	@Bean
	CommandLineRunner start(ProductRepository proDao, CategoryRepository cateDao,
			RepositoryRestConfiguration configuration) {

		return args -> {
			configuration.exposeIdsFor(Product.class);
			List<Category> categories = List.of(new Category(1, "pc hardware"), new Category(2, "home appliance"),
					new Category(3, "agriculture"), new Category(4, "medicine"), new Category(5, "network"));
			List<Product> products = List.of(new Product("pc", 6000, 70, 1), new Product("ram", 300, 400, 1),
					new Product("ssd", 1000, 10, 1), new Product("tv", 2500, 105, 2),
					new Product("washing machine", 12000, 150, 2));
			if (proDao.findAll().size() == 0) {
				categories.forEach(c -> {
					s.log("**********************************************************************");
					s.log("PRODUCT Design= " + c.getDesignCat());
					cateDao.save(c);
				});
				products.forEach(p -> {
					s.log("**********************************************************************");
					s.log("PRODUCT Design= " + p.getDesign());
					s.log("PRODUCT Amount= " + p.getAmount());
					s.log("PRODUCT Price= " + p.getPrice());
					proDao.save(p);
				});
			}

		};

	}
}


