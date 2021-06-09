package application.Controller;

import javax.validation.Valid;

import application.Model.Answer;
import application.Model.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import application.Status;
import application.Model.Member;
import application.Model.MemberInfos;
import application.Service.MemberService;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(path="/member") // This means URL's start with /member (after Application path)
public class MemberController {

	@Autowired
	MemberService memberService;
	
	@PostMapping(path="/register")
	public @ResponseBody int addNewMember (@Valid @RequestBody Member member) {
		return memberService.addNewMember(member);
	}
	@PostMapping(path="/convertPassword")
	public @ResponseBody String convertPassword (@RequestBody Member member) {
		return memberService.convertPassword(member);
	}
	@GetMapping(path = "/all")
    public @ResponseBody Iterable<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @PostMapping(value = "/login")
    public @ResponseBody
    int loginUser(@Valid @RequestBody Member member) {
        return memberService.loginUser(member);
    }

    @GetMapping("/logout/{memberid}")
    private @ResponseBody Status logout(@PathVariable("memberid") int memberid) {
         return memberService.logout(memberid);
    }

    @PostMapping("/resetPasswordCheckEmail")
    public @ResponseBody
    Status resetPasswordCheckEmail(@Valid @RequestBody Member member) {
        return memberService.resetPasswordCheckEmail(member);
    }

    @PostMapping("/resetPassword")
    public @ResponseBody
    int resetPassword(@Valid @RequestBody Member member) {
        return memberService.resetPassword(member);
    }
    
    @GetMapping("/get/{memberid}")
    public @ResponseBody Member getMemberById(@PathVariable("memberid") int memberid) {
        return memberService.getMemberById(memberid);
    }

    @DeleteMapping("/deleteById/{memberid}")
    public @ResponseBody String deleteMember(@PathVariable("memberid") int memberid) {
	    return memberService.deleteMember(memberid);
    }

    @PostMapping("/updateMember/{memberid}")
    public @ResponseBody String updateMember(@Valid @PathVariable("memberid") int memberid) {
        return memberService.updateMember(memberid);
    }

    @PostMapping("/addAnswers/{memberid}")
    public @ResponseBody
    String addAnswers(@Valid @RequestBody List<Answer> answers, @PathVariable("memberid") int memberid) {
        return memberService.addAnswers(answers, memberid);
    }


    @GetMapping("/getAdequateClubs/{memberid}")
    public @ResponseBody List<Club> getAdequateClubs(@PathVariable("memberid") int memberid) {
        return memberService.getAdequateClubs(memberid);
    }

    @GetMapping("/getMemberDetails/{memberid}")
    public @ResponseBody
    HashMap<String, Object> getMemberDetails(@PathVariable("memberid") int memberid) {
        return memberService.getMemberDetails(memberid);
    }

    @GetMapping("/getMemberSubclubInfos")
    public @ResponseBody
    List<MemberInfos> getMemberSubclubInfos() {
        return memberService.getMemberSubclubInfos();
    }
    
}
