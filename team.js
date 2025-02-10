// Team Page Specific Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer with Error Handling
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Load animation when 50px from viewport bottom
    });

    document.querySelectorAll('.team-member').forEach(member => {
        member.style.opacity = '0'; // Initial state
        teamObserver.observe(member);
    });

    // Read More Functionality with ARIA
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
            const bio = e.target.previousElementSibling;
            const isExpanded = bio.getAttribute('aria-expanded') === 'true';
            
            bio.style.webkitLineClamp = isExpanded ? '4' : 'unset';
            bio.setAttribute('aria-expanded', !isExpanded);
            e.target.textContent = isExpanded ? 'Read More' : 'Read Less';
        });
    });
});