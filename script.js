const addBtn = document.querySelector('#add-button')
const inputtedActivity = document.querySelector('#activity-input')
const bothActivitiesContainer = document.querySelector('.both-activities-container')
const activitiesContainer = document.querySelector('.activities-container')
const completedActivitiesContainer = document.querySelector('.completed-activities-container')
const completedActivitiesNum = document.querySelector('#num-of-completed-activities')
const unfinishedTabBtn = document.querySelector('#unfinished-tab')
const completedTabBtn = document.querySelector('#completed-tab')
const allTabBtn = document.querySelector('#all-tab')
const bothEmptyText = document.querySelector('#both-empty-text')
const uncompletedEmptyText = document.querySelector('#to-be-done-empty-text')
const completedEmptyText = document.querySelector('#completed-empty-text')
const deleteAllCompletedBtn = document.querySelector('.delete-all-completed-btn')

let itemCount = 0

allTabBtn.style.backgroundColor = 'rgb(163, 154, 112)'

function updateEmptyText(list) {
    const bothSize = list[0]
    const uncompletedSize = list[1]
    const completedSize = list[2]
    if (bothSize === 0) {
        bothActivitiesContainer.appendChild(bothEmptyText)
    }
    else if (bothSize > 0) {
        bothEmptyText.remove()
    }
    if (uncompletedSize === 0) {
        activitiesContainer.appendChild(uncompletedEmptyText)
    }
    else if (uncompletedSize > 0) {
        uncompletedEmptyText.remove()
    }
    if (completedSize === 0) {
        completedActivitiesContainer.appendChild(completedEmptyText)
    }
    else if (completedSize > 0) {
        completedEmptyText.remove()
    }
}

function checkLengthContainer(container) {
    const acceptable = ['all', 'both', 'uncompleted', 'completed']
    if (acceptable.includes(container)) {
        let allLength = 0
        bothActivitiesContainer.childNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                if (node.classList.contains('to-do-item-container')) {
                    allLength += 1
                }
            }
        })
        let uncompletedLength = 0
        activitiesContainer.childNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                if (node.classList.contains('to-do-item-container')) {
                    uncompletedLength += 1
                }
            }
        })
        let completedLength = 0
        completedActivitiesContainer.childNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                if (node.classList.contains('to-do-item-container')) {
                    completedLength += 1
                }
            }
        })
        if (container === 'all') {
            return [allLength, uncompletedLength, completedLength]
        }
        else if (container === 'both') {
            return allLength
        }
        else if (container === 'uncompleted') {
            return uncompletedLength
        }
        else if (container === 'completed') {
            return completedLength
        }
    }
}

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

        updateEmptyText(checkLengthContainer('all'))

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

            updateEmptyText(checkLengthContainer('all'))
            completedActivitiesNum.textContent = checkLengthContainer('completed')

            function undoCompletion() {
                unsubmitBtn.remove()
                allUnsubmitBtn.remove()

                activitiesContainer.appendChild(newDiv)
                newDiv.appendChild(submitBtn)

                allDiv.classList.remove('completed')
                allDiv.appendChild(allSubmitBtn)

                updateEmptyText(checkLengthContainer('all'))
                completedActivitiesNum.textContent = checkLengthContainer('completed')
            }

            unsubmitBtn.addEventListener('click', undoCompletion)
            allUnsubmitBtn.addEventListener('click', undoCompletion)
        }

        submitBtn.addEventListener('click', completeActivity)
        allSubmitBtn.addEventListener('click', completeActivity)

        function removeActivity() {
            newDiv.remove()
            allDiv.remove()

            updateEmptyText(checkLengthContainer('all'))
            completedActivitiesNum.textContent = checkLengthContainer('completed')
        }

        removeBtn.addEventListener('click', function() {
            const confirmation = confirm("Are you sure you want to remove this activity?")
            if (confirmation) {
                removeActivity()
            }
        })
        allRemoveBtn.addEventListener('click', function() {
            const confirmation = confirm("Are you sure you want to remove this activity?")
            if (confirmation) {
                removeActivity()
            }
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

deleteAllCompletedBtn.addEventListener('click', function() {
    let deletable = []
    const confirmation = confirm("Are you sure you want to delete all completed activities?")
        if (confirmation) {
            completedActivitiesContainer.childNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    if (node.classList.contains('to-do-item-container')) {
                        deletable.push(node)
                    }
                }
            })
            bothActivitiesContainer.childNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    if (node.classList.contains('to-do-item-container')) {
                        if (node.classList.contains('completed')) {
                            deletable.push(node)
                        }
                    }
                }
            })
            deletable.forEach(function(item) {
                item.remove()
            })
            updateEmptyText(checkLengthContainer('all'))
            completedActivitiesNum.textContent = checkLengthContainer('completed')
        }
})