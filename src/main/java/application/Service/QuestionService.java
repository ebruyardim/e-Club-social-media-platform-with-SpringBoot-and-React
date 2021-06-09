package application.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import application.Model.Club;
import application.Model.Question;
import application.Repository.ClubRepository;
import application.Repository.QuestionRepository;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ClubRepository clubrepository;

    public List<Question> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();

        return questions;
    }

    public String addQuestion(Question question, int clubid) {

        if (clubrepository.findById(clubid).isPresent()){

            Club club = clubrepository.findById(clubid).get();
            club.getQuestions().add(question);
            clubrepository.save(club);
            question.setClub(club);
            questionRepository.save(question);
        }

        return "question '" + question.getQuestion() + "' saved succesfully";
    }

    
}
