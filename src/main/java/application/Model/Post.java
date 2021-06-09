package application.Model;


import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="post")

public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name="content")
    private String content;

    @Column(name="likes")
    private Integer likes=0;

    @Column(name="member_id")
    private Integer memberId;

    @Column(name="subclub_id")
    private Integer subClubId;

    @Column(name="member_has_subclub_id")
    private Integer memberSubclub;

    @Column(name="member_name")
    private String memberName;

    @OneToMany(mappedBy = "post")
    private List<PostComment> postComments;

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

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getSubClubId() {
        return subClubId;
    }

    public void setSubClubId(Integer subClubId) {
        this.subClubId = subClubId;
    }

    public Integer getMemberSubclub() {
        return memberSubclub;
    }

    public void setMemberSubclub(Integer memberSubclub) {
        this.memberSubclub = memberSubclub;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public List<PostComment> getPostComments() {
        return postComments;
    }

    public void setPostComments(List<PostComment> postComments) {
        this.postComments = postComments;
    }
}
