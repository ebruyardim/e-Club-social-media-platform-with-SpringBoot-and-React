package application.Service;

import application.Model.Answer;
import application.Model.CQA;
import application.Model.Club;
import application.Model.Question;
import application.Repository.AnswerRepository;
import application.Repository.ClubRepository;
import application.Repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class ClubService {
    @Autowired
    private ClubRepository clubRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionRepository questionRepository;
    
    public Integer addClub(Club club) {
        Iterable<Club> clublist = clubRepository.findAll();
        for (Club c : clublist) {
            if (c.getName().equals(club.getName())) {
            	System.out.println(c.toString());
                return -1;
            }
        }
        clubRepository.save(club);
        return club.getId();
    }
    
    public Integer addNewClub(CQA cqa) { // with its questions and answers
    	
        Iterable<Club> clublist = clubRepository.findAll();
        for (Club c : clublist) {
            if (c.getName().equals(cqa.getClubName())) {
                return -1;
            }
        }
        
    	Answer answer1 = new Answer(cqa.getClubAnswer1_1(),cqa.getAnswer1option(),cqa.getAnswer1point());
    	Answer answer2 = new Answer(cqa.getClubAnswer1_2(),cqa.getAnswer2option(),cqa.getAnswer2point());
    	Answer answer3 = new Answer(cqa.getClubAnswer1_3(),cqa.getAnswer3option(),cqa.getAnswer3point());
    	Answer answer4 = new Answer(cqa.getClubAnswer1_4(),cqa.getAnswer4option(),cqa.getAnswer4point());
    	Answer answer5 = new Answer(cqa.getClubAnswer2_1(),cqa.getAnswer5option(),cqa.getAnswer5point());
    	Answer answer6 = new Answer(cqa.getClubAnswer2_2(),cqa.getAnswer6option(),cqa.getAnswer6point());
    	Answer answer7 = new Answer(cqa.getClubAnswer2_3(),cqa.getAnswer7option(),cqa.getAnswer7point());
    	Answer answer8 = new Answer(cqa.getClubAnswer2_4(),cqa.getAnswer8option(),cqa.getAnswer8point());
    	Answer answer9 = new Answer(cqa.getClubAnswer3_1(),cqa.getAnswer9option(),cqa.getAnswer9point());
    	Answer answer10 = new Answer(cqa.getClubAnswer3_2(),cqa.getAnswer10option(),cqa.getAnswer10point());
    	Answer answer11 = new Answer(cqa.getClubAnswer3_3(),cqa.getAnswer11option(),cqa.getAnswer11point());
    	Answer answer12 = new Answer(cqa.getClubAnswer3_4(),cqa.getAnswer12option(),cqa.getAnswer12point());
        
    	List<Answer> answers1 = Arrays.asList(answer1,answer2,answer3,answer4);
    	List<Answer> answers2 = Arrays.asList(answer5,answer6,answer7,answer8);
    	List<Answer> answers3 = Arrays.asList(answer9,answer10,answer11,answer12);
    	
    	Question question1 = new Question(cqa.getClubQuestion1(), answers1);
    	Question question2 = new Question(cqa.getClubQuestion2(), answers2);
    	Question question3 = new Question(cqa.getClubQuestion3(), answers3);
        List<Question> questions = Arrays.asList(question1,question2,question3);

    	Club club = new Club(cqa.getClubName(),cqa.getClubInfo(), questions);
        clubRepository.save(club);
        
        question1.setClub(club);
        question2.setClub(club);
        question3.setClub(club);

        questionRepository.save(question1);
        questionRepository.save(question2);
        questionRepository.save(question3);

    	//-----------------------------------------------------------
        for (int i=0; i<4; i++) {
        	answers1.get(i).setQuestion(question1);
        }
        for (int i=0; i<4; i++) {
        	answers2.get(i).setQuestion(question2);
        }
        for (int i=0; i<4; i++) {
        	answers3.get(i).setQuestion(question3);
        }

    	answerRepository.saveAll(answers1);
    	answerRepository.saveAll(answers2);
    	answerRepository.saveAll(answers3);

    	return club.getId();
    }
    
    
    public Iterable<Club> findAllClubs() {
        return clubRepository.findAll();
    }

    public Club getClubById(int clubid) {
        return clubRepository.findById(clubid).get();
    }

    public String deleteClubById(int clubid) {
        clubRepository.deleteById(clubid);
        return "Deleted";
    }

    public String updateClub(int id,String info) {
        Club c = clubRepository.findById(id).get();
        c.setClubInfo(info);
        System.out.println(c.getName());
        clubRepository.save(c);
        return "Updated";
    }
}
