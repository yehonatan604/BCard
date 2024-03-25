const apiBase = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/elran/openai`

const elmKeygenForm = document.querySelector("#keygenForm");
const elmDate = document.querySelector("#floatingDateStart");

const d = new Date();
const dateString = d.toLocaleDateString("he-IL", {year:"numeric"}) + '-' + d.toLocaleDateString("he-IL", {month:"2-digit"}) + '-' + d.toLocaleDateString("he-IL", {day:"2-digit"});
elmDate.value = dateString;

elmKeygenForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let password = document.querySelector("#floatingPassword").value;
  let start = document.querySelector("#floatingTimeStart").value;
  let end = document.querySelector("#floatingTimeEnd").value;
  let elmValidationFeedback = document.querySelector("#validationFeedback");
  try {
    const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/elran/openai/keygen', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({password,start,end}) })
    if (!response.ok) throw new Error(response.statusText)
    const data = await response.json()
    const { error,token } = data
    if (error) throw new Error(error)
    elmValidationFeedback.classList.add('validtoken');
    elmValidationFeedback.innerHTML = token;
  } catch(err) {
    elmValidationFeedback.innerHTML = err;
  }
});
