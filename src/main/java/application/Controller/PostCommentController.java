package application.Controller;

import application.Model.PostComment;
import application.Service.PostCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/postComments")
public class PostCommentController {

    private final PostCommentService postCommentService;

    @PostMapping(path = "/add/{postId}/{memberId}")
    public @ResponseBody
    String addPostComment(@PathVariable(value = "postId") Integer postId,
                          @PathVariable(value = "memberId") Integer memberId,
                          @RequestBody PostComment postComment){
        return postCommentService.addPostComment(postId,postComment,memberId);
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody
    Iterable<PostComment> getPostComments(){
        return postCommentService.getPostComments();
    }

    @GetMapping(path = "/getById/{postId}")
    public @ResponseBody
    List<PostComment> getPostCommentById(@PathVariable(value = "postId") Integer postId){
        return postCommentService.getPostCommentById(postId);
    }

    @DeleteMapping(path = "/deleteById/{postCommentId}")
    public @ResponseBody
    String deletePostCommentById(@PathVariable(value = "postCommentId") Integer postCommentId){
        return postCommentService.deleteById(postCommentId);
    }
}
