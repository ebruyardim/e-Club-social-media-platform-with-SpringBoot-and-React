package application.Service;

import application.Model.*;
import application.Repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import application.Status;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@Service
@CrossOrigin(origins = "http://localhost:3000")

public class MemberService {

	@Autowired
	MemberRepository memberRepository;
    @Autowired
    MemberClubRepository memberClubRepository;
    @Autowired
    MemberSubclubRepository memberSubclubRepository;
	@Autowired
	MemberClubService memberClubService;
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    SubClubRepository subClubRepository;
	@Autowired
    ObjectMapper mapper;
	@Autowired
	PasswordEncoder passwordEncoder;
	


    public int addNewMember (Member member) {
        Iterable<Member> memberList = memberRepository.findAll();
        for (Member m : memberList) {
            if (m.equals(member)) {
                return -1;
            }
        }
        member.setIsLogin(0);
        System.out.println(member.getPassword());
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        System.out.println(member.getPassword());
		memberRepository.save(member);
		return member.getId();
	}
	
    public Iterable<Member> getAllMembers() {
        return memberRepository.findAll();
    }
    
    public int loginUser(Member member) {
        Iterable<Member> memberList = memberRepository.findAll();

        for (Member other : memberList) {
            if (other.getUsername().equals(member.getUsername())) {
            	//String encoded = passwordEncoder.encode(member.getPassword());
            	//System.out.println(encoded);
            	System.out.println(other.getPassword());
                if(passwordEncoder.matches(member.getPassword(), other.getPassword())){
                    other.setIsLogin(1);
                    memberRepository.save(other);


                    return other.getId();
                }
            }
        }
        return -1;
    }
    public String convertPassword(Member member) {
    	Member m = memberRepository.findById(member.getId()).get();
        m.setPassword(passwordEncoder.encode(m.getPassword()));
        memberRepository.save(m);
        return m.getPassword();
    }
    
    public Status logout(int memberid) {
        Member m=memberRepository.findById(memberid).get();
        m.setIsLogin(0);
        memberRepository.save(m);
        return Status.SUCCESS;
   }
    
    public Status resetPasswordCheckEmail(Member member) {
        Iterable<Member> memberList = memberRepository.findAll();

        for (Member other : memberList) {
            if (other.getEmail().equals(member.getEmail())) {
                return Status.SUCCESS;
            }
        }
        return Status.FAILURE;
    }
    
    public int resetPassword(Member member) {
        Iterable<Member> memberList = memberRepository.findAll();

        for (Member other : memberList) {
            if (other.getEmail().equals(member.getEmail())) {
                other.setPassword(passwordEncoder.encode(member.getPassword()));
                memberRepository.save(other);
                return other.getId();
            }
        }
        return -1;
    }
	
    public Member getMemberById(int memberid) {
        return memberRepository.findById(memberid).get();
    }
    
    public String deleteMember(int memberid) {
	    if(memberRepository.existsById(memberid)){
            memberRepository.deleteById(memberid);
            return "Deleted";
        }
	    else{
            return "Member not exist";
        }
    }

    public String updateMember(int memberid) {
        if(memberRepository.existsById(memberid)){
            Member member = memberRepository.findById(memberid).get();
            member.setIsQuestionnaire(1);
            memberRepository.save(member);
            return "Member by id "+ memberid +" is updated.";
        }
        return "Member not exist";

    }


    public String addAnswers(List<Answer> answers, int memberid) {

        if(memberRepository.findById(memberid).isEmpty())
            return "This user does not exist!";

        Member member = memberRepository.findById(memberid).get();


        member.getAnswers().addAll(answers);

        memberRepository.save(member);

        List<Club> clubsList = getAdequateClubs(memberid);

        memberClubService.joinClubs(clubsList, member);

	    return "Member by id "+memberid+" answers saved";
    }

    public List<Club> getAdequateClubs(int memberid) {
        Member member = memberRepository.findById(memberid).get();
        Set<Answer> answers = member.getAnswers();
        HashMap<Club,Integer> clubPoints = new HashMap<Club, Integer>();
        List<Club> adequateClubs = new ArrayList<>();

        for (Answer answer: answers){

            Club club = answer.getQuestion().getClub();
            clubPoints.merge(club, answer.getPoint(), Integer::sum);
        }

        for (Club key : clubPoints.keySet()) {
            if (clubPoints.get(key)>=6){
                adequateClubs.add(key);

            }
        }

        return adequateClubs;

    }


    public HashMap<String, Object> getMemberDetails(int memberid) {
	    Member m=memberRepository.findById(memberid).get();
        List<MemberClub> mc=memberClubRepository.findByMemberId(memberid);
        List<MemberSubclub> msc=memberSubclubRepository.findByMemberId(memberid);
        List<String> clubs=new ArrayList<>();
        List<String> subclubs=new ArrayList<>();
        for(MemberClub n:mc){
            int clubId=n.getClubId();
            String clubName=clubRepository.findById(clubId).get().getName();
            clubs.add(clubName);
        }
        for(MemberSubclub nn:msc){
            int subclubId=nn.getSubclubId();
            //int isBanned=nn.getIsBanned();
            String subclubName=subClubRepository.findById(subclubId).get().getName();
            String id="id: "+subclubId;
            subclubs.add(id);
            subclubs.add(subclubName);
            subclubs.add("isBanned: "+nn.getIsBanned().toString());
            subclubs.add("banCount: "+nn.getBanCount().toString());
            subclubs.add("isDismiss: "+nn.getIsDismiss().toString());

            /**if(isBanned==1){
                subclubs.add("banned");
            }**/
        }

        HashMap<String,Object> map = new HashMap<>();
        map.put("member",m);
        map.put("clubsMemberCanJoin", clubs);
        map.put("subclubs", subclubs);

        return map;
    }
    
    
    public List<MemberInfos> getMemberSubclubInfos() {
		
    	List<MemberInfos> infos = new ArrayList<MemberInfos>();

    	for (Member member: memberRepository.findAll()) {
    		int id = member.getId();
        	MemberInfos mi = new MemberInfos();
        	mi.setId(id);
        	mi.setName(member.getUsername());
        	mi.setMail(member.getEmail());
        	ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>(); 
        	
        	
        	for (MemberSubclub ms: memberSubclubRepository.findByMemberId(id)) {
            	HashMap<String,Object> map = new HashMap<String,Object>();

        		int subclubId = ms.getSubclubId();
            	int banCount = ms.getBanCount();
            	int isDismiss = ms.getIsDismiss();
            	map.put("subclubId", subclubId);
            	map.put("subclub", subClubRepository.findById(subclubId).get().getName());
            	map.put("banCount", banCount);
            	map.put("isDismiss", isDismiss);
            	list.add(map);
        	}
        	mi.setSubclubList(list);
        	infos.add(mi);
        	
    	}
    	System.out.println(infos);
    	
    	return infos;    	
    }

    
    
    
}
