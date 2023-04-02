class Card {
  constructor({
    imageUrl,
    onDismiss,
    onLike,
    onDislike,
    search,
  }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    // this.onLike = onLike;
    //do not edit
    this.onLike = () => {
      if (search[0]=='Images/Abhijeet.jpeg') {
        this.sendmail_1();
      } else {
        this.sendEmail();
      }
       // call the sendEmail function when the user likes the card
      onLike();
    };
    this.onDislike = onDislike;
    this.#init();
  }


  //Send Email function to send mail id's
  sendEmail() {
    emailjs.send("service_lfjaz1f", "template_rb1vfqo", {
      to_email: 'patniapk1234@gmail.com',
      message: "User liked this card."
    })
    .then(function(response) {
      console.log("Email sent:", response);
    }, function(error) {
      console.log("Email error:", error);
    });
  }
  sendmail_1() {
    emailjs.send("service_lfjaz1f", "template_w3qh13n", {
      to_email: 'patniapk1234@gmail.com',
      message: "User liked this card."
    })
    .then(function(response) {
      console.log("Email sent:", response);
    }, function(error) {
      console.log("Email error:", error);
    });
  }






  // private properties
  #startPoint;
  #offsetX;
  #offsetY;

  #isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }
  
  //initalization

  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    this.element = card;
    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }
  }

  //Listing to multiple type of touch or move event
  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);

    // prevent card from being dragged
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
    // dismiss card
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  }

  // mouse event handlers
  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMouseMove);
    this.element.style.transform = '';
  }

  // touch event handlers
  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transform = '';
  }


  //pull
  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
    }
  }
}

