package application.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name="member_has_subclub")
public class MemberSubclub implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name="admin_request")
    private Integer adminRequest=0;

    @Column(name="ban_day")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime banDay;

    @Column(name="ban_count")
    private Integer banCount=0;

    @Column(name="is_dismiss")
    private Integer isDismiss=0;

    @Column(name="member_id",nullable = false)
    private Integer memberId;

    @Column(name="subclub_club_id")
    private Integer subclubClubId;

    @Column(name="subclub_id",nullable = false)
    private Integer subclubId;

    @Column(name="is_banned")
    private Integer isBanned=0;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true,
            mappedBy = "memberSubclub")
    @JsonIgnore
    private Set<Post> posts;

    public Integer getAdminRequest() {
        return adminRequest;
    }

    public void setAdminRequest(Integer adminRequest) {
        this.adminRequest = adminRequest;
    }

    public LocalDateTime getBanDay() {
        return banDay;
    }

    public void setBanDay(LocalDateTime banDay) {
        this.banDay = banDay;
    }

    public Integer getBanCount() {
        return banCount;
    }

    public void setBanCount(Integer banCount) {
        this.banCount = banCount;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getSubclubClubId() {
        return subclubClubId;
    }

    public void setSubclubClubId(Integer subclubClubId) {
        this.subclubClubId = subclubClubId;
    }

    public Integer getSubclubId() {
        return subclubId;
    }

    public void setSubclubId(Integer subclubId) {
        this.subclubId = subclubId;
    }

    public Integer getIsDismiss() {
        return isDismiss;
    }

    public void setIsDismiss(Integer isDismiss) {
        this.isDismiss = isDismiss;
    }

    public Integer isBanned() {
        return isBanned;
    }

    public void setBanned(Integer banned) {
        isBanned = banned;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(Integer isBanned) {
        this.isBanned = isBanned;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }
}
