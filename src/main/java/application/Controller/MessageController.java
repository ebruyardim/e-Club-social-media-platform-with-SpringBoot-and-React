package application.Controller;

import java.util.List;
import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import application.Model.ChatSessionPublic;
import application.Model.Message;
import application.Repository.ChatSessionPublicRepository;
import application.Repository.MemberRepository;
import application.Repository.MessageRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class MessageController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	ChatSessionPublicRepository chatSessionRepository;
	@Autowired
	MessageRepository messageRepository;
	@Autowired
	MemberRepository memberRepository;
	
	

	@GetMapping("/getMessages/{chatId}")
	public @ResponseBody List<Message> getMessages(@PathVariable("chatId") int chatId) {
		
		Optional<ChatSessionPublic> chat = chatSessionRepository.findById(chatId);
		List<Message> messages = messageRepository.findAllByChatSession(chat);
		
		return messages;
	}
	

	@MessageMapping("/chat/{to}")
	public Message sendMessage(@DestinationVariable String to,@Payload Message messageDTO) {
		System.out.println("handling send message: " + messageDTO.getContent() + " from " + messageDTO.getSenderId() + " to: " + to);

		int chatId = Integer.parseInt(to);

		String senderName = memberRepository.findById(messageDTO.getSenderId()).get().getUsername();

		messageDTO.setSenderName(senderName);
		if (messageDTO.getType().equals("SUBCLUB")) {
			messageDTO.setChatSession(chatSessionRepository.findById(chatId).get());

			messageRepository.save(messageDTO);
		}
		
		simpMessagingTemplate.convertAndSend("/topic/messages/" + to, messageDTO);

		return messageDTO;
	}


}
