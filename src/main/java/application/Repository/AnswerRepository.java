package application.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import application.Model.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
