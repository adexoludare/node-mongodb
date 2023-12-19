// Assuming you have a Student model defined
const Student = require('../models/student.model');

// Replace the old code using callback with async/await
async function yourFunction() {
    try {
        const students = await Student.find({ /* your query criteria */ });
        // Handle the result, e.g., send it as a response
        res.json(students);
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Example usage within an Express route handler
app.get('/students', async (req, res) => {
    await yourFunction();
});
