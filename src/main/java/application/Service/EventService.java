package application.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import application.Model.Event;
import application.Model.SubClub;
import application.Repository.EventRepository;
import application.Repository.SubClubRepository;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class EventService {

	@Autowired
	EventRepository eventRepository;
	@Autowired
	SubClubRepository subclubRepository;

    Connection conn = null;

	
	public String addEvent(Event event, Integer subclubId) {
		
		SubClub subclub = subclubRepository.findById(subclubId).get();
		event.setSubclub(subclub);
		
		eventRepository.save(event);

        setConnection();
		
		
        try{
            String setEvent = "Select finish_time into @b from lovelace.events where id =" + event.getId()+";";
            String setDrop="DROP EVENT IF EXISTS lovelace.events_event"+event.getId()+";";
            String createEvent="CREATE EVENT lovelace.events_event" +event.getId()+" ON SCHEDULE AT @b DO delete from lovelace.events where id="+event.getId();

            Statement stmt2 = conn.createStatement();
            boolean setEventBool = stmt2.execute(setEvent);
            boolean setDropBool = stmt2.execute(setDrop);

            boolean setCreateEventBool = stmt2.execute(createEvent);
        }catch (Exception d){
            return d.getMessage();
        }
		
		return ""+event.getId();
		
	}
	
	public Iterable<Event> getEvents(Integer subclubId) {
		
		SubClub subclub = subclubRepository.findById(subclubId).get();
		Iterable<Event> events = eventRepository.findAllBySubclub(subclub);
		
		return events;
	}
    private void setConnection() {
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/lovelace?useSSL=false&allowPublicKeyRetrieval=true" + "&user=root&password=98ebru87");
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
    
    }
	


	
	
	
	
}
