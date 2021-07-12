package cate.product.manager.entitie;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Product implements Comparable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int idProd;
	@NonNull
	String design;
	@NonNull
	int amount;
	@NonNull
	double price;
	@NonNull
	@Column(name = "id_cat")
	int idCat;
	@ManyToOne
	@JoinColumn(name = "id_cat", nullable = false, insertable = false, updatable = false)
	Category category;

	@Override
	public int compareTo(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}

}
