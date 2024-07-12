


const link = 'https://ridaefatima.github.io/stoopsaleinvitation/home.html'; 
const msg = encodeURIComponent('Hey, there\'s a Stoop Sale happening in our neighborhood!');
const title = encodeURIComponent(document.title);

console.log([link, msg, title]);

const fb = document.querySelector('.facebook');
fb.href = `https://www.facebook.com/share.php?u=${link}`;

const twitter = document.querySelector('.twitter');
twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

const whatsapp = document.querySelector('.whatsapp');
whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;

