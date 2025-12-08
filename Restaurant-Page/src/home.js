export function createHomePage() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
  
    // Headline
    const headline = document.createElement('h2');
    headline.textContent = 'Welcome to Our Restaurant!';
    contentDiv.appendChild(headline);
  
    // Image
    const image = document.createElement('img');
    image.src = 'https://placehold.co/800x450/4ade80/fff?text=Our+Restaurant';
    image.alt = 'A beautiful restaurant interior';
    image.style.width = '100%';
    image.style.borderRadius = '8px';
    contentDiv.appendChild(image);
  
    // Description
    const paragraph = document.createElement('p');
    paragraph.textContent = 'At our restaurant, we pride ourselves on using the freshest ingredients to create unforgettable dishes. Our cozy atmosphere and friendly staff make it the perfect place for a delicious meal with family and friends.';
    contentDiv.appendChild(paragraph);
  }