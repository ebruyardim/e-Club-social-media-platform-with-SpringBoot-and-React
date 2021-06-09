package application.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="subclub")
public class SubClub {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="club_id", nullable=false)
    @JsonIgnore
    private Club club;

    @Column(name="last_activity_time",nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastActivityTime;

    @Column(name="rate")
    private Float rate;

    @Column(name="admin_id")
    private Integer adminId;

    @Column(name="rate_count")
    private Integer rateCount=1;

    @Column(name="admin_request_count")
    private Integer adminRequestCount=0;

    @Column(name="name",nullable = false)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "member_has_subclub",
            joinColumns = { @JoinColumn(name = "subclub_id")},
            inverseJoinColumns = { @JoinColumn (name = "member_id")})
    private Set<Member> members;

    @OneToMany(mappedBy = "subclub")
    private List<SubclubComment> subclubComments;

    @OneToOne(cascade =  CascadeType.ALL,
            mappedBy = "subClub")
    private ChatSessionPublic chatSession;

    @OneToMany(mappedBy = "subclub")
    private List<Event> events;
    
    
    
    
	public Set<Member> getMembers() {
        return members;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public LocalDateTime getLastActivityTime() {
        return lastActivityTime;
    }

    public void setLastActivityTime(LocalDateTime lastActivityTime) {
        this.lastActivityTime = lastActivityTime;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getRateCount() {
        return rateCount;
    }

    public void setRateCount(Integer rateCount) {
        this.rateCount = rateCount;
    }

    public List<SubclubComment> getSubclubComments() {
        return subclubComments;
    }

    public void setSubclubComments(List<SubclubComment> subclubComments) {
        this.subclubComments = subclubComments;
    }

    public ChatSessionPublic getChatSession() {
		return chatSession;
	}

	public void setChatSession(ChatSessionPublic chatSession) {
		this.chatSession = chatSession;
	}

    public Integer getAdminRequestCount() {
        return adminRequestCount;
    }

    public void setAdminRequestCount(Integer adminRequestCount) {
        this.adminRequestCount = adminRequestCount;
    }

    public SubClub() {}
}
