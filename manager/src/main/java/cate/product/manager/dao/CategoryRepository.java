package cate.product.manager.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import cate.product.manager.entitie.Category;

import java.util.List;

@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Integer> {
   @Query("select c from Category c order by c.idCat desc")
    List<Category> getCategories();
}
