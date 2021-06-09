package application.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Objects;
import java.util.Set;

import javax.persistence.*;


@Entity
@Table(name = "member")
public class Member {

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "members")
	private Set<Club> clubs;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "members")
	@JsonIgnore
	private Set<SubClub> subclubs;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="username",nullable=false)
	private String username;
	
	@Column(name="email",nullable=false)
    private String email;
	
	@Column(name="password",nullable = false)
    private String password;
	
	@Column(name="is_login",nullable = false)
    private Integer isLogin;

	@Column(name="is_questionnaire",nullable = false)
	private Integer isQuestionnaire=0;

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinTable(name = "member_answer",
			joinColumns = { @JoinColumn(name = "member_id")},
			inverseJoinColumns = { @JoinColumn (name = "answer_id")})
	private Set<Answer> answers;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "members")
	private Set<ChatSessionPublic> chatSessions;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "memberSubclubRequest")
	private Set<NewSubClubRequest> memberSubclubRequests;

	public Member() {

	}

	public Set<SubClub> getSubclubs() {
		return subclubs;
	}

	public void setSubclubs(Set<SubClub> subclubs) {
		this.subclubs = subclubs;
	}

	public Set<Club> getClubs() {
		return clubs;
	}


	public void setClubs(Set<Club> clubs) {
		this.clubs = clubs;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(Integer isLogin) {
		this.isLogin = isLogin;
	}


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Member)) return false;
        Member member = (Member) o;
        return (Objects.equals(email, member.email) | (Objects.equals(username, member.username)));
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, 
                            isLogin);
    }
    
    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", isLogin=" + isLogin +
                ", isQuestionnaire= "+ isQuestionnaire+
                '}';
    }

	public Integer getIsQuestionnaire() {
		return isQuestionnaire;
	}

	public void setIsQuestionnaire(Integer isQuestionnaire) {
		this.isQuestionnaire = isQuestionnaire;
	}

	public Set<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(Set<Answer> answers) {
		this.answers = answers;
	}

	public Set<NewSubClubRequest> getMemberSubclubRequests() {
		return memberSubclubRequests;
	}

	public void setMemberSubclubRequests(Set<NewSubClubRequest> memberSubclubRequests) {
		this.memberSubclubRequests = memberSubclubRequests;
	}
}
