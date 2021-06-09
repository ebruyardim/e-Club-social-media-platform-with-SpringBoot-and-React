package application.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import application.Model.Answer;
import application.Service.AnswerService;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor

public class AnswerController {
    private final AnswerService answerService;

    @GetMapping("/answers")
    public List<Answer> getAllAnswers() { return answerService.getAllAnswers(); }

    @PostMapping("/addAnswer/{questionid}")
    public String addAnswer(@Valid @RequestBody Answer answer, @PathVariable("questionid") int questionid) {

        return answerService.addAnswer(answer, questionid);
    }
}


