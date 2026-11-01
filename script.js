const addBtn = document.querySelector('#add-button')
const inputtedActivity = document.querySelector('#activity-input')
const bothActivitiesContainer = document.querySelector('.both-activities-container')
const activitiesContainer = document.querySelector('.activities-container')
const completedActivitiesContainer = document.querySelector('.completed-activities-container')
const completedActivitiesNum = document.querySelector('#num-of-completed-activities')
const unfinishedTabBtn = document.querySelector('#unfinished-tab')
const completedTabBtn = document.querySelector('#completed-tab')
const allTabBtn = document.querySelector('#all-tab')

let itemCount = 0

allTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'

function addActivity() {
    const taskText = inputtedActivity.value.trim()

    if (taskText !== "") {
        itemCount += 1
        const newDiv = document.createElement('div')
        newDiv.classList.add('to-do-item-container')

        const allDiv = newDiv.cloneNode(true)

        newDiv.style.order = itemCount
        allDiv.style.order = itemCount

        activitiesContainer.appendChild(newDiv)
        bothActivitiesContainer.appendChild(allDiv)

        const activityText = document.createElement('h4')
        activityText.classList.add('activity-text')
        activityText.textContent = taskText
        newDiv.appendChild(activityText)

        const allText = document.createElement('h4')
        allText.classList.add('activity-text')
        allText.textContent = taskText
        allDiv.appendChild(allText)

        const submitBtn = document.createElement('div')
        submitBtn.classList.add('submit-btn')
        submitBtn.textContent = "✅"

        const removeBtn = document.createElement('div')
        removeBtn.classList.add('remove-btn')
        removeBtn.textContent = "❌"

        const allSubmitBtn = submitBtn.cloneNode(true)
        const allRemoveBtn = removeBtn.cloneNode(true)

        newDiv.appendChild(submitBtn)
        newDiv.appendChild(removeBtn)

        allDiv.appendChild(allSubmitBtn)
        allDiv.appendChild(allRemoveBtn)

        function completeActivity() {
            submitBtn.remove()
            allSubmitBtn.remove()

            completedActivitiesContainer.appendChild(newDiv)

            allDiv.classList.add('completed')

            const unsubmitBtn = document.createElement('div')
            unsubmitBtn.classList.add('unsubmit-btn')
            unsubmitBtn.textContent = "↩️"
            newDiv.appendChild(unsubmitBtn)

            const allUnsubmitBtn = document.createElement('div')
            allUnsubmitBtn.classList.add('unsubmit-btn')
            allUnsubmitBtn.textContent = "↩️"
            allDiv.appendChild(allUnsubmitBtn)

            completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount

            function undoCompletion() {
                unsubmitBtn.remove()
                allUnsubmitBtn.remove()

                activitiesContainer.appendChild(newDiv)
                newDiv.appendChild(submitBtn)

                allDiv.classList.remove('completed')
                allDiv.appendChild(allSubmitBtn)

                completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount
            }

            unsubmitBtn.addEventListener('click', undoCompletion)
            allUnsubmitBtn.addEventListener('click', undoCompletion)
        }

        submitBtn.addEventListener('click', completeActivity)
        allSubmitBtn.addEventListener('click', completeActivity)

        function removeActivity() {
            newDiv.remove()
            allDiv.remove()

            completedActivitiesNum.textContent = completedActivitiesContainer.childElementCount
        }

        removeBtn.addEventListener('click', removeActivity)
        allRemoveBtn.addEventListener('click', removeActivity)
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

    bothActivitiesContainer.classList.add('active')
    activitiesContainer.classList.remove('active')
    completedActivitiesContainer.classList.remove('active')
})

unfinishedTabBtn.addEventListener('click', function() {
    unfinishedTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'
    completedTabBtn.style.backgroundColor = ''
    allTabBtn.style.backgroundColor = ''

    activitiesContainer.classList.add('active')
    completedActivitiesContainer.classList.remove('active')
    bothActivitiesContainer.classList.remove('active')
})

completedTabBtn.addEventListener('click', function() {
    completedTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'
    unfinishedTabBtn.style.backgroundColor = ''
    allTabBtn.style.backgroundColor = ''

    completedActivitiesContainer.classList.add('active')
    activitiesContainer.classList.remove('active')
    bothActivitiesContainer.classList.remove('active')
})
