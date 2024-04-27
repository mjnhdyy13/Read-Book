import React, { useEffect, useState } from "react";
import { mockData } from "../../apis/mockdata";
import { Link, useNavigate } from "react-router-dom";
const SpeechRecognitionComponent = () => {
  const [texts, setTexts] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [p, setP] = useState(document.createElement("p"));
  const navigate = useNavigate();
  const [volume, setVolume] = useState(0.5);
  var vole = 0.5;

  console.log("volume", volume);

  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

  //const [volume, setVolume] = useState(1.0);
  const commands = ["dừng đọc", "ngừng đọc", "tắt"];
  const grammar =
    "#JSGF V1.0; grammar commands; public <command> = " +
    commands.join(" | ") +
    " ;";
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  let speechUtterance = null;

  // Hàm để ngừng đọc
  const stopReading = () => {
    if (speechUtterance) {
      speechSynthesis.cancel(); // Hủy bỏ việc đọc hiện tại
    }
  };
  const handleVolume = (value) => {
    setVolume(value);
    vole = 1;
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance =
      window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    //setRecognition(recognition);

    const handleKeyDown = (event) => {
      if (event.key === "d") {
        console.log("dung doc");
        speechSynthesis.cancel();
        stopReading();
      }
      if (event.key === "s") {
        console.log("test");

        // Thiết lập sự điều chỉnh kích thước cho cửa sổ
        // let widthAdjustment = 100; // Điều chỉnh chiều rộng (trong pixels)
        // let heightAdjustment = 100; // Điều chỉnh chiều cao (trong pixels)

        // Thay đổi kích thước của cửa sổ hiện tại
        //window.resizeBy(widthAdjustment, heightAdjustment);
        //window.blur();
        // window.minimize();
        window.resizeTo(500, 300);
      }
      if (event.key === "g") {
        handleVolume(1);
        //respond("");
      }
      if (event.key === "q") {
        respond("Xin chào bạn");

        // Thiết lập sự điều chỉnh kích thước cho cửa sổ
        // let widthAdjustment = 100; // Điều chỉnh chiều rộng (trong pixels)
        // let heightAdjustment = 100; // Điều chỉnh chiều cao (trong pixels)

        // Thay đổi kích thước của cửa sổ hiện tại
        //window.resizeBy(widthAdjustment, heightAdjustment);
        //window.blur();
        // window.minimize();
      }
      if (event.key === "f") {
        if (window.parent && !window.parent.closed) {
          console.log("ffff");
          //window.parent.close(); // Đóng cửa sổ parent nếu có
          window.close();
        } else {
          console.log("ffffss");
          window.close(); // Đóng cửa sổ hiện tại nếu không có cửa sổ parent
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      recognition.removeEventListener("result", handleResult);
      recognition.removeEventListener("end", recognition.start);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // useEffect(() => {
  //   if (recognition) {
  //     recognition.addEventListener("result", handleResult);
  //     recognition.addEventListener("end", recognition.start);
  //     recognition.start();
  //   }
  // }, [recognition]);

  const handleResult = (e) => {
    setTexts([...texts, p]);
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log("ss", text);

    p.innerText = text;
    if (e.results[0].isFinal) {
      if (text.includes("Hello")) {
        console.log("ssd");
        respond("Không tìm thấy sách bạn đã yêu cầu");
      }
      if (text.includes("xin chào")) {
        respond("I am fine");
      }

      if (text.includes("tìm kiếm")) {
        // Sử dụng regular expression để tìm chuỗi đằng sau "tìm kiếm sách"
        const pattern = /tìm kiếm sách(.*)/; // Pattern này tìm chuỗi đằng sau "tìm kiếm sách"
        const match = text.match(pattern); // Tìm kết quả khớp với pattern
        if (match) {
          const result = match[1].trim(); // Lấy chuỗi kết quả và loại bỏ khoảng trắng ở đầu và cuối
          //respond(result);
          let found = false;
          mockData.books.forEach((book) => {
            // Kiểm tra xem tên cuốn sách có chứa chuỗi tìm kiếm hay không
            if (book.name.includes(result)) {
              // Nếu có, trả về tên cuốn sách đó
              console.log("sách");
              respond(book.name);
              found = true;
              navigate(`/book-detail?${book?.id}`);
              // Bạn cũng có thể trả về các thông tin khác của cuốn sách bằng cách thêm vào đây
              // respond(book);
              // hoặc có thể trả về một đoạn text mô tả cuốn sách
              // respond(book.description);
              // hoặc bất kỳ thông tin nào bạn muốn hiển thị
            }
          });
          if (!found) {
            respond("Không có kết quả phù hợp.");
          }
        }
      }
      if (text.includes("đọc sách")) {
        navigate("/read-book");
        const bookContent =
          "Ngày 7 tháng 5 năm 1931  (New York) được mục kích một cuộc săn người sôi nổi chưa từng thấy. Một trăm năm mươi lính công an bao vây một căn phố để bắt tên y cũng mang hai cây súng sáu trong mình. Họ leo lên mái nhà chung quanh, dùng hơi cay và trong hơn một tiếng đồng hồ, cả một khu mỹ lệ nhất của Nữu Ước vang lên tiếng súng và tiếng lạch tạch của liên thinh. Crowley núp sau chiếc ghế đệm bông, bắn lại lính không ngừng";

        //     const bookContent = `Ngày 7 tháng 5 năm 1931, mười ngàn người ở chân thành Nữu Ước (New York) được mục kích một cuộc săn người sôi nổi chưa từng thấy. Một trăm năm mươi lính công an bao vây một căn phố để bắt tên y cũng mang hai cây súng sáu trong mình. Họ leo lên mái nhà chung quanh, dùng hơi cay và trong hơn một tiếng đồng hồ, cả một khu mỹ lệ nhất của Nữu Ước vang lên tiếng súng và tiếng "lạch tạch" của liên thinh. Crowley núp sau chiếc ghế đệm bông, bắn lại lính không ngừng.
        // Khi bắt được y rồi, viên giám đốc công an tuyên bố: "Nó vào hạng tội nhân nguy hiểm nhất. Nó muốn giết người là giết, không vì một lý do gì hết".
        // Nhưng còn chính tội nhân, Crowley, y tự xét y ra sao? Muốn biét, bạn hãy đọc hàng sau này mà y vừa chống cự với lính vừa viết để lại cho đời "Dưới lớp áp này, trái tim ta đập, chán ngán, nhưng thương người, không muốn làm hại một ai hết".
        // Không muốn làm hại ai hết!Vậy mà trước đó mấy ngày, khi một người lính công an lại gần y để hỏi y giấy phép lái xe hơi, thì y xả ngay một loạt súng, giết người đó tức thì. Một kẻ sát nhân không gớm máu như vậy mà còn tự khoe: "Trái tim thương người, không muốn làm hại một ai hết!".
        // Trước khi lên ngồi ghế điện để chịu tử hình tại khám Sing Sing, y còn than: "Tôi chỉ tự vệ mà người ta xử tôi như vậy đó".
        // Nghĩa là trong thâm tâm y, y nhất định không chịu nhận y có tội.
        // Bạn sẽ nói: "Thì chỉ có nó nghĩ thế, chứ còn ai lạ đời như vậy nữa".
        // Không đâu, thưa bạn: kẻ thù số một của nước Mỹ. Al Copone, tên đầu đảng ăn cướp đã làm cho châu thành Chicago kinh khủng, cũng nói: "Ta đã dùng những năm tươi đẹp nhất trong đời ta để mua vui cho thiên hạ, vậy mà phần thưởng chỉ là bị chửi và bị săn bắn như con thú dữ".
        // Mà cả Dutch Schluts, một trong những tên cướp lợi hại nhất ở Nữu Ước cũng tuyên bố với một ký giả rằng y là ân nhân của thiên hạ.
        // Viên Giám đốc khám Sing Sing, ông Lawes, viết "ở Sing Sing, những tội nhân đều tự cho họ cũng có tâm trạng thong thường khác đời chi hết. Cũng lý luận, giảng giải, tại sao chúng bị bắt buộc phải cạy tủ sắt hoặc bóp cò... và tuyến bố rằng bỏ tù chúng thật là bất công".
        // Nếu ba tên cướp đó và bọn khốn nạn đường nằm trong khám, tự cho mình vô tội như vậy thì những người mà chúng ta gặp mỗi ngày, ở ngoài đường, cả các bạn nữa, cả tôi nữa, chúng ta ra sao?
        // Cho nên ông John Wannamaker, một thương gia lớn, có lần đã tự thú: "Từ 30 năm nay, tôi đã hiểu rằng: sự chỉ trích chẳng ích lợi gì hết". ÔNg đã sớm hiểu bài học đó. Riêng tôi, tôi đã phải phấn đấu trong một phần ba thế kỷ trước khi thấy ló ra ánh sáng của chân lý này; "Dù người ta có lỗi nặng tới đâu, thì trong 100 lần, có tới 99 lần người ta cũng tự cho là vô tội".`;
        respond(bookContent);
      }
      recognition.grammars = speechRecognitionList;
      if (
        text.includes("dừng đọc") ||
        text.includes("ngừng đọc") ||
        text.includes("tắt")
      ) {
        console.log("dừng đọc11111");
        speechSynthesis.cancel();
        stopReading();
        return;
      }
      if (text.includes("tăng âm lượng")) {
        setVolume(volume + 0.2); // Tăng âm lượng thêm 20%
        respond("Âm lượng đã được tăng lên.");
      }
      if (text.includes("giảm âm lượng")) {
        setVolume(volume - 0.2); // Giảm âm lượng đi 20%
        respond("Âm lượng đã được giảm đi.");
      }
      if (text.includes("thoát chương trình")) {
        respond("Chương trình sẽ thoát trong một vài giây.");
        setTimeout(() => {
          window.close(); // Đóng trang web
        }, 2000); // Đợi 2 giây trước khi đóng
      }

      if (text.includes("alo")) {
        console.log("lskdjfl");
        respond("Không tìm thấy sách bạn đã yêu cầu");
      }
      if (text.includes("how are you")) {
        respond("I am fine");
      }
      setP(document.createElement("p"));
    }
  };

  const respond = (answer) => {
    const reply = new SpeechSynthesisUtterance(answer);
    reply.lang = "vi-VN";
    reply.volume = vole;
    console.log(vole);
    speechSynthesis.speak(reply);
    // const newP = document.createElement("p");
    // newP.classList.add("replay");
    // newP.innerText = "My Name is Cifar";
    // setTexts([...texts, newP]);
  };

  // return (
  //   <div className="texts">
  //     {texts.map((element, index) => (
  //       <React.Fragment key={index}>{element}</React.Fragment>
  //     ))}
  //   </div>
  // );
};

export default SpeechRecognitionComponent;
