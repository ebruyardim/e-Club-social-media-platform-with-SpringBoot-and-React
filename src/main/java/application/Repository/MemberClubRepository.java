package application.Repository;

import org.springframework.data.repository.CrudRepository;

import application.Model.MemberClub;

import java.util.List;

public interface MemberClubRepository extends CrudRepository<MemberClub, Integer> {
    List<MemberClub> findByMemberId(Integer memberId);
}
