export function createMenuPage() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
  
    const menuSection = document.createElement('section');
    menuSection.id = 'menu';
  
    const menuHeadline = document.createElement('h2');
    menuHeadline.textContent = 'Our Menu';
    menuSection.appendChild(menuHeadline);
  
    const menuItems = [
      { name: 'Classic Burger', description: 'Juicy patty with fresh lettuce and tomato.', price: '$12.99' },
      { name: 'Spaghetti Bolognese', description: 'Rich meat sauce over al dente pasta.', price: '$15.50' },
      { name: 'Caesar Salad', description: 'Crisp romaine lettuce with croutons and a creamy dressing.', price: '$9.75' },
    ];
  
    const menuList = document.createElement('ul');
    menuList.style.listStyleType = 'none';
    menuList.style.padding = '0';
  
    menuItems.forEach(item => {
      const li = document.createElement('li');
      li.style.borderBottom = '1px solid #ccc';
      li.style.padding = '1rem 0';
      li.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span><strong>${item.price}</strong></span>
      `;
      menuList.appendChild(li);
    });
  
    menuSection.appendChild(menuList);
    contentDiv.appendChild(menuSection);
  }
  