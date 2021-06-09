package application.Repository;

import application.Model.SubclubComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SubclubCommentRepository extends CrudRepository<SubclubComment, Integer> {
    List<SubclubComment> findBySubclubId(Integer subclubId);
}
