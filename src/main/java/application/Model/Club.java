package application.Model;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="club")
public class Club {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="name",nullable = false)
	private String name;

	@Column(name="club_info",nullable = false)
	private String clubInfo;

	@Column(name="club_image")
	private String clubImage;

	@OneToMany(fetch = FetchType.LAZY,
			mappedBy = "club")
	private Set<SubClub> subClubs;

	@OneToMany(mappedBy = "club")
	private List<Question> questions;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "member_has_club",
	joinColumns = { @JoinColumn(name = "club_id")},
	inverseJoinColumns = { @JoinColumn (name = "member_id")})
	private Set<Member> members;
	
	public Club() {}

	public Club(String name, String clubInfo, List<Question> questions) {
		this.name = name;
		this.clubInfo = clubInfo;
		this.questions = questions;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	
	public Set<Member> getMembers() {
		return members;
	}

	public void setMembers(Set<Member> members) {
		this.members = members;
	}

	public Set<SubClub> getSubClubs() {
		return subClubs;
	}

	public void setSubClubs(Set<SubClub> subClubs) {
		this.subClubs = subClubs;
	}

	public String getClubInfo() {
		return clubInfo;
	}

	public void setClubInfo(String clubInfo) {
		this.clubInfo = clubInfo;
	}

	public String getClubImage() {
		return clubImage;
	}

	public void setClubImage(String clubImage) {
		this.clubImage = clubImage;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Club [id=" + id + ", name=" + name + ", clubInfo=" + clubInfo + ", clubImage=" + clubImage
				+ ", subClubs=" + subClubs + ", questions=" + questions + "]";
	}
	
	
	
}
