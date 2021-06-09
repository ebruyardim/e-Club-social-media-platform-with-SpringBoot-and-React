package application.Repository;

import application.Model.PostComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostCommentRepository extends CrudRepository<PostComment,Integer> {
    List<PostComment> findByPostId(Integer postId);
}
