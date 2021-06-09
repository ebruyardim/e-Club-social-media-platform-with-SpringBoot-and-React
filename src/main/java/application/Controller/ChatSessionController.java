package application.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import application.Model.ChatSessionPublic;
import application.Model.Message;
import application.Model.SubClub;
import application.Repository.ChatSessionPublicRepository;
import application.Repository.SubClubRepository;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class ChatSessionController{
	
	@Autowired
	private SubClubRepository subclubRepo;
	@Autowired
	private ChatSessionPublicRepository chatSessionRepo;
	
	@GetMapping("/getChatId/{subclubId}")
	public @ResponseBody Integer findChatSessionId(@PathVariable("subclubId") int subclubId) {
		
		Optional<SubClub> s = subclubRepo.findById(subclubId);
		ChatSessionPublic chat = chatSessionRepo.findBySubClub(s);

		return chat.getId();
	}
	
}