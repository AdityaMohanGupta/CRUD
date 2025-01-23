const baseURL = `${window.location.origin}/alien`;


// find allien
document.getElementById('find-alien-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const responseContainer = document.getElementById('find-alien-response');

  try {
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const aliens = await response.json();

    if (aliens.length === 0) {
      responseContainer.style.display = 'block'; // Hide if no aliens are found
      responseContainer.textContent ="No aliens found!";
      return;
    }

    // Display the response container
    responseContainer.style.display = 'block';

    // Populate the response container with alien data
    const alienList = aliens.map(
      (alien) => `
      <div class="alien">
        <p>Name: ${alien.name}</p>
        <p>Tech: ${alien.tech}</p>
        <p>Subscribed: ${alien.sub ? 'Yes' : 'No'}</p>
      </div>
    `
    ).join('');

    responseContainer.innerHTML = alienList;
  } catch (err) {
    responseContainer.style.display = 'block'; // Show error message
    responseContainer.textContent = `Error finding aliens: ${err.message}`;
  }
});





// Add Alien
document.getElementById('add-alien-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name=document.getElementById('alien-name').value;
  const tech=document.getElementById('alien-tech').value;
  const sub=document.getElementById('alien-sub').checked;

  try {
    const response =await fetch(baseURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name,tech,sub}),
    });

    const data = await response.json();
    document.getElementById('add-alien-response').textContent=`Alien added: ${data}`;
  } catch (err) {
    document.getElementById('add-alien-response').textContent='Error adding alien.';
  }
});




// Delete Alien
document.getElementById('delete-alien-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('delete-alien-id').value;

  try {
    const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });

    if (response.ok) {
      document.getElementById('delete-alien-response').textContent = 'Alien deleted successfully.';
    } else {
      document.getElementById('delete-alien-response').textContent = 'Error deleting alien.';
    }
  } catch (err) {
    document.getElementById('delete-alien-response').textContent = 'Error deleting alien.';
  }
});

// Patch Alien
document.getElementById('patch-alien-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('patch-alien-id').value;
  const name = document.getElementById('patch-alien-name').value;
  const tech = document.getElementById('patch-alien-tech').value;
  const sub = document.getElementById('patch-alien-sub').checked;

  const patchData = {};
  if (name) patchData.name = name;
  if (tech) patchData.tech = tech;
  if (sub !== undefined) patchData.sub = sub;

  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData),
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('patch-alien-response').textContent = `Alien updated ${data}`;
    } else {
      document.getElementById('patch-alien-response').textContent = 'Error updating alien.';
    }
  } catch (err) {
    document.getElementById('patch-alien-response').textContent = 'Error updating alien.';
  }
});
