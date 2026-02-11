export function createContactPage() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
  
    const contactSection = document.createElement('section');
    contactSection.id = 'contact';
  
    const contactHeadline = document.createElement('h2');
    contactHeadline.textContent = 'Contact Us';
    contactSection.appendChild(contactHeadline);
  
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Have a question? Feel free to reach out to us!';
    contactSection.appendChild(paragraph);
  
    const address = document.createElement('address');
    address.innerHTML = `
      <strong>Address:</strong> 123 Main Street, Anytown, USA<br>
      <strong>Phone:</strong> (555) 555-5555<br>
      <strong>Email:</strong> info@myrestaurant.com
    `;
    contactSection.appendChild(address);
  
    contentDiv.appendChild(contactSection);
  }