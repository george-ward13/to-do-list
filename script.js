const addBtn = document.querySelector('#add-button')
const inputtedActivity = document.querySelector('#activity-input')
const activitiesContainer = document.querySelector('.activities-container')

addBtn.addEventListener('click', function(){
    const taskText = inputtedActivity.value.trim()
    if (taskText !== "") {
        const newDiv = document.createElement('div')
        newDiv.classList.add('to-do-item-container')
        activitiesContainer.appendChild(newDiv)
        const activityText = document.createElement('h3')
        activityText.classList.add('activity-text')
        activityText.textContent = taskText
        newDiv.appendChild(activityText)
        const submitBtn = document.createElement('div')
        submitBtn.classList.add('submit-btn')
        const removeBtn = document.createElement('div')
        removeBtn.classList.add('remove-btn')
        submitBtn.textContent = "✅"
        removeBtn.textContent = "❌"
        newDiv.appendChild(submitBtn)
        newDiv.appendChild(removeBtn)
    }
    inputtedActivity.value = ""
})