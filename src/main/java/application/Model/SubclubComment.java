package application.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "subclub_comment")
public class SubclubComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "subclub_club_id")
    private Integer subclubClubId;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "member_id")
    private Integer memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subclub_id", nullable = false)
    @JsonIgnore
    private SubClub subclub;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSubclubClubId() {
        return subclubClubId;
    }

    public void setSubclubClubId(Integer subclubClubId) {
        this.subclubClubId = subclubClubId;
    }

    public SubClub getSubclub() {
        return subclub;
    }

    public void setSubclub(SubClub subclub) {
        this.subclub = subclub;
    }

    public String getMemberName() {
        return memberName;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }
}
