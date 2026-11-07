const http = require('http');
function sendError(res, statusCode, message) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      success: false,
      message: message,
    }),
  );
}

// Reusable student validation function
function validateStudent(studentData) {
  if (
    typeof studentData !== 'object' ||
    studentData === null ||
    Array.isArray(studentData)
  ) {
    return 'Invalid student data';
  }

  if (
    typeof studentData.name !== 'string' ||
    typeof studentData.email !== 'string'
  ) {
    return 'Name and email must be strings';
  }

  const name = studentData.name.trim();
  const email = studentData.email.trim();

  if (name === '' || email === '') {
    return 'Name and email are required';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return 'Invalid email format';
  }

  return null;
}

// Generate a unique ID for our in-memory array
function generateStudentId() {
  if (students.length === 0) {
    return 1;
  }

  return Math.max(...students.map((student) => student.id)) + 1;
}

// Temporary student data
let students = [
  { id: 1, name: 'Arun', email: 'arun@gmail.com' },
  { id: 2, name: 'Kumar', email: 'kumar@gmail.com' },
];

const server = http.createServer((req, res) => {
  // GET: Fetch all students
  if (req.method === 'GET' && req.url === '/students') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    return res.end(JSON.stringify(students));
  }

  // POST: Create a new student
  else if (req.method === 'POST' && req.url === '/students') {
    let body = '';
    let bodySize = 0;

    const MAX_BODY_SIZE = 1024 * 1024;

    req.on('data', (chunk) => {
      bodySize += chunk.length;

      if (bodySize > MAX_BODY_SIZE) {
        req.pause();
        return sendError(res, 413, 'Request body too large');
      }

      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const studentData = JSON.parse(body);

        const error = validateStudent(studentData);

        if (error) {
          return sendError(res, 404, 'Error');
        }

        const newStudent = {
          id: generateStudentId(),
          name: studentData.name.trim(),
          email: studentData.email.trim(),
        };

        students.push(newStudent);

        res.writeHead(201, {
          'Content-Type': 'application/json',
        });

        return res.end(JSON.stringify(newStudent));
      } catch (error) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
        });

        return res.end(
          JSON.stringify({
            message: 'Invalid JSON data',
          }),
        );
      }
    });
  }

  // PUT: Update an existing student
  else if (req.method === 'PUT' && req.url.startsWith('/students/')) {
    const id = Number(req.url.split('/')[2]);

    if (!Number.isInteger(id) || id <= 0) {
      return sendError(res, 404, 'Invalid Student Id');
    }

    let body = '';
    let bodySize = 0;

    const MAX_BODY_SIZE = 1024 * 1024;

    req.on('data', (chunk) => {
      bodySize += chunk.length;

      if (bodySize > MAX_BODY_SIZE) {
        req.pause();
        return sendError(res, 413, 'Request body too large');
      }

      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updatedData = JSON.parse(body);

        const error = validateStudent(updatedData);

        if (error) {
          return sendError(res, 404, 'Invalid Student Id');
        }

        const index = students.findIndex((student) => student.id === id);

        if (index === -1) {
          return sendError(res, 404, 'Student not found');
        }

        students[index] = {
          id: id,
          name: updatedData.name.trim(),
          email: updatedData.email.trim(),
        };

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });

        return res.end(JSON.stringify(students[index]));
      } catch (error) {
        return sendError(res, 404, 'Invalid Json data');
      }
    });
  }

  // DELETE: Delete a student
  else if (req.method === 'DELETE' && req.url.startsWith('/students/')) {
    const id = Number(req.url.split('/')[2]);

    if (!Number.isInteger(id) || id <= 0) {
      return sendError(res, 404, 'Invalid Student Id');
    }

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      return sendError(res, 404, 'Student not found');
    }

    const deletedStudent = students.splice(index, 1);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    return res.end(
      JSON.stringify({
        message: 'Student deleted successfully',
        student: deletedStudent[0],
      }),
    );
  }

  // Handle unknown routes
  else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    return res.end(
      JSON.stringify({
        message: 'Route not found',
      }),
    );
  }
});

// Start server
server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
