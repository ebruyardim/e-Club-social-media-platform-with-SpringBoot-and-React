package application.Service;

import application.Model.Member;
import application.Model.MemberSubclub;
import application.Model.SubClub;
import application.Repository.MemberRepository;
import application.Repository.MemberSubclubRepository;
import application.Repository.SubClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class MemberSubclubService {

    @Autowired
    MemberSubclubRepository memberSubclubRepository;
    @Autowired
    SubClubRepository subclubRepository;
    @Autowired
    MemberRepository memberRepository;

    public String joinSubClub(MemberSubclub memberSubclub) {

        try {
            SubClub subclub = subclubRepository.findById(memberSubclub.getSubclubId()).get();
            Member member = memberRepository.findById(memberSubclub.getMemberId()).get();
            int clubId=subclub.getClub().getId();

            memberSubclub.setSubclubClubId(clubId);

            memberSubclubRepository.save(memberSubclub);

            return member.getUsername()+" joined to "+subclub.getName();
        }
        catch(Exception e) {
            return "Subclub or member doesn't exist";
        }

    }

    public Iterable<MemberSubclub> getAllMemberSubclubs() {
        return memberSubclubRepository.findAll();
    }

    public List<MemberSubclub> getMemberSubclubsByMemberId(Integer memberId) {
        return memberSubclubRepository.findByMemberId(memberId);
    }

    public List<MemberSubclub> getMemberSubclubsBySubClub(Integer subclubId) {
        return memberSubclubRepository.findBySubclubId(subclubId);
    }

    public String leaveSubClub(Integer subclubId, Integer memberId) {
        MemberSubclub ms=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
        SubClub s=subclubRepository.findById(subclubId).get();
        List<MemberSubclub> ls = memberSubclubRepository.findAll();
        if(s.getAdminId()!=null && s.getAdminId().equals(memberId)){
            for(MemberSubclub m:ls){
                if(m.getAdminRequest()==1 && m.getSubclubId()==subclubId){
                    m.setAdminRequest(0);
                    memberSubclubRepository.save(m);
                }
            }
            s.setAdminId(null);
            s.setAdminRequestCount(0);
            subclubRepository.save(s);
        }
        memberSubclubRepository.delete(ms);

        return "member "+memberRepository.findById(memberId).get().getUsername() +" leaved " + subclubRepository.findById(subclubId).get().getName();
    }

    public String getMemberIsBanned(Integer subclubId, Integer memberId) {
        MemberSubclub ms=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
        if(ms !=null){
            Member m=memberRepository.findById(memberId).get();
            if(ms.getIsBanned()==1){
                return "Member "+m.getUsername()+" is banned";
            }
            else{
                return "Member "+m.getUsername()+" is not banned";
            }
        }else{
            return "User not member of this subclub";
        }

    }

    public HashMap<String, Object> getBanDetails(Integer subclubId, Integer memberId) {
        MemberSubclub ms=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
        HashMap<String,Object> map = new HashMap<>();

        if(ms !=null){
            Member m=memberRepository.findById(memberId).get();
            map.put("banCount",ms.getBanCount());
            map.put("isBanned",ms.getIsBanned());
            map.put("isDismiss",ms.getIsDismiss());

        }else{
            map.put("error","User is not member of this subclub");
        }
        return map;
    }

    public String dismissMember(Integer subclubId, Integer memberId) {
        MemberSubclub ms=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
        if(ms !=null){
            Member m=memberRepository.findById(memberId).get();
            SubClub s=subclubRepository.findById(subclubId).get();

            ms.setIsDismiss(1);
            ms.setIsBanned(1);
            memberSubclubRepository.save(ms);
            return "Member "+m.getUsername()+" is dismissed from "+s.getName();

        }else{
            return "User is not member of this subclub";
        }
    }

    public String makeAdminRequest(Integer subclubId, Integer memberId) {

        try{
            MemberSubclub ms=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
            SubClub s=subclubRepository.findById(subclubId).get();
            List<MemberSubclub> ls = memberSubclubRepository.findAll();
            List<Integer> aa=new ArrayList<>();
            if(ms.getAdminRequest()!=1){
                ms.setAdminRequest(1);
                memberSubclubRepository.save(ms);

                int adminRequestcount=s.getAdminRequestCount();
                adminRequestcount=adminRequestcount+1;
                s.setAdminRequestCount(adminRequestcount);
                subclubRepository.save(s);
            }else{
                return "Member can make admin request only one time";
            }

            if(s.getAdminRequestCount()==3){
                for(MemberSubclub m:ls){
                    if(m.getAdminRequest()==1 && m.getSubclubId()==subclubId){
                        aa.add(m.getMemberId());
                    }
                }
                Random randomizer = new Random();
                Integer random = aa.get(randomizer.nextInt(aa.size()));
                s.setAdminId(random);
                subclubRepository.save(s);
                return "New admin of subclub "+s.getName() +" is "+memberRepository.findById(random).get().getUsername();
            }else{
                return "Admin request added";
            }
        }catch(Exception e){
            return "Member or subclub not exist or user not member of this subclub";
        }

    }
}
