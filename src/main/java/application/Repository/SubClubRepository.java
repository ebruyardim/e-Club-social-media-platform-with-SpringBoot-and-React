package application.Repository;

import application.Model.SubclubComment;
import org.springframework.data.repository.CrudRepository;

import application.Model.SubClub;

import java.util.List;

public interface SubClubRepository extends CrudRepository<SubClub, Integer> {
    List<SubClub> findByClubId(Integer clubId);
}
