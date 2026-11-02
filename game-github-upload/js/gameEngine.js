// G7 - Core Game Engine
// Manages story branching, wallet balances, retro modals, and gamification mechanics

class GameEngine {
  constructor(storyData) {
    this.storyData = storyData || window.STORY_DATA;
    this.currentChapterIndex = 0;
    this.currentDialogueId = null;
    this.decisionHistory = [];
    this.decisionCheckpoints = [];

    // Wallet & Balance (Cấp vốn 80 triệu dùng chung xuyên suốt 4 level)
    this.initialBalance = 80000000;
    this.bankBalance = this.loadBalance();

    // Reward & Retention
    this.lastCheckinDate = this.loadLastCheckinDate();
    this.checkinDay = this.loadCheckinDay();
    this.adCountToday = this.loadAdCount();
    this.fastMode = false;

    // 3 Gameplay Metrics (Niềm tin - Rủi ro dữ liệu - Thiệt hại tài chính)
    this.trustScore = 20;
    this.dataRiskScore = 0;
    this.financialLoss = 0;
    this.gameState = {
      hasSentCccd: false,
      hasSentOtp: false,
      hasSentPortrait: false,
      hasTransferredMoney: false,
      transferCount: 0
    };

    // Elements
    this.dom = {};

    // Character models (CCCD G7)
    this.characters = {
      female: {
        id: 'female',
        name: 'Nguyễn Ngọc Ánh',
        gender: 'Nữ',
        age: 24,
        job: 'Nghề nghiệp tự do',
        idNumber: '094306006781',
        hometown: 'An Bình, Ninh Kiều, Cần Thơ',
        dob: '17/12/2002',
        nationality: 'Việt Nam',
        phone: '03970866321',
        avatar: 'assets/avatar_female.png?v=29.0'
      },
      male: {
        id: 'male',
        name: 'Phan Thanh Tuấn',
        gender: 'Nam',
        age: 22,
        job: 'Sinh viên',
        idNumber: '094306016722',
        hometown: 'Ô Môn, Cần Thơ',
        dob: '10/01/2004',
        nationality: 'Việt Nam',
        phone: '09470337112',
        avatar: 'assets/avatar_male.png?v=29.0'
      }
    };
    this.character = this.loadCharacter();
  }

  init() {
    this.bindDom();
    this.bindEvents();
    this.renderChapterSelectDropdown();
    this.updateWalletUI(0, false);
    this.updateHudMetrics();
    this.renderCheckinGrid();
    this.updateAdUI();
    this.updateCharacterUI();

    // Khởi tạo trạng thái ban đầu: Ẩn 2 thẻ bên phải theo yêu cầu (khi nào bấm vào mới hiện)
    const bankCard = document.getElementById('outsideBankCard');
    const cccdCard = document.getElementById('outsideCccdCard');
    const btnBank = document.getElementById('btnToggleBankCard');
    const btnCccd = document.getElementById('btnToggleCccdCard');
    const cardsContainer = document.getElementById('outsideCardsContainer');
    const cardsBackdrop = document.getElementById('outsideCardsBackdrop');
    if (bankCard) bankCard.style.display = 'none';
    if (cccdCard) cccdCard.style.display = 'none';
    if (cardsContainer) {
      cardsContainer.style.display = 'none';
      cardsContainer.classList.remove('mobile-open');
    }
    if (cardsBackdrop) cardsBackdrop.classList.remove('active');
    if (btnBank) btnBank.classList.remove('active');
    if (btnCccd) btnCccd.classList.remove('active');
  }

  bindDom() {
    this.dom.chatStream = document.getElementById('chatMessages');
    this.dom.typingIndicator = document.getElementById('typingIndicator');
    this.dom.typingLabel = document.getElementById('typingLabel');
    this.dom.choicesContainer = document.getElementById('choicesContainer');
    this.dom.choicesStatus = document.getElementById('choicesStatus');
    this.dom.btnRewindDecision = document.getElementById('btnRewindDecision');
    this.dom.gameHudTriad = document.getElementById('gameHudTriad');

    // Header info
    this.dom.chatHeaderName = document.getElementById('chatHeaderName');
    this.dom.chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
    this.dom.chatHeaderWarning = document.getElementById('chatHeaderWarning');
    this.dom.chatHeaderStatus = document.getElementById('chatHeaderStatus');
    this.dom.chapterSelect = document.getElementById('chapterSelect');

    // Wallet
    this.dom.walletAmount = document.getElementById('walletBalanceAmount');
    this.dom.walletMeterFill = document.getElementById('walletMeterFill');
    this.dom.walletBadge = document.getElementById('walletStatusBadge');
    this.dom.moneyDeltaFloat = document.getElementById('moneyDeltaFloat');

    // Modals
    this.dom.phishingModal = document.getElementById('phishingModal');
    this.dom.officialAppModal = document.getElementById('officialAppModal');
    this.dom.callModal = document.getElementById('callModal');
    this.dom.treeModal = document.getElementById('treeModal');
    this.dom.treeGraphContent = document.getElementById('treeGraphContent');
    this.dom.summaryModal = document.getElementById('summaryModal');
    this.dom.overallModal = document.getElementById('overallModal');
    this.dom.rewardModal = document.getElementById('rewardModal');
    this.dom.adOverlay = document.getElementById('adPlayerOverlay');
    this.dom.adTimer = document.getElementById('adTimerCountdown');
    this.dom.bankruptModal = document.getElementById('bankruptModal');

    // Reward UI
    this.dom.rewardBalanceVal = document.getElementById('rewardModalBalanceVal');
    this.dom.adWatchCountText = document.getElementById('adWatchCountText');
    this.dom.btnWatchAd = document.getElementById('btnWatchAdAction');
    this.dom.btnClaimDaily = document.getElementById('btnClaimDailyAction');
    this.dom.checkinGrid = document.getElementById('checkinGridContainer');

    // CCCD Elements
    this.dom.characterModal = document.getElementById('characterSelectModal');
    this.dom.cardFemale = document.getElementById('cardFemale');
    this.dom.cardMale = document.getElementById('cardMale');
    this.dom.btnSelectFemale = document.getElementById('btnSelectFemale');
    this.dom.btnSelectMale = document.getElementById('btnSelectMale');
    this.dom.btnCloseCharSelect = document.getElementById('btnCloseCharSelect');

    // Level 2 Call Elements
    this.dom.callSideLeft = document.getElementById('callSideLeft');
    this.dom.callSideRight = document.getElementById('callSideRight');
    this.dom.activeCallBar = document.getElementById('activeCallBar');
    this.dom.activeCallTimer = document.getElementById('activeCallTimer');
    this.dom.callBarUserName = document.getElementById('callBarUserName');
    this.dom.mobileCallDualView = document.getElementById('mobileCallDualView');
    this.dom.mobileCallTimer = document.getElementById('mobileCallTimer');
    this.dom.callLeftAvatar = document.getElementById('callLeftAvatar');
    this.dom.callLeftName = document.getElementById('callLeftName');
    this.dom.callLeftPhone = document.getElementById('callLeftPhone');
    this.dom.callLeftOrg = document.getElementById('callLeftOrg');
    this.dom.callLeftStatus = document.getElementById('callLeftStatus');
    this.dom.callRightAvatar = document.getElementById('callRightAvatar');
    this.dom.callRightName = document.getElementById('callRightName');
    this.dom.callRightPhone = document.getElementById('callRightPhone');
    this.dom.callRightOrg = document.getElementById('callRightOrg');
    this.dom.callRightStatus = document.getElementById('callRightStatus');
    this.dom.mobileCallerAvatarLeft = document.getElementById('mobileCallerAvatarLeft');
    this.dom.mobileCallerNameLeft = document.getElementById('mobileCallerNameLeft');
    this.dom.mobileCallerAvatarRight = document.getElementById('mobileCallerAvatarRight');
    this.dom.mobileCallerNameRight = document.getElementById('mobileCallerNameRight');
  }

  bindEvents() {
    // CCCD Character Selection
    const btnOpenCCCD = document.getElementById('btnOpenCCCD');
    if (btnOpenCCCD) {
      btnOpenCCCD.addEventListener('click', () => this.openCharacterModal());
    }

    const btnLevelOpenCCCD = document.getElementById('btnLevelOpenCCCD');
    if (btnLevelOpenCCCD) {
      btnLevelOpenCCCD.addEventListener('click', () => this.openCharacterModal());
    }

    if (this.dom.btnCloseCharSelect) {
      this.dom.btnCloseCharSelect.addEventListener('click', () => {
        this.closeCharacterModal();
        if (window.loadingCtrl && !window.loadingCtrl.gameStarted) {
          window.loadingCtrl.openLevelSelect();
        }
      });
    }

    if (this.dom.btnSelectFemale) {
      this.dom.btnSelectFemale.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setCharacter('female');
      });
    }

    if (this.dom.btnSelectMale) {
      this.dom.btnSelectMale.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setCharacter('male');
      });
    }

    const btnSwitchCharPrompt = document.getElementById('btnSwitchCharPrompt');
    if (btnSwitchCharPrompt) {
      btnSwitchCharPrompt.addEventListener('click', (e) => {
        e.stopPropagation();
        this.updateCharacterUI('show_both');
      });
    }

    const btnContinueWithChosenChar = document.getElementById('btnContinueWithChosenChar');
    if (btnContinueWithChosenChar) {
      btnContinueWithChosenChar.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeCharacterModal();
        if (window.loadingCtrl && !window.loadingCtrl.gameStarted) {
          if (window.loadingCtrl.collectModal) {
            window.loadingCtrl.collectModal.classList.add('active');
          } else {
            window.loadingCtrl.openLevelSelect();
          }
        }
      });
    }

    if (this.dom.cardFemale) {
      this.dom.cardFemale.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          this.setCharacter('female');
        }
      });
    }

    if (this.dom.cardMale) {
      this.dom.cardMale.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          this.setCharacter('male');
        }
      });
    }

    // Outside Dashboard buttons & Collapsible Toggles
    const btnToggleBankCard = document.getElementById('btnToggleBankCard');
    const outsideBankCard = document.getElementById('outsideBankCard');
    const btnCloseBankCard = document.getElementById('btnCloseBankCard');
    const btnToggleCccdCard = document.getElementById('btnToggleCccdCard');
    const outsideCccdCard = document.getElementById('outsideCccdCard');
    const btnCloseCccdCard = document.getElementById('btnCloseCccdCard');
    const outsideCardsContainer = document.getElementById('outsideCardsContainer');
    const outsideCardsBackdrop = document.getElementById('outsideCardsBackdrop');

    const updateCardsDrawerState = () => {
      const bankVisible = outsideBankCard && outsideBankCard.style.display !== 'none';
      const cccdVisible = outsideCccdCard && outsideCccdCard.style.display !== 'none';
      const anyVisible = bankVisible || cccdVisible;

      if (!outsideCardsContainer) return;

      if (window.innerWidth <= 860) {
        if (anyVisible) {
          outsideCardsContainer.style.display = 'flex';
          requestAnimationFrame(() => {
            outsideCardsContainer.classList.add('mobile-open');
            if (outsideCardsBackdrop) outsideCardsBackdrop.classList.add('active');
          });
        } else {
          outsideCardsContainer.classList.remove('mobile-open');
          if (outsideCardsBackdrop) outsideCardsBackdrop.classList.remove('active');
          setTimeout(() => {
            if (!outsideCardsContainer.classList.contains('mobile-open')) {
              outsideCardsContainer.style.display = 'none';
            }
          }, 300);
        }
      } else {
        // Desktop: Hiện sidebar khi có ít nhất 1 thẻ được mở, ẩn hoàn toàn khi cả 2 đóng
        outsideCardsContainer.classList.remove('mobile-open');
        if (outsideCardsBackdrop) outsideCardsBackdrop.classList.remove('active');
        outsideCardsContainer.style.display = anyVisible ? 'flex' : 'none';
      }
    };

    const toggleBank = (force) => {
      if (!outsideBankCard) return;
      const isHidden = outsideBankCard.style.display === 'none';
      const shouldShow = force !== undefined ? force : isHidden;
      outsideBankCard.style.display = shouldShow ? 'block' : 'none';
      if (btnToggleBankCard) {
        btnToggleBankCard.classList.toggle('active', shouldShow);
      }
      updateCardsDrawerState();
      if (window.soundEngine) window.soundEngine.playClick();
    };

    if (btnToggleBankCard) {
      btnToggleBankCard.addEventListener('click', () => toggleBank());
    }
    if (btnCloseBankCard) {
      btnCloseBankCard.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBank(false);
      });
    }

    const toggleCccd = (force) => {
      if (!outsideCccdCard) return;
      const isHidden = outsideCccdCard.style.display === 'none';
      const shouldShow = force !== undefined ? force : isHidden;
      outsideCccdCard.style.display = shouldShow ? 'block' : 'none';
      if (btnToggleCccdCard) {
        btnToggleCccdCard.classList.toggle('active', shouldShow);
      }
      updateCardsDrawerState();
      if (window.soundEngine) window.soundEngine.playClick();
    };

    if (btnToggleCccdCard) {
      btnToggleCccdCard.addEventListener('click', () => toggleCccd());
    }
    if (btnCloseCccdCard) {
      btnCloseCccdCard.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCccd(false);
      });
    }

    if (outsideCardsBackdrop) {
      outsideCardsBackdrop.addEventListener('click', () => {
        if (outsideBankCard) outsideBankCard.style.display = 'none';
        if (outsideCccdCard) outsideCccdCard.style.display = 'none';
        if (btnToggleBankCard) btnToggleBankCard.classList.remove('active');
        if (btnToggleCccdCard) btnToggleCccdCard.classList.remove('active');
        updateCardsDrawerState();
      });
    }

    window.addEventListener('resize', () => {
      updateCardsDrawerState();
    });

    const btnOutsideAddMoney = document.getElementById('btnOutsideAddMoney');
    if (btnOutsideAddMoney) {
      btnOutsideAddMoney.addEventListener('click', () => this.startWatchAd());
    }

    const btnChatHeaderAddMoney = document.getElementById('btnChatHeaderAddMoney');
    if (btnChatHeaderAddMoney) {
      btnChatHeaderAddMoney.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startWatchAd();
      });
    }

    const btnOutsideCheckin = document.getElementById('btnOutsideCheckin');
    if (btnOutsideCheckin) {
      btnOutsideCheckin.addEventListener('click', () => this.openRewardModal('checkin'));
    }

    const btnOutsideSwitchChar = document.getElementById('btnOutsideSwitchChar');
    if (btnOutsideSwitchChar) {
      btnOutsideSwitchChar.addEventListener('click', () => this.openCharacterModal());
    }

    // Top Nav buttons
    const btnReward = document.getElementById('btnNavReward');
    if (btnReward) btnReward.addEventListener('click', () => this.openRewardModal('ad'));

    const rewardClose = document.getElementById('rewardModalCloseBtn');
    if (rewardClose) rewardClose.addEventListener('click', () => this.closeRewardModal());

    const fastModeBtn = document.getElementById('fastModeBtn');
    if (fastModeBtn) {
      fastModeBtn.addEventListener('click', () => {
        this.fastMode = !this.fastMode;
        fastModeBtn.textContent = this.fastMode ? '⏱️ Chế độ: Nhanh' : '⏱️ Chế độ: Bình thường';
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    const soundToggle = document.getElementById('soundToggleBtn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        if (window.soundEngine) {
          const enabled = window.soundEngine.toggleSound();
          soundToggle.innerHTML = enabled ? '<span class="icon">🔊</span> Âm thanh: Bật' : '<span class="icon">🔇</span> Âm thanh: Tắt';
        }
      });
    }

    const viewTreeBtn = document.getElementById('viewTreeBtn');
    if (viewTreeBtn) viewTreeBtn.addEventListener('click', () => this.openTreeModal());

    const treeCloseBtn = document.getElementById('treeModalCloseBtn');
    if (treeCloseBtn) treeCloseBtn.addEventListener('click', () => this.closeTreeModal());

    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) restartBtn.addEventListener('click', () => this.loadChapter(this.currentChapterIndex));

    if (this.dom.chapterSelect) {
      this.dom.chapterSelect.addEventListener('change', (e) => {
        this.loadChapter(parseInt(e.target.value, 10));
      });
    }

    // Phishing modal buttons
    const phishPayBtn = document.getElementById('phishPaySubmitBtn');
    if (phishPayBtn) {
      phishPayBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playDanger();
        this.closePhishingModal();
        this.updateWalletUI(-80000000, true);
        this.showBankruptModal("Bạn đã nhập thông tin đăng nhập ngân hàng vào website phishing giả mạo lừa đảo!");
      });
    }

    const phishCloseBtn = document.getElementById('phishCloseBtn');
    if (phishCloseBtn) phishCloseBtn.addEventListener('click', () => this.closePhishingModal());

    // Official app modal
    const officialAppCloseBtn = document.getElementById('officialAppCloseBtn');
    if (officialAppCloseBtn) {
      officialAppCloseBtn.addEventListener('click', () => {
        this.closeOfficialAppModal();
        this.stepTo("step_check_official");
      });
    }

    // Call modal hangup
    const callHangupBtn = document.getElementById('callHangupBtn');
    if (callHangupBtn) {
      callHangupBtn.addEventListener('click', () => {
        this.closeCallModal();
        this.stepTo("step_call_verified");
      });
    }

    // Summary buttons
    const nextChapterBtn = document.getElementById('summaryNextChapterBtn');
    if (nextChapterBtn) {
      nextChapterBtn.addEventListener('click', () => {
        this.closeSummaryModal();
        if (this.currentChapterIndex < this.storyData.chapters.length - 1) {
          this.loadChapter(this.currentChapterIndex + 1);
        } else {
          this.showOverallSummary();
        }
      });
    }

    const replayBtn = document.getElementById('summaryReplayBtn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        this.closeSummaryModal();
        this.loadChapter(this.currentChapterIndex);
      });
    }

    if (this.dom.btnRewindDecision) {
      this.dom.btnRewindDecision.addEventListener('click', () => {
        this.rewindDecision();
      });
    }

    const summaryShowTreeBtn = document.getElementById('summaryShowTreeBtn');
    if (summaryShowTreeBtn) {
      summaryShowTreeBtn.addEventListener('click', () => {
        this.openTreeModal();
      });
    }

    const summaryShowTreeBtnActive = document.getElementById('summaryShowTreeBtnActive');
    if (summaryShowTreeBtnActive) {
      summaryShowTreeBtnActive.addEventListener('click', () => {
        this.openTreeModal();
      });
    }

    const btnTreeZoomIn = document.getElementById('btnTreeZoomIn');
    if (btnTreeZoomIn) btnTreeZoomIn.addEventListener('click', () => this.zoomTree(0.15));

    const btnTreeZoomOut = document.getElementById('btnTreeZoomOut');
    if (btnTreeZoomOut) btnTreeZoomOut.addEventListener('click', () => this.zoomTree(-0.15));

    const btnTreeZoomReset = document.getElementById('btnTreeZoomReset');
    if (btnTreeZoomReset) btnTreeZoomReset.addEventListener('click', () => this.resetTreeZoom());

    const btnCloseInspector = document.getElementById('btnCloseInspector');
    if (btnCloseInspector) {
      btnCloseInspector.addEventListener('click', () => {
        const insp = document.getElementById('treeNodeInspector');
        if (insp) insp.style.display = 'none';
      });
    }

    // Hỗ trợ kéo thả (drag / pan) trên vùng sơ đồ cây
    const viewport = document.getElementById('treeViewport');
    if (viewport) {
      let isDown = false;
      let startX, startY, scrollLeft, scrollTop;
      viewport.addEventListener('mousedown', (e) => {
        if (e.target.closest('.tree-node-card') || e.target.closest('.tree-ending-card') || e.target.closest('#treeNodeInspector')) return;
        isDown = true;
        startX = e.pageX - viewport.offsetLeft;
        startY = e.pageY - viewport.offsetTop;
        scrollLeft = viewport.scrollLeft;
        scrollTop = viewport.scrollTop;
      });
      window.addEventListener('mouseup', () => { isDown = false; });
      viewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - viewport.offsetLeft;
        const y = e.pageY - viewport.offsetTop;
        const walkX = (x - startX) * 1.2;
        const walkY = (y - startY) * 1.2;
        viewport.scrollLeft = scrollLeft - walkX;
        viewport.scrollTop = scrollTop - walkY;
      });
    }

    const summaryOpenOverallBtn = document.getElementById('summaryOpenOverallBtn');
    if (summaryOpenOverallBtn) {
      summaryOpenOverallBtn.addEventListener('click', () => {
        this.closeSummaryModal();
        this.showOverallSummary();
      });
    }

    const overallRestartGameBtn = document.getElementById('overallRestartGameBtn');
    if (overallRestartGameBtn) {
      overallRestartGameBtn.addEventListener('click', () => {
        if (this.dom.overallModal) this.dom.overallModal.classList.remove('active');
        this.bankBalance = 80000000;
        this.initialBalance = 80000000;
        this.financialLoss = 0;
        this.trustScore = 20;
        this.dataRiskScore = 0;
        this.decisionHistory = [];
        this.gameState = {};
        this.saveWallet();
        this.updateWalletUI(0, false);
        this.loadChapter(0);
      });
    }

    const overallCloseBtn = document.getElementById('overallCloseBtn');
    if (overallCloseBtn) {
      overallCloseBtn.addEventListener('click', () => {
        if (this.dom.overallModal) this.dom.overallModal.classList.remove('active');
      });
    }

    // Reward Actions
    if (this.dom.btnWatchAd) {
      this.dom.btnWatchAd.addEventListener('click', () => this.startWatchAd());
    }
    if (this.dom.btnClaimDaily) {
      this.dom.btnClaimDaily.addEventListener('click', () => this.claimDailyCheckin());
    }

    // Bankrupt recovery
    const bankruptReset = document.getElementById('bankruptResetBalanceBtn');
    if (bankruptReset) {
      bankruptReset.addEventListener('click', () => {
        this.bankBalance = 80000000;
        this.initialBalance = 80000000;
        this.saveWallet();
        this.updateWalletUI(0, false);
        if (this.dom.bankruptModal) this.dom.bankruptModal.classList.remove('active');
        this.loadChapter(this.currentChapterIndex);
      });
    }
    const bankruptWatchAd = document.getElementById('bankruptWatchAdBtn');
    if (bankruptWatchAd) {
      bankruptWatchAd.addEventListener('click', () => {
        if (this.dom.bankruptModal) this.dom.bankruptModal.classList.remove('active');
        this.openRewardModal('ad');
      });
    }

    // Lướt tin nhắn lên/xuống thì ảnh 2 nhân vật 2 bên cũng sẽ di chuyển mượt mà đi theo
    const updateSideIllustrationsOnScroll = () => {
      if (this.currentChapterIndex === 1 && this.dom.callSideLeft && this.dom.callSideLeft.style.display !== 'none') {
        let offsetY = 0;
        if (this.dom.chatStream) {
          const maxScroll = this.dom.chatStream.scrollHeight - this.dom.chatStream.clientHeight;
          if (maxScroll > 0) {
            const scrollRatio = this.dom.chatStream.scrollTop / maxScroll;
            offsetY = (scrollRatio - 0.5) * 80;
          }
        }
        const leftWrap = document.getElementById('callLeftCharWrap');
        const rightWrap = document.getElementById('callRightCharWrap');
        if (leftWrap) leftWrap.style.transform = `translateY(${offsetY}px)`;
        if (rightWrap) rightWrap.style.transform = `translateY(${offsetY}px)`;
      }
    };
    if (this.dom.chatStream) {
      this.dom.chatStream.addEventListener('scroll', updateSideIllustrationsOnScroll, { passive: true });
    }
    window.addEventListener('scroll', updateSideIllustrationsOnScroll, { passive: true });
  }

  renderChapterSelectDropdown() {
    if (!this.dom.chapterSelect || !this.storyData) return;
    this.dom.chapterSelect.innerHTML = this.storyData.chapters.map((ch, idx) => {
      return `<option value="${idx}">Level ${ch.number}: ${ch.title}</option>`;
    }).join('');
  }

  formatDialogueText(text) {
    if (!text || typeof text !== 'string') return text;
    const char = this.character || this.loadCharacter() || this.characters.female;
    const isFemale = char.gender === 'Nữ' || char.id === 'female';
    const shortName = char.name ? char.name.split(' ').slice(-1)[0] : (isFemale ? 'Ánh' : 'Tuấn');
    const honorific = isFemale ? 'chị' : 'anh';
    const Honorific = isFemale ? 'Chị' : 'Anh';
    const titleName = `${honorific} ${shortName}`;
    const TitleName = `${Honorific} ${shortName}`;

    // Relative tokens for Level 4 (when victim is player, the relative is the other character):
    // If player is Female (Ánh, 24): relative is younger brother Phan Thanh Tuấn (22)
    // If player is Male (Tuấn, 22): relative is older sister Nguyễn Ngọc Ánh (24)
    const relName = isFemale ? 'Phan Thanh Tuấn' : 'Nguyễn Ngọc Ánh';
    const relShortName = isFemale ? 'Tuấn' : 'Ánh';
    const relRole = isFemale ? 'em trai' : 'chị gái';
    const RelRole = isFemale ? 'Em trai' : 'Chị gái';
    const relCall = isFemale ? 'Tuấn ơi' : 'chị Ánh ơi';
    const RelCall = isFemale ? 'Tuấn ơi' : 'Chị Ánh ơi';
    const relPronoun = isFemale ? 'cưng' : 'chị';
    const victimSelf = isFemale ? 'chị' : 'em';
    const VictimSelf = isFemale ? 'Chị' : 'Em';
    const victimHonorific = isFemale ? 'chị' : 'em';
    const VictimHonorific = isFemale ? 'Chị' : 'Em';
    const relHonorific = isFemale ? 'em' : 'chị';
    const RelHonorific = isFemale ? 'Em' : 'Chị';
    const relSimCall = isFemale ? 'em trai qua số điện thoại di động (SIM chính)' : 'chị gái qua số điện thoại di động (SIM chính)';
    const relPhone = isFemale ? '09470337112' : '03970866321';

    // Addressing between imposter/relative and player:
    const imposterCallPlayer = isFemale ? 'Chị Ánh ơi' : 'Tuấn ơi';
    const ImposterCallPlayer = isFemale ? 'Chị Ánh ơi' : 'Tuấn ơi';
    const relCallPlayer = isFemale ? 'Chị Ánh ơi' : 'Tuấn ơi';
    const RelCallPlayer = isFemale ? 'Chị Ánh ơi' : 'Tuấn ơi';

    // Third party addressing player (Thanh & Cổng thanh toán):
    const thirdToPlayer = isFemale ? 'chị' : 'anh';
    const ThirdToPlayer = isFemale ? 'Chị' : 'Anh';
    const thirdTitlePlayer = isFemale ? 'chị Ánh' : 'anh Tuấn';
    const ThirdTitlePlayer = isFemale ? 'Chị Ánh' : 'Anh Tuấn';
    const thanhFriendOf = isFemale ? 'Tuấn' : 'chị Ánh';

    // Banking & Avatar tokens:
    const relBankName = isFemale ? 'PHAN THANH TUAN' : 'NGUYEN NGOC ANH';
    const bankTransferContent = isFemale ? 'CHI ANH MUON TIEN GIAI QUYET VIEC GAP' : 'EM TUAN MUON TIEN GIAI QUYET VIEC GAP';
    const relAvatar = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
    const myAvatar = isFemale ? 'assets/avatar_female.png?v=29.0' : 'assets/avatar_male.png?v=29.0';

    // Contextual flavor tokens:
    const imposterSmalltalk = isFemale
      ? 'Chị đang làm ở công ty hả? Hôm trước chị nói tháng này được nhận lương đúng không?'
      : 'Em đang ở trường hay đi làm thêm đó? Hôm trước em nói đợt này vừa nhận tiền đúng không?';
    const relRealActivity = isFemale
      ? 'ở thư viện trường một mình ôn bài'
      : 'ở công ty một mình làm việc';

    const phone = char.phone || (isFemale ? '03970866321' : '09470337112');
    const maskedPhone = phone.length >= 4 ? phone.slice(0, 4) + 'xxxx' : (phone || '0397xxxx');
    const idNumber = char.idNumber || (isFemale ? '094306006781' : '094306016722');
    const maskedCccd = idNumber.length >= 4 ? idNumber.slice(0, 4) + 'xxxx' : (idNumber || '0943xxxx');

    // Level 3 helper tokens:
    const friendCall = isFemale ? 'Ánh ơi' : 'Tuấn ơi';
    const FriendCall = isFemale ? 'Ánh ơi' : 'Tuấn ơi';
    const candidCall = isFemale ? 'Ánh' : 'Tuấn';
    const recruiterCall = isFemale ? 'em Ánh' : 'em Tuấn';
    const RecruiterCall = isFemale ? 'Em Ánh' : 'Em Tuấn';
    const charSavingsDesc = isFemale ? 'tiền tích lũy tiết kiệm của em' : 'tiền tiết kiệm và học phí của em';
    const charSavingsFull = isFemale ? 'toàn bộ số tiền tích lũy tiết kiệm' : 'toàn bộ số tiền tiết kiệm và học phí';
    const charTargetAudience = isFemale ? 'người làm việc tự do và người tìm việc' : 'sinh viên và người tìm việc';

    return text
      .replace(/\{name\}/g, char.name || '')
      .replace(/\{shortName\}/g, shortName)
      .replace(/\{honorific\}/g, honorific)
      .replace(/\{Honorific\}/g, Honorific)
      .replace(/\{titleName\}/g, titleName)
      .replace(/\{TitleName\}/g, TitleName)
      .replace(/\{phone\}/g, char.phone || '')
      .replace(/\{cccd\}/g, char.idNumber || '')
      .replace(/\{maskedPhone\}/g, maskedPhone)
      .replace(/\{maskedCccd\}/g, maskedCccd)
      .replace(/\{address\}/g, char.hometown || '')
      .replace(/\{age\}/g, String(char.age || ''))
      .replace(/\{job\}/g, char.job || '')
      .replace(/\{relName\}/g, relName)
      .replace(/\{relShortName\}/g, relShortName)
      .replace(/\{relRole\}/g, relRole)
      .replace(/\{RelRole\}/g, RelRole)
      .replace(/\{relCall\}/g, relCall)
      .replace(/\{RelCall\}/g, RelCall)
      .replace(/\{relPronoun\}/g, relPronoun)
      .replace(/\{victimSelf\}/g, victimSelf)
      .replace(/\{VictimSelf\}/g, VictimSelf)
      .replace(/\{victimHonorific\}/g, victimHonorific)
      .replace(/\{VictimHonorific\}/g, VictimHonorific)
      .replace(/\{relHonorific\}/g, relHonorific)
      .replace(/\{RelHonorific\}/g, RelHonorific)
      .replace(/\{relSimCall\}/g, relSimCall)
      .replace(/\{relPhone\}/g, relPhone)
      .replace(/\{imposterCallPlayer\}/g, imposterCallPlayer)
      .replace(/\{ImposterCallPlayer\}/g, ImposterCallPlayer)
      .replace(/\{relCallPlayer\}/g, relCallPlayer)
      .replace(/\{RelCallPlayer\}/g, RelCallPlayer)
      .replace(/\{thirdToPlayer\}/g, thirdToPlayer)
      .replace(/\{ThirdToPlayer\}/g, ThirdToPlayer)
      .replace(/\{thirdTitlePlayer\}/g, thirdTitlePlayer)
      .replace(/\{ThirdTitlePlayer\}/g, ThirdTitlePlayer)
      .replace(/\{thanhFriendOf\}/g, thanhFriendOf)
      .replace(/\{relBankName\}/g, relBankName)
      .replace(/\{bankTransferContent\}/g, bankTransferContent)
      .replace(/\{relAvatar\}/g, relAvatar)
      .replace(/\{myAvatar\}/g, myAvatar)
      .replace(/\{imposterSmalltalk\}/g, imposterSmalltalk)
      .replace(/\{relRealActivity\}/g, relRealActivity)
      .replace(/\{friendCall\}\s*ơi/g, friendCall)
      .replace(/\{friendCall\}/g, friendCall)
      .replace(/\{FriendCall\}\s*ơi/g, FriendCall)
      .replace(/\{FriendCall\}/g, FriendCall)
      .replace(/\{candidCall\}/g, candidCall)
      .replace(/\{recruiterCall\}/g, recruiterCall)
      .replace(/\{RecruiterCall\}/g, RecruiterCall)
      .replace(/\{charSavingsDesc\}/g, charSavingsDesc)
      .replace(/\{charSavingsFull\}/g, charSavingsFull)
      .replace(/\{charTargetAudience\}/g, charTargetAudience);
  }

  updateHudMetrics() {
    const trustVal = document.getElementById('hudTrustVal');
    const trustFill = document.getElementById('hudTrustFill');
    const riskVal = document.getElementById('hudRiskVal');
    const riskFill = document.getElementById('hudRiskFill');
    const lossVal = document.getElementById('hudLossVal');
    const lossFill = document.getElementById('hudLossFill');

    // 1. Niềm tin của người chơi (0 - 100%)
    const clampedTrust = Math.max(0, Math.min(100, this.trustScore));
    if (trustVal) trustVal.textContent = `${clampedTrust}%`;
    if (trustFill) {
      trustFill.style.width = `${clampedTrust}%`;
      if (clampedTrust >= 60) {
        trustFill.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';
      } else if (clampedTrust >= 35) {
        trustFill.style.background = 'linear-gradient(90deg, #3b82f6, #f59e0b)';
      } else {
        trustFill.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
      }
    }

    // 2. Rủi ro dữ liệu (0 - 100%)
    const clampedRisk = Math.max(0, Math.min(100, this.dataRiskScore));
    if (riskVal) {
      if (clampedRisk === 0) riskVal.textContent = 'An toàn (0%)';
      else if (clampedRisk <= 35) riskVal.textContent = `Thấp (${clampedRisk}%)`;
      else if (clampedRisk <= 70) riskVal.textContent = `Trung bình (${clampedRisk}%)`;
      else riskVal.textContent = `Nguy hiểm (${clampedRisk}%)`;
    }
    if (riskFill) {
      riskFill.style.width = `${clampedRisk}%`;
      if (clampedRisk >= 70) {
        riskFill.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';
      } else if (clampedRisk > 0) {
        riskFill.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
      } else {
        riskFill.style.background = '#10b981';
      }
    }

    // 3. Thiệt hại tài chính (VNĐ)
    if (lossVal) lossVal.textContent = `${this.formatVND(this.financialLoss)} VNĐ`;
    if (lossFill) {
      const lossPct = Math.min(100, Math.max(0, Math.round((this.financialLoss / this.initialBalance) * 100)));
      lossFill.style.width = `${lossPct}%`;
      if (lossPct >= 50) {
        lossFill.style.background = '#ef4444';
      } else if (lossPct > 0) {
        lossFill.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';
      } else {
        lossFill.style.background = '#10b981';
      }
    }
  }

  loadChapter(chapterIndex) {
    if (chapterIndex < 0 || chapterIndex >= this.storyData.chapters.length) return;
    this.currentChapterIndex = chapterIndex;
    this.decisionHistory = [];

    // Reset 3 Gameplay Metrics cho màn chơi
    this.trustScore = 20;
    this.dataRiskScore = 0;
    this.financialLoss = 0;
    this.gameState = {
      hasSentCccd: false,
      hasSentOtp: false,
      hasSentPortrait: false,
      hasTransferredMoney: false,
      transferCount: 0
    };
    this.updateHudMetrics();

    if (this.dom.chapterSelect) {
      this.dom.chapterSelect.value = chapterIndex;
    }

    // Giữ nguyên nhân vật người chơi đã chọn lúc đầu, không tự ý ghi đè
    this.character = this.loadCharacter();
    this.updateCharacterUI('chosen_only');

    // Khi vào game / chuyển level: 2 thẻ bên phải ẩn theo yêu cầu (khi nào bấm nút trên header mới hiện)
    const outsideBankCard = document.getElementById('outsideBankCard');
    const outsideCccdCard = document.getElementById('outsideCccdCard');
    const btnToggleBank = document.getElementById('btnToggleBankCard');
    const btnToggleCccd = document.getElementById('btnToggleCccdCard');
    const outsideCardsContainer = document.getElementById('outsideCardsContainer');
    const outsideCardsBackdrop = document.getElementById('outsideCardsBackdrop');

    if (outsideBankCard) outsideBankCard.style.display = 'none';
    if (outsideCccdCard) outsideCccdCard.style.display = 'none';
    if (outsideCardsContainer) {
      outsideCardsContainer.style.display = 'none';
      outsideCardsContainer.classList.remove('mobile-open');
    }
    if (outsideCardsBackdrop) outsideCardsBackdrop.classList.remove('active');
    if (btnToggleBank) btnToggleBank.classList.remove('active');
    if (btnToggleCccd) btnToggleCccd.classList.remove('active');

    // Cung cấp vốn 80 triệu dùng chung xuyên suốt 4 level, không reset lại dù âm tiền
    if (typeof this.bankBalance !== 'number' || isNaN(this.bankBalance)) {
      this.bankBalance = this.loadBalance();
    }
    this.initialBalance = 80000000;
    this.updateWalletUI(0, false);

    // Luôn sử dụng nhân vật người chơi đã chọn (Nữ hoặc Nam), không tự ý ghi đè theo level
    this.character = this.loadCharacter() || this.characters.female;
    this.updateCharacterUI('chosen_only');
    if (this.dom.dockCccdNameVal) this.dom.dockCccdNameVal.textContent = this.character.name;

    const chapter = this.storyData.chapters[chapterIndex];
    const isFemale = (this.character.gender === 'Nữ' || this.character.id === 'female');
    if (this.dom.chatHeaderName) this.dom.chatHeaderName.textContent = this.formatDialogueText(chapter.sender.name);
    if (this.dom.chatHeaderAvatar) {
      if (chapterIndex === 3) {
        this.dom.chatHeaderAvatar.src = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
      } else {
        this.dom.chatHeaderAvatar.src = chapter.sender.avatar;
      }
    }
    if (this.dom.chatHeaderWarning) {
      this.dom.chatHeaderWarning.textContent = '';
      if (this.dom.chatHeaderWarning.parentElement) {
        this.dom.chatHeaderWarning.parentElement.style.display = 'none';
      }
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (this.dom.chatHeaderStatus) {
      this.dom.chatHeaderStatus.textContent = `Đang hoạt động • ${timeStr}`;
    }

    if (this.dom.chatStream) {
      this.dom.chatStream.innerHTML = '';
      const timeDivider = document.createElement('div');
      timeDivider.className = 'chat-time-divider';
      timeDivider.innerHTML = `<span class="time-divider-pill">Hôm nay ${timeStr}</span>`;
      this.dom.chatStream.appendChild(timeDivider);
    }
    if (this.dom.choicesContainer) this.dom.choicesContainer.innerHTML = '';

    this.decisionCheckpoints = [];
    this.currentActivePlatform = null;
    if (this.dom.chatMainContainer) {
      this.dom.chatMainContainer.classList.remove('is-platform-messenger', 'is-platform-zalo', 'is-platform-sms');
    }
    if (this.dom.btnRewindDecision) this.dom.btnRewindDecision.style.display = 'none';

    if (chapterIndex !== 1 && chapterIndex !== 3) {
      this.updateCallMode(null);
      const warningBanner = document.querySelector('.chat-warning-banner');
      if (warningBanner) warningBanner.style.display = 'none';
      if (this.dom.gameHudTriad) this.dom.gameHudTriad.classList.remove('hud-hidden');
    } else {
      const warningBanner = document.querySelector('.chat-warning-banner');
      if (warningBanner) warningBanner.style.display = 'none';
      if (this.dom.gameHudTriad) this.dom.gameHudTriad.classList.add('hud-hidden');
    }

    const firstDialogue = chapter.dialogues[0];
    this.processDialogue(firstDialogue);
  }

  updateCallMode(dialogue) {
    const isLv2Call = (this.currentChapterIndex === 1) && (!dialogue || !dialogue.isEnd);
    const isLv4SafeSimEnd = dialogue && ['end_early_detection', 'end_late_escape', 'end_master_investigation', 'end_safe_level4'].includes(dialogue.id);
    const isLv4Call = (this.currentChapterIndex === 3) && dialogue && (
      isLv4SafeSimEnd || (!dialogue.isEnd && (
        dialogue.isCall || [
          'g2_me_call_tuan_real', 'g2_tuan_real_confused',
          'g2_videocall_incoming', 'g2_tuan_videocall_dialogue', 'g2_me_confirm_videocall_urgency', 'g2_tuan_check_balance',
          'g2_res_ask_why_in_call',
          'g3_stage3_call_second', 'g3_tuan_transfer_prep',
          'g6_videocall_deepfake_start', 'g6_deepfake_modal_call'
        ].includes(dialogue.id)
      ))
    );

    const isInCall = isLv2Call || isLv4Call;

    // Quản lý âm thanh khi vào / thoát cuộc gọi
    const prevInCall = !!this.wasInCall;
    this.wasInCall = isInCall;

    if (!prevInCall && isInCall) {
      if (window.soundEngine) {
        const isVideo = dialogue && (dialogue.callType === 'videocall' || dialogue.callType === 'deepfake' || (dialogue.id && dialogue.id.includes('videocall')));
        if (isVideo) {
          window.soundEngine.playPhoneRing();
        } else {
          window.soundEngine.playCallConnected();
        }
      }
    } else if (prevInCall && !isInCall) {
      if (window.soundEngine) {
        window.soundEngine.playCallHangup();
      }
    }

    if (isInCall) {
      if (this.dom.callSideLeft) this.dom.callSideLeft.style.display = 'flex';
      if (this.dom.callSideRight) this.dom.callSideRight.style.display = 'flex';
      if (this.dom.activeCallBar) this.dom.activeCallBar.style.display = 'flex';
      if (this.dom.mobileCallDualView) this.dom.mobileCallDualView.style.display = 'none';
      const warningBanner = document.querySelector('.chat-warning-banner');
      if (warningBanner) warningBanner.style.display = 'none';

      // Khởi động đồng hồ đếm thời lượng cuộc gọi
      if (!this.callTimerInterval) {
        this.callDurationSec = 0;
        const updateTimers = () => {
          const mins = String(Math.floor(this.callDurationSec / 60)).padStart(2, '0');
          const secs = String(this.callDurationSec % 60).padStart(2, '0');
          const timeStr = `${mins}:${secs}`;
          if (this.dom.activeCallTimer) this.dom.activeCallTimer.textContent = timeStr;
          if (this.dom.mobileCallTimer) this.dom.mobileCallTimer.textContent = timeStr;
        };
        updateTimers();
        this.callTimerInterval = setInterval(() => {
          this.callDurationSec++;
          updateTimers();
        }, 1000);
      }

      // Thông tin Người chơi (Bên Phải đang nghe máy - Người Chơi)
      const char = this.character || this.loadCharacter() || this.characters.female;
      const isFemale = (char.gender === 'Nữ' || char.id === 'female');
      const victimImg = isFemale ? 'assets/lv2_nguoi_choi_nu.svg' : 'assets/lv2_nguoi_choi_nam.svg';

      if (this.dom.callRightName) this.dom.callRightName.textContent = char.name;
      if (this.dom.callRightPhone) this.dom.callRightPhone.textContent = char.phone || (isFemale ? '03970866321' : '09470337112');
      if (this.dom.callRightAvatar) this.dom.callRightAvatar.src = victimImg;
      if (this.dom.callBarUserName) this.dom.callBarUserName.textContent = char.name;
      if (this.dom.mobileCallerNameRight) this.dom.mobileCallerNameRight.textContent = char.name;
      if (this.dom.mobileCallerAvatarRight) this.dom.mobileCallerAvatarRight.src = victimImg;
      const rightBadge = document.getElementById('callRightBadgeText');
      if (rightBadge) rightBadge.textContent = 'NGƯỜI CHƠI (BẠN)';
      const rightNote = document.getElementById('callRightNote');
      if (rightNote) {
        if (this.currentChapterIndex === 3) {
          rightNote.textContent = '';
          rightNote.style.display = 'none';
        } else {
          rightNote.style.display = '';
          rightNote.textContent = '🛡️ Giữ bình tĩnh • Không cung cấp mật khẩu, OTP hay chuyển tiền';
        }
      }

      if (this.currentChapterIndex === 1) {
        // Thông tin Tổng Đài (Bên Trái đang gọi đến - Tổng Đài VietBank)
        const tongDaiImg = 'assets/lv2_tong_dai.svg';
        if (this.dom.callSideLeft) {
          this.dom.callSideLeft.classList.remove('videocall-mode', 'deepfake-mode');
        }
        if (this.dom.callLeftAvatar) this.dom.callLeftAvatar.src = tongDaiImg;
        if (this.dom.mobileCallerAvatarLeft) this.dom.mobileCallerAvatarLeft.src = tongDaiImg;
        const leftBadge = document.getElementById('callLeftBadgeText');
        if (leftBadge) leftBadge.textContent = 'TỔNG ĐÀI VIETBANK';

        const isLam = dialogue && (dialogue.id === 'lv2_g2_notice_transfer' || dialogue.id === 'lv2_g2_lam_voice' || (dialogue.id && dialogue.id.includes('_lam_')));
        if (isLam) {
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = 'Kỹ Thuật Viên Lâm';
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = '+024.3938.8888 (Chuyển máy)';
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = 'Bộ Phận Hỗ Trợ Kỹ Thuật Bảo Mật';
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = 'Lâm (VietBank)';
        } else {
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = 'Hoàng - Tổng Đài Viên';
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = '+024.3938.8888';
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = 'Trung Tâm Giám Sát Thẻ VietBank';
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = 'Hoàng (VietBank)';
        }
        const leftNote = document.getElementById('callLeftNote');
        if (leftNote) {
          leftNote.style.display = '';
          leftNote.textContent = '⚠️ Giả mạo đầu số VoIP tổng đài ngân hàng để thao túng tâm lý';
        }

        if (this.dom.activeCallBar) {
          const barLabel = this.dom.activeCallBar.querySelector('.call-bar-label');
          if (barLabel) {
            barLabel.innerHTML = `🔴 ĐANG TRONG CUỘC GỌI VOIP: <strong>+024.3938.8888 ⇄ <span id="callBarUserName">${char.name}</span></strong>`;
          }
        }
      } else if (this.currentChapterIndex === 3) {
        // LEVEL 4: CUỘC GỌI NGƯỜI THÂN & VIDEO CALL (KHÔNG ĐỂ CẢNH BÁO, DIỄN RA TỰ NHIÊN)
        const relName = isFemale ? 'Phan Thanh Tuấn' : 'Nguyễn Ngọc Ánh';
        const relRole = isFemale ? 'Em trai' : 'Chị gái';
        const relImg = isFemale ? 'assets/lv2_nguoi_choi_nam.svg' : 'assets/lv2_nguoi_choi_nu.svg';
        const relPhone = isFemale ? '09470337112' : '03970866321';

        const isDeepfake = dialogue && (dialogue.callType === 'deepfake' || dialogue.id === 'g6_videocall_deepfake_start' || dialogue.id === 'g6_deepfake_modal_call' || dialogue.id === 'g5_videocall_deepfake_start' || dialogue.id === 'g5_deepfake_modal_call');
        const isVideoCall = dialogue && (dialogue.callType === 'videocall' || (dialogue.id && dialogue.id.includes('videocall')));
        const isSimCall = dialogue && (dialogue.callType === 'sim' || (dialogue.id && (dialogue.id.startsWith('end_') || dialogue.id.includes('sim'))));

        if (this.dom.callLeftAvatar) this.dom.callLeftAvatar.src = relImg;
        if (this.dom.mobileCallerAvatarLeft) this.dom.mobileCallerAvatarLeft.src = relImg;

        const leftBadge = document.getElementById('callLeftBadgeText');
        const leftNote = document.getElementById('callLeftNote');
        if (leftNote) {
          leftNote.textContent = '';
          leftNote.style.display = 'none';
        }

        if (isDeepfake) {
          if (this.dom.callSideLeft) {
            this.dom.callSideLeft.classList.add('deepfake-mode');
            this.dom.callSideLeft.classList.remove('videocall-mode');
          }
          if (leftBadge) leftBadge.textContent = 'VIDEO CALL ZALO';
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = relName;
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = 'Zalo Video Call';
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = `${relRole} ruột`;
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = relName;

          if (this.dom.activeCallBar) {
            const barLabel = this.dom.activeCallBar.querySelector('.call-bar-label');
            if (barLabel) {
              barLabel.innerHTML = `📹 ĐANG TRONG VIDEO CALL ZALO: <strong>${relName} ⇄ ${char.name}</strong>`;
            }
          }
        } else if (isVideoCall) {
          if (this.dom.callSideLeft) {
            this.dom.callSideLeft.classList.add('videocall-mode');
            this.dom.callSideLeft.classList.remove('deepfake-mode');
          }
          if (leftBadge) leftBadge.textContent = 'VIDEO CALL MESSENGER';
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = relName;
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = 'Messenger Video Call';
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = `${relRole} ruột`;
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = relName;

          if (this.dom.activeCallBar) {
            const barLabel = this.dom.activeCallBar.querySelector('.call-bar-label');
            if (barLabel) {
              barLabel.innerHTML = `📹 ĐANG TRONG VIDEO CALL MESSENGER: <strong>${relName} ⇄ ${char.name}</strong>`;
            }
          }
        } else if (isSimCall) {
          if (this.dom.callSideLeft) {
            this.dom.callSideLeft.classList.remove('videocall-mode', 'deepfake-mode');
          }
          if (leftBadge) leftBadge.textContent = 'CUỘC GỌI ĐIỆN THOẠI (SIM)';
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = relName;
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = relPhone;
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = `${relRole} ruột`;
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = relName;

          if (this.dom.activeCallBar) {
            const barLabel = this.dom.activeCallBar.querySelector('.call-bar-label');
            if (barLabel) {
              barLabel.innerHTML = `📞 ĐANG TRONG CUỘC GỌI: <strong>${relName} ⇄ ${char.name}</strong>`;
            }
          }
        } else {
          // Voice call Messenger
          if (this.dom.callSideLeft) {
            this.dom.callSideLeft.classList.remove('videocall-mode', 'deepfake-mode');
          }
          if (leftBadge) leftBadge.textContent = 'CUỘC GỌI MESSENGER';
          if (this.dom.callLeftName) this.dom.callLeftName.textContent = relName;
          if (this.dom.callLeftPhone) this.dom.callLeftPhone.textContent = 'Messenger Voice Call';
          if (this.dom.callLeftOrg) this.dom.callLeftOrg.textContent = `${relRole} ruột`;
          if (this.dom.mobileCallerNameLeft) this.dom.mobileCallerNameLeft.textContent = relName;

          if (this.dom.activeCallBar) {
            const barLabel = this.dom.activeCallBar.querySelector('.call-bar-label');
            if (barLabel) {
              barLabel.innerHTML = `🟢 ĐANG TRONG CUỘC GỌI MESSENGER: <strong>${relName} ⇄ ${char.name}</strong>`;
            }
          }
        }
      }

      // Trạng thái sóng âm thoại & hiệu ứng Speaking / Listening
      const isDeepfake = this.currentChapterIndex === 3 && dialogue && (dialogue.callType === 'deepfake' || dialogue.id === 'g6_videocall_deepfake_start' || dialogue.id === 'g6_deepfake_modal_call' || dialogue.id === 'g5_videocall_deepfake_start' || dialogue.id === 'g5_deepfake_modal_call');
      const isVideoCall = this.currentChapterIndex === 3 && dialogue && (dialogue.callType === 'videocall' || (dialogue.id && dialogue.id.includes('videocall')));

      if (dialogue && dialogue.speaker === 'them') {
        if (this.dom.callSideLeft) {
          this.dom.callSideLeft.classList.add('speaking');
          this.dom.callSideLeft.classList.remove('listening');
        }
        if (this.dom.callSideRight) {
          this.dom.callSideRight.classList.add('listening');
          this.dom.callSideRight.classList.remove('speaking');
        }
        const themSpeakingText = (isVideoCall || isDeepfake)
          ? 'Đang nói qua Video Call...' 
          : 'Đang nói chuyện...';
        const themIcon = (isVideoCall || isDeepfake) ? '📹' : '🎙️';
        if (this.dom.callLeftStatus) this.dom.callLeftStatus.innerHTML = `<span class="status-icon">${themIcon}</span><span class="status-text">${themSpeakingText}</span>`;
        if (this.dom.callRightStatus) this.dom.callRightStatus.innerHTML = '<span class="status-icon">👂</span><span class="status-text">Đang lắng nghe...</span>';
      } else if (dialogue && dialogue.speaker === 'me') {
        if (this.dom.callSideRight) {
          this.dom.callSideRight.classList.add('speaking');
          this.dom.callSideRight.classList.remove('listening');
        }
        if (this.dom.callSideLeft) {
          this.dom.callSideLeft.classList.add('listening');
          this.dom.callSideLeft.classList.remove('speaking');
        }
        const meSpeakingText = isVideoCall ? 'Đang đối thoại trực tiếp...' : 'Đang trả lời...';
        if (this.dom.callRightStatus) this.dom.callRightStatus.innerHTML = `<span class="status-icon">🎙️</span><span class="status-text">${meSpeakingText}</span>`;
        if (this.dom.callLeftStatus) this.dom.callLeftStatus.innerHTML = '<span class="status-icon">👂</span><span class="status-text">Đang lắng nghe...</span>';
      } else {
        if (this.dom.callSideLeft) this.dom.callSideLeft.classList.remove('speaking', 'listening');
        if (this.dom.callSideRight) this.dom.callSideRight.classList.remove('speaking', 'listening');
        const connText = isVideoCall ? 'Đang kết nối Video Call...' : (this.currentChapterIndex === 1 ? 'Đang kết nối VoIP...' : 'Đang kết nối cuộc gọi...');
        if (this.dom.callLeftStatus) this.dom.callLeftStatus.innerHTML = `<span class="status-icon">📞</span><span class="status-text">${connText}</span>`;
        if (this.dom.callRightStatus) this.dom.callRightStatus.innerHTML = '<span class="status-icon">📱</span><span class="status-text">Đang trên đường dây...</span>';
      }
    } else {
      // Kết thúc cuộc gọi hoặc các level khác -> Ẩn 2 panel gọi điện
      if (this.dom.callSideLeft) this.dom.callSideLeft.style.display = 'none';
      if (this.dom.callSideRight) this.dom.callSideRight.style.display = 'none';
      if (this.dom.activeCallBar) this.dom.activeCallBar.style.display = 'none';
      if (this.dom.mobileCallDualView) this.dom.mobileCallDualView.style.display = 'none';
      const warningBanner = document.querySelector('.chat-warning-banner');
      if (warningBanner) warningBanner.style.display = 'none';
      if (this.callTimerInterval) {
        clearInterval(this.callTimerInterval);
        this.callTimerInterval = null;
      }
    }
  }

  renderPlatformSwitchDivider(platform) {
    if (!this.dom.chatStream) return;
    const divider = document.createElement('div');
    divider.className = `chat-platform-switch platform-${platform}`;
    let icon = '💬';
    let text = 'CHUYỂN VỀ ỨNG DỤNG ZALO (TÀI KHOẢN MỚI)';
    if (platform === 'messenger') {
      icon = '💬';
      text = 'CHUYỂN SANG TIN NHẮN MESSENGER (NGƯỜI THẬT)';
    } else if (platform === 'sms') {
      icon = '📱';
      text = 'HỘP THƯ TIN NHẮN SMS (SIM CHÍNH)';
    }
    divider.innerHTML = `<span class="switch-pill"><span class="switch-icon">${icon}</span> ${text}</span>`;
    this.dom.chatStream.appendChild(divider);
    this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
  }

  updateLevel4HeaderPlatform(platform, dialogue) {
    if (this.currentChapterIndex !== 3) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const char = this.character || this.loadCharacter() || this.characters.female;
    const isFemale = (char.gender === 'Nữ' || char.id === 'female');
    const relName = isFemale ? 'Phan Thanh Tuấn' : 'Nguyễn Ngọc Ánh';

    if (platform === 'messenger') {
      if (this.dom.chatHeaderStatus) {
        this.dom.chatHeaderStatus.innerHTML = `<span class="header-platform-tag tag-messenger">💬 Messenger</span> • Người thật (${relName})`;
      }
      if (this.dom.chatHeaderName && !dialogue.headerName) {
        this.dom.chatHeaderName.textContent = `${relName} (Messenger)`;
      }
      if (this.dom.chatMainContainer) {
        this.dom.chatMainContainer.classList.add('is-platform-messenger');
        this.dom.chatMainContainer.classList.remove('is-platform-zalo', 'is-platform-sms');
      }
    } else if (platform === 'sms') {
      if (this.dom.chatHeaderStatus) {
        this.dom.chatHeaderStatus.innerHTML = `<span class="header-platform-tag tag-sms">📱 Tin nhắn SMS</span> • SIM điện thoại chính`;
      }
      if (this.dom.chatMainContainer) {
        this.dom.chatMainContainer.classList.add('is-platform-sms');
        this.dom.chatMainContainer.classList.remove('is-platform-messenger', 'is-platform-zalo');
      }
    } else { // zalo
      if (this.dom.chatHeaderStatus) {
        this.dom.chatHeaderStatus.innerHTML = `<span class="header-platform-tag tag-zalo">💬 Zalo</span> • Tài khoản mới kết bạn`;
      }
      if (this.dom.chatHeaderName && !dialogue.headerName) {
        this.dom.chatHeaderName.textContent = `${relName} (Zalo)`;
      }
      if (this.dom.chatMainContainer) {
        this.dom.chatMainContainer.classList.add('is-platform-zalo');
        this.dom.chatMainContainer.classList.remove('is-platform-messenger', 'is-platform-sms');
      }
    }
  }

  processDialogue(dialogue) {
    if (!dialogue) return;
    this.currentDialogueId = dialogue.id;
    this.updateCallMode(dialogue);

    const chapter = this.storyData.chapters[this.currentChapterIndex];
    const isThem = dialogue.speaker === 'them';
    const isSystem = dialogue.speaker === 'system';

    // Xử lý chuyển đổi nền tảng ở Level 4 (Messenger vs Zalo vs SMS)
    if (this.currentChapterIndex === 3) {
      const dialoguePlatform = dialogue.platform || 'zalo';
      if (this.currentActivePlatform && this.currentActivePlatform !== dialoguePlatform && dialoguePlatform !== 'banking' && dialoguePlatform !== 'system') {
        this.renderPlatformSwitchDivider(dialoguePlatform);
      }
      if (dialoguePlatform !== 'banking' && dialoguePlatform !== 'system') {
        this.currentActivePlatform = dialoguePlatform;
        this.updateLevel4HeaderPlatform(dialoguePlatform, dialogue);
      }
    }

    if (dialogue.headerName && this.dom.chatHeaderName) {
      this.dom.chatHeaderName.textContent = this.formatDialogueText(dialogue.headerName);
    }
    if (dialogue.headerAvatar && this.dom.chatHeaderAvatar) {
      const isFemale = (this.character && (this.character.gender === 'Nữ' || this.character.id === 'female'));
      if (this.currentChapterIndex === 3 && (dialogue.headerAvatar.includes('avatar_male') || dialogue.headerAvatar.includes('avatar_female'))) {
        this.dom.chatHeaderAvatar.src = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
      } else {
        this.dom.chatHeaderAvatar.src = dialogue.headerAvatar;
      }
    }
    if (this.dom.chatHeaderWarning) {
      this.dom.chatHeaderWarning.textContent = '';
      if (this.dom.chatHeaderWarning.parentElement) {
        this.dom.chatHeaderWarning.parentElement.style.display = 'none';
      }
    }
    if (dialogue.deltaMoney && dialogue.deltaMoney !== 0) {
      this.updateWalletUI(dialogue.deltaMoney, true);
    }

    const formattedDialogueSender = dialogue.senderName ? this.formatDialogueText(dialogue.senderName) : '';
    const formattedChapterSender = (chapter && chapter.sender && chapter.sender.name) ? this.formatDialogueText(chapter.sender.name) : '';
    const senderShortName = formattedDialogueSender
      ? formattedDialogueSender.split('(')[0].trim()
      : (isThem && formattedChapterSender
          ? formattedChapterSender.split('-')[0].trim() 
          : (this.character ? this.character.name.split(' ').slice(-1)[0] : 'Bạn'));

    const hasText = dialogue.text && typeof dialogue.text === 'string' && dialogue.text.trim().length > 0;
    const formattedText = hasText ? this.formatDialogueText(dialogue.text) : '';
    const textLen = hasText ? formattedText.length : 25;
    const delay = isSystem 
      ? 150 
      : (!isThem 
          ? (this.fastMode ? 30 : 150) 
          : (this.fastMode ? 100 : Math.min(1300, Math.max(450, textLen * 14))));

    const isMe = !isThem && !isSystem;
    const hasCccdAttach = isMe && (
      (dialogue && (dialogue.hasCccdAttachment === true || dialogue.id === 'step2b_sent_cccd' || dialogue.id === 'step5a_sent_portrait' || dialogue.id === 'stage5_action_send_all')) ||
      (formattedText && (
        formattedText.includes('Đã gửi ảnh 2 mặt CCCD') ||
        formattedText.includes('Đã gửi ảnh chân dung chính diện cầm CCCD') ||
        formattedText.includes('gửi ảnh CCCD cho bạn làm hồ sơ') ||
        formattedText.includes('gửi ảnh CCCD')
      ))
    );
    const isPortrait = isMe && (
      (dialogue && (dialogue.hasPortraitAttachment || dialogue.id === 'step5a_sent_portrait' || dialogue.id === 'stage5_action_send_all')) ||
      (formattedText && formattedText.includes('chân dung'))
    );

    // Hiển thị trạng thái đang soạn tin nhắn khi đối phương gửi tin có text
    if (isThem && hasText && this.dom.typingIndicator) {
      if (this.dom.typingLabel) {
        this.dom.typingLabel.textContent = `${senderShortName} đang soạn tin...`;
      }
      this.dom.typingIndicator.style.display = 'flex';
      if (this.dom.chatStream) this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
    }

    setTimeout(() => {
      if (this.dom.typingIndicator) this.dom.typingIndicator.style.display = 'none';
      if (dialogue.callCardBefore) {
        this.appendCallStatusCard({ ...dialogue.callCardBefore, platform: dialogue.platform });
      }
      // Không hiển thị tin nhắn hệ thống vào khung chat nếu là cảnh báo/hướng dẫn lựa chọn phân nhánh
      const isChoicePromptNotice = (dialogue.choices && dialogue.choices.length > 0 && dialogue.speaker === 'system') ||
        (dialogue.speaker === 'system' && dialogue.text && (
          dialogue.text.includes('Giao diện App hiển thị') ||
          dialogue.text.includes('phương án phân nhánh') ||
          dialogue.text.includes('lựa chọn phân nhánh') ||
          dialogue.text.includes('phân nhánh cho người chơi') ||
          dialogue.text.startsWith('⚡') ||
          dialogue.text.startsWith('⚠️ Giao diện')
        ));

      if (hasText && !isChoicePromptNotice) {
        this.appendMessage(dialogue.speaker, formattedText, dialogue.senderName, dialogue.avatar, dialogue);
      }
      if (dialogue.callCardAfter) {
        this.appendCallStatusCard({ ...dialogue.callCardAfter, platform: dialogue.platform });
      }

      // GỬI TIN NHẮN ẢNH CCCD RIÊNG BIỆT THEO ĐÚNG TỈ LỆ CHUẨN ISO ID-1
      if (hasCccdAttach) {
        const timeSinceLast = this._lastCccdSentTimestamp ? (Date.now() - this._lastCccdSentTimestamp) : Infinity;
        if (timeSinceLast > 2500) {
          this._lastCccdSentTimestamp = Date.now();
          setTimeout(() => {
            this.appendCccdImageMessage(dialogue.speaker, isPortrait, dialogue);
          }, this.fastMode ? 60 : 280);
        }
      }

      // Âm thanh nhận tin (them) hoặc gửi tin (me)
      if (hasText && !isSystem && window.soundEngine) {
        if (isThem && typeof window.soundEngine.playMessageReceived === 'function') {
          window.soundEngine.playMessageReceived();
        } else if (!isThem && typeof window.soundEngine.playMessageSent === 'function') {
          window.soundEngine.playMessageSent();
        } else {
          window.soundEngine.playClick();
        }
      }

      if (dialogue.id === 'g6_countdown_warning' || dialogue.id === 'g6_final_decision_point') {
        setTimeout(() => this.startLevel4Countdown(), 300);
      }

      // NẾU LÀ ĐIỂM KẾT THÚC (ENDING): HIỂN THỊ BANNER KẾT CỤC TRONG CHAT STREAM
      if (dialogue.isEnd) {
        const isWin = dialogue.status === 'win';
        const isWarning = dialogue.status === 'warning';
        const bannerColor = isWin ? '#10b981' : (isWarning ? '#f59e0b' : '#ef4444');
        const bannerBg = isWin ? 'rgba(6, 78, 59, 0.95)' : (isWarning ? 'rgba(120, 53, 15, 0.95)' : 'rgba(127, 29, 29, 0.95)');
        const bannerIcon = isWin ? '🏆' : (isWarning ? '⚠️' : '💀');
        const statusLabel = isWin ? 'AN TOÀN • THOÁT BẪY THÀNH CÔNG' : (isWarning ? 'CẢNH BÁO • HẠN CHẾ RỦI RO' : 'SẬP BẪY • THẤT BẠI');

        const endBanner = document.createElement('div');
        endBanner.className = 'chat-sys-notice chat-ending-banner';
        endBanner.style.cssText = `
          text-align: center;
          margin: 14px auto;
          padding: 14px 18px;
          background: ${bannerBg};
          border: 2px solid ${bannerColor};
          border-radius: 12px;
          color: #fff;
          max-width: 95%;
          box-shadow: 0 6px 20px rgba(0,0,0,0.5);
          line-height: 1.5;
        `;
        endBanner.innerHTML = `
          <div style="font-size: 0.78rem; font-weight: 800; letter-spacing: 1.5px; color: ${bannerColor}; text-transform: uppercase;">
            ${bannerIcon} KẾT THÚC MÀN CHƠI • ${statusLabel}
          </div>
          <div style="font-size: 1.15rem; font-weight: 900; margin: 6px 0; color: #fff; text-shadow: 1px 1px 0 #000;">
            ${dialogue.endingCode ? dialogue.endingCode + ' — ' : ''}${dialogue.endingTitle || 'KẾT THÚC'}
          </div>
          <div style="font-size: 0.82rem; color: #f1f5f9; margin-top: 6px; line-height: 1.45;">
            ${this.formatDialogueText(dialogue.summaryConclusion || '')}
          </div>
          <div style="margin-top: 10px; font-size: 0.75rem; color: #cbd5e1; font-style: italic;">
            ⏳ Đang tải Bảng Tổng Kết Ending Game...
          </div>
        `;
        this.dom.chatStream.appendChild(endBanner);
        this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
      }

      const extraCccdDelay = hasCccdAttach ? (this.fastMode ? 100 : 420) : 0;

      if (dialogue.choices && dialogue.choices.length > 0) {
        setTimeout(() => {
          this.renderChoices(dialogue.choices, dialogue);
        }, (this.fastMode ? 50 : 350) + extraCccdDelay);
      } else if (dialogue.nextId) {
        // Tự động nhắn tin tiếp tục giữa 2 nhân vật
        setTimeout(() => {
          this.stepTo(dialogue.nextId);
        }, (this.fastMode ? 50 : 500) + extraCccdDelay);
      } else if (dialogue.isEnd) {
        setTimeout(() => {
          this.showCaseSummary(dialogue.status, dialogue);
        }, (this.fastMode ? 350 : 850) + extraCccdDelay);
      }
    }, hasText ? delay : 100);
  }

  stepTo(dialogueId) {
    // Phân nhánh logic kiểm tra CCCD ở Stage 3 sang Stage 5
    if (dialogueId === 'end3_check_cccd') {
      if (this.gameState && this.gameState.hasSentCccd) {
        this.stepTo('stage5_leak_cccd');
      } else {
        this.stepTo('end3_ending');
      }
      return;
    }

    const chapter = this.storyData.chapters[this.currentChapterIndex];
    const nextDialogue = chapter.dialogues.find(d => d.id === dialogueId);
    if (nextDialogue) {
      this.processDialogue(nextDialogue);
    }
  }

  toggleOutsideCccdFromChat() {
    this.openCccdLightbox();
  }

  openCccdLightbox() {
    let lightbox = document.getElementById('cccdLightboxModal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'cccd-lightbox-modal';
      lightbox.id = 'cccdLightboxModal';
      lightbox.innerHTML = `
        <div class="cccd-lightbox-card">
          <button class="cccd-lightbox-close" id="btnCloseCccdLightbox" type="button">✕ Đóng</button>
          <div style="font-size: 0.88rem; font-weight: 800; color: #FAD550; letter-spacing: 1px; margin-top: 5px;">
            🪪 THẺ CĂN CƯỚC CÔNG DÂN
          </div>
          <div id="cccdLightboxCardContent" style="width: 100%;"></div>
          <div style="font-size: 0.75rem; color: #94A3B8; text-align: center;">
            Thẻ Căn cước công dân gắn chip điện tử
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('#btnCloseCccdLightbox')) {
          this.closeCccdLightbox();
        }
      });
    }

    const lightboxContent = document.getElementById('cccdLightboxCardContent');
    if (lightboxContent) {
      lightboxContent.innerHTML = this.renderStandaloneCccdHtml();
    }
    lightbox.classList.add('active');
    if (window.soundEngine) window.soundEngine.playClick();
  }

  closeCccdLightbox() {
    const lightbox = document.getElementById('cccdLightboxModal');
    if (lightbox) lightbox.classList.remove('active');
  }

  renderCccdAttachmentHtml(isPortrait = false) {
    return this.renderStandaloneCccdHtml(isPortrait);
  }

  appendMessage(speaker, rawText, customSenderName, customAvatar, dialogue = null) {
    if (!this.dom.chatStream || rawText === undefined || rawText === null) return;
    let text = this.formatDialogueText(rawText);
    if (!text || typeof text !== 'string' || text.trim() === '') return;

    // Loại bỏ các dòng chú thích hệ thống dạng (Đã gửi ảnh...), (Cuộc gọi...) để đoạn chat của nhân vật chỉ là tin nhắn thoại tự nhiên
    text = text.replace(/\n?\s*\([Đđ]ã gửi ảnh[^\)]*\)/gi, '')
               .replace(/\n?\s*\([Cc]uộc gọi[^\)]*\)/gi, '').trim();
    if (!text) return;

    const chapter = this.storyData.chapters[this.currentChapterIndex];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (this.dom.chatHeaderStatus) {
      this.dom.chatHeaderStatus.textContent = `Đang hoạt động • ${timeStr}`;
    }

    if (speaker === 'system') {
      // Bỏ qua cảnh báo hệ thống dạng hướng dẫn phân nhánh / giao diện hiển thị
      if (text.includes('Giao diện App hiển thị') || text.includes('phương án phân nhánh') || text.includes('lựa chọn phân nhánh') || text.includes('phân nhánh cho người chơi') || text.startsWith('⚡') || text.startsWith('⚠️ Giao diện')) {
        return;
      }
      const sysMsg = document.createElement('div');
      sysMsg.className = 'chat-sys-notice';
      sysMsg.style.cssText = 'text-align:center; margin:10px auto; padding:8px 16px; background:rgba(14,35,66,0.92); border:1.5px solid #3b82f6; border-radius:14px; font-size:0.8rem; color:#bfdbfe; max-width:92%; font-weight:700; line-height:1.45; box-shadow:0 4px 12px rgba(0,0,0,0.4);';
      sysMsg.innerHTML = text.replace(/\n/g, '<br>') + `<div style="font-size:0.7rem; color:#93c5fd; margin-top:5px; font-weight:normal; letter-spacing:0.3px;">${timeStr}</div>`;
      this.dom.chatStream.appendChild(sysMsg);
      this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
      return;
    }

    const isThem = speaker === 'them';
    const isMe = !isThem;

    let platform = (dialogue && dialogue.platform) || (this.currentChapterIndex === 3 ? (this.currentActivePlatform || 'zalo') : null);

    const msg = document.createElement('div');
    msg.className = `chat-msg ${isThem ? 'incoming' : 'outgoing'}${platform ? ' platform-' + platform : ''}`;
    const isFemale = (this.character && (this.character.gender === 'Nữ' || this.character.id === 'female'));
    let defaultThemAvatar = (chapter && chapter.sender ? chapter.sender.avatar : 'assets/avatar_shipper.svg');
    if (this.currentChapterIndex === 3 && defaultThemAvatar && (defaultThemAvatar.includes('avatar_male') || defaultThemAvatar.includes('avatar_female'))) {
      defaultThemAvatar = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
    }

    let avatarSrc = customAvatar || (isThem 
      ? defaultThemAvatar
      : (this.character ? this.character.avatar : (isFemale ? 'assets/avatar_female.png?v=29.0' : 'assets/avatar_male.png?v=29.0')));
    if (this.currentChapterIndex === 3 && customAvatar && (customAvatar.includes('avatar_male') || customAvatar.includes('avatar_female'))) {
      avatarSrc = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
    }

    const formattedCustomSender = customSenderName ? this.formatDialogueText(customSenderName) : null;
    const senderName = formattedCustomSender || (isThem 
      ? (chapter && chapter.sender ? this.formatDialogueText(chapter.sender.name) : 'Người lạ')
      : (this.character ? this.character.name : 'Bạn'));

    let badgeHtml = '';
    if (this.currentChapterIndex === 3 && platform) {
      if (platform === 'messenger') {
        badgeHtml = `<span class="platform-badge messenger-badge">💬 Messenger</span>`;
      } else if (platform === 'sms') {
        badgeHtml = `<span class="platform-badge sms-badge">📱 SMS</span>`;
      } else if (platform === 'zalo') {
        badgeHtml = `<span class="platform-badge zalo-badge">💬 Zalo</span>`;
      }
    }

    msg.innerHTML = `
      <img class="chat-msg-avatar" src="${avatarSrc}" alt="${senderName}">
      <div class="chat-msg-body">
        <span class="chat-msg-author">${senderName}${badgeHtml}</span>
        <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
        <div class="chat-msg-meta">
          <span class="msg-time">${timeStr}</span>
          ${!isThem ? '<span class="msg-ticks">✓✓</span>' : ''}
        </div>
      </div>
    `;
    this.dom.chatStream.appendChild(msg);
    this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
  }

  appendCallStatusCard(options) {
    if (!this.dom.chatStream || !options) return;
    const {
      type = 'connected', // 'missed', 'declined', 'connected', 'ended', 'incoming_video', 'completed_video', 'completed_outgoing'
      title = null,
      callTypeText = 'Cuộc gọi thoại',
      durationText = '0 phút 31 giây',
      duration = null,
      status = null,
      isOutgoing = false,
      align = null,
      showDatePill = false,
      datePill = null,
      datePillText = null,
      timeStr: customTimeStr = null,
      customAvatar = null,
      onlyDatePill = false,
      platform = null
    } = options;

    const now = new Date();
    const timeStr = customTimeStr || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (showDatePill || datePillText || datePill || onlyDatePill) {
      const dateRow = document.createElement('div');
      dateRow.className = 'chat-date-pill-row';
      dateRow.innerHTML = `<span class="chat-date-pill">${datePillText || datePill || `${timeStr} ${dayStr}`}</span>`;
      this.dom.chatStream.appendChild(dateRow);
    }

    // Nếu chỉ hiển thị pill ngày giờ mà không hiển thị thẻ cuộc gọi
    if (onlyDatePill || (!title && !options.type && (datePillText || datePill))) {
      this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
      return;
    }

    const outgoing = isOutgoing || align === 'right' || type === 'declined' || type === 'completed_outgoing';
    const isMissed = type === 'missed';
    const isDeclined = type === 'declined';
    const isVideo = type === 'incoming_video' || type === 'completed_video' || (callTypeText && callTypeText.toLowerCase().includes('video')) || (title && title.toLowerCase().includes('video'));

    const cardTitle = title || (isMissed ? 'Bạn bị nhỡ' : (isDeclined ? 'Người nhận từ chối' : (isVideo ? (outgoing ? 'Cuộc gọi video đi' : 'Cuộc gọi video đến') : (outgoing ? 'Cuộc gọi thoại đi' : 'Cuộc gọi thoại đến'))));

    // SVG icons matching user reference image
    const missedIconSvg = `<svg class="call-card-status-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><polyline points="15 3 21 3 21 9"/><line x1="21" y1="3" x2="14" y2="10"/></svg>`;
    const declinedIconSvg = `<svg class="call-card-status-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><circle cx="16" cy="8" r="4.5" stroke="#DC2626" stroke-width="1.8" fill="none"/><line x1="13" y1="5" x2="19" y2="11" stroke="#DC2626" stroke-width="1.8"/></svg>`;
    const connectedVoiceSvg = outgoing
      ? `<svg class="call-card-status-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><polyline points="15 3 21 3 21 9"/><line x1="21" y1="3" x2="14" y2="10"/></svg>`
      : `<svg class="call-card-status-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><polyline points="17 7 11 7 11 13"/><line x1="19" y1="5" x2="11" y2="13"/></svg>`;
    const connectedVideoSvg = `<svg class="call-card-status-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`;

    let iconSvg = isMissed ? missedIconSvg : (isDeclined ? declinedIconSvg : (isVideo ? connectedVideoSvg : connectedVoiceSvg));
    let statusLineText = (isMissed || isDeclined) ? (status || callTypeText) : (duration || status || durationText);

    const hasRecallBtn = isMissed || isDeclined;

    const chapterPlat = platform || (this.currentChapterIndex === 3 ? (this.currentActivePlatform || 'zalo') : null);
    const wrap = document.createElement('div');
    wrap.className = `chat-msg chat-call-msg-row ${outgoing ? 'outgoing' : 'incoming'}${chapterPlat ? ' platform-' + chapterPlat : ''}`;

    const char = this.character || this.loadCharacter() || this.characters.female;
    const isFemale = (char.gender === 'Nữ' || char.id === 'female');
    const callerAvatar = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';

    let callBadgeHtml = '';
    if (this.currentChapterIndex === 3 && chapterPlat) {
      if (chapterPlat === 'messenger') {
        callBadgeHtml = `<span class="platform-badge messenger-badge">💬 Messenger</span>`;
      } else if (chapterPlat === 'sms') {
        callBadgeHtml = `<span class="platform-badge sms-badge">📱 SIM</span>`;
      } else if (chapterPlat === 'zalo') {
        callBadgeHtml = `<span class="platform-badge zalo-badge">💬 Zalo</span>`;
      }
    }

    wrap.innerHTML = `
      ${!outgoing ? `<img class="chat-msg-avatar" src="${customAvatar || callerAvatar}" alt="Caller">` : ''}
      <div class="chat-call-card-wrap">
        <div class="chat-call-status-card ${outgoing ? 'is-outgoing' : 'is-incoming'} ${isMissed ? 'is-missed' : ''}">
          <div class="call-card-main">
            <div class="call-card-header ${isMissed ? 'text-red' : ''}">${this.formatDialogueText(cardTitle)}${callBadgeHtml}</div>
            <div class="call-card-sub">
              ${iconSvg}
              <span class="call-card-subtext">${statusLineText}</span>
            </div>
            ${hasRecallBtn ? `
              <div class="call-card-divider"></div>
              <button class="call-card-btn-action" type="button" onclick="if(window.soundEngine) window.soundEngine.playPhoneRing()">Gọi lại</button>
            ` : ''}
          </div>
          ${!outgoing ? `<div class="call-card-dots">•••</div>` : ''}
        </div>
        <div class="chat-call-timestamp">${timeStr}</div>
      </div>
    `;

    this.dom.chatStream.appendChild(wrap);
    this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
  }

  renderStandaloneCccdHtml(isPortrait = false) {
    const char = this.character || this.loadCharacter() || this.characters.female;
    const isFemale = (char.id === 'female' || char.gender === 'Nữ');

    const portraitBanner = isPortrait ? `
      <div class="cccd-portrait-indicator" style="background: linear-gradient(90deg, #DC2626 0%, #991B1B 100%); color: #FFFFFF; font-size: 0.62rem; font-weight: 800; text-align: center; padding: 2px 6px; border-radius: 4px; margin-bottom: 3px; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.3); letter-spacing: 0.3px;">
        <span>📸</span> ẢNH CHÂN DUNG CHÍNH DIỆN CẦM THẺ CCCD (eKYC)
      </div>
    ` : '';

    return `<div class="chat-physical-cccd-card ${isFemale ? 'female-card' : 'male-card'}" onclick="window.game && window.game.openCccdLightbox && window.game.openCccdLightbox()" title="Thẻ Căn cước công dân gắn chip (Bấm để xem phóng to)">${portraitBanner}<div class="cccd-inner"><div class="cccd-header-row"><div class="cccd-emblem-badge"><svg class="cccd-emblem-svg" viewBox="0 0 36 36" width="28" height="28" style="display:block; flex-shrink:0;"><circle cx="18" cy="18" r="17" fill="#DA251D" stroke="#FFCD00" stroke-width="1.5"/><polygon points="18,5.5 21.6,14.6 31,14.8 23.4,20.6 26.2,29.8 18,24.3 9.8,29.8 12.6,20.6 5,14.8 14.4,14.6" fill="#FFCD00"/></svg></div><div class="cccd-titles"><div class="cccd-nation">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="cccd-motto">Độc lập - Tự do - Hạnh phúc</div><div class="cccd-type-title">CĂN CƯỚC CÔNG DÂN / <span>Identity Card</span></div></div></div><div class="cccd-body"><div class="cccd-col-left"><div class="cccd-photo-frame"><img src="${char.avatar}" alt="${char.name}" class="cccd-avatar-img">${isPortrait ? '<span class="cccd-photo-tag" style="background:#DC2626;">CHÂN DUNG</span>' : ''}</div><div class="cccd-chip-box" title="Chip vi mạch điện tử bảo mật"><div class="cccd-chip-pattern"></div></div></div><div class="cccd-col-right"><div class="cccd-field-row id-number-row"><span class="cccd-lbl">Số / No.:</span><span class="cccd-val id-number">${char.idNumber}</span></div><div class="cccd-field-row"><span class="cccd-lbl">Họ và tên:</span><span class="cccd-val name-val">${char.name.toUpperCase()}</span></div><div class="cccd-two-cols"><div class="cccd-field-row"><span class="cccd-lbl">Ngày sinh:</span><span class="cccd-val">${char.dob}</span></div><div class="cccd-field-row"><span class="cccd-lbl">Tuổi:</span><span class="cccd-val highlight-age">${char.age} tuổi</span></div></div><div class="cccd-two-cols"><div class="cccd-field-row"><span class="cccd-lbl">Giới tính:</span><span class="cccd-val">${char.gender}</span></div><div class="cccd-field-row"><span class="cccd-lbl">Quốc tịch:</span><span class="cccd-val">${char.nationality || 'Việt Nam'}</span></div></div><div class="cccd-field-row"><span class="cccd-lbl">Quê quán:</span><span class="cccd-val">${char.hometown}</span></div><div class="cccd-divider-dashed"></div><div class="cccd-field-row"><span class="cccd-lbl">Nghề nghiệp:</span><span class="cccd-val job-tag">${char.job}</span></div><div class="cccd-field-row phone-row"><span class="cccd-lbl">Số ĐT:</span><span class="cccd-val phone-val">${char.phone}</span></div></div></div></div></div>`;
  }

  appendCccdImageMessage(speaker = 'me', isPortrait = false, dialogue = null) {
    if (!this.dom.chatStream) return;
    const char = this.character || this.loadCharacter() || this.characters.female;
    const isFemale = (char.id === 'female' || char.gender === 'Nữ');
    const avatarSrc = char.avatar || (isFemale ? 'assets/avatar_female.png?v=29.0' : 'assets/avatar_male.png?v=29.0');
    const senderName = char.name || 'Bạn';
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const msg = document.createElement('div');
    msg.className = 'chat-msg outgoing is-cccd-only';

    const cardHtml = this.renderStandaloneCccdHtml(isPortrait);

    msg.innerHTML = `
      <img class="chat-msg-avatar" src="${avatarSrc}" alt="${senderName}">
      <div class="chat-msg-body">
        <span class="chat-msg-author">${senderName}</span>
        <div class="msg-bubble cccd-image-bubble">
          ${cardHtml}
        </div>
        <div class="chat-msg-meta">
          <span class="msg-time">${timeStr}</span>
          <span class="msg-ticks">✓✓</span>
        </div>
      </div>
    `;
    this.dom.chatStream.appendChild(msg);
    this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;

    if (window.soundEngine && typeof window.soundEngine.playMessageSent === 'function') {
      window.soundEngine.playMessageSent();
    }
  }

  cleanChoiceOptionText(text) {
    return this.cleanChoiceText(text);
  }

  cleanChoiceText(text) {
    if (!text || typeof text !== 'string') return text;
    let t = text.trim();

    let prev = '';
    // Lặp để bóc sạch mọi tầng tiền tố nếu có lồng nhau (vd: "[ Lựa chọn 1 ]: 1A. ...")
    while (t !== prev) {
      prev = t;
      // 1. Bóc dạng trong ngoặc vuông: [ Lựa chọn 1 ], [ Option A ], [ 4.1 ], [ C1 ]
      t = t.replace(/^\[[^\]]+\][\s:–—\-.]*/i, '').trim();

      // 2. Bóc từ "Lựa chọn" hoặc "Đáp án" hoặc "Phương án" hoặc "Câu"
      t = t.replace(/^(Lựa\s*chọn|Đáp\s*án|Phương\s*án|Câu)\s*([A-Za-z0-9.]+)?[\s:–—\-.]*/i, '').trim();

      // 3. Bóc dạng trong ngoặc đơn mã ngắn: (A), (1), (C1), (1A), (4.1)
      t = t.replace(/^\(([A-Za-z0-9.]+)\)[\s:–—\-.]*/i, '').trim();

      // 4. Bóc mã dạng chữ + số (C1, A2, B3) hoặc số + chữ (1A, 2B, 3C) hoặc số chấm số (4.1, 4.2)
      t = t.replace(/^([A-Za-z][0-9]+|[0-9]+[A-Za-z]+|[0-9]+\.[0-9]+)[\s:–—\-.]+/i, '').trim();

      // 5. Bóc ký tự đơn A, B, C, D, E, F, G... hoặc số đơn 1, 2, 3... có kèm dấu chấm/hai chấm/gạch ngang
      t = t.replace(/^([A-Za-z]|[0-9]+)[\s]*[:–—\-.]+[\s]*/i, '').trim();

      // 6. Bóc chữ "Lựa chọn" ở đầu nếu câu bắt đầu bằng "Lựa chọn..."
      t = t.replace(/^Lựa\s*chọn\s+/i, '').trim();
    }

    // Viết hoa chữ cái đầu tiên của câu trả lời cho đẹp
    if (t.length > 0 && !t.startsWith('(') && !t.startsWith('"') && !t.startsWith('“')) {
      t = t.charAt(0).toUpperCase() + t.slice(1);
    }

    return t.trim();
  }

  renderChoices(choices, currentDialogue) {
    if (!this.dom.choicesContainer) return;
    this.dom.choicesContainer.innerHTML = '';

    if (this.dom.choicesStatus) {
      this.dom.choicesStatus.textContent = '👉 PHẢN HỒI CỦA BẠN:';
    }

    choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.type = 'button';
      const cleanOptText = this.cleanChoiceOptionText(ch.text);
      btn.textContent = this.formatDialogueText(cleanOptText);
      btn.addEventListener('click', () => this.handleChoice(ch, currentDialogue));
      this.dom.choicesContainer.appendChild(btn);
    });

    if (this.dom.btnRewindDecision) {
      if (this.decisionCheckpoints && this.decisionCheckpoints.length > 0) {
        this.dom.btnRewindDecision.style.display = 'flex';
      } else {
        this.dom.btnRewindDecision.style.display = 'none';
      }
    }
  }

  handleChoice(choice, currentDialogue) {
    this.stopLevel4Countdown();
    if (window.soundEngine) window.soundEngine.playClick();
    if (this.dom.choicesContainer) this.dom.choicesContainer.innerHTML = '';
    if (this.dom.btnRewindDecision) this.dom.btnRewindDecision.style.display = 'none';

    // Lưu điểm quyết định này vào danh sách checkpoint để có thể quay lại thử hướng khác
    if (currentDialogue && currentDialogue.id) {
      const lastCp = this.decisionCheckpoints[this.decisionCheckpoints.length - 1];
      if (!lastCp || lastCp.dialogueId !== currentDialogue.id) {
        this.decisionCheckpoints.push({
          dialogueId: currentDialogue.id,
          choices: currentDialogue.choices
        });
      }
    }

    const cleanText = this.cleanChoiceText(choice.text);
    const rawKey = choice.choiceKey || (choice.text && choice.text.trim().match(/^([A-G])\./i) ? choice.text.trim().match(/^([A-G])\./i)[1].toUpperCase() : null);
    const formattedChoice = {
      ...choice,
      stageNumber: (currentDialogue && currentDialogue.stageNumber) || null,
      stageTitle: (currentDialogue && currentDialogue.stageTitle) || null,
      dialogueId: (currentDialogue && currentDialogue.id) || null,
      choiceKey: rawKey,
      text: this.formatDialogueText(cleanText),
      reason: this.formatDialogueText(choice.reason || '')
    };

    this.decisionHistory.push(formattedChoice);

    // Cập nhật 3 chỉ số Gameplay (Niềm tin, Rủi ro dữ liệu, Thiệt hại tài chính)
    if (typeof choice.deltaTrust === 'number') {
      this.trustScore = Math.max(0, Math.min(100, this.trustScore + choice.deltaTrust));
    }
    if (typeof choice.deltaRisk === 'number') {
      this.dataRiskScore = Math.max(0, Math.min(100, this.dataRiskScore + choice.deltaRisk));
    }
    if (choice.trackLoss === false) {
      // Bỏ qua không tính vào thiệt hại tài chính nếu tiền chỉ là tạm ứng được hoàn ngay
    } else if (typeof choice.deltaMoney === 'number' && choice.deltaMoney < 0) {
      this.financialLoss += Math.abs(choice.deltaMoney);
    }
    if (choice.setState && typeof choice.setState === 'object') {
      this.gameState = { ...this.gameState, ...choice.setState };
    }
    this.updateHudMetrics();

    // Apply financial penalty or reward
    if (choice.deltaMoney && choice.deltaMoney !== 0) {
      this.updateWalletUI(choice.deltaMoney, true);
    }

    // LUÔN LUÔN hiển thị bong bóng tin nhắn phản hồi của người chơi ngay khi chọn đáp án
    const choiceBubbleText = this.cleanChoiceOptionText(choice.text);
    this.appendMessage('me', this.formatDialogueText(choiceBubbleText), null, null, currentDialogue);

    const chapter = this.storyData.chapters[this.currentChapterIndex];
    const nextDialogue = (choice.nextId && chapter) ? chapter.dialogues.find(d => d.id === choice.nextId) : null;

    const lowerCleanText = cleanText.toLowerCase();
    const isCccdSituation = Boolean(
      choice.hasCccdAttachment ||
      (choice.setState && (choice.setState.hasSentCccd || choice.setState.hasSentPortrait)) ||
      (nextDialogue && (nextDialogue.hasCccdAttachment || nextDialogue.id === 'step2b_sent_cccd' || nextDialogue.id === 'step5a_sent_portrait')) ||
      lowerCleanText.includes('gửi ảnh cccd') ||
      lowerCleanText.includes('gửi cccd') ||
      lowerCleanText.includes('chân dung cầm cccd') ||
      lowerCleanText.includes('ảnh 2 mặt cccd') ||
      lowerCleanText.includes('gửi ảnh chân dung')
    );

    const isPortrait = Boolean(
      choice.hasPortraitAttachment ||
      (choice.setState && choice.setState.hasSentPortrait) ||
      (nextDialogue && (nextDialogue.hasPortraitAttachment || nextDialogue.id === 'step5a_sent_portrait')) ||
      lowerCleanText.includes('chân dung')
    );

    // BẤT KỲ TÌNH HUỐNG NÀO CÓ GỬI ẢNH CCCD: GỬI GIAO DIỆN ẢNH CCCD CỦA NHÂN VẬT ĐÃ CHỌN LÚC ĐẦU
    if (isCccdSituation) {
      this._lastCccdSentTimestamp = Date.now();
      setTimeout(() => {
        this.appendCccdImageMessage('me', isPortrait, nextDialogue || currentDialogue);
      }, this.fastMode ? 50 : 250);
    }

    // Check actions
    if (choice.action === 'open_phishing_modal') {
      setTimeout(() => this.openPhishingModal(), 400);
    } else if (choice.action === 'open_official_app') {
      setTimeout(() => this.openOfficialAppModal(), 400);
    } else if (choice.action === 'open_call_modal') {
      setTimeout(() => this.openCallModal(), 400);
    } else if (choice.nextId) {
      // Nếu lời thoại tiếp theo cũng là 'me' và có nextId, chuyển thẳng đến phản hồi tiếp theo
      if (nextDialogue && nextDialogue.speaker === 'me' && nextDialogue.nextId) {
        if (typeof nextDialogue.deltaMoney === 'number' && nextDialogue.deltaMoney !== 0) {
          this.updateWalletUI(nextDialogue.deltaMoney, true);
        }
        if (typeof nextDialogue.deltaTrust === 'number') {
          this.trustScore = Math.max(0, Math.min(100, this.trustScore + nextDialogue.deltaTrust));
        }
        if (typeof nextDialogue.deltaRisk === 'number') {
          this.dataRiskScore = Math.max(0, Math.min(100, this.dataRiskScore + nextDialogue.deltaRisk));
        }
        this.updateHudMetrics();

        const delay = isCccdSituation ? (this.fastMode ? 400 : 1200) : (this.fastMode ? 50 : 350);
        setTimeout(() => {
          this.stepTo(nextDialogue.nextId);
        }, delay);
      } else {
        const delay = isCccdSituation ? (this.fastMode ? 400 : 1200) : (this.fastMode ? 50 : 350);
        setTimeout(() => {
          this.stepTo(choice.nextId);
        }, delay);
      }
    }
  }

  rewindDecision() {
    if (!this.decisionCheckpoints || this.decisionCheckpoints.length === 0) return;
    if (window.soundEngine) window.soundEngine.playClick();

    const lastCp = this.decisionCheckpoints.pop();
    const chapter = this.storyData.chapters[this.currentChapterIndex];
    const prevDialogue = chapter.dialogues.find(d => d.id === lastCp.dialogueId);

    if (prevDialogue && prevDialogue.choices) {
      const rewindNotice = document.createElement('div');
      rewindNotice.className = 'chat-sys-notice';
      rewindNotice.style.cssText = 'text-align:center; margin:10px auto; padding:8px 16px; background:rgba(30,58,138,0.88); border:1.5px solid #60a5fa; border-radius:12px; font-size:0.78rem; color:#dbeafe; max-width:92%; font-weight:700; line-height:1.45;';
      rewindNotice.innerHTML = `🔄 <strong>Đã quay lại điểm quyết định trước để thử lựa chọn khác.</strong><br><span style="font-size:0.72rem; color:#bfdbfe; font-weight:normal;">Lưu ý: Hậu quả đã xảy ra (như CCCD, OTP hoặc tiền đã nộp) vẫn được giữ nguyên trong cùng một lượt chơi!</span>`;
      if (this.dom.chatStream) {
        this.dom.chatStream.appendChild(rewindNotice);
        this.dom.chatStream.scrollTop = this.dom.chatStream.scrollHeight;
      }

      if (this.dom.choicesStatus) {
        this.dom.choicesStatus.textContent = '👉 CHỌN LẠI HƯỚNG ĐI KHÁC:';
      }

      this.renderChoices(prevDialogue.choices, prevDialogue);
    }
  }

  formatVND(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    const isNeg = num < 0;
    const absVal = Math.abs(Math.round(num));
    const formatted = absVal.toLocaleString('vi-VN');
    return isNeg ? `-${formatted}` : formatted;
  }

  updateWalletUI(deltaMoney = 0, animate = true) {
    this.bankBalance += deltaMoney;
    this.saveWallet();

    const isNegative = this.bankBalance < 0;
    const formatted = this.formatVND(this.bankBalance);

    if (this.dom.walletAmount) {
      this.dom.walletAmount.textContent = formatted;
      if (isNegative) {
        this.dom.walletAmount.classList.add('negative-money');
      } else {
        this.dom.walletAmount.classList.remove('negative-money');
      }
    }

    const outsideBalanceBox = document.querySelector('.outside-balance-display');
    if (outsideBalanceBox) {
      if (isNegative) {
        outsideBalanceBox.classList.add('negative-balance');
      } else {
        outsideBalanceBox.classList.remove('negative-balance');
      }
    }

    if (this.dom.rewardBalanceVal) {
      this.dom.rewardBalanceVal.textContent = `${formatted} đ`;
      this.dom.rewardBalanceVal.style.color = isNegative ? '#ef4444' : '#FAD550';
    }

    const levelVal = document.getElementById('levelScreenBalanceVal');
    if (levelVal) {
      levelVal.textContent = formatted;
      levelVal.style.color = isNegative ? '#ef4444' : '#FFFFFF';
    }

    const dockBankVal = document.getElementById('dockBankBalanceVal');
    if (dockBankVal) {
      dockBankVal.textContent = `${formatted} VNĐ`;
      if (isNegative) {
        dockBankVal.classList.add('negative-money');
      } else {
        dockBankVal.classList.remove('negative-money');
      }
    }

    const pct = Math.min(100, Math.max(0, (this.bankBalance / this.initialBalance) * 100));
    if (this.dom.walletMeterFill) {
      this.dom.walletMeterFill.style.width = isNegative ? '0%' : `${pct}%`;
      this.dom.walletMeterFill.style.background = isNegative ? '#ef4444' : '';
    }

    if (this.dom.walletBadge) {
      if (this.bankBalance < 0) {
        this.dom.walletBadge.textContent = `🚨 Âm ${this.formatVND(Math.abs(this.bankBalance))} VNĐ`;
        this.dom.walletBadge.style.color = '#ef4444';
        this.dom.walletBadge.style.borderColor = '#ef4444';
      } else if (this.bankBalance === 0) {
        this.dom.walletBadge.textContent = '🚨 Cháy túi (0đ)';
        this.dom.walletBadge.style.color = '#ef4444';
        this.dom.walletBadge.style.borderColor = '#ef4444';
      } else if (this.bankBalance < 25000000) {
        this.dom.walletBadge.textContent = '⚠️ Nguy hiểm';
        this.dom.walletBadge.style.color = '#f5b722';
        this.dom.walletBadge.style.borderColor = '#f5b722';
      } else {
        this.dom.walletBadge.textContent = '🛡️ An toàn';
        this.dom.walletBadge.style.color = '#55f088';
        this.dom.walletBadge.style.borderColor = '#55f088';
      }
    }

    if (animate && deltaMoney !== 0 && this.dom.moneyDeltaFloat) {
      this.dom.moneyDeltaFloat.textContent = deltaMoney > 0 ? `+${this.formatVND(deltaMoney)}đ` : `-${this.formatVND(Math.abs(deltaMoney))}đ`;
      this.dom.moneyDeltaFloat.style.color = deltaMoney > 0 ? '#55f088' : '#e63946';
      this.dom.moneyDeltaFloat.classList.add('show');
      setTimeout(() => this.dom.moneyDeltaFloat.classList.remove('show'), 1200);

      if (deltaMoney < 0 && window.soundEngine) window.soundEngine.playDanger();
      if (deltaMoney > 0 && window.soundEngine) window.soundEngine.playScoreUp();
    }
  }

  saveWallet() {
    try {
      localStorage.setItem('g7_balance', this.bankBalance);
    } catch (e) {}
  }

  loadBalance() {
    try {
      const b = localStorage.getItem('g7_balance');
      if (b === null || b === '50000000') {
        localStorage.setItem('g7_balance', '80000000');
        return 80000000;
      }
      const parsed = parseInt(b, 10);
      return isNaN(parsed) ? 80000000 : parsed;
    } catch (e) {
      return 80000000;
    }
  }

  // CCCD Character Handling
  loadCharacter() {
    try {
      const saved = localStorage.getItem('g7_character_id');
      if (saved && this.characters[saved]) {
        return this.characters[saved];
      }
    } catch (e) {}
    return this.characters.female;
  }

  isCharacterChosen() {
    try {
      return localStorage.getItem('g7_character_chosen') === 'true';
    } catch (e) {
      return false;
    }
  }

  saveCharacter(charId) {
    try {
      localStorage.setItem('g7_character_id', charId);
      localStorage.setItem('g7_character_chosen', 'true');
    } catch (e) {}
  }

  setCharacter(charId) {
    if (!this.characters[charId]) return;
    this.character = this.characters[charId];
    this.saveCharacter(charId);
    this.updateCharacterUI('chosen_only');
    if (this.currentChapterIndex === 1 && this.storyData && this.storyData.chapters[1]) {
      const curDial = this.storyData.chapters[1].dialogues.find(d => d.id === this.currentDialogueId);
      if (curDial) this.updateCallMode(curDial);
    }
    if (this.currentChapterIndex === 3 && this.storyData && this.storyData.chapters[3]) {
      const chapter = this.storyData.chapters[3];
      const isFemale = (this.character.gender === 'Nữ' || this.character.id === 'female');
      if (this.dom.chatHeaderName) this.dom.chatHeaderName.textContent = this.formatDialogueText(chapter.sender.name);
      if (this.dom.chatHeaderAvatar) {
        this.dom.chatHeaderAvatar.src = isFemale ? 'assets/avatar_male.png?v=29.0' : 'assets/avatar_female.png?v=29.0';
      }
    }
    if (window.soundEngine && typeof window.soundEngine.playScoreUp === 'function') {
      window.soundEngine.playScoreUp();
    }
  }

  updateCharacterUI(mode = 'auto') {
    if (!this.character) return;
    const isChosen = this.isCharacterChosen();
    const cardF = document.getElementById('cardFemale');
    const cardM = document.getElementById('cardMale');
    const title = document.getElementById('charSelectTitle');
    const desc = document.getElementById('charSelectDesc');
    const chosenActions = document.getElementById('charChosenActions');
    const btnContinueChosen = document.getElementById('btnContinueWithChosenChar');
    const btnSelectF = document.getElementById('btnSelectFemale');
    const btnSelectM = document.getElementById('btnSelectMale');

    const shouldShowOnlyChosen = (mode === 'chosen_only') || (mode === 'auto' && isChosen);

    const wrapF = document.getElementById('wrapFemale') || cardF;
    const wrapM = document.getElementById('wrapMale') || cardM;

    if (shouldShowOnlyChosen) {
      // CHẾ ĐỘ: CHỈ HIỂN THỊ THÔNG TIN ĐÃ CHỌN
      if (this.character.id === 'female') {
        if (wrapF) wrapF.style.display = 'flex';
        if (cardF) cardF.classList.add('active-selected');
        if (wrapM) wrapM.style.display = 'none';
        if (cardM) cardM.classList.remove('active-selected');
        if (btnSelectF) btnSelectF.textContent = '★ DANH TÍNH ĐANG SỬ DỤNG ★';
      } else {
        if (wrapM) wrapM.style.display = 'flex';
        if (cardM) cardM.classList.add('active-selected');
        if (wrapF) wrapF.style.display = 'none';
        if (cardF) cardF.classList.remove('active-selected');
        if (btnSelectM) btnSelectM.textContent = '★ DANH TÍNH ĐANG SỬ DỤNG ★';
      }

      if (title) {
        title.innerHTML = `THẺ CĂN CƯỚC CỦA BẠN: <span>${this.character.name.toUpperCase()}</span>`;
      }
      if (desc) {
        desc.innerHTML = `Danh tính công dân đã chọn: <strong>${this.character.gender} • ${this.character.age} tuổi • ${this.character.job}</strong> • SĐT: <strong>${this.character.phone}</strong>`;
      }
      if (chosenActions) chosenActions.style.display = 'block';
      if (btnContinueChosen) {
        btnContinueChosen.textContent = `▶ TIẾP TỤC VỚI ${this.character.name.toUpperCase()} ➔`;
      }
    } else {
      // CHẾ ĐỘ: HIỂN THỊ CẢ 2 ĐỂ LỰA CHỌN
      if (wrapF) wrapF.style.display = 'flex';
      if (cardF) cardF.classList.toggle('active-selected', this.character.id === 'female');
      if (wrapM) wrapM.style.display = 'flex';
      if (cardM) cardM.classList.toggle('active-selected', this.character.id === 'male');
      if (btnSelectF) btnSelectF.textContent = '👉 CHỌN NỮ: NGỌC ÁNH';
      if (btnSelectM) btnSelectM.textContent = '👉 CHỌN NAM: THANH TUẤN';

      if (title) {
        title.innerHTML = `CHỌN <span>DANH TÍNH NHẬP VAI</span>`;
      }
      if (desc) {
        desc.textContent = `Lựa chọn một công dân dưới đây để rèn luyện kỹ năng phòng thủ số, bảo vệ thông tin CCCD và tài khoản ngân hàng.`;
      }
      if (chosenActions) chosenActions.style.display = 'none';
    }

    // Update phish input placeholder with character phone
    const phishInputs = document.querySelectorAll('.fake-input');
    phishInputs.forEach(inp => {
      inp.placeholder = `Nhập số tài khoản hoặc SĐT (${this.character.phone})`;
    });

    // Update greeting in collect modal
    const collectDesc = document.querySelector('.collect-desc');
    if (collectDesc) {
      collectDesc.innerHTML = `Xin chào <strong>${this.character.name}</strong> (${this.character.job}, ${this.character.age} tuổi)! Hệ thống vừa cấp <strong>80.000.000 VNĐ</strong> vào tài khoản số <strong>${this.character.phone}</strong> để bắt đầu thử thách phòng chống lừa đảo.`;
    }

    // Cập nhật thông tin thẻ CCCD và Tài Khoản STK bên ngoài màn hình điện thoại
    const outAvatar = document.getElementById('outsideCccdAvatar');
    const outNumber = document.getElementById('outsideCccdNumber');
    const outName = document.getElementById('outsideCccdName');
    const outDob = document.getElementById('outsideCccdDob');
    const outGender = document.getElementById('outsideCccdGender');
    const outHometown = document.getElementById('outsideCccdHometown');
    const outJob = document.getElementById('outsideCccdJob');
    const outPhone = document.getElementById('outsideCccdPhone');
    const outStk = document.getElementById('outsideBankSTK');
    const outOwner = document.getElementById('outsideBankOwner');

    if (outAvatar) outAvatar.src = this.character.avatar;
    if (outNumber) outNumber.textContent = this.character.idNumber;
    if (outName) outName.textContent = this.character.name.toUpperCase();
    if (outDob) outDob.textContent = `${this.character.dob} (${this.character.age} tuổi)`;
    if (outGender) outGender.textContent = this.character.gender;
    if (outHometown) outHometown.textContent = this.character.hometown;
    if (outJob) outJob.textContent = this.character.job;
    if (outPhone) outPhone.textContent = this.character.phone;
    if (outStk) outStk.textContent = this.character.phone;
    if (outOwner) outOwner.textContent = this.character.name.toUpperCase();

    const dockCccdVal = document.getElementById('dockCccdNameVal');
    if (dockCccdVal) dockCccdVal.textContent = this.character.name;
  }

  openCharacterModal() {
    if (this.dom.characterModal) {
      this.updateCharacterUI('auto');
      if (this.dom.btnCloseCharSelect) {
        this.dom.btnCloseCharSelect.style.display = 'inline-block';
      }
      this.dom.characterModal.classList.add('active');
    }
  }

  closeCharacterModal() {
    if (this.dom.characterModal) {
      this.dom.characterModal.classList.remove('active');
    }
  }

  // Modals
  openPhishingModal() {
    if (this.dom.phishingModal) this.dom.phishingModal.classList.add('active');
  }
  closePhishingModal() {
    if (this.dom.phishingModal) this.dom.phishingModal.classList.remove('active');
  }

  openOfficialAppModal() {
    if (this.dom.officialAppModal) this.dom.officialAppModal.classList.add('active');
  }
  closeOfficialAppModal() {
    if (this.dom.officialAppModal) this.dom.officialAppModal.classList.remove('active');
  }

  openCallModal() {
    if (this.dom.callModal) this.dom.callModal.classList.add('active');
  }
  closeCallModal() {
    if (this.dom.callModal) this.dom.callModal.classList.remove('active');
  }

  openTreeModal() {
    if (!this.dom.treeModal || !this.dom.treeGraphContent) return;
    this.renderInteractiveDecisionTree();
    this.dom.treeModal.classList.add('active');
    if (window.soundEngine) window.soundEngine.playClick();
  }

  closeTreeModal() {
    if (this.dom.treeModal) this.dom.treeModal.classList.remove('active');
    const insp = document.getElementById('treeNodeInspector');
    if (insp) insp.style.display = 'none';
  }

  zoomTree(delta) {
    this.treeZoomScale = Math.max(0.5, Math.min(1.6, (this.treeZoomScale || 1.0) + delta));
    if (this.dom.treeGraphContent) {
      this.dom.treeGraphContent.style.transform = `scale(${this.treeZoomScale})`;
    }
  }

  resetTreeZoom() {
    this.treeZoomScale = 1.0;
    if (this.dom.treeGraphContent) {
      this.dom.treeGraphContent.style.transform = 'scale(1)';
    }
  }

  renderInteractiveDecisionTree() {
    if (!this.dom.treeGraphContent) return;
    const isLevel3 = this.currentChapterIndex === 2;
    const isLevel4 = this.currentChapterIndex === 3;
    const treeData = isLevel3 ? window.LEVEL_3_DECISION_TREE : (isLevel4 ? window.LEVEL_4_DECISION_TREE : null);

    // Cập nhật tiêu đề trên modal
    const treeTitle = document.getElementById('treeGraphTitle');
    const treeSub = document.getElementById('treeGraphSubtitle');
    if (treeTitle) {
      treeTitle.textContent = isLevel3 
        ? "Sơ Đồ Cây Quyết Định: Bẫy Cộng Tác Viên Online"
        : (isLevel4 
          ? "Sơ Đồ Cây Quyết Định: Cú Lừa Chồng Kịch Bản" 
          : `Sơ Đồ Phân Nhánh Quyết Định: Level ${this.currentChapterIndex + 1}`);
    }
    if (treeSub) {
      treeSub.textContent = isLevel3
        ? "Toàn bộ 6 giai đoạn, đường đi bạn đã chọn và 7 kết thúc phân nhánh"
        : (isLevel4
          ? "Toàn bộ 6 giai đoạn, đường đi bạn đã chọn và 5 kết thúc phân nhánh"
          : "Đường đi thực tế và các quyết định bạn đã đưa ra trong màn chơi này");
    }

    // Reset zoom & ẩn inspector
    this.resetTreeZoom();
    const insp = document.getElementById('treeNodeInspector');
    if (insp) insp.style.display = 'none';

    if ((isLevel3 || isLevel4) && treeData && treeData.stages) {
      // CÂY PHÂN NHÁNH 6 GIAI ĐOẠN + KẾT THÚC CHO LEVEL 3 & 4
      let html = '';

      // Render từng giai đoạn (Cột 1 đến 6)
      treeData.stages.forEach((stage) => {
        html += `
          <div class="tree-stage-column" data-stage-id="${stage.id}">
            <div class="stage-column-header">
              <div class="stage-col-badge">${stage.name}</div>
              <div class="stage-col-title">${stage.title}</div>
            </div>
            <div class="stage-options-list">
        `;

        stage.options.forEach((opt) => {
          // Kiểm tra xem người chơi có chọn lựa chọn này không
          const isTrail = this.decisionHistory.some(d => 
            (d.stageNumber === stage.number && (d.choiceKey === opt.key || (d.text && d.text.startsWith(opt.key + '.')))) ||
            (d.dialogueId === stage.decisionId && (d.choiceKey === opt.key || (d.text && d.text.startsWith(opt.key + '.'))))
          );

          const badgeClass = opt.type === 'good' ? 'badge-good' : (opt.type === 'risk' ? 'badge-risk' : 'badge-bad');
          const typeClass = `type-${opt.type}`;

          html += `
            <div class="tree-node-card ${typeClass} ${isTrail ? 'trail-active' : ''}" 
                 onclick="window.game.inspectTreeNode('${stage.id}', '${opt.id}')"
                 title="Bấm để xem chi tiết bối cảnh, phân tích rủi ro và bài học">
              <div class="node-header-row">
                <span class="node-key-badge ${badgeClass}">${opt.key}</span>
                <span class="node-score-pts">${opt.score > 0 ? '+' + opt.score + 'đ' : (opt.risk > 0 ? '-' + opt.risk + '% an toàn' : '')}</span>
              </div>
              <div class="node-card-title">${opt.shortTitle}</div>
              <div class="node-card-snippet">${this.formatDialogueText(opt.text)}</div>
              ${isTrail ? '<div class="node-trail-badge">✨ BẠN ĐÃ CHỌN</div>' : ''}
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      // Cột KẾT THÚC (ENDINGS)
      const endingCount = treeData.endings.length;
      html += `
        <div class="tree-endings-column">
          <div class="stage-column-header" style="background: linear-gradient(180deg, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%); border-color: #60a5fa;">
            <div class="stage-col-badge" style="color: #FAD550;">KẾT THÚC</div>
            <div class="stage-col-title">${endingCount} NHÁNH KẾT QUẢ</div>
          </div>
          <div class="stage-options-list">
      `;

      treeData.endings.forEach((ending) => {
        let isReached = false;
        if (this.lastEndingDialogue) {
          if (this.lastEndingDialogue.id === ending.id) {
            isReached = true;
          } else if (this.lastEndingDialogue.endingCode && this.lastEndingDialogue.endingCode.includes(ending.code)) {
            isReached = true;
          } else if (isLevel3) {
            if (ending.id === 'end_lv3_1_block_early' && this.lastEndingDialogue.id === 'end_lv3_1_block_early') isReached = true;
            else if (ending.id === 'end_lv3_2_stop_after_small' && this.lastEndingDialogue.id === 'end_lv3_2_stop_after_small') isReached = true;
            else if (ending.id === 'end_lv3_3_escape_before_vip' && this.lastEndingDialogue.id === 'end_lv3_3_escape_before_vip') isReached = true;
            else if (ending.id === 'end_lv3_4_trial_5m_lost' && this.lastEndingDialogue.id === 'end_lv3_4_trial_5m_lost') isReached = true;
            else if (ending.id === 'end_lv3_5_lost_80m_pro_recovery' && this.lastEndingDialogue.id === 'end_lv3_5_lost_80m_pro_recovery') isReached = true;
            else if (ending.id === 'end_lv3_6_lost_80m_passive' && this.lastEndingDialogue.id === 'end_lv3_6_lost_80m_passive') isReached = true;
            else if (ending.id === 'end_lv3_7_lost_130m_full_scam' && this.lastEndingDialogue.id === 'end_lv3_7_lost_130m_full_scam') isReached = true;
          } else if (isLevel4) {
            if (ending.id === 'end_late_escape' && (this.lastEndingDialogue.id === 'end_safe_level4' || this.lastEndingDialogue.endingCode?.includes('THOÁT HIỂM'))) isReached = true;
            else if (ending.id === 'end_scammed_full_80m' && (this.lastEndingDialogue.id === 'end_scammed_level4' || this.lastEndingDialogue.endingCode?.includes('SẬP BẪY'))) isReached = true;
            else if (ending.id === 'end_near_miss_1m' && (this.lastEndingDialogue.id === 'end_partial_scam_level4' || this.lastEndingDialogue.endingCode?.includes('SUÝT MẤT'))) isReached = true;
          }
        }

        const badgeColor = ending.color || '#3b82f6';
        const typeClass = `type-${ending.type}`;

        html += `
          <div class="tree-ending-card ${typeClass} ${isReached ? 'trail-active' : ''}" 
               style="border-left: 4.5px solid ${badgeColor};"
               onclick="window.game.inspectEndingNode('${ending.id}')"
               title="Bấm để xem chi tiết kết quả này">
            <div class="ending-card-badge" style="color: ${badgeColor};">${ending.code}</div>
            <div class="ending-card-title">${ending.title}</div>
            <div class="ending-card-rank">${ending.rank}</div>
            <div class="ending-card-loss" style="color: ${ending.loss > 0 ? '#ef4444' : '#10b981'};">
              Thiệt hại: ${ending.loss > 0 ? '-' + this.formatVND(ending.loss) + 'đ' : '0 VNĐ (An toàn)'}
            </div>
            ${isReached ? '<div class="node-trail-badge" style="background: #FAD550; color: #020914;">🎯 BẠN ĐẠT ĐƯỢC</div>' : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.dom.treeGraphContent.innerHTML = html;
    } else {
      // CÁC LEVEL KHÁC: Render danh sách các bước quyết định trực quan
      this.dom.treeGraphContent.innerHTML = this.decisionHistory.length === 0
        ? '<p style="color:#94a3b8; text-align:center; padding:40px; width:100%;">Bạn chưa đưa ra quyết định nào ở level này.</p>'
        : `
          <div style="display:flex; flex-direction:column; gap:12px; width:100%; max-width:800px; margin:0 auto;">
            ${this.decisionHistory.map((d, i) => `
              <div class="tree-node-card ${d.type === 'good' ? 'type-good' : 'type-bad'} trail-active" style="padding:14px;">
                <div class="node-header-row">
                  <span class="node-key-badge ${d.type === 'good' ? 'badge-good' : 'badge-bad'}">BƯỚC ${i + 1}</span>
                  <span class="node-score-pts" style="color:${d.type === 'good' ? '#34d399' : '#f87171'}; font-weight:800;">${d.type === 'good' ? '✓ QUYẾT ĐỊNH ĐÚNG' : '⚠️ BẪY NGUY HIỂM'}</span>
                </div>
                <div class="node-card-title" style="font-size:0.92rem; margin:6px 0;">${d.text}</div>
                <div style="font-size:0.76rem; color:#cbd5e1; line-height:1.4;"><strong>Lý do & Bài học:</strong> ${d.reason}</div>
              </div>
            `).join('')}
          </div>
        `;
    }
  }

  inspectTreeNode(stageId, optId) {
    const isLevel3 = this.currentChapterIndex === 2;
    const isLevel4 = this.currentChapterIndex === 3;
    const treeData = isLevel3 ? window.LEVEL_3_DECISION_TREE : (isLevel4 ? window.LEVEL_4_DECISION_TREE : null);
    if (!treeData) return;
    const stage = treeData.stages.find(s => s.id === stageId);
    if (!stage) return;
    const opt = stage.options.find(o => o.id === optId);
    if (!opt) return;

    const insp = document.getElementById('treeNodeInspector');
    if (!insp) return;

    const isTrail = this.decisionHistory.some(d => 
      (d.stageNumber === stage.number && (d.choiceKey === opt.key || (d.text && d.text.startsWith(opt.key + '.')))) ||
      (d.dialogueId === stage.decisionId && (d.choiceKey === opt.key || (d.text && d.text.startsWith(opt.key + '.'))))
    );

    const typeBadge = document.getElementById('inspTypeBadge');
    if (typeBadge) {
      typeBadge.className = `inspector-type-badge type-${opt.type}`;
      typeBadge.textContent = opt.type === 'good' ? '🟢 AN TOÀN' : (opt.type === 'risk' ? '🟡 RỦI RO' : '🔴 NGUY HIỂM');
    }

    const stageBadge = document.getElementById('inspStageBadge');
    if (stageBadge) {
      stageBadge.textContent = `${stage.name.toUpperCase()} • ${isTrail ? '👉 BẠN ĐÃ CHỌN' : '💡 PHẢN HỒI KHÁC'}`;
      stageBadge.style.color = isTrail ? '#FAD550' : '#94a3b8';
    }

    const titleEl = document.getElementById('inspChoiceTitle');
    if (titleEl) titleEl.textContent = `${opt.key}: ${opt.shortTitle}`;

    const sitEl = document.getElementById('inspSituationText');
    if (sitEl) sitEl.textContent = stage.situation;

    const choiceEl = document.getElementById('inspChoiceText');
    if (choiceEl) choiceEl.textContent = this.formatDialogueText(opt.text);

    const anaEl = document.getElementById('inspAnalysisText');
    if (anaEl) anaEl.textContent = opt.analysis;

    const trapEl = document.getElementById('inspTrapText');
    if (trapEl) trapEl.textContent = opt.trap;

    const lesEl = document.getElementById('inspLessonText');
    if (lesEl) lesEl.textContent = opt.lesson;

    insp.style.display = 'block';
    if (window.soundEngine) window.soundEngine.playClick();
  }

  inspectEndingNode(endingId) {
    const isLevel3 = this.currentChapterIndex === 2;
    const isLevel4 = this.currentChapterIndex === 3;
    const treeData = isLevel3 ? window.LEVEL_3_DECISION_TREE : (isLevel4 ? window.LEVEL_4_DECISION_TREE : null);
    if (!treeData) return;
    const ending = treeData.endings.find(e => e.id === endingId);
    if (!ending) return;

    const insp = document.getElementById('treeNodeInspector');
    if (!insp) return;

    let isReached = false;
    if (this.lastEndingDialogue) {
      if (this.lastEndingDialogue.id === ending.id) {
        isReached = true;
      } else if (this.lastEndingDialogue.endingCode && this.lastEndingDialogue.endingCode.includes(ending.code)) {
        isReached = true;
      } else if (isLevel3) {
        if (ending.id === 'end_lv3_1_block_early' && this.lastEndingDialogue.id === 'end_lv3_1_block_early') isReached = true;
        else if (ending.id === 'end_lv3_2_stop_after_small' && this.lastEndingDialogue.id === 'end_lv3_2_stop_after_small') isReached = true;
        else if (ending.id === 'end_lv3_3_escape_before_vip' && this.lastEndingDialogue.id === 'end_lv3_3_escape_before_vip') isReached = true;
        else if (ending.id === 'end_lv3_4_trial_5m_lost' && this.lastEndingDialogue.id === 'end_lv3_4_trial_5m_lost') isReached = true;
        else if (ending.id === 'end_lv3_5_lost_80m_pro_recovery' && this.lastEndingDialogue.id === 'end_lv3_5_lost_80m_pro_recovery') isReached = true;
        else if (ending.id === 'end_lv3_6_lost_80m_passive' && this.lastEndingDialogue.id === 'end_lv3_6_lost_80m_passive') isReached = true;
        else if (ending.id === 'end_lv3_7_lost_130m_full_scam' && this.lastEndingDialogue.id === 'end_lv3_7_lost_130m_full_scam') isReached = true;
      } else if (isLevel4) {
        if (ending.id === 'end_late_escape' && (this.lastEndingDialogue.id === 'end_safe_level4' || this.lastEndingDialogue.endingCode?.includes('THOÁT HIỂM'))) isReached = true;
        else if (ending.id === 'end_scammed_full_80m' && (this.lastEndingDialogue.id === 'end_scammed_level4' || this.lastEndingDialogue.endingCode?.includes('SẬP BẪY'))) isReached = true;
        else if (ending.id === 'end_near_miss_1m' && (this.lastEndingDialogue.id === 'end_partial_scam_level4' || this.lastEndingDialogue.endingCode?.includes('SUÝT MẤT'))) isReached = true;
      }
    }

    const typeBadge = document.getElementById('inspTypeBadge');
    if (typeBadge) {
      typeBadge.className = `inspector-type-badge type-${ending.type}`;
      typeBadge.textContent = ending.type === 'win' ? '🏆 CHIẾN THẮNG' : (ending.type === 'warning' ? '⚠️ CẢNH BÁO' : '💀 THẤT BẠI');
    }

    const stageBadge = document.getElementById('inspStageBadge');
    if (stageBadge) {
      stageBadge.textContent = `KẾT THÚC • ${isReached ? '🎯 BẠN ĐÃ ĐẠT ĐƯỢC' : '🔒 KẾT QUẢ KHÁC'}`;
      stageBadge.style.color = isReached ? '#FAD550' : '#94a3b8';
    }

    const titleEl = document.getElementById('inspChoiceTitle');
    if (titleEl) titleEl.textContent = `${ending.code}: ${ending.title}`;

    const sitEl = document.getElementById('inspSituationText');
    if (sitEl) sitEl.textContent = `Đánh giá: ${ending.rank} • Thiệt hại tài chính: ${ending.loss > 0 ? '-' + this.formatVND(ending.loss) + ' VNĐ' : '0 VNĐ'}`;

    const choiceEl = document.getElementById('inspChoiceText');
    if (choiceEl) choiceEl.textContent = ending.description;

    const anaEl = document.getElementById('inspAnalysisText');
    if (anaEl) anaEl.textContent = `Điểm An Toàn: ${ending.safetyScore}/100 • Điểm Rủi Ro: ${ending.riskScore}/100`;

    const trapEl = document.getElementById('inspTrapText');
    if (trapEl) {
      if (isLevel3) {
        trapEl.textContent = ending.type === 'lost' 
          ? 'Sập bẫy chi phí chìm (Sunk cost) và bẫy nạp tiền làm nhiệm vụ gỡ vốn.' 
          : (ending.type === 'warning' ? 'Bị dao động bởi mồi nhử nhưng kịp dừng lại trước đơn lớn.' : 'Chủ động phòng thủ, nhận diện bẫy việc nhẹ lương cao và không nạp tiền.');
      } else {
        trapEl.textContent = ending.type === 'lost' ? 'Mắc bẫy chuyển tiền vào cổng thanh toán trung gian.' : (ending.type === 'warning' ? 'Mắc bẫy chuyển thử 1 triệu đồng.' : 'Không mắc bẫy hoặc kịp thời tỉnh ngộ dừng lại.');
      }
    }

    const lesEl = document.getElementById('inspLessonText');
    if (lesEl) {
      if (isLevel3) {
        lesEl.textContent = "Không bao giờ nạp tiền để làm việc kiếm hoa hồng. Mọi yêu cầu tạm ứng tiền làm nhiệm vụ đều là lừa đảo!";
      } else {
        lesEl.textContent = "Kiểm tra 3 lớp độc lập: Đúng Người – Đúng Sự Việc – Đúng Giao Dịch.";
      }
    }

    insp.style.display = 'block';
    if (window.soundEngine) window.soundEngine.playClick();
  }

  showCaseSummary(status, endingDialogue = null) {
    if (!this.dom.summaryModal) return;
    this.lastEndingDialogue = endingDialogue;
    const ch = this.storyData.chapters[this.currentChapterIndex];

    const tag = document.getElementById('summaryEndingTag');
    const title = document.getElementById('summaryTitle');
    const badge = document.getElementById('summaryBadge');
    const scoreVal = document.getElementById('summaryScoreValue');
    const scoreBar = document.getElementById('summaryScoreBar');
    const conclusion = document.getElementById('summaryConclusion');
    const goodList = document.getElementById('summaryGoodActions');
    const badList = document.getElementById('summaryBadActions');
    const lesson = document.getElementById('summaryLesson');

    // 3 chỉ số trong bảng summaryTriadCard
    const sumTrustVal = document.getElementById('sumTrustVal');
    const sumRiskVal = document.getElementById('sumRiskVal');
    const sumLossVal = document.getElementById('sumLossVal');

    // Cảnh báo & Dấu hiệu bỏ qua
    const warningBox = document.getElementById('summaryWarningBox');
    const warningText = document.getElementById('summaryWarningSignsText');

    // Các phần tử % đánh giá Làm Tốt & Chưa Làm Tốt
    const goodPctEl = document.getElementById('summaryGoodPct');
    const badPctEl = document.getElementById('summaryBadPct');
    const goodBar = document.getElementById('summaryGoodBar');
    const badBar = document.getElementById('summaryBadBar');
    const goodSubtext = document.getElementById('summaryGoodSubtext');
    const badSubtext = document.getElementById('summaryBadSubtext');
    const badgeGoodPct = document.getElementById('badgeGoodPct');
    const badgeBadPct = document.getElementById('badgeBadPct');

    const isWin = status === 'win';
    const isWarning = status === 'warning';

    // Ending Tag & Title (Tối Giản)
    const endBannerEl = document.getElementById('summaryEndingBanner');
    if (endBannerEl) {
      endBannerEl.textContent = isWin ? '🏁 HOÀN THÀNH LEVEL' : '⚠️ KẾT THÚC LEVEL';
    }

    if (tag) {
      tag.textContent = endingDialogue?.endingCode || (isWin ? 'VICTORY' : 'GAME OVER');
    }

    if (title) {
      if (endingDialogue && endingDialogue.endingTitle) {
        title.textContent = endingDialogue.endingTitle;
      } else {
        title.textContent = isWin ? 'BẬC THẦY CẢNH GIÁC MẠNG' : 'SẬP BẪY TÂM LÝ KẺ GIAN';
      }
    }

    if (badge) {
      if (isWin) {
        badge.textContent = '🏆 XỬ LÝ XUẤT SẮC • AN TOÀN';
        badge.style.color = '#55f088';
        badge.style.borderColor = '#55f088';
      } else if (isWarning) {
        badge.textContent = '⚠️ CẢNH BÁO • HẠN CHẾ RỦI RO';
        badge.style.color = '#f5b722';
        badge.style.borderColor = '#f5b722';
      } else {
        badge.textContent = '💀 SẬP BẪY LỪA ĐẢO • THẤT BẠI';
        badge.style.color = '#e63946';
        badge.style.borderColor = '#e63946';
      }
    }

    // Đồng bộ thiệt hại tài chính nếu kịch bản kết thúc có quy định rõ ràng
    if (endingDialogue && typeof endingDialogue.financialLoss === 'number') {
      this.financialLoss = endingDialogue.financialLoss;
    }

    // Kết quả 3 chỉ số Gameplay
    if (sumTrustVal) sumTrustVal.textContent = `${this.trustScore}%`;
    if (sumRiskVal) {
      if (this.dataRiskScore === 0) sumRiskVal.textContent = 'An toàn (0%)';
      else if (this.dataRiskScore <= 35) sumRiskVal.textContent = `Thấp (${this.dataRiskScore}%)`;
      else if (this.dataRiskScore <= 70) sumRiskVal.textContent = `Trung bình (${this.dataRiskScore}%)`;
      else sumRiskVal.textContent = `Nguy hiểm (${this.dataRiskScore}%)`;
    }
    if (sumLossVal) sumLossVal.textContent = `${this.formatVND(this.financialLoss)} VNĐ`;

    // Số dư ngân hàng còn lại
    if (scoreVal) {
      scoreVal.textContent = `${this.formatVND(this.bankBalance)} đ`;
      if (this.bankBalance < 0) {
        scoreVal.classList.add('negative-money');
      } else {
        scoreVal.classList.remove('negative-money');
      }
    }
    if (scoreBar) {
      const balancePct = Math.min(100, Math.max(0, (this.bankBalance / this.initialBalance) * 100));
      scoreBar.style.width = `${balancePct}%`;
      if (this.bankBalance < 0) {
        scoreBar.style.background = '#ef4444';
      }
    }
    const scoreCardLabel = document.getElementById('summaryScoreCardLabel');
    if (scoreCardLabel) {
      scoreCardLabel.textContent = this.bankBalance < 0 ? 'SỐ DƯ TÀI KHOẢN (BỊ ÂM DO THIẾU TIỀN)' : 'SỐ DƯ TÀI KHOẢN BẢO VỆ ĐƯỢC';
    }

    // Diễn biến kết cục
    if (conclusion) {
      conclusion.textContent = this.formatDialogueText(endingDialogue?.summaryConclusion || (
        isWin 
          ? 'Bạn đã thành công thoát khỏi cạm bẫy của kẻ lừa đảo và bảo vệ nguyên vẹn tài sản số!' 
          : 'Bạn đã rơi vào cạm bẫy thao túng tâm lý và để xảy ra thiệt hại.'
      ));
    }

    // Dấu hiệu cảnh báo đã xuất hiện / bỏ qua
    if (warningBox && warningText) {
      if (endingDialogue && endingDialogue.warningSigns) {
        warningBox.style.display = 'block';
        warningText.textContent = this.formatDialogueText(endingDialogue.warningSigns);
      } else {
        warningBox.style.display = 'none';
      }
    }

    // Bài học cốt lõi
    if (lesson) {
      lesson.textContent = this.formatDialogueText(endingDialogue?.lesson || ch.lesson);
    }

    // Tính toán tỷ lệ % Làm Tốt và Chưa Làm Tốt
    const goods = this.decisionHistory.filter(d => d.type === 'good');
    const bads = this.decisionHistory.filter(d => d.type === 'bad');
    const total = goods.length + bads.length;

    let goodPct = 0;
    let badPct = 0;

    if (status === 'lost') {
      goodPct = 0;
      badPct = 100;
    } else if (isWin && bads.length === 0) {
      goodPct = 100;
      badPct = 0;
    } else if (total > 0) {
      goodPct = Math.round((goods.length / total) * 100);
      badPct = 100 - goodPct;
    } else {
      goodPct = isWin ? 100 : 0;
      badPct = isWin ? 0 : 100;
    }

    if (goodPctEl) goodPctEl.textContent = `${goodPct}%`;
    if (badPctEl) badPctEl.textContent = `${badPct}%`;
    if (goodBar) goodBar.style.width = `${goodPct}%`;
    if (badBar) badBar.style.width = `${badPct}%`;
    if (badgeGoodPct) badgeGoodPct.textContent = `${goodPct}%`;
    if (badgeBadPct) badgeBadPct.textContent = `${badPct}%`;

    if (goodSubtext) {
      goodSubtext.textContent = isWin ? 'Tỉnh táo an toàn' : (goodPct > 0 ? `${goodPct}% quyết định đúng` : 'Không phát hiện');
    }
    if (badSubtext) {
      badSubtext.textContent = isWin ? 'Không bị lừa' : 'Sập bẫy kẻ gian';
    }

    // Hiển thị số tiền bị lừa (0 VNĐ hoặc số tiền cụ thể)
    const lossCard = document.getElementById('summaryLossCard');
    const lossValue = document.getElementById('summaryLossValue');
    if (lossValue) {
      if (this.financialLoss > 0) {
        lossValue.textContent = `${this.formatVND(this.financialLoss)} VNĐ`;
        lossValue.className = 'minimal-loss-value is-loss';
        if (lossCard) lossCard.className = 'minimal-loss-card has-loss';
      } else {
        lossValue.textContent = '0 VNĐ (An toàn)';
        lossValue.className = 'minimal-loss-value is-safe';
        if (lossCard) lossCard.className = 'minimal-loss-card no-loss';
      }
    }

    if (goodList) {
      goodList.innerHTML = goods.length > 0
        ? goods.map(g => `<li>✅ ${g.reason}</li>`).join('')
        : '<li>Chưa có hành động an toàn nào.</li>';
    }

    if (badList) {
      badList.innerHTML = bads.length > 0
        ? bads.map(b => `<li>❌ ${b.reason}</li>`).join('')
        : '<li>Tuyệt vời! Không mắc sai lầm nguy hiểm nào.</li>';
    }

    const nextChapterBtn = document.getElementById('summaryNextChapterBtn');
    if (nextChapterBtn) {
      nextChapterBtn.innerHTML = `Next Level ➔`;
    }

    const replayBtn = document.getElementById('summaryReplayBtn');
    if (replayBtn) {
      replayBtn.innerHTML = `🔄 Chơi Lại`;
    }

    // ================= LEVEL 3 & LEVEL 4 ĐÁNH GIÁ 100 ĐIỂM & BẢNG PHÂN TÍCH =================
    const l4Container = document.getElementById('level4SummaryContainer');
    if (l4Container) {
      if (this.currentChapterIndex === 2) {
        // LEVEL 3: BẪY CỘNG TÁC VIÊN ONLINE (7 KẾT THÚC, 5 TIÊU CHÍ KỸ NĂNG, BẢNG LỊCH SỬ DÒNG TIỀN, 5 GIAI ĐOẠN TÂM LÝ)
        let endingId = endingDialogue?.id;
        if (!endingId) {
          if (status === 'lost') {
            const paid50m = this.decisionHistory.some(d => (d.choiceKey === 'A' || d.choiceKey === 'B') && (d.stageNumber === 5 || d.dialogueId === 'lv3_g5_decision_5'));
            endingId = paid50m ? 'end_lv3_7_lost_130m_full_scam' : 'end_lv3_5_lost_80m_pro_recovery';
          } else if (status === 'warning') {
            endingId = 'end_lv3_4_trial_5m_lost';
          } else {
            const triedSmall = this.decisionHistory.some(d => d.dialogueId === 'lv3_g1_decision_1' && (d.choiceKey === 'D' || d.choiceKey === 'C'));
            endingId = triedSmall ? 'end_lv3_2_stop_after_small' : 'end_lv3_1_block_early';
          }
        }

        let safetyScore = 100;
        let riskScore = 0;
        let endingLoss = 0;
        let rankBadgeText = '🌟 PHÒNG THỦ SỐ HOÀN HẢO';
        let rankBadgeClass = 'score-badge-expert';
        let rankEvalDesc = 'Nhận diện thủ đoạn việc nhẹ lương cao ngay từ tin nhắn đầu tiên, chặn số và bảo toàn 100% tài sản.';
        let transTransferred = 0;
        let transReceived = 0;
        let transCommission = 0;
        let transVirtual = 0;

        if (endingId === 'end_lv3_1_block_early') {
          safetyScore = 100;
          riskScore = 0;
          endingLoss = 0;
          rankBadgeText = '🌟 PHÒNG THỦ SỐ HOÀN HẢO (PERFECT DEFENSE)';
          rankBadgeClass = 'score-badge-expert';
          rankEvalDesc = 'Xuất sắc: Chặn ngay tin nhắn tuyển dụng từ đầu, không nạp tiền, không tiết lộ thông tin cá nhân.';
          transTransferred = 0;
          transReceived = 0;
          transCommission = 0;
          transVirtual = 0;
        } else if (endingId === 'end_lv3_2_stop_after_small') {
          safetyScore = 85;
          riskScore = 15;
          endingLoss = 0;
          rankBadgeText = '🛡️ TỈNH TÁO KỊP THỜI (TIMELY ESCAPE)';
          rankBadgeClass = 'score-badge-good';
          rankEvalDesc = 'Tỉnh táo kịp thời: Đã hoàn thành 2 đơn nhỏ nhận hoa hồng mồi nhưng dứt khoát rút lui trước bẫy đơn VIP.';
          transTransferred = 2500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 0;
        } else if (endingId === 'end_lv3_3_escape_before_vip') {
          safetyScore = 80;
          riskScore = 20;
          endingLoss = 0;
          rankBadgeText = '🛡️ BẢO TOÀN VỐN THÀNH CÔNG (CAPITAL PRESERVED)';
          rankBadgeClass = 'score-badge-good';
          rankEvalDesc = 'Bảo toàn vốn: Đứng trước áp lực thời gian và mồi nhử hoa hồng 12 triệu của đơn VIP 80 triệu, bạn đã kiên quyết từ chối nạp tiền.';
          transTransferred = 2500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 92000000;
        } else if (endingId === 'end_lv3_4_trial_5m_lost') {
          safetyScore = 60;
          riskScore = 40;
          endingLoss = 5000000;
          rankBadgeText = '⚠️ THIẾU CẨN TRỌNG (NEAR MISS)';
          rankBadgeClass = 'score-badge-warn';
          rankEvalDesc = 'Thiếu cẩn trọng: Mắc bẫy an toàn giả nạp thử 5 triệu đồng, may mắn dừng lại giữ được 75 triệu còn lại.';
          transTransferred = 7500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 92000000;
        } else if (endingId === 'end_lv3_5_lost_80m_pro_recovery') {
          safetyScore = 45;
          riskScore = 55;
          endingLoss = 80000000;
          rankBadgeText = '🚨 CẮT LỖ & BẢO VỆ CHỨNG CỨ (RECOVERY PRO)';
          rankBadgeClass = 'score-badge-warn';
          rankEvalDesc = 'Cắt lỗ & bảo vệ chứng cứ: Đã chuyển 80 triệu nhưng dứt khoát không nộp 50 triệu gỡ vốn, báo ngân hàng và công an trong thời gian vàng.';
          transTransferred = 82500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 142000000;
        } else if (endingId === 'end_lv3_6_lost_80m_passive') {
          safetyScore = 35;
          riskScore = 65;
          endingLoss = 80000000;
          rankBadgeText = '💀 XỬ LÝ THỤ ĐỘNG, BẾ TẮC (PASSIVE CRISIS)';
          rankBadgeClass = 'score-badge-danger';
          rankEvalDesc = 'Xử lý thụ động: Mất 80 triệu nhưng giấu gia đình vì mặc cảm, hoặc tìm dịch vụ thu hồi tiền trên mạng (bẫy lừa đảo thứ cấp).';
          transTransferred = 82500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 142000000;
        } else if (endingId === 'end_lv3_7_lost_130m_full_scam') {
          safetyScore = 0;
          riskScore = 100;
          endingLoss = 130000000;
          rankBadgeText = '💀 SẬP BẪY TOÀN BỘ – CHÁY TÀI KHOẢN (FULL TRAP)';
          rankBadgeClass = 'score-badge-danger';
          rankEvalDesc = 'Sập bẫy chi phí chìm: Nạp 80 triệu rồi tiếp tục nộp thêm 50 triệu tiền bảo hiểm hệ thống, mất trắng toàn bộ 130 triệu đồng.';
          transTransferred = 132500000;
          transReceived = 2750000;
          transCommission = 250000;
          transVirtual = 142000000;
        }

        this.financialLoss = endingLoss;

        // Đồng bộ lên 2 thẻ % trên đỉnh Summary Modal:
        if (goodPctEl) goodPctEl.textContent = `${safetyScore}%`;
        if (badPctEl) badPctEl.textContent = `${riskScore}%`;
        if (goodBar) goodBar.style.width = `${safetyScore}%`;
        if (badBar) badBar.style.width = `${riskScore}%`;
        if (badgeGoodPct) badgeGoodPct.textContent = `${safetyScore}%`;
        if (badgeBadPct) badgeBadPct.textContent = `${riskScore}%`;

        if (goodSubtext) {
          goodSubtext.textContent = safetyScore === 100 
            ? 'Phòng thủ số hoàn hảo • An toàn 100%' 
            : (safetyScore >= 80 ? 'Tỉnh táo kịp thời • Bảo toàn vốn' : (safetyScore >= 60 ? 'Mất 5 triệu • Giữ được 75 triệu' : 'Chưa nhận diện được'));
        }
        if (badSubtext) {
          badSubtext.textContent = riskScore === 0 
            ? '0% rủi ro tài chính' 
            : (riskScore <= 20 ? 'Rủi ro thấp (20%)' : (riskScore <= 40 ? 'Mất 5.000.000đ (40%)' : (riskScore <= 65 ? 'Mất 80.000.000đ' : 'Mất trắng 130.000.000đ')));
        }

        // Cập nhật thẻ Số tiền bị lừa
        if (lossValue) {
          if (endingLoss > 0) {
            lossValue.textContent = `-${this.formatVND(endingLoss)} VNĐ`;
            lossValue.className = 'minimal-loss-value is-loss';
            if (lossCard) lossCard.className = 'minimal-loss-card has-loss';
          } else {
            lossValue.textContent = '0 VNĐ (An toàn)';
            lossValue.className = 'minimal-loss-value is-safe';
            if (lossCard) lossCard.className = 'minimal-loss-card no-loss';
          }
        }

        // Đánh giá 5 Kỹ Năng Cốt Lõi (100 điểm)
        const d1 = this.decisionHistory.find(d => d.stageNumber === 1 || d.dialogueId === 'lv3_g1_decision_1');
        const d2 = this.decisionHistory.find(d => d.stageNumber === 2 || d.dialogueId === 'lv3_g2_decision_2');
        const d3 = this.decisionHistory.find(d => d.stageNumber === 3 || d.dialogueId === 'lv3_g3_decision_3');
        const d4 = this.decisionHistory.find(d => d.stageNumber === 4 || d.dialogueId === 'lv3_g4_decision_4');
        const d5 = this.decisionHistory.find(d => d.stageNumber === 5 || d.dialogueId === 'lv3_g5_decision_5');
        const d6 = this.decisionHistory.find(d => d.stageNumber === 6 || d.dialogueId === 'lv3_g6_decision_6');

        let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;
        let c1Desc = '', c2Desc = '', c3Desc = '', c4Desc = '', c5Desc = '';

        if (d1) {
          if (d1.choiceKey === 'A') { c1 = 20; c1Desc = 'Xuất sắc: Chặn tin nhắn và báo cáo spam ngay lập tức.'; }
          else if (d1.choiceKey === 'E') { c1 = 18; c1Desc = 'Rất tốt: Tham khảo ý kiến bạn bè trước khi nhận lời làm CTV.'; }
          else if (d1.choiceKey === 'B') { c1 = 10; c1Desc = 'Cảnh giác hỏi MST/HĐLĐ nhưng bị đối tượng dùng GPKD giả đối phó.'; }
          else if (d1.choiceKey === 'D') { c1 = 5; c1Desc = 'Mắc bẫy tò mò: Chấp nhận nạp 500k thử nghiệm vận may.'; }
          else { c1 = 0; c1Desc = 'Mắc bẫy hoàn toàn: Tin vào mức lương 200k-500k/ngày việc nhẹ tại nhà.'; }
        } else if (endingId === 'end_lv3_1_block_early') {
          c1 = 20; c1Desc = '🛡️ Nhận diện thủ đoạn việc nhẹ lương cao ngay từ đầu.';
        }

        if (endingId === 'end_lv3_1_block_early') {
          c2 = 20; c2Desc = '🛡️ Đã hóa giải sớm từ Giai đoạn 1.';
        } else if (d3 && (d3.choiceKey === 'C' || d3.choiceKey === 'F')) {
          c2 = 20; c2Desc = 'Xuất sắc: Từ chối đơn VIP 80 triệu, tra cứu mã vạch và gọi hotline ngân hàng xác minh.';
        } else if (d3 && d3.choiceKey === 'B') {
          c2 = 18; c2Desc = 'Rất tốt: Lắng nghe cảnh báo của bạn thân, dừng lại trước bẫy 80 triệu.';
        } else if (d2 && d2.choiceKey === 'F') {
          c2 = 20; c2Desc = 'Xuất sắc: Dừng lại ngay sau 2 đơn nhỏ, không tham gia thêm đơn nào.';
        } else if (d3 && d3.choiceKey === 'E') {
          c2 = 8; c2Desc = 'Mắc bẫy an toàn giả: Chuyển thử 5 triệu vẫn bị chiếm đoạt.';
        } else {
          c2 = 0; c2Desc = 'Mắc bẫy lòng tham: Tin vào thẻ VIP 92 triệu và hoa hồng 15%.';
        }

        if (endingId === 'end_lv3_1_block_early' || endingId === 'end_lv3_2_stop_after_small') {
          c3 = 20; c3Desc = '🛡️ Đã an toàn dừng lại trước khi đối mặt áp lực VIP.';
        } else if (d4 && (d4.choiceKey === 'E' || d4.choiceKey === 'F')) {
          c3 = 20; c3Desc = 'Xuất sắc: Dừng dứt khoát / gọi ngân hàng hỏi thẻ VIP, hiểu rõ dòng tiền Ponzi.';
        } else if (d4 && d4.choiceKey === 'B') {
          c3 = 12; c3Desc = 'Tốt: Nhờ bạn làm kế toán tra MST (công ty thật bị mượn danh).';
        } else if (d4 && d4.choiceKey === 'C') {
          c3 = 10; c3Desc = 'Mắc bẫy an toàn giả chuyển thử 5 triệu.';
        } else {
          c3 = 0; c3Desc = 'Thiếu tư duy phản biện tài chính: Bị áp lực FOMO và đếm ngược thời gian thúc ép.';
        }

        if (['end_lv3_1_block_early', 'end_lv3_2_stop_after_small', 'end_lv3_3_escape_before_vip', 'end_lv3_4_trial_5m_lost'].includes(endingId)) {
          c4 = 20; c4Desc = '🛡️ Đã dừng lại an toàn trước bẫy lỗi hệ thống 50 triệu.';
        } else if (d5 && (d5.choiceKey === 'D' || d5.choiceKey === 'F' || d5.choiceKey === 'C')) {
          c4 = 20; c4Desc = 'Bản lĩnh: Chặn đứng bẫy chi phí chìm (Sunk Cost), kiên quyết không nộp 50 triệu gỡ vốn.';
        } else if (d5 && d5.choiceKey === 'G') {
          c4 = 8; c4Desc = 'Nuôi hy vọng hão huyền vào kẻ lừa đảo Tuyết Nhi.';
        } else if (d5 && d5.choiceKey === 'E') {
          c4 = 5; c4Desc = 'Mắc bẫy hotline đồng phạm do Kỹ thuật viên cung cấp.';
        } else {
          c4 = 0; c4Desc = 'Sập bẫy chi phí chìm hoàn toàn: Nộp thêm 50 triệu vào bẫy lỗi hệ thống.';
        }

        if (['end_lv3_1_block_early', 'end_lv3_2_stop_after_small', 'end_lv3_3_escape_before_vip'].includes(endingId)) {
          c5 = 20; c5Desc = '🛡️ Bảo toàn nguyên vẹn tài sản, không phát sinh khủng hoảng thiệt hại.';
        } else if (d6 && d6.choiceKey === 'A') {
          c5 = 20; c5Desc = 'Xuất sắc: Khóa thẻ, yêu cầu ngân hàng tra soát khẩn cấp và đến cơ quan công an trong thời gian vàng.';
        } else if (d6 && d6.choiceKey === 'B') {
          c5 = 5; c5Desc = 'Xử lý thụ động: Giấu giếm vì sợ xấu hổ khiến mất thời gian vàng phong tỏa tài khoản.';
        } else if (d6 && d6.choiceKey === 'C') {
          c5 = 0; c5Desc = 'Mắc bẫy lừa đảo thứ cấp: Tìm dịch vụ thu hồi tiền treo trên mạng xã hội.';
        } else {
          c5 = (endingId === 'end_lv3_5_lost_80m_pro_recovery' ? 20 : 0);
          c5Desc = (endingId === 'end_lv3_5_lost_80m_pro_recovery' ? 'Thu thập đầy đủ vi bằng và trình báo công an kịp thời.' : 'Chưa có biện pháp khắc phục sự cố hiệu quả.');
        }

        const charObj = this.character || this.loadCharacter() || this.characters.female;
        const isPlayerFem = (charObj.gender === 'Nữ' || charObj.id === 'female');
        const playerName = charObj.name || (isPlayerFem ? 'Nguyễn Ngọc Ánh' : 'Phan Thanh Tuấn');

        l4Container.style.display = 'block';
        l4Container.innerHTML = `
          <div class="level4-summary-panel">
            <div class="level4-score-header">
              <span class="level4-score-title">🎯 ĐIỂM AN TOÀN & BẢN LĨNH PHÒNG THỦ</span>
              <span class="level4-score-badge ${rankBadgeClass}">${rankBadgeText}</span>
            </div>
            
            <div class="level4-score-number-row" style="display:flex; justify-content:space-around; align-items:center; background:rgba(15,23,42,0.8); border:1px solid #334155; border-radius:10px; padding:12px; margin:10px 0;">
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">ĐIỂM AN TOÀN</div>
                <div style="font-size:1.6rem; font-weight:900; color:#34d399;">${safetyScore}<span style="font-size:0.85rem; color:#64748b;">/100</span></div>
              </div>
              <div style="width:1px; height:36px; background:#334155;"></div>
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">ĐIỂM RỦI RO</div>
                <div style="font-size:1.6rem; font-weight:900; color:${riskScore > 0 ? '#f87171' : '#38bdf8'};">${riskScore}<span style="font-size:0.85rem; color:#64748b;">/100</span></div>
              </div>
              <div style="width:1px; height:36px; background:#334155;"></div>
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">THIỆT HẠI THỰC TẾ</div>
                <div style="font-size:1.1rem; font-weight:900; color:${endingLoss > 0 ? '#ef4444' : '#10b981'};">${endingLoss > 0 ? '-' + this.formatVND(endingLoss) + 'đ' : '0 VNĐ'}</div>
              </div>
            </div>

            <div style="font-size:0.8rem; color:#cbd5e1; line-height:1.45; background:rgba(30,58,138,0.25); border-left:3px solid #38bdf8; padding:8px 12px; border-radius:4px; margin-bottom:12px;">
              💡 <strong>Đánh giá tổng quát:</strong> ${rankEvalDesc}
            </div>

            <!-- BẢNG LỊCH SỬ GIAO DỊCH DÒNG TIỀN -->
            <div style="margin: 12px 0;">
              <div style="font-size:0.82rem; font-weight:800; color:#FAD550; margin-bottom:6px;">📊 BẢNG LỊCH SỬ DÒNG TIỀN & GIAO DỊCH (${playerName})</div>
              <table class="trans-history-table">
                <thead>
                  <tr>
                    <th>Giai đoạn / Khoản mục</th>
                    <th>Tiền chuyển</th>
                    <th>Tiền nhận</th>
                    <th>Chênh lệch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Đơn 1 (Nhiệm vụ 500k)</td>
                    <td class="neg">${transTransferred >= 500000 ? '-500.000đ' : '0đ'}</td>
                    <td class="pos">${transReceived >= 550000 ? '+550.000đ' : '0đ'}</td>
                    <td class="pos">${transCommission >= 50000 ? '+50.000đ (Mồi)' : '0đ'}</td>
                  </tr>
                  <tr>
                    <td>Đơn 2 (Nhiệm vụ 2M)</td>
                    <td class="neg">${transTransferred >= 2500000 ? '-2.000.000đ' : '0đ'}</td>
                    <td class="pos">${transReceived >= 2750000 ? '+2.200.000đ' : '0đ'}</td>
                    <td class="pos">${transCommission >= 250000 ? '+200.000đ (Mồi)' : '0đ'}</td>
                  </tr>
                  <tr>
                    <td>Đơn 3 (Đơn VIP 80M / Thử 5M)</td>
                    <td class="neg">${endingLoss === 5000000 ? '-5.000.000đ (Thử)' : (transTransferred >= 82500000 ? '-80.000.000đ' : '0đ (Từ chối)')}</td>
                    <td class="pos">0đ</td>
                    <td class="neg">${endingLoss === 5000000 ? '-5.000.000đ' : (transTransferred >= 82500000 ? '-80.000.000đ' : '0đ')}</td>
                  </tr>
                  <tr>
                    <td>Phí thông quan / Lỗi hệ thống</td>
                    <td class="neg">${transTransferred >= 132500000 ? '-50.000.000đ' : '0đ (Chặn đứng)'}</td>
                    <td class="pos">0đ</td>
                    <td class="neg">${transTransferred >= 132500000 ? '-50.000.000đ' : '0đ'}</td>
                  </tr>
                  <tr style="background: rgba(30,41,59,0.9); font-weight:800;">
                    <td>TỔNG KẾT THỰC TẾ</td>
                    <td class="neg">-${this.formatVND(transTransferred)}đ</td>
                    <td class="pos">+${this.formatVND(transReceived)}đ</td>
                    <td class="${endingLoss > 0 ? 'neg' : 'pos'}">${endingLoss > 0 ? '-' + this.formatVND(endingLoss) + 'đ' : '0đ (Bảo toàn)'}</td>
                  </tr>
                  ${transVirtual > 0 ? `
                  <tr>
                    <td colspan="3" style="color:#f59e0b; font-style:italic;">⚠️ Số dư ảo hiển thị trên web giả mạo (Không rút được):</td>
                    <td class="virtual">${this.formatVND(transVirtual)} VNĐ</td>
                  </tr>` : ''}
                </tbody>
              </table>
            </div>

            <!-- ĐÁNH GIÁ 5 KỸ NĂNG CỐT LÕI -->
            <div style="font-size:0.82rem; font-weight:800; color:#38bdf8; margin: 10px 0 6px 0;">🛡️ ĐÁNH GIÁ 5 KỸ NĂNG AN TOÀN TRỰC TUYẾN</div>
            <div class="level4-criteria-list">
              <div class="criteria-item ${c1 >= 18 ? 'passed' : (c1 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">1. Nhận diện bẫy "việc nhẹ lương cao"</span>
                  <span class="criteria-pts">${c1} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c1Desc}</div>
              </div>
              <div class="criteria-item ${c2 >= 18 ? 'passed' : (c2 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">2. Kiểm chứng độc lập & Phản xạ tài chính</span>
                  <span class="criteria-pts">${c2} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c2Desc}</div>
              </div>
              <div class="criteria-item ${c3 >= 18 ? 'passed' : (c3 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">3. Tư duy tài chính & Quản trị rủi ro</span>
                  <span class="criteria-pts">${c3} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c3Desc}</div>
              </div>
              <div class="criteria-item ${c4 >= 18 ? 'passed' : (c4 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">4. Khả năng chống bẫy chi phí chìm (Sunk Cost)</span>
                  <span class="criteria-pts">${c4} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c4Desc}</div>
              </div>
              <div class="criteria-item ${c5 >= 18 ? 'passed' : (c5 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">5. Xử lý tình huống sau sự cố</span>
                  <span class="criteria-pts">${c5} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c5Desc}</div>
              </div>
            </div>

            <!-- 5 GIAI ĐOẠN CHUYỂN BIẾN TÂM LÝ NẠN NHÂN -->
            <div class="three-layers-box" style="margin-top:14px;">
              <div class="three-layers-title">🧠 5 GIAI ĐOẠN CHUYỂN BIẾN TÂM LÝ TRONG BẪY CTV</div>
              
              <div class="layer-card">
                <div class="layer-name">1. Mồi nhử ban đầu (Curiosity & Small Wins)</div>
                <div class="layer-analysis">Kẻ gian trả hoa hồng thật 50k, 200k rất sòng phẳng. Mục tiêu không phải lừa tiền nhỏ mà là đập tan sự nghi ngờ, kích hoạt lòng tham.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">2. Hiệu ứng đám đông & Thúc ép (Social Proof & Urgency)</div>
                <div class="layer-analysis">Khoe hình ảnh CTV khác nhận tiền trăm triệu, đặt đồng hồ đếm ngược 15 phút và cảnh báo "hủy tư cách VIP" để tước đoạt thời gian suy nghĩ của nạn nhân.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">3. Đòn nâng quy mô bất ngờ (The Escalation)</div>
                <div class="layer-analysis">Bất ngờ đưa ra đơn hàng trị giá lớn (80 triệu) với hoa hồng hấp dẫn (12 triệu). Nạn nhân lúc này đã tin tưởng nên rất dễ rút cạn tiền tiết kiệm.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">4. Bẫy chi phí chìm (Sunk Cost Fallacy)</div>
                <div class="layer-analysis">Khi tiền đã vào tay kẻ gian, chúng dựng lỗi "sai cú pháp", "thiếu bảo hiểm" để ép nộp thêm 50 triệu. Tâm lý tiếc số tiền 80 triệu khiến nạn nhân vay mượn nộp thêm.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">5. Bẫy lừa đảo thứ cấp (Recovery Scam)</div>
                <div class="layer-analysis">Sau khi bị chặn, nạn nhân hoảng loạn tìm dịch vụ "lấy lại tiền lừa đảo" trên mạng và tiếp tục bị kẻ xấu giả danh luật sư/hacker lừa thêm một lần nữa.</div>
              </div>
            </div>
          </div>
        `;
      } else if (this.currentChapterIndex === 3) {
        // LEVEL 4: CÚ LỪA CHỒNG KỊCH BẢN (5 KẾT THÚC, 4 CHỈ SỐ ĐÁNH GIÁ, 6 TIÊU CHÍ, 3 LỚP XÁC THỰC)
        let endingId = endingDialogue?.id;
        if (!endingId) {
          if (status === 'lost') endingId = 'end_scammed_full_80m';
          else if (status === 'warning') endingId = 'end_near_miss_1m';
          else endingId = 'end_late_escape';
        }

        let safetyScore = 100;
        let riskScore = 0;
        let endingLoss = 0;
        let rankBadgeText = '🌟 CẢNH GIÁC CAO (EARLY DETECTION)';
        let rankBadgeClass = 'score-badge-expert';
        let rankEvalDesc = 'Nhận diện tài khoản giả mạo ngay từ đầu qua kênh liên lạc độc lập đã biết từ trước.';

        if (endingId === 'end_early_detection') {
          safetyScore = 100;
          riskScore = 0;
          endingLoss = 0;
          rankBadgeText = '🌟 CẢNH GIÁC CAO (EARLY DETECTION)';
          rankBadgeClass = 'score-badge-expert';
          rankEvalDesc = 'Cảnh giác cao độ: Nhận diện bất thường ngay ở giai đoạn đầu, không rơi vào bẫy thao túng.';
        } else if (endingId === 'end_late_escape' || endingId === 'end_safe_level4') {
          safetyScore = 80;
          riskScore = 20;
          endingLoss = 0;
          rankBadgeText = '🛡️ NHẬN DIỆN TỐT (LATE ESCAPE)';
          rankBadgeClass = 'score-badge-good';
          rankEvalDesc = 'Nhận diện tốt: Dù bị cuốn theo kịch bản đến gần cuối nhưng đã dừng lại đúng lúc trước khi tiền rời khỏi tài khoản.';
        } else if (endingId === 'end_near_miss_1m' || endingId === 'end_partial_scam_level4') {
          safetyScore = 60;
          riskScore = 40;
          endingLoss = 1000000;
          rankBadgeText = '⚠️ THIẾU CẨN TRỌNG (NEAR MISS)';
          rankBadgeClass = 'score-badge-warn';
          rankEvalDesc = 'Thiếu cẩn trọng: Mắc bẫy tâm lý chuyển thử 1.000.000đ nhưng kịp thời tỉnh ngộ giữ lại 79.000.000đ.';
        } else if (endingId === 'end_scammed_full_80m' || endingId === 'end_scammed_level4') {
          safetyScore = 0;
          riskScore = 100;
          endingLoss = 80000000;
          rankBadgeText = '💀 DỄ BỊ THAO TÚNG (SCAMMED)';
          rankBadgeClass = 'score-badge-danger';
          rankEvalDesc = 'Dễ bị thao túng: Sập bẫy hoàn toàn các tầng kịch bản, chuyển toàn bộ 80 triệu vào cổng thanh toán rửa tiền.';
        } else if (endingId === 'end_master_investigation') {
          safetyScore = 100;
          riskScore = 0;
          endingLoss = 0;
          rankBadgeText = '🏆 CHUYÊN GIA NHẬN DIỆN (MASTER)';
          rankBadgeClass = 'score-badge-expert';
          rankEvalDesc = 'Chuyên gia nhận diện: Dùng câu hỏi bảo mật lật tẩy Deepfake, kiên quyết từ chối quét mã và phối hợp bảo toàn tài sản.';
        }

        this.financialLoss = endingLoss;

        // Đồng bộ lên 2 thẻ % trên đỉnh Summary Modal:
        if (goodPctEl) goodPctEl.textContent = `${safetyScore}%`;
        if (badPctEl) badPctEl.textContent = `${riskScore}%`;
        if (goodBar) goodBar.style.width = `${safetyScore}%`;
        if (badBar) badBar.style.width = `${riskScore}%`;
        if (badgeGoodPct) badgeGoodPct.textContent = `${safetyScore}%`;
        if (badgeBadPct) badgeBadPct.textContent = `${riskScore}%`;

        if (goodSubtext) {
          goodSubtext.textContent = safetyScore === 100 
            ? 'Cảnh giác cao độ • Bảo toàn 100%' 
            : (safetyScore >= 80 ? 'Nhận diện tốt • Thoát hiểm kịp' : (safetyScore >= 60 ? 'Suýt mất • Giữ được 79M' : 'Không nhận diện được'));
        }
        if (badSubtext) {
          badSubtext.textContent = riskScore === 0 
            ? '0% rủi ro tài chính' 
            : (riskScore <= 20 ? 'Rủi ro thấp (20%)' : (riskScore <= 40 ? 'Mất 1.000.000đ (40%)' : 'Mất trắng 80.000.000đ'));
        }

        // Cập nhật thẻ Số tiền bị lừa
        if (lossValue) {
          if (endingLoss > 0) {
            lossValue.textContent = `-${this.formatVND(endingLoss)} VNĐ`;
            lossValue.className = 'minimal-loss-value is-loss';
            if (lossCard) lossCard.className = 'minimal-loss-card has-loss';
          } else {
            lossValue.textContent = '0 VNĐ (An toàn)';
            lossValue.className = 'minimal-loss-value is-safe';
            if (lossCard) lossCard.className = 'minimal-loss-card no-loss';
          }
        }

        // Đánh giá 6 Tiêu chí (100 điểm)
        const d1 = this.decisionHistory.find(d => d.stageNumber === 1 || d.dialogueId === 'g1_decision_1');
        const d2 = this.decisionHistory.find(d => d.stageNumber === 2 || d.dialogueId === 'g2_decision_2');
        const d3 = this.decisionHistory.find(d => d.stageNumber === 3 || d.dialogueId === 'g3_decision_3');
        const d4 = this.decisionHistory.find(d => d.stageNumber === 4 || d.dialogueId === 'g4_decision_4');
        const d5 = this.decisionHistory.find(d => d.stageNumber === 5 || d.dialogueId === 'g5_decision_5');
        const d6 = this.decisionHistory.find(d => d.stageNumber === 6 || d.dialogueId === 'g6_decision_6');

        let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0;
        let c1Desc = '', c2Desc = '', c3Desc = '', c4Desc = '', c5Desc = '', c6Desc = '';

        if (d1) {
          if (d1.choiceKey === 'C') { c1 = 15; c1Desc = 'Xuất sắc: Gọi số SIM cũ đã biết từ trước qua kênh độc lập.'; }
          else if (d1.choiceKey === 'D') { c1 = 10; c1Desc = 'Cảnh giác hỏi mẹ: Mẹ chỉ biết chuyện tiền chung chung, chưa đủ chứng minh.'; }
          else if (d1.choiceKey === 'B') { c1 = 8; c1Desc = 'Hỏi chuyện cũ: Kẻ gian trả lời được do thông tin đã bị rò rỉ trên MXH.'; }
          else { c1 = 0; c1Desc = 'Mắc bẫy mồi nhử: Tin tưởng vì kẻ gian biết thông tin sửa nhà của gia đình.'; }
        } else if (endingId === 'end_early_detection') {
          c1 = 15; c1Desc = '🛡️ Nhận diện tài khoản giả mạo ngay từ đầu.';
        }

        if (d2) {
          if (d2.choiceKey === 'C') { c2 = 20; c2Desc = 'Xuất sắc: Dừng cuộc gọi, bấm số SIM cũ xác minh độc lập.'; }
          else if (d2.choiceKey === 'B') { c2 = 15; c2Desc = 'Rất tốt: Hỏi rõ mâu thuẫn ngay trong cuộc gọi với người thật ("Ủa em nhờ chị gọi giả vờ vay hả?").'; }
          else if (d2.choiceKey === 'D') { c2 = 10; c2Desc = 'Tốt: Hoãn lại để bình tĩnh suy xét, nhưng chưa giải quyết triệt để mâu thuẫn.'; }
          else { c2 = 0; c2Desc = 'Mắc bẫy gián tiếp: Biến mình thành công cụ hỏi vay tiền giùm kẻ gian.'; }
        } else if (endingId === 'end_early_detection') {
          c2 = 20; c2Desc = '🛡️ Hóa giải sớm (Không cần bước này)';
        }

        if (d3) {
          if (d3.choiceKey === 'C') { c3 = 20; c3Desc = 'Xuất sắc: Tiền đã vào tài khoản mình, giữ nguyên và gọi SIM cũ xác minh.'; }
          else if (d3.choiceKey === 'E') { c3 = 15; c3Desc = 'Rất tốt: Nhắn Messenger hỏi người thân thật, phát hiện người thân không biết gì về việc chuyển tiếp.'; }
          else if (d3.choiceKey === 'D') { c3 = 5; c3Desc = 'Nguy hiểm: Gửi ảnh số dư vào Zalo, cung cấp thông tin tài chính cho kẻ gian.'; }
          else if (d3.choiceKey === 'B') { c3 = 5; c3Desc = 'Mắc bẫy an toàn giả: Chuyển thử 1 triệu vẫn làm mất tài sản.'; }
          else { c3 = 0; c3Desc = 'Chuyển ngay 80 triệu theo chỉ dẫn của Zalo giả.'; }
        } else if (endingId === 'end_early_detection') {
          c3 = 20; c3Desc = '🛡️ Hóa giải sớm (Không cần bước này)';
        }

        if (d4) {
          if (d4.choiceKey === 'D' || d4.choiceKey === 'E') { c4 = 15; c4Desc = 'Xuất sắc: Thoát khỏi nhóm chat thao túng tâm lý, gọi SIM xác minh độc lập.'; }
          else if (d4.choiceKey === 'B') { c4 = 12; c4Desc = 'Khá tốt: Tự tra cứu MST độc lập (công ty thật nhưng kẻ gian mượn danh trục lợi).'; }
          else if (d4.choiceKey === 'C') { c4 = 5; c4Desc = 'Nguy hiểm: Gọi số hotline do Thanh đưa trong nhóm (đồng phạm nghe máy).'; }
          else { c4 = 0; c4Desc = 'Tin tưởng áp lực đám đông nhóm 3 người và tài liệu công ty mượn danh.'; }
        } else if (endingId === 'end_early_detection' || (endingId === 'end_late_escape' && !d4)) {
          c4 = 15; c4Desc = '🛡️ Đã dừng lại trước giai đoạn này';
        }

        if (d5) {
          if (d5.choiceKey === 'D' || d5.choiceKey === 'C') { c5 = 15; c5Desc = 'Xuất sắc: Kiên quyết không quét mã, gọi SIM cũ hoặc tổng đài ngân hàng độc lập.'; }
          else if (d5.choiceKey === 'E') { c5 = 8; c5Desc = 'Cảnh giác đòi gọi video nhưng vô tình tạo cơ hội cho kẻ gian dùng Deepfake.'; }
          else if (d5.choiceKey === 'B') { c5 = 5; c5Desc = 'Mắc bẫy an toàn giả: Quét mã chuyển thử 1 triệu nạp vào cổng trung gian.'; }
          else { c5 = 0; c5Desc = 'Quét mã nạp toàn bộ 80 triệu vào cổng thanh toán trung gian.'; }
        } else if (['end_early_detection', 'end_late_escape'].includes(endingId) && !d5) {
          c5 = 15; c5Desc = '🛡️ Đã dừng lại trước giai đoạn này';
        }

        if (d6) {
          if (d6.choiceKey === 'B' || d6.choiceKey === 'C' || d6.choiceKey === 'E') { c6 = 15; c6Desc = 'Xuất sắc: Dùng câu hỏi bảo mật riêng tư / gọi SIM / báo cơ quan chức năng.'; }
          else if (d6.choiceKey === 'D') { c6 = 5; c6Desc = 'Mắc bẫy tâm lý thúc ép: Chuyển thử 1 triệu giữ chỗ trong hoảng loạn.'; }
          else { c6 = 0; c6Desc = 'Chuyển toàn bộ 80 triệu vì nhìn thấy mặt trên Video Deepfake giả mạo.'; }
        } else if (['end_early_detection', 'end_late_escape'].includes(endingId) && !d6) {
          c6 = 15; c6Desc = '🛡️ Đã dừng lại trước giai đoạn này';
        }

        const charObj = this.character || this.loadCharacter() || this.characters.female;
        const isPlayerFem = (charObj.gender === 'Nữ' || charObj.id === 'female');
        const relRoleCap = isPlayerFem ? 'Em trai' : 'Chị gái';
        const playerRoleLower = isPlayerFem ? 'chị' : 'em';

        l4Container.style.display = 'block';
        l4Container.innerHTML = `
          <div class="level4-summary-panel">
            <div class="level4-score-header">
              <span class="level4-score-title">🎯 ĐIỂM AN TOÀN & KHẢ NĂNG NHẬN DIỆN</span>
              <span class="level4-score-badge ${rankBadgeClass}">${rankBadgeText}</span>
            </div>
            
            <div class="level4-score-number-row" style="display:flex; justify-content:space-around; align-items:center; background:rgba(15,23,42,0.8); border:1px solid #334155; border-radius:10px; padding:12px; margin:10px 0;">
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">ĐIỂM AN TOÀN</div>
                <div style="font-size:1.6rem; font-weight:900; color:#34d399;">${safetyScore}<span style="font-size:0.85rem; color:#64748b;">/100</span></div>
              </div>
              <div style="width:1px; height:36px; background:#334155;"></div>
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">ĐIỂM RỦI RO</div>
                <div style="font-size:1.6rem; font-weight:900; color:${riskScore > 0 ? '#f87171' : '#38bdf8'};">${riskScore}<span style="font-size:0.85rem; color:#64748b;">/100</span></div>
              </div>
              <div style="width:1px; height:36px; background:#334155;"></div>
              <div style="text-align:center;">
                <div style="font-size:0.72rem; color:#94a3b8; font-weight:700;">THIỆT HẠI</div>
                <div style="font-size:1.1rem; font-weight:900; color:${endingLoss > 0 ? '#ef4444' : '#10b981'};">${endingLoss > 0 ? '-' + this.formatVND(endingLoss) + 'đ' : '0 VNĐ'}</div>
              </div>
            </div>

            <div style="font-size:0.8rem; color:#cbd5e1; line-height:1.45; background:rgba(30,58,138,0.25); border-left:3px solid #38bdf8; padding:8px 12px; border-radius:4px; margin-bottom:12px;">
              💡 <strong>Đánh giá tổng quát:</strong> ${rankEvalDesc}
            </div>

            <div class="level4-criteria-list">
              <div class="criteria-item ${c1 >= 15 ? 'passed' : (c1 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">1. Tài khoản Zalo mới</span>
                  <span class="criteria-pts">${c1} / 15 đ</span>
                </div>
                <div class="criteria-desc">${c1Desc}</div>
              </div>
              <div class="criteria-item ${c2 >= 15 ? 'passed' : (c2 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">2. Cuộc gọi Messenger thật</span>
                  <span class="criteria-pts">${c2} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c2Desc}</div>
              </div>
              <div class="criteria-item ${c3 >= 15 ? 'passed' : (c3 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">3. Nhận được 80 triệu đồng</span>
                  <span class="criteria-pts">${c3} / 20 đ</span>
                </div>
                <div class="criteria-desc">${c3Desc}</div>
              </div>
              <div class="criteria-item ${c4 >= 15 ? 'passed' : (c4 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">4. Nhóm chat ba người</span>
                  <span class="criteria-pts">${c4} / 15 đ</span>
                </div>
                <div class="criteria-desc">${c4Desc}</div>
              </div>
              <div class="criteria-item ${c5 >= 15 ? 'passed' : (c5 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">5. Mã QR & Cổng thanh toán</span>
                  <span class="criteria-pts">${c5} / 15 đ</span>
                </div>
                <div class="criteria-desc">${c5Desc}</div>
              </div>
              <div class="criteria-item ${c6 >= 15 ? 'passed' : (c6 > 0 ? 'warning' : 'failed')}">
                <div class="criteria-item-top">
                  <span class="criteria-name">6. Cuộc gọi cuối & Quyết định sinh tử</span>
                  <span class="criteria-pts">${c6} / 15 đ</span>
                </div>
                <div class="criteria-desc">${c6Desc}</div>
              </div>
            </div>

            <!-- BẢNG ĐÁNH GIÁ 3 LỚP XÁC THỰC -->
            <div class="three-layers-box" style="margin-top:14px;">
              <div class="three-layers-title">🛡️ ĐÁNH GIÁ 3 LỚP XÁC THỰC CỐT LÕI</div>
              
              <div class="layer-card">
                <div class="layer-name">1. Đúng người? <span>${safetyScore >= 80 ? '✅ Vượt qua' : '⚠️ Nhầm lẫn'}</span></div>
                <div class="layer-analysis">Nhìn thấy mặt trên Video Call thật/giả chỉ xác nhận hình ảnh, <strong>KHÔNG</strong> chứng minh người đó đang yêu cầu bạn chuyển tiền cho người khác.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">2. Đúng sự việc? <span>${safetyScore >= 80 ? '✅ Vượt qua' : '⚠️ Bị giật dây'}</span></div>
                <div class="layer-analysis">${relRoleCap} có nhờ chuyển tiền cho bạn Thanh không? <strong>KHÔNG!</strong> ${relRoleCap} chuyển tiền vì tưởng ${playerRoleLower} cần gấp, hoàn toàn không biết sự tồn tại của bạn Thanh hay mã thanh toán.</div>
              </div>

              <div class="layer-card">
                <div class="layer-name">3. Đúng giao dịch? <span>${endingLoss === 0 ? '✅ Vượt qua' : '❌ Thất bại'}</span></div>
                <div class="layer-analysis">Cổng thanh toán điện tử có phải là tài khoản của bạn Thanh không? <strong>KHÔNG!</strong> Tiền nạp vào cổng trung gian sẽ lập tức bị rửa sạch và không thể thu hồi.</div>
              </div>
            </div>
          </div>
        `;
      } else {
        l4Container.style.display = 'none';
        l4Container.innerHTML = '';
      }
    }

    if (window.soundEngine) {
      if (isWin) window.soundEngine.playVictory();
      else if (isWarning) (window.soundEngine.playWarning ? window.soundEngine.playWarning() : window.soundEngine.playClick());
      else window.soundEngine.playGameOver();
    }
    const detailsToggle = document.getElementById('summaryDetailsToggle');
    if (detailsToggle) detailsToggle.open = false;

    this.dom.summaryModal.classList.add('active');
  }

  startLevel4Countdown() {
    this.stopLevel4Countdown();
    let secondsLeft = 120; // 2 minutes countdown
    const updateDisplay = () => {
      const clockEl = document.getElementById('l4Clock');
      if (clockEl) {
        const mins = Math.floor(secondsLeft / 60);
        const secs = secondsLeft % 60;
        clockEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    };
    updateDisplay();
    this.l4Timer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(this.l4Timer);
        const clockEl = document.getElementById('l4Clock');
        if (clockEl) clockEl.textContent = '00:00 (HẾT HẠN)';
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  stopLevel4Countdown() {
    if (this.l4Timer) {
      clearInterval(this.l4Timer);
      this.l4Timer = null;
    }
  }

  closeSummaryModal() {
    this.stopLevel4Countdown();
    this.updateCallMode(null);
    if (this.dom.summaryModal) this.dom.summaryModal.classList.remove('active');
  }

  showBankruptModal(customReason) {
    if (!this.dom.bankruptModal) return;
    const desc = document.getElementById('bankruptDescText');
    if (desc && customReason) {
      desc.textContent = customReason;
    }
    const balDisplay = document.getElementById('bankruptBalanceDisplay');
    if (balDisplay) {
      if (this.bankBalance < 0) {
        balDisplay.textContent = `Số dư: ${this.formatVND(this.bankBalance)} VNĐ (Âm ${this.formatVND(Math.abs(this.bankBalance))} VNĐ)`;
        balDisplay.style.color = '#dc2626';
      } else {
        balDisplay.textContent = `Số dư: ${this.formatVND(this.bankBalance)} VNĐ`;
        balDisplay.style.color = '#dc2626';
      }
    }
    const title = document.querySelector('#bankruptModal .bankrupt-title');
    if (title) {
      if (this.bankBalance < 0) {
        title.textContent = `ÂM TIỀN! BỊ LỪA VƯỢT HẠN MỨC!`;
      } else {
        title.textContent = `CHÁY TÚI! MẤT TRẮNG TIỀN!`;
      }
    }
    if (desc && !customReason) {
      if (this.bankBalance < 0) {
        desc.innerHTML = `Do mắc bẫy chuyển tiền vượt quá số tiền hiện có, tài khoản của bạn đã bị <strong>âm ${this.formatVND(Math.abs(this.bankBalance))} VNĐ</strong> (nợ tiền)!`;
      } else {
        desc.innerHTML = `Do mắc bẫy tâm lý và chuyển tiền cho kẻ gian, toàn bộ số dư trong tài khoản của bạn đã bị mất sạch!`;
      }
    }
    if (window.soundEngine) window.soundEngine.playGameOver();
    this.dom.bankruptModal.classList.add('active');
  }

  showOverallSummary() {
    if (!this.dom.overallModal) return;
    const finalScore = document.getElementById('overallFinalScore');
    if (finalScore) {
      finalScore.textContent = `${this.formatVND(this.bankBalance)} đ`;
      if (this.bankBalance < 0) {
        finalScore.classList.add('negative-money');
      } else {
        finalScore.classList.remove('negative-money');
      }
    }

    const rankTitle = document.getElementById('overallRankTitle');
    const rankDesc = document.getElementById('overallRankDesc');
    if (rankTitle && rankDesc) {
      if (this.bankBalance >= 80000000) {
        rankTitle.textContent = "🏆 BẬC THẦY AN TOÀN MẠNG (CYBER DEFENDER S-RANK)";
        rankDesc.textContent = "Xuất sắc! Bạn đã bảo vệ trọn vẹn số dư 80.000.000 VNĐ và nhận diện chính xác 100% các thủ đoạn lừa đảo tinh vi!";
      } else if (this.bankBalance > 0) {
        rankTitle.textContent = "🛡️ CHIẾN BINH PHÒNG VỆ SỐ (A-RANK)";
        rankDesc.textContent = `Bạn đã bảo toàn được ${this.formatVND(this.bankBalance)} VNĐ sau các cuộc chạm trán lừa đảo. Hãy tiếp tục duy trì nguyên tắc cảnh giác cao độ!`;
      } else {
        rankTitle.textContent = "💀 SẬP BẪY TÀI CHÍNH (CẦN TẬP HUẤN LẠI)";
        rankDesc.textContent = `Bạn đã bị lừa và để mất tài sản (số dư ${this.formatVND(this.bankBalance)} VNĐ). Hãy chơi lại để ghi nhớ 5 dấu hiệu cảnh giác cốt lõi!`;
      }
    }

    if (window.soundEngine) {
      if (this.bankBalance >= 80000000) window.soundEngine.playVictory();
      else if (this.bankBalance > 0) (window.soundEngine.playVictory ? window.soundEngine.playVictory() : window.soundEngine.playClick());
      else window.soundEngine.playGameOver();
    }
    this.dom.overallModal.classList.add('active');
  }

  // Reward Modal & Ads
  openRewardModal(tab = 'ad') {
    if (this.dom.rewardModal) this.dom.rewardModal.classList.add('active');
    this.updateAdUI();
    if (this.dom.rewardBalanceVal) {
      this.dom.rewardBalanceVal.textContent = this.formatVND(this.bankBalance) + ' đ';
    }
    if (window.soundEngine) window.soundEngine.playClick();
  }

  closeRewardModal() {
    if (this.dom.rewardModal) this.dom.rewardModal.classList.remove('active');
    if (window.loadingCtrl && !window.loadingCtrl.gameStarted) {
      window.loadingCtrl.openLevelSelect();
    }
  }

  startWatchAd() {
    // Kiểm tra và reset lượt xem nếu sang ngày mới
    const today = new Date().toDateString();
    if (localStorage.getItem('g7_ad_date') !== today) {
      this.adCountToday = 0;
      this.saveAdCount();
    }

    if (this.adCountToday >= 3) {
      alert("⚠️ Hôm nay bạn đã xem tối đa 3/3 video quảng cáo (+3.000.000 VNĐ)!\nGiới hạn 3 quảng cáo / ngày. Hãy quay lại vào ngày mai nhé.");
      return;
    }

    this.closeRewardModal();
    if (!this.dom.adOverlay) return;
    this.dom.adOverlay.classList.add('active');

    // Mẹo an toàn số ngẫu nhiên cho mỗi video quảng cáo
    const safetyTips = [
      "NGUYÊN TẮC VÀNG: Không bao giờ cung cấp mã OTP ngân hàng cho bất kỳ ai, kể cả nhân viên tự xưng là tổng đài hay công an!",
      "CẢNH BÁO: Sàn TMĐT không bao giờ yêu cầu khách hàng nộp thuế trước bạ qua Zalo để nhận thưởng xe SH!",
      "QUY TẮC BẢO MẬT: Luôn gọi điện trực tiếp qua SIM di động truyền thống để xác nhận khi bạn bè, người thân nhắn tin hỏi mượn tiền gấp!",
      "PHÒNG CHỐNG HACK: Không quét mã QR lạ và không tải file cài đặt .APK từ các trang web bên ngoài ứng dụng chính thức Google Play / App Store!"
    ];
    const tipEl = document.getElementById('adVideoTipText');
    if (tipEl) {
      tipEl.textContent = safetyTips[this.adCountToday % safetyTips.length];
    }

    // Điều khiển phát video clip quảng cáo
    const videoEl = document.getElementById('adVideoPlayer');
    if (videoEl) {
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    let timeLeft = 5;
    if (this.dom.adTimer) this.dom.adTimer.textContent = `${timeLeft}s`;

    const timer = setInterval(() => {
      timeLeft--;
      if (this.dom.adTimer) this.dom.adTimer.textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (videoEl) videoEl.pause();
        this.dom.adOverlay.classList.remove('active');
        this.adCountToday++;
        this.saveAdCount();
        this.updateAdUI();
        this.updateWalletUI(1000000, true);
        if (window.soundEngine) window.soundEngine.playVictory();
        alert(`🎉 Chúc mừng! Bạn đã nhận thành công +1.000.000 VNĐ vào tài khoản G7 Bank!\n(Tiến độ hôm nay: ${this.adCountToday}/3 video)`);
      }
    }, 1000);
  }

  updateAdUI() {
    if (this.dom.adWatchCountText) {
      this.dom.adWatchCountText.textContent = `${this.adCountToday} / 3`;
    }
    for (let i = 1; i <= 3; i++) {
      const dot = document.getElementById(`adStepDot${i}`);
      if (dot) {
        if (i <= this.adCountToday) dot.classList.add('watched');
        else dot.classList.remove('watched');
      }
    }
    if (this.dom.btnWatchAd) {
      this.dom.btnWatchAd.disabled = this.adCountToday >= 3;
      if (this.adCountToday >= 3) {
        this.dom.btnWatchAd.textContent = 'ĐÃ HẾT LƯỢT XEM HÔM NAY (3/3)';
        this.dom.btnWatchAd.style.opacity = '0.6';
      } else {
        this.dom.btnWatchAd.textContent = `▶ XEM VIDEO NHẬN 1 TRIỆU VNĐ (+1.000.000đ) [Còn ${3 - this.adCountToday}/3]`;
        this.dom.btnWatchAd.style.opacity = '1';
      }
    }

    const btnOutsideAdd = document.getElementById('btnOutsideAddMoney');
    if (btnOutsideAdd) {
      if (this.adCountToday >= 3) {
        btnOutsideAdd.textContent = '➕ Xem Video (Đã hết 3/3 lượt hôm nay)';
        btnOutsideAdd.style.opacity = '0.7';
      } else {
        btnOutsideAdd.textContent = `➕ Xem Video Nhận 1 Triệu (+1.000.000đ) [Còn ${3 - this.adCountToday}/3]`;
        btnOutsideAdd.style.opacity = '1';
      }
    }

    const btnChatPlus = document.getElementById('btnChatHeaderAddMoney');
    if (btnChatPlus) {
      btnChatPlus.title = this.adCountToday >= 3
        ? 'Hôm nay đã xem tối đa 3/3 video (+3.000.000đ)'
        : `Bấm dấu cộng [+] để xem video nhận 1 triệu VNĐ (Còn ${3 - this.adCountToday}/3 lượt)`;
    }

    const btnLevelPlus = document.getElementById('btnLevelScreenAddMoney');
    if (btnLevelPlus) {
      btnLevelPlus.title = this.adCountToday >= 3
        ? 'Hôm nay đã xem tối đa 3/3 video (+3.000.000đ)'
        : `Bấm dấu cộng [+] để xem video nhận 1 triệu VNĐ (Còn ${3 - this.adCountToday}/3 lượt)`;
    }
  }

  saveAdCount() {
    try {
      localStorage.setItem('g7_ad_count', this.adCountToday);
      localStorage.setItem('g7_ad_date', new Date().toDateString());
    } catch (e) {}
  }

  loadAdCount() {
    try {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem('g7_ad_date');
      if (savedDate !== today) {
        localStorage.setItem('g7_ad_date', today);
        localStorage.setItem('g7_ad_count', '0');
        return 0;
      }
      const c = localStorage.getItem('g7_ad_count');
      return c !== null ? parseInt(c, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  renderCheckinGrid() {
    if (!this.dom.checkinGrid) return;
    const today = new Date().toDateString();
    const hasClaimedToday = (this.lastCheckinDate === today);
    const rewards = ["500K", "500K", "1Tr", "1Tr", "2Tr", "3Tr", "5Tr"];

    this.dom.checkinGrid.innerHTML = rewards.map((rew, i) => {
      const dayNum = i + 1;
      const isClaimed = dayNum <= this.checkinDay;
      const isToday = !hasClaimedToday && (dayNum === this.checkinDay + 1);
      return `
        <div class="checkin-day-card ${isClaimed ? 'claimed' : ''} ${isToday ? 'today' : ''}">
          <div style="font-size:0.75rem; font-weight:700;">Ngày ${dayNum}</div>
          <div style="font-size:0.95rem; font-weight:900; color:${isClaimed ? '#10b981' : '#fad550'}">${rew}</div>
          <div style="font-size:1.1rem;">${isClaimed ? '✅' : (isToday ? '🎁' : '🔒')}</div>
        </div>
      `;
    }).join('');

    if (this.dom.btnClaimDaily) {
      if (hasClaimedToday) {
        this.dom.btnClaimDaily.disabled = true;
        this.dom.btnClaimDaily.textContent = '✓ ĐÃ ĐIỂM DANH HÔM NAY (Quay lại ngày mai)';
        this.dom.btnClaimDaily.style.opacity = '0.65';
        this.dom.btnClaimDaily.style.cursor = 'not-allowed';
      } else {
        const nextDay = (this.checkinDay >= 7 ? 0 : this.checkinDay) + 1;
        const rewardAmounts = [500000, 500000, 1000000, 1000000, 2000000, 3000000, 5000000];
        const nextReward = rewardAmounts[nextDay - 1] || 500000;
        this.dom.btnClaimDaily.disabled = false;
        this.dom.btnClaimDaily.textContent = `🎁 ĐIỂM DANH NGÀY ${nextDay} (+${this.formatVND(nextReward)}đ)`;
        this.dom.btnClaimDaily.style.opacity = '1';
        this.dom.btnClaimDaily.style.cursor = 'pointer';
      }
    }
  }

  claimDailyCheckin() {
    const today = new Date().toDateString();
    if (this.lastCheckinDate === today) {
      alert("⚠️ Hôm nay bạn đã điểm danh rồi!\nHãy quay lại vào ngày mai để tiếp tục nhận thưởng nhé.");
      return;
    }

    if (this.checkinDay >= 7) {
      this.checkinDay = 0;
    }

    const rewardAmounts = [500000, 500000, 1000000, 1000000, 2000000, 3000000, 5000000];
    const reward = rewardAmounts[this.checkinDay] || 500000;

    this.checkinDay++;
    this.lastCheckinDate = today;
    this.saveCheckinDay();
    this.renderCheckinGrid();
    this.updateWalletUI(reward, true);

    if (window.soundEngine) window.soundEngine.playScoreUp();
    alert(`📅 Điểm danh thành công Ngày ${this.checkinDay}!\nBạn đã nhận được +${this.formatVND(reward)} VNĐ vào tài khoản G7 Bank!`);
  }

  saveCheckinDay() {
    try {
      localStorage.setItem('g7_checkin_day', this.checkinDay);
      localStorage.setItem('g7_checkin_date', this.lastCheckinDate || '');
    } catch (e) {}
  }

  loadCheckinDay() {
    try {
      const d = localStorage.getItem('g7_checkin_day');
      return d !== null ? parseInt(d, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  loadLastCheckinDate() {
    try {
      return localStorage.getItem('g7_checkin_date') || '';
    } catch (e) {
      return '';
    }
  }
}

window.GameEngine = GameEngine;
