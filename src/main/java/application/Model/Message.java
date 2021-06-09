package application.Model;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="message")
public class Message {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="content")
	private String content;
	
	@Column(name="member_id",nullable = false)
	private Integer senderId;
	
	@Column(name="type",nullable = false)
	private String type;
	
	@Column(name="sender_name")
	private String senderName;

	
	@Column(name="datetime",nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime datetime = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "chat_session_id")
    private ChatSessionPublic chatSession;

	public Message() {}
	
	public Message(String content, Integer senderId, String senderName, String type, ChatSessionPublic chatsession) {
		this.content = content;
		this.senderId = senderId;
		this.senderName = senderName;
		this.chatSession = chatsession;
		this.type = type;
	}
}