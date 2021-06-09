package application.Model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="chat_session")
public class ChatSessionPublic {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "subclub_id", nullable = false)
    private SubClub subClub;
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "member_has_chat_session",
	joinColumns = { @JoinColumn(name = "chat_session_id")},
	inverseJoinColumns = { @JoinColumn (name = "member_id")})
	private Set<Member> members;
	
    @OneToMany(mappedBy = "chatSession")
    private List<Message> messages;
}