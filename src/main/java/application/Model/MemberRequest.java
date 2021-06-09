package application.Model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="member_club_request")
public class MemberRequest {

    @Column(name="member_id")
    private Integer memberId;

    @Column(name="new_club_request_id")
    private Integer newClubRequestId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
