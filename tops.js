


class Card {
    constructor({ imageUrl, textContent, onDismiss }) {
        this.imageUrl = imageUrl;
        this.textContent = textContent;
        this.onDismiss = onDismiss;
        this.#init();
    }

    // Private properties
    #originalTransform = '';
    #dismissed = false;

    // Private methods
    #init() {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = this.imageUrl;
        card.appendChild(img);

        const textDiv = document.createElement('div');
        textDiv.classList.add('text-content');
        textDiv.innerHTML = this.textContent;
        card.appendChild(textDiv);

        this.element = card;
        this.#originalTransform = card.style.transform; // Store original transform style
        this.#listenToMouseEvents();
    }

    #listenToMouseEvents() {
        let startX = 0;
        let offsetX = 0;

        const handleMouseMove = (e) => {
            const { clientX } = e;
            offsetX = clientX - startX;
            const rotate = offsetX * 0.1;
            this.element.style.transform = `translate(${offsetX}px) rotate(${rotate}deg)`;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (Math.abs(offsetX) > this.element.clientWidth * 0.7) {
                this.#dismiss(offsetX > 0 ? 1 : -1);
            } else {
                this.element.style.transition = 'transform 0.5s';
                this.element.style.transform = 'translate(0px) rotate(0deg)';
            }
        };

        this.element.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });

        this.element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    #dismiss(direction) {
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px) rotate(${direction * 20}deg)`;
        this.element.classList.add('dismissing');

        setTimeout(() => {
            this.element.remove();
            if (typeof this.onDismiss === 'function') {
                this.onDismiss(); 
            }
        }, 1000);
    }

    restore() {
        this.#dismissed = false;
        this.element.style.transition = 'transform 0.5s';
        this.element.style.transform = 'translate(0px) rotate(0deg)';
    }
}

const swiper = document.querySelector('#swiper');
const backButton = document.querySelector('#backButton');

const cardsData = [
    { imageUrl: 'top1.jpg', textContent: '<h2>$15</h2><p>Black Full-Sleeve Shirt</p>' },
    { imageUrl: 'top2.jpg', textContent: '<h2>$5</h2><p>Pink T-shirt</p>' },
    { imageUrl: 'top3.jpg', textContent: '<h2>$20</h2><p>Plain Gray Hoodie</p>' },
    { imageUrl: 'top4.jpg', textContent: '<h2>$30</h2><p>Long Brown Coat</p>' },
    { imageUrl: 'top5.jpg', textContent: '<h2>$50</h2><p>Ladies Leather Jacket</p>' }
];

let cardCount = 0;
let cards = []; 
let dismissedCards = []; 

function appendNewCard() {
    const cardData = cardsData[cardCount % cardsData.length];
    const card = new Card({
        imageUrl: cardData.imageUrl,
        textContent: cardData.textContent,
        onDismiss: () => {
            dismissedCards.push(card); 
            updateCardIndexes();
        }
    });
    swiper.prepend(card.element); 
    cards.push(card); 
    cardCount++;
    updateCardIndexes();
}

function updateCardIndexes() {
    cards.forEach((card, index) => {
        card.element.style.setProperty('--i', index);
    });
}

function restoreCard() {
    if (dismissedCards.length > 0) {
        const lastDismissedCard = dismissedCards.pop();
        swiper.prepend(lastDismissedCard.element); 
        lastDismissedCard.restore(); 
        cards.unshift(lastDismissedCard); 
        updateCardIndexes();
    }
}


backButton.addEventListener('click', restoreCard);


for (let i = 0; i < 5; i++) {
    appendNewCard();
}
