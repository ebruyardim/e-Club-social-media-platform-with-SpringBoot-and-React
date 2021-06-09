package application.Repository;

import org.springframework.data.repository.CrudRepository;
import application.Model.Event;
import application.Model.SubClub;

public interface EventRepository extends CrudRepository<Event, Integer>{
	
	Iterable<Event> findAllBySubclub(SubClub subclub);


}
