package application.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import application.Model.Answer;
import application.Model.Question;
import application.Repository.AnswerRepository;
import application.Repository.QuestionRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public List<Answer> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();

        return answers;
    }

    public String addAnswer(Answer answer, int question_id) {

        Question question = questionRepository.findById(question_id).get();
        System.out.println(answer.getReply());
        //answer.setQuestion(question);

        answer.setQuestion(question);
        answerRepository.save(answer);

        question.getAnswers().add(answer);
        questionRepository.save(question);



        return "answer '" + answer.getReply() + "' saved succesfully";

    }
}
