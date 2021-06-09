package application.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import application.Model.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
