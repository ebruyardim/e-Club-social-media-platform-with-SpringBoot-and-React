package application.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

import application.Model.ChatRoomPrivate;
import application.Model.ChatSessionPublic;
import application.Model.Message;
import application.Model.MessagePrivate;
import application.Repository.ChatRoomPrivateRepository;
import application.Repository.ChatSessionPublicRepository;
import application.Repository.MemberRepository;
import application.Repository.MessagePrivateRepository;
import application.Repository.MessageRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class MessagePrivateController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	private ChatRoomPrivateRepository chatRoomRepository;
	@Autowired
	private MessagePrivateRepository messagePrivateRepository;
	
	@GetMapping("/getPrivateMessages/{member1id}/{member2id}")
	public @ResponseBody List<MessagePrivate> getPrivateMessages(@PathVariable("member1id") int member1id, @PathVariable("member2id") int member2id){
		
		List<ChatRoomPrivate> chat = chatRoomRepository.findByMember1IdAndMember2Id(Math.min(member1id, member2id), Math.max(member1id, member2id));
		
		List<MessagePrivate> messages = messagePrivateRepository.findAllByChatRoom(chat.get(0));
		
		return messages;
	}
	
	@MessageMapping("/chat")
	public @ResponseBody MessagePrivate sendMessage(@Payload MessagePrivate messageDTO) {
		
		int senderId = messageDTO.getSenderId();
		int receiverId = messageDTO.getReceiverId();
		System.out.println("handling send message: " + messageDTO.getContent() + " from " + senderId + " to: " + receiverId);
		
		List<ChatRoomPrivate> chat = chatRoomRepository.findByMember1IdAndMember2Id(Math.min(senderId,receiverId), Math.max(senderId,receiverId));
		
		if (chat.isEmpty()) {
			System.out.println("chat room is not exist. New room was created.");
			ChatRoomPrivate chatRoom = new ChatRoomPrivate(Math.min(senderId,receiverId), Math.max(senderId,receiverId));
			chatRoomRepository.save(chatRoom);
			
			messageDTO.setChatRoom(chatRoom);
			messagePrivateRepository.save(messageDTO);
		}
		else {
			System.out.println("chat room is already exist.");

			messageDTO.setChatRoom(chat.get(0));
			messagePrivateRepository.save(messageDTO);
		}


		
		simpMessagingTemplate.convertAndSend("/topic/messages/" + receiverId, messageDTO);

		return messageDTO;
	}
}
