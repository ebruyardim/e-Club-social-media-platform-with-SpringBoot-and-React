package application.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import application.Model.ChatRoomPrivate;
import application.Model.MessagePrivate;

public interface MessagePrivateRepository extends JpaRepository<MessagePrivate, Integer> {

	List<MessagePrivate> findAllByChatRoom(ChatRoomPrivate chatRoom);

}
