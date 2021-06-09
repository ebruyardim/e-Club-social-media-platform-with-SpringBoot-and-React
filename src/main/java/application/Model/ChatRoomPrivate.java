package application.Model;

import java.util.List;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="chat_room_direct")
public class ChatRoomPrivate {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="member1_id", nullable=false)
	private Integer member1Id;
	
	@Column(name="member2_id", nullable=false)
	private Integer member2Id;
	
    @OneToMany(mappedBy = "chatRoom")
    private List<MessagePrivate> messages;

    public ChatRoomPrivate() {}
    
	public ChatRoomPrivate(Integer member1Id, Integer member2Id) {
		this.member1Id = member1Id;
		this.member2Id = member2Id;
	}
    
    
    
    
}