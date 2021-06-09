package application.Model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CQA { // club-question-answer class is created for adding new club with its questions and answers. 
	
	private String clubName;
	private String clubInfo;

	private String clubQuestion1;
	private String clubQuestion2;
	private String clubQuestion3;

	private String clubAnswer1_1;
	private String clubAnswer1_2;
	private String clubAnswer1_3;
	private String clubAnswer1_4;
	private String clubAnswer2_1;
	private String clubAnswer2_2;
	private String clubAnswer2_3;
	private String clubAnswer2_4;
	private String clubAnswer3_1;
	private String clubAnswer3_2;
	private String clubAnswer3_3;
	private String clubAnswer3_4;
	
	private char answer1option = 'a';
	private char answer2option = 'b';
	private char answer3option = 'c';
	private char answer4option = 'd';
	private char answer5option = 'a';
	private char answer6option = 'b';
	private char answer7option = 'c';
	private char answer8option = 'd';
	private char answer9option = 'a';
	private char answer10option = 'b';
	private char answer11option = 'c';
	private char answer12option = 'd';

	private int answer1point = 4;
	private int answer2point = 3;
	private int answer3point = 2;
	private int answer4point = 1;
	private int answer5point = 4;
	private int answer6point = 3;
	private int answer7point = 2;
	private int answer8point = 1;
	private int answer9point = 4;
	private int answer10point = 3;
	private int answer11point = 2;
	private int answer12point = 1;



}