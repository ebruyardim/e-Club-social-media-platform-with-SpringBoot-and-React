package application.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import application.Model.Club;
import application.Model.Member;
import application.Model.MemberClub;
import application.Repository.ClubRepository;
import application.Repository.MemberClubRepository;
import application.Repository.MemberRepository;
import application.Service.MemberClubService;

@CrossOrigin(origins = "http://localhost:3000")

@Controller
@RequestMapping(path="/choose-clubs")
public class MemberClubController {	
	
	@Autowired
	MemberClubService memberClubService;

	
    @PostMapping("/joinClub")
    public @ResponseBody String joinClub(@RequestBody MemberClub memberclub) {
    	return memberClubService.joinClub(memberclub);
    }

	//@PostMapping("/joinClubs")
	//public @ResponseBody String joinClubs(@RequestBody List<MemberClub> memberClubList) {
	//	return memberClubService.joinClubs(memberClubList);
	//}

	@GetMapping(path = "/getMemberClubs")
	public @ResponseBody Iterable<MemberClub> getAllMemberClubs() {
		return memberClubService.getAllMemberClubs();
	}

	@GetMapping("/all/{memberId}")
	public @ResponseBody List<MemberClub> getMemberClubsByMemberId(@PathVariable(value = "memberId") Integer memberId) {
		return memberClubService.getMemberClubsByMemberId(memberId);
	}
	
}
