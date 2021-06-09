package application.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import application.Model.Question;
import application.Service.QuestionService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;


    @GetMapping("/questions")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/addQuestion/{clubid}")
    public String addQuestion(@RequestBody Question question, @PathVariable("clubid") int clubid) {
        System.out.println("okay");
        return questionService.addQuestion(question, clubid);
    }

}
