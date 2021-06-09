package application.Repository;

import org.springframework.data.repository.CrudRepository;

import application.Model.Member;


public interface MemberRepository extends CrudRepository<Member, Integer> {

	Member findByEmail(String email);

}
