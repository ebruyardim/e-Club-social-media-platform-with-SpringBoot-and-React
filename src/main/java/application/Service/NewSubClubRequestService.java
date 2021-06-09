package application.Service;

import application.Model.*;
import application.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class NewSubClubRequestService {

    @Autowired
    NewSubClubRequestRepository newSubClubRequestRepository;
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    SubClubRepository subClubRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberRequestRepository memberRequestRepository;
    boolean isNull;

    public String addNewRequest(NewSubClubRequest newSubclubRequest, Integer memberId) {
        try{
            Member m=memberRepository.findById(memberId).get();
            Club c=clubRepository.findById(newSubclubRequest.getClubId()).get();
        }catch (Exception e){
            return "Member or club not exist";
        }

        try{
            NewSubClubRequest n=newSubClubRequestRepository.findBySubclubName(newSubclubRequest.getSubclubName());
            if(n==null){
                isNull=true;
                newSubClubRequestRepository.save(newSubclubRequest);
                MemberRequest mr=new MemberRequest();
                mr.setNewClubRequestId(newSubclubRequest.getId());
                mr.setMemberId(memberId);
                memberRequestRepository.save(mr);
                return "Subclub request "+newSubclubRequest.getSubclubName()+" added id is "+newSubclubRequest.getId();

            }else{
                isNull=false;
                MemberRequest mr2=new MemberRequest();
                mr2.setNewClubRequestId(n.getId());
                mr2.setMemberId(memberId);
                memberRequestRepository.save(mr2);
                int count=n.getCount();
                count=count+1;
                n.setCount(count);
                newSubClubRequestRepository.save(n);
                return checkCount(n);
            }
        }catch(Exception e){
            if(isNull==true){
                newSubClubRequestRepository.delete(newSubclubRequest);
            }
            return "Member can't make same request";
         }

    }

    private String checkCount(NewSubClubRequest existing) {
        if(existing.getCount()==3){
            SubClub s=new SubClub();
            Club c=clubRepository.findById(existing.getClubId()).get();
            s.setName(existing.getSubclubName());
            s.setClub(c);
            s.setRate(1f);
            s.setLastActivityTime(LocalDateTime.now());
            s.setAdminId(0);
            subClubRepository.save(s);
            return  "New  subclub "+ s.getName()+" opened";
        }else{
            return "Subclub request "+existing.getSubclubName()+" incremented by 1";
        }
    }

    public String updateExistingRequest(Integer newSubClubRequestId, Integer memberId) {
        NewSubClubRequest nsr=newSubClubRequestRepository.findById(newSubClubRequestId).get();

        MemberRequest mr2=new MemberRequest();
        mr2.setNewClubRequestId(nsr.getId());
        mr2.setMemberId(memberId);
        try{
            memberRequestRepository.save(mr2);

        }catch(Exception e){
            return "Member can't make same request";

        }
        int count=nsr.getCount();
        count=count+1;
        nsr.setCount(count);
        newSubClubRequestRepository.save(nsr);
        return checkCount(nsr);


    }

    public Iterable<NewSubClubRequest> getAllRequests() {
        return newSubClubRequestRepository.findAll();
    }
}
