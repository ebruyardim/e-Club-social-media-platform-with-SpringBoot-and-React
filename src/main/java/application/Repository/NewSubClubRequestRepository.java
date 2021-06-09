package application.Repository;

import application.Model.NewSubClubRequest;
import org.springframework.data.repository.CrudRepository;

public interface NewSubClubRequestRepository extends CrudRepository<NewSubClubRequest,Integer> {
    NewSubClubRequest findBySubclubName(String subclubName);
}
