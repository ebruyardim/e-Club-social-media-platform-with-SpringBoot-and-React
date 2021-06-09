package application.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import application.Model.ChatRoomPrivate;

public interface ChatRoomPrivateRepository extends CrudRepository<ChatRoomPrivate, Integer>{

	List<ChatRoomPrivate> findByMember1Id(Integer member1Id);
	List<ChatRoomPrivate> findByMember2Id(Integer member2Id);

	List<ChatRoomPrivate> findByMember1IdAndMember2Id(Integer member1Id, Integer member2Id);
}
