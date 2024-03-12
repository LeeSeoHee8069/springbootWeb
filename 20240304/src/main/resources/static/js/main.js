// JavaScript 코드(jQuery를 사용합니다)


// 전체 게시글 가져오기

$(document).ready(function() {

	 // 모달을 초기화합니다.
    $('#myModal').modal();
    
        
    $('#deleteBtn').click(function(event) {
        event.preventDefault(); // 기본 동작 방지 (링크 이동 방지)
        
        var url = $(this).attr('href'); // 링크의 href 속성값 가져오기
        console.log(url);
        $.ajax({
            url: url, // 삭제 요청을 보낼 URL
            type: 'DELETE', // HTTP 요청 메서드
            success: function(data) { // 성공 시 콜백 함수
                alert(data); // 성공 메시지 표시
                // 삭제 성공 시 추가 작업 수행 가능
                window.location.href = '/'; // 페이지 이동
            },
            error: function(xhr, textStatus, errorThrown) { // 실패 시 콜백 함수
                console.log(xhr.message);
            	alert('게시물 삭제에 실패하였습니다.'); // 실패 메시지 표시
                
            }
        });
    });
  	
    // 이건 입력창에서 엔터를 눌렀을 때 실행하는 메서드
    $("#searchModelInput").keypress(function(event) {
        // 엔터 키를 눌렀을 때
        if (event.which === 13) {
            event.preventDefault(); // 기본 동작을 막습니다.

            var input = $(this).val(); // 입력된 값 가져오기
            console.log(input);

            // 여기서부터 원하는 작업을 수행합니다.
            $.ajax({
                url: '/board/searchModel', // 검색을 처리하는 URL로 변경하세요
                type: 'POST',
                data: { keyword: input }, // 검색어를 파라미터로 전달
                dataType: 'json',
                success: function(response) {
                    // 검색 결과를 테이블 형식으로 구성하여 모달에 출력
                    var htmlContent = '';
                    for (var i = 0; i < response.length; i++) {
                        htmlContent += '<tr>';
                        htmlContent += '<td>' + response[i].no + '</td>';
                        htmlContent += '<td>' + response[i].title + '</td>';
                        htmlContent += '<td>' + response[i].writerNo + '</td>';
                        htmlContent += '<td>' + response[i].readCount + '</td>';
                        htmlContent += '<td>' + response[i].createDate + '</td>';
                        htmlContent += '</tr>';
                    }
                    $('#modalContent').html(htmlContent); // 검색 결과를 모달에 출력
                    $('#myModal').modal('show'); // 모달 열기
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText); // 에러 발생 시 콘솔에 로그 출력
                }
            });
        }
    });
      
// 밑에는 서치버튼을 눌러야 실행하는 메서드
// $("#searchbtn").click(function(){
// event.preventDefault(); // 링크의 기본 동작을 막습니다.
//		
// var input = $("#searchModelInput").val();
// console.log(input);
//		
//		
//		
//		
//		
// });// 제이쿼리 끝!

    $('#searchButton').click(function() {
	    event.preventDefault(); // 링크의 기본 동작을 막습니다.
	    
	    $.ajax({
	        url: '/board/all',
	        type: 'GET',
	        dataType: 'json', // 데이터 타입을 JSON으로 설정합니다.
	        success: function(response) {
	        	
	        	console.log(response);
	        	console.log(typeof response);
	        	
	        	
	            var htmlContent = '<table class="table table-bordered">';
	            htmlContent += '<thead>';
	            htmlContent += '<tr>';
	            htmlContent += '<th scope="col">글번호</th>';
	            htmlContent += '<th scope="col">제목</th>';
	            htmlContent += '<th scope="col">작성자 번호</th>';
	            htmlContent += '<th scope="col">내용</th>';
	            htmlContent += '<th scope="col">조회수</th>';
	            htmlContent += '<th scope="col">작성 시간</th>';
	            htmlContent += '</tr>';
	            htmlContent += '</thead>';
	            htmlContent += '<tbody>';
	
	            // response가 배열인 경우에 대비하여 forEach 메소드를 사용하여 각 객체를 처리합니다.
	            response.forEach(function(data) {
	                htmlContent += '<tr>';
	                htmlContent += '<td>' + data.no + '</td>';
	                htmlContent += '<td>' + data.title + '</td>';
	                htmlContent += '<td>' + data.writerNo + '</td>';
	                htmlContent += '<td>' + data.content + '</td>';
	                htmlContent += '<td>' + data.readCount + '</td>';
	                htmlContent += '<td>' + data.createDate + '</td>';
	                htmlContent += '</tr>';
	            });
	
	            htmlContent += '</tbody>';
	            htmlContent += '</table>';
	
	            $('#modalContent').html(htmlContent); // 모달의 내용을 가져온 페이지의 내용으로
														// 설정합니다.
	            $('#myModal').modal('show'); // 모달을 엽니다.
	        },
	        error: function(xhr, status, error) {
	            console.error(xhr.responseText); // 에러가 발생한 경우 콘솔에 에러 메시지를
													// 출력합니다.
	        }
	    }); // ajax끝!
    });
});// 제이쿼리끝!

// 요거부터 실행하는게 좋을 듯


$(document).ready(function() {
    // 문서가 로드될 때 실행되는 함수
    
    // 모달을 초기화합니다.
    $('#myModal').modal();
    
    // 타이틀 버튼을 클릭했을 때
    $('.showDetail').click(function(event) {
        event.preventDefault(); // 링크의 기본 동작을 막습니다.

        // 클릭된 타이틀의 부모 요소인 <tr>을 선택하여 해당 <tr>에서 게시글 번호를 가져옵니다.
        var boardNo = $(this).closest('tr').find('td:first-child').text().trim();

        // 가져온 게시글 번호를 정수형으로 변환합니다.
        boardNo = parseInt(boardNo);

        // AJAX 요청을 통해 상세 페이지의 내용을 가져옵니다.
        $.ajax({
            url: '/board/detail1/' + boardNo,
            type: 'GET',
            dataType: 'html',
            success: function(response) {
                // 성공적으로 데이터를 받아온 경우 실행되는 함수
                
                // JSON 데이터를 HTML로 변환하여 표시합니다.
                var htmlContent = '<table class="table table-boardered">';
                htmlContent += '<tr><th>글번호</th><td>' + data.no + '</td></tr>';
                htmlContent += '<tr><th>제목</th><td>' + data.title + '</td></tr>';
                htmlContent += '<tr><th>작성자 번호</th><td>' + data.writerNo + '</td></tr>';
                htmlContent += '<tr><th>내용</th><td>' + data.content + '</td></tr>';
                htmlContent += '<tr><th>조회수</th><td>' + data.readCount + '</td></tr>';
                htmlContent += '<tr><th>작성 시간</th><td>' + data.createDate + '</td></tr>';
                // 이하 필요한 데이터를 추가로 표시하도록 수정하세요.
                htmlContent += '</table>';

                // 모달의 내용을 가져온 페이지의 내용으로 설정합니다.
                $('#modalContent').html(htmlContent);
                
                // 모달을 엽니다.
                $('#myModal').modal('show');
            },
            error: function(xhr, status, error) {
                // 에러가 발생한 경우 실행되는 함수
                console.error(xhr.responseText); // 에러가 발생한 경우 콘솔에 에러 메시지를
													// 출력합니다.
            }
        });
    });
});







/*
 * 밑에 문장은 한 건만 조회하는 상세페이지 $(document).ready(function() { // 모달을 초기화합니다.
 * $('#myModal').modal(); // 타이틀 버튼을 클릭했을 때
 * $('.showDetail').click(function(event) { console.log("찍히니?");
 * event.preventDefault(); // 링크의 기본 동작을 막습니다.
 * 
 * //var data = $(this).data('no'); //console.log(data); //var boardNo =
 * parseInt($(this).data('no')); // 클릭한 타이틀의 번호를 Long 형으로 변환 //var boardNo =
 * $(this).data('no'); // 클릭한 타이틀의 번호를 가져옵니다. // 단 클릭한 번호는 문자로 되어있기 때문에 데이터베이스의 //
 * 값을 Long타입으로 되어있기 때문에 에러가 발생한다. //그래서 Long형으로 변환해서 가져가야된다. // 클릭된 타이틀의 부모 요소인
 * <tr>을 선택하여 해당 <tr>에서 list.no 값을 찾습니다. var boardNo =
 * $(this).closest('tr').find('td:first-child').text().trim();
 * 
 * boardNo = parseInt(boardNo);
 * 
 * 
 * console.log(boardNo); console.log(typeof boardNo); // AJAX 요청을 통해 상세 페이지의 내용을
 * 가져옵니다.
 * 
 * $.ajax({ url: '/board/detail1/' + boardNo, type: 'GET', dataType: 'html',
 * success: function(response) { console.log(response); var data =
 * JSON.parse(response); console.log(typeof data); // JSON 데이터를 HTML로 변환하여
 * 표시합니다. var htmlContent = '<table class="table table-boardered">';
 * htmlContent += '<tr><th>글번호</th><td>' + data.no + '</td></tr>';
 * htmlContent += '<tr><th>제목</th><td>' + data.title + '</td></tr>';
 * htmlContent += '<tr><th>작성자 번호</th><td>' + data.writerNo + '</td></tr>';
 * htmlContent += '<tr><th>내용</th><td>' + data.content + '</td></tr>';
 * htmlContent += '<tr><th>조회수</th><td>' + data.readCount + '</td></tr>';
 * htmlContent += '<tr><th>작성 시간</th><td>' + data.createDate + '</td></tr>'; //
 * 이하 필요한 데이터를 추가로 표시하도록 수정하세요. htmlContent += '</table>';
 * 
 * console.log(htmlContent); $('#modalContent').html(htmlContent); // 모달의 내용을
 * 가져온 페이지의 내용으로 설정합니다. $('#myModal').modal('show'); // 모달을 엽니다. }, error:
 * function(xhr, status, error) { console.error(xhr.responseText); // 에러가 발생한 경우
 * 콘솔에 에러 메시지를 출력합니다. } }); }); });
 * 
 */