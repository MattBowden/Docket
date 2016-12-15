$(document).ready(function () {

    $(".treeview tbody tr[data-level!='0']").hide();

    $(".treeview tbody").on("click", ".collapsible", function (e) {
        e.preventDefault();
        var taskId = $(this).closest("tr").attr('data-taskId');
        collapseTasks(taskId);
    });

    $(".treeview tbody").on("click", "tr", function (e) {
        e.preventDefault();
        if (!$(event.target).is('span')) {
            $(".treeview tbody tr").removeClass("selected");
            $(this).addClass("selected");
            $("#btnDelete").removeClass("hidden");
            $("#btnAddSub").removeClass("hidden");
            $("#btnCompleteTask").removeClass("hidden");
        }
    });

    $(".treeview tbody").on("click", ".selected", function (e) {
        e.preventDefault();
        $(".treeview tr.selected").attr("contenteditable", "true");
    })

    $(".treeview tbody").on("blur", ".selected", function (e) {
        var taskId = $(".treeview tr.selected").attr("data-taskid");
        var taskTitle = $(".treeview tr.selected td:nth-child(1)").text().trim();
        var taskNote = $(".treeview tr.selected td:nth-child(2)").text().trim();
        $.ajax({
            url: "/Task/Update",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            cache: false,
            data: JSON.stringify({
                "taskId": taskId,
                "taskTitle": taskTitle,
                "taskNote": taskNote
            }),
            success: function (data) {
                $(".treeview tr").attr("contenteditable", "false");
            }
        });
    });

    $("#btnAdd").click(function (e) {
        e.preventDefault();
        addTask();
    });

    $("#btnAddSub").click(function (e) {
        e.preventDefault();
        addSubTask();
    });

    $("#btnCompleteTask").click(function (e) {
        e.preventDefault();
        completeTask();
    })

    $("#btnDelete").click(function (e) {
        e.preventDefault();
        deleteTask();
    });

    //Add task key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 78) {
            e.preventDefault();
            addTask();
        }
    });

    //Add sub task key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 66) {
            if ($(".selected").length > 0) {
                e.preventDefault();
                addSubTask();
            }
        }
    });

    //Complete task key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 67) {
            if ($(".selected").length > 0) {
                e.preventDefault();
                completeTask();
            }
        }
    });

    //Delete task key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 88) {
            if ($(".selected").length > 0) {
                e.preventDefault();
                deleteTask();
            }
        }
    });

    //Edit task key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 13) {
            e.preventDefault();
            $(".treeview tr.selected").attr("contenteditable", "true");
        }
    });

    //Navigate up key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 38) {
            e.preventDefault();
            navigateTasks(e.keyCode);
        }
    });

    //Navigate down key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 40) {
            e.preventDefault();
            navigateTasks(e.keyCode);
        }
    });

    //Navigate right key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 39) {
            e.preventDefault();
            navigateTasks(e.keyCode);
        }
    });

    //Navigate left key binding
    $(window).keydown(function (e) {
        if (e.shiftKey && e.altKey && e.keyCode == 37) {
            e.preventDefault();
            navigateTasks(e.keyCode);
        }
    });
});

function addTask() {
    var taskListId = $("#taskListId").val();
    var parentTaskId = $(".selected").attr("data-parenttaskid");
    if (parentTaskId === undefined) { parentTaskId = 0; }
    var level = $(".selected").attr("data-level");
    if (level === undefined) { level = 0; }

    $.ajax({
        url: "/Task/Add",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        cache: false,
        data: JSON.stringify({
            "taskListId": taskListId,
            "parentTaskId": parentTaskId
        }),
        success: function (data) {
            if ($(".treeview tr.selected").length === 0) {
                $(".treeview table tbody").append("<tr data-taskid='" + data + "' data-level='" + level + "' data-parenttaskid='" + parentTaskId + "'><td style='padding-left:" + level + "9px'><span class='spacer'>&nbsp;</span>Enter a task title</td><td>Enter a note</td><td>Bob Test</td></tr>");
            }
            else {
                $(".treeview tr.selected").after("<tr data-taskid='" + data + "' data-level='" + level + "' data-parenttaskid='" + parentTaskId + "'><td style='padding-left:" + level + "9px'><span class='spacer'>&nbsp;</span>Enter a task title</td><td>Enter a note</td><td>Bob Test</td></tr>");
            }
            $(".treeview tr.selected").removeClass("selected");
            $(".treeview tr[data-TaskId='" + data + "']").addClass("selected");
            if ($("#btnDelete").hasClass("hidden")) {
                $("#btnDelete").removeClass("hidden");
            }
            if ($("#btnCompleteTask").hasClass("hidden")) {
                $("#btnCompleteTask").removeClass("hidden");
            }
        }
    });
}

function addSubTask() {
    var taskListId = $("#taskListId").val();
    var newParentTaskId = $(".selected").attr("data-taskid");
    if (newParentTaskId === undefined) { newParentTaskId = 0; }
    var level = $(".selected").attr("data-level");
    if (level === undefined) { level = 0; } else { level = (parseInt(level, 10) + 1); }

    $.ajax({
        url: "/Task/Add",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        cache: false,
        data: JSON.stringify({
            "taskListId": taskListId,
            "parentTaskId": newParentTaskId
        }),
        success: function (data) {
            $(".treeview tr.selected td:first-child").css({ "font-weight": "bold" });
            $(".treeview tr.selected span").addClass("collapsible expand-task-icon");
            $(".treeview tr.selected").after("<tr data-taskid='" + data + "' data-level='" + level + "' data-parenttaskid='" + newParentTaskId + "'><td style='padding-left:" + level + "9px'><span class='spacer'>&nbsp;</span>Enter a task title</td><td>Enter a note</td><td>Bob Test</td></tr>");
            $(".treeview tr.selected").removeClass("selected");
            $(".treeview tr[data-TaskId='" + data + "']").addClass("selected");
            if ($("#btnDelete").hasClass("hidden")) {
                $("#btnDelete").removeClass("hidden");
            }
            if ($("#btnCompleteTask").hasClass("hidden")) {
                $("#btnCompleteTask").removeClass("hidden");
            }
        }
    });
}

function completeTask() {
    var taskId = $(".selected").attr("data-taskid");
    var parentTaskId = $(".selected").attr("data-parenttaskid");
    var subTaskIdsList = [];

    subTaskIdsList = getSubTasks(taskId, subTaskIdsList);
    subTaskIdsList.push(taskId);

    $.ajax({
        url: "/Task/Complete",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        cache: false,
        data: JSON.stringify({
            "taskIds": subTaskIdsList
        }),
        success: function (data) {
            $(subTaskIdsList).each(function (index, value) {
                $('.treeview tr[data-taskid="' + value + '"]').addClass("completedTask");
            });
            $("#btnCompleteTask").addClass("hidden");
        }
    });
}

function deleteTask() {
    //var taskListId = $("#taskListId").val();
    var taskId = $(".selected").attr("data-taskid");
    var parentTaskId = $(".selected").attr("data-parenttaskid");
    var subTaskIdsList = [];

    subTaskIdsList = getSubTasks(taskId, subTaskIdsList);
    subTaskIdsList.push(taskId);

    //select previous row
    if ($(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").length > 0) {
        $(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").addClass("selected");
    }
    else if ($(".treeview tr[data-TaskId='" + taskId + "']").next("tr").length > 0) {
        $(".treeview tr[data-TaskId='" + taskId + "']").next("tr").addClass("selected");
    }
    else {
        $("#btnDelete").addClass("hidden");
        $("#btnAddSub").addClass("hidden");
    }

    $.ajax({
        url: "/Task/Delete",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        cache: false,
        data: JSON.stringify({
            "taskIds": subTaskIdsList
        }),
        success: function (data) {
            $(subTaskIdsList).each(function (index, value) {
                $('.treeview tr[data-taskid="' + value + '"]').remove();
            });
            if ($('.treeview tr[data-parenttaskid="' + parentTaskId + '"]').length === 0) {
                $('.treeview tr[data-taskid="' + parentTaskId + '"] span').removeClass("collapsible expand-task-icon");
                $('.treeview tr[data-taskid="' + parentTaskId + '"] span').addClass("spacer")
                $('.treeview tr[data-taskid="' + parentTaskId + '"] td:first-child').css({ "font-weight": "" });
                $('.treeview tr[data-taskid="' + parentTaskId + '"] strong').contents().unwrap();
            }
            
        }
    });
}

function getSubTasks(taskId, subTaskIdsList) {
    var taskIdList = $(".treeview tr[data-parentTaskId='" + taskId + "']").map(function () {
        return $(this).data("taskid");
    }).get();

    $(taskIdList).each(function (index, value) {
        subTaskIdsList.push(value);
        subTaskIdsList = getSubTasks(value, subTaskIdsList);
    });

    return subTaskIdsList;
}

function navigateTasks(keyCode) {
    var taskId = $(".treeview tr.selected").attr("data-taskid");
    if (taskId !== undefined) {
        $(".treeview tr[data-TaskId='" + taskId + "']").removeClass("selected");
        var prevSelectedTaskId = taskId;

        if (keyCode === 38) { //up arrow
            if ($(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").length != 0) {
                while ($(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").css("display") == "none") {
                    taskId = $(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").attr("data-taskid");
                }
                $(".treeview tr[data-TaskId='" + taskId + "']").prev("tr").addClass("selected");
            }
            else {
                $(".treeview tr[data-TaskId='" + taskId + "']").addClass("selected");
            }
        }
        else if (keyCode === 40) { //down arrow
            if ($(".treeview tr[data-TaskId='" + taskId + "']").next("tr").length != 0) {
                while ($(".treeview tr[data-TaskId='" + taskId + "']").next("tr").css("display") == "none") {
                    taskId = $(".treeview tr[data-TaskId='" + taskId + "']").next("tr").attr("data-taskid");
                }
                var taskDisplay = $(".treeview tr[data-TaskId='" + taskId + "']").next("tr").css("display");
                if (taskDisplay === undefined || taskDisplay == "none") {
                    $(".treeview tr[data-TaskId='" + prevSelectedTaskId + "']").addClass("selected");
                }
                else {
                    $(".treeview tr[data-TaskId='" + taskId + "']").next("tr").addClass("selected");
                }
            }
            else {
                $(".treeview tr[data-TaskId='" + taskId + "']").addClass("selected");
            }
        }
        else if (keyCode === 39 || keyCode === 37) { //right or left arrow
            collapseTasks(taskId);
            $(".treeview tr[data-TaskId='" + taskId + "']").addClass("selected");
        }
    }
}

function collapseTasks(taskId) {
    if ($(".treeview tr[data-TaskId='" + taskId + "'] .collapsible").length > 0) {
        $(".treeview tr[data-TaskId='" + taskId + "'] span").toggleClass("collapse-task-icon expand-task-icon");
        if ($(".treeview tr[data-TaskId='" + taskId + "'] .expand-task-icon").length > 0) {
            $(".treeview tr[data-parentTaskId='" + taskId + "']").toggle();
        }
        else {
            var subTaskListIds = [];
            getSubTasks(taskId, subTaskListIds);
            $(subTaskListIds).each(function (index, value) {
                $(".treeview tr[data-TaskId='" + value + "']").hide();
                if ($(".treeview tr[data-TaskId='" + value + "'] .expand-task-icon").length > 0) {
                    $(".treeview tr[data-TaskId='" + value + "'] span").toggleClass("collapse-task-icon expand-task-icon");
                }
            });
        }
    }
}

