package application.Controller;

import application.Model.MemberSubclub;
import application.Service.MemberSubclubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;



@Controller
@RequestMapping(path="/member-subclubs")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberSubclubController {
    @Autowired
    MemberSubclubService membersubClubService;


    @PostMapping("/joinSubclubs")
    public @ResponseBody
    String joinSubClub(@RequestBody MemberSubclub memberSubclub) {
        return membersubClubService.joinSubClub(memberSubclub);
    }

    @GetMapping(path = "/getMemberSubclubs")
    public @ResponseBody Iterable<MemberSubclub> getAllMemberSubClubs() {
        return membersubClubService.getAllMemberSubclubs();
    }

    @GetMapping("/getByMember/{memberId}")
    public @ResponseBody
    List<MemberSubclub> getMemberSubClubsByMemberId(@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.getMemberSubclubsByMemberId(memberId);
    }

    @GetMapping("/getBySubclub/{subclubId}")
    public @ResponseBody
    List<MemberSubclub> getMemberSubClubsBySubClubId(@PathVariable(value = "subclubId") Integer subclubId) {
        return membersubClubService.getMemberSubclubsBySubClub(subclubId);
    }

    @DeleteMapping("/leaveSubClub/{subclubId}/{memberId}")
    public @ResponseBody
    String leaveSubClub(@PathVariable(value = "subclubId") Integer subclubId,@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.leaveSubClub(subclubId,memberId);
    }

    @GetMapping("/getMemberIsBanned/{subclubId}/{memberId}")
    public @ResponseBody
    String getMemberIsBanned(@PathVariable(value = "subclubId") Integer subclubId,@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.getMemberIsBanned(subclubId,memberId);
    }

    @GetMapping("/getBanDetails/{subclubId}/{memberId}")
    public @ResponseBody
    HashMap<String, Object> getBanDetails(@PathVariable(value = "subclubId") Integer subclubId,@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.getBanDetails(subclubId,memberId);
    }

    @PutMapping("/dismissMember/{subclubId}/{memberId}")
    public @ResponseBody
    String dismissMember(@PathVariable(value = "subclubId") Integer subclubId,@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.dismissMember(subclubId,memberId);
    }

    @PutMapping("/makeAdminRequest/{subclubId}/{memberId}")
    public @ResponseBody
    String makeAdminRequest(@PathVariable(value = "subclubId") Integer subclubId,@PathVariable(value = "memberId") Integer memberId) {
        return membersubClubService.makeAdminRequest(subclubId,memberId);
    }
}
