const addBtn = document.querySelector('#add-button')
const inputtedActivity = document.querySelector('#activity-input')
const activitiesContainer = document.querySelector('.activities-container')
const completedActivitiesContainer = document.querySelector('.completed-activities-container')
const completedActivitiesNum = document.querySelector('#num-of-completed-activities')
const unfinishedTabBtn = document.querySelector('#unfinished-tab')
const completedTabBtn = document.querySelector('#completed-tab')
const allTabBtn = document.querySelector('#all-tab')

allTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'

function addActivity() {
    const taskText = inputtedActivity.value.trim()
    if (taskText !== "") {
        const newDiv = document.createElement('div')
        newDiv.classList.add('to-do-item-container')
        activitiesContainer.appendChild(newDiv)
        const activityText = document.createElement('h4')
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

        submitBtn.addEventListener('click', function() {
            submitBtn.remove()
            completedActivitiesContainer.appendChild(newDiv)
            const unsubmitBtn = document.createElement('div')
            unsubmitBtn.classList.add('unsubmit-btn')
            unsubmitBtn.textContent = "↩️"
            newDiv.append(unsubmitBtn)
            completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount - 1

            unsubmitBtn.addEventListener('click', function() {

                unsubmitBtn.remove()
                activitiesContainer.appendChild(newDiv)
                newDiv.appendChild(submitBtn)
                completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount - 1
            })
        })

        removeBtn.addEventListener('click', function() {
            newDiv.remove()
            completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount - 1
        })
    }
    inputtedActivity.value = ""
}

addBtn.addEventListener('click', function() {
    addActivity()
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addActivity()
    }
})

allTabBtn.addEventListener('click', function() {
    allTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'
    completedTabBtn.style.backgroundColor = ''
    unfinishedTabBtn.style.backgroundColor = ''
    activitiesContainer.classList.add('active')
    completedActivitiesContainer.classList.add('active')
})

unfinishedTabBtn.addEventListener('click', function() {
    unfinishedTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'
    completedTabBtn.style.backgroundColor = ''
    allTabBtn.style.backgroundColor = ''
    activitiesContainer.classList.add('active')
    completedActivitiesContainer.classList.remove('active')
})

completedTabBtn.addEventListener('click', function() {
    completedTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'
    unfinishedTabBtn.style.backgroundColor = ''
    allTabBtn.style.backgroundColor = ''
    completedActivitiesContainer.classList.add('active')
    activitiesContainer.classList.remove('active')
})