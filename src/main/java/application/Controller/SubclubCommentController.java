package application.Controller;

import application.Model.SubclubComment;
import application.Service.SubclubCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/subclubComments")
public class SubclubCommentController {

    private final SubclubCommentService subclubCommentService;

    @PostMapping(path = "/add/{subclubId}/{memberId}")
    public @ResponseBody
    String addSubclubComment(@PathVariable(value = "subclubId") Integer subclubId,
                             @PathVariable(value = "memberId") Integer memberId,
                          @RequestBody SubclubComment subclubComment){
        return subclubCommentService.addSubclubComment(subclubId,subclubComment,memberId);
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody
    Iterable<SubclubComment> getsubClubComments(){
        return subclubCommentService.getSubclubComments();
    }

    @GetMapping(path = "/getById/{subclubId}")
    public @ResponseBody
    List<SubclubComment> getSubclubCommentById(@PathVariable(value = "subclubId") Integer subclubId){
        return subclubCommentService.getSubclubCommentById(subclubId);
    }

    @DeleteMapping(path = "/deleteById/{subclubCommentId}")
    public @ResponseBody
    String deleteSubclubCommentById(@PathVariable(value = "subclubCommentId") Integer subclubCommentId){
        return subclubCommentService.deleteById(subclubCommentId);
    }
}
