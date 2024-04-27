import { useEffect, useState } from "react";
import {
  Rating,
  Box,
  Typography,
  Button,
  Avatar,
  Breadcrumbs,
  Link,
  Grid,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import reviewApi from "../../apis/reviewApi";
import { mockData } from "../../apis/mockdata";
// import { SpeechRecognitionComponent } from "../../components/SpeechRecognition/re";

function ReadBook() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  var bookId = window.location.search.substring(1);
  const [book, setBook] = useState(mockData?.books[0]);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(3);

  function handleShowMoreClick() {
    setShowMore(showMore + 3);
  }
  function handleClickView() {}
  function handleClickAdd() {}

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#363636" : "#E6E6FA",
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: "80%" },
            height: "100%",
            overflow: "hidden",
            mt: 2,
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/genre-detail">
              Danh sách
            </Link>
            <Link underline="hover" color="inherit" href="/book-detail">
              Thông tin sách
            </Link>
            <Typography color="text.primary">Chương 1</Typography>
          </Breadcrumbs>
          <Box>
            <Box gap={1} display={"flex"} flexDirection={"column"}>
              <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
                {book?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                    bgcolor: "#1E90FF",
                  }}
                  onClick={handleClickView}
                >
                  Chương trước
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                  onClick={handleClickAdd}
                >
                  Danh sách
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                  onClick={handleClickAdd}
                >
                  Chương tiếp
                </Button>
              </Box>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle1"
                  fontSize={{ xs: 24, sm: 26, md: 28 }}
                  fontFamily={"revert-layer"}
                  letterSpacing={1}
                  lineHeight={2}
                >
                  Ngày 7 tháng 5 năm 1931, mười ngàn người ở chân thành Nữu Ước
                  (New York) được mục kích một cuộc săn người sôi nổi chưa từng
                  thấy. Một trăm năm mươi lính công an bao vây một căn phố để
                  bắt tên y cũng mang hai cây súng sáu trong mình. Họ leo lên
                  mái nhà chung quanh, dùng hơi cay và trong hơn một tiếng đồng
                  hồ, cả một khu mỹ lệ nhất của Nữu Ước vang lên tiếng súng và
                  tiếng "lạch tạch" của liên thinh. Crowley núp sau chiếc ghế
                  đệm bông, bắn lại lính không ngừng. Khi bắt được y rồi, viên
                  giám đốc công an tuyên bố: "Nó vào hạng tội nhân nguy hiểm
                  nhất. Nó muốn giết người là giết, không vì một lý do gì hết".
                  Nhưng còn chính tội nhân, Crowley, y tự xét y ra sao? Muốn
                  biét, bạn hãy đọc hàng sau này mà y vừa chống cự với lính vừa
                  viết để lại cho đời "Dưới lớp áp này, trái tim ta đập, chán
                  ngán, nhưng thương người, không muốn làm hại một ai hết".
                  Không muốn làm hại ai hết!Vậy mà trước đó mấy ngày, khi một
                  người lính công an lại gần y để hỏi y giấy phép lái xe hơi,
                  thì y xả ngay một loạt súng, giết người đó tức thì. Một kẻ sát
                  nhân không gớm máu như vậy mà còn tự khoe: "Trái tim thương
                  người, không muốn làm hại một ai hết!". Trước khi lên ngồi ghế
                  điện để chịu tử hình tại khám Sing Sing, y còn than: "Tôi chỉ
                  tự vệ mà người ta xử tôi như vậy đó". Nghĩa là trong thâm tâm
                  y, y nhất định không chịu nhận y có tội. Bạn sẽ nói: "Thì chỉ
                  có nó nghĩ thế, chứ còn ai lạ đời như vậy nữa". Không đâu,
                  thưa bạn: kẻ thù số một của nước Mỹ. Al Copone, tên đầu đảng
                  ăn cướp đã làm cho châu thành Chicago kinh khủng, cũng nói:
                  "Ta đã dùng những năm tươi đẹp nhất trong đời ta để mua vui
                  cho thiên hạ, vậy mà phần thưởng chỉ là bị chửi và bị săn bắn
                  như con thú dữ". Mà cả Dutch Schluts, một trong những tên cướp
                  lợi hại nhất ở Nữu Ước cũng tuyên bố với một ký giả rằng y là
                  ân nhân của thiên hạ. Viên Giám đốc khám Sing Sing, ông Lawes,
                  viết "ở Sing Sing, những tội nhân đều tự cho họ cũng có tâm
                  trạng thong thường khác đời chi hết. Cũng lý luận, giảng giải,
                  tại sao chúng bị bắt buộc phải cạy tủ sắt hoặc bóp cò... và
                  tuyến bố rằng bỏ tù chúng thật là bất công". Nếu ba tên cướp
                  đó và bọn khốn nạn đường nằm trong khám, tự cho mình vô tội
                  như vậy thì những người mà chúng ta gặp mỗi ngày, ở ngoài
                  đường, cả các bạn nữa, cả tôi nữa, chúng ta ra sao? Cho nên
                  ông John Wannamaker, một thương gia lớn, có lần đã tự thú: "Từ
                  30 năm nay, tôi đã hiểu rằng: sự chỉ trích chẳng ích lợi gì
                  hết". ÔNg đã sớm hiểu bài học đó. Riêng tôi, tôi đã phải phấn
                  đấu trong một phần ba thế kỷ trước khi thấy ló ra ánh sáng của
                  chân lý này; "Dù người ta có lỗi nặng tới đâu, thì trong 100
                  lần, có tới 99 lần người ta cũng tự cho là vô tội".
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                    bgcolor: "#1E90FF",
                  }}
                  onClick={handleClickView}
                >
                  Chương trước
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                  onClick={handleClickAdd}
                >
                  Danh sách
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                  onClick={handleClickAdd}
                >
                  Chương tiếp
                </Button>
              </Box>
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Bình luận và đánh giá
              </Typography>
              {reviews?.slice(0, showMore).map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    borderRadius: 3,
                    width: "100%",
                    gap: 2,
                    alignItems: "center",
                    mt: 3,
                  }}
                >
                  <Avatar>{review?.customerId}</Avatar>
                  <Box sx={{}}>
                    <Typography variant="subtitle1">
                      User {review?.customerId}
                    </Typography>
                    <Typography variant="body1">{review?.comment}</Typography>
                  </Box>
                </Box>
              ))}
              {reviews.length > showMore && (
                <Button
                  onClick={handleShowMoreClick}
                  sx={{ color: "gray", "&:hover": { bgcolor: "darkgray" } }}
                >
                  Show More
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ReadBook;
