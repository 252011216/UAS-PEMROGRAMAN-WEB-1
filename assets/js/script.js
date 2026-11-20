/**
 * Kopi Nusantara Roastery & Community - Main JavaScript
 * Handles: Product filtering, Order Calculation, Form Validation, Forum Interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Tooltips if any
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // =========================================================================
  // 1. PRODUCT FILTER & SEARCH (produk.html)
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-item');
  const searchInput = document.getElementById('searchProduct');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active', 'btn-coffee-primary'));
        filterButtons.forEach(btn => btn.classList.add('btn-outline-secondary'));
        
        this.classList.remove('btn-outline-secondary');
        this.classList.add('active', 'btn-coffee-primary');

        const category = this.getAttribute('data-filter');
        filterProducts(category, searchInput ? searchInput.value.toLowerCase() : '');
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const activeFilterBtn = document.querySelector('.filter-btn.active');
      const activeCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      filterProducts(activeCategory, this.value.toLowerCase());
    });
  }

  function filterProducts(category, query) {
    let visibleCount = 0;
    productCards.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const title = item.querySelector('.card-title') ? item.querySelector('.card-title').textContent.toLowerCase() : '';
      const notes = item.querySelector('.coffee-notes') ? item.querySelector('.coffee-notes').textContent.toLowerCase() : '';

      const matchesCategory = (category === 'all' || itemCategory === category);
      const matchesSearch = title.includes(query) || notes.includes(query);

      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    const emptyMessage = document.getElementById('emptySearchMessage');
    if (emptyMessage) {
      emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // =========================================================================
  // 2. TRANSACTION & ORDER FORM LOGIC (transaksi.html)
  // =========================================================================
  const productPrices = {
    'gayo-wine': 125000,
    'toraja-sapan': 115000,
    'flores-bajawa': 105000,
    'kintamani-honey': 110000,
    'temanggung-robusta': 75000,
    'v60-dripper-set': 185000,
    'manual-hand-grinder': 260000,
    'bundling-barista': 340000
  };

  const shippingRates = {
    'jne': 18000,
    'sicepat': 16000,
    'jnt': 17000,
    'gosend': 25000,
    'ambil-sendiri': 0
  };

  const productSelect = document.getElementById('orderProduct');
  const quantityInput = document.getElementById('orderQuantity');
  const shippingSelect = document.getElementById('orderShipping');
  const promoCodeInput = document.getElementById('promoCode');
  const btnApplyPromo = document.getElementById('btnApplyPromo');
  const promoFeedback = document.getElementById('promoFeedback');

  const summaryItemPrice = document.getElementById('summaryItemPrice');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryShipping = document.getElementById('summaryShipping');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryTotal = document.getElementById('summaryTotal');

  let currentDiscountRate = 0;
  let isFreeShipping = false;

  // Read URL query parameter if product is clicked from index or catalog
  if (productSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedProduct = urlParams.get('produk');
    if (preselectedProduct && productPrices[preselectedProduct]) {
      productSelect.value = preselectedProduct;
    }

    // Attach listeners for recalculation
    productSelect.addEventListener('change', calculateOrderTotal);
    if (quantityInput) quantityInput.addEventListener('input', calculateOrderTotal);
    if (shippingSelect) shippingSelect.addEventListener('change', calculateOrderTotal);

    if (btnApplyPromo) {
      btnApplyPromo.addEventListener('click', function () {
        const code = promoCodeInput.value.trim().toUpperCase();
        if (code === 'DISKON30') {
          currentDiscountRate = 0.30;
          isFreeShipping = false;
          showPromoFeedback('success', 'Selamat! Kode Promo 30% berhasil digunakan.');
        } else if (code === 'KOPIHEBAT' || code === 'DISKON15') {
          currentDiscountRate = 0.15;
          isFreeShipping = false;
          showPromoFeedback('success', 'Selamat! Kode Diskon 15% berhasil digunakan.');
        } else if (code === 'GRATISONGKIR') {
          currentDiscountRate = 0;
          isFreeShipping = true;
          showPromoFeedback('success', 'Selamat! Kupon Bebas Ongkos Kirim aktif.');
        } else if (code === '') {
          showPromoFeedback('warning', 'Silakan masukkan kode voucher terlebih dahulu.');
        } else {
          currentDiscountRate = 0;
          isFreeShipping = false;
          showPromoFeedback('danger', 'Maaf, kode promo tidak valid atau telah kedaluwarsa.');
        }
        calculateOrderTotal();
      });
    }

    calculateOrderTotal();
  }

  function showPromoFeedback(type, message) {
    if (!promoFeedback) return;
    promoFeedback.className = `alert alert-${type} py-2 px-3 small mt-2 mb-0`;
    promoFeedback.textContent = message;
    promoFeedback.classList.remove('d-none');
  }

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function calculateOrderTotal() {
    if (!productSelect) return;

    const selectedProduct = productSelect.value;
    const qty = parseInt(quantityInput.value) || 1;
    const selectedShipping = shippingSelect.value;

    const unitPrice = productPrices[selectedProduct] || 0;
    const subtotal = unitPrice * qty;
    let shippingCost = shippingRates[selectedShipping] || 0;

    if (isFreeShipping) {
      shippingCost = 0;
    }

    const discountAmount = Math.round(subtotal * currentDiscountRate);
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

    if (summaryItemPrice) summaryItemPrice.textContent = formatIDR(unitPrice);
    if (summarySubtotal) summarySubtotal.textContent = formatIDR(subtotal);
    if (summaryShipping) summaryShipping.textContent = formatIDR(shippingCost);
    if (summaryDiscount) summaryDiscount.textContent = `- ${formatIDR(discountAmount)}`;
    if (summaryTotal) summaryTotal.textContent = formatIDR(grandTotal);
  }

  // Handle Order Form Submit
  const orderForm = document.getElementById('formOrderTransaction');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!orderForm.checkValidity()) {
        e.stopPropagation();
        orderForm.classList.add('was-validated');
        return;
      }

      // Populate Invoice Modal
      const invoiceNumber = 'INV/KN/' + new Date().getFullYear() + '/' + Math.floor(100000 + Math.random() * 900000);
      const buyerName = document.getElementById('orderBuyerName').value;
      const buyerPhone = document.getElementById('orderBuyerPhone').value;
      const buyerAddress = document.getElementById('orderBuyerAddress').value;
      const selectedProductName = productSelect.options[productSelect.selectedIndex].text;
      const grindType = document.querySelector('input[name="grindOption"]:checked') ? document.querySelector('input[name="grindOption"]:checked').value : 'Biji Utuh';
      const paymentMethod = document.getElementById('orderPayment').value;
      const totalAmount = summaryTotal.textContent;

      document.getElementById('modalInvoiceNo').textContent = invoiceNumber;
      document.getElementById('modalCustomerName').textContent = buyerName;
      document.getElementById('modalCustomerPhone').textContent = buyerPhone;
      document.getElementById('modalCustomerAddress').textContent = buyerAddress;
      document.getElementById('modalProductInfo').textContent = `${selectedProductName} (${grindType}) x ${quantityInput.value}`;
      document.getElementById('modalPaymentMethod').textContent = paymentMethod.toUpperCase();
      document.getElementById('modalTotalAmount').textContent = totalAmount;

      const invoiceModal = new bootstrap.Modal(document.getElementById('modalOrderSuccess'));
      invoiceModal.show();

      // Reset form validation
      orderForm.reset();
      orderForm.classList.remove('was-validated');
      currentDiscountRate = 0;
      isFreeShipping = false;
      if (promoFeedback) promoFeedback.classList.add('d-none');
      calculateOrderTotal();
    });
  }

  // Handle Membership Registration Form Submit
  const memberForm = document.getElementById('formMemberRegistration');
  if (memberForm) {
    memberForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!memberForm.checkValidity()) {
        e.stopPropagation();
        memberForm.classList.add('was-validated');
        return;
      }

      const memberName = document.getElementById('memberName').value;
      const memberId = 'KN-VIP-' + Math.floor(1000 + Math.random() * 9000);

      document.getElementById('modalMemberSuccessName').textContent = memberName;
      document.getElementById('modalMemberId').textContent = memberId;

      const memberModal = new bootstrap.Modal(document.getElementById('modalMemberSuccess'));
      memberModal.show();

      memberForm.reset();
      memberForm.classList.remove('was-validated');
    });
  }

  // Handle Feedback Form Submit
  const feedbackForm = document.getElementById('formFeedback');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Terima kasih! Ulasan dan masukan Anda sangat berharga untuk meningkatkan kualitas roastery kami.');
      feedbackForm.reset();
    });
  }

  // =========================================================================
  // 3. FORUM / KOMUNITAS INTERACTIVITY (forum.html)
  // =========================================================================
  // Upvote / Like toggle
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const countSpan = this.querySelector('.like-count');
      let currentLikes = parseInt(countSpan.textContent) || 0;

      if (this.classList.contains('liked')) {
        this.classList.remove('liked');
        countSpan.textContent = currentLikes - 1;
      } else {
        this.classList.add('liked');
        countSpan.textContent = currentLikes + 1;
      }
    });
  });

  // New Forum Post Submission
  const newThreadForm = document.getElementById('formNewThread');
  const forumThreadContainer = document.getElementById('forumThreadContainer');

  if (newThreadForm && forumThreadContainer) {
    newThreadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const author = document.getElementById('threadAuthor').value.trim();
      const title = document.getElementById('threadTitle').value.trim();
      const category = document.getElementById('threadCategory').value;
      const content = document.getElementById('threadContent').value.trim();

      if (!author || !title || !content) {
        alert('Mohon isi nama, judul, dan isi diskusi dengan lengkap.');
        return;
      }

      const newCard = document.createElement('div');
      newCard.className = 'forum-card';
      newCard.innerHTML = `
        <div class="d-flex align-items-start gap-3">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" alt="${author}" class="author-avatar">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div>
                <strong class="text-dark">${escapeHtml(author)}</strong>
                <span class="badge bg-secondary-subtle text-secondary-emphasis ms-2">Member Baru</span>
              </div>
              <small class="text-muted"><i class="far fa-clock me-1"></i>Baru saja</small>
            </div>
            <h5 class="font-heading mb-2">
              <a href="javascript:void(0)" class="text-decoration-none text-dark">${escapeHtml(title)}</a>
            </h5>
            <div class="mb-3">
              <span class="tag-badge"><i class="fas fa-tag me-1"></i>${escapeHtml(category)}</span>
            </div>
            <p class="text-secondary mb-3">${escapeHtml(content)}</p>
            <div class="d-flex align-items-center justify-content-between pt-2 border-top">
              <div class="d-flex gap-2">
                <button class="like-btn btn-sm">
                  <i class="far fa-heart me-1"></i> <span class="like-count">1</span> Suka
                </button>
                <button class="btn btn-sm btn-outline-secondary rounded-pill px-3">
                  <i class="far fa-comment me-1"></i> 0 Komentar
                </button>
              </div>
              <small class="text-success"><i class="fas fa-check-circle me-1"></i>Terverifikasi</small>
            </div>
          </div>
        </div>
      `;

      forumThreadContainer.prepend(newCard);

      // Attach like listener to newly created button
      const newLikeBtn = newCard.querySelector('.like-btn');
      newLikeBtn.addEventListener('click', function () {
        const countSpan = this.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.textContent) || 0;
        if (this.classList.contains('liked')) {
          this.classList.remove('liked');
          countSpan.textContent = currentLikes - 1;
        } else {
          this.classList.add('liked');
          countSpan.textContent = currentLikes + 1;
        }
      });

      newThreadForm.reset();
      const modalEl = document.getElementById('modalNewTopic');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      alert('Topik diskusi Anda berhasil dipublikasikan!');
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
