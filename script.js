// CURSOR SPOTLIGHT SCRIPT
const spotlight = document.querySelector('.cursor-spotlight');
document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
});
const interactiveElements = document.querySelectorAll('a, button, .feature-card, .pricing-card, iframe, .testimonial-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => spotlight.classList.add('interactive'));
    el.addEventListener('mouseleave', () => spotlight.classList.remove('interactive'));
});

// 7-SECOND TIMED VIDEO PLAYLIST SCRIPT
const videoElement = document.getElementById('hero-background-video');
if (videoElement) {
    const videoPlaylist = [
        'https://videos.pexels.com/video-files/3192364/3192364-hd_1920_1080_25fps.mp4',
        'https://videos.pexels.com/video-files/7647253/7647253-hd_1920_1080_24fps.mp4',
        'https://videos.pexels.com/video-files/3198163/3198163-hd_1920_1080_25fps.mp4'
    ];
    let currentVideoIndex = 0;
    function playNextVideoSegment() {
        videoElement.src = videoPlaylist[currentVideoIndex];
        videoElement.load();
        videoElement.play().catch(error => console.log("Autoplay was prevented:", error));
        currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
        setTimeout(playNextVideoSegment, 7000);
    }
    playNextVideoSegment();
}

// MARQUEE SCRIPT (Handles testimonial marquee)
const marqueeTrack = document.querySelector('.testimonial-track');
if (marqueeTrack) {
    const items = Array.from(marqueeTrack.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeTrack.appendChild(clone);
    });
}

// Dynamic Year for Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- GEMINI API FEATURE SCRIPT (COMPLETED) ---
const modalOverlay = document.getElementById('gemini-modal-overlay');
const openModalBtn = document.getElementById('open-gemini-modal');
const closeModalBtn = document.getElementById('close-gemini-modal');
const callApiBtn = document.getElementById('call-gemini-api');
const promptTextarea = document.getElementById('gemini-prompt');
const resultContainer = document.getElementById('gemini-result-container');
const resultDiv = document.getElementById('gemini-result');

const openModal = () => modalOverlay.classList.add('visible');
const closeModal = () => modalOverlay.classList.remove('visible');

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

callApiBtn.addEventListener('click', async () => {
    const userQuery = promptTextarea.value;
    if (!userQuery.trim()) {
        resultDiv.innerHTML = `<p style="color: red;">Please describe your needs.</p>`;
        resultContainer.style.display = 'block';
        return;
    }

    resultContainer.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading-spinner"></div>';
    callApiBtn.disabled = true;

    const systemPrompt = `You are an expert sales assistant for Quicken Secure, a data protection service. Your goal is to recommend the best pricing plan based on a user's description of their business. The available plans are 'Starter', 'Business', and 'Enterprise'.
- **Starter Plan:** Best for individuals and small teams, offers 100 MB storage, daily backups. Recommend this for descriptions mentioning personal use, freelancers, very small teams, or basic needs.
- **Business Plan:** The most popular choice, for growing businesses. Offers 250 MB storage, real-time backups, compliance reporting. Recommend this for descriptions mentioning small to medium-sized businesses, growth, multiple employees, or compliance needs (like GDPR/CCPA).
- **Enterprise Plan:** For large organizations with custom needs. Offers unlimited storage, dedicated infrastructure, and API access. Recommend this for descriptions mentioning large companies, many employees, complex security needs, custom integrations, or API requirements.
Based on the user's query, provide a detailed recommendation. First, state the recommended plan clearly. Then, provide a brief, 1-2 sentence explanation for why that plan is the best fit, referencing specifics from the user's query.`;

    const apiKey = ""