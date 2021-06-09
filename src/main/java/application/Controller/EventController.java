package application.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import application.Model.Event;
import application.Service.EventService;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class EventController {

	@Autowired
	private EventService eventService;
	
    @PostMapping(path = "/addEvent/{subclubId}")
    public @ResponseBody String addEvent(@PathVariable(value = "subclubId") Integer subclubId, @RequestBody Event event){
        return eventService.addEvent(event,subclubId);
    }
    
    
    @GetMapping(path = "/getEvents/{subclubId}")
    public @ResponseBody Iterable<Event> getEvents(@PathVariable(value = "subclubId") Integer subclubId){
        return eventService.getEvents(subclubId);
    }
    
    
}
