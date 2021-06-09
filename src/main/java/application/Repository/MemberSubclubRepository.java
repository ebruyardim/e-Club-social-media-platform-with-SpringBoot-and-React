package application.Repository;

import application.Model.MemberSubclub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MemberSubclubRepository extends JpaRepository<MemberSubclub, Integer> {
    List<MemberSubclub> findByMemberId(Integer memberId);

    List<MemberSubclub> findBySubclubId(Integer subclubId);

    MemberSubclub findByMemberIdAndSubclubId(Integer memberId, Integer subclubId);
}
