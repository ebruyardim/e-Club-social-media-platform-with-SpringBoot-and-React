package application.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="member_has_club")
public class MemberClub {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="member_id")
	private Integer memberId;
	
	@Column(name="club_id")
	private Integer clubId;


	public MemberClub(Integer memberId, Integer clubId) {
		this.memberId = memberId;
		this.clubId = clubId;
	}


	public MemberClub() {}




	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}




	public Integer getMemberId() {
		return memberId;
	}




	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}




	public Integer getClubId() {
		return clubId;
	}




	public void setClubId(Integer clubId) {
		this.clubId = clubId;
	}

}
