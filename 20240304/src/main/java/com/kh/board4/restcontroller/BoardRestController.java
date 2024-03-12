package com.kh.board4.restcontroller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.board4.entity.Board;
import com.kh.board4.repository.BoardRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j // lombok 라이브러리를 사용하여 로깅을 위한 Logger 객체 생성
@RestController // Spring Framework에서 RESTful 웹 서비스를 처리하기 위한 컨트롤러 클래스임을 나타냄
public class BoardRestController {

    @Autowired // Spring에 의해 자동으로 의존성 주입을 수행하는 어노테이션
    private BoardRepository boardRepository; // Board 엔티티를 조작하기 위한 데이터 접근 객체

    
    @DeleteMapping("/board/delete/{no}")
    public ResponseEntity<String> deleteBoard(@PathVariable Long no) {
        // 삭제 로직을 수행하고 결과를 반환합니다.
        try {
            boardRepository.deleteById(no);
            return ResponseEntity.ok("게시물이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            					 .body("게시물 삭제 중 오류가 발생하였습니다.");
        }
    }
    
    
    
    
    
    
    
    
    // HTTP GET 메서드를 통해 "/board/detail1/{id}" 엔드포인트에 접근했을 때의 처리를 담당하는 메서드
    @GetMapping("/board/detail1/{id}")
    public ResponseEntity<?> getBoardDetail(@PathVariable("id") Long id) {
        // id에 해당하는 Board 엔티티를 데이터베이스에서 찾음
        Board board = boardRepository.findById(id).orElse(null);
        
        // 찾은 board가 없는 경우
        if (board == null) {
            // 404 상태 코드와 함께 메시지를 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Board not found with id: " + id); 
        }       
        log.info("{}",board); // 로그에 해당 Board 객체를 출력
        return ResponseEntity.ok(board); // 찾은 Board 객체를 응답 본문으로 반환
    }
    
    // HTTP GET 메서드를 통해 "/board/all" 엔드포인트에 접근했을 때의 처리를 담당하는 메서드
    @GetMapping("/board/all")
    public ResponseEntity<?> getBoardAll() {
        // 모든 Board 엔티티를 데이터베이스에서 조회
        List<Board> board = boardRepository.findAll();
        
        // 조회된 board가 없는 경우
        if (board == null) {
            // 404 상태 코드와 함께 메시지를 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("절때 찾을 수 없는데?"); 
        }       
        log.info("{}",board); // 로그에 조회된 Board 리스트를 출력
        return ResponseEntity.ok(board); // 조회된 Board 리스트를 응답 본문으로 반환
   }
    
    // HTTP POST 메서드를 통해 "/board/searchModel" 엔드포인트에 접근했을 때의 처리를 담당하는 메서드
    @PostMapping("/board/searchModel")
    public ResponseEntity<?> searchBoard(@RequestParam("keyword") String keyword) {
        // 제목 또는 내용에 keyword를 포함하는 Board 엔티티를 데이터베이스에서 조회
        List<Board> list = boardRepository.findByTitleContainingOrContentContaining(keyword, keyword);
        
        // 조회된 list가 없는 경우
        if(list == null){
            // 404 상태 코드와 함께 메시지를 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("검색한 내용은 없습니다."); 
        }       
        log.info("{}",list); // 로그에 조회된 Board 리스트를 출력
        return ResponseEntity.ok(list); // 조회된 Board 리스트를 응답 본문으로 반환
    } 
}
