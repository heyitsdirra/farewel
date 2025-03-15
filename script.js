document.addEventListener("DOMContentLoaded", function () {
    startTimer();
    showPage(0);
});

let currentPage = 0;
const pages = document.querySelectorAll(".page");

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle("active", i === index);
    });
    currentPage = index;
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function kembaliKeAwal() {
    showPage(0);
    document.getElementById("tokenInput").value = "";
}

// Timer Hitungan Hari (DIPERCEPAT)
function startTimer() {
    let startDate = new Date("2022-07-01");
    let today = new Date();
    let diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    let count = 0;
    let interval = setInterval(() => {
        if (count < diff) {
            count++;
            document.getElementById("timer").innerText = count + " days";
        } else {
            clearInterval(interval);
        }
    }, 10); 
}

// Fortune Cookie
const fortunes = ["Hari ini penuh keberuntungan! 🌟", "Waktunya istirahat 🍵", "Coba sesuatu yang baru 🚀", "Seseorang merindukanmu 💌"];
const memes = ["meme1.jpg", "meme2.jpg", "meme3.jpg", "meme4.jpg", "meme5.jpg"];

function showFortune() {
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    let randomMeme = memes[Math.floor(Math.random() * memes.length)];

    document.getElementById("fortune-text").innerText = randomFortune;
    document.getElementById("meme").innerHTML = `<img src="${randomMeme}" alt="Meme" class="meme-img">`;

    document.querySelector(".cookie-img").style.display = "none";
    document.getElementById("fortune-text").style.display = "block";
    document.getElementById("meme").style.display = "block";
}

// Cek Token
let suratData = {}; // Buat nyimpen data dari JSON

// Fungsi buat ambil surat dari JSON
function loadSuratData() {
    fetch("surat.json")
        .then(response => response.json())
        .then(data => {
            suratData = data;
            console.log("Data surat berhasil dimuat:", suratData); // Debugging
        })
        .catch(error => console.error("Gagal mengambil data surat:", error));
}

// Fungsi cek token
function cekToken() {
    let token = document.getElementById("tokenInput").value.trim().toLowerCase();
    console.log("Token yang dimasukkan:", token); // Debug

    if (suratData[token]) {
        console.log("Kode valid!"); // Debug
        document.getElementById("isiSurat").innerText = suratData[token];
        showPage(5);
    } else {
        console.log("Kode tidak valid!"); // Debug
        alert("Kode tidak valid! Coba lagi 💕");
    }
}

