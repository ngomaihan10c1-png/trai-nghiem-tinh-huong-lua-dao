// Kịch bản chi tiết 4 Level tình huống lừa đảo mạng thực tế cho G7 Simulator
// Thiết kế hội thoại 2 nhân vật chat qua lại chân thực như đời sống thực tế
window.STORY_DATA = {
  chapters: [
    {
      number: 1,
      title: "Bẫy Trúng Thưởng TMĐT & Dụ Dỗ Chuyển Phí",
      subtitle: "Kịch bản tương tác 5 giai đoạn, 3 chỉ số theo dõi và 10 kết thúc khác nhau",
      sender: {
        name: "CSKH Sàn TMĐT",
        avatar: "assets/avatar_scammer.png",
        warningText: "Tin nhắn SMS mồi trúng thưởng • SĐT lạ chưa xác thực"
      },
      dialogues: [
        // ================= GIAI ĐOẠN 1: TIN NHẮN TRÚNG THƯỞNG =================
        {
          id: "step1_sms",
          speaker: "them",
          headerWarning: "📱 Hộp thư SMS gửi đến SĐT: {phone}",
          text: "Chúc mừng {honorific} đã trúng giải Nhất chương trình Tri ân năm 2026!\n{Honorific} vui lòng liên hệ nhân viên hỗ trợ qua Zalo để làm thủ tục nhận thưởng.\nThời hạn xác nhận là trước 17h hôm nay. Sau thời gian này, giải thưởng sẽ được chuyển cho người khác.",
          choices: [
            {
              text: "1A. Xóa tin nhắn, không tương tác",
              type: "good",
              deltaTrust: -20,
              deltaRisk: 0,
              reason: "Xóa tin nhắn mồi lừa đảo, kiên quyết không tương tác với đối tượng lạ",
              nextId: "end1_action"
            },
            {
              text: "1B. Liên hệ Zalo theo hướng dẫn",
              type: "bad",
              deltaTrust: +30,
              deltaRisk: +10,
              reason: "Tò mò làm theo tin nhắn mồi và liên hệ Zalo theo hướng dẫn",
              nextId: "step2_zalo_intro"
            },
            {
              text: "1C. Tự tìm ứng dụng hoặc website chính thức của sàn để kiểm tra",
              type: "good",
              deltaTrust: -10,
              deltaRisk: 0,
              reason: "Chủ động kiểm tra chéo độc lập trên ứng dụng chính thống của sàn TMĐT",
              nextId: "step1c_checked_app"
            }
          ]
        },
        {
          id: "end1_action",
          speaker: "me",
          text: "Tôi không tham gia chương trình nào cả. Đây chắc chắn là tin nhắn lừa đảo trúng thưởng để dụ dỗ! (Đã xóa tin nhắn và chặn số)",
          nextId: "end1_ending"
        },
        {
          id: "end1_ending",
          speaker: "system",
          text: "🛡️ Bạn đã xóa tin nhắn và chặn đối tượng ngay từ đầu, bảo vệ an toàn 100% tài sản và thông tin cá nhân!",
          isEnd: true,
          status: "win",
          endingCode: "ENDING 1",
          endingTitle: "THOÁT BẪY TỪ ĐẦU",
          summaryConclusion: "Người chơi không tương tác với tin nhắn lạ. Không phát sinh thiệt hại tài chính hay rò rỉ thông tin từ cuộc trò chuyện.\n\n(Bạn đã xuất sắc nhận diện dấu hiệu lừa đảo ngay từ đầu! Không có bất kỳ tương tác nào với kẻ gian, bảo vệ an toàn 100% dữ liệu cá nhân và tài sản trong tài khoản.)",
          warningSigns: "• Tin nhắn trúng thưởng bất ngờ từ số lạ dù không tham gia sự kiện.\n• Yêu cầu liên hệ qua kênh không chính thống (Zalo cá nhân).\n• Tạo cảm giác khẩn cấp (hạn chót 17h hôm nay) để ép nạn nhân hành động vội vã.",
          lesson: "Tin nhắn báo trúng thưởng bất ngờ, không rõ chương trình tham gia và có thời hạn gấp là dấu hiệu cần cảnh giác. Tuyệt đối không bấm link lạ hay liên hệ Zalo theo hướng dẫn."
        },
        {
          id: "step1c_checked_app",
          speaker: "me",
          text: "Tôi vừa mở ứng dụng sàn TMĐT chính thức để tra cứu hòm thư thông báo nhưng không hề tìm thấy bất kỳ thông tin trúng thưởng nào trong tài khoản cả!",
          choices: [
            {
              text: "C1: Liên hệ bộ phận hỗ trợ qua kênh chính thức và xác minh chương trình",
              type: "good",
              deltaTrust: -20,
              reason: "Liên hệ tổng đài CSKH chính thức trên ứng dụng để xác thực thông tin",
              nextId: "step1c_call_support"
            },
            {
              text: "C2: Cho rằng hệ thống chưa cập nhật nên vẫn nhắn Zalo cho đối tượng",
              type: "bad",
              deltaTrust: +20,
              deltaRisk: +10,
              reason: "Dù app không có thông tin nhưng vẫn nhắn Zalo vì tiếc giải thưởng lớn",
              nextId: "step2_zalo_intro_c2"
            }
          ]
        },
        {
          id: "step1c_call_support",
          speaker: "me",
          text: "Tôi gọi lên hotline CSKH của sàn TMĐT: 'Alo tổng đài, tôi vừa nhận SMS báo trúng xe SH, muốn xác minh xem có chương trình này không ạ?'",
          nextId: "step1c_support_verify"
        },
        {
          id: "step1c_support_verify",
          speaker: "them",
          headerWarning: "📞 Tổng đài Chăm sóc Khách hàng Sàn TMĐT Chính Thức",
          text: "Dạ em chào {titleName}! Tổng đài xin xác nhận: Hiện tại sàn TMĐT KHÔNG tổ chức chương trình trao xe Honda SH qua tin nhắn SMS hay Zalo cá nhân. Đây là chiêu trò giả mạo thương hiệu để lừa đảo, {honorific} tuyệt đối không cung cấp thông tin hay chuyển tiền nhé!",
          nextId: "end1_official_verified"
        },
        {
          id: "end1_official_verified",
          speaker: "me",
          text: "Cảm ơn tổng đài! May mắn là tôi đã gọi xác minh trước khi hành động.",
          nextId: "end1_ending"
        },
        {
          id: "step2_zalo_intro_c2",
          speaker: "me",
          headerWarning: "💬 Chuyển sang khung chat Zalo • (Cảnh báo: App không có thông báo)",
          text: "Chào bạn, mình vừa kiểm tra trên app sàn TMĐT chưa thấy thông báo trúng xe SH. Bạn kiểm tra lại giúp mình mã số nhé.",
          nextId: "step2_scammer_intro"
        },
        {
          id: "step2_zalo_intro",
          speaker: "me",
          headerWarning: "💬 Màn hình giao diện khung chat Zalo",
          text: "Chào bạn, mình nhận được tin nhắn SMS báo trúng thưởng xe máy Honda SH 125i.\nMình tên {name}, SĐT {phone}.\nCho mình hỏi thủ tục nhận thưởng như thế nào vậy ạ?",
          nextId: "step2_scammer_intro"
        },

        // ================= GIAI ĐOẠN 2: THU THẬP THÔNG TIN CÁ NHÂN =================
        {
          id: "step2_scammer_intro",
          speaker: "them",
          headerWarning: "💬 Khung chat Zalo • Nhân viên sàn TMĐT",
          text: "Em là nhân viên chăm sóc khách hàng của sàn TMĐT.\nEm đã kiểm tra mã trúng thưởng và xác nhận {titleName} nhận được xe SH 125i.\n{Honorific} gửi giúp em ảnh hai mặt CCCD để lập hồ sơ nhận thưởng nhé.",
          choices: [
            {
              text: "2A. Hỏi lại về việc xác minh",
              type: "good",
              deltaTrust: -10,
              reason: "Đặt câu hỏi cảnh giác về việc yêu cầu gửi ảnh CCCD qua ứng dụng Zalo cá nhân",
              nextId: "step2a_ask_verify"
            },
            {
              text: "2B. Gửi ảnh CCCD",
              type: "bad",
              deltaTrust: +30,
              deltaRisk: +50,
              hasCccdAttachment: true,
              setState: { hasSentCccd: true },
              reason: "Gửi ảnh thẻ CCCD chính chủ hai mặt cho người lạ trên mạng xã hội",
              nextId: "step2b_sent_cccd"
            },
            {
              text: "2C. Từ chối gửi CCCD nhưng vẫn tiếp tục trò chuyện",
              type: "good",
              deltaTrust: 0,
              reason: "Từ chối cung cấp thẻ CCCD tùy thân nhưng vẫn giữ liên lạc",
              nextId: "step2c_refuse_cccd"
            }
          ]
        },
        {
          id: "step2a_ask_verify",
          speaker: "me",
          text: "Tại sao nhận thưởng lại cần gửi CCCD qua Zalo? Tôi có thể kiểm tra trên ứng dụng chính thức không?",
          nextId: "step2a_scammer_pressures"
        },
        {
          id: "step2a_scammer_pressures",
          speaker: "them",
          text: "Dạ, đây là thủ tục bắt buộc đối với giải thưởng giá trị lớn.\nNếu {honorific} không hoàn thành hôm nay, hệ thống có thể hủy giải.\nEm đang hỗ trợ riêng cho {honorific} nên {honorific} cứ yên tâm ạ.",
          choices: [
            {
              text: "A1: Dừng trò chuyện và tự xác minh qua kênh chính thức",
              type: "good",
              deltaTrust: -30,
              reason: "Nhận diện dấu hiệu thúc ép, dừng trò chuyện và tự kiểm tra kênh chính thống",
              nextId: "end2_action_a1"
            },
            {
              text: "A2: Tin lời giải thích vì sợ mất giải",
              type: "bad",
              deltaTrust: +40,
              deltaRisk: +50,
              hasCccdAttachment: true,
              setState: { hasSentCccd: true },
              reason: "Bị thao túng tâm lý sợ mất phần thưởng nên đồng ý gửi CCCD",
              nextId: "step2b_sent_cccd"
            },
            {
              text: "A3: Yêu cầu đối tượng cung cấp thông tin chương trình và đơn vị tổ chức để kiểm tra",
              type: "good",
              deltaTrust: -20,
              reason: "Yêu cầu giấy phép và thông tin pháp lý của chương trình trúng thưởng",
              nextId: "step2a_demand_docs"
            }
          ]
        },
        {
          id: "end2_action_a1",
          speaker: "me",
          text: "Tôi thấy quy trình này quá mờ ám. Tôi dừng cuộc trò chuyện ở đây và sẽ gọi trực tiếp lên tổng đài chính thức để kiểm tra!",
          nextId: "end2_ending"
        },
        {
          id: "step2a_demand_docs",
          speaker: "me",
          text: "Trước khi gửi CCCD, bạn phải cung cấp đầy đủ thông tin chương trình và văn bản chứng từ pháp lý của đơn vị tổ chức cho tôi kiểm tra!",
          nextId: "step2a_scammer_fake_doc"
        },
        {
          id: "step2a_scammer_fake_doc",
          speaker: "them",
          headerWarning: "📄 Kẻ gian gửi tài liệu scan giả mạo • Dấu đỏ scan Photoshop",
          text: "Dạ có ngay ạ! Em gửi {titleName} đầy đủ chứng từ của Tập đoàn:\n1. Công văn Quyết định Trao giải số 2026/QĐ-TRIAN có con dấu đỏ tròn của Tổng Giám đốc Sàn TMĐT.\n2. Bản scan Giấy phép đăng ký chương trình khuyến mại mang mã số BCT-2026/SH.\n3. Ảnh Thẻ nhân viên chăm sóc khách hàng mang tên em.\nChứng từ pháp lý rõ ràng thế này thì {honorific} hoàn toàn an tâm gửi ảnh hai mặt CCCD để em lập hồ sơ nhận xe nhé!",
          choices: [
            {
              text: "Tra cứu độc lập số công văn và con dấu trên Cổng thông tin Bộ Công Thương",
              type: "good",
              deltaTrust: -30,
              reason: "Chủ động kiểm tra chéo tính pháp lý của chứng từ, phát hiện công văn và con dấu Photoshop giả mạo",
              nextId: "end2_action_a3_verify"
            },
            {
              text: "Thấy có công văn dấu đỏ và thẻ nhân viên nên tin tưởng gửi ảnh CCCD",
              type: "bad",
              deltaTrust: +40,
              deltaRisk: +50,
              hasCccdAttachment: true,
              setState: { hasSentCccd: true },
              reason: "Bị đánh lừa bởi tài liệu và con dấu đỏ scan giả mạo nên đồng ý gửi CCCD",
              nextId: "step2b_sent_cccd"
            }
          ]
        },
        {
          id: "end2_action_a3_verify",
          speaker: "me",
          text: "Tôi vừa tra cứu trên Cổng thông tin Cục Xúc tiến Thương mại (Bộ Công Thương): Hoàn toàn không có mã quyết định này! Con dấu tròn và chữ ký trên văn bản của bạn đều là cắt ghép Photoshop! Đây là hành vi làm giả con dấu cơ quan nhà nước, tôi lưu bằng chứng và báo cơ quan công an!",
          nextId: "end2_ending"
        },
        {
          id: "end2_ending",
          speaker: "system",
          text: "🔍 Bạn đã kiểm tra chéo và phát hiện con dấu giả mạo, kịp thời dừng lại và báo cơ quan chức năng!",
          isEnd: true,
          status: "win",
          endingCode: "ENDING 2",
          endingTitle: "PHÁT HIỆN BẤT THƯỜNG",
          summaryConclusion: "Người chơi xác minh chương trình qua kênh chính thức và phát hiện không có thông tin trúng thưởng tương ứng. Bạn đã kịp thời dừng lại, bảo toàn 50.000.000 VNĐ.",
          warningSigns: "• Đòi chụp hai mặt CCCD gửi qua Zalo cá nhân thay vì nộp trên cổng thông tin bảo mật.\n• Đe dọa 'hủy giải' nếu không làm theo ngay để khiến nạn nhân hoảng sợ.\n• Làm giả công văn, quyết định trao giải và con dấu tròn scan Photoshop tinh vi.",
          lesson: "Không gửi giấy tờ cá nhân chỉ vì một người tự xưng là nhân viên yêu cầu. Mọi chương trình trúng thưởng lớn đều có văn bản công khai và quy trình xác minh minh bạch tại trụ sở hoặc kênh chính thức."
        },
        {
          id: "step2b_sent_cccd",
          speaker: "me",
          hasCccdAttachment: true,
          text: "Vâng, để em gửi ảnh CCCD cho bạn làm hồ sơ.",
          nextId: "step2b_scammer_received"
        },
        {
          id: "step2b_scammer_received",
          speaker: "them",
          text: "Cảm ơn {titleName}, em đã nhận đủ hồ sơ CCCD {cccd} của {honorific}.\nBây giờ em sẽ hướng dẫn {honorific} bước cuối cùng để hoàn tất nhận xe ạ.",
          nextId: "step3_demand_fee"
        },
        {
          id: "step2c_refuse_cccd",
          speaker: "me",
          text: "Mình không tiện chụp ảnh CCCD gửi qua Zalo đâu bạn ơi.",
          nextId: "step2c_scammer_otp"
        },
        {
          id: "step2c_scammer_otp",
          speaker: "them",
          text: "{TitleName} không cần lo, em chỉ cần thông tin để hoàn thiện hồ sơ thôi ạ.\nNếu {honorific} chưa tiện gửi ảnh, {honorific} cho em xin mã OTP vừa gửi về máy để xác nhận tài khoản trước nhé.",
          choices: [
            {
              text: "C1: Từ chối cung cấp OTP và chặn đối tượng",
              type: "good",
              deltaTrust: -40,
              reason: "Nhận biết bẫy chiếm đoạt tài khoản bằng mã OTP và lập tức chặn đối tượng",
              nextId: "end2_refuse_otp"
            },
            {
              text: "C2: Cung cấp OTP vì nghĩ đây là bước xác minh thông thường",
              type: "bad",
              deltaTrust: +50,
              deltaRisk: +80,
              setState: { hasSentOtp: true },
              reason: "Đọc mã OTP ngân hàng/tài khoản cá nhân cho đối tượng lừa đảo",
              nextId: "step2c_sent_otp"
            },
            {
              text: "C3: Dừng lại, kiểm tra tài khoản và liên hệ kênh hỗ trợ chính thức",
              type: "good",
              deltaTrust: -30,
              reason: "Lập tức dừng trò chuyện và liên hệ kênh hỗ trợ chính thức",
              nextId: "end2_action_a1"
            }
          ]
        },
        {
          id: "end2_refuse_otp",
          speaker: "me",
          text: "Mã OTP là mã bảo mật ngân hàng cá nhân, tổng đài luôn ghi 'Không chia sẻ cho bất kỳ ai'! Bạn đòi OTP là lừa đảo rồi! (Đã chặn số)",
          nextId: "end2_ending"
        },
        {
          id: "step2c_sent_otp",
          speaker: "me",
          text: "Mã OTP của mình là 829104, bạn kiểm tra nhanh giúp mình nhé.",
          nextId: "step2c_scammer_got_otp"
        },
        {
          id: "step2c_scammer_got_otp",
          speaker: "them",
          text: "Dạ, em đã nhận được mã xác nhận. {Honorific} chờ em kiểm tra thêm một chút nhé.",
          nextId: "step2c_bank_alert"
        },
        {
          id: "step2c_bank_alert",
          speaker: "system",
          text: "🚨 [CẢNH BÁO BẢO MẬT KHẨN CẤP]\nHệ thống ngân hàng gửi thông báo: 'Tài khoản của bạn vừa được đăng nhập trên một thiết bị lạ (TP.HCM)! Đang có yêu cầu thiết lập lệnh trích nợ tự động!'",
          nextId: "step2c_branch_decide"
        },
        {
          id: "step2c_branch_decide",
          speaker: "them",
          text: "À {titleName} ơi, hệ thống bảo mật đang yêu cầu đồng bộ tài khoản để nhận tiền thưởng. {Honorific} cứ giữ nguyên phiên nhé.",
          choices: [
            {
              text: "C1: Đổi mật khẩu, kiểm tra phiên đăng nhập và liên hệ ngân hàng nếu có dấu hiệu liên quan đến tài khoản tài chính",
              type: "good",
              deltaTrust: -50,
              deltaRisk: -40,
              reason: "Kịp thời phát hiện dấu hiệu xâm nhập tài khoản, lập tức đổi mật khẩu và khóa thẻ",
              nextId: "end9_otp_lock"
            },
            {
              text: "C2: Tiếp tục làm theo hướng dẫn của đối tượng",
              type: "bad",
              deltaTrust: +40,
              reason: "Mặc kệ cảnh báo đăng nhập lạ, tiếp tục nghe theo lời đối tượng",
              nextId: "step2c_continue_wait"
            },
            {
              text: "C3: Gọi cho người thân để nhờ kiểm tra cùng",
              type: "good",
              deltaTrust: -40,
              deltaRisk: -40,
              reason: "Tham vấn người thân và được hỗ trợ khóa tài khoản ngăn chặn thiệt hại",
              nextId: "end9_relative_help"
            }
          ]
        },
        {
          id: "step2c_continue_wait",
          speaker: "me",
          text: "Vâng, em vẫn đang chờ bạn kiểm tra đồng bộ tài khoản đây ạ.",
          nextId: "step3_demand_fee"
        },
        {
          id: "end9_otp_lock",
          speaker: "me",
          text: "Tôi vừa gọi ngay lên hotline ngân hàng yêu cầu khóa khẩn cấp tài khoản và đổi toàn bộ mật khẩu! May mà chưa bị trừ tiền!",
          nextId: "end9_ending"
        },
        {
          id: "end9_relative_help",
          speaker: "me",
          text: "Người nhà tôi bảo mã OTP đó là để đổi mật khẩu và rút tiền! Tôi vừa khóa tài khoản và chặn bạn ngay lập tức!",
          nextId: "end9_ending"
        },
        {
          id: "end9_ending",
          speaker: "system",
          text: "⚠️ Bạn đã kịp thời đổi mật khẩu và khóa tài khoản ngân hàng, chặn đứng ý đồ rút sạch tiền của kẻ gian!",
          isEnd: true,
          status: "warning",
          endingCode: "ENDING 9",
          endingTitle: "HẠN CHẾ RỦI RO DỮ LIỆU",
          summaryConclusion: "Bạn đã mắc sai lầm nguy hiểm khi cung cấp mã OTP/thông tin nhạy cảm, nhưng đã kịp thời tỉnh ngộ thực hiện các biện pháp khẩn cấp (đổi mật khẩu, khóa tài khoản, gọi ngân hàng) để ngăn chặn kẻ gian chiếm đoạt tiền!",
          warningSigns: "• Yêu cầu mã OTP qua tin nhắn – đây là hành vi chiếm đoạt quyền kiểm soát tài khoản 100%.\n• Tin nhắn cảnh báo đăng nhập lạ từ hệ thống ngân hàng bị xem nhẹ.",
          lesson: "Không chia sẻ OTP, mật khẩu hoặc mã xác thực với bất kỳ ai, kể cả nhân viên ngân hàng hay công an. Nếu lỡ lộ, phải ngay lập tức khóa thẻ và đổi mật khẩu."
        },

        // ================= GIAI ĐOẠN 3: YÊU CẦU CHUYỂN PHÍ NHẬN THƯỞNG =================
        {
          id: "step3_demand_fee",
          speaker: "them",
          headerWarning: "⚠️ Phân nhánh quyết định • Yêu cầu chuyển 5.000.000đ",
          text: "Em đã nhận được thông tin hồ sơ của {titleName}.\nBước cuối cùng là đóng 5.000.000 VNĐ phí hồ sơ và thuế trước bạ vào STK: 00990099 (Ngân hàng XYZ - CONG TY TRAO THUONG).\n{Honorific} chuyển khoản xong, bên em sẽ hoàn lại 100% khi giao xe trong 2 ngày tới ạ.",
          choices: [
            {
              text: "3A. Từ chối chuyển tiền và yêu cầu xác minh",
              type: "good",
              deltaTrust: -20,
              reason: "Cảnh giác trước yêu cầu nạp tiền đóng thuế trước bạ vào tài khoản lạ",
              nextId: "step3a_refuse"
            },
            {
              text: "3B. Chuyển tiền lần đầu (Chuyển 5.000.000 VNĐ)",
              type: "bad",
              deltaTrust: +30,
              deltaMoney: -5000000,
              setState: { hasTransferredMoney: true, transferCount: 1 },
              reason: "Chuyển 5.000.000 VNĐ tiền phí đóng thuế/vận chuyển vào tài khoản kẻ lừa đảo",
              nextId: "step3b_transferred_1"
            }
          ]
        },
        {
          id: "step3a_refuse",
          speaker: "me",
          text: "Tại sao tôi phải chuyển tiền vào tài khoản này? Tôi sẽ kiểm tra với sàn trước.",
          nextId: "step3a_scammer_urge"
        },
        {
          id: "step3a_scammer_urge",
          speaker: "them",
          text: "{TitleName} đừng lo, đây là quy trình của công ty.\nNếu {honorific} chậm trễ, hệ thống sẽ hủy quyền nhận thưởng và chuyển cho người khác đấy ạ!",
          choices: [
            {
              text: "A1: Chặn đối tượng, lưu lại tin nhắn và báo cáo tài khoản",
              type: "good",
              deltaTrust: -40,
              reason: "Dứt khoát từ chối, lưu bằng chứng và chặn kẻ lừa đảo",
              nextId: "end3_action_a1"
            },
            {
              text: "A2: Liên hệ sàn qua ứng dụng hoặc website chính thức",
              type: "good",
              deltaTrust: -30,
              reason: "Kiểm tra chéo với kênh chính thống của sàn",
              nextId: "end3_action_a2"
            },
            {
              text: "A3: Tiếp tục thương lượng vì vẫn muốn nhận xe",
              type: "bad",
              deltaTrust: +20,
              reason: "Tiếc chiếc xe SH nên tìm cách thương lượng trừ phí vào giải thưởng",
              nextId: "step3a_negotiate"
            }
          ]
        },
        {
          id: "end3_action_a1",
          speaker: "me",
          text: "Không có chuyện trúng thưởng lại bắt nộp tiền trước! Tôi đã chụp màn hình lưu bằng chứng và chặn số này ngay lập tức!",
          nextId: "end3_check_cccd"
        },
        {
          id: "end3_action_a2",
          speaker: "me",
          text: "Tôi vừa tra cứu trên sàn chính hãng: Mọi khoản thuế trúng thưởng nếu có đều được khấu trừ tại chỗ hoặc nộp trực tiếp tại cơ quan thuế! Chào bạn!",
          nextId: "end3_check_cccd"
        },
        {
          id: "step3a_negotiate",
          speaker: "me",
          text: "Có thể trừ phí vào giá trị giải thưởng hoặc giao xe rồi thanh toán không?",
          nextId: "step3a_scammer_no_negotiate"
        },
        {
          id: "step3a_scammer_no_negotiate",
          speaker: "them",
          text: "Dạ, hệ thống không cho phép trừ trực tiếp vào giá trị giải thưởng.\n{Honorific} cần hoàn thành trước thời hạn để giữ quyền nhận xe.\nEm đã hỗ trợ {honorific} đến bước cuối cùng rồi, {honorific} cố gắng giúp em hoàn tất hồ sơ nhé.",
          choices: [
            {
              text: "A1: Nhận ra đối tượng đang tạo áp lực và dừng giao dịch",
              type: "good",
              deltaTrust: -30,
              reason: "Nhận ra đòn tâm lý ép buộc thời gian và dừng lại kịp thời",
              nextId: "end3_action_a1"
            },
            {
              text: "A2: Hỏi người thân hoặc bạn bè trước khi quyết định",
              type: "good",
              deltaTrust: -20,
              reason: "Tham khảo ý kiến người thân trước khi thực hiện chuyển tiền giá trị lớn",
              nextId: "step3a_ask_family"
            },
            {
              text: "A3: Tin rằng chỉ cần trả phí một lần là nhận được xe",
              type: "bad",
              deltaTrust: +40,
              deltaMoney: -5000000,
              setState: { hasTransferredMoney: true, transferCount: 1 },
              reason: "Mắc bẫy cam kết 'trả phí một lần nhận xe', chuyển 5.000.000đ",
              nextId: "step3b_transferred_1"
            }
          ]
        },
        {
          id: "step3a_ask_family",
          speaker: "system",
          text: "📞 BẠN GỌI ĐIỆN THOẠI HỎI Ý KIẾN NGƯỜI THÂN:\nNgười thân lập tức cảnh báo: 'Trúng thưởng xe máy gì mà bắt chuyển trước 5 triệu tiền phí vào số tài khoản lạ thế này! Không có sàn TMĐT nào bắt nộp thuế trước bạ qua Zalo cá nhân cả, lừa đảo 100% đấy con/{victimHonorific} ơi, tuyệt đối đừng chuyển tiền!'",
          choices: [
            {
              text: "Nghe lời người thân cảnh báo, quyết định dừng lại và xác minh độc lập",
              type: "good",
              deltaTrust: -30,
              reason: "Nghe lời khuyên sáng suốt của người thân, dừng giao dịch và kiểm tra độc lập",
              nextId: "end3_action_family_verified"
            },
            {
              text: "Cho rằng người thân lo xa thái quá, vẫn muốn chuyển 5.000.000đ để nhận xe SH",
              type: "bad",
              deltaTrust: +40,
              deltaMoney: -5000000,
              setState: { hasTransferredMoney: true, transferCount: 1 },
              reason: "Bỏ ngoài tai lời can ngăn của gia đình, chuyển 5 triệu cho kẻ lừa đảo",
              nextId: "step3b_transferred_1"
            }
          ]
        },
        {
          id: "end3_action_family_verified",
          speaker: "me",
          text: "Gia đình tôi đã cảnh báo và tôi đã gọi lên cơ quan chức năng xác minh: Đây là chiêu trò lừa đảo chuyển phí trước! Tôi dừng toàn bộ giao dịch tại đây và chặn tài khoản Zalo này!",
          nextId: "end3_check_cccd"
        },
        {
          id: "end3_check_cccd",
          speaker: "system",
          text: "Kiểm tra trạng thái bảo mật thông tin của bạn...",
          nextId: "end3_ending"
        },
        {
          id: "end3_ending",
          speaker: "system",
          text: "🛡️ Bạn đã kiên quyết từ chối chuyển phí nhận thưởng, bảo vệ nguyên vẹn 80.000.000 VNĐ trong tài khoản!",
          isEnd: true,
          status: "win",
          endingCode: "ENDING 3",
          endingTitle: "THẮNG LỢI HOÀN TOÀN",
          summaryConclusion: "Người chơi nhận diện dấu hiệu lừa đảo, không gửi thêm thông tin, không chuyển tiền và chủ động báo cáo tài khoản. Bạn đã bảo toàn nguyên vẹn 80.000.000 VNĐ!",
          warningSigns: "• Bắt chuyển tiền trước để nhận thưởng với lý do 'thuế trước bạ / phí hồ sơ'.\n• Hứa hẹn 'sẽ hoàn lại 100%' khi giao xe – lời hứa suông không có giá trị pháp lý.\n• Từ chối cho trừ phí vào giải thưởng hoặc thanh toán COD khi nhận hàng.",
          lesson: "Không bao giờ chuyển tiền cho người lạ để nhận thưởng. Mọi khoản thuế trúng thưởng hợp pháp đều chỉ nộp khi đã nhận được hiện vật/tiền và có biên lai thuế nhà nước."
        },

        // Nhánh 3B & 3C: Chuyển tiền & Vòng lặp nạp tiền
        {
          id: "step3b_transferred_1",
          speaker: "me",
          text: "Tôi vừa chuyển khoản 5.000.000 VNĐ vào STK 00990099 CONG TY TRAO THUONG rồi nhé. Bạn kiểm tra và xuất phiếu giao xe cho tôi.",
          nextId: "step3b_scammer_error_trap"
        },
        {
          id: "step3b_scammer_error_trap",
          speaker: "them",
          headerWarning: "⚠️ Kẻ gian báo lỗi hệ thống • Đòi thêm 5.000.000đ",
          text: "Em đã nhận được khoản phí của {titleName}.\nTuy nhiên, hệ thống đang báo hồ sơ bị lỗi cú pháp.\n{Honorific} cần chuyển thêm 5.000.000 VNĐ nữa để hoàn tất xác nhận và nhận lại toàn bộ 10.000.000 VNĐ cùng với xe SH sau đó ạ.",
          choices: [
            {
              text: "B1: Không chuyển thêm, lưu bằng chứng và liên hệ ngân hàng ngay",
              type: "good",
              deltaTrust: -40,
              reason: "Phát hiện dấu hiệu vòi vĩnh thêm tiền, dừng chuyển và liên hệ ngân hàng",
              nextId: "step3b_stop_b1"
            },
            {
              text: "B2: Yêu cầu hoàn tiền trước rồi mới làm tiếp",
              type: "good",
              deltaTrust: -10,
              reason: "Yêu cầu hoàn trả 5.000.000đ đã nộp trước khi làm bất kỳ thủ tục nào khác",
              nextId: "step3b_demand_refund"
            },
            {
              text: "B3: Tin lời giải thích và chuyển thêm tiền",
              type: "bad",
              deltaTrust: +40,
              deltaMoney: -5000000,
              setState: { transferCount: 2 },
              reason: "Tin lời hứa hoàn tiền, chuyển tiếp 5.000.000 VNĐ lần thứ hai",
              nextId: "step3c_loop_trap"
            },
            {
              text: "B4: Vay tiền người quen để đủ số tiền đối tượng yêu cầu",
              type: "bad",
              deltaTrust: +50,
              deltaMoney: -5000000,
              setState: { transferCount: 2 },
              reason: "Vay mượn người thân để nộp tiếp 5.000.000đ cho kẻ lừa đảo",
              nextId: "step3c_loop_trap_borrow"
            }
          ]
        },
        {
          id: "step3c_loop_trap_borrow",
          speaker: "me",
          text: "Tôi vừa phải chạy vạy vay bạn bè để nạp thêm 5 triệu nữa (tổng 10 triệu) vào STK 00990099 rồi đó! Bạn hoàn trả tiền và giao xe ngay cho tôi!",
          nextId: "step3c_scammer_third_demand"
        },
        {
          id: "step3b_demand_refund",
          speaker: "me",
          text: "Tôi không chuyển thêm gì hết! Lỗi của bên bạn thì bạn hoàn lại 5 triệu cho tôi trước đã!",
          nextId: "step3b_scammer_reject_refund"
        },
        {
          id: "step3b_scammer_reject_refund",
          speaker: "them",
          text: "Dạ hệ thống tự động khóa giao dịch rồi, em không can thiệp hoàn được nếu chưa nạp đủ khoản đối ứng ạ! {Honorific} nạp thêm thì mới lấy lại được cả 10 triệu chứ giờ dừng là mất trắng đấy ạ!",
          choices: [
            {
              text: "B1: Không chuyển thêm, lưu bằng chứng và liên hệ ngân hàng ngay",
              type: "good",
              deltaTrust: -40,
              reason: "Thà chấp nhận mất khoản tiền nhỏ còn hơn tiếp tục bị lừa thêm",
              nextId: "step3b_stop_b1"
            },
            {
              text: "B3: Tin lời giải thích và chuyển thêm tiền",
              type: "bad",
              deltaTrust: +40,
              deltaMoney: -5000000,
              setState: { transferCount: 2 },
              reason: "Tâm lý tiếc tiền cũ nên chuyển tiếp 5.000.000đ",
              nextId: "step3c_loop_trap"
            }
          ]
        },
        {
          id: "step3b_stop_b1",
          speaker: "me",
          text: "Rõ ràng là chiêu trò vòi tiền không đáy! Tôi dừng lại ngay tại đây, lưu lại toàn bộ sao kê và tin nhắn để báo công an!",
          nextId: "stage4_gateway_check"
        },
        {
          id: "step3c_loop_trap",
          speaker: "me",
          text: "Tôi vừa chuyển thêm 5.000.000đ nữa rồi (tổng cộng 10.000.000đ). Giờ xuất phiếu và hoàn tiền cho tôi đi!",
          nextId: "step3c_scammer_third_demand"
        },
        {
          id: "step3c_scammer_third_demand",
          speaker: "them",
          headerWarning: "⚠️ Vòng lặp nạp tiền • Đòi nạp lần 3",
          text: "Hệ thống vẫn chưa ghi nhận đúng cú pháp do ngân hàng bảo trì ạ.\n{TitleName} chuyển thêm một khoản 10.000.000 VNĐ nữa để kích hoạt mở khóa giao dịch.\nSau bước này, bộ phận kế toán sẽ hoàn lại toàn bộ 20 triệu cho {honorific}.",
          choices: [
            {
              text: "C1: Dừng mọi khoản chuyển tiếp và liên hệ ngân hàng",
              type: "good",
              deltaTrust: -50,
              reason: "Nhận ra cái bẫy không đáy, kiên quyết dừng lại dù đã mất 10 triệu",
              nextId: "step3c_stop_c1"
            },
            {
              text: "C2: Tiếp tục chuyển tiền vì muốn lấy lại khoản đã mất",
              type: "bad",
              deltaTrust: +50,
              reason: "Tiếp tục chuyển tiền trong mù quáng vì cay cú muốn gỡ lại tiền",
              nextId: "step3c_sent_third"
            },
            {
              text: "C3: Báo cho người thân và nhờ hỗ trợ xử lý",
              type: "good",
              deltaTrust: -40,
              reason: "Nhờ người thân can thiệp ngăn chặn không chuyển thêm tiền",
              nextId: "step3c_family_intervention"
            }
          ]
        },
        {
          id: "step3c_sent_third",
          speaker: "me",
          text: "Tôi vừa gom hết tiền chuyển thêm 10.000.000 VNĐ nữa rồi đấy, tổng cộng là 20 triệu rồi! Bạn hoàn lại toàn bộ tiền cho tôi ngay đi!",
          nextId: "step3c_scammer_vanishes"
        },
        {
          id: "step3c_stop_c1",
          speaker: "me",
          text: "Mỗi lần lại bịa ra một lý do mới! Tôi đã mất 10 triệu và tôi sẽ không chuyển thêm một đồng nào nữa! Tôi lập tức đến ngân hàng tra soát!",
          nextId: "stage4_gateway_check"
        },
        {
          id: "step3c_family_intervention",
          speaker: "me",
          text: "Gia đình tôi đã ngăn tôi lại! Bạn là kẻ lừa đảo chuyên nghiệp, tôi sẽ nộp hồ sơ này cho cơ quan điều tra!",
          nextId: "stage4_gateway_check"
        },
        {
          id: "step3c_scammer_vanishes",
          speaker: "them",
          headerWarning: "🚨 Đối phương đã chặn Zalo và biến mất",
          text: "⚠️ [THÔNG BÁO TỪ ỨNG DỤNG ZALO]\nNgười dùng này hiện không còn nhận tin nhắn từ bạn. Tài khoản đối phương đã bị xóa hoặc đổi số điện thoại.\nToàn bộ các khoản tiền bạn chuyển đã bị rút sạch!",
          nextId: "end5_ending"
        },
        {
          id: "end5_ending",
          speaker: "system",
          text: "💥 Kẻ gian đã chặn mọi liên lạc và tẩu tán toàn bộ số tiền bạn đã nạp qua các ví ảo!",
          isEnd: true,
          status: "lost",
          endingCode: "ENDING 5",
          endingTitle: "THIỆT HẠI TÀI CHÍNH",
          summaryConclusion: "Người chơi tiếp tục chuyển tiền theo yêu cầu. Đối tượng biến mất hoặc ngừng phản hồi. Người chơi không nhận được phần thưởng.\n\n(Bạn đã sập bẫy tâm lý chi phí chìm: Tiếp tục chuyển tiền nhiều lần theo yêu cầu của kẻ lừa đảo với hy vọng lấy lại khoản tiền đã mất. Kẻ gian sau đó lập tức chặn liên lạc và biến mất hoàn toàn!)",
          warningSigns: "• Bị yêu cầu chuyển tiền nhiều lần với các lý do: 'sai cú pháp', 'hồ sơ lỗi', 'mở khóa giao dịch'.\n• Lời hứa 'kế toán sẽ hoàn lại 100% tiền' sau khi nạp đủ.\n• Đối tượng thúc ép không cho thời gian suy nghĩ.",
          lesson: "Không chuyển thêm tiền chỉ để lấy lại tiền đã chuyển. Lời hứa hoàn tiền không phải bằng chứng giao dịch hợp pháp."
        },

        // ================= GIAI ĐOẠN 4: CHIÊU TRÒ HỖ TRỢ LẤY LẠI TIỀN =================
        {
          id: "stage4_gateway_check",
          speaker: "system",
          headerWarning: "🌐 Chuyển cảnh: 1 ngày sau • Tìm kiếm cách xử lý trên mạng",
          text: "🔍 [1 NGÀY SAU KHI BỊ LỪA MẤT TIỀN]\nBạn lên mạng xã hội tìm kiếm cách lấy lại tiền. Bạn phân vân bước tiếp theo:",
          choices: [
            {
              text: "Đăng bài hỏi hỗ trợ trên hội nhóm mạng xã hội",
              type: "bad",
              deltaTrust: +20,
              reason: "Đăng bài công khai tìm dịch vụ lấy lại tiền trên mạng",
              nextId: "stage4_post_forum"
            },
            {
              text: "Dừng lại hoàn toàn, lưu bằng chứng và tổng kết bài học",
              type: "good",
              deltaTrust: -30,
              reason: "Chấp nhận dừng thiệt hại ở mức hiện tại, không nghe theo dịch vụ lạ",
              nextId: "stage4_stop_loss"
            }
          ]
        },
        {
          id: "stage4_post_forum",
          speaker: "me",
          text: "Tôi đăng bài lên hội nhóm mạng xã hội: 'Mọi người ơi, em vừa bị lừa chuyển 10 triệu trúng xe SH, có anh chị nào biết cách lấy lại tiền không giúp em với ạ!'",
          nextId: "stage4_scammer2_message"
        },
        {
          id: "stage4_stop_loss",
          speaker: "me",
          text: "Tôi chấp nhận dừng lại hoàn toàn, lưu giữ bằng chứng và báo cơ quan chức năng, không nghe theo bất kỳ dịch vụ nào trên mạng nữa!",
          nextId: "end4_ending"
        },
        {
          id: "end4_ending",
          speaker: "system",
          text: "🛑 Bạn đã dũng cảm dừng lại đúng lúc, không nạp thêm tiền và bảo vệ được phần lớn tài sản còn lại!",
          isEnd: true,
          status: "lost",
          endingCode: "ENDING 4",
          endingTitle: "ĐÃ MẤT TIỀN NHƯNG DỪNG KỊP THỜI",
          summaryConclusion: "Người chơi đã chuyển tiền một lần nhưng không tiếp tục chuyển thêm. Người chơi lưu bằng chứng và liên hệ ngân hàng ngay. Khả năng thu hồi tiền chưa được bảo đảm.\n\n(Bạn đã bị lừa chuyển tiền một lần, nhưng đã kịp thời tỉnh ngộ nhận ra bẫy vòi tiền liên tục và dừng lại! Bạn đã bảo vệ được số tiền còn lại trong tài khoản.)",
          warningSigns: "• Kẻ gian bịa lý do 'lỗi hệ thống', 'sai cú pháp' để bắt nạp thêm tiền.\n• Hứa hẹn 'nạp xong sẽ trả lại toàn bộ tiền'.",
          lesson: "Không chuyển thêm tiền chỉ để lấy lại tiền đã chuyển. Lời hứa hoàn tiền không phải bằng chứng giao dịch hợp pháp."
        },
        {
          id: "stage4_scammer2_message",
          speaker: "them",
          headerWarning: "💬 Hội thoại với: Luật Sư Tuấn - Dịch Vụ Thu Hồi Vốn",
          text: "Chào {titleName}, em thấy chị đang gặp vấn đề chuyển tiền nhận thưởng bị treo.\nBên văn phòng luật sư công nghệ cao bên em có thể can thiệp cổng thanh toán, truy xuất giao dịch và lấy lại 100% tiền cho chị trong 24h.\nChị chỉ cần đóng một khoản phí xác minh hồ sơ 1.000.000 VNĐ trước để bên em khởi động phần mềm xử lý nhé.",
          choices: [
            {
              text: "4A. Từ chối trả thêm phí",
              type: "good",
              deltaTrust: -40,
              reason: "Cảnh giác trước bẫy 'thu hồi tiền lừa đảo đòi phí trước', kiên quyết từ chối",
              nextId: "end6_action_4a"
            },
            {
              text: "4B. Gửi thông tin giao dịch cho tài khoản lạ",
              type: "bad",
              deltaTrust: +30,
              deltaRisk: +30,
              reason: "Tiếp tục gửi sao kê và dữ liệu tài chính cho đối tượng thứ hai",
              nextId: "step4b_send_trans_info"
            },
            {
              text: "4C. Liên hệ ngân hàng và cơ quan chức năng qua kênh chính thức",
              type: "good",
              deltaTrust: -30,
              reason: "Tìm đến các cơ quan có thẩm quyền hợp pháp thay vì tin dịch vụ trên mạng",
              nextId: "end6_action_4c"
            }
          ]
        },
        {
          id: "end6_action_4a",
          speaker: "me",
          text: "Tôi vừa bị lừa một lần, các người đừng hòng lừa tôi lần hai! Không có dịch vụ thu hồi tiền nào bắt nộp phí trước cả! Tôi sẽ nộp thẳng đơn ra cơ quan công an!",
          nextId: "end6_ending"
        },
        {
          id: "end6_action_4c",
          speaker: "me",
          text: "Tôi đã gửi toàn bộ sao kê và mã giao dịch trực tiếp cho bộ phận chống gian lận của ngân hàng và cơ quan công an rồi. Cảm ơn bạn!",
          nextId: "end6_ending"
        },
        {
          id: "end6_ending",
          speaker: "system",
          text: "🛡️ Bạn đã tỉnh táo từ chối cái bẫy thu hồi tiền lừa đảo và phối hợp cùng cơ quan công an giải quyết!",
          isEnd: true,
          status: "warning",
          endingCode: "ENDING 6",
          endingTitle: "CHỦ ĐỘNG ỨNG PHÓ",
          summaryConclusion: "Người chơi ngừng tương tác, liên hệ ngân hàng và cơ quan chức năng qua kênh chính thức. Đây là kết thúc tích cực về khả năng ứng phó, dù kết quả xử lý chưa thể xác định ngay.\n\n(Dù đã mất tiền ở bước trước, bạn đã có thái độ xử lý rất tích cực: Tỉnh táo từ chối cái bẫy 'thu hồi vốn lừa đảo', chủ động thu thập bằng chứng và phối hợp với cơ quan chức năng có thẩm quyền!)",
          warningSigns: "• Các tài khoản 'Luật sư online', 'Hacker thu hồi nợ' chủ động nhắn tin khi thấy nạn nhân đăng bài cầu cứu.\n• Yêu cầu nộp 'phí hồ sơ / phí xác minh' trước khi xử lý.",
          lesson: "Cảnh giác với người yêu cầu trả phí trước để bảo đảm lấy lại tiền. Không có dịch vụ tư nhân nào có thể can thiệp thu hồi dòng tiền ngân hàng ngoại trừ cơ quan điều tra công an."
        },
        {
          id: "step4b_send_trans_info",
          speaker: "me",
          text: "Em gửi anh sao kê giao dịch vừa rồi, anh xem giúp em có lấy lại được không ạ?",
          nextId: "step4b_scammer_demands_fee"
        },
        {
          id: "step4b_scammer_demands_fee",
          speaker: "them",
          text: "Hồ sơ này bên anh lấy lại được 100% nhé! Em chỉ cần chuyển phí dịch vụ 1.000.000 VNĐ vào STK văn phòng luật sư là tiền sẽ hoàn về tài khoản em trong 2 tiếng tới.",
          choices: [
            {
              text: "B1: Dừng lại khi nhận ra dấu hiệu bất thường",
              type: "good",
              deltaTrust: -40,
              reason: "Kịp thời nhận ra dấu hiệu lừa đảo thu hồi vốn và dừng lại",
              nextId: "end6_action_4a"
            },
            {
              text: "B2: Tiếp tục vì hy vọng lấy lại tiền",
              type: "bad",
              deltaTrust: +40,
              deltaMoney: -1000000,
              reason: "Chuyển thêm 1.000.000đ cho kẻ mạo danh dịch vụ thu hồi tiền",
              nextId: "step4b_sent_fee_1m"
            }
          ]
        },
        {
          id: "step4b_sent_fee_1m",
          speaker: "me",
          text: "Em vừa chuyển 1.000.000đ phí dịch vụ vào STK văn phòng luật sư rồi ạ. Anh giúp em lấy lại tiền sớm nhé!",
          nextId: "end7_ending"
        },
        {
          id: "end7_ending",
          speaker: "system",
          text: "💥 Bạn đã bị lừa lần thứ 2 bởi dịch vụ 'thu hồi tiền treo' giả mạo trên mạng!",
          isEnd: true,
          status: "lost",
          endingCode: "ENDING 7",
          endingTitle: "BỊ LỪA LẦN THỨ HAI",
          summaryConclusion: "Sau khi mất tiền, người chơi tiếp tục tin một tài khoản hứa giúp lấy lại tiền nhưng yêu cầu phí trước.\n\n(Bạn đã bị sập bẫy lừa kép (Scam on Scam)! Sau khi mất tiền cho kẻ trúng thưởng SH, bạn lại tiếp tục tin một tài khoản mạo danh luật sư hứa lấy lại tiền và bị lừa mất thêm khoản phí thứ hai!)",
          warningSigns: "• Đánh vào tâm lý tuyệt vọng muốn gỡ lại tiền của nạn nhân.\n• Cam kết 'chắc chắn 100% lấy lại được' nhưng luôn bắt nộp phí trước.",
          lesson: "Cảnh giác với người yêu cầu trả phí trước để bảo đảm lấy lại tiền. Không có gì bảo đảm rằng tiền đã chuyển sẽ được thu hồi thành công."
        },

        // ================= GIAI ĐOẠN 5: HẬU QUẢ RÒ RỈ CCCD =================
        {
          id: "stage5_leak_cccd",
          speaker: "system",
          headerWarning: "🪪 Chuyển cảnh: 1 ngày sau • Tin nhắn từ người lạ",
          text: "⚠️ [1 NGÀY SAU KHI BẠN ĐÃ GỬI ẢNH CCCD]\nDù bạn đã từ chối chuyển 5 triệu tiền phí hôm trước, bất ngờ có một tài khoản lạ khác nhắn tin đến Zalo của bạn...",
          nextId: "stage5_scammer_message"
        },
        {
          id: "stage5_scammer_message",
          speaker: "them",
          headerWarning: "💬 Hội thoại: Nhân viên hỗ trợ hồ sơ (Tài khoản lạ)",
          text: "Hồ sơ CCCD {cccd} của {titleName} gửi hôm qua đang bị thiếu thông tin xác thực.\n{Honorific} gửi thêm ảnh chân dung chụp cầm CCCD trước ngực và làm theo hướng dẫn xác minh để bên em hoàn thiện hồ sơ nhé.",
          choices: [
            {
              text: "5A. Tiếp tục gửi thêm thông tin để hoàn thiện hồ sơ",
              type: "bad",
              deltaTrust: +30,
              deltaRisk: +50,
              hasCccdAttachment: true,
              hasPortraitAttachment: true,
              setState: { hasSentPortrait: true },
              reason: "Gửi trọn bộ ảnh CCCD và ảnh chân dung cầm thẻ cho đối tượng lừa đảo",
              nextId: "step5a_sent_portrait"
            },
            {
              text: "5B. Dừng liên lạc và kiểm tra các tài khoản liên quan",
              type: "good",
              deltaTrust: -40,
              deltaRisk: -30,
              reason: "Đổi mật khẩu, bật xác thực 2 lớp, theo dõi lịch sử tín dụng CIC và báo công an",
              nextId: "end9_action_5b"
            },
            {
              text: "5C. Chỉ xóa cuộc trò chuyện mà không thực hiện bước nào khác",
              type: "bad",
              deltaTrust: -10,
              reason: "Chỉ xóa tin nhắn trên máy mình mà không có biện pháp phòng ngừa rò rỉ danh tính",
              nextId: "step5c_delete_chat"
            }
          ]
        },
        {
          id: "step5a_sent_portrait",
          speaker: "me",
          hasCccdAttachment: true,
          hasPortraitAttachment: true,
          text: "Vâng, để em chụp ảnh chân dung cầm CCCD trước ngực gửi cho bạn làm hồ sơ nhé.",
          nextId: "end8_ending"
        },
        {
          id: "step5c_delete_chat",
          speaker: "me",
          text: "(Đã bấm xóa cuộc trò chuyện và chặn tài khoản Zalo này trên điện thoại)",
          nextId: "end10_ending"
        },
        {
          id: "end8_ending",
          speaker: "system",
          text: "💥 Kẻ gian đã chiếm đoạt trọn bộ hồ sơ eKYC gồm 2 mặt CCCD và ảnh chân dung của bạn!",
          isEnd: true,
          status: "lost",
          endingCode: "ENDING 8",
          endingTitle: "RỦI RO DỮ LIỆU TĂNG CAO",
          summaryConclusion: "Người chơi cung cấp thêm thông tin cá nhân, làm tăng nguy cơ bị giả mạo hoặc tiếp tục nhắm đến.",
          warningSigns: "• Tài khoản lạ thứ hai xuất hiện nắm rõ số CCCD bạn đã gửi hôm trước.\n• Đòi ảnh chân dung chụp cầm thẻ trước ngực – đây là thủ tục mở tài khoản ngân hàng eKYC.",
          lesson: "Xóa tin nhắn không có nghĩa là thông tin đã gửi được thu hồi. Nếu đã tiết lộ giấy tờ, hãy chủ động bảo vệ tài khoản và theo dõi dấu hiệu sử dụng thông tin trái phép. Tuyệt đối không gửi ảnh chân dung cầm CCCD cho người lạ."
        },
        {
          id: "end9_action_5b",
          speaker: "me",
          text: "Tôi biết các người dùng ảnh CCCD để mạo danh! Tôi đã đổi mật khẩu toàn bộ tài khoản, bật xác thực 2FA, đăng ký tra cứu CIC và báo cáo công an địa phương!",
          nextId: "end9_ending_5b"
        },
        {
          id: "end9_ending_5b",
          speaker: "system",
          text: "🛡️ Bạn đã nhanh chóng thực hiện các biện pháp khẩn cấp để vô hiệu hóa rủi ro rò rỉ dữ liệu CCCD!",
          isEnd: true,
          status: "win",
          endingCode: "ENDING 9",
          endingTitle: "HẠN CHẾ RỦI RO DỮ LIỆU",
          summaryConclusion: "Người chơi ngừng liên lạc, bảo vệ tài khoản và theo dõi các dấu hiệu bất thường sau khi đã gửi CCCD.",
          warningSigns: "• Bị kẻ gian gạ gẫm gửi thêm ảnh chân dung cầm thẻ để 'hoàn tất hồ sơ'.\n• Thấy tài khoản mới có cách nói chuyện tương tự đối tượng cũ.",
          lesson: "Nếu đã tiết lộ giấy tờ, hãy chủ động bảo vệ tài khoản và theo dõi dấu hiệu sử dụng thông tin trái phép."
        },
        {
          id: "end10_ending",
          speaker: "system",
          text: "⚠️ Bạn đã chặn tin nhắn nhưng chưa rà soát bảo mật tài khoản ngân hàng và thông tin cá nhân!",
          isEnd: true,
          status: "warning",
          endingCode: "ENDING 10",
          endingTitle: "THOÁT CUỘC TRÒ CHUYỆN NHƯNG CHƯA AN TOÀN HOÀN TOÀN",
          summaryConclusion: "Người chơi đã chặn đối tượng nhưng chưa kiểm tra các tài khoản hoặc giao dịch có liên quan. Game gợi ý người chơi thực hiện thêm các bước bảo vệ thông tin.",
          warningSigns: "• Lầm tưởng rằng 'xóa tin nhắn' trên điện thoại là đã thu hồi được ảnh đã gửi cho kẻ xấu.",
          lesson: "Xóa tin nhắn không có nghĩa là thông tin đã gửi được thu hồi. Nếu đã tiết lộ giấy tờ, hãy chủ động bảo vệ tài khoản và theo dõi dấu hiệu sử dụng thông tin trái phép."
        }
      ],
      lesson: "Chiêu trò thông báo trúng thưởng xe máy SH hoặc sổ tiết kiệm qua SMS rồi dụ dỗ kết bạn Zalo đóng 'phí thuế trước bạ' là thủ đoạn lừa đảo rất phổ biến. Không bao giờ gửi ảnh CCCD cho người lạ trên mạng xã hội và tuyệt đối không chuyển bất kỳ khoản tiền nào để nhận thưởng."
    },
    {
      number: 2,
      title: "Chiêu Trò Giả Danh Nhân Viên Ngân Hàng & Thẻ Tín Dụng",
      subtitle: "Thủ đoạn giả mạo cuộc gọi VoIP tổng đài, Zalo hỗ trợ và link web lừa đảo chiếm đoạt OTP",
      sender: {
        name: "Tổng đài VietBank (+024.3938.8888)",
        avatar: "assets/avatar_bank.svg",
        warningText: "📞 Cuộc gọi VoIP đầu số bàn cố định • Cảnh báo giả mạo ngân hàng"
      },
      dialogues: [
        // ================= GIAI ĐOẠN 1: TẠO TÂM LÝ HOẢNG LOẠN BẰNG BÁO ĐỘNG GIẢ MẠO =================
        {
          id: "lv2_g1_notice",
          speaker: "system",
          text: "📞 (Giao diện điện thoại hiển thị cuộc gọi đến từ đầu số bàn cố định: +024.3938.8888 - Tổng đài VietBank)",
          nextId: "lv2_g1_scammer_call1"
        },
        {
          id: "lv2_g1_scammer_call1",
          speaker: "them",
          senderName: "Hoàng - Tổng Đài Viên VietBank",
          avatar: "assets/avatar_bank.svg",
          text: "Alo, xin chào {honorific} {name} ạ!\n\nEm là Hoàng - là nhân viên bên ngân hàng VietBank, gọi từ Trung tâm Giám sát Giao dịch Thẻ Ngân hàng VietBank.\n\nEm gọi để xác minh khẩn cấp: Lúc 13h42 hôm nay, hệ thống ghi nhận thẻ tín dụng liên kết CCCD {cccd} của {titleName} vừa phát sinh giao dịch quẹt thẻ quốc tế trị giá 18.600.000 VNĐ tại trang web thương mại nước ngoài.\n\n{TitleName} cho em hỏi giao dịch này có phải do chính {honorific} thực hiện không ạ?",
          choices: [
            {
              text: "Hả?! Tôi không hề mua bán hay quẹt thẻ gì hết! Có khi nào tài khoản bị hack không em?",
              action: "chat_reply",
              deltaTrust: 15,
              reason: "Nghe thông báo trừ tiền bất ngờ từ đầu số tổng đài nên hoang mang",
              nextId: "lv2_g1_me_panicked"
            }
          ]
        },
        {
          id: "lv2_g1_me_panicked",
          speaker: "me",
          text: "Hả?! Tôi đang ở {address} mà!\nTôi không hề mua bán hay quẹt thẻ gì hết!\nCó khi nào tài khoản của tôi bị hack rồi không em?",
          nextId: "lv2_g1_scammer_reassure"
        },
        {
          id: "lv2_g1_scammer_reassure",
          speaker: "them",
          senderName: "Hoàng - Tổng Đài Viên VietBank",
          avatar: "assets/avatar_bank.svg",
          text: "Dạ {titleName} bình tĩnh nhé! Chân thành cáo lỗi cùng {honorific} vì sự cố này.\n\nDo hệ thống quét rủi ro tự động của VietBank đã kịp thời treo giữ giao dịch này lại, hiện tiền chưa bị trừ khỏi tài khoản, nhưng đang ở trạng thái \"Chờ quyết toán\".\n\nNếu trong vòng 15 phút tới không thực hiện \"Thao tác Đảo ngược Giao dịch\", hệ thống sẽ tự động trừ 18.600.000 VNĐ này vào tài khoản của {honorific}.",
          choices: [
            {
              text: "Thôi chết! Vậy giờ tôi phải làm sao? Em hủy giúp tôi ngay đi!",
              action: "chat_reply",
              deltaTrust: 20,
              reason: "Sợ bị trừ 18,6 triệu đồng nên nhờ đối tượng hủy giao dịch",
              nextId: "lv2_g1_me_ask_cancel"
            }
          ]
        },
        {
          id: "lv2_g1_me_ask_cancel",
          speaker: "me",
          text: "Thôi chết! Vậy giờ {victimHonorific} phải làm sao? Em hủy giúp {victimHonorific} ngay đi!",
          nextId: "lv2_g1_scammer_transfer"
        },
        {
          id: "lv2_g1_scammer_transfer",
          speaker: "them",
          senderName: "Hoàng - Tổng Đài Viên VietBank",
          avatar: "assets/avatar_bank.svg",
          text: "Dạ được ạ. Em sẽ chuyển máy sang cuộc gọi bảo mật cho Chuyên viên Kỹ thuật tên Lâm để hỗ trợ {honorific} hủy lệnh gấp nhé. {Honorific} vui lòng không cúp máy.",
          nextId: "lv2_g2_notice_transfer"
        },

        // ================= GIAI ĐOẠN 2: THAO TÚNG TÂM LÝ VÀ CHUYỂN SANG KHUNG CHAT BẢO MẬT (ZALO) =================
        {
          id: "lv2_g2_notice_transfer",
          speaker: "system",
          headerWarning: "📞 Chuyển tiếp cuộc gọi nội bộ • Nhạc chờ VietBank (3s)",
          text: "🎵 (Tiếng nhạc chờ Ngân hàng vang lên 3 giây, sau đó chuyển sang giọng nam nghiêm túc tự xưng Chuyên viên Kỹ thuật Lâm)",
          nextId: "lv2_g2_lam_voice"
        },
        {
          id: "lv2_g2_lam_voice",
          speaker: "them",
          senderName: "Chuyên viên Kỹ thuật Lâm",
          avatar: "assets/avatar_bank.svg",
          text: "Alo {titleName}, em là Lâm bên Bộ phận Hỗ trợ Kỹ thuật Bảo mật.\n\nEm đã nhận được yêu cầu hủy giao dịch nghi vấn 18.600.000 VNĐ của {honorific}.\nĐể hủy lệnh này, em cần gửi cho {honorific} một Mã Lệnh Hủy Bảo Mật qua Zalo chính thức của Ngân hàng.\n\n{TitleName} vui lòng mở Zalo, tìm số điện thoại 09xx.xxx.xxx (Zalo tên: VietBank - Hỗ Trợ Khách Hàng 24/7) và bấm xác nhận kết bạn nhé.",
          choices: [
            {
              text: "Mở Zalo kết bạn với tài khoản VietBank",
              action: "chat_reply",
              deltaTrust: 15,
              deltaRisk: 10,
              reason: "Làm theo lời dẫn dụ, kết bạn với tài khoản Zalo giả mạo ngân hàng",
              nextId: "lv2_g2_me_added_zalo"
            }
          ]
        },
        {
          id: "lv2_g2_me_added_zalo",
          speaker: "me",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          headerWarning: "💬 Khung chat Zalo • Tài khoản Zalo giả mạo logo VietBank",
          text: "Ồ rồi, {victimHonorific} thấy Zalo tên VietBank có logo ngân hàng rồi, {victimHonorific} vừa kết bạn đó.",
          nextId: "lv2_g2_lam_zalo_link"
        },
        {
          id: "lv2_g2_lam_zalo_link",
          speaker: "them",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          senderName: "Kỹ thuật Lâm (VietBank Hỗ Trợ 24/7)",
          avatar: "assets/avatar_bank.svg",
          text: "Em đã xác nhận kết bạn với {titleName}.\n\nBây giờ {honorific} nhấn vào Đường link Cổng Bảo mật Khẩn cấp của VietBank dưới đây để xác thực quyền sở hữu thẻ:\n\n👉 http://vietbank-huygiaodich-capsotien.com/xacthuc-khancap\n\n(Lưu ý: Link có giao diện xanh dương y hệt trang đăng nhập Internet Banking thật của VietBank)",
          choices: [
            {
              text: "Nhấp vào đường link để xác thực hủy giao dịch",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 25,
              reason: "Bấm vào đường link website lạ do đối tượng gửi qua Zalo",
              nextId: "lv2_g3_notice_phish_web"
            }
          ]
        },

        // ================= GIAI ĐOẠN 3: BÂY GIỜ VÀ ÉP NHẬP THÔNG TIN MẬT =================
        {
          id: "lv2_g3_notice_phish_web",
          speaker: "system",
          headerWarning: "🌐 Màn hình hiển thị Web giả mạo Internet Banking VietBank",
          text: "🌐 (Giao diện ứng dụng chuyển sang hiển thị màn hình Web Phishing giả mạo: vietbank-huygiaodich-capsotien.com/xacthuc-khancap - Giao diện nền xanh logo VietBank cực kỳ tinh vi)",
          nextId: "lv2_g3_lam_instructions"
        },
        {
          id: "lv2_g3_lam_instructions",
          speaker: "them",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          senderName: "Kỹ thuật Lâm (VietBank Hỗ Trợ 24/7)",
          avatar: "assets/avatar_bank.svg",
          text: "{TitleName} bấm vào link rồi đúng không ạ?\n\nBước 1: {Honorific} điền Tên đăng nhập và Mật khẩu App Ngân hàng của {honorific} vào 2 ô trên màn hình.\nBước 2: {Honorific} nhập Số thẻ / Số CCCD ({cccd}) để hệ thống đối soát.\n\n{Honorific} điền xong báo em ngay để em phát lệnh hủy trừ tiền nhé!",
          choices: [
            {
              text: "Hỏi lại lý do: Sao lại phải nhập Mật khẩu App Ngân hàng?",
              action: "chat_reply",
              deltaTrust: -10,
              reason: "Nghi ngờ khi đối tượng yêu cầu nhập mật khẩu bảo mật của App Ngân hàng",
              nextId: "lv2_g3_me_doubt"
            }
          ]
        },
        {
          id: "lv2_g3_me_doubt",
          speaker: "me",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          text: "Em ơi, sao lại phải nhập cả Mật khẩu App Ngân hàng ở đây vậy?\n{VictimHonorific} nghe báo đài dặn là không được đưa mật khẩu cho ai mà?",
          nextId: "lv2_g3_lam_fake_credential"
        },
        {
          id: "lv2_g3_lam_fake_credential",
          speaker: "them",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          senderName: "Kỹ thuật Lâm (VietBank Hỗ Trợ 24/7)",
          avatar: "assets/avatar_bank.svg",
          text: "(Gửi ngay 1 ảnh Thẻ Nhân viên VietBank + Giấy ủy quyền giả có dấu đỏ)\n\n{TitleName} yên tâm, đây là đường link mã hóa SSL 256-bit bảo mật nội bộ của Ngân hàng, không phải người ngoài.\nEm gửi {honorific} ảnh Thẻ nhân viên và Quyết định làm việc của em để {honorific} tin tưởng.\n\n{Honorific} nhìn đồng hồ giúp em, chỉ còn 3 phút nữa là hết thời gian treo giao dịch. Nếu {honorific} không nhập nhanh, hệ thống tự động chốt đơn và trừ 18,6 triệu đồng thì bên em không chịu trách nhiệm được nữa đâu ạ!",
          nextId: "lv2_g4_decision_point"
        },

        // ================= GIAI ĐOẠN 4: NÚT BẤM LỰA CHỌN TRÊN APP (ĐIỂM QUYẾT ĐỊNH) =================
        {
          id: "lv2_g4_decision_point",
          speaker: "system",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          headerWarning: "⏱️ Hết 3 phút đếm ngược sẽ bị trừ 18.600.000đ",
          text: "",
          choices: [
            {
              text: "4.1: DỪNG LẠI, KHÔNG ĐĂNG NHẬP VÀ GỌI HOTLINE CHÍNH THỨC",
              action: "finish_success",
              deltaMoney: 0,
              type: "good",
              suppressMeBubble: true,
              reason: "Cảnh giác trước web lạ đòi mật khẩu ngân hàng, kiên quyết dừng lại và xác minh qua kênh chính thức",
              nextId: "lv2_branch_refuse"
            },
            {
              text: "4.2: HOẢNG LOẠN NÊN BẤM ĐĂNG NHẬP VÀ CUNG CẤP MÃ OTP",
              action: "send_money",
              deltaMoney: -75000000,
              type: "bad",
              suppressMeBubble: true,
              reason: "Hoảng loạn sợ mất tiền, nhập mật khẩu và mã OTP vào trang web lừa đảo",
              nextId: "lv2_branch_scammed"
            }
          ]
        },

        // --- NHÁNH LỰA CHỌN 4.1: AN TOÀN ---
        {
          id: "lv2_branch_refuse",
          speaker: "me",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          text: "Thôi em, {victimHonorific} thấy không an tâm. Thà {victimHonorific} mất công ra trực tiếp PGD Ngân hàng VietBank ở {address} giải quyết chứ {victimHonorific} không nhập mật khẩu lên web lạ đâu.",
          nextId: "lv2_scammer_struggle"
        },
        {
          id: "lv2_scammer_struggle",
          speaker: "them",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          senderName: "Kỹ thuật Lâm (VietBank Hỗ Trợ 24/7)",
          avatar: "assets/avatar_bank.svg",
          text: "{Honorific} không nhập bây giờ là bị trừ tiền ráng chịu đó nha! Alo {titleName}...",
          nextId: "lv2_notice_hungup_safe"
        },
        {
          id: "lv2_notice_hungup_safe",
          speaker: "system",
          headerWarning: "🛡️ Đã thoát bẫy • Khóa thẻ khẩn cấp qua kênh chính thức",
          text: "🛡️ (Nạn nhân cúp máy, thoát Zalo, mở ứng dụng ngân hàng thật hoặc gọi hotline in trên mặt sau thẻ tín dụng)",
          nextId: "end1_safe_lv2"
        },
        {
          id: "end1_safe_lv2",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "KẾT THÚC 1 - AN TOÀN / BÀI HỌC TUYÊN TRUYỀN",
          endingTitle: "PHÁ BẪY MẠO DANH NHÂN VIÊN NGÂN HÀNG",
          text: "🎉 Đánh giá từ App: XUẤT SẮC! BẠN ĐÃ THOÁT KHỎI BẪY LỪA ĐẢO TINH VI!\n\nBạn đã giữ vững nguyên tắc bảo mật thông tin, không cung cấp mật khẩu ngân hàng trên link lạ. Toàn bộ tiền tiết kiệm và hạn mức thẻ tín dụng được bảo toàn trọn vẹn!",
          summaryConclusion: "XUẤT SẮC! BẠN ĐÃ THOÁT KHỎI BẪY LỪA ĐẢO TINH VI!\nBạn đã tỉnh táo nhận diện thủ đoạn tạo tâm lý hoảng loạn và áp lực thời gian của kẻ gian. Tuyệt đối không nhập mật khẩu tài khoản ngân hàng trên các trang web lạ.",
          warningSigns: "• Tâm lý vội vã: Kẻ lừa đảo luôn tạo ra áp lực thời gian (còn 3 phút, hết hạn...) để nạn nhân hoảng loạn và không kịp tư duy logic.\n• Thẻ nhân viên / Giấy tờ giả: Kẻ gian dễ dàng cắt ghép hình ảnh Thẻ nhân viên, con dấu ngân hàng để tạo niềm tin.\n• Yêu cầu chuyển sang Zalo cá nhân và gửi link lạ có đuôi tên miền bất thường.",
          lesson: "Nguyên tắc vàng: Ngân hàng KHÔNG BAO GIỜ yêu cầu khách hàng cung cấp Mật khẩu Internet Banking hoặc nhập thông tin vào bất kỳ đường link nào gửi qua Zalo/SMS. Khi nghi vấn, hãy bình tĩnh cúp máy và gọi trực tiếp số hotline in ở mặt sau thẻ ngân hàng."
        },

        // --- NHÁNH LỰA CHỌN 4.2: SẬP BẪY / MẤT TRẮNG 75 TRIỆU ĐỒNG ---
        {
          id: "lv2_branch_scammed",
          speaker: "me",
          headerName: "VietBank - Hỗ TrỢ Khách Hàng 24/7",
          text: "Sợ bị trừ mất 18,6 triệu nên {shortName} vội vàng nhập Tên đăng nhập và Mật khẩu vào đường link...",
          nextId: "lv2_scammer_asks_otp"
        },
        {
          id: "lv2_scammer_asks_otp",
          speaker: "them",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          senderName: "Kỹ thuật Lâm (VietBank Hỗ Trợ 24/7)",
          avatar: "assets/avatar_bank.svg",
          text: "Hệ thống đang xử lý hủy lệnh... {TitleName} vừa nhận được một mã OTP gồm 6 chữ số gửi về điện thoại đúng không ạ?\n\n{Honorific} nhập ngay 6 số đó vào ô \"Xác nhận hủy giao dịch\" trên web giúp em để hoàn tất nhé!",
          nextId: "lv2_sms_otp_arrives"
        },
        {
          id: "lv2_sms_otp_arrives",
          speaker: "system",
          headerWarning: "📱 Tin nhắn SMS biến động tài khoản từ Ngân Hàng Thật",
          text: "📩 (Điện thoại {shortName} nhận tin nhắn SMS thật từ Ngân hàng: \"Mã OTP của bạn là 892014. Tuyệt đối không chia sẻ OTP này cho bất kỳ ai để tránh bị mất tiền...\")",
          nextId: "lv2_me_submits_otp"
        },
        {
          id: "lv2_me_submits_otp",
          speaker: "me",
          headerName: "VietBank - Hỗ Trợ Khách Hàng 24/7",
          text: "(Chỉ lo đọc số OTP và gõ ngay vào trang web)",
          nextId: "lv2_sms_money_deducted"
        },
        {
          id: "lv2_sms_money_deducted",
          speaker: "system",
          headerWarning: "🚨 TÀI KHOẢN BỊ HACKER RÚT SẠCH TIỀN",
          text: "💥 (Ngay lập tức, màn hình điện thoại hiện 2 tin nhắn SMS trừ tiền liên tiếp):\n\nSMS 1: \"Tài khoản {maskedPhone} vừa bị trừ 45.000.000 VNĐ (Toàn bộ tiền tiết kiệm).\"\nSMS 2: \"Thẻ tín dụng {maskedCccd} vừa bị thanh toán số tiền 30.000.000 VNĐ.\"\n\n🚫 (Trang Zalo \"VietBank Hỗ Trợ\" lập tức xóa toàn bộ tin nhắn và chặn Zalo của {shortName})",
          nextId: "end2_scammed_lv2"
        },
        {
          id: "end2_scammed_lv2",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 75000000,
          endingCode: "KẾT THÚC 2 - SẬP BẪY / MẤT TRẮNG 75 TRIỆU ĐỒNG",
          endingTitle: "SẬP BẪY PHISHING VÀ CHIẾM ĐOẠT MÃ OTP",
          text: "💥 Đánh giá từ App: BẠN ĐÃ MẤT TOÀN BỘ TIỀN TRONG TÀI KHOẢN!\n\nToàn bộ 45.000.000 VNĐ tiền tiết kiệm và 30.000.000 VNĐ hạn mức thẻ tín dụng (tổng cộng 75.000.000 VNĐ) đã bị hacker chiếm đoạt hoàn toàn do cung cấp thông tin đăng nhập và mã OTP!",
          summaryConclusion: "BẠN ĐÃ MẤT TOÀN BỘ TIỀN TRONG TÀI KHOẢN!\nKẻ gian đã dùng kịch bản 'báo động giả' giao dịch 18,6 triệu để tạo tâm lý hoảng loạn, sau đó dẫn dụ bạn vào web giả mạo và lừa lấy mã OTP. Toàn bộ 75.000.000 VNĐ đã bị rút sạch!",
          warningSigns: "• Cuộc gọi tự xưng tổng đài ngân hàng thông báo giao dịch lạ để gây hoảng sợ.\n• Yêu cầu kết bạn Zalo và gửi đường link lạ (không phải tên miền chính thức của ngân hàng).\n• Đòi cung cấp Mật khẩu và mã OTP – chìa khóa tối mật của tài khoản ngân hàng.",
          lesson: "Mã OTP chính là bức tường lửa bảo vệ tài sản cuối cùng. Bất kỳ ai yêu cầu cung cấp mã OTP hoặc hướng dẫn nhập OTP lên link web gửi qua tin nhắn đều là LỪA ĐẢO 100%. Ngân hàng không bao giờ yêu cầu khách hàng cung cấp OTP để 'hủy giao dịch'."
        }
      ],
      lesson: "Ngân hàng KHÔNG BAO GIỜ yêu cầu khách hàng cung cấp Mật khẩu Internet Banking hoặc nhập thông tin vào bất kỳ đường link nào gửi qua Zalo/SMS. Khi nghi vấn, hãy bình tĩnh cúp máy và gọi trực tiếp số hotline in ở mặt sau thẻ ngân hàng."
    },
    {
      number: 3,
      title: "BẪY CỘNG TÁC VIÊN ONLINE: VIỆC NHẸ – LƯƠNG CAO",
      subtitle: "Độ khó: Nâng cao • Thả tép bắt tôm • Cái bẫy đơn VIP • Bẫy tâm lý gỡ vốn khi báo lỗi hệ thống",
      sender: {
        name: "Tuyết Nhi - Hỗ Trợ Việc Làm",
        avatar: "assets/avatar_scammer.png",
        warningText: ""
      },
      dialogues: [
        // ================= GIAI ĐOẠN 1: LỜI MỜI VIỆC NHẸ LƯƠNG CAO =================
        {
          id: "lv3_g1_notice",
          speaker: "system",
          text: "(Màn hình Zalo của {shortName}: Buổi tối lướt điện thoại tìm việc làm thêm, bạn nhận được tin nhắn từ tài khoản lạ tên 'Tuyết Nhi – Hỗ Trợ Việc Làm')",
          nextId: "lv3_g1_tuyetnhi_intro"
        },
        {
          id: "lv3_g1_tuyetnhi_intro",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Chào bạn {name}! Bên mình đang tuyển cộng tác viên thanh toán đơn hàng Online cho sàn thương mại điện tử.\n\nCông việc khá đơn giản, không yêu cầu kinh nghiệm. Bạn chỉ cần sử dụng tiền cá nhân để thanh toán đơn hàng theo hướng dẫn nhằm tăng tương tác sản phẩm.\nSau khi hoàn thành, hệ thống sẽ hoàn lại 100% tiền gốc và cộng thêm 10% hoa hồng.\n\nMỗi đơn chỉ mất khoảng 3–5 phút. Bạn {shortName} có muốn thử không?",
          nextId: "lv3_g1_decision_1"
        },
        {
          id: "lv3_g1_decision_1",
          speaker: "system",
          stageNumber: 1,
          stageTitle: "Giai đoạn 1: Lời mời việc nhẹ lương cao",
          text: "",
          choices: [
            {
              text: "A. Chặn tài khoản và bỏ qua lời mời tuyển dụng này.",
              action: "chat_reply",
              deltaTrust: -30,
              deltaRisk: 0,
              awarenessScore: 20,
              type: "good",
              choiceKey: "A",
              reason: "Nhận diện bẫy việc nhẹ lương cao ngay từ đầu, chặn đối tượng bảo toàn an toàn tuyệt đối",
              suppressMeBubble: true,
              nextId: "lv3_g1_res_block"
            },
            {
              text: "B. Hỏi rõ tên công ty, địa chỉ và thông tin tuyển dụng.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 5,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "B",
              reason: "Hỏi thông tin công ty nhưng đối tượng dễ dàng mượn danh một doanh nghiệp có thật",
              suppressMeBubble: true,
              nextId: "lv3_g1_res_ask_company"
            },
            {
              text: "C. Tìm kiếm tên công ty mà Tuyết Nhi giới thiệu trên Internet.",
              action: "chat_reply",
              deltaTrust: 5,
              deltaRisk: 5,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "C",
              reason: "Chủ động tra cứu, thấy công ty có thật nhưng trang chủ công ty có cảnh báo bị kẻ xấu mạo danh",
              suppressMeBubble: true,
              nextId: "lv3_g1_res_search_company"
            },
            {
              text: "D. Nhắn tin hỏi một người quen xem đã từng làm công việc tương tự chưa.",
              action: "chat_reply",
              deltaTrust: 0,
              deltaRisk: 5,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "D",
              reason: "Tham khảo bạn bè nhưng đối tượng dùng chiêu bài mời thử đơn nhỏ để xua tan nghi ngờ",
              suppressMeBubble: true,
              nextId: "lv3_g1_res_ask_friend"
            },
            {
              text: "E. Đồng ý thử một đơn hàng nhỏ vì chưa phải đầu tư nhiều tiền.",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 15,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "E",
              reason: "Mắc bẫy tâm lý tò mò: Nghĩ rằng số tiền nhỏ thì không có rủi ro",
              suppressMeBubble: true,
              nextId: "lv3_g1_res_accept_trial"
            }
          ]
        },
        {
          id: "lv3_g1_res_block",
          speaker: "me",
          text: "Làm gì có công việc nào vừa ngồi nhà vừa thanh toán hộ mà nhận hoa hồng dễ dàng như vậy. Chắc chắn là lừa đảo nạp tiền, chặn luôn cho an toàn!",
          nextId: "end_lv3_1_block_early"
        },
        {
          id: "lv3_g1_res_ask_company",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Dạ bên chị là Công ty CP Đầu tư & Thương mại Quốc tế V-Commerce, MST 0315998821, trụ sở tại Quận 1, TP.HCM nha em.\n\nBên chị liên kết trực tiếp với các sàn TMĐT lớn. Chị gửi em đơn đầu tiên có 500k làm thử nghiệm thu, tiền về tài khoản ngân hàng của em ngay lập tức sau 3 phút thì em mới an tâm làm việc chứ!",
          nextId: "lv3_g2_stage_start"
        },
        {
          id: "lv3_g1_res_search_company",
          speaker: "system",
          text: "(Bạn tra cứu thấy Công ty V-Commerce có thật với MST và địa chỉ đúng như mô tả. Tuy nhiên, trên diễn đàn và trang chủ công ty lại có bài viết cảnh báo: 'Kẻ xấu đang mạo danh tuyển CTV nạp tiền thanh toán đơn hàng online')",
          nextId: "lv3_g1_tuyetnhi_excuse_search"
        },
        {
          id: "lv3_g1_tuyetnhi_excuse_search",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Mấy bài cảnh báo đó là do đối thủ cạnh tranh thuê người đăng bài nói xấu bôi nhọ bên chị thôi em ơi! Em cứ thử đơn đầu tiên có 500k, nhận đủ 550k vào ATM của em ngay là em tự biết bên chị uy tín cỡ nào mà.",
          nextId: "lv3_g2_stage_start"
        },
        {
          id: "lv3_g1_res_ask_friend",
          speaker: "system",
          text: "(Bạn chụp màn hình gửi đứa bạn thân, bạn lập tức nhắn lại: '{friendCall}, đừng có dại! Mấy vụ nhiệm vụ nạp tiền này ban đầu cho ăn vài chục ngàn rồi sau đó nuốt sạch tiền tiết kiệm đó mày ơi!')",
          nextId: "lv3_g1_tuyetnhi_friend_push"
        },
        {
          id: "lv3_g1_tuyetnhi_friend_push",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Bạn bè em chưa làm thực tế bao giờ nên sợ thôi. Chị hỗ trợ em đơn đầu tiên có 500k thôi, em thấy tiền gốc lẫn hoa hồng 550k đổ về tài khoản ngay là em biết ai đúng ai sai liền nè!",
          nextId: "lv3_g2_stage_start"
        },
        {
          id: "lv3_g1_res_accept_trial",
          speaker: "me",
          text: "Dạ vậy chị hướng dẫn em làm thử một đơn hàng nhỏ xem thế nào trước nhé.",
          nextId: "lv3_g2_stage_start"
        },

        // ================= GIAI ĐOẠN 2: THẢ TÉP BẮT TÔM – TIỀN THẬT, HOA HỒNG THẬT =================
        {
          id: "lv3_g2_stage_start",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Chị gửi em đơn đầu tiên trị giá 500.000 đồng nhé. Em chuyển vào STK thanh toán nội bộ này: 1903668822 - Ngân hàng V-Tech (Chủ TK: CONG TY TNHH PHAN PHOI V-COMMERCE), nội dung: {shortName} DH500, sau đó chụp lại giao dịch để chị xác nhận đơn nha!",
          nextId: "lv3_g2_transfer_500k"
        },
        {
          id: "lv3_g2_transfer_500k",
          speaker: "system",
          deltaMoney: -500000,
          trackLoss: false,
          deltaTrust: 10,
          deltaRisk: 5,
          text: "💸 (Bạn chuyển khoản 500.000 VNĐ thanh toán Đơn hàng 1. Vài phút sau, điện thoại rung lên: **+550.000 VNĐ**! Đã hoàn gốc 500k + 50k hoa hồng vào tài khoản!)",
          nextId: "lv3_g2_tuyetnhi_refund_500k"
        },
        {
          id: "lv3_g2_tuyetnhi_refund_500k",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Chị đã cộng đủ 50.000 đồng hoa hồng cho em rồi nha. Em kiểm tra tài khoản ngân hàng nhé!\n\nEm làm rất nhanh nhẹn! Bây giờ mình thử tiếp đơn thứ hai trị giá 2.000.000 đồng nhé. Hoa hồng 10%, tương đương 200.000 đồng nha em!",
          nextId: "lv3_g2_transfer_2000k"
        },
        {
          id: "lv3_g2_transfer_2000k",
          speaker: "system",
          deltaMoney: -2000000,
          trackLoss: false,
          deltaTrust: 15,
          deltaRisk: 5,
          text: "💸 (Bạn chuyển khoản 2.000.000 VNĐ cho Đơn thứ hai. Đúng 3 phút sau, tài khoản ngân hàng nhận tiếp thông báo: **+2.200.000 VNĐ**! Tiền thật đã về đủ!)",
          nextId: "lv3_g2_tuyetnhi_refund_2000k"
        },
        {
          id: "lv3_g2_tuyetnhi_refund_2000k",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Hệ thống đã tất toán 2.200.000đ (2 triệu gốc + 200k hoa hồng) vào tài khoản em rồi nhé! Tổng cộng hôm nay em đã kiếm được 250.000đ chỉ trong chưa đầy 10 phút!",
          nextId: "lv3_g2_social_proof"
        },
        {
          id: "lv3_g2_social_proof",
          speaker: "system",
          text: "<div class=\"social-proof-chat\"><div class=\"social-proof-head\">💬 ẢNH CHỤP TIN NHẮN CỘNG TÁC VIÊN KHÁC (TUYẾT NHI GỬI)</div><div><em>'Em mới nhận 2 triệu 200 rồi chị Nhi ơi! Công việc này dễ kiếm tiền thật, tháng này đỡ lo chi phí sinh hoạt rồi!'</em></div></div>\n(Giao diện CTV hiển thị lịch sử: 2 đơn hoàn thành • Hoa hồng tích lũy: +250.000đ)",
          nextId: "lv3_g2_decision_2"
        },
        {
          id: "lv3_g2_decision_2",
          speaker: "system",
          stageNumber: 2,
          stageTitle: "Giai đoạn 2: Thả tép bắt tôm – Tiền thật, hoa hồng thật",
          text: "",
          choices: [
            {
              text: "A. Tiếp tục làm tiếp vì cả hai đơn đều được hoàn tiền và trả hoa hồng thật.",
              action: "chat_reply",
              deltaTrust: 25,
              deltaRisk: 20,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Bẫy tâm lý thả tép: Nhầm lẫn giữa việc 'giao dịch nhỏ thành công' với 'công việc đáng tin cậy'",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_continue"
            },
            {
              text: "B. Kiểm tra xem khoản tiền nhận được có thực sự nằm trong số dư khả dụng không.",
              action: "chat_reply",
              deltaTrust: 15,
              deltaRisk: 10,
              awarenessScore: 5,
              type: "neutral",
              choiceKey: "B",
              reason: "Tiền thật đã vào tài khoản, nhưng không có nghĩa các đơn sau với số tiền lớn hơn sẽ an toàn",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_check_bank"
            },
            {
              text: "C. Yêu cầu Tuyết Nhi cung cấp hợp đồng CTV và quy định hoàn tiền pháp lý.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 10,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "C",
              reason: "Kẻ gian chuẩn bị sẵn bản hợp đồng giả mạo có mộc đỏ scan để tạo cảm giác an toàn giả",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_ask_contract"
            },
            {
              text: "D. Yêu cầu nói chuyện trực tiếp với cộng tác viên khác để hỏi kinh nghiệm.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 10,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "D",
              reason: "Kẻ gian cung cấp tài khoản ảo hoặc đồng phạm để đóng kịch khen ngợi quy trình làm việc",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_talk_other_ctv"
            },
            {
              text: "E. Dừng lại và tìm hiểu đơn vị tuyển dụng qua kênh chính thức độc lập.",
              action: "chat_reply",
              deltaTrust: -30,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "E",
              reason: "Tỉnh táo dừng lại đúng lúc: Nhận thức chiêu bài mồi chài của kẻ gian, bảo toàn vốn và rút lui an toàn",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_stop_independent"
            },
            {
              text: "F. Đề nghị rút toàn bộ tiền đã kiếm được rồi mới quyết định làm tiếp.",
              action: "chat_reply",
              deltaTrust: 5,
              deltaRisk: 5,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "F",
              reason: "Tiền vốn và lãi đã nằm sẵn trong thẻ ATM, đối tượng lập tức tung ra đơn VIP để giữ chân",
              suppressMeBubble: true,
              nextId: "lv3_g2_res_withdraw_done"
            }
          ]
        },
        {
          id: "lv3_g2_res_continue",
          speaker: "me",
          text: "Tiền về tài khoản nhanh thế này thì uy tín quá rồi chị ơi! Em sẵn sàng làm tiếp đơn tiếp theo ạ.",
          nextId: "lv3_g3_vip_pitch"
        },
        {
          id: "lv3_g2_res_check_bank",
          speaker: "system",
          text: "(Bạn mở app ngân hàng thật: Số dư khả dụng thực sự tăng 250.000 VNĐ. Tiền thật đã vào túi khiến bạn cảm thấy vô cùng an tâm)",
          nextId: "lv3_g3_vip_pitch"
        },
        {
          id: "lv3_g2_res_ask_contract",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "(Gửi 1 file PDF 'HỢP ĐỒNG CỘNG TÁC VIÊN THƯƠNG MẠI ĐIỆN TỬ' có dấu mộc đỏ công ty và điều khoản hoàn trả 100%)\n\nĐây em nha, bên chị có hợp đồng quy định pháp lý rõ ràng nên em tuyệt đối yên tâm công tác!",
          nextId: "lv3_g3_vip_pitch"
        },
        {
          id: "lv3_g2_res_talk_other_ctv",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Chị cho em số Zalo của bạn Hải Yến, cũng là sinh viên làm CTV bên chị từ tháng trước nha: 0982.xxx.xxx. Em cứ nhắn tin giao lưu hỏi bạn ấy là rõ ngay!",
          nextId: "lv3_g2_talk_haiyen_chat"
        },
        {
          id: "lv3_g2_talk_haiyen_chat",
          speaker: "system",
          text: "(Bạn nhắn hỏi, tài khoản Hải Yến lập tức trả lời: 'Chị Nhi nhiệt tình lắm bạn ơi! Tháng trước mình làm đều đặn kiếm được hơn 15 triệu đóng học phí đó, cứ yên tâm làm theo chị hướng dẫn nhé')",
          nextId: "lv3_g3_vip_pitch"
        },
        {
          id: "lv3_g2_res_stop_independent",
          speaker: "me",
          text: "Khoan đã, tiền hoa hồng 10% trong vài phút là quá bất thường. Mình vừa gọi tổng đài sàn TMĐT thì họ khẳng định sàn không bao giờ tuyển CTV thanh toán hộ kiểu này. Mình phải dừng lại ngay!",
          nextId: "end_lv3_2_stop_after_small"
        },
        {
          id: "lv3_g2_res_withdraw_done",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Toàn bộ tiền gốc và hoa hồng 250k chị đã chuyển thẳng vào số tài khoản ngân hàng của em rồi mà, em rút ra tiêu lúc nào cũng được hết á!",
          nextId: "lv3_g3_vip_pitch"
        },

        // ================= GIAI ĐOẠN 3: CÁI BẪY VIP – HOA HỒNG 12 TRIỆU =================
        {
          id: "lv3_g3_vip_pitch",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "{shortName} làm rất tốt và chuẩn xác! Chị thấy em có tiềm năng lớn nên đã đề xuất đặc cách nâng hồ sơ em lên cấp **CỘNG TÁC VIÊN VIP**.\n\nĐơn VIP hôm nay có giá trị **80.000.000 đồng**. Hoa hồng tăng vọt lên **15%**, tương đương **12.000.000 đồng**!\nHoàn thành xong đơn này là em nhận về trọn vẹn **92.000.000 đồng**, chốt sổ thu nhập tháng này luôn em!",
          nextId: "lv3_g3_player_shock"
        },
        {
          id: "lv3_g3_player_shock",
          speaker: "me",
          text: "Chị ơi, 80 triệu lớn quá! Gom hết toàn bộ tiền tiết kiệm em cũng không tới số đó, làm sao em có đủ 80 triệu được ạ?",
          nextId: "lv3_g3_tuyetnhi_push"
        },
        {
          id: "lv3_g3_tuyetnhi_push",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Em cứ yên tâm! Hai đơn trước tiền về tài khoản em trong 3 phút em thấy rồi đó. Làm xong là hệ thống hoàn lại cả gốc lẫn hoa hồng 92 triệu ngay lập tức.\nEm gom hết tiền tiết kiệm rồi mượn tạm bạn bè một lát, xong đơn nhận tiền là trả bạn bè ngay, còn dư hẳn 12 triệu tiêu xài!",
          nextId: "lv3_g3_vip_card_mockup"
        },
        {
          id: "lv3_g3_vip_card_mockup",
          speaker: "system",
          text: "<div class=\"vip-card-mockup\"><div class=\"vip-card-head\"><span class=\"vip-badge-tag\">⭐ THÔNG BÁO CẤP CỘNG TÁC VIÊN VIP</span><span class=\"vip-meta-label\">HỆ THỐNG MÔ PHỎNG</span></div><div class=\"vip-grid-info\"><div class=\"vip-stat-box\"><div class=\"vip-stat-lbl\">GIÁ TRỊ ĐƠN HÀNG</div><div class=\"vip-stat-val\" style=\"color:#f87171;\">80.000.000 đ</div></div><div class=\"vip-stat-box\"><div class=\"vip-stat-lbl\">HOA HỒNG VIP (15%)</div><div class=\"vip-stat-val\" style=\"color:#34d399;\">+12.000.000 đ</div></div></div><div style=\"font-size:0.8rem; color:#fde68a; font-weight:800; margin-bottom:6px;\">TỔNG TIỀN HỨA HOÀN: 92.000.000 VNĐ</div><div class=\"vip-warning-sub\">⚠️ Thông tin do bên tuyển dụng tự hiển thị trên màn hình chat, chưa phải khoản tiền được bảo đảm bởi ngân hàng.</div></div>",
          nextId: "lv3_g3_conflict_friend"
        },
        {
          id: "lv3_g3_conflict_friend",
          speaker: "system",
          text: "<div class=\"cross-msg-box\"><div class=\"cross-msg-item messenger\"><strong>💬 BẠN THÂN NHẮN TIN CẢNH BÁO:</strong><br>'{friendCall}, mày kiểm tra kỹ chưa? Tao đọc báo thấy mấy vụ làm nhiệm vụ đơn hàng này toàn cho ăn vài trăm ngàn mồi nhử rồi bắt nạp cả trăm triệu là mất trắng đấy!'</div><div class=\"cross-msg-item zalo\"><strong>💬 TUYẾT NHI NHẮN RIÊNG THÚC GIỤC:</strong><br>'{shortName} đừng nghe những người không hiểu công việc! Em đã làm hai đơn thành công rồi mà, chị chỉ muốn giúp em kiếm thêm thu nhập thôi. Suất VIP này chỉ mở trong hôm nay thôi nhé!'</div></div>",
          nextId: "lv3_g3_decision_3"
        },
        {
          id: "lv3_g3_decision_3",
          speaker: "system",
          stageNumber: 3,
          stageTitle: "Giai đoạn 3: Cái bẫy VIP – Hoa hồng 12 triệu",
          text: "",
          choices: [
            {
              text: "A. Tin Tuyết Nhi vì hai đơn trước đã thanh toán sòng phẳng.",
              action: "chat_reply",
              deltaTrust: 25,
              deltaRisk: 25,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Lấy bằng chứng quá khứ quy mô nhỏ để bảo chứng cho rủi ro khổng lồ ở hiện tại",
              suppressMeBubble: true,
              nextId: "lv3_g3_res_trust_history"
            },
            {
              text: "B. Gom tiền và đi vay bạn bè để hoàn thành đơn 80 triệu lấy 12 triệu hoa hồng.",
              action: "chat_reply",
              deltaTrust: 30,
              deltaRisk: 30,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "B",
              reason: "Bị lòng tham hoa hồng 12 triệu che mờ lý trí, chấp nhận vay mượn để đâm đầu vào rủi ro",
              suppressMeBubble: true,
              nextId: "lv3_g3_res_borrow_friend"
            },
            {
              text: "C. Yêu cầu Tuyết Nhi chứng minh quyền đại diện cho doanh nghiệp và quy trình thanh toán.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 10,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "C",
              reason: "Đòi chứng minh nhưng đối tượng gửi thêm ảnh chụp văn phòng và giấy phép giả để che mắt",
              suppressMeBubble: true,
              nextId: "lv3_g3_res_ask_proof"
            },
            {
              text: "D. Tạm dừng, không vay và tìm cách xác minh độc lập trước khi chuyển thêm tiền.",
              action: "chat_reply",
              deltaTrust: -15,
              deltaRisk: 5,
              awarenessScore: 15,
              type: "good",
              choiceKey: "D",
              reason: "Hãm phanh tâm lý kịp thời: Nhận thấy sự chênh lệch phi lý giữa đơn 2 triệu và đơn 80 triệu",
              suppressMeBubble: true,
              nextId: "lv3_g3_res_pause_verify"
            },
            {
              text: "E. Đề nghị công ty tự thanh toán đơn hàng thay vì bắt dùng tiền cá nhân của CTV.",
              action: "chat_reply",
              deltaTrust: -10,
              deltaRisk: 5,
              awarenessScore: 12,
              type: "neutral",
              choiceKey: "E",
              reason: "Thử thách đối tượng: Nếu là việc tăng tương tác thì công ty hoàn toàn có thể cấp vốn",
              suppressMeBubble: true,
              nextId: "lv3_g3_res_ask_company_pay"
            },
            {
              text: "F. Yêu cầu giữ số tiền 250k đã kiếm được và dứt khoát từ chối lên cấp VIP.",
              action: "chat_reply",
              deltaTrust: -35,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "F",
              reason: "Thoát hiểm xuất sắc: Không tham hoa hồng ảo 12 triệu, bảo toàn trọn vẹn số tiền hiện có",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            }
          ]
        },
        {
          id: "lv3_g3_res_trust_history",
          speaker: "me",
          text: "Nghĩ lại thì chị Nhi đã hoàn tiền rất sòng phẳng 2 đơn trước rồi, người ta làm ăn chuyên nghiệp vậy chắc không lừa mình đâu...",
          nextId: "lv3_g4_urgency"
        },
        {
          id: "lv3_g3_res_borrow_friend",
          speaker: "me",
          text: "Chỉ cần 5 phút là có 12 triệu hoa hồng, bằng tiền đi làm cả mấy tháng trời! Mình gom tiền tiết kiệm rồi mượn bạn bè xoay sở tí là xong ngay.",
          nextId: "lv3_g4_urgency"
        },
        {
          id: "lv3_g3_res_ask_proof",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "(Gửi ảnh chụp văn phòng làm việc đông đúc kèm ảnh CCCD của Tuyết Nhi)\n\nChị gửi em cả ảnh CCCD và hình văn phòng công ty chị đây nè. Bên chị pháp nhân rõ ràng chứ có phải ẩn danh đâu mà em lo!",
          nextId: "lv3_g4_urgency"
        },
        {
          id: "lv3_g3_res_pause_verify",
          speaker: "me",
          text: "Em thấy đơn 80 triệu này quá lớn so với khả năng tài chính của em. Em xin phép tạm dừng lại để suy nghĩ kỹ ạ.",
          nextId: "lv3_g4_urgency"
        },
        {
          id: "lv3_g3_res_ask_company_pay",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Quy định của sàn TMĐT là dòng tiền tăng tương tác phải xuất phát từ tài khoản cá nhân người dùng thật thì hệ thống mới chấm điểm SEO sản phẩm được em ơi! Công ty thanh toán thì còn gọi gì là CTV nữa!",
          nextId: "lv3_g4_urgency"
        },

        // ================= GIAI ĐOẠN 4: ĐIỂM NÚT QUYẾT ĐỊNH – 80 TRIỆU ĐỒNG =================
        {
          id: "lv3_g4_urgency",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "{shortName} ơi, chị giữ suất VIP cho em đến 20 giờ tối nay thôi nhé! Đồng hồ hệ thống sắp khóa cổng rồi, nếu em không nạp bây giờ thì hệ thống sẽ hủy tư cách CTV VIP và em mất vĩnh viễn cơ hội nhận 12 triệu hoa hồng này đó!\n\nEm đã làm tốt 2 đơn trước rồi, đừng bỏ cuộc giữa chừng uổng công sức!",
          nextId: "lv3_g4_decision_4"
        },
        {
          id: "lv3_g4_decision_4",
          speaker: "system",
          stageNumber: 4,
          stageTitle: "Giai đoạn 4: Điểm nút quyết định – 80 triệu đồng",
          text: "",
          choices: [
            {
              text: "A. Chuyển đủ 80 triệu để nhận hoa hồng 12 triệu.",
              action: "send_money",
              deltaMoney: -80000000,
              trackLoss: true,
              deltaTrust: 30,
              deltaRisk: 40,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Sập bẫy tâm lý áp lực thời gian và lòng tham: Chuyển toàn bộ 80 triệu đồng vào tài khoản kẻ gian",
              suppressMeBubble: true,
              nextId: "lv3_g5_start_transfer"
            },
            {
              text: "B. Chuyển thử 5 triệu trước để kiểm tra hệ thống có xử lý được không.",
              action: "send_money",
              deltaMoney: -5000000,
              trackLoss: true,
              deltaTrust: 10,
              deltaRisk: 25,
              awarenessScore: 5,
              type: "bad",
              choiceKey: "B",
              reason: "Mắc bẫy an toàn giả: Chuyển thử tiền vẫn làm mất 5 triệu đồng vì đối tượng không hoàn tiền lẻ",
              suppressMeBubble: true,
              nextId: "lv3_g4_res_pay_5m_trial"
            },
            {
              text: "C. Yêu cầu rút toàn bộ tiền đã kiếm được và dừng hẳn công việc.",
              action: "chat_reply",
              deltaTrust: -30,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "C",
              reason: "Kiên quyết dừng lại: Tiền 250k đã trong tài khoản, bảo toàn 80 triệu không mất một đồng",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            },
            {
              text: "D. Yêu cầu hợp đồng và cam kết hoàn tiền có chữ ký đại diện pháp luật trước khi nộp.",
              action: "chat_reply",
              deltaTrust: -20,
              deltaRisk: 0,
              awarenessScore: 20,
              type: "good",
              choiceKey: "D",
              reason: "Đòi gặp mặt ký hợp đồng trực tiếp khiến kẻ gian lúng túng né tránh, nhân cơ hội rút lui an toàn",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            },
            {
              text: "E. Tìm số điện thoại tổng đài chính thức của sàn TMĐT để xác minh.",
              action: "chat_reply",
              deltaTrust: -35,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "E",
              reason: "Xác minh độc lập qua kênh chính thức: Tổng đài sàn khẳng định 100% lừa đảo, thoát bẫy thành công",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            },
            {
              text: "F. Đề nghị công ty ứng tiền hoặc thanh toán trực tiếp cho đơn hàng.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 20,
              type: "good",
              choiceKey: "F",
              reason: "Đối tượng nổi cáu thúc ép khiến bản chất lừa đảo lộ rõ, người chơi lập tức dừng lại",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            },
            {
              text: "G. Từ chối đơn VIP, dừng chuyển tiền và chụp lưu lại toàn bộ trao đổi.",
              action: "chat_reply",
              deltaTrust: -35,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "G",
              reason: "Dứt khoát từ chối, bảo toàn trọn vẹn tài sản và thu thập chứng cứ phòng vệ",
              suppressMeBubble: true,
              nextId: "end_lv3_3_escape_before_vip"
            }
          ]
        },
        {
          id: "lv3_g4_res_pay_5m_trial",
          speaker: "system",
          text: "💸 (Bạn chuyển khoản thử 5.000.000 VNĐ vào tài khoản theo chỉ dẫn của Tuyết Nhi. Vài phút sau...)",
          nextId: "lv3_g4_tuyetnhi_5m_reject"
        },
        {
          id: "lv3_g4_tuyetnhi_5m_reject",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Ủa em ơi! Đơn VIP 80 triệu là đơn nguyên khối theo mã hệ thống, sao em lại chuyển 5 triệu? Hệ thống tự động khóa lệnh vì thiếu tiền, khoản 5 triệu này đang bị kẹt lại rồi!\nEm phải nộp đủ 75 triệu còn lại thì mới cứu được 5 triệu này ra nhé!",
          nextId: "end_lv3_4_trial_5m_lost"
        },

        // ================= GIAI ĐOẠN 5: LỖI HỆ THỐNG – BẪY GỠ VỐN (KHI ĐÃ CHUYỂN 80 TRIỆU) =================
        {
          id: "lv3_g5_start_transfer",
          speaker: "system",
          text: "💸 (Bạn gom toàn bộ 80.000.000 VNĐ tiền tiết kiệm và tiền vay mượn bạn bè chuyển vào STK do Tuyết Nhi cung cấp. Hồi hộp chờ đợi 3 phút trôi qua...)",
          nextId: "lv3_g5_system_error_alert"
        },
        {
          id: "lv3_g5_system_error_alert",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Trời ơi {shortName} ơi! Hệ thống đang báo lỗi xác nhận đơn hàng! Cú pháp chuyển khoản của em ghi sai mã định danh CTV (thiếu chữ VIP ở đuôi) nên số tiền 80 triệu đang bị phong tỏa tạm thời trên cổng thanh toán liên ngân hàng!\n\nBây giờ em cần chuyển thêm **50.000.000 đồng** tiền bảo hiểm thông quan để giải phóng lệnh, hệ thống sẽ tự động hoàn trả toàn bộ **142.000.000 đồng** (130 triệu gốc + 12 triệu hoa hồng) về tài khoản của em ngay lập tức!",
          nextId: "lv3_g5_tech_appears"
        },
        {
          id: "lv3_g5_tech_appears",
          speaker: "them",
          senderName: "Chuyên viên Kỹ thuật Hướng dẫn",
          avatar: "assets/avatar_bank.svg",
          text: "Chào bạn {name}, tôi là Trưởng bộ phận Kỹ thuật đối soát hệ thống. Hồ sơ đơn hàng VIP của bạn đang bị treo mã do lỗi cú pháp chuyển khoản.\n\nTheo quy định đối soát liên ngân hàng, bạn cần nộp ký quỹ bảo hiểm thông quan bổ sung 50.000.000đ trong vòng 15 phút. Ngay khi tiền vào cổng, hệ thống sẽ tự động mở khóa và giải ngân toàn bộ 142.000.000đ về tài khoản của bạn.",
          nextId: "lv3_g5_tuyetnhi_reinforce"
        },
        {
          id: "lv3_g5_tuyetnhi_reinforce",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "Chị đã làm việc trực tiếp với anh kỹ thuật rồi, đây là lỗi hệ thống chứ không phải bên chị nuốt tiền của em đâu! Em nộp bổ sung 50 triệu đi rồi lấy lại hết 142 triệu ra nè, không nộp nhanh là hệ thống đóng băng vĩnh viễn đó em!",
          nextId: "lv3_g5_order_status_mockup"
        },
        {
          id: "lv3_g5_order_status_mockup",
          speaker: "system",
          text: "<div class=\"vip-order-error-mockup\"><div class=\"vip-error-header\"><span class=\"vip-error-status\">🚨 TRẠNG THÁI: LỖI CÚ PHÁP – BỊ PHONG TỎA</span><span style=\"font-size:0.7rem; color:#fca5a5;\">CỔNG THANH TOÁN LIÊN NGÂN HÀNG</span></div><div class=\"vip-grid-info\"><div class=\"vip-stat-box\"><div class=\"vip-stat-lbl\">ĐÃ NỘP (ĐANG TREO)</div><div class=\"vip-stat-val\" style=\"color:#f87171;\">80.000.000 đ</div></div><div class=\"vip-stat-box\"><div class=\"vip-stat-lbl\">YÊU CẦU NỘP BỔ SUNG</div><div class=\"vip-stat-val\" style=\"color:#fbbf24;\">50.000.000 đ</div></div></div><div style=\"font-size:0.85rem; color:#ffffff; font-weight:900; margin-bottom:6px;\">TỔNG TIỀN DỰ KIẾN GIẢI NGÂN: 142.000.000 VNĐ</div><div class=\"vip-warning-sub\">⚠️ BẪY GỠ VỐN (SUNK COST): Con số 142 triệu chỉ là số ảo do đối tượng tự gõ trên giao diện để ép nạn nhân nộp thêm tiền!</div></div>",
          nextId: "lv3_g5_decision_5"
        },
        {
          id: "lv3_g5_decision_5",
          speaker: "system",
          stageNumber: 5,
          stageTitle: "Giai đoạn 5: Lỗi hệ thống – Bẫy gỡ vốn",
          text: "",
          choices: [
            {
              text: "A. Chuyển thêm 50 triệu để lấy lại toàn bộ 130 triệu và hoa hồng.",
              action: "send_money",
              deltaMoney: -50000000,
              trackLoss: true,
              deltaTrust: 30,
              deltaRisk: 50,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Sập bẫy gỡ vốn hoàn toàn: Nộp thêm 50 triệu vào miệng hố không đáy của kẻ lừa đảo",
              suppressMeBubble: true,
              nextId: "lv3_g5_res_pay_50m_full"
            },
            {
              text: "B. Đi vay mượn người thân để nộp 50 triệu nhằm cứu 80 triệu đã nộp.",
              action: "send_money",
              deltaMoney: -50000000,
              trackLoss: true,
              deltaTrust: 30,
              deltaRisk: 50,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "B",
              reason: "Tâm lý sợ mất 80 triệu khiến nạn nhân vay mượn khắp nơi, đẩy thiệt hại lên mức tối đa 130 triệu",
              suppressMeBubble: true,
              nextId: "lv3_g5_res_pay_50m_full"
            },
            {
              text: "C. Yêu cầu Tuyết Nhi giải thích lỗi bằng văn bản và kiên quyết không nạp thêm.",
              action: "chat_reply",
              deltaTrust: -20,
              deltaRisk: 10,
              awarenessScore: 15,
              type: "good",
              choiceKey: "C",
              reason: "Dừng lại trước bẫy nộp thêm tiền, kiên quyết đòi văn bản giải trình",
              suppressMeBubble: true,
              nextId: "lv3_g6_ghosted"
            },
            {
              text: "D. Dừng chuyển tiền, liên hệ ngân hàng ngay và lưu lại toàn bộ bằng chứng.",
              action: "chat_reply",
              deltaTrust: -35,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "D",
              reason: "Quyết định chuẩn xác: Cắt lỗ kịp thời, không nộp thêm 1 xu và bắt đầu quy trình xử lý sự cố",
              suppressMeBubble: true,
              nextId: "lv3_g6_decision_6"
            },
            {
              text: "E. Gọi số điện thoại ngân hàng do Chuyên viên Hướng dẫn cung cấp.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 20,
              awarenessScore: 5,
              type: "neutral",
              choiceKey: "E",
              reason: "Kẻ gian cung cấp số hotline giả mạo để đồng phạm vào vai ngân hàng giục nạp 50 triệu",
              suppressMeBubble: true,
              nextId: "lv3_g5_res_fake_bank_call"
            },
            {
              text: "F. Tự tìm số tổng đài chính thức của ngân hàng để thông báo giao dịch đáng ngờ.",
              action: "chat_reply",
              deltaTrust: -35,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "F",
              reason: "Liên hệ tổng đài thật: Được ngân hàng hướng dẫn khóa tính năng, tra soát tài khoản và trình báo",
              suppressMeBubble: true,
              nextId: "lv3_g6_decision_6"
            },
            {
              text: "G. Tiếp tục nhắn tin với Tuyết Nhi để năn nỉ, thương lượng hoàn lại 80 triệu.",
              action: "chat_reply",
              deltaTrust: -10,
              deltaRisk: 10,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "G",
              reason: "Năn nỉ vô ích: Kẻ lừa đảo chỉ tìm cách ép nộp thêm chứ không bao giờ thương lượng",
              suppressMeBubble: true,
              nextId: "lv3_g6_ghosted"
            }
          ]
        },
        {
          id: "lv3_g5_res_pay_50m_full",
          speaker: "system",
          text: "💸 (Trong cơn hoảng loạn vì sợ mất 80 triệu, bạn vay mượn khắp nơi nộp thêm 50.000.000 VNĐ. Tổng số tiền chuyển đi đã lên tới **130.000.000 VNĐ**...)",
          nextId: "end_lv3_7_lost_130m_full_scam"
        },
        {
          id: "lv3_g5_res_fake_bank_call",
          speaker: "system",
          text: "(Bạn gọi vào số điện thoại do Chuyên viên Hướng dẫn gửi. Đầu dây bên kia là một giọng nam tự xưng 'Cổng thanh toán liên ngân hàng', tiếp tục đe dọa ép bạn phải nộp 50 triệu trong 10 phút. Bạn nhận ra đây là một kịch bản dàn dựng liên hoàn!)",
          nextId: "lv3_g6_ghosted"
        },

        // ================= GIAI ĐOẠN 6: SỰ BIẾN MẤT – XỬ LÝ KHỦNG HOẢNG =================
        {
          id: "lv3_g6_ghosted",
          speaker: "them",
          senderName: "Tuyết Nhi",
          avatar: "assets/avatar_scammer.png",
          text: "{shortName}, em suy nghĩ cho kỹ đi! Nếu em không hoàn tất 50 triệu tiền bảo hiểm thì toàn bộ 80 triệu sẽ bị hệ thống tịch thu vĩnh viễn, chị không giúp em được nữa đâu!",
          nextId: "lv3_g6_ghosted_action"
        },
        {
          id: "lv3_g6_ghosted_action",
          speaker: "system",
          text: "🚫 (Thấy bạn dứt khoát không chuyển thêm tiền, tài khoản Tuyết Nhi lập tức **chặn Zalo** của bạn! Tài khoản 'Chuyên viên Hướng dẫn' cũng biến mất không dấu vết. Số điện thoại gọi đến báo thuê bao!)",
          nextId: "lv3_g6_decision_6"
        },
        {
          id: "lv3_g6_decision_6",
          speaker: "system",
          stageNumber: 6,
          stageTitle: "Giai đoạn 6: Sự biến mất – Lựa chọn xử lý sau sự cố",
          text: "",
          choices: [
            {
              text: "A. Dừng dứt khoát mọi giao dịch, gọi hotline ngân hàng chính thức tra soát và đến công an trình báo.",
              action: "chat_reply",
              deltaTrust: -40,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "A",
              reason: "Xử lý khủng hoảng xuất sắc: Thu thập chứng cứ, yêu cầu tra soát tài khoản thụ hưởng và báo công an",
              suppressMeBubble: true,
              nextId: "end_lv3_5_lost_80m_pro_recovery"
            },
            {
              text: "B. Tiếp tục tìm cách nhắn tin năn nỉ Tuyết Nhi, giấu gia đình vì xấu hổ và hy vọng họ trả lại tiền.",
              action: "chat_reply",
              deltaTrust: 0,
              deltaRisk: 20,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "B",
              reason: "Xử lý thụ động, bế tắc: Bỏ lỡ thời gian vàng ngăn chặn dòng tiền tẩu tán",
              suppressMeBubble: true,
              nextId: "end_lv3_6_lost_80m_passive"
            },
            {
              text: "C. Lên mạng tìm các dịch vụ 'hỗ trợ thu hồi tiền treo / lấy lại tiền lừa đảo' để nhờ vả.",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 30,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "C",
              reason: "Mắc bẫy lừa đảo thứ cấp: Các dịch vụ 'thu hồi tiền lừa đảo' trên mạng 100% là bẫy lừa lần hai",
              suppressMeBubble: true,
              nextId: "end_lv3_6_lost_80m_passive"
            }
          ]
        },

        // ================= HỆ THỐNG 7 KẾT THÚC CỦA LEVEL 3 =================
        // ENDING 1: CHẶN TỪ ĐẦU (0 ĐỒNG)
        {
          id: "end_lv3_1_block_early",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "ENDING 1 – XUẤT SẮC",
          endingTitle: "CHẶN TỪ ĐẦU – PHÒNG THỦ SỐ HOÀN HẢO",
          text: "🛡️ BẠN ĐÃ THOÁT BẪY NGAY TỪ ĐẦU!\n\nBạn đã nhận diện chính xác dấu hiệu lừa đảo tuyển CTV việc nhẹ lương cao từ tin nhắn lạ. Không tò mò thử nghiệm, không chuyển tiền, bảo vệ trọn vẹn 100% tài sản và thông tin cá nhân!",
          summaryConclusion: "XUẤT SẮC! BẠN ĐÃ THOÁT KHỎI BẪY LỪA ĐẢO TỪ TRỨNG NƯỚC!\nBạn hiểu rõ nguyên tắc: Không có công việc nào chỉ cần ngồi nhà chuyển tiền thanh toán hộ mà nhận hoa hồng khủng. Việc phớt lờ và chặn số lạ ngay từ đầu giúp bạn miễn nhiễm hoàn toàn với các tầng thao túng tâm lý.",
          warningSigns: "• Tin nhắn từ số lạ tự xưng tuyển CTV thanh toán đơn hàng online hưởng hoa hồng 10%–20%.\n• Chiêu bài 'dùng tiền cá nhân ứng trước để tăng tương tác sàn TMĐT'.\n• Không có hợp đồng lao động, không phỏng vấn chính thức, chỉ trao đổi qua Zalo.",
          lesson: "Nguyên tắc vàng: Tuyệt đối không bao giờ làm CTV thanh toán hộ đơn hàng bằng tiền túi cá nhân. Hãy lập tức chặn và báo cáo tin nhắn rác."
        },

        // ENDING 2: THỬ ĐƠN NHỎ NHƯNG KỊP DỪNG (0 ĐỒNG - LÃI 250K)
        {
          id: "end_lv3_2_stop_after_small",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "ENDING 2 – TỈNH TÁO KỊP THỜI",
          endingTitle: "THỬ ĐƠN NHỎ NHƯNG DỪNG ĐÚNG LÚC",
          text: "🎉 BẠN ĐÃ DỪNG LẠI KỊP THỜI!\n\nSau khi hoàn thành 2 đơn hàng nhỏ (500k và 2 triệu) và nhận đủ 250.000đ hoa hồng thật, bạn đã tỉnh táo nhận ra sự bất thường và dừng lại trước khi kẻ gian tung ra đòn chí mạng!",
          summaryConclusion: "TỈNH TÁO KỊP THỜI! BẢO TOÀN TRỌN VẸN TÀI SẢN!\nBạn đã trải nghiệm chiêu trò 'thả tép bắt tôm' kinh điển: Kẻ gian sẵn sàng chi 250.000đ tiền mồi thật để tạo dựng lòng tin. Tuy nhiên, bạn đã kiểm chứng độc lập và dừng lại đúng lúc, không để lòng tham dẫn lối.",
          warningSigns: "• Đối tượng hoàn tiền và trả hoa hồng rất nhanh chóng ở các đơn hàng nhỏ đầu tiên để tạo niềm tin giả.\n• Dùng ảnh chụp tin nhắn của các CTV khác khen ngợi để tạo hiệu ứng đám đông.\n• Cung cấp hợp đồng scan có mộc đỏ giả mạo.",
          lesson: "Hai giao dịch đầu tiên thành công KHÔNG CÓ NGHĨA công việc là thật. Đó chỉ là chi phí mồi câu của bọn tội phạm để chuẩn bị cho mẻ lưới lớn phía sau."
        },

        // ENDING 3: THOÁT TRƯỚC ĐƠN VIP (0 ĐỒNG)
        {
          id: "end_lv3_3_escape_before_vip",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "ENDING 3 – THOÁT BẪY VIP",
          endingTitle: "TỪ CHỐI ĐƠN VIP 80 TRIỆU – BẢO TOÀN VỐN",
          text: "🛡️ BẠN ĐÃ VƯỢT QUA ĐIỂM NÚT NGUY HIỂM NHẤT!\n\nTrước sự hối thúc và mồi câu hoa hồng 12 triệu của đơn VIP 80.000.000đ, bạn đã kiên quyết từ chối nạp tiền, giữ được trọn vẹn {charSavingsFull} của mình!",
          summaryConclusion: "XUẤT SẮC! BẠN ĐÃ CHIẾN THẮNG ÁP LỰC TÂM LÝ & LÒNG THAM!\nKẻ gian đã dùng toàn bộ đòn tâm lý: Hứa hẹn hoa hồng khủng 12 triệu, áp lực thời hạn chỉ trong hôm nay, gạt bỏ lời khuyên bạn bè. Nhưng bạn đã tỉnh táo nhận diện sự chênh lệch phi lý và kiên quyết dừng lại.",
          warningSigns: "• Đột ngột nâng giá trị đơn hàng lên mức khổng lồ (80.000.000đ) vượt quá khả năng tài chính của nạn nhân.\n• Tạo áp lực thời gian gấp gáp (giữ suất đến 20:00 tối nay) để nạn nhân không kịp suy xét.\n• Khuyên nạn nhân đi vay mượn người thân, bạn bè để nộp tiền.",
          lesson: "Bất kỳ công việc nào yêu cầu bạn phải tự đi vay mượn hàng chục triệu đồng để 'hoàn thành nhiệm vụ' đều là lừa đảo 100%. Tiền đã rời khỏi túi bạn là tiền của kẻ lừa đảo."
        },

        // ENDING 4: CHUYỂN THỬ 5 TRIỆU RỒI DỪNG (MẤT 5 TRIỆU)
        {
          id: "end_lv3_4_trial_5m_lost",
          speaker: "system",
          isEnd: true,
          status: "warning",
          financialLoss: 5000000,
          endingCode: "ENDING 4 – SUÝT MẤT TRẮNG (NEAR MISS)",
          endingTitle: "MẮC BẪY CHUYỂN THỬ 5 TRIỆU ĐỒNG",
          text: "⚠️ BẠN ĐÃ MẮT BẪY AN TOÀN GIẢ VÀ MẤT 5.000.000 VNĐ!\n\nBạn nghĩ rằng chuyển thử 5 triệu để kiểm tra xem hệ thống có trả lại không, nhưng kẻ gian lập tức lấy cớ 'đơn VIP không tách nhỏ' để nuốt trọn 5 triệu. May mắn là bạn đã kịp thời dừng lại, không nộp tiếp 75 triệu còn lại!",
          summaryConclusion: "THIẾU CẨN TRỌNG: MẮC BẪY CHUYỂN THỬ!\nBạn đã có ý thức đề phòng nhưng lại chọn phương án sai lầm là 'chuyển thử tiền'. Trong các bẫy tài chính, mọi khoản tiền chuyển vào tài khoản kẻ gian đều sẽ một đi không trở lại.",
          warningSigns: "• Nghĩ rằng chuyển một khoản nhỏ trong đơn VIP là an toàn để dò xét.\n• Kẻ gian lấy cớ 'đơn hàng nguyên khối', 'lỗi thiếu tiền' để ép nộp đủ số tiền lớn.",
          lesson: "Bài học xương máu: Không bao giờ dùng tiền thật để thử độ uy tín của kẻ lừa đảo. Kiểm chứng phải thông qua các kênh độc lập, không phải bằng cách chuyển tiền."
        },

        // ENDING 5: MẤT 80 TRIỆU NHƯNG KỊP DỪNG & XỬ LÝ SỰ CỐ CHUẨN XÁC (MẤT 80 TRIỆU)
        {
          id: "end_lv3_5_lost_80m_pro_recovery",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 80000000,
          endingCode: "ENDING 5 – PHỤC HỒI & XỬ LÝ CHUẨN XÁC",
          endingTitle: "DỪNG BẪY GỠ VỐN & THU THẬP BẰNG CHỨNG TRÌNH BÁO",
          text: "💥 BẠN ĐÃ MẤT 80.000.000 VNĐ NHƯNG KỊP DỪNG BẪY GỠ VỐN!\n\nDù đã chuyển 80 triệu do mắc bẫy đơn VIP, bạn đã kịp thời tỉnh ngộ trước yêu cầu nạp thêm 50 triệu của kẻ gian. Bạn đã bảo toàn được 50 triệu còn lại và thực hiện đúng quy trình thu thập chứng cứ báo cơ quan chức năng!",
          summaryConclusion: "CẮT LỖ KỊP THỜI & BẢO TOÀN DÒNG TIỀN CÒN LẠI!\nKẻ lừa đảo đã dùng bẫy tâm lý 'gỡ vốn' cực kỳ nguy hiểm (viện cớ lỗi hệ thống để đòi thêm 50 triệu). Bạn đã dũng cảm chấp nhận mất mát ban đầu, không đâm đầu nộp thêm, và chủ động phối hợp với ngân hàng cùng cơ quan công an.",
          warningSigns: "• Bịa lý do 'sai cú pháp', 'thiếu mã VIP', 'tiền bị phong tỏa' để ép nộp thêm tiền bảo hiểm thông quan.\n• Có thêm nhân vật 'Chuyên viên Kỹ thuật' xuất hiện để tạo cảm giác có nhiều người xác nhận lỗi.\n• Hiển thị số dư ảo khổng lồ (142 triệu) để kích thích tâm lý tiếc của.",
          lesson: "Nguyên tắc cắt lỗ: Khi đã nhận ra mình bị lừa, tuyệt đối KHÔNG BAO GIỜ nộp thêm bất kỳ khoản tiền nào với hy vọng 'lấy lại tiền gốc'. Hãy ngừng ngay giao dịch và báo cơ quan công an."
        },

        // ENDING 6: MẤT 80 TRIỆU & BẾ TẮC (MẤT 80 TRIỆU)
        {
          id: "end_lv3_6_lost_80m_passive",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 80000000,
          endingCode: "ENDING 6 – MẤT 80 TRIỆU & BẾ TẮC",
          endingTitle: "SẬP BẪY 80 TRIỆU & THƯƠNG LƯỢNG VÔ VỌNG",
          text: "💥 BẠN ĐÃ MẤT TRẮNG 80.000.000 VNĐ VÀ RƠI VÀO BẾ TẮC!\n\nBạn dừng nộp thêm 50 triệu nhưng lại xử lý sai lầm: Tiếp tục nhắn tin năn nỉ kẻ lừa đảo hoặc lên mạng tìm dịch vụ 'thu hồi tiền treo'. Bạn bỏ lỡ thời gian vàng để phong tỏa tài khoản!",
          summaryConclusion: "XỬ LÝ THỤ ĐỘNG SAU SỰ CỐ!\nKẻ lừa đảo một khi đã ôm tiền thì sẽ lập tức chặn liên lạc và tẩu tán dòng tiền qua các tài khoản ảo. Việc năn nỉ hay giấu giếm chỉ khiến cơ hội thu hồi tiền bằng 0 và dễ bị lừa tiếp lần 2.",
          warningSigns: "• Năn nỉ kẻ lừa đảo xin lại {charSavingsDesc} (kẻ lừa đảo hoàn toàn vô cảm).\n• Tin vào các bài quảng cáo 'hỗ trợ lấy lại tiền bị lừa trên mạng' (đây là bẫy lừa đảo thứ cấp).",
          lesson: "Chỉ có Cơ quan Công an và Ngân hàng chính thống mới có thẩm quyền điều tra dòng tiền lừa đảo. Mọi bên thứ ba tự xưng 'hacker lấy lại tiền' đều là lừa đảo tiếp theo."
        },

        // ENDING 7: MẤT TRẮNG 130 TRIỆU ĐỒNG (CHÁY TÀI KHOẢN)
        {
          id: "end_lv3_7_lost_130m_full_scam",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 130000000,
          endingCode: "ENDING 7 – CHÁY TÀI KHOẢN",
          endingTitle: "SẬP BẪY LỖI HỆ THỐNG – MẤT TRẮNG 130 TRIỆU ĐỒNG",
          text: "💀 BẠN ĐÃ MẤT TRẮNG TOÀN BỘ 130.000.000 VNĐ VÀ ÂM TIỀN NẶNG NỀ!\n\nDo rơi vào bẫy tâm lý gỡ vốn (Sunk Cost Fallacy) và hoảng sợ, bạn đã nộp 80 triệu rồi tiếp tục nộp thêm 50 triệu vào tài khoản kẻ gian. Tài khoản bị rút sạch và bạn gánh thêm một khoản nợ khổng lồ!",
          summaryConclusion: "SẬP BẪY HOÀN TOÀN TẤT CẢ CÁC TẦNG KỊCH BẢN!\nBạn đã bị thao túng tâm lý từ bước mồi nhử nhỏ, đến lòng tham đơn VIP, và cuối cùng là sự hoảng sợ mất vốn khi kẻ gian bịa lý do 'lỗi cú pháp'. Đây là kịch bản lừa đảo càn quét sạch tài sản của hàng nghìn {charTargetAudience}.",
          warningSigns: "• Bẫy lỗi hệ thống: 'Chuyển sai cú pháp', 'nộp tiền bảo hiểm thông quan', 'kích hoạt giải ngân tự động'.\n• Thao túng tập thể: Tuyết Nhi và 'Chuyên viên Hướng dẫn' cùng lúc diễn kịch ép nộp thêm 50 triệu.\n• Màn hình đơn hàng ảo hiển thị số tiền 142 triệu để nạn nhân nghĩ tiền vẫn còn đó.",
          lesson: "Bài học đắt giá nhất: Trong mọi trường hợp làm nhiệm vụ online, nếu bên tuyển dụng thông báo 'lỗi hệ thống' và yêu cầu nộp thêm tiền để rút tiền cũ ra, thì 1000% ĐÓ LÀ LỪA ĐẢO. Nộp thêm là mất thêm!"
        }
      ],
      lesson: "Không bao giờ có công việc nào chỉ cần ngồi nhà chuyển tiền cá nhân thanh toán hộ đơn hàng mà hưởng hoa hồng cao. Mọi lý do 'lỗi hệ thống', 'nộp thêm tiền để rút tiền cũ' đều là bẫy lừa đảo."
    },
    {
      number: 4,
      title: "CÚ LỪA CHỒNG KỊCH BẢN – KHI VIDEO CALL CŨNG KHÔNG CÒN ĐÁNG TIN",
      subtitle: "Độ khó: Nâng cao • Mạo danh người thân • Thao túng cuộc gọi thật • Video Call Deepfake & Cổng thanh toán",
      sender: {
        name: "{relName}",
        avatar: "assets/avatar_male.png?v=29.0",
        warningText: ""
      },
      dialogues: [
        // ================= GIAI ĐOẠN 1: MỒI NHỬ – TẠO NIỀM TIN BẰNG THÔNG TIN CÁ NHÂN =================
        {
          id: "g1_notice_start",
          platform: "zalo",
          speaker: "system",
          text: "(Màn hình Zalo của {shortName}: Bạn nhận được lời mời kết bạn từ tài khoản có ảnh đại diện và họ tên giống hệt {relRole} {relName})",
          nextId: "g1_them_invite"
        },
        {
          id: "g1_them_invite",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{imposterCallPlayer}, {relHonorific} đây. {RelHonorific} mới đổi điện thoại nên mất một số liên lạc và Zalo cũ đang bị lỗi xác minh chưa đăng nhập lại được, {victimHonorific} đừng gọi số cũ nha.\nHôm trước mẹ có nói chuyện tiền sửa nhà, {victimHonorific} nhớ không? {RelHonorific} đang cần nhờ {victimHonorific} một việc gấp...",
          choices: [
            {
              text: "Ủa, sao tự nhiên bị lỗi? Mà chuyện tiền sửa nhà mẹ tính sau mà?",
              action: "chat_reply",
              deltaTrust: 5,
              deltaRisk: 5,
              nextId: "g1_them_explain_glitch"
            }
          ]
        },
        {
          id: "g1_them_explain_glitch",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "Mẹ bảo chuyện tiền sửa nhà hai đứa tự bàn với nhau. Mà {victimHonorific} đừng nói với mẹ vụ này nha, {relHonorific} đang có chút việc với bạn.",
          nextId: "g1_accept_friend"
        },
        {
          id: "g1_accept_friend",
          platform: "zalo",
          speaker: "system",
          text: "({shortName} nhấn chấp nhận lời mời kết bạn Zalo. Vài phút sau...)",
          nextId: "g1_them_smalltalk"
        },
        {
          id: "g1_them_smalltalk",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{imposterSmalltalk}",
          choices: [
            {
              text: "Ừ, sao vậy?",
              action: "chat_reply",
              nextId: "g1_them_the_hook"
            }
          ]
        },
        {
          id: "g1_them_the_hook",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{RelHonorific} hỏi chút. {VictimHonorific} giúp {relHonorific} việc này được không? Nhưng {victimHonorific} tuyệt đối đừng nói với mẹ nha, {relHonorific} đang có chút rắc rối với bạn.",
          choices: [
            {
              text: "Lại chuyện gì nữa đây? Nói đi.",
              action: "chat_reply",
              nextId: "g1_them_fake_favor"
            }
          ]
        },
        {
          id: "g1_them_fake_favor",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{RelHonorific} đang cần chứng minh với một đứa bạn là {victimHonorific} có khả năng cho {relHonorific} mượn 130 triệu.\n{VictimHonorific} gọi Messenger cho {relHonorific}, giả bộ hỏi mượn tiền {relHonorific} được không?",
          choices: [
            {
              text: "Gì vậy? {VictimHonorific} làm gì có 130 triệu!",
              action: "chat_reply",
              nextId: "g1_them_explain_no_money"
            }
          ]
        },
        {
          id: "g1_them_explain_no_money",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{RelHonorific} không cần {victimHonorific} có tiền thật. Chỉ cần {victimHonorific} gọi hỏi {relHonorific} thôi!\nThằng bạn đang ngồi cạnh {relHonorific}, nó nợ tiền mà cứ nói {relHonorific} bịa chuyện. {VictimHonorific} gọi giả bộ để nó chịu trả nợ.",
          choices: [
            {
              text: "Chuyện tiền bạc gì mà phức tạp vậy?",
              action: "chat_reply",
              nextId: "g1_them_reassure_no_transfer"
            }
          ]
        },
        {
          id: "g1_them_reassure_no_transfer",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{RelHonorific} biết {victimHonorific} không thích dính vào chuyện này. Nhưng {victimHonorific} giúp {relHonorific} lần này thôi. {RelHonorific} không nhờ {victimHonorific} chuyển tiền đâu mà lo!",
          nextId: "g1_decision_1"
        },
        {
          id: "g1_decision_1",
          platform: "zalo",
          speaker: "system",
          stageNumber: 1,
          stageTitle: "Giai đoạn 1: Tài khoản Zalo mới",
          text: "",
          choices: [
            {
              text: "A. Tin tưởng vì tài khoản biết chuyện tiền sửa nhà trong gia đình.",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 15,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Bẫy ngộ nhận: Thông tin gia đình có thật không chứng minh người trò chuyện là {relName}",
              suppressMeBubble: true,
              nextId: "g1_res_trust_family"
            },
            {
              text: "B. Hỏi thêm một câu chuyện cũ chỉ hai người mới biết.",
              action: "chat_reply",
              deltaTrust: 5,
              deltaRisk: 10,
              awarenessScore: 8,
              type: "neutral",
              choiceKey: "B",
              reason: "Kẻ gian trả lời được vì thông tin bị lộ lọt từ mạng xã hội, tạo cảm giác an toàn giả",
              suppressMeBubble: true,
              nextId: "g1_res_ask_secret_past"
            },
            {
              text: "C. Gọi vào số điện thoại cũ của {relShortName} đã lưu từ trước.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "C",
              reason: "Chủ động xác minh qua kênh liên lạc độc lập đã biết từ trước của người thân",
              suppressMeBubble: true,
              nextId: "end_early_detection"
            },
            {
              text: "D. Nhắn tin riêng cho mẹ để xác nhận {relShortName} có đang liên hệ chuyện tiền không.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 15,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "D",
              reason: "Bẫy thông tin đúng nhưng kết luận sai: Mẹ xác nhận có chuyện tiền chung chung chứ không biết Zalo mới hay 130 triệu",
              suppressMeBubble: true,
              nextId: "g1_res_ask_mom"
            }
          ]
        },
        {
          id: "g1_res_trust_family",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{imposterCallPlayer} thương {relHonorific} nhất mà! Thằng bạn đang ngồi kế bên đây rồi, {victimHonorific} mở Messenger gọi giúp {relHonorific} liền nha!",
          nextId: "g2_stage2_guide"
        },
        {
          id: "g1_res_ask_secret_past",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} hỏi chuyện hồi xưa đi chơi Đà Lạt bị té xe trầy đầu gối chứ gì! {VictimHonorific} nghi ngờ {relHonorific} chi vậy? Giờ thằng bạn nó đòi đi về kìa, {victimHonorific} gọi Messenger nhanh giúp {relHonorific} đi!",
          nextId: "g2_stage2_guide"
        },
        {
          id: "g1_res_ask_mom",
          platform: "sms",
          speaker: "system",
          text: "<div class=\"mom-chat-preview\"><div class=\"mom-chat-head\">💬 TIN NHẮN SMS VỚI MẸ</div><div class=\"mom-chat-body\"><strong>{shortName}:</strong> \"Mẹ ơi, hôm nay {relName} có liên hệ mẹ hỏi chuyện tiền nong gì không mẹ?\"<br><strong>Mẹ:</strong> \"Ừ, hồi sáng {relName} có nói chuyện tiền bạc gì với mẹ đó, mẹ đang bận buôn bán ngoài chợ nên bảo hai đứa tự bảo ban nhau đi.\"</div></div>\n({shortName} nghĩ trong bụng: Mẹ xác nhận đúng là {relName} có hỏi chuyện tiền bạc thật! Chắc không có vấn đề gì đâu...)",
          nextId: "g2_stage2_guide"
        },

        // ================= GIAI ĐOẠN 2: CUỘC GỌI MESSENGER THẬT =================
        {
          id: "g2_stage2_guide",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} gọi Messenger cho {relHonorific} nhé. Nhớ nói đúng câu:\n\"{RelCall}, {victimHonorific} cần mượn 130 triệu, {relPronoun} có thể chuyển giúp {victimHonorific} không?\"",
          choices: [
            {
              text: "(Mở Messenger của {relName} để gọi thoại)",
              action: "chat_reply",
              deltaTrust: 10,
              suppressMeBubble: true,
              nextId: "g2_me_call_tuan_real"
            }
          ]
        },
        {
          id: "g2_me_call_tuan_real",
          platform: "messenger",
          isCall: true,
          callType: "voice",
          speaker: "me",
          senderName: "{name}",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:38 Hôm nay",
            type: "connected",
            title: "Cuộc gọi thoại đi",
            callTypeText: "Cuộc gọi thoại",
            durationText: "Đang kết nối...",
            isOutgoing: true
          },
          text: "{RelCall}, {relPronoun} có tiền trong tài khoản không? Cho {victimHonorific} mượn 130 triệu chút, lát {victimHonorific} trả.",
          nextId: "g2_tuan_real_confused"
        },
        {
          id: "g2_tuan_real_confused",
          platform: "messenger",
          isCall: true,
          callType: "voice",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          callCardAfter: {
            type: "ended",
            title: "Cuộc gọi thoại đi",
            callTypeText: "Cuộc gọi thoại",
            durationText: "0 phút 18 giây",
            isOutgoing: true
          },
          text: "Hả?! {VictimHonorific} cần 130 triệu làm gì? {VictimHonorific} bị gì à?\n{RelHonorific} đang ở ngoài, lát {relHonorific} gọi lại nha!",
          nextId: "g2_zalo_fake_calm"
        },
        {
          id: "g2_zalo_fake_calm",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} cứ bình tĩnh, thằng Huy đang nghe cuộc gọi rồi. {VictimHonorific} đừng nói thêm gì khác, cứ làm theo {relHonorific} hướng dẫn.\nNếu bên Messenger có gọi lại thì {victimHonorific} cứ nói đang cần tiền gấp. {RelHonorific} sẽ giải quyết phần còn lại.",
          nextId: "g2_videocall_incoming"
        },
        {
          id: "g2_videocall_incoming",
          platform: "messenger",
          isCall: true,
          callType: "videocall",
          speaker: "system",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:39 Hôm nay",
            type: "connected",
            title: "Cuộc gọi video đến",
            callTypeText: "Cuộc gọi video",
            durationText: "Đang đổ chuông...",
            isOutgoing: false
          },
          text: "(Vài phút sau, Messenger hiển thị cuộc gọi VIDEO CALL đến từ tài khoản {relName}!)",
          choices: [
            {
              text: "Bắt máy cuộc gọi Video Call của {relName}",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g2_tuan_videocall_dialogue"
            }
          ]
        },
        {
          id: "g2_tuan_videocall_dialogue",
          platform: "messenger",
          isCall: true,
          callType: "videocall",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "<div class=\"videocall-preview-box\"><div class=\"videocall-top-tag\">🔴 VIDEO CALL MESSENGER • 00:09</div><div class=\"videocall-body\"><img src=\"{relAvatar}\" class=\"videocall-img\"><div class=\"videocall-lines\"><strong>{relName}:</strong> \"{relCallPlayer}, hồi nãy {victimHonorific} gọi mượn {relHonorific} 130 triệu thật hả? Có chuyện gì vậy? {VictimHonorific} có bị ai ép hay đe dọa không? Sao tự nhiên cần nhiều tiền vậy?\"</div></div></div>",
          choices: [
            {
              text: "Ừ, {victimHonorific} đang cần tiền gấp. Không có ai đe dọa hết, {relPronoun} cứ yên tâm.",
              action: "chat_reply",
              deltaTrust: 20,
              suppressMeBubble: true,
              nextId: "g2_me_confirm_videocall_urgency"
            }
          ]
        },
        {
          id: "g2_me_confirm_videocall_urgency",
          platform: "messenger",
          isCall: true,
          callType: "videocall",
          speaker: "me",
          text: "Ừ, {victimHonorific} đang cần tiền gấp. Không có ai đe dọa hết, {relPronoun} cứ yên tâm, {victimHonorific} cần làm việc thôi.",
          nextId: "g2_tuan_check_balance"
        },
        {
          id: "g2_tuan_check_balance",
          platform: "messenger",
          isCall: true,
          callType: "videocall",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          callCardAfter: {
            type: "ended",
            title: "Cuộc gọi video đến",
            callTypeText: "Cuộc gọi video",
            durationText: "0 phút 31 giây",
            isOutgoing: false
          },
          text: "Vậy để {relHonorific} xem tài khoản có bao nhiêu rồi tính nha {victimHonorific}.",
          nextId: "g2_zalo_fake_step_2"
        },
        {
          id: "g2_zalo_fake_step_2",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} thấy chưa, thằng Huy đã tin rồi! Giờ {victimHonorific} gọi lại lần nữa nhé.\nNói là {victimHonorific} không cần đủ 130 triệu, có bao nhiêu thì chuyển bấy nhiêu qua tài khoản cho {victimHonorific}.",
          choices: [
            {
              text: "Sao phải gọi nhiều lần vậy?",
              action: "chat_reply",
              nextId: "g2_them_reason_pressure"
            }
          ]
        },
        {
          id: "g2_them_reason_pressure",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "Vì thằng Huy đang muốn biết chính xác số tiền {relHonorific} có thể huy động! {VictimHonorific} giúp {relHonorific} nốt lần này thôi, lạy {victimHonorific} đó!",
          nextId: "g2_decision_2"
        },
        {
          id: "g2_decision_2",
          platform: "zalo",
          speaker: "system",
          stageNumber: 2,
          stageTitle: "Giai đoạn 2: Cuộc gọi Messenger thật",
          text: "",
          choices: [
            {
              text: "A. Tiếp tục làm theo lời nhờ trên Zalo vì tin rằng mọi chuyện không ảnh hưởng đến mình.",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 15,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Lẫn lộn giữa việc thấy mặt người thân với tính xác thực của nội dung giao dịch",
              suppressMeBubble: true,
              nextId: "g3_stage3_call_second"
            },
            {
              text: "B. Hỏi {relShortName} lý do vì sao cần số tiền đó ngay trong cuộc gọi: \"Ủa em nhờ {victimHonorific} gọi giả vờ để đòi nợ bạn mà, sao lại gom tiền cho {victimHonorific} mượn?\"",
              action: "chat_reply",
              deltaTrust: -10,
              deltaRisk: 0,
              awarenessScore: 15,
              type: "good",
              choiceKey: "B",
              reason: "Chủ động hỏi rõ động cơ và bối cảnh của người thân ngay trong cuộc gọi thoại",
              suppressMeBubble: true,
              nextId: "g2_res_ask_why_in_call"
            },
            {
              text: "C. Dừng cuộc gọi, gọi lại số điện thoại cũ của {relShortName} để xác nhận trực tiếp.",
              action: "chat_reply",
              deltaTrust: -20,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "C",
              reason: "Dừng tương tác gián tiếp, dùng kênh SIM chính thống để kiểm tra độc lập 3 lớp",
              suppressMeBubble: true,
              nextId: "end_early_detection"
            },
            {
              text: "D. Nói đang bận, hẹn {relShortName} gọi lại sau để kiểm tra kỹ hơn.",
              action: "chat_reply",
              deltaTrust: 5,
              deltaRisk: 5,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "D",
              reason: "Trì hoãn để quan sát phản ứng của đối tượng trước áp lực tâm lý",
              suppressMeBubble: true,
              nextId: "g2_res_call_later"
            }
          ]
        },
        {
          id: "g2_res_ask_why_in_call",
          platform: "messenger",
          isCall: true,
          callType: "voice",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "Ủa {victimHonorific} hỏi lạ vậy? Đòi nợ bạn nào đâu? Hồi nãy {victimHonorific} gọi mượn {relHonorific} 130 triệu mà! {RelHonorific} tưởng {victimHonorific} đang kẹt tiền gấp nên mới hỏi Dì Mười gom thêm tiền nè. {VictimHonorific} đợi chút {relHonorific} gom được 80 triệu chuyển qua cho {victimHonorific} ngay nha!",
          choices: [
            {
              text: "Thôi để {victimHonorific} cúp máy, gọi lại số SIM chính nói chuyện rõ ràng",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "end_early_detection"
            },
            {
              text: "(Nghĩ chắc {relName} ngại bạn ngồi cạnh nên nói thác, đợi tiền vào rồi tính)",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g3_receive_money_notice"
            }
          ]
        },
        {
          id: "g2_res_call_later",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "({shortName} nhắn hẹn {relName} để lát nữa nói chuyện sau.)\n\nTài khoản Zalo giả lập tức nhắn dồn dập: \"{VictimHonorific} ơi sao tự nhiên lại hẹn lại sau? Thằng bạn em nó bảo nếu không giải quyết ngay trong 10 phút nữa là nó bỏ về quê luôn! {VictimHonorific} giúp {relHonorific} gọi lại liền đi, lạy {victimHonorific} đó!\"",
          choices: [
            {
              text: "Thấy {relName} nài nỉ tội nghiệp, mở Messenger gọi lại mượn tiền giúp",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g3_stage3_call_second"
            },
            {
              text: "Thấy hối thúc bất thường, mở danh bạ bấm gọi số SIM cũ của {relShortName}",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "end_early_detection"
            }
          ]
        },
        {
          id: "g3_stage3_call_second",
          platform: "messenger",
          isCall: true,
          callType: "voice",
          speaker: "me",
          senderName: "{name}",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:42 Hôm nay",
            type: "connected",
            title: "Cuộc gọi thoại đi",
            callTypeText: "Cuộc gọi thoại",
            durationText: "Đang kết nối...",
            isOutgoing: true
          },
          text: "{RelCall}, giờ {victimHonorific} không cần đủ 130 triệu nữa. {RelPronoun} có bao nhiêu thì cho {victimHonorific} mượn bấy nhiêu.",
          nextId: "g3_tuan_transfer_prep"
        },
        {
          id: "g3_tuan_transfer_prep",
          platform: "messenger",
          isCall: true,
          callType: "voice",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          callCardAfter: {
            type: "ended",
            title: "Cuộc gọi thoại đi",
            callTypeText: "Cuộc gọi thoại",
            durationText: "0 phút 24 giây",
            isOutgoing: true
          },
          text: "{RelHonorific} có khoảng 60–70 triệu. Để {relHonorific} hỏi mượn Dì Mười thêm 10 triệu nữa, gom lại được khoảng 80 triệu. {VictimHonorific} đợi {relHonorific} một chút nha!",
          nextId: "g3_receive_money_notice"
        },

        // ================= GIAI ĐOẠN 3: NHẬN ĐƯỢC 80 TRIỆU ĐỒNG =================
        {
          id: "g3_receive_money_notice",
          platform: "banking",
          speaker: "system",
          deltaMoney: 80000000,
          text: "<div class=\"bank-notif-box\"><div class=\"bank-notif-head\"><span class=\"bank-icon\">🏦</span> <strong>THÔNG BÁO BIẾN ĐỘNG SỐ DƯ (NGÂN HÀNG SỐ)</strong></div><div class=\"bank-notif-body\"><div class=\"bank-money\">+80.000.000 đ</div><div class=\"bank-detail-row\"><span>Người chuyển:</span> <strong>{relBankName}</strong></div><div class=\"bank-detail-row\"><span>Nội dung:</span> <strong>{bankTransferContent}</strong></div><div class=\"bank-detail-row\"><span>Trạng thái:</span> <strong style=\"color:#55f088;\">Giao dịch thành công (Tiền đã vào tài khoản)</strong></div></div></div>\n\n(Tài khoản của bạn vừa nhận được 80.000.000 đồng từ {relName}.)",
          nextId: "g3_cross_messages"
        },
        {
          id: "g3_cross_messages",
          platform: "zalo",
          speaker: "system",
          text: "<div class=\"cross-msg-box\"><div class=\"cross-msg-item messenger\"><strong>💬 Tin nhắn Messenger từ {relName} (thật):</strong><br>\"{RelCallPlayer}, {victimHonorific} nhận được 80 triệu chưa? {RelHonorific} mượn Dì Mười gom được bấy nhiêu chuyển cho {victimHonorific} lo công việc đó, xong nhớ báo {relHonorific} nha!\"</div><div class=\"cross-msg-item zalo\"><strong>💬 Tin nhắn Zalo từ {relName} (mới):</strong><br>\"{VictimHonorific} ơi, tiền 80 triệu vào tài khoản {victimHonorific} rồi đúng không? {VictimHonorific} chuyển giúp {relHonorific} số tiền này cho bạn {relHonorific} tên Thanh gấp nhé!\"</div></div>",
          nextId: "g3_decision_3"
        },
        {
          id: "g3_decision_3",
          platform: "zalo",
          speaker: "system",
          stageNumber: 3,
          stageTitle: "Giai đoạn 3: Nhận được 80 triệu đồng",
          text: "",
          choices: [
            {
              text: "A. Chuyển tiền ngay cho Thanh vì đã nhận được tiền thật từ {relRole}.",
              action: "send_money",
              deltaMoney: -80000000,
              deltaTrust: 30,
              deltaRisk: 30,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Lựa chọn rủi ro cực cao: Chuyển ngay 80 triệu cho bên thứ ba khi vừa nhận tiền",
              suppressMeBubble: true,
              nextId: "end_scammed_full_80m"
            },
            {
              text: "B. Chuyển thử 1 triệu đồng để xem tài khoản bên kia có nhận được không.",
              action: "send_money",
              deltaMoney: -1000000,
              deltaTrust: 10,
              deltaRisk: 15,
              awarenessScore: 5,
              type: "bad",
              choiceKey: "B",
              reason: "Bẫy chuyển thử: Mất 1 triệu và tạo cảm giác an toàn giả để bị thao túng tiếp",
              suppressMeBubble: true,
              nextId: "g3_res_test_1m"
            },
            {
              text: "C. Giữ nguyên tiền, gọi lại số điện thoại cũ của {relShortName} để hỏi vì sao lại nhờ chuyển cho người khác.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "C",
              reason: "Lựa chọn an toàn nhất: Tạm dừng yêu cầu chuyển tiền bất thường, gọi SIM cũ xác minh",
              suppressMeBubble: true,
              nextId: "end_late_escape"
            },
            {
              text: "D. Gửi hình ảnh biến động số dư vào tin nhắn Zalo để xác nhận.",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 10,
              awarenessScore: 5,
              type: "neutral",
              choiceKey: "D",
              reason: "Gửi ảnh chụp số dư, cung cấp dữ liệu tài chính cho kẻ gian tiếp tục dồn ép",
              suppressMeBubble: true,
              nextId: "g3_res_send_balance_screenshot"
            },
            {
              text: "E. Nhắn tin hỏi {relName} thật qua Messenger: \"Khoản 80 triệu này là chuyển tiếp cho bạn Thanh đúng không?\".",
              action: "chat_reply",
              deltaTrust: -15,
              deltaRisk: 0,
              awarenessScore: 20,
              type: "good",
              choiceKey: "E",
              reason: "Xác minh trực tiếp với người gửi tiền thật qua kênh Messenger",
              suppressMeBubble: true,
              nextId: "g3_res_ask_messenger_real"
            }
          ]
        },
        {
          id: "g3_res_test_1m",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "Bên em nhận được 1 triệu rồi! Nhưng hệ thống cổng báo lệnh đơn hàng là đúng 80 triệu, chuyển thiếu 79 triệu nên đang bị kẹt tiền lỗi đơn! {VictimHonorific} vào nhóm chat 3 người này gấp để bạn Thanh gửi mã nạp nốt 79 triệu mở khóa ngay!",
          nextId: "g4_group_invite"
        },
        {
          id: "g3_res_send_balance_screenshot",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "(Bạn gửi ảnh chụp màn hình nhận được 80.000.000 đồng từ ngân hàng)\n{RelHonorific} thấy tiền vào rồi! Để {relHonorific} tạo nhóm chat 3 người có anh Thanh bên đối tác để anh ấy gửi mã thanh toán cho {victimHonorific} chuyển nhé!",
          nextId: "g4_group_invite"
        },
        {
          id: "g3_res_ask_messenger_real",
          platform: "messenger",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "(Bạn nhắn Messenger: 'Ủa khoản 80 triệu này là chuyển tiếp cho bạn Thanh đúng không em?')\n\n{relName} thật nhắn lại ngay: \"Ủa Thanh nào {victimHonorific}?! {RelHonorific} đâu quen ai tên Thanh đâu? {RelHonorific} đi vay Dì Mười gom tiền cho {victimHonorific} mượn mà! Sao {victimHonorific} lại chuyển cho ai?!\"",
          choices: [
            {
              text: "Giật mình nhận ra mâu thuẫn nguy hiểm, dừng mọi giao dịch và gọi SIM cũ cho {relName}",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "end_late_escape"
            },
            {
              text: "(Nghĩ chắc {relName} ngại nói thật nên giấu, vẫn vào nhóm chat Zalo xem giải thích)",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g4_group_invite"
            }
          ]
        },

        // ================= GIAI ĐOẠN 4: NHÓM CHAT BA NGƯỜI =================
        {
          id: "g4_group_invite",
          platform: "zalo",
          speaker: "system",
          text: "<div class=\"group-invite-box\"><div class=\"group-tag\">👥 NHÓM ZALO</div><div class=\"group-title\">XÁC NHẬN KHOẢN TIỀN – THANH TOÁN 80 TRIỆU</div><div class=\"group-sub\">Thành viên: {shortName}, {relShortName}, Nguyễn Hoàng Thanh</div></div>\n(Chỉ 1 phút sau khi nhận tiền, tài khoản Zalo của {relName} tạo nhóm chat 3 người gồm bạn, {relName} và Nguyễn Hoàng Thanh.)",
          nextId: "g4_thanh_intro"
        },
        {
          id: "g4_thanh_intro",
          platform: "zalo",
          speaker: "them",
          senderName: "Nguyễn Hoàng Thanh",
          avatar: "assets/avatar_friend.svg",
          text: "Dạ em chào {thirdToPlayer}. Em là Thanh, bạn của {thanhFriendOf}. Em đang cần tiền để xử lý đơn hàng bên công ty:\n• Công ty TNHH Dịch Vụ Công Nghệ & TM V.N (MST: 0316889211)\n• Hotline xác thực: 028.7109.8839\nNếu {thirdToPlayer} chưa tin, {thirdToPlayer} cứ gọi hỏi {thanhFriendOf} nha, em cũng không muốn {thirdToPlayer} gặp rắc rối đâu ạ.",
          choices: [
            {
              text: "Sao không để {thanhFriendOf} tự chuyển cho em?",
              action: "chat_reply",
              nextId: "g4_thanh_explain_gateway"
            }
          ]
        },
        {
          id: "g4_thanh_explain_gateway",
          platform: "zalo",
          speaker: "them",
          senderName: "Nguyễn Hoàng Thanh",
          avatar: "assets/avatar_friend.svg",
          text: "Dạ tài khoản em đang bị giới hạn giao dịch. Với lại bên em đang cần tiền qua mã thanh toán doanh nghiệp. {ThirdToPlayer} chuyển trực tiếp giúp em cho nhanh ạ.",
          nextId: "g4_them_plead_middleman"
        },
        {
          id: "g4_them_plead_middleman",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} giúp {relHonorific} đi. Đây là việc giữa {relHonorific} với bạn {relHonorific}, hai đứa bàn bạc xong hết rồi, {victimHonorific} chỉ đứng giữa chuyển giúp thôi mà!",
          nextId: "g4_decision_4"
        },
        {
          id: "g4_decision_4",
          platform: "zalo",
          speaker: "system",
          stageNumber: 4,
          stageTitle: "Giai đoạn 4: Nhóm chat ba người",
          text: "",
          choices: [
            {
              text: "A. Tin tưởng vì có đầy đủ giấy tờ, mã số thuế và người trong nhóm chủ động cho phép kiểm tra.",
              action: "chat_reply",
              deltaTrust: 20,
              deltaRisk: 15,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Bẫy tâm lý đám đông & minh bạch giả: Tin vào sự xác nhận chéo của nhóm chat dàn cảnh",
              suppressMeBubble: true,
              nextId: "g4_res_trust_crowd"
            },
            {
              text: "B. Tự tìm kiếm thông tin công ty qua nguồn độc lập trên Cổng thông tin quốc gia.",
              action: "chat_reply",
              deltaTrust: -15,
              deltaRisk: 0,
              awarenessScore: 20,
              type: "good",
              choiceKey: "B",
              reason: "Tra cứu độc lập phát hiện công ty có thật nhưng tài khoản nhận tiền trên website khác hẳn",
              suppressMeBubble: true,
              nextId: "g4_res_check_company_indep"
            },
            {
              text: "C. Bấm gọi số điện thoại hotline do Thanh cung cấp trong nhóm chat (028.7109.8839).",
              action: "chat_reply",
              deltaTrust: 10,
              deltaRisk: 15,
              awarenessScore: 5,
              type: "neutral",
              choiceKey: "C",
              reason: "Bẫy xác minh qua kênh đối tượng đưa: Gọi hotline do kẻ gian cấp thì đồng phạm trả lời",
              suppressMeBubble: true,
              nextId: "g4_res_call_thanh_hotline"
            },
            {
              text: "D. Thoát nhóm chat, gọi điện thoại trực tiếp cho {relShortName} qua số SIM cũ đã lưu.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "D",
              reason: "Lựa chọn an toàn: Thoát khỏi vòng vây nhóm, gọi SIM cũ phá vỡ kịch bản thao túng",
              suppressMeBubble: true,
              nextId: "end_late_escape"
            },
            {
              text: "E. Tạm dừng, hỏi ý kiến một người thân khác trong gia đình qua kênh liên lạc độc lập.",
              action: "chat_reply",
              deltaTrust: -30,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "E",
              reason: "Lựa chọn đúng: Kiểm tra chéo độc lập từ người nhà, vạch trần vụ việc và phối hợp báo án",
              suppressMeBubble: true,
              nextId: "end_master_investigation"
            }
          ]
        },
        {
          id: "g4_res_trust_crowd",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "{VictimHonorific} thấy chưa, có anh Thanh ở đây xác nhận đàng hoàng rồi! {ThirdToPlayer} yên tâm chuyển đi ạ, em gửi mã ngay đây!",
          nextId: "g5_stage5_send_qr"
        },
        {
          id: "g4_res_check_company_indep",
          platform: "zalo",
          speaker: "system",
          text: "({shortName} tự mở trình duyệt tra cứu MST 0316889211 trên Cổng thông tin Đăng ký Doanh nghiệp Quốc gia:\n• Công ty TNHH DV Công Nghệ & TM V.N quả thực CÓ THẬT và đang hoạt động.\n• TUY NHIÊN: Trên website chính thức ghi rõ: 'Mọi giao dịch chỉ nhận qua STK Vietcombank mang tên Công ty. Doanh nghiệp KHÔNG nhận tiền qua tài khoản cá nhân hoặc mã nạp dịch vụ cổng trung gian!')\n\n({shortName} giật mình nhận ra: Kẻ lừa đảo đang mượn danh một công ty có thật để tạo niềm tin giả!)",
          choices: [
            {
              text: "Phát hiện kẻ gian mạo danh công ty, lập tức thoát nhóm gọi số SIM cũ của {relShortName}",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "end_late_escape"
            },
            {
              text: "(Nghĩ rằng Thanh dùng cổng đối tác thanh toán, vẫn tiếp tục để Thanh gửi mã QR)",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g5_stage5_send_qr"
            }
          ]
        },
        {
          id: "g4_res_call_thanh_hotline",
          platform: "zalo",
          speaker: "system",
          text: "(Bạn bấm gọi số hotline 028.7109.8839 do Thanh cung cấp trong nhóm chat. Chuông reo 2 hồi, một giọng nữ bắt máy:\n'Bộ phận Kế toán thanh toán xin nghe. Dạ hệ thống đang chờ lệnh chuyển 80 triệu từ tài khoản của {thirdToPlayer} để giải ngân đơn hàng của anh Nguyễn Hoàng Thanh ạ!')\n\n(Người nghe máy trả lời rất bài bản chuyên nghiệp, khiến {shortName} hoàn toàn tin tưởng đây là giao dịch công ty thật!)",
          nextId: "g5_stage5_send_qr"
        },

        // ================= GIAI ĐOẠN 5: MÃ QR VÀ CỔNG THANH TOÁN =================
        {
          id: "g5_stage5_send_qr",
          platform: "zalo",
          speaker: "them",
          senderName: "Nguyễn Hoàng Thanh",
          avatar: "assets/avatar_friend.svg",
          text: "{ThirdToPlayer} quét mã này giúp em nhé. Đây là mã thanh toán của hệ thống công ty. {ThirdToPlayer} không cần nhập số tài khoản đâu ạ:\n\n<div class=\"qr-card-box\"><div class=\"qr-card-head\">🏛️ CỔNG THANH TOÁN DOANH NGHIỆP TRUNG GIAN</div><div class=\"qr-svg-wrap\"><svg viewBox=\"0 0 100 100\" width=\"110\" height=\"110\" style=\"background:#fff; border-radius:6px; padding:6px;\"><rect width=\"100\" height=\"100\" fill=\"#fff\"/><rect x=\"10\" y=\"10\" width=\"25\" height=\"25\" fill=\"#000\"/><rect x=\"15\" y=\"15\" width=\"15\" height=\"15\" fill=\"#fff\"/><rect x=\"19\" y=\"19\" width=\"7\" height=\"7\" fill=\"#000\"/><rect x=\"65\" y=\"10\" width=\"25\" height=\"25\" fill=\"#000\"/><rect x=\"70\" y=\"15\" width=\"15\" height=\"15\" fill=\"#fff\"/><rect x=\"74\" y=\"19\" width=\"7\" height=\"7\" fill=\"#000\"/><rect x=\"10\" y=\"65\" width=\"25\" height=\"25\" fill=\"#000\"/><rect x=\"15\" y=\"70\" width=\"15\" height=\"15\" fill=\"#fff\"/><rect x=\"19\" y=\"74\" width=\"7\" height=\"7\" fill=\"#000\"/><rect x=\"45\" y=\"15\" width=\"8\" height=\"8\" fill=\"#000\"/><rect x=\"45\" y=\"35\" width=\"12\" height=\"8\" fill=\"#000\"/><rect x=\"40\" y=\"50\" width=\"18\" height=\"8\" fill=\"#000\"/><rect x=\"65\" y=\"45\" width=\"8\" height=\"18\" fill=\"#000\"/><rect x=\"40\" y=\"70\" width=\"20\" height=\"8\" fill=\"#000\"/><rect x=\"70\" y=\"70\" width=\"15\" height=\"15\" fill=\"#000\"/></svg></div><div class=\"qr-info\"><div class=\"qr-row\"><span>Đơn vị nhận:</span> <strong>CỔNG THANH TOÁN ĐIỆN TỬ</strong></div><div class=\"qr-row\"><span>Số tiền:</span> <strong>80.000.000 VNĐ</strong></div><div class=\"qr-row\"><span>Nội dung:</span> <strong>Nạp số dư tài khoản dịch vụ #88392</strong></div><div class=\"qr-row\"><span>Thời hạn:</span> <strong>10 phút (Sắp hết hạn)</strong></div></div></div>",
          choices: [
            {
              text: "Ủa, sao không hiện tên Thanh mà lại hiện cổng thanh toán?",
              action: "chat_reply",
              nextId: "g5_thanh_explain_qr_name"
            }
          ]
        },
        {
          id: "g5_thanh_explain_qr_name",
          platform: "zalo",
          speaker: "them",
          senderName: "Nguyễn Hoàng Thanh",
          avatar: "assets/avatar_friend.svg",
          text: "Dạ, hệ thống bên em dùng cổng thanh toán trung gian. Mã này được tạo tự động, nên tên người nhận không phải tên em ạ.",
          nextId: "g5_thanh_time_pressure"
        },
        {
          id: "g5_thanh_time_pressure",
          platform: "zalo",
          speaker: "them",
          senderName: "Nguyễn Hoàng Thanh",
          avatar: "assets/avatar_friend.svg",
          text: "{ThirdToPlayer} ơi, chỉ còn 5 phút thôi! Nếu {thirdToPlayer} không hoàn thành trong 5 phút thì mã hết hạn, giao dịch bị treo và bị phạt phí hủy 15 triệu đó ạ!",
          nextId: "g5_them_guilt_trip"
        },
        {
          id: "g5_them_guilt_trip",
          platform: "zalo",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          text: "(Tài khoản Zalo {relName} nhắn tin riêng cho bạn)\n\"{imposterCallPlayer}, {victimHonorific} giúp {relHonorific} lần này đi, {relHonorific} gom tiền vất vả lắm rồi. Đừng để {relHonorific} mất mặt và mang tiếng với bạn bè... {VictimHonorific} chuyển đi có gì {relHonorific} chịu hết cho!\"",
          nextId: "g5_decision_5"
        },
        {
          id: "g5_decision_5",
          platform: "zalo",
          speaker: "system",
          stageNumber: 5,
          stageTitle: "Giai đoạn 5: Mã QR và Cổng thanh toán",
          text: "",
          choices: [
            {
              text: "A. Quét mã QR chuyển toàn bộ 80 triệu đồng để tránh bị phạt phí và giữ thể diện cho {relRole}.",
              action: "send_money",
              deltaMoney: -80000000,
              deltaTrust: 30,
              deltaRisk: 30,
              awarenessScore: 0,
              type: "bad",
              choiceKey: "A",
              reason: "Quét mã QR cổng trung gian: Tiền bị tẩu tán ngay lập tức, mất trắng 80 triệu",
              suppressMeBubble: true,
              nextId: "end_scammed_full_80m"
            },
            {
              text: "B. Quét mã nhưng chỉ chuyển 1 triệu đồng để thử.",
              action: "send_money",
              deltaMoney: -1000000,
              deltaTrust: 10,
              deltaRisk: 15,
              awarenessScore: 5,
              type: "bad",
              choiceKey: "B",
              reason: "Mắc bẫy chuyển thử: Mất 1 triệu đồng và nhận ra dấu hiệu lừa đảo để dừng lại",
              suppressMeBubble: true,
              nextId: "end_near_miss_1m"
            },
            {
              text: "C. Tự gọi hotline tổng đài ngân hàng của mình để hỏi cách xác minh mã QR đáng ngờ này.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "C",
              reason: "Chủ động nhờ ngân hàng tư vấn độc lập, vạch trần mã nạp ví số dư ẩn danh",
              suppressMeBubble: true,
              nextId: "g5_res_call_bank"
            },
            {
              text: "D. Không quét mã, gọi điện thoại số SIM cũ cho {relShortName} để làm rõ toàn bộ sự việc.",
              action: "chat_reply",
              deltaTrust: -25,
              deltaRisk: 0,
              awarenessScore: 25,
              type: "good",
              choiceKey: "D",
              reason: "Lựa chọn an toàn nhất: Chấm dứt hoàn toàn nguy cơ lừa đảo, bảo toàn tài sản",
              suppressMeBubble: true,
              nextId: "end_late_escape"
            },
            {
              text: "E. Yêu cầu gọi video một lần nữa với {relShortName} để xác nhận có đúng đang nhờ chuyển không.",
              action: "chat_reply",
              deltaTrust: -5,
              deltaRisk: 5,
              awarenessScore: 10,
              type: "neutral",
              choiceKey: "E",
              reason: "Yêu cầu video call xác nhận, đối tượng kích hoạt video Deepfake để tạo áp lực",
              suppressMeBubble: true,
              nextId: "g6_videocall_deepfake_start"
            }
          ]
        },
        {
          id: "g5_res_call_bank",
          platform: "system",
          speaker: "system",
          text: "({shortName} tạm dừng ứng dụng, gọi ngay hotline tổng đài ngân hàng để hỏi về giao dịch:\n\nNhân viên ngân hàng: 'Tổng đài xin cảnh báo: Mã QR nạp số dư cổng thanh toán điện tử là hình thức nạp tiền vào ví ẩn danh, sau khi nạp sẽ không thể hoàn tác hay phong tỏa! Quý khách nghi ngờ lừa đảo tuyệt đối KHÔNG chuyển tiền!')\n\n({shortName} giật mình thở phào, lập tức đóng mã QR và mở danh bạ gọi số SIM chính cho {relName}!)",
          nextId: "end_master_investigation"
        },

        // ================= GIAI ĐOẠN 6: CUỘC GỌI CUỐI CÙNG & ÁP LỰC ĐẾM NGƯỢC =================
        {
          id: "g6_videocall_deepfake_start",
          platform: "zalo",
          isCall: true,
          callType: "deepfake",
          speaker: "system",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:48 Hôm nay",
            type: "connected",
            title: "Cuộc gọi video đến",
            callTypeText: "Cuộc gọi video",
            durationText: "Đang đổ chuông...",
            isOutgoing: false
          },
          text: "(Chuông điện thoại rung lên liên hồi: Tài khoản Zalo của {relName} đang gọi Video Call cho bạn!)",
          choices: [
            {
              text: "Bắt máy cuộc gọi Video Call của {relShortName}",
              action: "chat_reply",
              suppressMeBubble: true,
              nextId: "g6_deepfake_modal_call"
            }
          ]
        },
        {
          id: "g6_deepfake_modal_call",
          platform: "zalo",
          isCall: true,
          callType: "deepfake",
          speaker: "them",
          senderName: "{relName}",
          avatar: "assets/avatar_male.png?v=29.0",
          callCardAfter: {
            type: "ended",
            title: "Cuộc gọi video đến",
            callTypeText: "Cuộc gọi video",
            durationText: "0 phút 06 giây",
            isOutgoing: false
          },
          text: "<div class=\"videocall-fake-box\"><div class=\"fake-tag\">🔴 VIDEO CALL ZALO • 00:06</div><div class=\"fake-body\"><img src=\"{relAvatar}\" class=\"fake-avatar-anim\"><div class=\"fake-speech\"><strong>{relName}:</strong><br>\"{imposterCallPlayer}, {victimHonorific} chuyển giúp {relHonorific} đi! {RelHonorific} đang bận lắm, không nói chuyện lâu được...<br>{VictimHonorific} nhìn thấy mặt {relHonorific} rồi mà đúng không? {VictimHonorific} cứ chuyển đi, có gì {relHonorific} chịu trách nhiệm!\"</div></div></div>\n({shortName} nhìn thấy gương mặt {relName}, giọng nói cũng quen thuộc nhưng hình ảnh hơi mờ và khẩu hình có vẻ không hoàn toàn khớp với tiếng nói.)",
          nextId: "g6_countdown_warning"
        },
        {
          id: "g6_countdown_warning",
          platform: "zalo",
          speaker: "system",
          text: "<div class=\"urgent-transaction-card\"><div class=\"urgent-header\"><span class=\"urgent-icon\">⏱️</span> <strong>XÁC NHẬN GIAO DỊCH 80.000.000 ĐỒNG</strong></div><div class=\"urgent-content\"><div class=\"urgent-timer-row\">⏳ Thời gian hiệu lực: <span class=\"urgent-clock\" id=\"l4Clock\">02:00</span></div><div class=\"urgent-row\"><span>Nguồn tiền chuyển:</span> <strong>Tài khoản cá nhân (+80.000.000 đ)</strong></div><div class=\"urgent-row\"><span>Đơn vị nhận:</span> <strong>CỔNG THANH TOÁN ĐIỆN TỬ</strong></div><div class=\"urgent-row\"><span>Nội dung:</span> <strong>Nạp số dư dịch vụ #88392</strong></div><div class=\"urgent-warning\">Lưu ý: Vui lòng kiểm tra kỹ thông tin đơn vị thụ hưởng trước khi hoàn tất giao dịch. Giao dịch trực tuyến không thể hoàn tác sau khi hệ thống xử lý.</div></div></div>\n\n<div class=\"cross-msg-box\" style=\"margin-top:10px;\"><div class=\"cross-msg-item messenger\"><strong>💬 Tin nhắn Messenger từ {relName} (thật):</strong><br>\"{RelCallPlayer}, {victimHonorific} giải quyết xong việc chưa? Hồi nãy {victimHonorific} mượn tiền gấp làm {relHonorific} lo quá, sao thấy {victimHonorific} im re vậy?\"</div></div>",
          nextId: "g6_decision_6"
        },
        {
          id: "g6_decision_6",
          platform: "zalo",
          speaker: "system",
          stageNumber: 6,
          stageTitle: "Giai đoạn 6: Cuộc gọi cuối cùng & Quyết định sinh tử",
          text: "",
          choices: [
            {
              text: "A. Chuyển tiền vì đã thấy mặt {relRole} qua video call và đã nhận được 80 triệu đồng.",
              action: "send_money",
              deltaMoney: -80000000,
              type: "bad",
              choiceKey: "A",
              awarenessScore: 0,
              suppressMeBubble: true,
              reason: "Sập bẫy Deepfake hoàn toàn: Tin vào video dựng sẵn và mất trắng 80 triệu",
              nextId: "end_scammed_full_80m"
            },
            {
              text: "B. Đặt một câu hỏi bảo mật riêng tư chỉ hai người trong nhà biết trong cuộc gọi video.",
              action: "chat_reply",
              deltaTrust: -25,
              type: "good",
              choiceKey: "B",
              awarenessScore: 25,
              suppressMeBubble: true,
              reason: "Phương pháp kiểm tra xuất sắc: Dùng câu hỏi bảo mật riêng tư bóc trần video Deepfake",
              nextId: "g6_res_secret_question"
            },
            {
              text: "C. Dừng cuộc gọi, bấm số gọi lại số điện thoại SIM cũ của {relShortName}.",
              action: "finish_success",
              deltaMoney: 0,
              type: "good",
              choiceKey: "C",
              awarenessScore: 25,
              suppressMeBubble: true,
              reason: "Lựa chọn an toàn nhất: Cúp máy trước áp lực, gọi số SIM cũ phá vỡ toàn bộ kịch bản",
              nextId: "end_master_investigation"
            },
            {
              text: "D. Chuyển thử 1 triệu đồng để giữ chỗ mã thanh toán.",
              action: "send_money",
              deltaMoney: -1000000,
              type: "bad",
              choiceKey: "D",
              awarenessScore: 5,
              suppressMeBubble: true,
              reason: "Mắc bẫy chuyển thử: Mất 1 triệu đồng nhưng kịp tỉnh ngộ giữ được 79 triệu",
              nextId: "end_near_miss_1m"
            },
            {
              text: "E. Chụp màn hình cuộc gọi, báo ngay cho ngân hàng để phong tỏa tài khoản và liên hệ cơ quan công an.",
              action: "finish_success",
              deltaMoney: 0,
              type: "good",
              choiceKey: "E",
              awarenessScore: 25,
              suppressMeBubble: true,
              reason: "Quyết định chuẩn mực: Phong tỏa tài khoản kịp thời và chuyển chứng cứ cho cơ quan chức năng",
              nextId: "end_master_investigation"
            }
          ]
        },
        {
          id: "g6_res_secret_question",
          platform: "zalo",
          speaker: "system",
          text: "{shortName}: \"{RelShortName}, ủa mà con cún/mèo nhà mình tên gì, dạo này còn quậy không?\"\n\nHình ảnh video {relName} chỉ gật đầu cười máy móc: \"Dạ đúng rồi {victimHonorific}! {VictimHonorific} chuyển tiền lẹ đi, {relHonorific} đang bận lắm!\"\n\n({shortName} giật mình nhận ra: Video call này hoàn toàn không nghe hiểu câu hỏi! Đây là video dựng sẵn phát lại hoặc Deepfake AI cắt ghép! {shortName} lập tức cúp máy, mở danh bạ bấm số SIM chính để gọi cho {relName} thật và liên hệ ngân hàng phong tỏa giao dịch!)",
          nextId: "end_master_investigation"
        },

        // ================= 5 KẾT THÚC CỦA LEVEL 4 =================
        // --- KẾT THÚC 1 – PHÁT HIỆN SỚM (ENDING 1) ---
        {
          id: "end_early_detection",
          platform: "sms",
          isCall: true,
          callType: "sim",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "KẾT THÚC 1 – PHÁT HIỆN SỚM",
          endingTitle: "HÓA GIẢI 'CÚ LỪA CHỒNG KỊCH BẢN' TỪ TRỨNG NƯỚC",
          callCardBefore: {
            showDatePill: true,
            datePillText: "17:22 Hôm nay",
            type: "connected",
            title: "Cuộc gọi thoại đi (SIM)",
            callTypeText: "Cuộc gọi thoại",
            durationText: "0 phút 48 giây",
            isOutgoing: true
          },
          text: "({shortName} không tin vào tài khoản Zalo mới, lập tức mở danh bạ bấm gọi trực tiếp vào số SIM chính của {relName})\n\n{shortName}: \"{RelCall}, {relPronoun} vừa lập Zalo mới nhắn nhờ {victimHonorific} gọi Messenger giả bộ vay tiền hả?\"\n\n{relName} thật: \"Hả?! Làm gì có {victimHonorific}! {RelHonorific} đang ở trường/chỗ làm, tài khoản Zalo cũ vẫn xài bình thường mà! {RelHonorific} đâu có nhờ ai vay mượn gì đâu!\"\n\n{shortName}: \"Vậy tài khoản Zalo kết bạn với {victimHonorific} là ai?\"\n\n{relName} thật: \"Trời ơi {victimHonorific} bị kẻ xấu mạo danh lừa đảo rồi! Chặn gấp tài khoản đó đi nha {victimHonorific}!\"\n\n({shortName} nhận diện và chặn đứng thủ đoạn lừa đảo ngay từ giai đoạn đầu, bảo toàn 100% tài sản gia đình!)",
          summaryConclusion: "XUẤT SẮC! Bạn đã nhận diện tài khoản giả mạo ngay từ đầu bằng cách xác minh qua kênh liên lạc độc lập đã biết từ trước. Không bị cuốn vào bẫy tâm lý, bảo toàn trọn vẹn tài sản.",
          warningSigns: "• Khi nhận được lời kết bạn từ tài khoản mới của người thân, tuyệt đối không tin vào lý do 'Zalo cũ bị lỗi'.\n• Không gọi điện hoặc xác minh trên chính kênh do kẻ gian dẫn dụ.\n• Luôn dùng số điện thoại đã lưu trong danh bạ từ trước để kiểm tra chéo.",
          lesson: "NGUYÊN TẮC VÀNG: Xác minh qua kênh liên lạc độc lập đã biết từ trước là cách nhanh nhất và an toàn nhất để vô hiệu hóa mọi kịch bản mạo danh."
        },

        // --- KẾT THÚC 2 – THOÁT HIỂM MUỘN (ENDING 2) ---
        {
          id: "end_late_escape",
          platform: "sms",
          isCall: true,
          callType: "sim",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "KẾT THÚC 2 – THOÁT HIỂM MUỘN",
          endingTitle: "DỪNG LẠI KỊP THỜI TRƯỚC VỰC THẲM",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:50 Hôm nay",
            type: "connected",
            title: "Cuộc gọi thoại đi (SIM)",
            callTypeText: "Cuộc gọi thoại",
            durationText: "0 phút 52 giây",
            isOutgoing: true
          },
          text: "({shortName} nhận thấy sự mâu thuẫn kỳ lạ: Tiền thật đã vào tài khoản nhưng lại bị hối thúc chuyển cho một người tên Thanh qua mã QR cổng thanh toán. Bạn dừng toàn bộ giao dịch, bấm gọi trực tiếp vào số SIM cũ của {relName})\n\n{shortName}: \"{RelCall}, {victimHonorific} nhận được 80 triệu {relPronoun} gửi rồi. Nhưng sao Zalo của {relPronoun} lại giục {victimHonorific} quét mã chuyển 80 triệu cho anh Thanh nào đó?\"\n\n{relName} thật: \"Trời đất ơi {victimHonorific}! {RelHonorific} gom hết tiền đi vay gửi {victimHonorific} lo công việc của {victimHonorific} mà! {RelHonorific} không hề quen ai tên Thanh, cũng không có nhờ {victimHonorific} chuyển cho ai hết!\"\n\n{shortName}: \"Vậy nhóm chat Zalo 3 người hồi nãy là sao?\"\n\n{relName} thật: \"Lừa đảo đó {victimHonorific} ơi! May quá {victimHonorific} chưa chuyển tiền! Giữ nguyên 80 triệu đó giùm {relHonorific}!\"\n\n({shortName} thở phào nhẹ nhõm, kịp thời giữ lại được 80 triệu đồng mồ hôi nước mắt của gia đình!)",
          summaryConclusion: "THOÁT HIỂM NGOẠN MỤC! Dù bị cuốn theo kịch bản đến những phút cuối, bạn đã có quyết định sáng suốt nhất: DỪNG LẠI VÀ GỌI ĐIỆN XÁC MINH TRỰC TIẾP trước khi tiền rời khỏi tài khoản.",
          warningSigns: "• Tiền thật được chuyển đến tài khoản không đồng nghĩa với yêu cầu chuyển tiếp là thật.\n• Kẻ gian lợi dụng chính bạn để lừa người thân chuyển tiền, rồi dùng nhóm chat đồng phạm để ép bạn chuyển tiếp.\n• Cổng thanh toán nạp số dư trung gian không có tên người nhận rõ ràng là cạm bẫy không thể truy thu.",
          lesson: "Khi nhận tiền từ người A nhưng bị yêu cầu chuyển cho người B, luôn dừng lại và xác minh trực tiếp với người A."
        },

        // --- KẾT THÚC 3 – SUÝT MẤT TIỀN (ENDING 3) ---
        {
          id: "end_near_miss_1m",
          platform: "zalo",
          speaker: "system",
          isEnd: true,
          status: "warning",
          financialLoss: 1000000,
          endingCode: "KẾT THÚC 3 – SUÝT MẤT TIỀN",
          endingTitle: "BẪY CHUYỂN THỬ & KỊP THỜI TỈNH NGỘ",
          text: "Bạn chọn 'chuyển thử 1 triệu đồng' vào mã QR cổng thanh toán trung gian. Số tiền 1.000.000 VNĐ lập tức bị nuốt chửng!\n\nNgay sau đó, kẻ gian điên cuồng nhắn tin thúc giục: \"Hệ thống báo lỗi không khớp đơn hàng 80 triệu rồi! {ThirdToPlayer} chuyển gấp 79 triệu còn lại ngay đi không là mất luôn 1 triệu đó!\"\n\nLúc này bạn bừng tỉnh, nhận ra tâm lý 'chuyển thử' đã khiến mình mất 1 triệu. Bạn lập tức bấm gọi số SIM cũ của {relName} và phát hiện toàn bộ sự thật.\n\nBạn mất 1.000.000 VNĐ nhưng đã kịp thời dừng lại để bảo vệ trọn vẹn 79.000.000 VNĐ còn lại cho gia đình.",
          summaryConclusion: "CẢNH BÁO! Bạn đã mất 1.000.000 VNĐ do bẫy tâm lý 'chuyển thử một ít cho an tâm'. 'Chuyển thử' vào tài khoản lừa đảo thì tiền vẫn mất! May mắn là bạn đã không bị cuốn theo chi phí chìm và giữ lại được 79 triệu.",
          warningSigns: "• 'Chuyển thử' là một cái bẫy tâm lý phổ biến khiến nạn nhân dần bước chân vào kịch bản mất tiền lớn.\n• Cổng thanh toán dịch vụ tự động không bao giờ hoàn trả tiền nạp thử.\n• Áp lực 'nếu không nộp thêm sẽ mất tiền nộp trước' là dấu hiệu lừa đảo điển hình.",
          lesson: "Tuyệt đối không chuyển bất kỳ khoản tiền nào (kể cả 10.000đ hay 1.000.000đ) vào tài khoản hoặc mã QR chưa được xác minh 3 lớp độc lập."
        },

        // --- KẾT THÚC 4 – SẬP BẪY (ENDING 4) ---
        {
          id: "end_scammed_full_80m",
          platform: "zalo",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 80000000,
          endingCode: "KẾT THÚC 4 – SẬP BẪY",
          endingTitle: "MẤT TRẮNG 80 TRIỆU ĐỒNG VÀO CỔNG RỬA TIỀN",
          text: "{shortName} nhấn xác nhận quét mã QR chuyển toàn bộ 80.000.000 VNĐ.\nGiao dịch thực hiện thành công.\n\nChỉ 5 giây sau: Nhóm Zalo lập tức bị giải tán! Tài khoản Zalo giả mạo và tài khoản Thanh đều đồng loạt chặn bạn! Mã QR không còn tồn tại.\n\n{shortName} run rẩy gọi lại số SIM chính cho {relName}:\n{relName} thật: \"{VictimHonorific} ơi, {relHonorific} vừa gom hết tiền đi vay mượn gửi {victimHonorific} lo công việc đó, {victimHonorific} nhận được chưa? {VictimHonorific} chuyển cho ai vậy?!\"\n\n{shortName} chết lặng. Toàn bộ 80 triệu đồng gom góp của {relRole} đã biến mất vĩnh viễn không thể thu hồi.",
          summaryConclusion: "BẠN ĐÃ MẤT TRẮNG 80 TRIỆU ĐỒNG! Bạn đã sập bẫy 'Cú Lừa Chồng Kịch Bản' nhiều tầng: Dùng bạn làm con rối mượn tiền người thân -> Dùng tiền thật tạo bằng chứng giả -> Dùng nhóm chat đồng phạm tạo áp lực đám đông -> Dùng cổng thanh toán nạp số dư để rửa sạch tiền.",
          warningSigns: "• Tiền thật vào tài khoản không đồng nghĩa với việc yêu cầu chuyển tiếp là thật.\n• Video Call thấy mặt người thân không phải bảo chứng an toàn cho giao dịch tài chính với bên thứ ba.\n• Cổng thanh toán trung gian / nạp số dư là công cụ tẩu tán tiền phi pháp của tội phạm mạng.",
          lesson: "Một giao dịch tài chính phải được xác minh độc lập qua 3 Lớp Xác Thực: Đúng Người – Đúng Sự Việc – Đúng Giao Dịch."
        },

        // --- KẾT THÚC 5 – NHẬN DIỆN TOÀN DIỆN (ENDING 5) ---
        {
          id: "end_master_investigation",
          platform: "sms",
          isCall: true,
          callType: "sim",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "KẾT THÚC 5 – NHẬN DIỆN TOÀN DIỆN",
          endingTitle: "BẬC THẦY VẠCH TRẦN CÚ LỪA 3 TẦNG",
          callCardBefore: {
            showDatePill: true,
            datePillText: "18:55 Hôm nay",
            type: "connected",
            title: "Cuộc gọi thoại đi (SIM)",
            callTypeText: "Cuộc gọi thoại",
            durationText: "0 phút 58 giây",
            isOutgoing: true
          },
          text: "({shortName} xử lý tình huống như một chuyên gia an ninh mạng: Dùng câu hỏi bảo mật riêng tư khiến Video Deepfake bị lộ tẩy, kiên quyết từ chối quét mã QR, đồng thời liên hệ ngân hàng yêu cầu phong tỏa khẩn cấp và gọi số SIM chính cho {relName})\n\n{shortName}: \"{RelCall}, {relPronoun} bị kẻ xấu lợi dụng để chuyển tiền vào tài khoản của {victimHonorific} nhằm tẩu tán qua cổng nạp tiền! {VictimHonorific} đã báo ngân hàng phong tỏa và chuẩn bị làm việc với công an!\"\n\n{relName} thật: \"Trời ơi {victimHonorific} xuất sắc quá! Hồi nãy {relHonorific} cứ lo lắng không biết {victimHonorific} có chuyện gì! May có {victimHonorific} tỉnh táo vạch trần đường dây của bọn nó!\"\n\n(Cơ quan chức năng tiếp nhận toàn bộ bằng chứng hình ảnh, mã QR và đoạn ghi âm từ {shortName}, mở chuyên án triệt phá đường dây rửa tiền xuyên biên giới. Toàn bộ 80 triệu đồng được an toàn tuyệt đối!)",
          summaryConclusion: "ĐẲNG CẤP CHUYÊN GIA! Bạn đã phá vỡ hoàn toàn cú lừa 3 tầng phức tạp: Nhận diện thao túng người thân, vô hiệu hóa Video Call Deepfake bằng câu hỏi bảo mật ngẫu nhiên, không để áp lực thời gian chi phối và phối hợp cơ quan chức năng bảo toàn tài sản.",
          warningSigns: "• Video Call Deepfake AI thường có khẩu hình lệch, không nghe hiểu hoặc không trả lời được các câu hỏi kiểm tra thời gian thực.\n• Mã QR cổng dịch vụ trung gian luôn đi kèm bẫy áp lực thời gian (10 phút, 2 phút) để nạn nhân không kịp suy nghĩ.\n• Sự bình tĩnh và phối hợp với ngân hàng / công an là biện pháp phản đòn hiệu quả nhất.",
          lesson: "BẬC THẦY CẢNH GIÁC: Luôn kiểm tra 3 Lớp Xác Thực Độc Lập: Đúng Người (ai đang giao dịch) – Đúng Sự Việc (có đúng lý do không) – Đúng Giao Dịch (tiền đi về đâu)."
        },

        // --- CÁC NODE TƯƠNG THÍCH CODE CŨ ---
        {
          id: "end_safe_level4",
          platform: "sms",
          isCall: true,
          callType: "sim",
          speaker: "system",
          isEnd: true,
          status: "win",
          financialLoss: 0,
          endingCode: "KẾT THÚC 2 – THOÁT HIỂM MUỘN",
          endingTitle: "DỪNG LẠI KỊP THỜI TRƯỚC VỰC THẲM",
          nextId: "end_late_escape"
        },
        {
          id: "end_scammed_level4",
          platform: "zalo",
          speaker: "system",
          isEnd: true,
          status: "lost",
          financialLoss: 80000000,
          endingCode: "KẾT THÚC 4 – SẬP BẪY",
          endingTitle: "MẤT TRẮNG 80 TRIỆU ĐỒNG VÀO CỔNG RỬA TIỀN",
          nextId: "end_scammed_full_80m"
        },
        {
          id: "end_partial_scam_level4",
          platform: "zalo",
          speaker: "system",
          isEnd: true,
          status: "warning",
          financialLoss: 1000000,
          endingCode: "KẾT THÚC 3 – SUÝT MẤT TIỀN",
          endingTitle: "BẪY CHUYỂN THỬ & KỊP THỜI TỈNH NGỘ",
          nextId: "end_near_miss_1m"
        }
      ],
      lesson: "Một giao dịch tài chính phải được xác minh độc lập qua 3 Lớp Xác Thực: Đúng Người – Đúng Sự Việc – Đúng Giao Dịch. Không bao giờ chuyển tiền theo hướng dẫn của tài khoản lạ hoặc mã QR cổng trung gian."
    }
  ]
};

// ================= LEVEL 4: SƠ ĐỒ CÂY PHÂN NHÁNH QUYẾT ĐỊNH (DECISION TREE GRAPH) =================
window.LEVEL_4_DECISION_TREE = {
  title: "SƠ ĐỒ CÂY PHÂN NHÁNH QUYẾT ĐỊNH – CÚ LỪA CHỒNG KỊCH BẢN",
  stages: [
    {
      id: "stage_1",
      number: 1,
      name: "Giai đoạn 1",
      title: "TÀI KHOẢN ZALO MỚI",
      situation: "Tài khoản Zalo mới kết bạn mạo danh người thân, lấy lý do mới đổi máy và Zalo cũ bị lỗi, nhắc chuyện mẹ bàn tiền sửa nhà để tạo niềm tin rồi nhờ gọi Messenger giả bộ hỏi mượn 130 triệu đồng.",
      decisionId: "g1_decision_1",
      options: [
        {
          id: "g1_opt_A",
          key: "A",
          shortTitle: "Tin vì chuyện sửa nhà",
          text: "Tin tưởng vì tài khoản biết chuyện tiền sửa nhà trong gia đình.",
          type: "bad",
          score: 0,
          risk: 25,
          loss: 0,
          nextTargetId: "g2_stage2_guide",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Bẫy ngộ nhận bảo mật: Thông tin tiền sửa nhà có thật trong gia đình không chứng minh người trò chuyện là {relName}. Kẻ gian có thể đã nghe lỏm hoặc thu thập thông tin từ trước.",
          trap: "Bẫy 'Bằng chứng không đồng nghĩa kết luận': Có thông tin thật nhưng suy luận sai người trò chuyện.",
          lesson: "Tuyệt đối không dùng thông tin sự việc chung chung trong gia đình để làm căn cứ xác thực tài khoản mới."
        },
        {
          id: "g1_opt_B",
          key: "B",
          shortTitle: "Hỏi chuyện cũ bí mật",
          text: "Hỏi thêm một câu chuyện cũ chỉ hai người mới biết.",
          type: "risk",
          score: 8,
          risk: 15,
          loss: 0,
          nextTargetId: "g2_stage2_guide",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Kẻ gian trả lời được hoặc lảng tránh khéo léo nhờ thông tin lộ lọt trên MXH. Việc kẻ gian trả lời đúng vô tình tạo cảm giác an toàn giả, khiến bạn càng tin tưởng hơn.",
          trap: "Bẫy an toàn giả: Nghĩ chuyện quá khứ chỉ người trong nhà mới biết.",
          lesson: "Kẻ xấu thời nay thu thập dấu vết số rất kỹ. Các kỷ niệm du lịch hay chuyện cũ thường đã từng được kể lại trên mạng xã hội."
        },
        {
          id: "g1_opt_C",
          key: "C",
          shortTitle: "Gọi số SIM cũ đã lưu",
          text: "Gọi vào số điện thoại cũ của người thân đã lưu từ trước.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_early_detection",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_early_detection",
          analysis: "Kênh độc lập đã biết từ trước. Người thân thật lập tức xác nhận Zalo cũ vẫn dùng bình thường, không hề có nick mới và không nhờ mượn tiền.",
          trap: "Không mắc bẫy! Bạn đã chọn giải pháp an toàn tuyệt đối.",
          lesson: "NGUYÊN TẮC VÀNG: Luôn xác minh qua kênh liên lạc độc lập đã biết từ trước khi nhận được yêu cầu từ tài khoản mới."
        },
        {
          id: "g1_opt_D",
          key: "D",
          shortTitle: "Nhắn hỏi mẹ xác nhận",
          text: "Nhắn tin riêng cho mẹ để xác nhận người thân có đang liên hệ chuyện tiền không.",
          type: "risk",
          score: 10,
          risk: 20,
          loss: 0,
          nextTargetId: "g2_stage2_guide",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Bẫy thông tin đúng nhưng kết luận sai: Mẹ xác nhận có chuyện tiền bạc chung chung, nhưng mẹ hoàn toàn không biết gì về khoản 130 triệu hay nick Zalo mới. Lời xác nhận của mẹ củng cố lòng tin sai lầm.",
          trap: "Bẫy xác thực không trọn vẹn: Người thân vô tình củng cố thêm kịch bản của kẻ gian.",
          lesson: "Khi xác minh với bên thứ ba, phải hỏi đúng nội dung cụ thể (STK, số tiền, kênh liên lạc), không hỏi chung chung."
        }
      ]
    },
    {
      id: "stage_2",
      number: 2,
      name: "Giai đoạn 2",
      title: "CUỘC GỌI MESSENGER THẬT",
      situation: "Bạn gọi Messenger cho người thân thật. Người thân thật nghe máy, tưởng bạn cần tiền nên đồng ý gom 80 triệu. Kẻ lừa đảo trên Zalo tiếp tục dồn ép hối thúc.",
      decisionId: "g2_decision_2",
      options: [
        {
          id: "g2_opt_A",
          key: "A",
          shortTitle: "Tiếp tục làm theo Zalo",
          text: "Tiếp tục làm theo lời nhờ trên Zalo vì tin rằng mọi chuyện không ảnh hưởng đến mình.",
          type: "bad",
          score: 0,
          risk: 30,
          loss: 0,
          nextTargetId: "g3_receive_money_notice",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Bạn vô tình trở thành 'con rối' truyền tin giúp kẻ lừa đảo thao túng người thân thật, khiến người thân thật đi vay mượn gom tiền cho bạn.",
          trap: "Bẫy vô can: Nghĩ việc mượn tiền chỉ là kịch bản giả vờ, không dính dáng đến tài chính của mình.",
          lesson: "Đừng bao giờ làm trung gian truyền tin vay mượn tiền cho người khác mà không hiểu rõ bản chất."
        },
        {
          id: "g2_opt_B",
          key: "B",
          shortTitle: "Hỏi lý do trong cuộc gọi",
          text: "Hỏi rõ lý do ngay trong cuộc gọi: \"Ủa em nhờ chị gọi giả vờ để đòi nợ bạn mà, sao lại gom tiền cho chị mượn?\"",
          type: "good",
          score: 15,
          risk: 10,
          loss: 0,
          nextTargetId: "g3_receive_money_notice",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Bước ngoặt nhận thức: Nhận ra sự mâu thuẫn khổng lồ giữa hai bên (Người thân thật gom tiền cho mượn, còn Zalo giả bảo gọi giả vờ để đòi nợ). Nếu tỉnh táo cúp máy gọi SIM cũ sẽ thoát bẫy ngay.",
          trap: "Bẫy hiểu lầm hai chiều: Kẻ gian điều khiển hai người thật nhưng khiến mỗi bên hiểu theo một hướng ngược nhau.",
          lesson: "Khi thấy có sự bất khớp về mục đích mượn tiền giữa 2 bên, cần lập tức dừng lại đối chất trực tiếp."
        },
        {
          id: "g2_opt_C",
          key: "C",
          shortTitle: "Dừng lại, gọi số SIM cũ",
          text: "Dừng cuộc gọi, gọi lại số điện thoại cũ của người thân để xác nhận trực tiếp.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_early_detection",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_early_detection",
          analysis: "Kiểm tra chéo độc lập, phát hiện mâu thuẫn câu chuyện ngay lập tức và chặn đứng âm mưu trước khi có bất kỳ dòng tiền nào phát sinh.",
          trap: "Không mắc bẫy! Bạn đã ngắt kết nối với kịch bản gián tiếp của kẻ gian.",
          lesson: "Một cuộc gọi bất thường phải được kiểm tra lại khi cả hai bên đã ngắt liên lạc với kẻ thứ ba."
        },
        {
          id: "g2_opt_D",
          key: "D",
          shortTitle: "Hẹn gọi lại sau để kiểm tra",
          text: "Nói đang bận, hẹn người thân gọi lại sau để kiểm tra kỹ hơn.",
          type: "risk",
          score: 10,
          risk: 15,
          loss: 0,
          nextTargetId: "g3_stage3_call_second",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Trì hoãn để quan sát: Đối tượng Zalo lập tức nhắn tin dồn ép tâm lý, nài nỉ sợ bạn bỏ về mất nợ, bộc lộ sự thúc bách bất thường của kẻ lừa đảo.",
          trap: "Bẫy thao túng tâm lý: Kẻ gian tạo áp lực thời gian để nạn nhân không kịp suy nghĩ.",
          lesson: "Kẻ lừa đảo luôn sợ thời gian trôi qua vì nạn nhân sẽ có cơ hội kiểm chứng."
        }
      ]
    },
    {
      id: "stage_3",
      number: 3,
      name: "Giai đoạn 3",
      title: "NHẬN ĐƯỢC 80 TRIỆU ĐỒNG",
      situation: "Tài khoản của bạn nhận được +80.000.000đ thật từ người thân. Messenger người thân báo gửi tiền cho bạn mượn, trong khi Zalo mới yêu cầu chuyển gấp 80 triệu cho người khác.",
      decisionId: "g3_decision_3",
      options: [
        {
          id: "g3_opt_A",
          key: "A",
          shortTitle: "Chuyển tiền ngay cho Thanh",
          text: "Chuyển tiền ngay cho Thanh vì đã nhận được tiền thật từ người thân.",
          type: "bad",
          score: 0,
          risk: 100,
          loss: 80000000,
          nextTargetId: "end_scammed_full_80m",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_scammed_full_80m",
          analysis: "Lựa chọn rủi ro cực cao: Chuyển 80 triệu ngay khi vừa nhận tiền vào tài khoản người lạ. Tiền gom góp của người thân mất trắng hoàn toàn.",
          trap: "Bẫy mồi nhử tiền thật: Tiền thật trong tài khoản làm mờ đi mọi phản xạ phòng vệ.",
          lesson: "Tiền thật vào tài khoản là mồi nhử tinh vi nhất. Kẻ gian dùng chính tiền của người thân bạn để lừa bạn chuyển đi."
        },
        {
          id: "g3_opt_B",
          key: "B",
          shortTitle: "Chuyển thử 1 triệu đồng",
          text: "Chuyển thử 1 triệu đồng để xem tài khoản bên kia có nhận được không.",
          type: "bad",
          score: 5,
          risk: 40,
          loss: 1000000,
          nextTargetId: "g4_group_invite",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Bẫy chi phí chìm: Mất 1 triệu đồng. Kẻ gian lập tức báo cổng lỗi và giục nạp nốt 79 triệu mở khóa, kéo nạn nhân vào nhóm chat 3 người.",
          trap: "Bẫy chuyển thử: Nghĩ chuyển ít là an toàn, nhưng mất tiền thử kích hoạt tâm lý muốn gỡ lại.",
          lesson: "Tuyệt đối không 'chuyển thử' vào tài khoản hoặc mã QR lạ. Một khi chuyển là mất."
        },
        {
          id: "g3_opt_C",
          key: "C",
          shortTitle: "Tạm dừng, gọi số SIM cũ",
          text: "Giữ nguyên tiền, gọi lại số điện thoại cũ của người thân để hỏi vì sao lại nhờ chuyển cho người khác.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_late_escape",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_late_escape",
          analysis: "Lựa chọn an toàn nhất. Người thân khẳng định chỉ gom tiền cho bạn mượn, không hề nhờ chuyển cho bất kỳ ai. Toàn bộ 80 triệu được giữ lại.",
          trap: "Không mắc bẫy! Bạn nhận ra sự bất thường khi tiền từ người A lại bị ép gửi cho người B.",
          lesson: "Khi nhận tiền từ người A nhưng bị yêu cầu chuyển cho người B, 100% là thủ đoạn tam giác rửa tiền / chiếm đoạt."
        },
        {
          id: "g3_opt_D",
          key: "D",
          shortTitle: "Gửi ảnh số dư vào Zalo",
          text: "Gửi hình ảnh biến động số dư vào tin nhắn Zalo để xác nhận.",
          type: "risk",
          score: 5,
          risk: 20,
          loss: 0,
          nextTargetId: "g4_group_invite",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Cung cấp bằng chứng số dư giúp kẻ gian nắm thóp bạn đã có tiền và tạo cớ lôi kéo đồng phạm vào nhóm chat dồn ép.",
          trap: "Bẫy cung cấp thông tin: Vô tình xác nhận cho kẻ lừa đảo biết mồi nhử đã vào vị trí.",
          lesson: "Không chia sẻ ảnh chụp số dư ngân hàng cho bất kỳ bên thứ ba nào trên mạng xã hội."
        },
        {
          id: "g3_opt_E",
          key: "E",
          shortTitle: "Nhắn hỏi Messenger người thân",
          text: "Nhắn tin hỏi người thân thật qua Messenger: \"Khoản 80 triệu này là chuyển tiếp cho bạn Thanh đúng không?\".",
          type: "good",
          score: 20,
          risk: 5,
          loss: 0,
          nextTargetId: "g4_group_invite",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Bằng chứng lộ sáng: Người thân khẳng định không hề quen ai tên Thanh và không nhờ chuyển cho ai. Đây là khoảnh khắc vàng để người chơi nhận ra sự thật.",
          trap: "Bẫy không tin người thật: Đã có cảnh báo từ người thật nhưng vẫn tò mò vào nhóm chat xem giải thích.",
          lesson: "Khi người gửi tiền thật khẳng định không biết người thụ hưởng thứ ba, 100% là thủ đoạn lừa đảo tam giác."
        }
      ]
    },
    {
      id: "stage_4",
      number: 4,
      name: "Giai đoạn 4",
      title: "NHÓM CHAT BA NGƯỜI",
      situation: "Bạn bị đưa vào nhóm chat có bạn, Zalo giả và Thanh. Thanh đưa thông tin công ty, mã số thuế, hotline và tỏ ra rất minh bạch để tạo áp lực đám đông.",
      decisionId: "g4_decision_4",
      options: [
        {
          id: "g4_opt_A",
          key: "A",
          shortTitle: "Tin vì đông người & giấy tờ",
          text: "Tin tưởng vì có đầy đủ giấy tờ, mã số thuế và người trong nhóm chủ động cho phép kiểm tra.",
          type: "bad",
          score: 0,
          risk: 35,
          loss: 0,
          nextTargetId: "g5_stage5_send_qr",
          nextStageNumber: 5,
          isEnding: false,
          analysis: "Bẫy tâm lý đám đông: Cả hai tài khoản trong nhóm đều là của kẻ gian hoặc đồng phạm dàn cảnh.",
          trap: "Bẫy hiệu ứng bầy đàn & minh bạch giả: Cảm giác an tâm khi thấy đối tượng chủ động cho kiểm tra.",
          lesson: "Số lượng người xác nhận trong một nhóm chat ảo không có giá trị chứng minh sự thật."
        },
        {
          id: "g4_opt_B",
          key: "B",
          shortTitle: "Tra cứu công ty độc lập",
          text: "Tự tìm kiếm thông tin công ty qua nguồn độc lập trên Cổng thông tin quốc gia.",
          type: "good",
          score: 20,
          risk: 5,
          loss: 0,
          nextTargetId: "g5_stage5_send_qr",
          nextStageNumber: 5,
          isEnding: false,
          analysis: "Phát hiện tinh vi: Công ty CÓ THẬT trên Cổng thông tin ĐKKD, nhưng tài khoản chính thức là STK ngân hàng doanh nghiệp, KHÔNG PHẢI mã QR nạp ví số dư dịch vụ! Kẻ gian mượn danh công ty có thật để lừa đảo.",
          trap: "Bẫy mượn danh doanh nghiệp: Công ty có thật nhưng kẻ gian không đại diện cho công ty đó.",
          lesson: "Có mã số thuế thật không đồng nghĩa giao dịch nạp tiền qua mã QR là hợp pháp."
        },
        {
          id: "g4_opt_C",
          key: "C",
          shortTitle: "Gọi hotline do Thanh đưa",
          text: "Bấm gọi số điện thoại hotline do Thanh cung cấp trong nhóm chat (028.7109.8839).",
          type: "bad",
          score: 5,
          risk: 30,
          loss: 0,
          nextTargetId: "g5_stage5_send_qr",
          nextStageNumber: 5,
          isEnding: false,
          analysis: "Bẫy xác minh qua kênh đối tượng đưa: Gọi hotline do nhóm lừa đảo đưa thì đồng phạm tiếp tân/kế toán nghe máy trả lời chuyên nghiệp, khiến nạn nhân tin sái cổ.",
          trap: "Bẫy xác thực tuần hoàn: Xác minh kẻ lừa đảo bằng chính số điện thoại do kẻ lừa đảo cấp.",
          lesson: "Không bao giờ xác minh qua số hotline, đường link hay số điện thoại do đối tượng lạ cung cấp."
        },
        {
          id: "g4_opt_D",
          key: "D",
          shortTitle: "Thoát nhóm, gọi số SIM cũ",
          text: "Thoát nhóm chat, gọi điện thoại trực tiếp cho người thân qua số SIM cũ đã lưu.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_late_escape",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_late_escape",
          analysis: "Lựa chọn đúng và an toàn: Thoát khỏi vòng vây tâm lý nhóm, người thân khẳng định không biết Thanh là ai, bảo vệ trọn vẹn 80 triệu.",
          trap: "Không mắc bẫy! Bạn đã chủ động phá vỡ kịch bản thao túng nhóm.",
          lesson: "Khi thấy nhiều người cùng thúc ép chuyển tiền trong một nhóm lạ, hãy thoát ra và kiểm tra độc lập."
        },
        {
          id: "g4_opt_E",
          key: "E",
          shortTitle: "Hỏi người thân khác độc lập",
          text: "Tạm dừng, hỏi ý kiến một người thân khác trong gia đình qua kênh liên lạc độc lập.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_master_investigation",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_master_investigation",
          analysis: "Kiểm tra chéo từ bên ngoài vòng vây, người nhà cảnh báo lừa đảo ngay lập tức và hỗ trợ bạn liên hệ cơ quan công an.",
          trap: "Không mắc bẫy! Bạn đã kích hoạt mạng lưới hỗ trợ gia đình.",
          lesson: "Luôn tìm góc nhìn thứ ba độc lập từ người thân đáng tin cậy khi đối mặt với quyết định tài chính lớn."
        }
      ]
    },
    {
      id: "stage_5",
      number: 5,
      name: "Giai đoạn 5",
      title: "MÃ QR VÀ CỔNG THANH TOÁN",
      situation: "Thanh gửi mã QR dẫn đến cổng thanh toán trung gian / nạp số dư tài khoản dịch vụ, dồn ép thời hạn 5 phút sắp hết hạn và nài nỉ đánh vào tình thân.",
      decisionId: "g5_decision_5",
      options: [
        {
          id: "g5_opt_A",
          key: "A",
          shortTitle: "Quét mã chuyển 80 triệu",
          text: "Quét mã QR chuyển toàn bộ 80 triệu đồng để tránh bị phạt phí và giữ thể diện cho người thân.",
          type: "bad",
          score: 0,
          risk: 100,
          loss: 80000000,
          nextTargetId: "end_scammed_full_80m",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_scammed_full_80m",
          analysis: "Tiền nạp vào cổng dịch vụ trung gian sẽ lập tức bị tẩu tán và rửa sạch, không thể phong tỏa hay thu hồi.",
          trap: "Bẫy mã QR ẩn danh: Quét mã mà không kiểm tra tên người thụ hưởng thực tế.",
          lesson: "Mã QR cổng thanh toán trung gian / nạp số dư là công cụ rửa tiền phổ biến nhất hiện nay."
        },
        {
          id: "g5_opt_B",
          key: "B",
          shortTitle: "Quét mã chuyển thử 1 triệu",
          text: "Quét mã nhưng chỉ chuyển 1 triệu đồng để thử.",
          type: "bad",
          score: 5,
          risk: 40,
          loss: 1000000,
          nextTargetId: "end_near_miss_1m",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_near_miss_1m",
          analysis: "Mất 1 triệu đồng vào cổng thanh toán. Cổng báo lỗi không khớp đơn hàng. May mắn bạn kịp thức tỉnh dừng lại, giữ được 79 triệu.",
          trap: "Bẫy chuyển thử nghiệm: Mất tiền vì tò mò hoặc muốn xoa dịu áp lực.",
          lesson: "Chuyển thử vẫn là mất tiền cho kẻ lừa đảo."
        },
        {
          id: "g5_opt_C",
          key: "C",
          shortTitle: "Gọi tổng đài ngân hàng tư vấn",
          text: "Tự gọi hotline tổng đài ngân hàng của mình để hỏi cách xác minh mã QR đáng ngờ này.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_master_investigation",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_master_investigation",
          analysis: "Chuyên gia ngân hàng cảnh báo ngay: Mã QR nạp số dư ví dịch vụ ẩn danh, không có chức năng hoàn tiền và không thể phong tỏa khi chuyển. Bạn lập tức đóng mã QR và dừng giao dịch.",
          trap: "Không mắc bẫy! Bạn đã chủ động tìm đến cơ quan chuyên môn tài chính.",
          lesson: "Khi nghi ngờ một mã QR thanh toán lạ, hãy gọi ngay tổng đài ngân hàng của chính bạn để kiểm tra tính hợp lệ."
        },
        {
          id: "g5_opt_D",
          key: "D",
          shortTitle: "Không chuyển, gọi trực tiếp",
          text: "Không quét mã, gọi điện thoại số SIM cũ cho người thân để làm rõ toàn bộ sự việc.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_late_escape",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_late_escape",
          analysis: "Lựa chọn an toàn nhất: Kiên quyết từ chối quét mã lạ, bấm gọi SIM cũ cho người thân, chấm dứt hoàn toàn nguy cơ lừa đảo.",
          trap: "Không mắc bẫy! Bạn giữ vững nguyên tắc tài chính cốt lõi.",
          lesson: "Không bao giờ quét mã thanh toán không hiển thị rõ họ tên người thụ hưởng hợp pháp."
        },
        {
          id: "g5_opt_E",
          key: "E",
          shortTitle: "Yêu cầu gọi video xác nhận",
          text: "Yêu cầu gọi video một lần nữa với người thân để xác nhận có đúng đang nhờ chuyển không.",
          type: "risk",
          score: 10,
          risk: 25,
          loss: 0,
          nextTargetId: "g6_videocall_deepfake_start",
          nextStageNumber: 6,
          isEnding: false,
          analysis: "Kẻ gian lập tức chấp nhận và gọi video bằng công nghệ Deepfake chập chờn để đánh lừa thị giác.",
          trap: "Bẫy niềm tin thị giác: Nghĩ thấy mặt qua video là an toàn tuyệt đối.",
          lesson: "Cần cảnh giác với các cuộc gọi video chập chờn, khẩu hình không khớp hoặc tắt máy quá nhanh."
        }
      ]
    },
    {
      id: "stage_6",
      number: 6,
      name: "Giai đoạn 6",
      title: "CUỘC GỌI CUỐI CÙNG & ÁP LỰC ĐẾM NGƯỢC",
      situation: "Tài khoản Zalo gọi Video Call Deepfake 6 giây giục chuyển tiền gấp, đồng hồ đếm ngược 02:00 nhấp nháy đỏ, kèm tin nhắn Messenger lo lắng từ người thân thật.",
      decisionId: "g6_decision_6",
      options: [
        {
          id: "g6_opt_A",
          key: "A",
          shortTitle: "Chuyển tiền vì thấy mặt",
          text: "Chuyển tiền vì đã thấy mặt người thân qua video call và đã nhận được 80 triệu đồng.",
          type: "bad",
          score: 0,
          risk: 100,
          loss: 80000000,
          nextTargetId: "end_scammed_full_80m",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_scammed_full_80m",
          analysis: "Sập bẫy Deepfake AI và áp lực đếm ngược. Nhóm chat giải tán ngay sau đó, mất trắng 80 triệu đồng.",
          trap: "Bẫy hoảng loạn thời gian: Đồng hồ đếm ngược khiến nạn nhân mất khả năng suy xét lý trí.",
          lesson: "Thấy mặt trên video call không đồng nghĩa với người thật đang nói chuyện thật tại thời điểm đó."
        },
        {
          id: "g6_opt_B",
          key: "B",
          shortTitle: "Hỏi câu hỏi bảo mật bí mật",
          text: "Đặt một câu hỏi bảo mật riêng tư chỉ hai người trong nhà biết trong cuộc gọi video.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_master_investigation",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_master_investigation",
          analysis: "Vũ khí tối thượng khắc chế Deepfake: Video phát lại/cắt ghép không thể trả lời câu hỏi thời gian thực. Đối tượng cười gật đầu máy móc lộ rõ bản chất lừa đảo. Bạn lập tức cúp máy và báo công an.",
          trap: "Không mắc bẫy! Bạn đã làm chủ tình thế bằng câu hỏi kiểm tra thời gian thực.",
          lesson: "Hỏi câu hỏi kiểm tra ngẫu nhiên hoặc yêu cầu hành động kỳ lạ là cách hiệu quả nhất để lật tẩy Deepfake."
        },
        {
          id: "g6_opt_C",
          key: "C",
          shortTitle: "Dừng lại, gọi số SIM cũ",
          text: "Dừng cuộc gọi, mở danh bạ bấm gọi lại số điện thoại SIM cũ của người thân.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_master_investigation",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_master_investigation",
          analysis: "Lựa chọn an toàn nhất: Cúp máy trước áp lực, gọi số SIM cũ phá vỡ toàn bộ kịch bản lừa đảo nhiều tầng.",
          trap: "Không mắc bẫy! Bạn đã làm chủ tình thế trước áp lực thời gian.",
          lesson: "Dừng lại trước áp lực thời gian là chìa khóa vàng để không bao giờ bị lừa đảo."
        },
        {
          id: "g6_opt_D",
          key: "D",
          shortTitle: "Chuyển thử 1 triệu giữ chỗ",
          text: "Chuyển thử 1 triệu đồng để giữ chỗ mã thanh toán.",
          type: "bad",
          score: 5,
          risk: 40,
          loss: 1000000,
          nextTargetId: "end_near_miss_1m",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_near_miss_1m",
          analysis: "Mất 1 triệu đồng. Kẻ gian thúc giục tiếp nhưng bạn kịp thức tỉnh dừng lại, bảo toàn 79 triệu đồng.",
          trap: "Bẫy thỏa hiệp: Cố gắng chiều lòng kẻ lừa đảo bằng một khoản tiền nhỏ.",
          lesson: "Không bao giờ để chi phí chìm (1 triệu đã mất) dẫn dắt bạn ném thêm tiền vào hố đen lừa đảo."
        },
        {
          id: "g6_opt_E",
          key: "E",
          shortTitle: "Báo ngân hàng & cơ quan chức năng",
          text: "Chụp màn hình cuộc gọi, báo ngay cho ngân hàng để phong tỏa tài khoản và liên hệ cơ quan công an.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_master_investigation",
          nextStageNumber: "end",
          isEnding: true,
          endingId: "end_master_investigation",
          analysis: "Quyết định chuẩn mực: Phong tỏa tài khoản kịp thời, bảo toàn tài sản và hỗ trợ cơ quan điều tra triệt phá đường dây.",
          trap: "Không mắc bẫy! Đẳng cấp xử lý của một chuyên gia nhận diện.",
          lesson: "Báo ngay cho cơ quan chức năng và ngân hàng khi phát hiện dấu hiệu lừa đảo công nghệ cao."
        }
      ]
    }
  ],
  endings: [
    {
      id: "end_early_detection",
      code: "ENDING 1 – PHÁT HIỆN SỚM",
      title: "HÓA GIẢI 'CÚ LỪA CHỒNG KỊCH BẢN' TỪ TRỨNG NƯỚC",
      rank: "CẢNH GIÁC CAO (EARLY DETECTION)",
      type: "win",
      safetyScore: 100,
      riskScore: 0,
      loss: 0,
      color: "#10b981",
      description: "Phát hiện tài khoản Zalo là giả mạo ngay từ giai đoạn 1 hoặc 2 bằng cách xác minh qua kênh liên lạc độc lập đã biết từ trước. Không bị cuốn vào bẫy tâm lý, bảo toàn trọn vẹn tài sản."
    },
    {
      id: "end_late_escape",
      code: "ENDING 2 – THOÁT HIỂM MUỘN",
      title: "DỪNG LẠI KỊP THỜI TRƯỚC VỰC THẲM",
      rank: "NHẬN DIỆN TỐT (LATE ESCAPE)",
      type: "win",
      safetyScore: 80,
      riskScore: 20,
      loss: 0,
      color: "#10b981",
      description: "Bị cuốn theo kịch bản đến giai đoạn 3, 4 hoặc 5 nhưng đã kịp thời dừng lại trước khi chuyển tiền cho bên thứ ba. Giữ được trọn vẹn 80 triệu đồng của người thân."
    },
    {
      id: "end_near_miss_1m",
      code: "ENDING 3 – SUÝT MẤT TIỀN",
      title: "BẪY CHUYỂN THỬ & KỊP THỜI TỈNH NGỘ",
      rank: "THIẾU CẨN TRỌNG (NEAR MISS)",
      type: "warning",
      safetyScore: 60,
      riskScore: 40,
      loss: 1000000,
      color: "#f59e0b",
      description: "Mắc bẫy tâm lý 'chuyển thử một ít cho an tâm' và mất 1.000.000 VNĐ. May mắn kịp thời nhận ra sự bất thường và dừng lại, bảo toàn 79 triệu đồng còn lại."
    },
    {
      id: "end_scammed_full_80m",
      code: "ENDING 4 – SẬP BẪY",
      title: "MẤT TRẮNG 80 TRIỆU ĐỒNG VÀO CỔNG RỬA TIỀN",
      rank: "DỄ BỊ THAO TÚNG (SCAMMED)",
      type: "lost",
      safetyScore: 0,
      riskScore: 100,
      loss: 80000000,
      color: "#ef4444",
      description: "Quét mã QR chuyển toàn bộ 80 triệu đồng cho cổng thanh toán trung gian. Nhóm chat giải tán ngay sau đó, tài khoản bị chặn, người thân thật gọi điện đòi tiền trong tuyệt vọng."
    },
    {
      id: "end_master_investigation",
      code: "ENDING 5 – NHẬN DIỆN TOÀN DIỆN",
      title: "BẬC THẦY VẠCH TRẦN CÚ LỪA 3 TẦNG",
      rank: "CHUYÊN GIA NHẬN DIỆN (MASTER)",
      type: "win",
      safetyScore: 100,
      riskScore: 0,
      loss: 0,
      color: "#3b82f6",
      description: "Trải qua các vòng thử thách, nhận diện rõ Deepfake và thao túng tâm lý nhóm, dùng câu hỏi bảo mật độc lập và báo cơ quan chức năng phong tỏa, bảo toàn an toàn tuyệt đối tài sản."
    }
  ]
};

// ================= LEVEL 3: SƠ ĐỒ CÂY PHÂN NHÁNH QUYẾT ĐỊNH (BẪY CỘNG TÁC VIÊN ONLINE) =================
window.LEVEL_3_DECISION_TREE = {
  title: "SƠ ĐỒ CÂY PHÂN NHÁNH QUYẾT ĐỊNH – BẪY CỘNG TÁC VIÊN ONLINE",
  stages: [
    {
      id: "lv3_s1",
      number: 1,
      name: "Giai đoạn 1",
      title: "LỜI MỜI VIỆC NHẸ LƯƠNG CAO",
      situation: "Nhận tin nhắn Zalo từ Tuyết Nhi tuyển CTV thanh toán đơn hàng online cho sàn TMĐT, nạp tiền cá nhân ứng trước, hoàn gốc 100% + hoa hồng 10% sau 3-5 phút.",
      decisionId: "lv3_g1_decision_1",
      options: [
        {
          id: "lv3_s1_opt_A",
          key: "A",
          shortTitle: "Chặn từ đầu",
          text: "Chặn tài khoản và bỏ qua lời mời tuyển dụng này.",
          type: "good",
          score: 20,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_1_block_early",
          nextStageNumber: 1,
          isEnding: true,
          analysis: "Phòng thủ số hoàn hảo: Nhận diện việc nhẹ lương cao là dấu hiệu lừa đảo kinh điển, không tương tác, bảo toàn 100% tài sản và thông tin.",
          trap: "Không mắc bẫy!",
          lesson: "Không có công việc nào chỉ ngồi nhà dùng tiền túi chuyển khoản hộ mà kiếm tiền triệu mỗi ngày."
        },
        {
          id: "lv3_s1_opt_B",
          key: "B",
          shortTitle: "Hỏi tên công ty & địa chỉ",
          text: "Hỏi rõ tên công ty, địa chỉ và thông tin tuyển dụng.",
          type: "risk",
          score: 8,
          risk: 15,
          loss: 0,
          nextTargetId: "lv3_g2_stage_start",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Kẻ gian dễ dàng mượn danh một công ty có thật (V-Commerce) với MST và địa chỉ thật để tạo cảm giác uy tín giả.",
          trap: "Bẫy danh tính mượn danh: Tên công ty thật nhưng kẻ tuyển dụng là giả mạo.",
          lesson: "Có tên và MST công ty không chứng minh người đang chat Zalo là nhân viên của công ty đó."
        },
        {
          id: "lv3_s1_opt_C",
          key: "C",
          shortTitle: "Tra cứu Internet",
          text: "Tìm kiếm tên công ty mà Tuyết Nhi giới thiệu trên Internet.",
          type: "risk",
          score: 10,
          risk: 10,
          loss: 0,
          nextTargetId: "lv3_g2_stage_start",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Phát hiện công ty thật có bài cảnh báo mạo danh, nhưng đối tượng khéo léo ngụy biện là do 'đối thủ cạnh tranh bôi nhọ' và mời thử đơn 500k.",
          trap: "Bẫy ngụy biện đối thủ cạnh tranh.",
          lesson: "Khi thấy bài cảnh báo mạo danh từ chính doanh nghiệp, hãy dừng lại ngay lập tức."
        },
        {
          id: "lv3_s1_opt_D",
          key: "D",
          shortTitle: "Hỏi bạn bè người quen",
          text: "Nhắn tin hỏi một người quen xem đã từng làm công việc tương tự chưa.",
          type: "risk",
          score: 10,
          risk: 10,
          loss: 0,
          nextTargetId: "lv3_g2_stage_start",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Bạn bè cảnh báo chính xác nhưng đối tượng thuyết phục bằng đơn thử nhỏ 500k nhận 550k để lung lay ý chí cảnh giác.",
          trap: "Bẫy mời thử nghiệm rủi ro thấp.",
          lesson: "Lắng nghe lời khuyên cảnh báo của bạn bè, không để lời hứa 'thử đơn nhỏ' lung lay."
        },
        {
          id: "lv3_s1_opt_E",
          key: "E",
          shortTitle: "Đồng ý thử đơn nhỏ",
          text: "Đồng ý thử một đơn hàng nhỏ vì chưa phải đầu tư nhiều tiền.",
          type: "bad",
          score: 0,
          risk: 25,
          loss: 0,
          nextTargetId: "lv3_g2_stage_start",
          nextStageNumber: 2,
          isEnding: false,
          analysis: "Mắc bẫy tâm lý tò mò: Nghĩ rằng số tiền nhỏ 500k thì không có rủi ro, chính thức bước vào phễu lừa đảo.",
          trap: "Bẫy tò mò & coi nhẹ nguy cơ nhỏ.",
          lesson: "Kẻ lừa đảo luôn bắt đầu từ số tiền nhỏ để bạn tự gỡ bỏ hàng rào phòng thủ."
        }
      ]
    },
    {
      id: "lv3_s2",
      number: 2,
      name: "Giai đoạn 2",
      title: "THẢ TÉP BẮT TÔM – TIỀN THẬT, HOA HỒNG THẬT",
      situation: "Chuyển 500k nhận 550k (+50k), chuyển 2M nhận 2.2M (+200k). Tài khoản thực sự tăng 250k. Tuyết Nhi gửi ảnh CTV khác khen ngợi để tạo niềm tin.",
      decisionId: "lv3_g2_decision_2",
      options: [
        {
          id: "lv3_s2_opt_A",
          key: "A",
          shortTitle: "Tiếp tục làm tiếp",
          text: "Tiếp tục làm tiếp vì cả hai đơn đều được hoàn tiền và trả hoa hồng thật.",
          type: "bad",
          score: 0,
          risk: 30,
          loss: 0,
          nextTargetId: "lv3_g3_vip_pitch",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Nhầm lẫn giữa 'giao dịch nhỏ thành công' với 'công việc uy tín'. Bạn đã hoàn toàn rơi vào bẫy tâm lý thả tép bắt tôm.",
          trap: "Bẫy thả tép bắt tôm: Kẻ gian bỏ ra 250k mồi câu để chuẩn bị mẻ lưới 80 triệu.",
          lesson: "Tiền mồi nhỏ luôn được trả rất sòng phẳng. Đừng lấy đó làm bằng chứng uy tín cho tương lai."
        },
        {
          id: "lv3_s2_opt_B",
          key: "B",
          shortTitle: "Kiểm tra app ngân hàng",
          text: "Kiểm tra xem khoản tiền nhận được có thực sự nằm trong số dư khả dụng không.",
          type: "risk",
          score: 5,
          risk: 20,
          loss: 0,
          nextTargetId: "lv3_g3_vip_pitch",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Tiền thật đã vào tài khoản, tạo cảm giác an toàn giả tuyệt đối khiến bạn càng tin tưởng vào các bước tiếp theo.",
          trap: "Bẫy tiền thật: Tiền vào ATM thật không có nghĩa công việc là hợp pháp.",
          lesson: "Bọn tội phạm dùng chính tiền của nạn nhân khác để trả hoa hồng cho bạn."
        },
        {
          id: "lv3_s2_opt_C",
          key: "C",
          shortTitle: "Đòi hợp đồng CTV",
          text: "Yêu cầu Tuyết Nhi cung cấp hợp đồng CTV và quy định hoàn tiền pháp lý.",
          type: "risk",
          score: 8,
          risk: 15,
          loss: 0,
          nextTargetId: "lv3_g3_vip_pitch",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Kẻ gian gửi file PDF có mộc đỏ giả mạo và điều khoản cam kết hoàn tiền 100% trong 5 phút.",
          trap: "Bẫy mộc đỏ giả mạo trên file điện tử.",
          lesson: "Mộc đỏ trên ảnh hay file scan hoàn toàn có thể làm giả trong 2 phút bằng Photoshop."
        },
        {
          id: "lv3_s2_opt_D",
          key: "D",
          shortTitle: "Hỏi chuyện CTV khác",
          text: "Yêu cầu nói chuyện trực tiếp với cộng tác viên khác để hỏi kinh nghiệm.",
          type: "risk",
          score: 8,
          risk: 15,
          loss: 0,
          nextTargetId: "lv3_g3_vip_pitch",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Được cho liên hệ Zalo của CTV Hải Yến (đồng phạm hoặc tài khoản ảo vào tung hứng khen ngợi thu nhập).",
          trap: "Bẫy chim mồi (Shill): Dàn dựng lời chứng thực giả.",
          lesson: "Lời chứng thực từ tài khoản lạ trên mạng không bao giờ là căn cứ xác minh."
        },
        {
          id: "lv3_s2_opt_E",
          key: "E",
          shortTitle: "Dừng lại & kiểm chứng",
          text: "Dừng lại và tìm hiểu đơn vị tuyển dụng qua kênh chính thức độc lập.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_2_stop_after_small",
          nextStageNumber: 2,
          isEnding: true,
          analysis: "Tỉnh táo xuất sắc: Nhận diện hoa hồng 10% trong vài phút là phi lý, gọi tổng đài sàn TMĐT xác minh và dừng lại, giữ nguyên 250k tiền lãi.",
          trap: "Không mắc bẫy!",
          lesson: "Biết dừng lại đúng lúc khi nhận thấy mô hình kinh doanh có dấu hiệu bất thường."
        },
        {
          id: "lv3_s2_opt_F",
          key: "F",
          shortTitle: "Đề nghị rút tiền về",
          text: "Đề nghị rút toàn bộ tiền đã kiếm được rồi mới quyết định làm tiếp.",
          type: "risk",
          score: 10,
          risk: 10,
          loss: 0,
          nextTargetId: "lv3_g3_vip_pitch",
          nextStageNumber: 3,
          isEnding: false,
          analysis: "Tiền đã nằm sẵn trong thẻ ATM, đối tượng lập tức tung ra đơn VIP 80 triệu để không cho bạn kịp suy nghĩ.",
          trap: "Bẫy thả lỏng ban đầu.",
          lesson: "Càng dễ nhận tiền ở bước đầu thì cái bẫy giăng phía sau càng nguy hiểm."
        }
      ]
    },
    {
      id: "lv3_s3",
      number: 3,
      name: "Giai đoạn 3",
      title: "CÁI BẪY VIP – HOA HỒNG 12 TRIỆU",
      situation: "Được mời lên CTV VIP với đơn hàng 80 triệu, hoa hồng 15% (12 triệu), chốt hoàn 92 triệu. Tuyết Nhi hối thúc giữ suất đến 20h. Bạn thân nhắn tin cảnh báo.",
      decisionId: "lv3_g3_decision_3",
      options: [
        {
          id: "lv3_s3_opt_A",
          key: "A",
          shortTitle: "Tin vì 2 đơn trước uy tín",
          text: "Tin Tuyết Nhi vì hai đơn trước đã thanh toán sòng phẳng.",
          type: "bad",
          score: 0,
          risk: 30,
          loss: 0,
          nextTargetId: "lv3_g4_urgency",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Lấy bằng chứng quy mô nhỏ (2 triệu) để bảo chứng cho rủi ro khổng lồ (80 triệu).",
          trap: "Bẫy suy diễn sai quy mô: Nghĩ đơn 80 triệu cũng sẽ hoàn tiền như đơn 2 triệu.",
          lesson: "Số tiền tăng vọt gấp 40 lần là tín hiệu đỏ báo hiệu bẫy tài chính sắp sập xuống."
        },
        {
          id: "lv3_s3_opt_B",
          key: "B",
          shortTitle: "Vay bạn bè để nạp",
          text: "Gom tiền và đi vay bạn bè để hoàn thành đơn 80 triệu lấy 12 triệu hoa hồng.",
          type: "bad",
          score: 0,
          risk: 35,
          loss: 0,
          nextTargetId: "lv3_g4_urgency",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Lòng tham hoa hồng 12 triệu kích thích hành vi liều lĩnh, sẵn sàng đi vay nợ để nộp tiền cho kẻ gian.",
          trap: "Bẫy tham lam & vay nợ làm nhiệm vụ ảo.",
          lesson: "Không bao giờ vay mượn tiền để phục vụ công việc 'làm nhiệm vụ online'."
        },
        {
          id: "lv3_s3_opt_C",
          key: "C",
          shortTitle: "Đòi chứng minh đại diện",
          text: "Yêu cầu Tuyết Nhi chứng minh quyền đại diện cho doanh nghiệp và quy trình thanh toán.",
          type: "risk",
          score: 8,
          risk: 15,
          loss: 0,
          nextTargetId: "lv3_g4_urgency",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Kẻ gian gửi ảnh CCCD và ảnh văn phòng đông đúc (ảnh đánh cắp trên mạng) để trấn an.",
          trap: "Bẫy danh tính giả mạo trên không gian mạng.",
          lesson: "Ảnh CCCD gửi qua mạng không chứng minh danh tính thật của người đang chat."
        },
        {
          id: "lv3_s3_opt_D",
          key: "D",
          shortTitle: "Tạm dừng, xác minh độc lập",
          text: "Tạm dừng, không vay và tìm cách xác minh độc lập trước khi chuyển thêm tiền.",
          type: "good",
          score: 15,
          risk: 5,
          loss: 0,
          nextTargetId: "lv3_g4_urgency",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Hãm phanh tâm lý kịp thời: Nhận thấy sự chênh lệch phi lý giữa đơn nhỏ và đơn 80 triệu.",
          trap: "Vượt qua bẫy hưng phấn tài chính.",
          lesson: "Khi đối tượng yêu cầu số tiền lớn đột biến, hãy dừng lại ít nhất 24 giờ để kiểm chứng."
        },
        {
          id: "lv3_s3_opt_E",
          key: "E",
          shortTitle: "Đề nghị công ty tự thanh toán",
          text: "Đề nghị công ty tự thanh toán đơn hàng thay vì bắt dùng tiền cá nhân của CTV.",
          type: "risk",
          score: 12,
          risk: 5,
          loss: 0,
          nextTargetId: "lv3_g4_urgency",
          nextStageNumber: 4,
          isEnding: false,
          analysis: "Đối tượng từ chối với lý do 'tăng tương tác người dùng thật', tiếp tục ép nạp tiền túi.",
          trap: "Bẫy quy tắc kỹ thuật giả định.",
          lesson: "Nếu là việc của công ty, công ty phải tự ứng ngân sách, không bao giờ bắt CTV bỏ tiền túi."
        },
        {
          id: "lv3_s3_opt_F",
          key: "F",
          shortTitle: "Từ chối VIP, giữ 250k",
          text: "Yêu cầu giữ số tiền 250k đã kiếm được và dứt khoát từ chối lên cấp VIP.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 3,
          isEnding: true,
          analysis: "Thoát hiểm ngoạn mục: Không tham hoa hồng ảo 12 triệu, bảo toàn trọn vẹn 80 triệu vốn tiết kiệm.",
          trap: "Không mắc bẫy!",
          lesson: "Biết kiềm chế lòng tham là bức tường phòng thủ kiên cố nhất trước mọi loại tội phạm mạng."
        }
      ]
    },
    {
      id: "lv3_s4",
      number: 4,
      name: "Giai đoạn 4",
      title: "ĐIỂM NÚT QUYẾT ĐỊNH – 80 TRIỆU ĐỒNG",
      situation: "Tuyết Nhi tạo áp lực khẩn cấp: Chỉ giữ suất VIP đến 20:00 tối nay. Bạn đứng trước quyết định tài chính sinh tử.",
      decisionId: "lv3_g4_decision_4",
      options: [
        {
          id: "lv3_s4_opt_A",
          key: "A",
          shortTitle: "Chuyển đủ 80 triệu",
          text: "Chuyển đủ 80 triệu để nhận hoa hồng 12 triệu.",
          type: "bad",
          score: 0,
          risk: 50,
          loss: 80000000,
          nextTargetId: "lv3_g5_start_transfer",
          nextStageNumber: 5,
          isEnding: false,
          analysis: "Sập bẫy hoàn toàn: Chuyển toàn bộ 80 triệu đồng vào tài khoản của kẻ gian trong trạng thái bị áp lực thời gian thao túng.",
          trap: "Bẫy thời hạn khẩn cấp (Artificial Urgency).",
          lesson: "Càng bị hối thúc 'chỉ còn hôm nay / hết hạn ngay', càng chắc chắn đó là bẫy lừa đảo."
        },
        {
          id: "lv3_s4_opt_B",
          key: "B",
          shortTitle: "Chuyển thử 5 triệu",
          text: "Chuyển thử 5 triệu trước để kiểm tra hệ thống có xử lý được không.",
          type: "bad",
          score: 5,
          risk: 35,
          loss: 5000000,
          nextTargetId: "lv3_g4_res_pay_5m_trial",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Mắc bẫy an toàn giả: Kẻ gian lấy cớ 'đơn VIP nguyên khối không tách nhỏ' để nuốt trọn 5 triệu.",
          trap: "Bẫy chuyển thử để kiểm tra độ tin cậy.",
          lesson: "Không bao giờ dùng tiền thật chuyển vào tài khoản kẻ xấu để thăm dò."
        },
        {
          id: "lv3_s4_opt_C",
          key: "C",
          shortTitle: "Rút tiền kiếm được rồi dừng",
          text: "Yêu cầu rút toàn bộ tiền đã kiếm được và dừng hẳn công việc.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Kiên quyết dừng lại, tiền 250k đã trong tài khoản, bảo toàn 80 triệu trọn vẹn.",
          trap: "Không mắc bẫy!",
          lesson: "Dứt khoát rút lui khi thấy rủi ro tài chính vượt ngưỡng an toàn."
        },
        {
          id: "lv3_s4_opt_D",
          key: "D",
          shortTitle: "Đòi hợp đồng pháp lý ký tên",
          text: "Yêu cầu hợp đồng và cam kết hoàn tiền có chữ ký đại diện pháp luật trước khi nộp.",
          type: "good",
          score: 20,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Đòi hỏi căn cứ pháp lý khiến đối tượng lúng túng né tránh, người chơi nhận ra sự mờ ám và rút lui.",
          trap: "Thử thách tính pháp lý thực tế.",
          lesson: "Các tổ chức lừa đảo online luôn né tránh các thủ tục pháp lý gặp mặt trực tiếp."
        },
        {
          id: "lv3_s4_opt_E",
          key: "E",
          shortTitle: "Gọi tổng đài sàn TMĐT thật",
          text: "Tìm số điện thoại tổng đài chính thức của sàn TMĐT để xác minh.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Xác minh độc lập qua kênh chính thức: Tổng đài sàn khẳng định 100% lừa đảo, thoát bẫy thành công.",
          trap: "Kiểm chứng độc lập thành công.",
          lesson: "Chỉ tin thông tin từ kênh hỗ trợ chính thức có tick xanh hoặc in trên website chính hãng."
        },
        {
          id: "lv3_s4_opt_F",
          key: "F",
          shortTitle: "Đòi công ty tự ứng tiền",
          text: "Đề nghị công ty ứng tiền hoặc thanh toán trực tiếp cho đơn hàng.",
          type: "good",
          score: 20,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Thấy đối tượng nổi giận ép buộc khi bị từ chối, nhận ra bản chất và dừng lại kịp thời.",
          trap: "Nhận diện thái độ khi bị từ chối.",
          lesson: "Bên tuyển dụng chân chính không bao giờ nổi giận hay ép buộc ứng viên phải nộp tiền."
        },
        {
          id: "lv3_s4_opt_G",
          key: "G",
          shortTitle: "Từ chối VIP & lưu bằng chứng",
          text: "Từ chối đơn VIP, dừng chuyển tiền và chụp lưu lại toàn bộ trao đổi.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 0,
          nextTargetId: "end_lv3_3_escape_before_vip",
          nextStageNumber: 4,
          isEnding: true,
          analysis: "Dứt khoát từ chối, bảo toàn trọn vẹn tài sản và thu thập chứng cứ phòng vệ số.",
          trap: "Phòng thủ số chủ động.",
          lesson: "Biết nói 'KHÔNG' là kỹ năng quan trọng nhất để bảo vệ túi tiền của bạn."
        }
      ]
    },
    {
      id: "lv3_s5",
      number: 5,
      name: "Giai đoạn 5",
      title: "LỖI HỆ THỐNG – BẪY GỠ VỐN",
      situation: "Chuyển xong 80 triệu, đối tượng báo lỗi sai cú pháp, xuất hiện 'Chuyên viên Hướng dẫn' ép nộp thêm 50 triệu bảo hiểm để rút 142 triệu.",
      decisionId: "lv3_g5_decision_5",
      options: [
        {
          id: "lv3_s5_opt_A",
          key: "A",
          shortTitle: "Nộp thêm 50 triệu",
          text: "Chuyển thêm 50 triệu để lấy lại toàn bộ 130 triệu và hoa hồng.",
          type: "bad",
          score: 0,
          risk: 50,
          loss: 130000000,
          nextTargetId: "lv3_g5_res_pay_50m_full",
          nextStageNumber: 5,
          isEnding: true,
          analysis: "Sập bẫy chi phí chìm (Sunk Cost Fallacy): Nộp thêm 50 triệu, mất trắng toàn bộ 130 triệu đồng.",
          trap: "Bẫy gỡ vốn: Càng tiếc tiền cũ nộp thêm càng mất nhiều.",
          lesson: "Không bao giờ nộp thêm tiền để 'chuộc' lại số tiền đã bị treo."
        },
        {
          id: "lv3_s5_opt_B",
          key: "B",
          shortTitle: "Vay mượn nộp 50 triệu",
          text: "Đi vay mượn người thân để nộp 50 triệu nhằm cứu 80 triệu đã nộp.",
          type: "bad",
          score: 0,
          risk: 50,
          loss: 130000000,
          nextTargetId: "lv3_g5_res_pay_50m_full",
          nextStageNumber: 5,
          isEnding: true,
          analysis: "Vay nợ để gỡ vốn, nợ nần chồng chất khi kẻ gian cắt liên lạc và ôm tiền biến mất.",
          trap: "Bẫy hoảng loạn & gánh nợ thay kẻ lừa đảo.",
          lesson: "Tuyệt đối không vay mượn để đổ thêm tiền vào các giao dịch nghi vấn."
        },
        {
          id: "lv3_s5_opt_C",
          key: "C",
          shortTitle: "Đòi văn bản & kiên quyết dừng",
          text: "Yêu cầu Tuyết Nhi giải thích lỗi bằng văn bản và kiên quyết không nạp thêm.",
          type: "good",
          score: 15,
          risk: 20,
          loss: 80000000,
          nextTargetId: "lv3_g6_ghosted",
          nextStageNumber: 6,
          isEnding: false,
          analysis: "Cắt lỗ kịp thời: Kiên quyết không nạp thêm 1 xu, chặn đứng chuỗi thiệt hại mở rộng.",
          trap: "Cắt lỗ kịp thời trước bẫy gỡ vốn.",
          lesson: "Mất 80 triệu là bài học đắt giá, nhưng dừng lại vẫn giữ được 50 triệu còn lại."
        },
        {
          id: "lv3_s5_opt_D",
          key: "D",
          shortTitle: "Dừng chuyển, gọi ngân hàng",
          text: "Dừng chuyển tiền, liên hệ ngân hàng ngay và lưu lại toàn bộ bằng chứng.",
          type: "good",
          score: 25,
          risk: 10,
          loss: 80000000,
          nextTargetId: "lv3_g6_decision_6",
          nextStageNumber: 6,
          isEnding: false,
          analysis: "Hành động chuẩn xác: Nhận diện bẫy lừa đảo, dừng chuyển tiền và kích hoạt quy trình xử lý khẩn cấp.",
          trap: "Không mắc bẫy gỡ vốn!",
          lesson: "Dừng chuyển tiền ngay lập tức là bước đầu tiên để bảo vệ bản thân."
        },
        {
          id: "lv3_s5_opt_E",
          key: "E",
          shortTitle: "Gọi số do Kỹ thuật đưa",
          text: "Gọi số điện thoại ngân hàng do Chuyên viên Hướng dẫn cung cấp.",
          type: "bad",
          score: 5,
          risk: 30,
          loss: 80000000,
          nextTargetId: "lv3_g5_res_fake_bank_call",
          nextStageNumber: 5,
          isEnding: false,
          analysis: "Bẫy xác thực tuần hoàn: Kẻ gian cho số giả mạo, đồng phạm nghe máy tiếp tục ép nộp 50 triệu.",
          trap: "Bẫy hotline đồng phạm dàn cảnh.",
          lesson: "Không bao giờ gọi số ngân hàng do đối tượng lừa đảo cung cấp."
        },
        {
          id: "lv3_s5_opt_F",
          key: "F",
          shortTitle: "Tự tìm hotline ngân hàng thật",
          text: "Tự tìm số tổng đài chính thức của ngân hàng để thông báo giao dịch đáng ngờ.",
          type: "good",
          score: 25,
          risk: 10,
          loss: 80000000,
          nextTargetId: "lv3_g6_decision_6",
          nextStageNumber: 6,
          isEnding: false,
          analysis: "Liên hệ đúng hotline trên thẻ ATM, được tư vấn tra soát khẩn cấp và bảo vệ thông tin.",
          trap: "Kênh độc lập chính thống.",
          lesson: "Số hotline ngân hàng in ở mặt sau thẻ ATM luôn là kênh liên hệ đáng tin cậy nhất."
        },
        {
          id: "lv3_s5_opt_G",
          key: "G",
          shortTitle: "Nhắn năn nỉ Tuyết Nhi",
          text: "Tiếp tục nhắn tin với Tuyết Nhi để năn nỉ, thương lượng hoàn lại 80 triệu.",
          type: "risk",
          score: 8,
          risk: 25,
          loss: 80000000,
          nextTargetId: "lv3_g6_ghosted",
          nextStageNumber: 6,
          isEnding: false,
          analysis: "Năn nỉ vô vọng, kẻ lừa đảo lập tức chặn số khi biết nạn nhân không thể nộp thêm tiền.",
          trap: "Hy vọng hão huyền vào kẻ lừa đảo.",
          lesson: "Tội phạm lừa đảo hoàn toàn vô cảm, không có chuyện thương lượng hoàn tiền."
        }
      ]
    },
    {
      id: "lv3_s6",
      number: 6,
      name: "Giai đoạn 6",
      title: "SỰ BIẾN MẤT – XỬ LÝ KHỦNG HOẢNG",
      situation: "Tuyết Nhi chặn Zalo, Chuyên viên Hướng dẫn biến mất, số điện thoại không liên lạc được. Bạn phải xử lý hậu quả sau sự cố.",
      decisionId: "lv3_g6_decision_6",
      options: [
        {
          id: "lv3_s6_opt_A",
          key: "A",
          shortTitle: "Báo ngân hàng & công an ngay",
          text: "Dừng dứt khoát mọi giao dịch, gọi hotline ngân hàng chính thức tra soát và đến công an trình báo.",
          type: "good",
          score: 25,
          risk: 0,
          loss: 80000000,
          nextTargetId: "end_lv3_5_lost_80m_pro_recovery",
          nextStageNumber: 6,
          isEnding: true,
          analysis: "Xử lý khủng hoảng xuất sắc: Thu thập đầy đủ chứng cứ, yêu cầu tra soát và trình báo cơ quan công an trong thời gian vàng.",
          trap: "Không mắc bẫy thứ cấp!",
          lesson: "Báo ngay cơ quan công an (Phòng An ninh mạng) và ngân hàng để có cơ hội phong tỏa tài khoản nhận tiền."
        },
        {
          id: "lv3_s6_opt_B",
          key: "B",
          shortTitle: "Năn nỉ tiếp, giấu gia đình",
          text: "Tiếp tục tìm cách nhắn tin năn nỉ Tuyết Nhi, giấu gia đình vì xấu hổ và hy vọng họ trả lại tiền.",
          type: "bad",
          score: 0,
          risk: 30,
          loss: 80000000,
          nextTargetId: "end_lv3_6_lost_80m_passive",
          nextStageNumber: 6,
          isEnding: true,
          analysis: "Xử lý thụ động: Giấu giếm vì sợ xấu hổ khiến thời gian vàng phong tỏa dòng tiền trôi qua mất.",
          trap: "Bẫy tâm lý mặc cảm & giấu giếm sai lầm.",
          lesson: "Bị lừa không phải là tội lỗi, im lặng giấu giếm chỉ giúp kẻ gian an toàn tẩu tán tài sản."
        },
        {
          id: "lv3_s6_opt_C",
          key: "C",
          shortTitle: "Tìm dịch vụ 'thu hồi tiền treo'",
          text: "Lên mạng tìm các dịch vụ 'hỗ trợ thu hồi tiền treo / lấy lại tiền lừa đảo' để nhờ vả.",
          type: "bad",
          score: 0,
          risk: 40,
          loss: 80000000,
          nextTargetId: "end_lv3_6_lost_80m_passive",
          nextStageNumber: 6,
          isEnding: true,
          analysis: "Mắc bẫy lừa đảo lần hai: Các trang mạng quảng cáo 'thu hồi tiền lừa đảo' 100% là bẫy lừa đảo thứ cấp (Recovery Scam).",
          trap: "Bẫy lừa đảo thứ cấp (Recovery Scam).",
          lesson: "Không ai có thể 'hack cổng lấy lại tiền bị lừa' trên mạng. Đó là chiêu lừa lấy thêm tiền phí."
        }
      ]
    }
  ],
  endings: [
    {
      id: "end_lv3_1_block_early",
      code: "ENDING 1 – XUẤT SẮC",
      title: "CHẶN TỪ ĐẦU – PHÒNG THỦ SỐ HOÀN HẢO",
      rank: "PHÒNG THỦ SỐ HOÀN HẢO (PERFECT DEFENSE)",
      type: "win",
      safetyScore: 100,
      riskScore: 0,
      loss: 0,
      color: "#10b981",
      description: "Nhận diện bẫy việc nhẹ lương cao ngay từ tin nhắn đầu tiên. Không tương tác, không nạp tiền, bảo toàn 100% tài sản và thông tin cá nhân."
    },
    {
      id: "end_lv3_2_stop_after_small",
      code: "ENDING 2 – TỈNH TÁO KỊP THỜI",
      title: "THỬ ĐƠN NHỎ NHƯNG DỪNG ĐÚNG LÚC",
      rank: "TỈNH TÁO KỊP THỜI (TIMELY ESCAPE)",
      type: "win",
      safetyScore: 85,
      riskScore: 15,
      loss: 0,
      color: "#10b981",
      description: "Đã hoàn thành 2 đơn nhỏ và nhận 250k hoa hồng mồi, nhưng kịp thời nhận ra bản chất phi lý và dừng lại trước khi kẻ gian tung mẻ lưới lớn."
    },
    {
      id: "end_lv3_3_escape_before_vip",
      code: "ENDING 3 – THOÁT BẪY VIP",
      title: "TỪ CHỐI ĐƠN VIP 80 TRIỆU – BẢO TOÀN VỐN",
      rank: "BẢO TOÀN VỐN THÀNH CÔNG (CAPITAL PRESERVED)",
      type: "win",
      safetyScore: 80,
      riskScore: 20,
      loss: 0,
      color: "#10b981",
      description: "Đứng trước mồi nhử hoa hồng 12 triệu và áp lực thời gian của đơn VIP 80 triệu, bạn đã kiên quyết từ chối nạp tiền, bảo toàn trọn vẹn vốn liếng."
    },
    {
      id: "end_lv3_4_trial_5m_lost",
      code: "ENDING 4 – SUÝT MẤT TRẮNG",
      title: "MẮC BẪY CHUYỂN THỬ 5 TRIỆU ĐỒNG",
      rank: "THIẾU CẨN TRỌNG (NEAR MISS)",
      type: "warning",
      safetyScore: 60,
      riskScore: 40,
      loss: 5000000,
      color: "#f59e0b",
      description: "Mắc bẫy tâm lý 'chuyển thử để kiểm tra' và mất 5.000.000 VNĐ. May mắn là kịp thời nhận ra bất thường và dừng lại, giữ được 75 triệu còn lại."
    },
    {
      id: "end_lv3_5_lost_80m_pro_recovery",
      code: "ENDING 5 – MẤT 80M & XỬ LÝ CHUẨN XÁC",
      title: "DỪNG BẪY GỠ VỐN & THU THẬP BẰNG CHỨNG TRÌNH BÁO",
      rank: "CẮT LỖ & BẢO VỆ CHỨNG CỨ (RECOVERY PRO)",
      type: "lost",
      safetyScore: 45,
      riskScore: 55,
      loss: 80000000,
      color: "#3b82f6",
      description: "Đã chuyển 80 triệu nhưng kịp dừng lại trước yêu cầu nạp thêm 50 triệu gỡ vốn. Bảo toàn 50 triệu còn lại và thực hiện chuẩn xác quy trình báo công an."
    },
    {
      id: "end_lv3_6_lost_80m_passive",
      code: "ENDING 6 – MẤT 80 TRIỆU & BẾ TẮC",
      title: "SẬP BẪY 80 TRIỆU & THƯƠNG LƯỢNG VÔ VỌNG",
      rank: "XỬ LÝ THỤ ĐỘNG, BẾ TẮC (PASSIVE CRISIS)",
      type: "lost",
      safetyScore: 35,
      riskScore: 65,
      loss: 80000000,
      color: "#ef4444",
      description: "Mất 80 triệu nhưng xử lý thụ động: Tiếp tục năn nỉ kẻ lừa đảo hoặc tìm dịch vụ thu hồi tiền trên mạng, bỏ lỡ thời gian vàng phong tỏa dòng tiền."
    },
    {
      id: "end_lv3_7_lost_130m_full_scam",
      code: "ENDING 7 – CHÁY TÀI KHOẢN",
      title: "SẬP BẪY LỖI HỆ THỐNG – MẤT TRẮNG 130 TRIỆU ĐỒNG",
      rank: "SẬP BẪY TOÀN BỘ (FULL TRAP BANKRUPT)",
      type: "lost",
      safetyScore: 0,
      riskScore: 100,
      loss: 130000000,
      color: "#dc2626",
      description: "Sập bẫy tâm lý gỡ vốn (Sunk Cost Fallacy): Nạp 80 triệu rồi tiếp tục nộp thêm 50 triệu vào bẫy 'lỗi hệ thống', mất trắng toàn bộ 130 triệu đồng."
    }
  ]
};

