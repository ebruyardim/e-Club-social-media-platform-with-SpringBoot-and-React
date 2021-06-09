package application.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import application.Model.ChatSessionPublic;
import application.Model.Message;

public interface MessageRepository extends CrudRepository<Message,Integer>{

	List<Message> findAllByChatSession(Optional<ChatSessionPublic> chat);
	
}
