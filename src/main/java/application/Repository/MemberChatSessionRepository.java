package application.Repository;

import org.springframework.data.repository.CrudRepository;
import application.Model.MemberChatSession;

public interface MemberChatSessionRepository extends CrudRepository<MemberChatSession, Integer> {

}
