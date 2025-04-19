window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});


window.addEventListener("scroll", () => {
    const sections = document.querySelector("section")
    const scrollY = window.pageYoffset;

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionTop) {
            document.querySelector(".nav-items a[href*=" + "]").classList.add("active");
        }
        else {
            document.querySelector(".nav-items a[href*=" + "]").classList.remove("active");
        }
    });

});

const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });

});


const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const hoverSign = document.querySelector(".hover-sign");


const videoList = [video1, video2, video3];

videoList.forEach(function (video) {
    video.addEventListener('mouseover', function () {
        video.play();
        hoverSign.classList.add("active")
    })
    video.addEventListener('mouseout', function () {
        video.pause()
        hoverSign.classList.remove("active")
    })
})


document.addEventListener('DOMContentLoaded', function () {
    const reactionGroups = document.querySelectorAll('.reaction-group');

    // Initialize each reaction group
    reactionGroups.forEach(group => {
        const sectionId = group.getAttribute('data-section');
        const likeBtn = group.querySelector('.like-btn');
        const heartBtn = group.querySelector('.heart-btn');
        const totalCount = group.querySelector('.total-count');
        const userStatus = group.querySelector('.user-status');

        // Load or initialize data
        const storageKey = `reactionData_${sectionId}`;
        let reactionData = JSON.parse(localStorage.getItem(storageKey)) || {
            totalReactions: 0,
            userReaction: null // 'like', 'heart', or null
        };

        // Update UI
        updateUI();

        // Button event listeners
        likeBtn.addEventListener('click', () => handleReaction('like'));
        heartBtn.addEventListener('click', () => handleReaction('heart'));

        function handleReaction(type) {
            // User is removing their reaction
            if (reactionData.userReaction === type) {
                reactionData.totalReactions--;
                reactionData.userReaction = null;
            }
            // User is switching reactions
            else if (reactionData.userReaction) {
                reactionData.userReaction = type;
                // No change to total count when switching
            }
            // User is adding a new reaction
            else {
                reactionData.totalReactions++;
                reactionData.userReaction = type;
            }

            // Save and update
            localStorage.setItem(storageKey, JSON.stringify(reactionData));
            updateUI();
        }

        function updateUI() {
            totalCount.textContent = reactionData.totalReactions;

            // Update button states
            likeBtn.classList.toggle('user-selected', reactionData.userReaction === 'like');
            heartBtn.classList.toggle('user-selected', reactionData.userReaction === 'heart');

            // Update status message
            if (reactionData.userReaction === 'like') {
                userStatus.textContent = "liked";
            } else if (reactionData.userReaction === 'heart') {
                userStatus.textContent = "heart";
            } else {
                userStatus.textContent = "";
            }
        }
    });
});