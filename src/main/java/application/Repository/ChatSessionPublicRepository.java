package application.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import application.Model.ChatSessionPublic;
import application.Model.SubClub;

public interface ChatSessionPublicRepository extends CrudRepository<ChatSessionPublic, Integer> {

	ChatSessionPublic findBySubClub(Optional<SubClub> s);

}
