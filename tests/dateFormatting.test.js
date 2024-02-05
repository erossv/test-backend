const { formatTasks, formatTask } = require('../models/format');

describe('Date Formatting', () => {
    const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'This is a test task',
        end_date: new Date('2022-12-31'),
        status: 'pending',
    };

    describe('formatTask', () => {
        it('should format a task with correct date', () => {
            const formattedTask = formatTask(mockTask);

            expect(formattedTask).toEqual({
                id: 1,
                title: 'Test Task',
                description: 'This is a test task',
                endDate: '2022-12-31',
                status: 'pending',
            });
        });
    });

    describe('formatTasks', () => {
        it('should format an array of tasks with correct dates', () => {
            const tasks = [mockTask, mockTask];
            const formattedTasks = formatTasks(tasks);

            expect(formattedTasks).toEqual([
                {
                    id: 1,
                    title: 'Test Task',
                    description: 'This is a test task',
                    endDate: '2022-12-31',
                    status: 'pending',
                },
                {
                    id: 1,
                    title: 'Test Task',
                    description: 'This is a test task',
                    endDate: '2022-12-31',
                    status: 'pending',
                },
            ]);
        });
    });
});
