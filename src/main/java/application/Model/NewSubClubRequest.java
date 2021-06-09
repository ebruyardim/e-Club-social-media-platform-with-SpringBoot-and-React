package application.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="new_subclub_request")
public class NewSubClubRequest {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name="subclub_name",nullable = false)
    private String subclubName;

    @Column(name="count")
    private Integer count=1;

    @Column(name="club_id",nullable = false)
    private Integer clubId;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "member_club_request",
            joinColumns = { @JoinColumn(name = "member_id")},
            inverseJoinColumns = { @JoinColumn (name = "new_club_request_id")})
    private Set<Member> memberSubclubRequest;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubclubName() {
        return subclubName;
    }

    public void setSubclubName(String subclubName) {
        this.subclubName = subclubName;
    }


    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getClubId() {
        return clubId;
    }

    public void setClubId(Integer clubId) {
        this.clubId = clubId;
    }

    public Set<Member> getMemberSubclubRequest() {
        return memberSubclubRequest;
    }

    public void setMemberSubclubRequest(Set<Member> memberSubclubRequest) {
        this.memberSubclubRequest = memberSubclubRequest;
    }
}
