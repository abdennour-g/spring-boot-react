package cate.product.manager.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import cate.product.manager.entitie.Product;

import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("select p from Product p order by p.idProd desc")
    List<Product> getPoducts();
    @Query("select p from Product p where p.idCat=:id order by p.idProd desc")
    List<Product> getPoducts(@Param( "id" ) Integer id);
}
