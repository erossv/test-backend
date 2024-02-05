const dayjs = require('dayjs');

function formatTask(task) {
    const { id, title, description, end_date, status } = task;
    const endDate = dayjs(end_date).format("YYYY-MM-DD");
    return { id, title, description, endDate, status };
}

function formatTasks(tasks) {
    return tasks.map(task => {
        return formatTask(task);
    });
}

module.exports = { formatTasks, formatTask };