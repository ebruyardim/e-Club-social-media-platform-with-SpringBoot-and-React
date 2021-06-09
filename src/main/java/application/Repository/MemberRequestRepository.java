package application.Repository;

import application.Model.MemberRequest;
import org.springframework.data.repository.CrudRepository;

public interface MemberRequestRepository extends CrudRepository<MemberRequest,Integer> {
}
