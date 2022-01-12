console.log("Hello")
console.log(document.getElementById("task").textContent)

var pendingTask = document.getElementById("pending-task")
var completedTask = document.getElementById("completed-task")
var taskTextBox = document.getElementById("task")
myStorage = window.localStorage;
pendingTaskArr = []
completedTaskArr = []

function initPendingTask() {
    if (myStorage.getItem("pendingTask") != "") {
        var pendingTasks = JSON.parse(myStorage.getItem("pendingTask"))
        pendingTaskArr = JSON.parse(myStorage.getItem("pendingTask"))
        console.log(myStorage.getItem("pendingTask"))
        for (i = 0; i < pendingTasks.length; i++) {
            var opt = document.createElement('option');
            opt.value = pendingTasks[i];
            opt.innerHTML = pendingTasks[i];
            pendingTask.appendChild(opt);
        }
    }
}

function initCompletedTask() {
    console.log(myStorage.getItem("completedTask"))
    completedTaskArr = JSON.parse(myStorage.getItem("completedTask"))
    if (myStorage.getItem("completedTask") != "") {
        var completedTasks = JSON.parse(myStorage.getItem("completedTask"))
        console.log("Completed task: " + myStorage.getItem("completedTask"))
        for (i = 0; i < completedTasks.length; i++) {
            var opt = document.createElement('option');
            opt.value = completedTasks[i];
            opt.innerHTML = completedTasks[i];
            completedTask.appendChild(opt);
        }
    }
}

function removeFromPendingList() {
    value = pendingTask.selectedIndex;
    const index = pendingTaskArr.indexOf(pendingTask.options[value].value);
    if (index > -1) {
        pendingTaskArr.splice(index, 1);
    }
    pendingTask.removeChild(pendingTask[value]);
}

function removeFromCompletedList() {
    value = completedTask.selectedIndex;
    const index = completedTaskArr.indexOf(completedTask.options[value].value);
    if (index > -1) {
        completedTaskArr.splice(index, 1);
    }
    completedTask.removeChild(completedTask[value]);
}

function storePendingTaskData() {
    myStorage.setItem("pendingTask", JSON.stringify(pendingTaskArr))
    console.log(myStorage.getItem("pendingTask"))
}

function storeCompletedTaskData() {
    myStorage.setItem("completedTask", JSON.stringify(completedTaskArr))
    console.log(myStorage.getItem("completedTask"))
}

document.getElementById("add-task").addEventListener("click", function () {
    var task = taskTextBox.value
    var opt = document.createElement('option');
    opt.value = task;
    opt.innerHTML = task;
    pendingTask.appendChild(opt);
    pendingTaskArr.push(task)
    console.log(pendingTaskArr)
});

document.getElementById("mark-as-complete").addEventListener("click", function () {
    var task = document.getElementById("pending-task").options[pendingTask.selectedIndex].value
    var opt = document.createElement('option');
    opt.value = task;
    opt.innerHTML = task;
    completedTask.appendChild(opt);
    completedTaskArr.push(task)
    console.log(completedTaskArr)
    removeFromPendingList()
});

document.getElementById("mark-as-pending").addEventListener("click", function () {
    var task = document.getElementById("completed-task").options[completedTask.selectedIndex].value
    var opt = document.createElement('option');
    opt.value = task;
    opt.innerHTML = task;
    pendingTask.appendChild(opt);
    pendingTaskArr.push(task)
    console.log(pendingTaskArr)
    removeFromCompletedList()
});

document.getElementById("remove-task").addEventListener("click", function () {
    removeFromCompletedList()
});

initPendingTask()
initCompletedTask()
setInterval(storePendingTaskData, 5000)
setInterval(storeCompletedTaskData, 5000)
