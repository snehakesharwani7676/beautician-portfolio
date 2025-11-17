// ========================================
// AUTO GALLERY LOADER - GitHub Integration
// ========================================

// 🔧 CONFIGURATION - Your GitHub details
const GITHUB_USER = "snehakesharwani7676";  // Your GitHub username
const REPO = "beautician-portfolio";         // Your repo name

// 📁 Category and Subcategory Structure
const categories = {
    makeup: [
        { id: "self-makeup", name: "Self Makeup" },
        { id: "teen-makeup", name: "Teen Makeup" },
        { id: "reception-makeup", name: "Reception Makeup" },
        { id: "engagement-makeup", name: "Engagement Makeup" },
        { id: "bridal-makeup", name: "Bridal Makeup" },
        { id: "glam-makeup", name: "Glam Makeup" },
        { id: "fantasy", name: "Fantasy Makeup" },
        { id: "bronze-tan", name: "Bronze Tan" },
        { id: "model-bride", name: "Model Bride" }
    ],
    hair: [
        { id: "hair-do", name: "Hair-do Gallery" },
        { id: "keratin", name: "Keratin" },
        { id: "rebonding", name: "Rebonding" },
        { id: "botox", name: "Botox" },
        { id: "smoothening", name: "Smoothening" },
        { id: "hairstyles", name: "Hairstyles" }
    ],
    "skin-nails": [
        { id: "nail-art", name: "Nail Art" },
        { id: "nail-extensions", name: "Nail Extensions" },
        { id: "facials", name: "Facials Gallery" },
        { id: "manicure-pedicure", name: "Manicure-Pedicure" },
        { id: "waxing", name: "Waxing Results" }
    ]
};

// 🎨 Load images from GitHub
function loadGalleryImages() {
    console.log('🎨 Loading gallery images from GitHub...');
    
    Object.keys(categories).forEach(mainCat => {
        categories[mainCat].forEach(subCat => {
            const containerId = `${mainCat}-${subCat.id}`;
            const container = document.getElementById(containerId);
            
            if (!container) {
                console.warn(`Container not found: ${containerId}`);
                return;
            }

            // GitHub API URL
            const apiURL = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/images/${mainCat}/${subCat.id}`;
            
            // Show loading indicator
            container.innerHTML = '<div class="loading-spinner">Loading...</div>';

            fetch(apiURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(files => {
                    container.innerHTML = ''; // Clear loading
                    
                    if (!Array.isArray(files) || files.length === 0) {
                        container.innerHTML = '<p class="no-images">No images yet</p>';
                        return;
                    }

                    let imageCount = 0;
                    files.forEach(file => {
                        if (file.type === "file" && /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
                            const imgWrapper = document.createElement("div");
                            imgWrapper.className = "portfolio-item";
                            imgWrapper.setAttribute('data-category', mainCat);
                            
                            const img = document.createElement("img");
                            img.src = file.download_url;
                            img.alt = subCat.name;
                            img.loading = "lazy";
                            
                            const overlay = document.createElement("div");
                            overlay.className = "portfolio-overlay";
                            overlay.innerHTML = `<p>${subCat.name}</p>`;
                            
                            imgWrapper.appendChild(img);
                            imgWrapper.appendChild(overlay);
                            container.appendChild(imgWrapper);
                            
                            imageCount++;
                            
                            // Add click event for lightbox
                            imgWrapper.addEventListener('click', () => openLightbox(file.download_url, subCat.name));
                        }
                    });
                    
                    if (imageCount === 0) {
                        container.innerHTML = '<p class="no-images">No images yet</p>';
                    }
                    
                    console.log(`✅ Loaded ${imageCount} images for ${mainCat}/${subCat.id}`);
                })
                .catch(error => {
                    console.error(`❌ Error loading ${mainCat}/${subCat.id}:`, error);
                    container.innerHTML = '<p class="no-images">Unable to load images</p>';
                });
        });
    });
}

// 🖼️ Lightbox function
function openLightbox(imageUrl, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imageUrl;
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: zoomIn 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 3rem;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.3s;
    `;
    
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    titleDiv.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(titleDiv);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        }
    });
}

// 🚀 Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGalleryImages);
} else {
    loadGalleryImages();
}

console.log('✨ Gallery loader initialized!');
